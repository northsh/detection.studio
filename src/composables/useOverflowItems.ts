import {computed, nextTick, onMounted, ref, watch, type MaybeRefOrGetter, toValue, type Ref} from "vue";
import {useResizeObserver} from "@vueuse/core";

export interface OverflowItemBase {
    /** Unique identifier for the item */
    id: string | number;
    /** Priority determines visibility order (higher = stays visible longer). Default: 0 */
    priority?: number;
}

export interface UseOverflowItemsOptions {
    /** Gap between items in pixels. Default: 8 */
    gap?: number;
    /** Width to reserve for the overflow button in pixels. Default: 40 */
    overflowButtonWidth?: number;
    /**
     * Width in pixels already consumed by fixed elements inside the container
     * that are NOT part of the overflow items (e.g. a sidebar trigger + separator
     * that always live on the left). The composable subtracts this from the
     * measured container width before deciding how many items fit.
     * Default: 0
     */
    reservedWidth?: number;
}

export interface UseOverflowItemsReturn<T extends OverflowItemBase> {
    /** Reference to bind to the container element */
    containerRef: Ref<HTMLElement | null>;
    /** Reference to bind to the measurement container element */
    measurementRef: Ref<HTMLElement | null>;
    /** Function to set refs for individual items - call with (id, element) */
    setItemRef: (id: string | number, el: HTMLElement | null) => void;
    /** Items that are visible (fit in the container) */
    visibleItems: Ref<T[]>;
    /** Items that overflow (shown in dropdown) */
    overflowItems: Ref<T[]>;
    /** Whether there are any overflow items */
    hasOverflow: Ref<boolean>;
    /** Number of visible items */
    visibleCount: Ref<number>;
    /** Trigger a re-measurement of items */
    remeasure: () => Promise<void>;
}

/**
 * Composable for managing overflow items in a flexbox container.
 *
 * Items are sorted by priority (higher = stays visible longer) and then
 * as many items as possible are shown based on available space.
 *
 * The container ref should be placed on the outermost row element so that
 * ResizeObserver always sees its true width. Use `reservedWidth` to subtract
 * any fixed/anchored children that are not part of the overflow item set
 * (e.g. a sidebar trigger + separator that always sit on the left).
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 * const items = ref([
 *   { id: 1, label: 'Home', priority: 10 },
 *   { id: 2, label: 'Settings', priority: 5 },
 *   { id: 3, label: 'About', priority: 0 },
 * ]);
 *
 * const {
 *   containerRef,
 *   measurementRef,
 *   setItemRef,
 *   visibleItems,
 *   overflowItems,
 *   hasOverflow,
 * } = useOverflowItems(items, { gap: 8, reservedWidth: 48 });
 * </script>
 *
 * <template>
 *   <!-- containerRef on the full row; fixed anchors live outside overflow logic -->
 *   <div ref="containerRef" class="flex overflow-hidden">
 *     <SidebarTrigger />  <!-- fixed, not an overflow item -->
 *     <Separator />       <!-- fixed, not an overflow item -->
 *
 *     <!-- Hidden measurement container -->
 *     <div ref="measurementRef" class="absolute invisible pointer-events-none">
 *       <div v-for="item in items" :ref="el => setItemRef(item.id, el)">
 *         {{ item.label }}
 *       </div>
 *     </div>
 *
 *     <!-- Visible items -->
 *     <div v-for="item in visibleItems">{{ item.label }}</div>
 *
 *     <!-- Overflow button -->
 *     <button v-if="hasOverflow">
 *       +{{ overflowItems.length }}
 *     </button>
 *   </div>
 * </template>
 * ```
 */
