(function() {
	try {
		var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {};
		e.SENTRY_RELEASE = { id: "a2373c7004d0269c74d9ea84d69f613722a72468" };
	} catch (e) {}
})();
try {
	(function() {
		var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
		n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "f80db66c-0c47-4685-9d2a-84089f8b74f5", e._sentryDebugIdIdentifier = "sentry-dbid-f80db66c-0c47-4685-9d2a-84089f8b74f5");
	})();
} catch (e) {}
import { F as SidebarTrigger_default, G as cn, I as Button_default, J as Collapsible_default, K as CollapsibleTrigger_default, L as Separator_default, R as _plugin_vue_export_helper_default, W as Input_default, a as ScrollBar_default, d as DialogHeader_default, f as DialogDescription_default, i as ScrollArea_default, l as DialogTrigger_default, m as Dialog_default, n as useSigmaRulesStore, p as DialogContent_default, q as CollapsibleContent_default, r as Badge_default, u as DialogTitle_default, z as Skeleton_default } from "../main.mjs";
import { a as ComboboxInput_default, c as ComboboxAnchor_default, i as ComboboxItem_default, l as Combobox_default, n as ComboboxItemIndicator, o as ComboboxGroup_default, r as ComboboxList_default, s as ComboboxEmpty_default, t as PrismEditor_default } from "./PrismEditor-TnP7lcFX.js";
import { t as Label_default } from "./label-Ds9pnXNm.js";
import { Fragment, computed, createBlock, createCommentVNode, createTextVNode, createVNode, defineComponent, mergeProps, onMounted, onUnmounted, openBlock, reactive, ref, renderList, renderSlot, resolveComponent, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderSlot, ssrRenderStyle } from "vue/server-renderer";
import { Toggle, useForwardPropsEmits } from "reka-ui";
import { cva } from "class-variance-authority";
import { reactiveOmit, useClipboard } from "@vueuse/core";
import { Check, ChevronDown, Clipboard, Download, ExternalLink, Github, Loader2, Search, Share, XCircle } from "lucide-vue-next";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue-sonner";
import { useHead } from "@unhead/vue";
var Alert_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Alert",
	__ssrInlineRender: true,
	props: {
		class: {},
		variant: {}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: unref(cn)(unref(alertVariants)({ variant: __props.variant }), props.class),
				role: "alert"
			}, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div>`);
		};
	}
});
var _sfc_setup$8 = Alert_vue_vue_type_script_setup_true_lang_default.setup;
Alert_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/alert/Alert.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var Alert_default = Alert_vue_vue_type_script_setup_true_lang_default;
var AlertDescription_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "AlertDescription",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: unref(cn)("text-sm [&_p]:leading-relaxed", props.class) }, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div>`);
		};
	}
});
var _sfc_setup$7 = AlertDescription_vue_vue_type_script_setup_true_lang_default.setup;
AlertDescription_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/alert/AlertDescription.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var AlertDescription_default = AlertDescription_vue_vue_type_script_setup_true_lang_default;
var AlertTitle_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "AlertTitle",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<h5${ssrRenderAttrs(mergeProps({ class: unref(cn)("mb-1 font-medium leading-none tracking-tight", props.class) }, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</h5>`);
		};
	}
});
var _sfc_setup$6 = AlertTitle_vue_vue_type_script_setup_true_lang_default.setup;
AlertTitle_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/alert/AlertTitle.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var AlertTitle_default = AlertTitle_vue_vue_type_script_setup_true_lang_default;
const alertVariants = cva("relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7", {
	variants: { variant: {
		default: "bg-background text-foreground",
		destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
	} },
	defaultVariants: { variant: "default" }
});
var Toggle_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Toggle",
	__ssrInlineRender: true,
	props: {
		defaultValue: { type: Boolean },
		modelValue: { type: [Boolean, null] },
		disabled: {
			type: Boolean,
			default: false
		},
		asChild: { type: Boolean },
		as: {},
		name: {},
		required: { type: Boolean },
		class: {},
		variant: { default: "default" },
		size: { default: "default" }
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "size", "variant"), emits);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Toggle), mergeProps(unref(forwarded), { class: unref(cn)(unref(toggleVariants)({
				variant: __props.variant,
				size: __props.size
			}), props.class) }, _attrs), {
				default: withCtx((slotProps, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", slotProps, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default", slotProps)];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$5 = Toggle_vue_vue_type_script_setup_true_lang_default.setup;
Toggle_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/toggle/Toggle.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var Toggle_default = Toggle_vue_vue_type_script_setup_true_lang_default;
const toggleVariants = cva("inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-transparent",
			outline: "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground"
		},
		size: {
			default: "h-9 px-2 min-w-9",
			sm: "h-8 px-1.5 min-w-8",
			lg: "h-10 px-2.5 min-w-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function generateLogsourceMapping(rules) {
	const mapping = {};
	rules.forEach((rule) => {
		if (rule.logsource?.product) {
			if (!mapping[rule.logsource.product]) mapping[rule.logsource.product] = {
				type: "product",
				items: /* @__PURE__ */ new Set()
			};
			if (rule.logsource.category) {
				mapping[rule.logsource.product].items.add(rule.logsource.category);
				if (!mapping[rule.logsource.category]) mapping[rule.logsource.category] = {
					type: "category",
					items: /* @__PURE__ */ new Set()
				};
			}
			if (rule.logsource.service) {
				mapping[rule.logsource.product].items.add(rule.logsource.service);
				if (!mapping[rule.logsource.service]) mapping[rule.logsource.service] = {
					type: "service",
					items: /* @__PURE__ */ new Set()
				};
			}
		}
	});
	return mapping;
}
function extractLogsourceOptions(rules) {
	const options = /* @__PURE__ */ new Set();
	rules.forEach((rule) => {
		if (rule.logsource?.product) options.add(rule.logsource.product);
		if (rule.logsource?.category) options.add(rule.logsource.category);
		if (rule.logsource?.service) options.add(rule.logsource.service);
	});
	return Array.from(options).sort();
}
const STATUS_OPTIONS = [
	"stable",
	"test",
	"experimental",
	"deprecated",
	"unsupported"
];
var SearchFilters_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SearchFilters",
	__ssrInlineRender: true,
	props: {
		statusFilters: {},
		selectedProduct: {},
		logsourceSortingStyle: {},
		allRules: {}
	},
	emits: [
		"update:statusFilters",
		"update:selectedProduct",
		"update:logsourceSorting"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const productSearchQuery = ref("");
		const logsourceMapping = computed(() => generateLogsourceMapping(props.allRules));
		function getOptionType(option) {
			return logsourceMapping.value[option]?.type || null;
		}
		const enabledStatusFilters = computed(() => {
			return Object.entries(props.statusFilters).filter(([_, enabled]) => enabled).map(([status]) => status);
		});
		function getActiveFiltersCount() {
			let count = enabledStatusFilters.value.length;
			if (props.selectedProduct && props.selectedProduct.trim() !== "") count++;
			return count.toString();
		}
		function toggleStatusFilter(status) {
			const newFilters = { ...props.statusFilters };
			newFilters[status] = !newFilters[status];
			emit("update:statusFilters", newFilters);
		}
		const productOptions = computed(() => extractLogsourceOptions(props.allRules));
		const filteredProductOptions = computed(() => {
			if (!productSearchQuery.value) return productOptions.value;
			const query = productSearchQuery.value.toLowerCase();
			return productOptions.value.filter((product) => product.toLowerCase().includes(query));
		});
		function onProductSearch(event) {
			productSearchQuery.value = event.target.value;
		}
		function updateSelectedProduct(value) {
			if (props.selectedProduct === value) emit("update:selectedProduct", "");
			else emit("update:selectedProduct", value);
		}
		function toggleLogSourceSorting(pressed) {
			emit("update:logsourceSorting", pressed ? "category-product-service" : "product-category-service");
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mt-4" }, _attrs))} data-v-b50e56b4>`);
			_push(ssrRenderComponent(unref(Collapsible_default), null, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(unref(CollapsibleTrigger_default), { asChild: "" }, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) {
									_push$2(`<button class="flex w-full items-center justify-between rounded-lg border bg-card px-4 py-3 text-left hover:bg-accent/50 transition-colors" data-v-b50e56b4${_scopeId$1}><div class="flex items-center gap-2" data-v-b50e56b4${_scopeId$1}><h3 class="text-sm font-semibold" data-v-b50e56b4${_scopeId$1}>Filters</h3>`);
									if (getActiveFiltersCount() !== "0") _push$2(ssrRenderComponent(unref(Badge_default), {
										variant: "secondary",
										class: "h-5 min-w-5 px-1.5 text-xs font-medium"
									}, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) _push$3(`${ssrInterpolate(getActiveFiltersCount())}`);
											else return [createTextVNode(toDisplayString(getActiveFiltersCount()), 1)];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									else _push$2(`<!---->`);
									_push$2(`</div>`);
									_push$2(ssrRenderComponent(unref(ChevronDown), { class: "h-4 w-4 text-muted-foreground transition-transform duration-200 ui-expanded:rotate-180" }, null, _parent$2, _scopeId$1));
									_push$2(`</button>`);
								} else return [createVNode("button", { class: "flex w-full items-center justify-between rounded-lg border bg-card px-4 py-3 text-left hover:bg-accent/50 transition-colors" }, [createVNode("div", { class: "flex items-center gap-2" }, [createVNode("h3", { class: "text-sm font-semibold" }, "Filters"), getActiveFiltersCount() !== "0" ? (openBlock(), createBlock(unref(Badge_default), {
									key: 0,
									variant: "secondary",
									class: "h-5 min-w-5 px-1.5 text-xs font-medium"
								}, {
									default: withCtx(() => [createTextVNode(toDisplayString(getActiveFiltersCount()), 1)]),
									_: 1
								})) : createCommentVNode("", true)]), createVNode(unref(ChevronDown), { class: "h-4 w-4 text-muted-foreground transition-transform duration-200 ui-expanded:rotate-180" })])];
							}),
							_: 1
						}, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(CollapsibleContent_default), { class: "pt-3" }, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) {
									_push$2(`<div class="space-y-4 rounded-lg border bg-card p-4" data-v-b50e56b4${_scopeId$1}><div class="space-y-3" data-v-b50e56b4${_scopeId$1}><div class="flex items-center justify-between" data-v-b50e56b4${_scopeId$1}><h4 class="text-xs font-medium text-muted-foreground uppercase tracking-wide" data-v-b50e56b4${_scopeId$1}> Status </h4><span class="text-xs text-muted-foreground" data-v-b50e56b4${_scopeId$1}>${ssrInterpolate(enabledStatusFilters.value.length)} selected </span></div><div class="flex flex-wrap gap-2" data-v-b50e56b4${_scopeId$1}><!--[-->`);
									ssrRenderList(unref(STATUS_OPTIONS), (status) => {
										_push$2(ssrRenderComponent(unref(Badge_default), {
											key: status,
											variant: "outline",
											class: [__props.statusFilters[status] ? "bg-primary/10 text-primary border-primary hover:bg-primary/20" : "bg-background hover:bg-accent", "cursor-pointer transition-all select-none px-3 py-1.5"],
											onClick: ($event) => toggleStatusFilter(status)
										}, {
											default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
												if (_push$3) _push$3(`${ssrInterpolate(status)}`);
												else return [createTextVNode(toDisplayString(status), 1)];
											}),
											_: 2
										}, _parent$2, _scopeId$1));
									});
									_push$2(`<!--]--></div></div>`);
									_push$2(ssrRenderComponent(unref(Separator_default), null, null, _parent$2, _scopeId$1));
									_push$2(`<div class="space-y-3" data-v-b50e56b4${_scopeId$1}><div class="flex items-center justify-between" data-v-b50e56b4${_scopeId$1}><h4 class="text-xs font-medium text-muted-foreground uppercase tracking-wide" data-v-b50e56b4${_scopeId$1}> Logsource </h4>`);
									if (__props.selectedProduct) _push$2(`<button class="text-xs text-muted-foreground hover:text-foreground transition-colors" data-v-b50e56b4${_scopeId$1}> Clear </button>`);
									else _push$2(`<!---->`);
									_push$2(`</div>`);
									_push$2(ssrRenderComponent(unref(Combobox_default), {
										"model-value": __props.selectedProduct,
										"onUpdate:modelValue": updateSelectedProduct
									}, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) {
												_push$3(ssrRenderComponent(unref(ComboboxAnchor_default), null, {
													default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
														if (_push$4) {
															_push$4(`<div class="relative w-full" data-v-b50e56b4${_scopeId$3}>`);
															_push$4(ssrRenderComponent(unref(ComboboxInput_default), {
																class: "pl-9 h-9 w-full",
																placeholder: "Search product, category, or service...",
																onInput: onProductSearch,
																"display-value": (val) => val
															}, null, _parent$4, _scopeId$3));
															_push$4(`<span class="absolute start-0 inset-y-0 flex items-center justify-center px-3" data-v-b50e56b4${_scopeId$3}>`);
															_push$4(ssrRenderComponent(unref(Search), { class: "size-4 text-muted-foreground" }, null, _parent$4, _scopeId$3));
															_push$4(`</span></div>`);
														} else return [createVNode("div", { class: "relative w-full" }, [createVNode(unref(ComboboxInput_default), {
															class: "pl-9 h-9 w-full",
															placeholder: "Search product, category, or service...",
															onInput: onProductSearch,
															"display-value": (val) => val
														}, null, 8, ["display-value"]), createVNode("span", { class: "absolute start-0 inset-y-0 flex items-center justify-center px-3" }, [createVNode(unref(Search), { class: "size-4 text-muted-foreground" })])])];
													}),
													_: 1
												}, _parent$3, _scopeId$2));
												_push$3(ssrRenderComponent(unref(ComboboxList_default), { class: "w-full max-h-60" }, {
													default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
														if (_push$4) {
															_push$4(ssrRenderComponent(unref(ComboboxEmpty_default), { class: "py-6 text-center text-sm text-muted-foreground" }, {
																default: withCtx((_$4, _push$5, _parent$5, _scopeId$4) => {
																	if (_push$5) _push$5(` No matches found `);
																	else return [createTextVNode(" No matches found ")];
																}),
																_: 1
															}, _parent$4, _scopeId$3));
															_push$4(ssrRenderComponent(unref(ComboboxGroup_default), null, {
																default: withCtx((_$4, _push$5, _parent$5, _scopeId$4) => {
																	if (_push$5) {
																		_push$5(`<!--[-->`);
																		ssrRenderList(filteredProductOptions.value, (option) => {
																			_push$5(ssrRenderComponent(unref(ComboboxItem_default), {
																				key: option,
																				value: option,
																				class: "flex items-center justify-between px-3 py-2"
																			}, {
																				default: withCtx((_$5, _push$6, _parent$6, _scopeId$5) => {
																					if (_push$6) {
																						_push$6(`<div class="flex items-center gap-2" data-v-b50e56b4${_scopeId$5}><span class="text-sm" data-v-b50e56b4${_scopeId$5}>${ssrInterpolate(option)}</span>`);
																						if (getOptionType(option)) _push$6(ssrRenderComponent(unref(Badge_default), {
																							variant: "secondary",
																							class: "text-[10px] px-1.5 py-0"
																						}, {
																							default: withCtx((_$6, _push$7, _parent$7, _scopeId$6) => {
																								if (_push$7) _push$7(`${ssrInterpolate(getOptionType(option))}`);
																								else return [createTextVNode(toDisplayString(getOptionType(option)), 1)];
																							}),
																							_: 2
																						}, _parent$6, _scopeId$5));
																						else _push$6(`<!---->`);
																						_push$6(`</div>`);
																						_push$6(ssrRenderComponent(unref(ComboboxItemIndicator), null, {
																							default: withCtx((_$6, _push$7, _parent$7, _scopeId$6) => {
																								if (_push$7) _push$7(ssrRenderComponent(unref(Check), { class: unref(cn)("h-4 w-4") }, null, _parent$7, _scopeId$6));
																								else return [createVNode(unref(Check), { class: unref(cn)("h-4 w-4") }, null, 8, ["class"])];
																							}),
																							_: 2
																						}, _parent$6, _scopeId$5));
																					} else return [createVNode("div", { class: "flex items-center gap-2" }, [createVNode("span", { class: "text-sm" }, toDisplayString(option), 1), getOptionType(option) ? (openBlock(), createBlock(unref(Badge_default), {
																						key: 0,
																						variant: "secondary",
																						class: "text-[10px] px-1.5 py-0"
																					}, {
																						default: withCtx(() => [createTextVNode(toDisplayString(getOptionType(option)), 1)]),
																						_: 2
																					}, 1024)) : createCommentVNode("", true)]), createVNode(unref(ComboboxItemIndicator), null, {
																						default: withCtx(() => [createVNode(unref(Check), { class: unref(cn)("h-4 w-4") }, null, 8, ["class"])]),
																						_: 1
																					})];
																				}),
																				_: 2
																			}, _parent$5, _scopeId$4));
																		});
																		_push$5(`<!--]-->`);
																	} else return [(openBlock(true), createBlock(Fragment, null, renderList(filteredProductOptions.value, (option) => {
																		return openBlock(), createBlock(unref(ComboboxItem_default), {
																			key: option,
																			value: option,
																			class: "flex items-center justify-between px-3 py-2"
																		}, {
																			default: withCtx(() => [createVNode("div", { class: "flex items-center gap-2" }, [createVNode("span", { class: "text-sm" }, toDisplayString(option), 1), getOptionType(option) ? (openBlock(), createBlock(unref(Badge_default), {
																				key: 0,
																				variant: "secondary",
																				class: "text-[10px] px-1.5 py-0"
																			}, {
																				default: withCtx(() => [createTextVNode(toDisplayString(getOptionType(option)), 1)]),
																				_: 2
																			}, 1024)) : createCommentVNode("", true)]), createVNode(unref(ComboboxItemIndicator), null, {
																				default: withCtx(() => [createVNode(unref(Check), { class: unref(cn)("h-4 w-4") }, null, 8, ["class"])]),
																				_: 1
																			})]),
																			_: 2
																		}, 1032, ["value"]);
																	}), 128))];
																}),
																_: 1
															}, _parent$4, _scopeId$3));
														} else return [createVNode(unref(ComboboxEmpty_default), { class: "py-6 text-center text-sm text-muted-foreground" }, {
															default: withCtx(() => [createTextVNode(" No matches found ")]),
															_: 1
														}), createVNode(unref(ComboboxGroup_default), null, {
															default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(filteredProductOptions.value, (option) => {
																return openBlock(), createBlock(unref(ComboboxItem_default), {
																	key: option,
																	value: option,
																	class: "flex items-center justify-between px-3 py-2"
																}, {
																	default: withCtx(() => [createVNode("div", { class: "flex items-center gap-2" }, [createVNode("span", { class: "text-sm" }, toDisplayString(option), 1), getOptionType(option) ? (openBlock(), createBlock(unref(Badge_default), {
																		key: 0,
																		variant: "secondary",
																		class: "text-[10px] px-1.5 py-0"
																	}, {
																		default: withCtx(() => [createTextVNode(toDisplayString(getOptionType(option)), 1)]),
																		_: 2
																	}, 1024)) : createCommentVNode("", true)]), createVNode(unref(ComboboxItemIndicator), null, {
																		default: withCtx(() => [createVNode(unref(Check), { class: unref(cn)("h-4 w-4") }, null, 8, ["class"])]),
																		_: 1
																	})]),
																	_: 2
																}, 1032, ["value"]);
															}), 128))]),
															_: 1
														})];
													}),
													_: 1
												}, _parent$3, _scopeId$2));
											} else return [createVNode(unref(ComboboxAnchor_default), null, {
												default: withCtx(() => [createVNode("div", { class: "relative w-full" }, [createVNode(unref(ComboboxInput_default), {
													class: "pl-9 h-9 w-full",
													placeholder: "Search product, category, or service...",
													onInput: onProductSearch,
													"display-value": (val) => val
												}, null, 8, ["display-value"]), createVNode("span", { class: "absolute start-0 inset-y-0 flex items-center justify-center px-3" }, [createVNode(unref(Search), { class: "size-4 text-muted-foreground" })])])]),
												_: 1
											}), createVNode(unref(ComboboxList_default), { class: "w-full max-h-60" }, {
												default: withCtx(() => [createVNode(unref(ComboboxEmpty_default), { class: "py-6 text-center text-sm text-muted-foreground" }, {
													default: withCtx(() => [createTextVNode(" No matches found ")]),
													_: 1
												}), createVNode(unref(ComboboxGroup_default), null, {
													default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(filteredProductOptions.value, (option) => {
														return openBlock(), createBlock(unref(ComboboxItem_default), {
															key: option,
															value: option,
															class: "flex items-center justify-between px-3 py-2"
														}, {
															default: withCtx(() => [createVNode("div", { class: "flex items-center gap-2" }, [createVNode("span", { class: "text-sm" }, toDisplayString(option), 1), getOptionType(option) ? (openBlock(), createBlock(unref(Badge_default), {
																key: 0,
																variant: "secondary",
																class: "text-[10px] px-1.5 py-0"
															}, {
																default: withCtx(() => [createTextVNode(toDisplayString(getOptionType(option)), 1)]),
																_: 2
															}, 1024)) : createCommentVNode("", true)]), createVNode(unref(ComboboxItemIndicator), null, {
																default: withCtx(() => [createVNode(unref(Check), { class: unref(cn)("h-4 w-4") }, null, 8, ["class"])]),
																_: 1
															})]),
															_: 2
														}, 1032, ["value"]);
													}), 128))]),
													_: 1
												})]),
												_: 1
											})];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(`</div>`);
									_push$2(ssrRenderComponent(unref(Separator_default), null, null, _parent$2, _scopeId$1));
									_push$2(`<div class="space-y-3" data-v-b50e56b4${_scopeId$1}><h4 class="text-xs font-medium text-muted-foreground uppercase tracking-wide" data-v-b50e56b4${_scopeId$1}> Group By </h4><div class="flex items-center gap-3" data-v-b50e56b4${_scopeId$1}><span class="${ssrRenderClass([__props.logsourceSortingStyle === "product-category-service" ? "font-medium text-foreground" : "text-muted-foreground", "text-sm"])}" data-v-b50e56b4${_scopeId$1}> Product </span>`);
									_push$2(ssrRenderComponent(unref(Toggle_default), {
										pressed: __props.logsourceSortingStyle === "category-product-service",
										"onUpdate:pressed": toggleLogSourceSorting,
										size: "sm",
										class: "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
									}, null, _parent$2, _scopeId$1));
									_push$2(`<span class="${ssrRenderClass([__props.logsourceSortingStyle === "category-product-service" ? "font-medium text-foreground" : "text-muted-foreground", "text-sm"])}" data-v-b50e56b4${_scopeId$1}> Category </span></div></div></div>`);
								} else return [createVNode("div", { class: "space-y-4 rounded-lg border bg-card p-4" }, [
									createVNode("div", { class: "space-y-3" }, [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h4", { class: "text-xs font-medium text-muted-foreground uppercase tracking-wide" }, " Status "), createVNode("span", { class: "text-xs text-muted-foreground" }, toDisplayString(enabledStatusFilters.value.length) + " selected ", 1)]), createVNode("div", { class: "flex flex-wrap gap-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(STATUS_OPTIONS), (status) => {
										return openBlock(), createBlock(unref(Badge_default), {
											key: status,
											variant: "outline",
											class: [__props.statusFilters[status] ? "bg-primary/10 text-primary border-primary hover:bg-primary/20" : "bg-background hover:bg-accent", "cursor-pointer transition-all select-none px-3 py-1.5"],
											onClick: ($event) => toggleStatusFilter(status)
										}, {
											default: withCtx(() => [createTextVNode(toDisplayString(status), 1)]),
											_: 2
										}, 1032, ["class", "onClick"]);
									}), 128))])]),
									createVNode(unref(Separator_default)),
									createVNode("div", { class: "space-y-3" }, [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h4", { class: "text-xs font-medium text-muted-foreground uppercase tracking-wide" }, " Logsource "), __props.selectedProduct ? (openBlock(), createBlock("button", {
										key: 0,
										onClick: ($event) => updateSelectedProduct(""),
										class: "text-xs text-muted-foreground hover:text-foreground transition-colors"
									}, " Clear ", 8, ["onClick"])) : createCommentVNode("", true)]), createVNode(unref(Combobox_default), {
										"model-value": __props.selectedProduct,
										"onUpdate:modelValue": updateSelectedProduct
									}, {
										default: withCtx(() => [createVNode(unref(ComboboxAnchor_default), null, {
											default: withCtx(() => [createVNode("div", { class: "relative w-full" }, [createVNode(unref(ComboboxInput_default), {
												class: "pl-9 h-9 w-full",
												placeholder: "Search product, category, or service...",
												onInput: onProductSearch,
												"display-value": (val) => val
											}, null, 8, ["display-value"]), createVNode("span", { class: "absolute start-0 inset-y-0 flex items-center justify-center px-3" }, [createVNode(unref(Search), { class: "size-4 text-muted-foreground" })])])]),
											_: 1
										}), createVNode(unref(ComboboxList_default), { class: "w-full max-h-60" }, {
											default: withCtx(() => [createVNode(unref(ComboboxEmpty_default), { class: "py-6 text-center text-sm text-muted-foreground" }, {
												default: withCtx(() => [createTextVNode(" No matches found ")]),
												_: 1
											}), createVNode(unref(ComboboxGroup_default), null, {
												default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(filteredProductOptions.value, (option) => {
													return openBlock(), createBlock(unref(ComboboxItem_default), {
														key: option,
														value: option,
														class: "flex items-center justify-between px-3 py-2"
													}, {
														default: withCtx(() => [createVNode("div", { class: "flex items-center gap-2" }, [createVNode("span", { class: "text-sm" }, toDisplayString(option), 1), getOptionType(option) ? (openBlock(), createBlock(unref(Badge_default), {
															key: 0,
															variant: "secondary",
															class: "text-[10px] px-1.5 py-0"
														}, {
															default: withCtx(() => [createTextVNode(toDisplayString(getOptionType(option)), 1)]),
															_: 2
														}, 1024)) : createCommentVNode("", true)]), createVNode(unref(ComboboxItemIndicator), null, {
															default: withCtx(() => [createVNode(unref(Check), { class: unref(cn)("h-4 w-4") }, null, 8, ["class"])]),
															_: 1
														})]),
														_: 2
													}, 1032, ["value"]);
												}), 128))]),
												_: 1
											})]),
											_: 1
										})]),
										_: 1
									}, 8, ["model-value"])]),
									createVNode(unref(Separator_default)),
									createVNode("div", { class: "space-y-3" }, [createVNode("h4", { class: "text-xs font-medium text-muted-foreground uppercase tracking-wide" }, " Group By "), createVNode("div", { class: "flex items-center gap-3" }, [
										createVNode("span", { class: ["text-sm", __props.logsourceSortingStyle === "product-category-service" ? "font-medium text-foreground" : "text-muted-foreground"] }, " Product ", 2),
										createVNode(unref(Toggle_default), {
											pressed: __props.logsourceSortingStyle === "category-product-service",
											"onUpdate:pressed": toggleLogSourceSorting,
											size: "sm",
											class: "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
										}, null, 8, ["pressed"]),
										createVNode("span", { class: ["text-sm", __props.logsourceSortingStyle === "category-product-service" ? "font-medium text-foreground" : "text-muted-foreground"] }, " Category ", 2)
									])])
								])];
							}),
							_: 1
						}, _parent$1, _scopeId));
					} else return [createVNode(unref(CollapsibleTrigger_default), { asChild: "" }, {
						default: withCtx(() => [createVNode("button", { class: "flex w-full items-center justify-between rounded-lg border bg-card px-4 py-3 text-left hover:bg-accent/50 transition-colors" }, [createVNode("div", { class: "flex items-center gap-2" }, [createVNode("h3", { class: "text-sm font-semibold" }, "Filters"), getActiveFiltersCount() !== "0" ? (openBlock(), createBlock(unref(Badge_default), {
							key: 0,
							variant: "secondary",
							class: "h-5 min-w-5 px-1.5 text-xs font-medium"
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(getActiveFiltersCount()), 1)]),
							_: 1
						})) : createCommentVNode("", true)]), createVNode(unref(ChevronDown), { class: "h-4 w-4 text-muted-foreground transition-transform duration-200 ui-expanded:rotate-180" })])]),
						_: 1
					}), createVNode(unref(CollapsibleContent_default), { class: "pt-3" }, {
						default: withCtx(() => [createVNode("div", { class: "space-y-4 rounded-lg border bg-card p-4" }, [
							createVNode("div", { class: "space-y-3" }, [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h4", { class: "text-xs font-medium text-muted-foreground uppercase tracking-wide" }, " Status "), createVNode("span", { class: "text-xs text-muted-foreground" }, toDisplayString(enabledStatusFilters.value.length) + " selected ", 1)]), createVNode("div", { class: "flex flex-wrap gap-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(STATUS_OPTIONS), (status) => {
								return openBlock(), createBlock(unref(Badge_default), {
									key: status,
									variant: "outline",
									class: [__props.statusFilters[status] ? "bg-primary/10 text-primary border-primary hover:bg-primary/20" : "bg-background hover:bg-accent", "cursor-pointer transition-all select-none px-3 py-1.5"],
									onClick: ($event) => toggleStatusFilter(status)
								}, {
									default: withCtx(() => [createTextVNode(toDisplayString(status), 1)]),
									_: 2
								}, 1032, ["class", "onClick"]);
							}), 128))])]),
							createVNode(unref(Separator_default)),
							createVNode("div", { class: "space-y-3" }, [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h4", { class: "text-xs font-medium text-muted-foreground uppercase tracking-wide" }, " Logsource "), __props.selectedProduct ? (openBlock(), createBlock("button", {
								key: 0,
								onClick: ($event) => updateSelectedProduct(""),
								class: "text-xs text-muted-foreground hover:text-foreground transition-colors"
							}, " Clear ", 8, ["onClick"])) : createCommentVNode("", true)]), createVNode(unref(Combobox_default), {
								"model-value": __props.selectedProduct,
								"onUpdate:modelValue": updateSelectedProduct
							}, {
								default: withCtx(() => [createVNode(unref(ComboboxAnchor_default), null, {
									default: withCtx(() => [createVNode("div", { class: "relative w-full" }, [createVNode(unref(ComboboxInput_default), {
										class: "pl-9 h-9 w-full",
										placeholder: "Search product, category, or service...",
										onInput: onProductSearch,
										"display-value": (val) => val
									}, null, 8, ["display-value"]), createVNode("span", { class: "absolute start-0 inset-y-0 flex items-center justify-center px-3" }, [createVNode(unref(Search), { class: "size-4 text-muted-foreground" })])])]),
									_: 1
								}), createVNode(unref(ComboboxList_default), { class: "w-full max-h-60" }, {
									default: withCtx(() => [createVNode(unref(ComboboxEmpty_default), { class: "py-6 text-center text-sm text-muted-foreground" }, {
										default: withCtx(() => [createTextVNode(" No matches found ")]),
										_: 1
									}), createVNode(unref(ComboboxGroup_default), null, {
										default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(filteredProductOptions.value, (option) => {
											return openBlock(), createBlock(unref(ComboboxItem_default), {
												key: option,
												value: option,
												class: "flex items-center justify-between px-3 py-2"
											}, {
												default: withCtx(() => [createVNode("div", { class: "flex items-center gap-2" }, [createVNode("span", { class: "text-sm" }, toDisplayString(option), 1), getOptionType(option) ? (openBlock(), createBlock(unref(Badge_default), {
													key: 0,
													variant: "secondary",
													class: "text-[10px] px-1.5 py-0"
												}, {
													default: withCtx(() => [createTextVNode(toDisplayString(getOptionType(option)), 1)]),
													_: 2
												}, 1024)) : createCommentVNode("", true)]), createVNode(unref(ComboboxItemIndicator), null, {
													default: withCtx(() => [createVNode(unref(Check), { class: unref(cn)("h-4 w-4") }, null, 8, ["class"])]),
													_: 1
												})]),
												_: 2
											}, 1032, ["value"]);
										}), 128))]),
										_: 1
									})]),
									_: 1
								})]),
								_: 1
							}, 8, ["model-value"])]),
							createVNode(unref(Separator_default)),
							createVNode("div", { class: "space-y-3" }, [createVNode("h4", { class: "text-xs font-medium text-muted-foreground uppercase tracking-wide" }, " Group By "), createVNode("div", { class: "flex items-center gap-3" }, [
								createVNode("span", { class: ["text-sm", __props.logsourceSortingStyle === "product-category-service" ? "font-medium text-foreground" : "text-muted-foreground"] }, " Product ", 2),
								createVNode(unref(Toggle_default), {
									pressed: __props.logsourceSortingStyle === "category-product-service",
									"onUpdate:pressed": toggleLogSourceSorting,
									size: "sm",
									class: "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
								}, null, 8, ["pressed"]),
								createVNode("span", { class: ["text-sm", __props.logsourceSortingStyle === "category-product-service" ? "font-medium text-foreground" : "text-muted-foreground"] }, " Category ", 2)
							])])
						])]),
						_: 1
					})];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
var _sfc_setup$4 = SearchFilters_vue_vue_type_script_setup_true_lang_default.setup;
SearchFilters_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/sigma/SearchFilters.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var SearchFilters_default = /* @__PURE__ */ _plugin_vue_export_helper_default(SearchFilters_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-b50e56b4"]]);
var ITEM_HEIGHT = 150;
var GROUP_HEADER_HEIGHT = 50;
var BUFFER_SIZE = 12;
var SigmaRuleList_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SigmaRuleList",
	__ssrInlineRender: true,
	props: { initialRuleId: {} },
	setup(__props) {
		const props = __props;
		const router = useRouter();
		const route = useRoute();
		const sigmaRulesStore = useSigmaRulesStore();
		const searchQuery = ref("");
		const isLoading = computed(() => sigmaRulesStore.isLoading);
		const error = computed(() => sigmaRulesStore.error);
		const allRules = computed(() => sigmaRulesStore.rules);
		const localError = ref(null);
		const statusFilters = reactive({
			stable: true,
			test: true,
			experimental: true,
			deprecated: false,
			unsupported: false
		});
		const selectedProduct = ref("");
		const logsourceSortingStyle = ref("product-category-service");
		function onUpdateStatusFilters(filters) {
			Object.assign(statusFilters, filters);
			applyFilters();
		}
		function onUpdateSelectedProduct(product) {
			selectedProduct.value = product;
			applyFilters();
		}
		function clearSearch() {
			if (searchTimeout) {
				clearTimeout(searchTimeout);
				searchTimeout = null;
			}
			searchQuery.value = "";
			sigmaRulesStore.searchRules("");
			resetScroll();
		}
		const filteredRules = computed(() => {
			let rules = sigmaRulesStore.filteredRules();
			rules = rules.filter((rule) => {
				if (!rule.status) return false;
				return statusFilters[rule.status.toLowerCase()] === true;
			});
			if (selectedProduct.value) {
				const selected = selectedProduct.value.toLowerCase();
				rules = rules.filter((rule) => {
					const logsource = rule.logsource || {};
					const product = logsource.product?.toLowerCase() || "";
					const category = logsource.category?.toLowerCase() || "";
					const service = logsource.service?.toLowerCase() || "";
					return product === selected || category === selected || service === selected;
				});
			}
			return rules;
		});
		const groupedRulesCache = ref({
			key: "",
			result: []
		});
		const groupedRules = computed(() => {
			const cacheKey = JSON.stringify({
				rulesCount: filteredRules.value.length,
				sortingStyle: logsourceSortingStyle.value,
				searchQuery: sigmaRulesStore.searchQuery,
				statusFilters: Object.entries(statusFilters).filter(([_, v]) => v).map(([k]) => k).join(","),
				product: selectedProduct.value
			});
			if (groupedRulesCache.value.key === cacheKey && groupedRulesCache.value.result.length > 0) return groupedRulesCache.value.result;
			const rules = filteredRules.value;
			const groups = {};
			rules.forEach((rule) => {
				let groupKey = "Other";
				if (logsourceSortingStyle.value === "product-category-service") groupKey = rule.logsource?.product || "Other";
				else groupKey = rule.logsource?.category || "Other";
				if (!groups[groupKey]) groups[groupKey] = [];
				groups[groupKey].push(rule);
			});
			const result = Object.entries(groups).map(([label, rules$1]) => ({
				label,
				rules: rules$1,
				expanded: true
			})).sort((a, b) => a.label.localeCompare(b.label));
			groupedRulesCache.value = {
				key: cacheKey,
				result
			};
			return result;
		});
		const containerRef = ref(null);
		const scrollTop = ref(0);
		const viewportHeight = ref(0);
		const groupPositionsCache = ref({
			key: "",
			positions: []
		});
		const allGroupPositions = computed(() => {
			const cacheKey = JSON.stringify({
				groupCount: groupedRules.value.length,
				itemCounts: groupedRules.value.map((g) => g.rules.length).join(",")
			});
			if (groupPositionsCache.value.key === cacheKey && groupPositionsCache.value.positions.length > 0) return groupPositionsCache.value.positions;
			const positions = [];
			let currentOffset = 0;
			groupedRules.value.forEach((group) => {
				const groupHeight = GROUP_HEADER_HEIGHT + group.rules.length * ITEM_HEIGHT;
				positions.push({
					label: group.label,
					items: group.rules.map((rule, index) => ({
						rule,
						index
					})),
					offsetTop: currentOffset,
					height: groupHeight
				});
				currentOffset += groupHeight + 24;
			});
			groupPositionsCache.value = {
				key: cacheKey,
				positions
			};
			return positions;
		});
		const totalHeight = computed(() => {
			if (allGroupPositions.value.length === 0) return 0;
			const lastGroup = allGroupPositions.value[allGroupPositions.value.length - 1];
			return lastGroup.offsetTop + lastGroup.height;
		});
		const visibleGroups = computed(() => {
			if (!containerRef.value) return [];
			const startOffset = Math.max(0, scrollTop.value - BUFFER_SIZE * ITEM_HEIGHT);
			const endOffset = scrollTop.value + viewportHeight.value + BUFFER_SIZE * ITEM_HEIGHT;
			return allGroupPositions.value.filter((group) => {
				return group.offsetTop + group.height > startOffset && group.offsetTop < endOffset;
			});
		});
		function updateScroll() {
			if (!containerRef.value) return;
			scrollTop.value = containerRef.value.scrollTop;
			viewportHeight.value = containerRef.value.clientHeight;
		}
		function isSelected(rule) {
			return sigmaRulesStore.currentRule?.id === rule.id || sigmaRulesStore.currentRule?.path === rule.path;
		}
		onMounted(async () => {
			try {
				console.log("SigmaRulesBrowser: Mounted, fetching rules...");
				await sigmaRulesStore.fetchRules();
				console.log(`SigmaRulesBrowser: Fetched ${sigmaRulesStore.rules.length} rules`);
				if (containerRef.value) {
					viewportHeight.value = containerRef.value.clientHeight;
					containerRef.value.addEventListener("scroll", updateScroll);
					console.log("SigmaRulesBrowser: Scroll listener attached");
				}
				const ruleIdToSelect = props.initialRuleId || route.query.ruleId;
				console.log("SigmaRulesBrowser: Rule ID to select:", ruleIdToSelect);
				if (ruleIdToSelect) await selectRuleById(ruleIdToSelect);
				updateScroll();
			} catch (err) {
				console.error("SigmaRulesBrowser: Error during initialization:", err);
				localError.value = err instanceof Error ? err.message : "Failed to initialize rules browser";
			}
		});
		onUnmounted(() => {
			if (containerRef.value) containerRef.value.removeEventListener("scroll", updateScroll);
		});
		let searchTimeout = null;
		function onSearch() {
			if (searchTimeout) clearTimeout(searchTimeout);
			searchTimeout = window.setTimeout(() => {
				sigmaRulesStore.searchRules(searchQuery.value);
				resetScroll();
				searchTimeout = null;
			}, 300);
		}
		function applyFilters() {
			resetScroll();
		}
		function onUpdateLogsourceSorting(style) {
			logsourceSortingStyle.value = style;
			applyFilters();
		}
		async function retryLoadRules() {
			localError.value = null;
			try {
				console.log("SigmaRulesBrowser: Retrying fetch rules...");
				await sigmaRulesStore.fetchRules(true);
				console.log(`SigmaRulesBrowser: Fetched ${sigmaRulesStore.rules.length} rules on retry`);
				if (containerRef.value) viewportHeight.value = containerRef.value.clientHeight;
				updateScroll();
			} catch (err) {
				console.error("SigmaRulesBrowser: Error during retry:", err);
				localError.value = err instanceof Error ? err.message : "Failed to load rules";
			}
		}
		function resetScroll() {
			if (containerRef.value) {
				containerRef.value.scrollTop = 0;
				scrollTop.value = 0;
			}
		}
		function selectRule(rule) {
			sigmaRulesStore.setCurrentRule(rule);
			router.replace({ query: {
				...route.query,
				ruleId: rule.id || rule.path
			} });
		}
		async function selectRuleById(ruleId) {
			const rule = allRules.value.find((r) => r.id === ruleId || r.path === ruleId);
			if (rule) await sigmaRulesStore.setCurrentRule(rule);
		}
		function getLevelBadgeClass(level) {
			const lowerLevel = level.toLowerCase();
			if (lowerLevel === "critical") return "bg-red-600 hover:bg-red-600";
			if (lowerLevel === "high") return "bg-red-500 hover:bg-red-500";
			if (lowerLevel === "medium") return "bg-amber-500 hover:bg-amber-500";
			if (lowerLevel === "low") return "bg-blue-500 hover:bg-blue-500";
			if (lowerLevel === "informational") return "bg-green-500 hover:bg-green-500";
			return "bg-gray-500 hover:bg-gray-500";
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col h-full overflow-hidden" }, _attrs))} data-v-08e59a55><div class="p-4 border-b bg-card shadow-xs" data-v-08e59a55><div class="relative w-full" data-v-08e59a55>`);
			_push(ssrRenderComponent(unref(Input_default), {
				modelValue: searchQuery.value,
				"onUpdate:modelValue": ($event) => searchQuery.value = $event,
				class: "w-full pl-9",
				placeholder: "Search across rules...",
				onInput: onSearch
			}, null, _parent));
			_push(ssrRenderComponent(unref(Search), { class: "h-4 w-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" }, null, _parent));
			if (searchQuery.value) _push(ssrRenderComponent(unref(Button_default), {
				variant: "ghost",
				size: "icon",
				class: "h-8 w-8 absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
				onClick: clearSearch
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(ssrRenderComponent(unref(XCircle), { class: "h-4 w-4" }, null, _parent$1, _scopeId));
					else return [createVNode(unref(XCircle), { class: "h-4 w-4" })];
				}),
				_: 1
			}, _parent));
			else _push(`<!---->`);
			_push(`</div>`);
			_push(ssrRenderComponent(SearchFilters_default, {
				"status-filters": statusFilters,
				"selected-product": selectedProduct.value,
				"logsource-sorting-style": logsourceSortingStyle.value,
				"all-rules": allRules.value,
				"onUpdate:statusFilters": onUpdateStatusFilters,
				"onUpdate:selectedProduct": onUpdateSelectedProduct,
				"onUpdate:logsourceSorting": onUpdateLogsourceSorting
			}, null, _parent));
			_push(`</div>`);
			if (error.value) {
				_push(`<div class="p-4 flex flex-col justify-center items-center grow text-red-500" data-v-08e59a55>`);
				_push(ssrRenderComponent(unref(Alert_default), {
					class: "max-w-md",
					variant: "destructive"
				}, {
					default: withCtx((_, _push$1, _parent$1, _scopeId) => {
						if (_push$1) {
							_push$1(ssrRenderComponent(unref(AlertTitle_default), null, {
								default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
									if (_push$2) _push$2(`Error loading rules`);
									else return [createTextVNode("Error loading rules")];
								}),
								_: 1
							}, _parent$1, _scopeId));
							_push$1(ssrRenderComponent(unref(AlertDescription_default), null, {
								default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
									if (_push$2) _push$2(`${ssrInterpolate(error.value)}`);
									else return [createTextVNode(toDisplayString(error.value), 1)];
								}),
								_: 1
							}, _parent$1, _scopeId));
						} else return [createVNode(unref(AlertTitle_default), null, {
							default: withCtx(() => [createTextVNode("Error loading rules")]),
							_: 1
						}), createVNode(unref(AlertDescription_default), null, {
							default: withCtx(() => [createTextVNode(toDisplayString(error.value), 1)]),
							_: 1
						})];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(unref(Button_default), {
					class: "mt-4",
					variant: "default",
					onClick: retryLoadRules
				}, {
					default: withCtx((_, _push$1, _parent$1, _scopeId) => {
						if (_push$1) _push$1(` Retry `);
						else return [createTextVNode(" Retry ")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else if (isLoading.value) {
				_push(`<div class="p-4 grow" data-v-08e59a55><div class="space-y-4" data-v-08e59a55><!--[-->`);
				ssrRenderList(3, (i) => {
					_push(`<div class="space-y-3" data-v-08e59a55><div class="flex items-center justify-between" data-v-08e59a55>`);
					_push(ssrRenderComponent(unref(Skeleton_default), { class: "h-4 w-32" }, null, _parent));
					_push(ssrRenderComponent(unref(Skeleton_default), { class: "h-4 w-12" }, null, _parent));
					_push(`</div><!--[-->`);
					ssrRenderList(3, (j) => {
						_push(`<div class="p-3 border border-border rounded-md" data-v-08e59a55>`);
						_push(ssrRenderComponent(unref(Skeleton_default), { class: "h-5 w-2/3 mb-2" }, null, _parent));
						_push(`<div class="flex gap-1.5 mb-2" data-v-08e59a55>`);
						_push(ssrRenderComponent(unref(Skeleton_default), { class: "h-4 w-16" }, null, _parent));
						_push(ssrRenderComponent(unref(Skeleton_default), { class: "h-4 w-16" }, null, _parent));
						_push(`</div>`);
						_push(ssrRenderComponent(unref(Skeleton_default), { class: "h-4 w-full mb-2" }, null, _parent));
						_push(ssrRenderComponent(unref(Skeleton_default), { class: "h-4 w-3/4" }, null, _parent));
						_push(`<div class="flex gap-1.5 mt-2" data-v-08e59a55>`);
						_push(ssrRenderComponent(unref(Skeleton_default), { class: "h-4 w-20" }, null, _parent));
						_push(ssrRenderComponent(unref(Skeleton_default), { class: "h-4 w-20" }, null, _parent));
						_push(`</div></div>`);
					});
					_push(`<!--]--></div>`);
				});
				_push(`<!--]--></div></div>`);
			} else _push(ssrRenderComponent(unref(ScrollArea_default), { class: "grow overflow-hidden" }, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						if (allRules.value.length === 0) {
							_push$1(`<div class="text-center py-16 flex flex-col items-center justify-center h-full" data-v-08e59a55${_scopeId}><div class="bg-muted/30 rounded-lg p-6 max-w-md" data-v-08e59a55${_scopeId}><h3 class="text-lg font-medium mb-2" data-v-08e59a55${_scopeId}>No Sigma Rules Found</h3><p class="text-muted-foreground mb-4" data-v-08e59a55${_scopeId}> The rules index file may be missing or empty. Please ensure the &quot;sigma-rules-index.json&quot; file exists in the public directory. </p>`);
							_push$1(ssrRenderComponent(unref(Button_default), {
								variant: "default",
								onClick: retryLoadRules
							}, {
								default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
									if (_push$2) _push$2(` Retry Loading Rules `);
									else return [createTextVNode(" Retry Loading Rules ")];
								}),
								_: 1
							}, _parent$1, _scopeId));
							_push$1(`</div></div>`);
						} else if (groupedRules.value.length === 0) _push$1(`<div class="text-center py-4 text-muted-foreground" data-v-08e59a55${_scopeId}> No rules found matching your criteria. </div>`);
						else {
							_push$1(`<div class="" data-v-08e59a55${_scopeId}><div style="${ssrRenderStyle({ height: `${totalHeight.value}px` })}" class="relative" data-v-08e59a55${_scopeId}><!--[-->`);
							ssrRenderList(visibleGroups.value, (group) => {
								_push$1(`<div class="mb-6" data-v-08e59a55${_scopeId}><div class="flex items-center justify-between sticky top-0 bg-background py-2 z-10 border-b mb-2 px-4" data-v-08e59a55${_scopeId}><h3 class="text-sm font-semibold uppercase tracking-wider text-muted-foreground" data-v-08e59a55${_scopeId}>${ssrInterpolate(group.label)}</h3>`);
								_push$1(ssrRenderComponent(unref(Badge_default), {
									class: "text-xs",
									variant: "outline"
								}, {
									default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
										if (_push$2) _push$2(`${ssrInterpolate(group.items.length)} rules`);
										else return [createTextVNode(toDisplayString(group.items.length) + " rules", 1)];
									}),
									_: 2
								}, _parent$1, _scopeId));
								_push$1(`</div><div class="space-y-2" data-v-08e59a55${_scopeId}><!--[-->`);
								ssrRenderList(group.items, (itemInfo) => {
									_push$1(`<div class="${ssrRenderClass([{ "border-primary/50 bg-primary/5": isSelected(itemInfo.rule) }, "mx-4 p-3 border rounded-md hover:bg-muted cursor-pointer transition-all hover:-translate-y-px hover:shadow-xs"])}" data-v-08e59a55${_scopeId}><div class="flex items-start justify-between" data-v-08e59a55${_scopeId}><h3 class="font-medium" data-v-08e59a55${_scopeId}>${ssrInterpolate(itemInfo.rule.title)}</h3></div><div class="flex items-start justify-between mt-1" data-v-08e59a55${_scopeId}><div class="flex gap-1.5" data-v-08e59a55${_scopeId}>`);
									if (itemInfo.rule.level) _push$1(ssrRenderComponent(unref(Badge_default), { class: [getLevelBadgeClass(itemInfo.rule.level), "uppercase font-semibold text-[10px] tracking-wider"] }, {
										default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
											if (_push$2) _push$2(`${ssrInterpolate(itemInfo.rule.level)}`);
											else return [createTextVNode(toDisplayString(itemInfo.rule.level), 1)];
										}),
										_: 2
									}, _parent$1, _scopeId));
									else _push$1(`<!---->`);
									if (itemInfo.rule.status) _push$1(ssrRenderComponent(unref(Badge_default), {
										class: "uppercase font-semibold text-[10px] tracking-wider",
										variant: "outline"
									}, {
										default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
											if (_push$2) _push$2(`${ssrInterpolate(itemInfo.rule.status)}`);
											else return [createTextVNode(toDisplayString(itemInfo.rule.status), 1)];
										}),
										_: 2
									}, _parent$1, _scopeId));
									else _push$1(`<!---->`);
									_push$1(`</div></div><p class="text-sm text-muted-foreground line-clamp-2 mt-1" data-v-08e59a55${_scopeId}>${ssrInterpolate(itemInfo.rule.description)}</p><div class="flex flex-wrap gap-1.5 mt-2" data-v-08e59a55${_scopeId}>`);
									if (itemInfo.rule.logsource?.product) _push$1(ssrRenderComponent(unref(Badge_default), {
										class: "px-2 py-0 text-xs",
										variant: "secondary"
									}, {
										default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
											if (_push$2) _push$2(`${ssrInterpolate(itemInfo.rule.logsource.product)}`);
											else return [createTextVNode(toDisplayString(itemInfo.rule.logsource.product), 1)];
										}),
										_: 2
									}, _parent$1, _scopeId));
									else _push$1(`<!---->`);
									if (itemInfo.rule.logsource?.category) _push$1(ssrRenderComponent(unref(Badge_default), {
										class: "px-2 py-0 text-xs",
										variant: "secondary"
									}, {
										default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
											if (_push$2) _push$2(`${ssrInterpolate(itemInfo.rule.logsource.category)}`);
											else return [createTextVNode(toDisplayString(itemInfo.rule.logsource.category), 1)];
										}),
										_: 2
									}, _parent$1, _scopeId));
									else _push$1(`<!---->`);
									if (itemInfo.rule.logsource?.service) _push$1(ssrRenderComponent(unref(Badge_default), {
										class: "px-2 py-0 text-xs",
										variant: "secondary"
									}, {
										default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
											if (_push$2) _push$2(`${ssrInterpolate(itemInfo.rule.logsource.service)}`);
											else return [createTextVNode(toDisplayString(itemInfo.rule.logsource.service), 1)];
										}),
										_: 2
									}, _parent$1, _scopeId));
									else _push$1(`<!---->`);
									_push$1(`</div></div>`);
								});
								_push$1(`<!--]--></div></div>`);
							});
							_push$1(`<!--]--></div></div>`);
						}
						_push$1(ssrRenderComponent(unref(ScrollBar_default), null, null, _parent$1, _scopeId));
					} else return [allRules.value.length === 0 ? (openBlock(), createBlock("div", {
						key: 0,
						class: "text-center py-16 flex flex-col items-center justify-center h-full"
					}, [createVNode("div", { class: "bg-muted/30 rounded-lg p-6 max-w-md" }, [
						createVNode("h3", { class: "text-lg font-medium mb-2" }, "No Sigma Rules Found"),
						createVNode("p", { class: "text-muted-foreground mb-4" }, " The rules index file may be missing or empty. Please ensure the \"sigma-rules-index.json\" file exists in the public directory. "),
						createVNode(unref(Button_default), {
							variant: "default",
							onClick: retryLoadRules
						}, {
							default: withCtx(() => [createTextVNode(" Retry Loading Rules ")]),
							_: 1
						})
					])])) : groupedRules.value.length === 0 ? (openBlock(), createBlock("div", {
						key: 1,
						class: "text-center py-4 text-muted-foreground"
					}, " No rules found matching your criteria. ")) : (openBlock(), createBlock("div", {
						key: 2,
						ref_key: "containerRef",
						ref: containerRef,
						class: ""
					}, [createVNode("div", {
						style: { height: `${totalHeight.value}px` },
						class: "relative"
					}, [(openBlock(true), createBlock(Fragment, null, renderList(visibleGroups.value, (group) => {
						return openBlock(), createBlock("div", {
							key: group.label,
							class: "mb-6"
						}, [createVNode("div", { class: "flex items-center justify-between sticky top-0 bg-background py-2 z-10 border-b mb-2 px-4" }, [createVNode("h3", { class: "text-sm font-semibold uppercase tracking-wider text-muted-foreground" }, toDisplayString(group.label), 1), createVNode(unref(Badge_default), {
							class: "text-xs",
							variant: "outline"
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(group.items.length) + " rules", 1)]),
							_: 2
						}, 1024)]), createVNode("div", { class: "space-y-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(group.items, (itemInfo) => {
							return openBlock(), createBlock("div", {
								key: itemInfo.rule.id || itemInfo.rule.path,
								class: [{ "border-primary/50 bg-primary/5": isSelected(itemInfo.rule) }, "mx-4 p-3 border rounded-md hover:bg-muted cursor-pointer transition-all hover:-translate-y-px hover:shadow-xs"],
								onClick: ($event) => selectRule(itemInfo.rule)
							}, [
								createVNode("div", { class: "flex items-start justify-between" }, [createVNode("h3", { class: "font-medium" }, toDisplayString(itemInfo.rule.title), 1)]),
								createVNode("div", { class: "flex items-start justify-between mt-1" }, [createVNode("div", { class: "flex gap-1.5" }, [itemInfo.rule.level ? (openBlock(), createBlock(unref(Badge_default), {
									key: 0,
									class: [getLevelBadgeClass(itemInfo.rule.level), "uppercase font-semibold text-[10px] tracking-wider"]
								}, {
									default: withCtx(() => [createTextVNode(toDisplayString(itemInfo.rule.level), 1)]),
									_: 2
								}, 1032, ["class"])) : createCommentVNode("", true), itemInfo.rule.status ? (openBlock(), createBlock(unref(Badge_default), {
									key: 1,
									class: "uppercase font-semibold text-[10px] tracking-wider",
									variant: "outline"
								}, {
									default: withCtx(() => [createTextVNode(toDisplayString(itemInfo.rule.status), 1)]),
									_: 2
								}, 1024)) : createCommentVNode("", true)])]),
								createVNode("p", { class: "text-sm text-muted-foreground line-clamp-2 mt-1" }, toDisplayString(itemInfo.rule.description), 1),
								createVNode("div", { class: "flex flex-wrap gap-1.5 mt-2" }, [
									itemInfo.rule.logsource?.product ? (openBlock(), createBlock(unref(Badge_default), {
										key: 0,
										class: "px-2 py-0 text-xs",
										variant: "secondary"
									}, {
										default: withCtx(() => [createTextVNode(toDisplayString(itemInfo.rule.logsource.product), 1)]),
										_: 2
									}, 1024)) : createCommentVNode("", true),
									itemInfo.rule.logsource?.category ? (openBlock(), createBlock(unref(Badge_default), {
										key: 1,
										class: "px-2 py-0 text-xs",
										variant: "secondary"
									}, {
										default: withCtx(() => [createTextVNode(toDisplayString(itemInfo.rule.logsource.category), 1)]),
										_: 2
									}, 1024)) : createCommentVNode("", true),
									itemInfo.rule.logsource?.service ? (openBlock(), createBlock(unref(Badge_default), {
										key: 2,
										class: "px-2 py-0 text-xs",
										variant: "secondary"
									}, {
										default: withCtx(() => [createTextVNode(toDisplayString(itemInfo.rule.logsource.service), 1)]),
										_: 2
									}, 1024)) : createCommentVNode("", true)
								])
							], 10, ["onClick"]);
						}), 128))])]);
					}), 128))], 4)], 512)), createVNode(unref(ScrollBar_default))];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