export function useOverflowItems<T extends OverflowItemBase>(
    items: MaybeRefOrGetter<T[]>,
    options: UseOverflowItemsOptions = {},
): UseOverflowItemsReturn<T> {
    const { gap = 8, overflowButtonWidth = 40, reservedWidth = 0 } = options;

    const containerRef = ref<HTMLElement | null>(null);
    const measurementRef = ref<HTMLElement | null>(null);
    const itemRefs = ref<Map<string | number, HTMLElement>>(new Map());
    const containerWidth = ref(0);
    const itemWidths = ref<Map<string | number, number>>(new Map());
    const visibleCount = ref(0);

    // Items sorted by priority (higher priority first)
    const sortedItems = computed(() => {
        const itemsValue = toValue(items);
        return [...itemsValue].sort((a, b) => {
            const priorityA = a.priority ?? 0;
            const priorityB = b.priority ?? 0;
            return priorityB - priorityA;
        });
    });

    // Items in their original order, split into visible and overflow
    const visibleItems = computed(() => {
        const itemsValue = toValue(items);
        const visibleIds = new Set(
            sortedItems.value.slice(0, visibleCount.value).map((item) => item.id),
        );
        return itemsValue.filter((item) => visibleIds.has(item.id));
    }) as Ref<T[]>;

    const overflowItems = computed(() => {
        const itemsValue = toValue(items);
        const visibleIds = new Set(
            sortedItems.value.slice(0, visibleCount.value).map((item) => item.id),
        );
        return itemsValue.filter((item) => !visibleIds.has(item.id));
    }) as Ref<T[]>;

    const hasOverflow = computed(() => overflowItems.value.length > 0);

    // Calculate how many items can fit
    const calculateVisibleItems = () => {
        const itemsValue = toValue(items);

        if (!containerRef.value || itemWidths.value.size === 0) {
            visibleCount.value = itemsValue.length;
            return;
        }

        // Subtract fixed anchors that are always present but not overflow items
        const availableWidth = containerWidth.value - reservedWidth;
        const buttonWidth = overflowButtonWidth + gap;

        // Get widths for items sorted by priority
        const sortedWidths = sortedItems.value.map((item) => ({
            id: item.id,
            width: itemWidths.value.get(item.id) ?? 0,
        }));

        let usedWidth = 0;
        let count = 0;

        for (const { width } of sortedWidths) {
            const itemWidth = width + (count > 0 ? gap : 0);
            const wouldNeedOverflow = count < sortedWidths.length - 1;
            const spaceNeeded = wouldNeedOverflow
                ? usedWidth + itemWidth + buttonWidth
                : usedWidth + itemWidth;

            if (spaceNeeded <= availableWidth) {
                usedWidth += itemWidth;
                count++;
            } else {
                break;
            }
        }

        // If we can't fit all items, ensure we leave room for the overflow button
        if (count < sortedWidths.length && count > 0) {
            usedWidth = 0;
            count = 0;

            for (const { width } of sortedWidths) {
                const itemWidth = width + (count > 0 ? gap : 0);
                if (usedWidth + itemWidth + buttonWidth <= availableWidth) {
                    usedWidth += itemWidth;
                    count++;
                } else {
                    break;
                }
            }
        }

        visibleCount.value = Math.max(0, count);
    };

    // Measure item widths
    const measureItems = async () => {
        await nextTick();

        if (!measurementRef.value) return;

        const newWidths = new Map<string | number, number>();
        itemRefs.value.forEach((el, id) => {
            if (el) {
                newWidths.set(id, el.offsetWidth);
            }
        });

        itemWidths.value = newWidths;
        calculateVisibleItems();
    };

    // Set up item ref
    const setItemRef = (id: string | number, el: HTMLElement | null) => {
        if (el) {
            itemRefs.value.set(id, el);
        } else {
            itemRefs.value.delete(id);
        }
    };

    // Observe container resize
    useResizeObserver(containerRef, (entries) => {
        const entry = entries[0];
        if (entry) {
            containerWidth.value = entry.contentRect.width;
            calculateVisibleItems();
        }
    });

    // Re-measure when items change
    watch(
        () => toValue(items),
        async () => {
            const itemsValue = toValue(items);
            visibleCount.value = itemsValue.length;
            await measureItems();
        },
        { deep: true },
    );

    onMounted(async () => {
        const itemsValue = toValue(items);
        visibleCount.value = itemsValue.length;
        await nextTick();
        await measureItems();
    });

    return {
        containerRef,
        measurementRef,
        setItemRef,
        visibleItems,
        overflowItems,
        hasOverflow,
        visibleCount,
        remeasure: measureItems,
    };
}