var _sfc_setup$3 = SigmaRuleList_vue_vue_type_script_setup_true_lang_default.setup;
SigmaRuleList_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/SigmaRuleList.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var SigmaRuleList_default = /* @__PURE__ */ _plugin_vue_export_helper_default(SigmaRuleList_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-08e59a55"]]);
var SigmaRuleViewer_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SigmaRuleViewer",
	__ssrInlineRender: true,
	setup(__props) {
		const router = useRouter();
		const sigmaRulesStore = useSigmaRulesStore();
		const isImporting = ref(false);
		const currentRule = computed(() => sigmaRulesStore.currentRule);
		const currentRuleContent = computed(() => sigmaRulesStore.currentRuleContent);
		const isLoadingIndividualRule = computed(() => sigmaRulesStore.isLoadingIndividualRule);
		function formatDate(dateString) {
			if (!dateString) return "Not specified";
			try {
				return new Date(dateString).toLocaleDateString(void 0, {
					year: "numeric",
					month: "short",
					day: "numeric"
				});
			} catch (e) {
				return dateString;
			}
		}
		function formatReferenceLink(url) {
			try {
				const urlObj = new URL(url);
				const domain = urlObj.hostname.replace("www.", "");
				const path = urlObj.pathname.slice(0, 30);
				return `${domain}${path}${path.length > 29 ? "..." : ""}`;
			} catch (e) {
				return url;
			}
		}
		async function copyRule() {
			if (!currentRuleContent.value) return;
			try {
				await navigator.clipboard.writeText(currentRuleContent.value);
				toast("Rule copied to clipboard", {
					description: currentRule.value?.title || "Sigma rule",
					duration: 3e3
				});
			} catch (err) {
				console.error("Failed to copy rule to clipboard:", err);
				toast.error("Failed to copy rule", { description: "Could not access clipboard" });
			}
		}
		async function importRule() {
			if (!currentRule.value || !currentRuleContent.value) {
				toast.error("Import failed", { description: "No rule selected or rule content is empty" });
				return;
			}
			isImporting.value = true;
			try {
				const { useWorkspaceStore } = await import("./WorkspaceStore-C79NO7cD.js");
				const fileStore = useWorkspaceStore().currentWorkspace?.fileStore();
				if (!fileStore) {
					console.error("File store not available");
					toast.error("Import failed", { description: "File store not available" });
					return;
				}
				if (!currentRule.value.title && !currentRule.value.id) console.warn("Rule missing title and ID");
				let fileName = currentRule.value.title || currentRule.value.id || "imported_rule";
				fileName = fileName.trim().toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "_");
				if (!currentRuleContent.value.trim()) throw new Error("Rule content is empty");
				let duplicateFile = null;
				if (currentRule.value.id) duplicateFile = fileStore.files.find((file) => file.type === "sigma" && file.content.includes(`id: ${currentRule.value.id}`));
				if (duplicateFile) {
					fileStore.openFile(duplicateFile.id);
					toast.info("Rule already exists", {
						description: `"${currentRule.value.title || "Sigma rule"}" is already in your workspace`,
						action: {
							label: "Viewing",
							onClick: () => {}
						}
					});
					router.push({ name: "studio" });
					return;
				}
				const fileId = fileStore.addFile({
					name: fileName,
					content: currentRuleContent.value,
					type: "sigma"
				});
				router.push({ name: "studio" });
				fileStore.openFile(fileId);
				toast.success("Rule imported to Studio", {
					description: `"${currentRule.value.title || "Sigma rule"}" is now available in your workspace`,
					action: {
						label: "Dismiss",
						onClick: () => {}
					}
				});
				console.log("Rule imported successfully:", fileName);
			} catch (err) {
				console.error("Failed to import rule:", err);
				toast.error("Import failed", { description: err instanceof Error ? err.message : "An unknown error occurred" });
			} finally {
				isImporting.value = false;
			}
		}
		function getLevelBadgeClass(level) {
			const lowerLevel = level.toLowerCase();
			if (lowerLevel === "critical") return "bg-red-600 hover:bg-red-700";
			if (lowerLevel === "high") return "bg-red-500 hover:bg-red-600";
			if (lowerLevel === "medium") return "bg-amber-500 hover:bg-amber-600";
			if (lowerLevel === "low") return "bg-blue-500 hover:bg-blue-600";
			if (lowerLevel === "informational") return "bg-green-500 hover:bg-green-600";
			return "bg-gray-500 hover:bg-gray-600";
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(ScrollArea_default), mergeProps({ class: "flex flex-col h-full" }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) if (!currentRule.value) _push$1(`<div class="flex items-center justify-center h-full"${_scopeId}><p${_scopeId}>Select a rule to view its details</p></div>`);
					else if (isLoadingIndividualRule.value) {
						_push$1(`<div class="flex flex-col h-full"${_scopeId}><div class="border-b p-6 bg-card shadow-xs h-full"${_scopeId}><div class="flex items-start justify-between"${_scopeId}>`);
						_push$1(ssrRenderComponent(unref(Skeleton_default), { class: "h-8 w-64" }, null, _parent$1, _scopeId));
						_push$1(`<div class="flex gap-2"${_scopeId}>`);
						_push$1(ssrRenderComponent(unref(Skeleton_default), { class: "h-5 w-20" }, null, _parent$1, _scopeId));
						_push$1(`</div></div><div class="mt-4 bg-muted/30 p-3 rounded-md border border-muted"${_scopeId}><div class="flex flex-wrap gap-3 items-center"${_scopeId}>`);
						_push$1(ssrRenderComponent(unref(Skeleton_default), { class: "h-4 w-24" }, null, _parent$1, _scopeId));
						_push$1(`<div class="flex flex-wrap gap-2"${_scopeId}>`);
						_push$1(ssrRenderComponent(unref(Skeleton_default), { class: "h-6 w-32" }, null, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(Skeleton_default), { class: "h-6 w-36" }, null, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(Skeleton_default), { class: "h-6 w-28" }, null, _parent$1, _scopeId));
						_push$1(`</div></div></div>`);
						_push$1(ssrRenderComponent(unref(Skeleton_default), { class: "h-4 w-full mt-4" }, null, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(Skeleton_default), { class: "h-4 w-5/6 mt-2" }, null, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(Skeleton_default), { class: "h-4 w-4/6 mt-2 mb-6" }, null, _parent$1, _scopeId));
						_push$1(`<div class="mb-6"${_scopeId}><div class="flex flex-wrap gap-1.5"${_scopeId}>`);
						_push$1(ssrRenderComponent(unref(Skeleton_default), { class: "h-5 w-16" }, null, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(Skeleton_default), { class: "h-5 w-24" }, null, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(Skeleton_default), { class: "h-5 w-20" }, null, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(Skeleton_default), { class: "h-5 w-18" }, null, _parent$1, _scopeId));
						_push$1(`</div></div><div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 border-t border-muted pt-4"${_scopeId}><div class="flex flex-col"${_scopeId}>`);
						_push$1(ssrRenderComponent(unref(Skeleton_default), { class: "h-3 w-16 mb-2" }, null, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(Skeleton_default), { class: "h-4 w-24" }, null, _parent$1, _scopeId));
						_push$1(`</div><div class="flex flex-col"${_scopeId}>`);
						_push$1(ssrRenderComponent(unref(Skeleton_default), { class: "h-3 w-16 mb-2" }, null, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(Skeleton_default), { class: "h-4 w-20" }, null, _parent$1, _scopeId));
						_push$1(`</div><div class="flex flex-col"${_scopeId}>`);
						_push$1(ssrRenderComponent(unref(Skeleton_default), { class: "h-3 w-16 mb-2" }, null, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(Skeleton_default), { class: "h-4 w-24" }, null, _parent$1, _scopeId));
						_push$1(`</div><div class="flex flex-col"${_scopeId}>`);
						_push$1(ssrRenderComponent(unref(Skeleton_default), { class: "h-3 w-16 mb-2" }, null, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(Skeleton_default), { class: "h-4 w-32" }, null, _parent$1, _scopeId));
						_push$1(`</div></div><div class="mt-6 border-t border-gray-100 pt-4"${_scopeId}>`);
						_push$1(ssrRenderComponent(unref(Skeleton_default), { class: "h-3 w-24 mb-3" }, null, _parent$1, _scopeId));
						_push$1(`<div class="flex flex-col gap-2"${_scopeId}>`);
						_push$1(ssrRenderComponent(unref(Skeleton_default), { class: "h-4 w-64" }, null, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(Skeleton_default), { class: "h-4 w-72" }, null, _parent$1, _scopeId));
						_push$1(`</div></div></div><div class="grow flex flex-col h-full"${_scopeId}><div class="px-6 py-3 bg-[#0D1116] border-b border-gray-800"${_scopeId}>`);
						_push$1(ssrRenderComponent(unref(Skeleton_default), { class: "h-4 w-32 bg-gray-700/20" }, null, _parent$1, _scopeId));
						_push$1(`</div><div class="grow bg-[#0D1116] h-full p-4"${_scopeId}>`);
						_push$1(ssrRenderComponent(unref(Skeleton_default), { class: "h-full w-full bg-gray-700/20" }, null, _parent$1, _scopeId));
						_push$1(`</div></div><div class="border-t p-4 flex justify-between bg-card"${_scopeId}>`);
						_push$1(ssrRenderComponent(unref(Skeleton_default), { class: "h-9 w-28" }, null, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(Skeleton_default), { class: "h-9 w-28" }, null, _parent$1, _scopeId));
						_push$1(`</div></div>`);
					} else {
						_push$1(`<!--[--><div class="border-b p-6 bg-card shadow-xs"${_scopeId}><div class="flex items-start justify-between"${_scopeId}><h2 class="text-2xl font-bold"${_scopeId}>${ssrInterpolate(currentRule.value.title)}</h2><div class="flex gap-2"${_scopeId}>`);
						if (currentRule.value.level) _push$1(ssrRenderComponent(unref(Badge_default), { class: [getLevelBadgeClass(currentRule.value.level), "uppercase font-semibold text-[10px] tracking-wider"] }, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) _push$2(`${ssrInterpolate(currentRule.value.level)}`);
								else return [createTextVNode(toDisplayString(currentRule.value.level), 1)];
							}),
							_: 1
						}, _parent$1, _scopeId));
						else _push$1(`<!---->`);
						if (currentRule.value.status) _push$1(ssrRenderComponent(unref(Badge_default), { class: "uppercase font-semibold text-[10px] tracking-wider" }, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) _push$2(`${ssrInterpolate(currentRule.value.status)}`);
								else return [createTextVNode(toDisplayString(currentRule.value.status), 1)];
							}),
							_: 1
						}, _parent$1, _scopeId));
						else _push$1(`<!---->`);
						_push$1(`</div></div>`);
						if (currentRule.value.logsource) {
							_push$1(`<div class="py-2"${_scopeId}><div class="flex flex-wrap gap-3 items-center"${_scopeId}><span class="uppercase text-xs font-semibold text-gray-500 tracking-wider"${_scopeId}>Logsource</span><div class="flex flex-wrap gap-2"${_scopeId}>`);
							if (currentRule.value.logsource.product) _push$1(ssrRenderComponent(unref(Badge_default), {
								class: "px-3 py-0.5",
								variant: "secondary"
							}, {
								default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
									if (_push$2) _push$2(`<span class="font-semibold"${_scopeId$1}>Product:</span> ${ssrInterpolate(currentRule.value.logsource.product)}`);
									else return [createVNode("span", { class: "font-semibold" }, "Product:"), createTextVNode(" " + toDisplayString(currentRule.value.logsource.product), 1)];
								}),
								_: 1
							}, _parent$1, _scopeId));
							else _push$1(`<!---->`);
							if (currentRule.value.logsource.category) _push$1(ssrRenderComponent(unref(Badge_default), {
								class: "px-3 py-0.5",
								variant: "secondary"
							}, {
								default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
									if (_push$2) _push$2(`<span class="font-semibold"${_scopeId$1}>Category:</span> ${ssrInterpolate(currentRule.value.logsource.category)}`);
									else return [createVNode("span", { class: "font-semibold" }, "Category:"), createTextVNode(" " + toDisplayString(currentRule.value.logsource.category), 1)];
								}),
								_: 1
							}, _parent$1, _scopeId));
							else _push$1(`<!---->`);
							if (currentRule.value.logsource.service) _push$1(ssrRenderComponent(unref(Badge_default), {
								class: "px-3 py-0.5",
								variant: "secondary"
							}, {
								default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
									if (_push$2) _push$2(`<span class="font-semibold"${_scopeId$1}>Service:</span> ${ssrInterpolate(currentRule.value.logsource.service)}`);
									else return [createVNode("span", { class: "font-semibold" }, "Service:"), createTextVNode(" " + toDisplayString(currentRule.value.logsource.service), 1)];
								}),
								_: 1
							}, _parent$1, _scopeId));
							else _push$1(`<!---->`);
							_push$1(`</div></div></div>`);
						} else _push$1(`<!---->`);
						_push$1(`<p class="text-muted-foreground mt-4 mb-6 leading-relaxed"${_scopeId}>${ssrInterpolate(currentRule.value.description)}</p><div class="mb-6"${_scopeId}><div class="flex flex-wrap gap-1.5"${_scopeId}><!--[-->`);
						ssrRenderList(currentRule.value.tags, (tag) => {
							_push$1(ssrRenderComponent(unref(Badge_default), {
								key: tag,
								class: "",
								variant: "outline"
							}, {
								default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
									if (_push$2) _push$2(`${ssrInterpolate(tag)}`);
									else return [createTextVNode(toDisplayString(tag), 1)];
								}),
								_: 2
							}, _parent$1, _scopeId));
						});
						_push$1(`<!--]-->`);
						if (!currentRule.value.tags || currentRule.value.tags.length === 0) _push$1(`<span class="text-sm text-gray-500"${_scopeId}> No tags </span>`);
						else _push$1(`<!---->`);
						_push$1(`</div></div><div class="grid grid-cols-2 md:grid-cols-4 gap-4"${_scopeId}><div class="flex flex-col"${_scopeId}><span class="text-[10px] uppercase tracking-wider text-card-foreground mb-1"${_scopeId}>Author</span><span class="text-sm"${_scopeId}>${ssrInterpolate(currentRule.value.author || "Unknown")}</span></div>`);
						if (currentRule.value.date) _push$1(`<div class="flex flex-col"${_scopeId}><span class="text-[10px] uppercase tracking-wider text-card-foreground mb-1"${_scopeId}>Created</span><span class="text-sm"${_scopeId}>${ssrInterpolate(formatDate(currentRule.value.date))}</span></div>`);
						else _push$1(`<!---->`);
						if (currentRule.value.modified) _push$1(`<div class="flex flex-col"${_scopeId}><span class="text-[10px] uppercase tracking-wider text-card-foreground mb-1"${_scopeId}>Modified</span><span class="text-sm"${_scopeId}>${ssrInterpolate(formatDate(currentRule.value.modified))}</span></div>`);
						else _push$1(`<!---->`);
						if (currentRule.value.id) _push$1(`<div class="flex flex-col"${_scopeId}><span class="text-[10px] uppercase tracking-wider text-card-foreground mb-1"${_scopeId}>ID</span><span class="text-sm opacity-60 font-mono truncate"${_scopeId}>${ssrInterpolate(currentRule.value.id)}</span></div>`);
						else _push$1(`<!---->`);
						_push$1(`</div>`);
						if (currentRule.value.references && currentRule.value.references.length > 0) {
							_push$1(`<div class="mt-3 border-t border-secondary pt-4"${_scopeId}><span class="text-[10px] uppercase tracking-wider text-card-foreground mb-1 block"${_scopeId}>References</span><div class="flex flex-col gap-2"${_scopeId}><!--[-->`);
							ssrRenderList(currentRule.value.references, (ref$1) => {
								_push$1(`<a${ssrRenderAttr("href", ref$1)} class="text-sm text-primary hover:text-primary-foreground transition-colors hover:underline flex items-center gap-1 group" rel="noopener noreferrer" target="_blank"${_scopeId}>`);
								_push$1(ssrRenderComponent(unref(ExternalLink), { class: "h-3 w-3 mr-3 text-secondary-foreground opacity-70 group-hover:opacity-100" }, null, _parent$1, _scopeId));
								_push$1(` ${ssrInterpolate(formatReferenceLink(ref$1))}</a>`);
							});
							_push$1(`<!--]--></div></div>`);
						} else _push$1(`<!---->`);
						_push$1(`</div><div class="border-b p-4 flex justify-between bg-card"${_scopeId}>`);
						_push$1(ssrRenderComponent(unref(Button_default), {
							class: "gap-1.5",
							variant: "outline",
							onClick: copyRule
						}, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) {
									_push$2(ssrRenderComponent(unref(Clipboard), { class: "h-4 w-4" }, null, _parent$2, _scopeId$1));
									_push$2(` Copy Rule `);
								} else return [createVNode(unref(Clipboard), { class: "h-4 w-4" }), createTextVNode(" Copy Rule ")];
							}),
							_: 1
						}, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(Button_default), {
							disabled: isImporting.value,
							class: "gap-1.5",
							variant: "default",
							onClick: importRule
						}, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) {
									if (!isImporting.value) _push$2(ssrRenderComponent(unref(Download), { class: "h-4 w-4" }, null, _parent$2, _scopeId$1));
									else _push$2(ssrRenderComponent(unref(Loader2), { class: "h-4 w-4" }, null, _parent$2, _scopeId$1));
									_push$2(` ${ssrInterpolate(isImporting.value ? "Importing..." : "Import to Studio")}`);
								} else return [!isImporting.value ? (openBlock(), createBlock(unref(Download), {
									key: 0,
									class: "h-4 w-4"
								})) : (openBlock(), createBlock(unref(Loader2), {
									key: 1,
									class: "h-4 w-4"
								})), createTextVNode(" " + toDisplayString(isImporting.value ? "Importing..." : "Import to Studio"), 1)];
							}),
							_: 1
						}, _parent$1, _scopeId));
						_push$1(`</div><div class="grow flex flex-col h-full"${_scopeId}><div class="px-6 py-3 bg-[#0D1116] border-b border-gray-800"${_scopeId}><span class="text-xs uppercase tracking-wider font-medium"${_scopeId}>YAML Definition</span></div><div class="grow bg-[#0D1116] h-full"${_scopeId}>`);
						_push$1(ssrRenderComponent(PrismEditor_default, {
							modelValue: currentRuleContent.value,
							"onUpdate:modelValue": ($event) => currentRuleContent.value = $event,
							"insert-spaces": true,
							"line-numbers": true,
							"read-only": true,
							"word-wrap": true,
							class: "text-xs md:text-sm h-full w-full",
							language: "yaml"
						}, null, _parent$1, _scopeId));
						_push$1(`</div></div><!--]-->`);
					}
					else return [!currentRule.value ? (openBlock(), createBlock("div", {
						key: 0,
						class: "flex items-center justify-center h-full"
					}, [createVNode("p", null, "Select a rule to view its details")])) : isLoadingIndividualRule.value ? (openBlock(), createBlock("div", {
						key: 1,
						class: "flex flex-col h-full"
					}, [
						createVNode("div", { class: "border-b p-6 bg-card shadow-xs h-full" }, [
							createVNode("div", { class: "flex items-start justify-between" }, [createVNode(unref(Skeleton_default), { class: "h-8 w-64" }), createVNode("div", { class: "flex gap-2" }, [createVNode(unref(Skeleton_default), { class: "h-5 w-20" })])]),
							createVNode("div", { class: "mt-4 bg-muted/30 p-3 rounded-md border border-muted" }, [createVNode("div", { class: "flex flex-wrap gap-3 items-center" }, [createVNode(unref(Skeleton_default), { class: "h-4 w-24" }), createVNode("div", { class: "flex flex-wrap gap-2" }, [
								createVNode(unref(Skeleton_default), { class: "h-6 w-32" }),
								createVNode(unref(Skeleton_default), { class: "h-6 w-36" }),
								createVNode(unref(Skeleton_default), { class: "h-6 w-28" })
							])])]),
							createVNode(unref(Skeleton_default), { class: "h-4 w-full mt-4" }),
							createVNode(unref(Skeleton_default), { class: "h-4 w-5/6 mt-2" }),
							createVNode(unref(Skeleton_default), { class: "h-4 w-4/6 mt-2 mb-6" }),
							createVNode("div", { class: "mb-6" }, [createVNode("div", { class: "flex flex-wrap gap-1.5" }, [
								createVNode(unref(Skeleton_default), { class: "h-5 w-16" }),
								createVNode(unref(Skeleton_default), { class: "h-5 w-24" }),
								createVNode(unref(Skeleton_default), { class: "h-5 w-20" }),
								createVNode(unref(Skeleton_default), { class: "h-5 w-18" })
							])]),
							createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 border-t border-muted pt-4" }, [
								createVNode("div", { class: "flex flex-col" }, [createVNode(unref(Skeleton_default), { class: "h-3 w-16 mb-2" }), createVNode(unref(Skeleton_default), { class: "h-4 w-24" })]),
								createVNode("div", { class: "flex flex-col" }, [createVNode(unref(Skeleton_default), { class: "h-3 w-16 mb-2" }), createVNode(unref(Skeleton_default), { class: "h-4 w-20" })]),
								createVNode("div", { class: "flex flex-col" }, [createVNode(unref(Skeleton_default), { class: "h-3 w-16 mb-2" }), createVNode(unref(Skeleton_default), { class: "h-4 w-24" })]),
								createVNode("div", { class: "flex flex-col" }, [createVNode(unref(Skeleton_default), { class: "h-3 w-16 mb-2" }), createVNode(unref(Skeleton_default), { class: "h-4 w-32" })])
							]),
							createVNode("div", { class: "mt-6 border-t border-gray-100 pt-4" }, [createVNode(unref(Skeleton_default), { class: "h-3 w-24 mb-3" }), createVNode("div", { class: "flex flex-col gap-2" }, [createVNode(unref(Skeleton_default), { class: "h-4 w-64" }), createVNode(unref(Skeleton_default), { class: "h-4 w-72" })])])
						]),
						createVNode("div", { class: "grow flex flex-col h-full" }, [createVNode("div", { class: "px-6 py-3 bg-[#0D1116] border-b border-gray-800" }, [createVNode(unref(Skeleton_default), { class: "h-4 w-32 bg-gray-700/20" })]), createVNode("div", { class: "grow bg-[#0D1116] h-full p-4" }, [createVNode(unref(Skeleton_default), { class: "h-full w-full bg-gray-700/20" })])]),
						createVNode("div", { class: "border-t p-4 flex justify-between bg-card" }, [createVNode(unref(Skeleton_default), { class: "h-9 w-28" }), createVNode(unref(Skeleton_default), { class: "h-9 w-28" })])
					])) : (openBlock(), createBlock(Fragment, { key: 2 }, [
						createVNode("div", { class: "border-b p-6 bg-card shadow-xs" }, [
							createVNode("div", { class: "flex items-start justify-between" }, [createVNode("h2", { class: "text-2xl font-bold" }, toDisplayString(currentRule.value.title), 1), createVNode("div", { class: "flex gap-2" }, [currentRule.value.level ? (openBlock(), createBlock(unref(Badge_default), {
								key: 0,
								class: [getLevelBadgeClass(currentRule.value.level), "uppercase font-semibold text-[10px] tracking-wider"]
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(currentRule.value.level), 1)]),
								_: 1
							}, 8, ["class"])) : createCommentVNode("", true), currentRule.value.status ? (openBlock(), createBlock(unref(Badge_default), {
								key: 1,
								class: "uppercase font-semibold text-[10px] tracking-wider"
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(currentRule.value.status), 1)]),
								_: 1
							})) : createCommentVNode("", true)])]),
							currentRule.value.logsource ? (openBlock(), createBlock("div", {
								key: 0,
								class: "py-2"
							}, [createVNode("div", { class: "flex flex-wrap gap-3 items-center" }, [createVNode("span", { class: "uppercase text-xs font-semibold text-gray-500 tracking-wider" }, "Logsource"), createVNode("div", { class: "flex flex-wrap gap-2" }, [
								currentRule.value.logsource.product ? (openBlock(), createBlock(unref(Badge_default), {
									key: 0,
									class: "px-3 py-0.5",
									variant: "secondary"
								}, {
									default: withCtx(() => [createVNode("span", { class: "font-semibold" }, "Product:"), createTextVNode(" " + toDisplayString(currentRule.value.logsource.product), 1)]),
									_: 1
								})) : createCommentVNode("", true),
								currentRule.value.logsource.category ? (openBlock(), createBlock(unref(Badge_default), {
									key: 1,
									class: "px-3 py-0.5",
									variant: "secondary"
								}, {
									default: withCtx(() => [createVNode("span", { class: "font-semibold" }, "Category:"), createTextVNode(" " + toDisplayString(currentRule.value.logsource.category), 1)]),
									_: 1
								})) : createCommentVNode("", true),
								currentRule.value.logsource.service ? (openBlock(), createBlock(unref(Badge_default), {
									key: 2,
									class: "px-3 py-0.5",
									variant: "secondary"
								}, {
									default: withCtx(() => [createVNode("span", { class: "font-semibold" }, "Service:"), createTextVNode(" " + toDisplayString(currentRule.value.logsource.service), 1)]),
									_: 1
								})) : createCommentVNode("", true)
							])])])) : createCommentVNode("", true),
							createVNode("p", { class: "text-muted-foreground mt-4 mb-6 leading-relaxed" }, toDisplayString(currentRule.value.description), 1),
							createVNode("div", { class: "mb-6" }, [createVNode("div", { class: "flex flex-wrap gap-1.5" }, [(openBlock(true), createBlock(Fragment, null, renderList(currentRule.value.tags, (tag) => {
								return openBlock(), createBlock(unref(Badge_default), {
									key: tag,
									class: "",
									variant: "outline"
								}, {
									default: withCtx(() => [createTextVNode(toDisplayString(tag), 1)]),
									_: 2
								}, 1024);
							}), 128)), !currentRule.value.tags || currentRule.value.tags.length === 0 ? (openBlock(), createBlock("span", {
								key: 0,
								class: "text-sm text-gray-500"
							}, " No tags ")) : createCommentVNode("", true)])]),
							createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-4" }, [
								createVNode("div", { class: "flex flex-col" }, [createVNode("span", { class: "text-[10px] uppercase tracking-wider text-card-foreground mb-1" }, "Author"), createVNode("span", { class: "text-sm" }, toDisplayString(currentRule.value.author || "Unknown"), 1)]),
								currentRule.value.date ? (openBlock(), createBlock("div", {
									key: 0,
									class: "flex flex-col"
								}, [createVNode("span", { class: "text-[10px] uppercase tracking-wider text-card-foreground mb-1" }, "Created"), createVNode("span", { class: "text-sm" }, toDisplayString(formatDate(currentRule.value.date)), 1)])) : createCommentVNode("", true),
								currentRule.value.modified ? (openBlock(), createBlock("div", {
									key: 1,
									class: "flex flex-col"
								}, [createVNode("span", { class: "text-[10px] uppercase tracking-wider text-card-foreground mb-1" }, "Modified"), createVNode("span", { class: "text-sm" }, toDisplayString(formatDate(currentRule.value.modified)), 1)])) : createCommentVNode("", true),
								currentRule.value.id ? (openBlock(), createBlock("div", {
									key: 2,
									class: "flex flex-col"
								}, [createVNode("span", { class: "text-[10px] uppercase tracking-wider text-card-foreground mb-1" }, "ID"), createVNode("span", { class: "text-sm opacity-60 font-mono truncate" }, toDisplayString(currentRule.value.id), 1)])) : createCommentVNode("", true)
							]),
							currentRule.value.references && currentRule.value.references.length > 0 ? (openBlock(), createBlock("div", {
								key: 1,
								class: "mt-3 border-t border-secondary pt-4"
							}, [createVNode("span", { class: "text-[10px] uppercase tracking-wider text-card-foreground mb-1 block" }, "References"), createVNode("div", { class: "flex flex-col gap-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(currentRule.value.references, (ref$1) => {
								return openBlock(), createBlock("a", {
									key: ref$1,
									href: ref$1,
									class: "text-sm text-primary hover:text-primary-foreground transition-colors hover:underline flex items-center gap-1 group",
									rel: "noopener noreferrer",
									target: "_blank"
								}, [createVNode(unref(ExternalLink), { class: "h-3 w-3 mr-3 text-secondary-foreground opacity-70 group-hover:opacity-100" }), createTextVNode(" " + toDisplayString(formatReferenceLink(ref$1)), 1)], 8, ["href"]);
							}), 128))])])) : createCommentVNode("", true)
						]),
						createVNode("div", { class: "border-b p-4 flex justify-between bg-card" }, [createVNode(unref(Button_default), {
							class: "gap-1.5",
							variant: "outline",
							onClick: copyRule
						}, {
							default: withCtx(() => [createVNode(unref(Clipboard), { class: "h-4 w-4" }), createTextVNode(" Copy Rule ")]),
							_: 1
						}), createVNode(unref(Button_default), {
							disabled: isImporting.value,
							class: "gap-1.5",
							variant: "default",
							onClick: importRule
						}, {
							default: withCtx(() => [!isImporting.value ? (openBlock(), createBlock(unref(Download), {
								key: 0,
								class: "h-4 w-4"
							})) : (openBlock(), createBlock(unref(Loader2), {
								key: 1,
								class: "h-4 w-4"
							})), createTextVNode(" " + toDisplayString(isImporting.value ? "Importing..." : "Import to Studio"), 1)]),
							_: 1
						}, 8, ["disabled"])]),
						createVNode("div", { class: "grow flex flex-col h-full" }, [createVNode("div", { class: "px-6 py-3 bg-[#0D1116] border-b border-gray-800" }, [createVNode("span", { class: "text-xs uppercase tracking-wider font-medium" }, "YAML Definition")]), createVNode("div", { class: "grow bg-[#0D1116] h-full" }, [createVNode(PrismEditor_default, {
							modelValue: currentRuleContent.value,
							"onUpdate:modelValue": ($event) => currentRuleContent.value = $event,
							"insert-spaces": true,
							"line-numbers": true,
							"read-only": true,
							"word-wrap": true,
							class: "text-xs md:text-sm h-full w-full",
							language: "yaml"
						}, null, 8, ["modelValue", "onUpdate:modelValue"])])])
					], 64))];
				}),
				_: 1
			}, _parent));
		};
	}
});
var _sfc_setup$2 = SigmaRuleViewer_vue_vue_type_script_setup_true_lang_default.setup;
SigmaRuleViewer_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/SigmaRuleViewer.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var SigmaRuleViewer_default = SigmaRuleViewer_vue_vue_type_script_setup_true_lang_default;
var ShareSigmaRuleButton_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ShareSigmaRuleButton",
	__ssrInlineRender: true,
	setup(__props) {
		const router = useRouter();
		const shareUrl = computed(() => {
			return `${window.location.origin}${router.currentRoute.value.fullPath}`;
		});
		const { copy, isSupported } = useClipboard({ source: "" });
		function share() {
			copy(shareUrl.value);
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Dialog_default), _attrs, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(unref(DialogTrigger_default), { "as-child": "" }, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) _push$2(ssrRenderComponent(unref(Button_default), {
									class: "hidden h-8 md:flex gap-2",
									size: "sm",
									variant: "secondary"
								}, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) {
											_push$3(ssrRenderComponent(unref(Share), { class: "h-3.5 w-3.5" }, null, _parent$3, _scopeId$2));
											_push$3(` Share `);
										} else return [createVNode(unref(Share), { class: "h-3.5 w-3.5" }), createTextVNode(" Share ")];
									}),
									_: 1
								}, _parent$2, _scopeId$1));
								else return [createVNode(unref(Button_default), {
									class: "hidden h-8 md:flex gap-2",
									size: "sm",
									variant: "secondary"
								}, {
									default: withCtx(() => [createVNode(unref(Share), { class: "h-3.5 w-3.5" }), createTextVNode(" Share ")]),
									_: 1
								})];
							}),
							_: 1
						}, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(DialogContent_default), { class: "sm:max-w-[425px]" }, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) {
									_push$2(ssrRenderComponent(unref(DialogHeader_default), null, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) {
												_push$3(ssrRenderComponent(unref(DialogTitle_default), null, {
													default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
														if (_push$4) _push$4(` Share Sigma Rule `);
														else return [createTextVNode(" Share Sigma Rule ")];
													}),
													_: 1
												}, _parent$3, _scopeId$2));
												_push$3(ssrRenderComponent(unref(DialogDescription_default), null, {
													default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
														if (_push$4) _push$4(` Share your Sigma rule with others by sending them the link below. `);
														else return [createTextVNode(" Share your Sigma rule with others by sending them the link below. ")];
													}),
													_: 1
												}, _parent$3, _scopeId$2));
											} else return [createVNode(unref(DialogTitle_default), null, {
												default: withCtx(() => [createTextVNode(" Share Sigma Rule ")]),
												_: 1
											}), createVNode(unref(DialogDescription_default), null, {
												default: withCtx(() => [createTextVNode(" Share your Sigma rule with others by sending them the link below. ")]),
												_: 1
											})];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(`<div class="flex flex-col gap-2"${_scopeId$1}>`);
									_push$2(ssrRenderComponent(unref(Label_default), {
										class: "",
										for: "name"
									}, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) _push$3(` Shareable URL `);
											else return [createTextVNode(" Shareable URL ")];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(ssrRenderComponent(unref(Input_default), {
										id: "name",
										"model-value": shareUrl.value,
										class: "col-span-3",
										disabled: ""
									}, null, _parent$2, _scopeId$1));
									if (unref(isSupported)) _push$2(ssrRenderComponent(unref(Button_default), {
										class: "w-full",
										type: "submit",
										variant: "outline",
										onClick: share
									}, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) _push$3(` Copy `);
											else return [createTextVNode(" Copy ")];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									else {
										_push$2(`<div class="flex flex-col gap-2"${_scopeId$1}>`);
										_push$2(ssrRenderComponent(unref(DialogDescription_default), null, {
											default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
												if (_push$3) _push$3(` Your browser does not support copying to clipboard. `);
												else return [createTextVNode(" Your browser does not support copying to clipboard. ")];
											}),
											_: 1
										}, _parent$2, _scopeId$1));
										_push$2(`</div>`);
									}
									_push$2(`</div>`);
								} else return [createVNode(unref(DialogHeader_default), null, {
									default: withCtx(() => [createVNode(unref(DialogTitle_default), null, {
										default: withCtx(() => [createTextVNode(" Share Sigma Rule ")]),
										_: 1
									}), createVNode(unref(DialogDescription_default), null, {
										default: withCtx(() => [createTextVNode(" Share your Sigma rule with others by sending them the link below. ")]),
										_: 1
									})]),
									_: 1
								}), createVNode("div", { class: "flex flex-col gap-2" }, [
									createVNode(unref(Label_default), {
										class: "",
										for: "name"
									}, {
										default: withCtx(() => [createTextVNode(" Shareable URL ")]),
										_: 1
									}),
									createVNode(unref(Input_default), {
										id: "name",
										"model-value": shareUrl.value,
										class: "col-span-3",
										disabled: ""
									}, null, 8, ["model-value"]),
									unref(isSupported) ? (openBlock(), createBlock(unref(Button_default), {
										key: 0,
										class: "w-full",
										type: "submit",
										variant: "outline",
										onClick: share
									}, {
										default: withCtx(() => [createTextVNode(" Copy ")]),
										_: 1
									})) : (openBlock(), createBlock("div", {
										key: 1,
										class: "flex flex-col gap-2"
									}, [createVNode(unref(DialogDescription_default), null, {
										default: withCtx(() => [createTextVNode(" Your browser does not support copying to clipboard. ")]),
										_: 1
									})]))
								])];
							}),
							_: 1
						}, _parent$1, _scopeId));
					} else return [createVNode(unref(DialogTrigger_default), { "as-child": "" }, {
						default: withCtx(() => [createVNode(unref(Button_default), {
							class: "hidden h-8 md:flex gap-2",
							size: "sm",
							variant: "secondary"
						}, {
							default: withCtx(() => [createVNode(unref(Share), { class: "h-3.5 w-3.5" }), createTextVNode(" Share ")]),
							_: 1
						})]),
						_: 1
					}), createVNode(unref(DialogContent_default), { class: "sm:max-w-[425px]" }, {
						default: withCtx(() => [createVNode(unref(DialogHeader_default), null, {
							default: withCtx(() => [createVNode(unref(DialogTitle_default), null, {
								default: withCtx(() => [createTextVNode(" Share Sigma Rule ")]),
								_: 1
							}), createVNode(unref(DialogDescription_default), null, {
								default: withCtx(() => [createTextVNode(" Share your Sigma rule with others by sending them the link below. ")]),
								_: 1
							})]),
							_: 1
						}), createVNode("div", { class: "flex flex-col gap-2" }, [
							createVNode(unref(Label_default), {
								class: "",
								for: "name"
							}, {
								default: withCtx(() => [createTextVNode(" Shareable URL ")]),
								_: 1
							}),
							createVNode(unref(Input_default), {
								id: "name",
								"model-value": shareUrl.value,
								class: "col-span-3",
								disabled: ""
							}, null, 8, ["model-value"]),
							unref(isSupported) ? (openBlock(), createBlock(unref(Button_default), {
								key: 0,
								class: "w-full",
								type: "submit",
								variant: "outline",
								onClick: share
							}, {
								default: withCtx(() => [createTextVNode(" Copy ")]),
								_: 1
							})) : (openBlock(), createBlock("div", {
								key: 1,
								class: "flex flex-col gap-2"
							}, [createVNode(unref(DialogDescription_default), null, {
								default: withCtx(() => [createTextVNode(" Your browser does not support copying to clipboard. ")]),
								_: 1
							})]))
						])]),
						_: 1
					})];
				}),
				_: 1
			}, _parent));
		};
	}
});
var _sfc_setup$1 = ShareSigmaRuleButton_vue_vue_type_script_setup_true_lang_default.setup;
ShareSigmaRuleButton_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ShareSigmaRuleButton.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var ShareSigmaRuleButton_default = ShareSigmaRuleButton_vue_vue_type_script_setup_true_lang_default;
var RulesBrowser_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "RulesBrowser",
	__ssrInlineRender: true,
	props: { ruleId: {} },
	setup(__props) {
		useHead({
			title: "Sigma Browser – detection.studio",
			meta: [{
				name: "description",
				content: "Browse and Import Sigma rules from different available repos."
			}]
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_client_only = resolveComponent("client-only");
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col h-screen w-full max-w-full overflow-hidden" }, _attrs))}><header class="flex h-14 shrink-0 items-center gap-1 md:gap-2"><div class="w-full flex items-center gap-1 md:gap-4 px-4">`);
			_push(ssrRenderComponent(unref(SidebarTrigger_default), null, null, _parent));
			_push(ssrRenderComponent(unref(Separator_default), {
				class: "h-4!",
				orientation: "vertical"
			}, null, _parent));
			_push(`<div class="grow"></div><div class="flex items-center gap-1 md:gap-2"><a href="https://github.com/northsh/detection.studio/">`);
			_push(ssrRenderComponent(unref(Button_default), {
				size: "sm",
				target: "_blank",
				variant: "ghost"
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(unref(Github), { class: "h-4 w-4 text-primary" }, null, _parent$1, _scopeId));
						_push$1(` GitHub `);
					} else return [createVNode(unref(Github), { class: "h-4 w-4 text-primary" }), createTextVNode(" GitHub ")];
				}),
				_: 1
			}, _parent));
			_push(`</a>`);
			_push(ssrRenderComponent(ShareSigmaRuleButton_default, null, null, _parent));
			_push(`</div></div></header><div class="px-1 pb-6 mt-1"><div class="mx-auto"><div class="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-100px)]">`);
			_push(ssrRenderComponent(_component_client_only, null, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(SigmaRuleList_default, {
							initialRuleId: __props.ruleId,
							class: "h-full border rounded-lg overflow-hidden shadow-xs"
						}, null, _parent$1, _scopeId));
						_push$1(`<div class="md:col-span-2 h-full border rounded-lg overflow-hidden shadow-xs"${_scopeId}>`);
						_push$1(ssrRenderComponent(SigmaRuleViewer_default, { class: "h-full" }, null, _parent$1, _scopeId));
						_push$1(`</div>`);
					} else return [createVNode(SigmaRuleList_default, {
						initialRuleId: __props.ruleId,
						class: "h-full border rounded-lg overflow-hidden shadow-xs"
					}, null, 8, ["initialRuleId"]), createVNode("div", { class: "md:col-span-2 h-full border rounded-lg overflow-hidden shadow-xs" }, [createVNode(SigmaRuleViewer_default, { class: "h-full" })])];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></div></div>`);
		};
	}
});
var _sfc_setup = RulesBrowser_vue_vue_type_script_setup_true_lang_default.setup;
RulesBrowser_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/RulesBrowser.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var RulesBrowser_default = RulesBrowser_vue_vue_type_script_setup_true_lang_default;
export { RulesBrowser_default as default };

//# sourceMappingURL=RulesBrowser-CV-c7jdW.js.map