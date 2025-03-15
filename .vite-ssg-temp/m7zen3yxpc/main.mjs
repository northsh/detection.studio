(function() {
	try {
		var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {};
		e.SENTRY_RELEASE = { id: "a2373c7004d0269c74d9ea84d69f613722a72468" };
	} catch (e) {}
})();
try {
	(function() {
		var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
		n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "85a10904-0334-4435-aa50-3abebdd54737", e._sentryDebugIdIdentifier = "sentry-dbid-85a10904-0334-4435-aa50-3abebdd54737");
	})();
} catch (e) {}
import { Fragment, Transition, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createSSRApp, createStaticVNode, createTextVNode, createVNode, defineComponent, getCurrentInstance, mergeProps, onMounted, onUnmounted, openBlock, ref, renderList, renderSlot, resolveComponent, resolveDynamicComponent, toDisplayString, unref, useSSRContext, watch, withCtx, withModifiers } from "vue";
import { ssrGetDynamicModelProps, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderSlot, ssrRenderVNode } from "vue/server-renderer";
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger, DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuItemIndicator, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuRoot, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, Primitive, ScrollAreaCorner, ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport, Separator, TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger, createContext, useForwardProps, useForwardPropsEmits } from "reka-ui";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { computedAsync, defaultDocument, reactiveOmit, useEventListener, useMediaQuery, useStorage, useVModel } from "@vueuse/core";
import { BookOpen, CalendarDays, Check, ChevronRight, ChevronsUpDown, Circle, Edit2, FileText, GlobeIcon, Layers2, PaletteIcon, PanelLeft, Plus, Settings2, Sparkles, Trash2, X } from "lucide-vue-next";
import { createPinia, defineStore } from "pinia";
import PromiseWorker from "promise-worker";
import { PiniaColada } from "@pinia/colada";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import { PiniaUndo } from "pinia-undo";
import { createHead } from "@unhead/vue/server";
import { createMemoryHistory, createRouter } from "vue-router";
import * as Sentry from "@sentry/vue";
var logo_default = "/assets/logo-Br0Bo_ic.png";
var Collapsible_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Collapsible",
	__ssrInlineRender: true,
	props: {
		defaultOpen: { type: Boolean },
		open: { type: Boolean },
		disabled: { type: Boolean },
		unmountOnHide: { type: Boolean },
		asChild: { type: Boolean },
		as: {}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(CollapsibleRoot), mergeProps(unref(forwarded), _attrs), {
				default: withCtx(({ open }, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", { open }, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default", { open })];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$78 = Collapsible_vue_vue_type_script_setup_true_lang_default.setup;
Collapsible_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/collapsible/Collapsible.vue");
	return _sfc_setup$78 ? _sfc_setup$78(props, ctx) : void 0;
};
var Collapsible_default = Collapsible_vue_vue_type_script_setup_true_lang_default;
var CollapsibleContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "CollapsibleContent",
	__ssrInlineRender: true,
	props: {
		forceMount: { type: Boolean },
		asChild: { type: Boolean },
		as: {}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(CollapsibleContent), mergeProps(props, { class: "overflow-hidden transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down" }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$77 = CollapsibleContent_vue_vue_type_script_setup_true_lang_default.setup;
CollapsibleContent_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/collapsible/CollapsibleContent.vue");
	return _sfc_setup$77 ? _sfc_setup$77(props, ctx) : void 0;
};
var CollapsibleContent_default = CollapsibleContent_vue_vue_type_script_setup_true_lang_default;
var CollapsibleTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "CollapsibleTrigger",
	__ssrInlineRender: true,
	props: {
		asChild: { type: Boolean },
		as: {}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(CollapsibleTrigger), mergeProps(props, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$76 = CollapsibleTrigger_vue_vue_type_script_setup_true_lang_default.setup;
CollapsibleTrigger_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/collapsible/CollapsibleTrigger.vue");
	return _sfc_setup$76 ? _sfc_setup$76(props, ctx) : void 0;
};
var CollapsibleTrigger_default = CollapsibleTrigger_vue_vue_type_script_setup_true_lang_default;
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var Sheet_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Sheet",
	__ssrInlineRender: true,
	props: {
		open: { type: Boolean },
		defaultOpen: { type: Boolean },
		modal: { type: Boolean }
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DialogRoot), mergeProps(unref(forwarded), _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$75 = Sheet_vue_vue_type_script_setup_true_lang_default.setup;
Sheet_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sheet/Sheet.vue");
	return _sfc_setup$75 ? _sfc_setup$75(props, ctx) : void 0;
};
var Sheet_default = Sheet_vue_vue_type_script_setup_true_lang_default;
var SheetClose_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SheetClose",
	__ssrInlineRender: true,
	props: {
		asChild: { type: Boolean },
		as: {}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DialogClose), mergeProps(props, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$74 = SheetClose_vue_vue_type_script_setup_true_lang_default.setup;
SheetClose_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sheet/SheetClose.vue");
	return _sfc_setup$74 ? _sfc_setup$74(props, ctx) : void 0;
};
var SheetContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "SheetContent",
	__ssrInlineRender: true,
	props: {
		class: {},
		side: {},
		forceMount: { type: Boolean },
		disableOutsidePointerEvents: { type: Boolean },
		asChild: { type: Boolean },
		as: {}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "side"), emits);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DialogPortal), _attrs, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(unref(DialogOverlay), { class: "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }, null, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(DialogContent), mergeProps({ class: unref(cn)(unref(sheetVariants)({ side: __props.side }), props.class) }, {
							...unref(forwarded),
							..._ctx.$attrs
						}), {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) {
									ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$2, _parent$2, _scopeId$1);
									_push$2(ssrRenderComponent(unref(DialogClose), { class: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary" }, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) _push$3(ssrRenderComponent(unref(X), { class: "w-4 h-4" }, null, _parent$3, _scopeId$2));
											else return [createVNode(unref(X), { class: "w-4 h-4" })];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
								} else return [renderSlot(_ctx.$slots, "default"), createVNode(unref(DialogClose), { class: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary" }, {
									default: withCtx(() => [createVNode(unref(X), { class: "w-4 h-4" })]),
									_: 1
								})];
							}),
							_: 3
						}, _parent$1, _scopeId));
					} else return [createVNode(unref(DialogOverlay), { class: "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }), createVNode(unref(DialogContent), mergeProps({ class: unref(cn)(unref(sheetVariants)({ side: __props.side }), props.class) }, {
						...unref(forwarded),
						..._ctx.$attrs
					}), {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default"), createVNode(unref(DialogClose), { class: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary" }, {
							default: withCtx(() => [createVNode(unref(X), { class: "w-4 h-4" })]),
							_: 1
						})]),
						_: 3
					}, 16, ["class"])];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$73 = SheetContent_vue_vue_type_script_setup_true_lang_default.setup;
SheetContent_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sheet/SheetContent.vue");
	return _sfc_setup$73 ? _sfc_setup$73(props, ctx) : void 0;
};
var SheetContent_default = SheetContent_vue_vue_type_script_setup_true_lang_default;
var SheetDescription_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SheetDescription",
	__ssrInlineRender: true,
	props: {
		asChild: { type: Boolean },
		as: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		const delegatedProps = reactiveOmit(props, "class");
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DialogDescription), mergeProps({ class: unref(cn)("text-sm text-muted-foreground", props.class) }, unref(delegatedProps), _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$72 = SheetDescription_vue_vue_type_script_setup_true_lang_default.setup;
SheetDescription_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sheet/SheetDescription.vue");
	return _sfc_setup$72 ? _sfc_setup$72(props, ctx) : void 0;
};
var SheetFooter_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SheetFooter",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: unref(cn)("flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-x-2", props.class) }, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div>`);
		};
	}
});
var _sfc_setup$71 = SheetFooter_vue_vue_type_script_setup_true_lang_default.setup;
SheetFooter_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sheet/SheetFooter.vue");
	return _sfc_setup$71 ? _sfc_setup$71(props, ctx) : void 0;
};
var SheetHeader_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SheetHeader",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: unref(cn)("flex flex-col gap-y-2 text-center sm:text-left", props.class) }, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div>`);
		};
	}
});
var _sfc_setup$70 = SheetHeader_vue_vue_type_script_setup_true_lang_default.setup;
SheetHeader_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sheet/SheetHeader.vue");
	return _sfc_setup$70 ? _sfc_setup$70(props, ctx) : void 0;
};
var SheetTitle_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SheetTitle",
	__ssrInlineRender: true,
	props: {
		asChild: { type: Boolean },
		as: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		const delegatedProps = reactiveOmit(props, "class");
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DialogTitle), mergeProps({ class: unref(cn)("text-lg font-semibold text-foreground", props.class) }, unref(delegatedProps), _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$69 = SheetTitle_vue_vue_type_script_setup_true_lang_default.setup;
SheetTitle_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sheet/SheetTitle.vue");
	return _sfc_setup$69 ? _sfc_setup$69(props, ctx) : void 0;
};
var SheetTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SheetTrigger",
	__ssrInlineRender: true,
	props: {
		asChild: { type: Boolean },
		as: {}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DialogTrigger), mergeProps(props, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$68 = SheetTrigger_vue_vue_type_script_setup_true_lang_default.setup;
SheetTrigger_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sheet/SheetTrigger.vue");
	return _sfc_setup$68 ? _sfc_setup$68(props, ctx) : void 0;
};
const sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 3600 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const [useSidebar, provideSidebarContext] = createContext("Sidebar");
var Sidebar_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "Sidebar",
	__ssrInlineRender: true,
	props: {
		side: { default: "left" },
		variant: { default: "sidebar" },
		collapsible: { default: "offcanvas" },
		class: {}
	},
	setup(__props) {
		const props = __props;
		const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
		return (_ctx, _push, _parent, _attrs) => {
			if (__props.collapsible === "none") {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: unref(cn)("flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground", props.class) }, _ctx.$attrs, _attrs))}>`);
				ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
				_push(`</div>`);
			} else if (unref(isMobile)) _push(ssrRenderComponent(unref(Sheet_default), mergeProps({ open: unref(openMobile) }, _ctx.$attrs, { "onUpdate:open": unref(setOpenMobile) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(ssrRenderComponent(unref(SheetContent_default), {
						"data-sidebar": "sidebar",
						"data-mobile": "true",
						side: __props.side,
						class: "w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
						style: { "--sidebar-width": unref(SIDEBAR_WIDTH_MOBILE) }
					}, {
						default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
							if (_push$2) {
								_push$2(`<div class="flex h-full w-full flex-col"${_scopeId$1}>`);
								ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$2, _parent$2, _scopeId$1);
								_push$2(`</div>`);
							} else return [createVNode("div", { class: "flex h-full w-full flex-col" }, [renderSlot(_ctx.$slots, "default")])];
						}),
						_: 3
					}, _parent$1, _scopeId));
					else return [createVNode(unref(SheetContent_default), {
						"data-sidebar": "sidebar",
						"data-mobile": "true",
						side: __props.side,
						class: "w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
						style: { "--sidebar-width": unref(SIDEBAR_WIDTH_MOBILE) }
					}, {
						default: withCtx(() => [createVNode("div", { class: "flex h-full w-full flex-col" }, [renderSlot(_ctx.$slots, "default")])]),
						_: 3
					}, 8, ["side", "style"])];
				}),
				_: 3
			}, _parent));
			else {
				_push(`<div${ssrRenderAttrs(mergeProps({
					class: "group peer hidden md:block",
					"data-state": unref(state),
					"data-collapsible": unref(state) === "collapsed" ? __props.collapsible : "",
					"data-variant": __props.variant,
					"data-side": __props.side
				}, _attrs))}><div class="${ssrRenderClass(unref(cn)("duration-500 relative h-svh w-(--sidebar-width) bg-transparent transition-[width] ease-in-out", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", __props.variant === "floating" || __props.variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"))}"></div><div${ssrRenderAttrs(mergeProps({ class: unref(cn)("duration-500 fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] ease-in-out md:flex", __props.side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]", __props.variant === "floating" || __props.variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l", props.class) }, _ctx.$attrs))}><div data-sidebar="sidebar" class="flex h-full w-full flex-col text-sidebar-foreground bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow">`);
				ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
				_push(`</div></div></div>`);
			}
		};
	}
});
var _sfc_setup$67 = Sidebar_vue_vue_type_script_setup_true_lang_default.setup;
Sidebar_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/Sidebar.vue");
	return _sfc_setup$67 ? _sfc_setup$67(props, ctx) : void 0;
};
var Sidebar_default = Sidebar_vue_vue_type_script_setup_true_lang_default;
var SidebarContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SidebarContent",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				"data-sidebar": "content",
				class: unref(cn)("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", props.class)
			}, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div>`);
		};
	}
});
var _sfc_setup$66 = SidebarContent_vue_vue_type_script_setup_true_lang_default.setup;
SidebarContent_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarContent.vue");
	return _sfc_setup$66 ? _sfc_setup$66(props, ctx) : void 0;
};
var SidebarContent_default = SidebarContent_vue_vue_type_script_setup_true_lang_default;
var SidebarFooter_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SidebarFooter",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				"data-sidebar": "footer",
				class: unref(cn)("flex flex-col gap-2 p-2", props.class)
			}, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div>`);
		};
	}
});
var _sfc_setup$65 = SidebarFooter_vue_vue_type_script_setup_true_lang_default.setup;
SidebarFooter_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarFooter.vue");
	return _sfc_setup$65 ? _sfc_setup$65(props, ctx) : void 0;
};
var SidebarFooter_default = SidebarFooter_vue_vue_type_script_setup_true_lang_default;
var SidebarGroup_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SidebarGroup",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				"data-sidebar": "group",
				class: unref(cn)("relative flex w-full min-w-0 flex-col p-2", props.class)
			}, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div>`);
		};
	}
});
var _sfc_setup$64 = SidebarGroup_vue_vue_type_script_setup_true_lang_default.setup;
SidebarGroup_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarGroup.vue");
	return _sfc_setup$64 ? _sfc_setup$64(props, ctx) : void 0;
};
var SidebarGroup_default = SidebarGroup_vue_vue_type_script_setup_true_lang_default;
var SidebarGroupAction_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SidebarGroupAction",
	__ssrInlineRender: true,
	props: {
		asChild: { type: Boolean },
		as: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Primitive), mergeProps({
				"data-sidebar": "group-action",
				as: __props.as,
				"as-child": __props.asChild,
				class: unref(cn)("absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "after:absolute after:-inset-2 after:md:hidden", "group-data-[collapsible=icon]:hidden", props.class)
			}, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$63 = SidebarGroupAction_vue_vue_type_script_setup_true_lang_default.setup;
SidebarGroupAction_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarGroupAction.vue");
	return _sfc_setup$63 ? _sfc_setup$63(props, ctx) : void 0;
};
var SidebarGroupContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SidebarGroupContent",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				"data-sidebar": "group-content",
				class: unref(cn)("w-full text-sm", props.class)
			}, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div>`);
		};
	}
});
var _sfc_setup$62 = SidebarGroupContent_vue_vue_type_script_setup_true_lang_default.setup;
SidebarGroupContent_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarGroupContent.vue");
	return _sfc_setup$62 ? _sfc_setup$62(props, ctx) : void 0;
};
var SidebarGroupContent_default = SidebarGroupContent_vue_vue_type_script_setup_true_lang_default;
var SidebarGroupLabel_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SidebarGroupLabel",
	__ssrInlineRender: true,
	props: {
		asChild: { type: Boolean },
		as: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Primitive), mergeProps({
				"data-sidebar": "group-label",
				as: __props.as,
				"as-child": __props.asChild,
				class: unref(cn)("duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0", props.class)
			}, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$61 = SidebarGroupLabel_vue_vue_type_script_setup_true_lang_default.setup;
SidebarGroupLabel_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarGroupLabel.vue");
	return _sfc_setup$61 ? _sfc_setup$61(props, ctx) : void 0;
};
var SidebarGroupLabel_default = SidebarGroupLabel_vue_vue_type_script_setup_true_lang_default;
var SidebarHeader_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SidebarHeader",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				"data-sidebar": "header",
				class: unref(cn)("flex flex-col gap-2 p-2", props.class)
			}, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div>`);
		};
	}
});
var _sfc_setup$60 = SidebarHeader_vue_vue_type_script_setup_true_lang_default.setup;
SidebarHeader_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarHeader.vue");
	return _sfc_setup$60 ? _sfc_setup$60(props, ctx) : void 0;
};
var SidebarHeader_default = SidebarHeader_vue_vue_type_script_setup_true_lang_default;
var Input_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Input",
	__ssrInlineRender: true,
	props: {
		defaultValue: {},
		modelValue: {},
		class: {}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const modelValue = useVModel(props, "modelValue", __emit, {
			passive: true,
			defaultValue: props.defaultValue
		});
		return (_ctx, _push, _parent, _attrs) => {
			let _temp0;
			_push(`<input${ssrRenderAttrs((_temp0 = mergeProps({ class: unref(cn)("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", props.class) }, _attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, unref(modelValue)))))}>`);
		};
	}
});
var _sfc_setup$59 = Input_vue_vue_type_script_setup_true_lang_default.setup;
Input_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/input/Input.vue");
	return _sfc_setup$59 ? _sfc_setup$59(props, ctx) : void 0;
};
var Input_default = Input_vue_vue_type_script_setup_true_lang_default;
var SidebarInput_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SidebarInput",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Input_default), mergeProps({
				"data-sidebar": "input",
				class: unref(cn)("h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring", props.class)
			}, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$58 = SidebarInput_vue_vue_type_script_setup_true_lang_default.setup;
SidebarInput_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarInput.vue");
	return _sfc_setup$58 ? _sfc_setup$58(props, ctx) : void 0;
};
var SidebarInset_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SidebarInset",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<main${ssrRenderAttrs(mergeProps({ class: unref(cn)("relative flex min-h-svh flex-1 flex-col bg-background", "peer-data-[variant=inset]:min-h-[calc(100svh-(--spacing(4)))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow", props.class) }, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</main>`);
		};
	}
});
var _sfc_setup$57 = SidebarInset_vue_vue_type_script_setup_true_lang_default.setup;
SidebarInset_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarInset.vue");
	return _sfc_setup$57 ? _sfc_setup$57(props, ctx) : void 0;
};
var SidebarInset_default = SidebarInset_vue_vue_type_script_setup_true_lang_default;
var SidebarMenu_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SidebarMenu",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<ul${ssrRenderAttrs(mergeProps({
				"data-sidebar": "menu",
				class: unref(cn)("flex w-full min-w-0 flex-col gap-1", props.class)
			}, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</ul>`);
		};
	}
});
var _sfc_setup$56 = SidebarMenu_vue_vue_type_script_setup_true_lang_default.setup;
SidebarMenu_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarMenu.vue");
	return _sfc_setup$56 ? _sfc_setup$56(props, ctx) : void 0;
};
var SidebarMenu_default = SidebarMenu_vue_vue_type_script_setup_true_lang_default;
var SidebarMenuAction_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SidebarMenuAction",
	__ssrInlineRender: true,
	props: {
		asChild: { type: Boolean },
		as: { default: "button" },
		showOnHover: { type: Boolean },
		class: {}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Primitive), mergeProps({
				"data-sidebar": "menu-action",
				class: unref(cn)("absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0", "after:absolute after:-inset-2 after:md:hidden", "peer-data-[size=sm]/menu-button:top-1", "peer-data-[size=default]/menu-button:top-1.5", "peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", __props.showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0", props.class),
				as: __props.as,
				"as-child": __props.asChild
			}, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$55 = SidebarMenuAction_vue_vue_type_script_setup_true_lang_default.setup;
SidebarMenuAction_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarMenuAction.vue");
	return _sfc_setup$55 ? _sfc_setup$55(props, ctx) : void 0;
};
var SidebarMenuBadge_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SidebarMenuBadge",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				"data-sidebar": "menu-badge",
				class: unref(cn)("absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none", "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground", "peer-data-[size=sm]/menu-button:top-1", "peer-data-[size=default]/menu-button:top-1.5", "peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", props.class)
			}, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div>`);
		};
	}
});
var _sfc_setup$54 = SidebarMenuBadge_vue_vue_type_script_setup_true_lang_default.setup;
SidebarMenuBadge_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarMenuBadge.vue");
	return _sfc_setup$54 ? _sfc_setup$54(props, ctx) : void 0;
};
var Tooltip_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Tooltip",
	__ssrInlineRender: true,
	props: {
		defaultOpen: { type: Boolean },
		open: { type: Boolean },
		delayDuration: {},
		disableHoverableContent: { type: Boolean },
		disableClosingTrigger: { type: Boolean },
		disabled: { type: Boolean },
		ignoreNonKeyboardFocus: { type: Boolean }
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(TooltipRoot), mergeProps(unref(forwarded), _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$53 = Tooltip_vue_vue_type_script_setup_true_lang_default.setup;
Tooltip_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/tooltip/Tooltip.vue");
	return _sfc_setup$53 ? _sfc_setup$53(props, ctx) : void 0;
};
var Tooltip_default = Tooltip_vue_vue_type_script_setup_true_lang_default;
var TooltipContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "TooltipContent",
	__ssrInlineRender: true,
	props: {
		forceMount: { type: Boolean },
		ariaLabel: {},
		asChild: { type: Boolean },
		as: {},
		side: {},
		sideOffset: { default: 4 },
		align: {},
		alignOffset: {},
		avoidCollisions: { type: Boolean },
		collisionBoundary: {},
		collisionPadding: {},
		arrowPadding: {},
		sticky: {},
		hideWhenDetached: { type: Boolean },
		positionStrategy: {},
		updatePositionStrategy: {},
		class: {}
	},
	emits: ["escapeKeyDown", "pointerDownOutside"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(TooltipPortal), _attrs, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(ssrRenderComponent(unref(TooltipContent), mergeProps({
						...unref(forwarded),
						..._ctx.$attrs
					}, { class: unref(cn)("z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", props.class) }), {
						default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
							if (_push$2) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$2, _parent$2, _scopeId$1);
							else return [renderSlot(_ctx.$slots, "default")];
						}),
						_: 3
					}, _parent$1, _scopeId));
					else return [createVNode(unref(TooltipContent), mergeProps({
						...unref(forwarded),
						..._ctx.$attrs
					}, { class: unref(cn)("z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", props.class) }), {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
						_: 3
					}, 16, ["class"])];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$52 = TooltipContent_vue_vue_type_script_setup_true_lang_default.setup;
TooltipContent_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/tooltip/TooltipContent.vue");
	return _sfc_setup$52 ? _sfc_setup$52(props, ctx) : void 0;
};
var TooltipContent_default = TooltipContent_vue_vue_type_script_setup_true_lang_default;
var TooltipProvider_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "TooltipProvider",
	__ssrInlineRender: true,
	props: {
		delayDuration: {},
		skipDelayDuration: {},
		disableHoverableContent: { type: Boolean },
		disableClosingTrigger: { type: Boolean },
		disabled: { type: Boolean },
		ignoreNonKeyboardFocus: { type: Boolean }
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(TooltipProvider), mergeProps(props, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$51 = TooltipProvider_vue_vue_type_script_setup_true_lang_default.setup;
TooltipProvider_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/tooltip/TooltipProvider.vue");
	return _sfc_setup$51 ? _sfc_setup$51(props, ctx) : void 0;
};
var TooltipProvider_default = TooltipProvider_vue_vue_type_script_setup_true_lang_default;
var TooltipTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "TooltipTrigger",
	__ssrInlineRender: true,
	props: {
		reference: {},
		asChild: { type: Boolean },
		as: {}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(TooltipTrigger), mergeProps(props, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$50 = TooltipTrigger_vue_vue_type_script_setup_true_lang_default.setup;
TooltipTrigger_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/tooltip/TooltipTrigger.vue");
	return _sfc_setup$50 ? _sfc_setup$50(props, ctx) : void 0;
};
var TooltipTrigger_default = TooltipTrigger_vue_vue_type_script_setup_true_lang_default;
var SidebarMenuButtonChild_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SidebarMenuButtonChild",
	__ssrInlineRender: true,
	props: {
		variant: { default: "default" },
		size: { default: "default" },
		isActive: { type: Boolean },
		class: {},
		asChild: { type: Boolean },
		as: { default: "button" }
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Primitive), mergeProps({
				"data-sidebar": "menu-button",
				"data-size": __props.size,
				"data-active": __props.isActive,
				class: unref(cn)(unref(sidebarMenuButtonVariants)({
					variant: __props.variant,
					size: __props.size
				}), props.class),
				as: __props.as,
				"as-child": __props.asChild
			}, _ctx.$attrs, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$49 = SidebarMenuButtonChild_vue_vue_type_script_setup_true_lang_default.setup;
SidebarMenuButtonChild_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarMenuButtonChild.vue");
	return _sfc_setup$49 ? _sfc_setup$49(props, ctx) : void 0;
};
var SidebarMenuButtonChild_default = SidebarMenuButtonChild_vue_vue_type_script_setup_true_lang_default;
var SidebarMenuButton_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "SidebarMenuButton",
	__ssrInlineRender: true,
	props: {
		variant: { default: "default" },
		size: { default: "default" },
		isActive: { type: Boolean },
		class: {},
		asChild: { type: Boolean },
		as: { default: "button" },
		tooltip: {}
	},
	setup(__props) {
		const props = __props;
		const { isMobile, state } = useSidebar();
		const delegatedProps = reactiveOmit(props, "tooltip");
		return (_ctx, _push, _parent, _attrs) => {
			if (!__props.tooltip) _push(ssrRenderComponent(SidebarMenuButtonChild_default, mergeProps({
				...unref(delegatedProps),
				..._ctx.$attrs
			}, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
			else _push(ssrRenderComponent(unref(Tooltip_default), _attrs, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(unref(TooltipTrigger_default), { "as-child": "" }, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) _push$2(ssrRenderComponent(SidebarMenuButtonChild_default, {
									...unref(delegatedProps),
									..._ctx.$attrs
								}, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$3, _parent$3, _scopeId$2);
										else return [renderSlot(_ctx.$slots, "default")];
									}),
									_: 3
								}, _parent$2, _scopeId$1));
								else return [createVNode(SidebarMenuButtonChild_default, {
									...unref(delegatedProps),
									..._ctx.$attrs
								}, {
									default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
									_: 3
								}, 16)];
							}),
							_: 3
						}, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(TooltipContent_default), {
							side: "right",
							align: "center",
							hidden: unref(state) !== "collapsed" || unref(isMobile)
						}, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) if (typeof __props.tooltip === "string") _push$2(`<!--[-->${ssrInterpolate(__props.tooltip)}<!--]-->`);
								else ssrRenderVNode(_push$2, createVNode(resolveDynamicComponent(__props.tooltip), null, null), _parent$2, _scopeId$1);
								else return [typeof __props.tooltip === "string" ? (openBlock(), createBlock(Fragment, { key: 0 }, [createTextVNode(toDisplayString(__props.tooltip), 1)], 64)) : (openBlock(), createBlock(resolveDynamicComponent(__props.tooltip), { key: 1 }))];
							}),
							_: 1
						}, _parent$1, _scopeId));
					} else return [createVNode(unref(TooltipTrigger_default), { "as-child": "" }, {
						default: withCtx(() => [createVNode(SidebarMenuButtonChild_default, {
							...unref(delegatedProps),
							..._ctx.$attrs
						}, {
							default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
							_: 3
						}, 16)]),
						_: 3
					}), createVNode(unref(TooltipContent_default), {
						side: "right",
						align: "center",
						hidden: unref(state) !== "collapsed" || unref(isMobile)
					}, {
						default: withCtx(() => [typeof __props.tooltip === "string" ? (openBlock(), createBlock(Fragment, { key: 0 }, [createTextVNode(toDisplayString(__props.tooltip), 1)], 64)) : (openBlock(), createBlock(resolveDynamicComponent(__props.tooltip), { key: 1 }))]),
						_: 1
					}, 8, ["hidden"])];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$48 = SidebarMenuButton_vue_vue_type_script_setup_true_lang_default.setup;
SidebarMenuButton_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarMenuButton.vue");
	return _sfc_setup$48 ? _sfc_setup$48(props, ctx) : void 0;
};
var SidebarMenuButton_default = SidebarMenuButton_vue_vue_type_script_setup_true_lang_default;
var SidebarMenuItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SidebarMenuItem",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<li${ssrRenderAttrs(mergeProps({
				"data-sidebar": "menu-item",
				class: unref(cn)("group/menu-item relative", props.class)
			}, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</li>`);
		};
	}
});
var _sfc_setup$47 = SidebarMenuItem_vue_vue_type_script_setup_true_lang_default.setup;
SidebarMenuItem_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarMenuItem.vue");
	return _sfc_setup$47 ? _sfc_setup$47(props, ctx) : void 0;
};
var SidebarMenuItem_default = SidebarMenuItem_vue_vue_type_script_setup_true_lang_default;
var Skeleton_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Skeleton",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: unref(cn)("animate-pulse rounded-md bg-primary/10", props.class) }, _attrs))}></div>`);
		};
	}
});
var _sfc_setup$46 = Skeleton_vue_vue_type_script_setup_true_lang_default.setup;
Skeleton_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/skeleton/Skeleton.vue");
	return _sfc_setup$46 ? _sfc_setup$46(props, ctx) : void 0;
};
var Skeleton_default = Skeleton_vue_vue_type_script_setup_true_lang_default;
var SidebarMenuSkeleton_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SidebarMenuSkeleton",
	__ssrInlineRender: true,
	props: {
		showIcon: { type: Boolean },
		class: {}
	},
	setup(__props) {
		const props = __props;
		const width = computed(() => {
			return `${Math.floor(Math.random() * 40) + 50}%`;
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				"data-sidebar": "menu-skeleton",
				class: unref(cn)("rounded-md h-8 flex gap-2 px-2 items-center", props.class)
			}, _attrs))}>`);
			if (__props.showIcon) _push(ssrRenderComponent(unref(Skeleton_default), {
				class: "size-4 rounded-md",
				"data-sidebar": "menu-skeleton-icon"
			}, null, _parent));
			else _push(`<!---->`);
			_push(ssrRenderComponent(unref(Skeleton_default), {
				class: "h-4 flex-1 max-w-(--skeleton-width)",
				"data-sidebar": "menu-skeleton-text",
				style: { "--skeleton-width": width.value }
			}, null, _parent));
			_push(`</div>`);
		};
	}
});
var _sfc_setup$45 = SidebarMenuSkeleton_vue_vue_type_script_setup_true_lang_default.setup;
SidebarMenuSkeleton_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarMenuSkeleton.vue");
	return _sfc_setup$45 ? _sfc_setup$45(props, ctx) : void 0;
};
var SidebarMenuSub_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SidebarMenuSub",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<ul${ssrRenderAttrs(mergeProps({
				"data-sidebar": "menu-badge",
				class: unref(cn)("mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5", "group-data-[collapsible=icon]:hidden", props.class)
			}, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</ul>`);
		};
	}
});
var _sfc_setup$44 = SidebarMenuSub_vue_vue_type_script_setup_true_lang_default.setup;
SidebarMenuSub_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarMenuSub.vue");
	return _sfc_setup$44 ? _sfc_setup$44(props, ctx) : void 0;
};
var SidebarMenuSub_default = SidebarMenuSub_vue_vue_type_script_setup_true_lang_default;
var SidebarMenuSubButton_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SidebarMenuSubButton",
	__ssrInlineRender: true,
	props: {
		asChild: { type: Boolean },
		as: { default: "a" },
		size: { default: "md" },
		isActive: { type: Boolean },
		class: {}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Primitive), mergeProps({
				"data-sidebar": "menu-sub-button",
				as: __props.as,
				"as-child": __props.asChild,
				"data-size": __props.size,
				"data-active": __props.isActive,
				class: unref(cn)("flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground", "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground", __props.size === "sm" && "text-xs", __props.size === "md" && "text-sm", "group-data-[collapsible=icon]:hidden", props.class)
			}, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$43 = SidebarMenuSubButton_vue_vue_type_script_setup_true_lang_default.setup;
SidebarMenuSubButton_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarMenuSubButton.vue");
	return _sfc_setup$43 ? _sfc_setup$43(props, ctx) : void 0;
};
var SidebarMenuSubButton_default = SidebarMenuSubButton_vue_vue_type_script_setup_true_lang_default;
var _plugin_vue_export_helper_default = (sfc, props) => {
	const target = sfc.__vccOpts || sfc;
	for (const [key, val] of props) target[key] = val;
	return target;
};
var _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	_push(`<li${ssrRenderAttrs(_attrs)}>`);
	ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
	_push(`</li>`);
}
var _sfc_setup$42 = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarMenuSubItem.vue");
	return _sfc_setup$42 ? _sfc_setup$42(props, ctx) : void 0;
};
var SidebarMenuSubItem_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
var SidebarProvider_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SidebarProvider",
	__ssrInlineRender: true,
	props: {
		defaultOpen: {
			type: Boolean,
			default: !defaultDocument?.cookie.includes(`${SIDEBAR_COOKIE_NAME}=false`)
		},
		open: {
			type: Boolean,
			default: void 0
		},
		class: {}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const isMobile = useMediaQuery("(max-width: 768px)");
		const openMobile = ref(false);
		const open = useVModel(props, "open", emits, {
			defaultValue: props.defaultOpen ?? false,
			passive: props.open === void 0
		});
		function setOpen(value) {
			open.value = value;
			document.cookie = `${SIDEBAR_COOKIE_NAME}=${open.value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
		}
		function setOpenMobile(value) {
			openMobile.value = value;
		}
		function toggleSidebar() {
			return isMobile.value ? setOpenMobile(!openMobile.value) : setOpen(!open.value);
		}
		useEventListener("keydown", (event) => {
			if (event.key === "b" && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				toggleSidebar();
			}
		});
		provideSidebarContext({
			state: computed(() => open.value ? "expanded" : "collapsed"),
			open,
			setOpen,
			isMobile,
			openMobile,
			setOpenMobile,
			toggleSidebar
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(TooltipProvider), mergeProps({ "delay-duration": 0 }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(`<div${ssrRenderAttrs(mergeProps({
							style: {
								"--sidebar-width": unref(SIDEBAR_WIDTH),
								"--sidebar-width-icon": unref(SIDEBAR_WIDTH_ICON)
							},
							class: unref(cn)("group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar", props.class)
						}, _ctx.$attrs))}${_scopeId}>`);
						ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
						_push$1(`</div>`);
					} else return [createVNode("div", mergeProps({
						style: {
							"--sidebar-width": unref(SIDEBAR_WIDTH),
							"--sidebar-width-icon": unref(SIDEBAR_WIDTH_ICON)
						},
						class: unref(cn)("group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar", props.class)
					}, _ctx.$attrs), [renderSlot(_ctx.$slots, "default")], 16)];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$41 = SidebarProvider_vue_vue_type_script_setup_true_lang_default.setup;
SidebarProvider_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarProvider.vue");
	return _sfc_setup$41 ? _sfc_setup$41(props, ctx) : void 0;
};
var SidebarProvider_default = SidebarProvider_vue_vue_type_script_setup_true_lang_default;
var SidebarRail_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SidebarRail",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const { toggleSidebar } = useSidebar();
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<button${ssrRenderAttrs(mergeProps({
				"data-sidebar": "rail",
				"aria-label": "Toggle Sidebar",
				tabindex: -1,
				title: "Toggle Sidebar",
				class: unref(cn)("absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex", "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize", "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize", "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar", "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2", "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2", props.class)
			}, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</button>`);
		};
	}
});
var _sfc_setup$40 = SidebarRail_vue_vue_type_script_setup_true_lang_default.setup;
SidebarRail_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarRail.vue");
	return _sfc_setup$40 ? _sfc_setup$40(props, ctx) : void 0;
};
var SidebarRail_default = SidebarRail_vue_vue_type_script_setup_true_lang_default;
var Separator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Separator",
	__ssrInlineRender: true,
	props: {
		orientation: { default: "horizontal" },
		decorative: {
			type: Boolean,
			default: true
		},
		asChild: { type: Boolean },
		as: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		const delegatedProps = reactiveOmit(props, "class");
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Separator), mergeProps(unref(delegatedProps), { class: unref(cn)("shrink-0 bg-border", props.orientation === "horizontal" ? "h-px w-full" : "w-px h-full", props.class) }, _attrs), null, _parent));
		};
	}
});
var _sfc_setup$39 = Separator_vue_vue_type_script_setup_true_lang_default.setup;
Separator_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/separator/Separator.vue");
	return _sfc_setup$39 ? _sfc_setup$39(props, ctx) : void 0;
};
var Separator_default = Separator_vue_vue_type_script_setup_true_lang_default;
var SidebarSeparator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SidebarSeparator",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Separator_default), mergeProps({
				"data-sidebar": "separator",
				class: unref(cn)("mx-2 w-auto bg-sidebar-border", props.class)
			}, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$38 = SidebarSeparator_vue_vue_type_script_setup_true_lang_default.setup;
SidebarSeparator_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarSeparator.vue");
	return _sfc_setup$38 ? _sfc_setup$38(props, ctx) : void 0;
};
var SidebarSeparator_default = SidebarSeparator_vue_vue_type_script_setup_true_lang_default;
var Button_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Button",
	__ssrInlineRender: true,
	props: {
		variant: {},
		size: {},
		class: {},
		asChild: { type: Boolean },
		as: { default: "button" }
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Primitive), mergeProps({
				as: __props.as,
				"as-child": __props.asChild,
				class: unref(cn)(unref(buttonVariants)({
					variant: __props.variant,
					size: __props.size
				}), props.class)
			}, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$37 = Button_vue_vue_type_script_setup_true_lang_default.setup;
Button_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/button/Button.vue");
	return _sfc_setup$37 ? _sfc_setup$37(props, ctx) : void 0;
};
var Button_default = Button_vue_vue_type_script_setup_true_lang_default;
const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			xs: "h-7 rounded px-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9",
			"icon-sm": "size-8",
			"icon-lg": "size-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var SidebarTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SidebarTrigger",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const { toggleSidebar } = useSidebar();
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Button_default), mergeProps({
				"data-sidebar": "trigger",
				variant: "ghost",
				size: "icon",
				class: unref(cn)("h-7 w-7", props.class),
				onClick: unref(toggleSidebar)
			}, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(unref(PanelLeft), null, null, _parent$1, _scopeId));
						_push$1(`<span class="sr-only"${_scopeId}>Toggle Sidebar</span>`);
					} else return [createVNode(unref(PanelLeft)), createVNode("span", { class: "sr-only" }, "Toggle Sidebar")];
				}),
				_: 1
			}, _parent));
		};
	}
});
var _sfc_setup$36 = SidebarTrigger_vue_vue_type_script_setup_true_lang_default.setup;
SidebarTrigger_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarTrigger.vue");
	return _sfc_setup$36 ? _sfc_setup$36(props, ctx) : void 0;
};
var SidebarTrigger_default = SidebarTrigger_vue_vue_type_script_setup_true_lang_default;
const sidebarMenuButtonVariants = cva("peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0", {
	variants: {
		variant: {
			default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
			outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
		},
		size: {
			default: "h-8 text-sm",
			sm: "h-7 text-xs",
			lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Card_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Card",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: unref(cn)("rounded-xl border bg-card text-card-foreground shadow", props.class) }, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div>`);
		};
	}
});
var _sfc_setup$35 = Card_vue_vue_type_script_setup_true_lang_default.setup;
Card_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/card/Card.vue");
	return _sfc_setup$35 ? _sfc_setup$35(props, ctx) : void 0;
};
var Card_default = Card_vue_vue_type_script_setup_true_lang_default;
var CardContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "CardContent",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: unref(cn)("p-6 pt-0", props.class) }, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div>`);
		};
	}
});
var _sfc_setup$34 = CardContent_vue_vue_type_script_setup_true_lang_default.setup;
CardContent_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/card/CardContent.vue");
	return _sfc_setup$34 ? _sfc_setup$34(props, ctx) : void 0;
};
var CardContent_default = CardContent_vue_vue_type_script_setup_true_lang_default;
var CardDescription_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "CardDescription",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<p${ssrRenderAttrs(mergeProps({ class: unref(cn)("text-sm text-muted-foreground", props.class) }, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</p>`);
		};
	}
});
var _sfc_setup$33 = CardDescription_vue_vue_type_script_setup_true_lang_default.setup;
CardDescription_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/card/CardDescription.vue");
	return _sfc_setup$33 ? _sfc_setup$33(props, ctx) : void 0;
};
var CardDescription_default = CardDescription_vue_vue_type_script_setup_true_lang_default;
var CardFooter_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "CardFooter",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: unref(cn)("flex items-center p-6 pt-0", props.class) }, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div>`);
		};
	}
});
var _sfc_setup$32 = CardFooter_vue_vue_type_script_setup_true_lang_default.setup;
CardFooter_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/card/CardFooter.vue");
	return _sfc_setup$32 ? _sfc_setup$32(props, ctx) : void 0;
};
var CardFooter_default = CardFooter_vue_vue_type_script_setup_true_lang_default;
var CardHeader_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "CardHeader",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: unref(cn)("flex flex-col gap-y-1.5 p-6", props.class) }, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div>`);
		};
	}
});
var _sfc_setup$31 = CardHeader_vue_vue_type_script_setup_true_lang_default.setup;
CardHeader_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/card/CardHeader.vue");
	return _sfc_setup$31 ? _sfc_setup$31(props, ctx) : void 0;
};
var CardHeader_default = CardHeader_vue_vue_type_script_setup_true_lang_default;
var CardTitle_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "CardTitle",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<h3${ssrRenderAttrs(mergeProps({ class: unref(cn)("font-semibold leading-none tracking-tight", props.class) }, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</h3>`);
		};
	}
});
var _sfc_setup$30 = CardTitle_vue_vue_type_script_setup_true_lang_default.setup;
CardTitle_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/card/CardTitle.vue");
	return _sfc_setup$30 ? _sfc_setup$30(props, ctx) : void 0;
};
var CardTitle_default = CardTitle_vue_vue_type_script_setup_true_lang_default;
var _hoisted_1$12 = {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 500 500"
};
function render$12(_ctx, _cache) {
	return openBlock(), createElementBlock("svg", _hoisted_1$12, [..._cache[0] || (_cache[0] = [createElementVNode("path", {
		fill: "currentColor",
		"fill-rule": "nonzero",
		d: "M418.75 0H81.25C36.377 0 0 36.377 0 81.25v337.5A81.25 81.25 0 0 0 81.25 500h337.5A81.25 81.25 0 0 0 500 418.75V81.25A81.25 81.25 0 0 0 418.75 0M370 276.25c0 1.25 0 2.5-2.5 3.75L133.75 397.5c-1.25 1.25-3.75-1.25-3.75-2.5v-60c0-1.25 0-2.5 1.25-2.5l170-85-170-86.25c-1.25 0-1.25-1.25-1.25-2.5v-60c0-1.25 2.5-3.75 3.75-2.5l233.75 117.5a6.25 6.25 0 0 1 2.5 5z"
	}, null, -1)])]);
}
var splunk_default$1 = { render: render$12 };
var _hoisted_1$11 = {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 503 500"
};
function render$11(_ctx, _cache) {
	return openBlock(), createElementBlock("svg", _hoisted_1$11, [..._cache[0] || (_cache[0] = [createElementVNode("path", {
		fill: "currentColor",
		"fill-rule": "nonzero",
		d: "m425.539 340.598-82.77-19.402-22.045-41.967 108.34-94.917c32.148 12.132 53.517 42.942 53.517 77.466 0 35.39-23.43 67.68-57.042 78.82m-62.266 97.844c-12.887 0-25.492-4.343-35.814-12.21l16.38-85.304 75.154 17.624c2.376 6.468 3.603 13.36 3.603 20.567 0 32.793-26.561 59.339-59.339 59.339zm-55.153-12.21c-23.037 34.036-61.48 54.429-102.613 54.335-68.528 0-124.248-55.72-124.248-124.17 0-8.435.818-16.727 2.455-24.737l108.025-97.702L302.06 284.2l24.422 46.704zM19.465 238.315c0-35.39 23.352-67.679 56.963-78.82l82.596 19.576 19.434 41.4-105.633 95.484c-32.054-12.21-53.36-43.037-53.36-77.624zm119.229-176.68c13.045 0 25.665 4.265 36.066 12.133l-16.475 85.554-75.327-17.702c-2.376-6.546-3.603-13.454-3.603-20.645 0-32.715 26.64-59.34 59.339-59.34M194.35 73.91C217.53 40.236 255.657 20.08 296.554 20.08c68.277 0 123.824 55.578 123.824 123.918 0 8.371-.74 16.318-2.376 24.343l-110.795 97.12-109.835-50.055-21.463-45.822zm307.663 188.088c0-42.124-26.137-78.914-65.397-93.17 1.81-8.938 2.628-17.955 2.628-26.955C439.245 63.683 375.625 0 297.45 0c-45.744 0-88.183 21.967-114.918 58.851-13.202-10.26-29.41-15.814-46.058-15.735-41.558 0-75.326 33.753-75.326 75.232 0 9.174 1.636 17.938 4.673 26.231C26.798 158.68 0 196.302 0 238.175c0 42.281 26.231 79.166 65.65 93.422-1.716 8.86-2.629 17.86-2.629 26.955 0 78.033 63.51 141.448 141.542 141.448 45.823 0 88.262-21.967 114.823-59.087 13.203 10.4 29.332 16.05 46.137 16.05 41.48 0 75.232-33.674 75.232-75.232 0-9.174-1.636-17.939-4.673-26.231 39.024-14.1 65.9-51.723 65.9-93.517z"
	}, null, -1)])]);
}
var elasticsearch_default$1 = { render: render$11 };
var _hoisted_1$10 = {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 500 580"
};
function render$10(_ctx, _cache) {
	return openBlock(), createElementBlock("svg", _hoisted_1$10, [..._cache[0] || (_cache[0] = [createElementVNode("path", {
		fill: "currentColor",
		"fill-rule": "nonzero",
		d: "m118.581 525.69 6.917 46.444-45.455 6.917-7.905-46.442zm72.132-10.868 7.905 45.454-47.43 7.906-5.93-46.443zm72.13-11.86 6.916 47.432-45.454 5.93-7.905-45.456zm-155.136-49.404L114.624 500l-46.443 6.918-6.917-46.444zm72.132-10.87 6.918 46.444-45.455 6.915-7.904-46.442zm72.134-10.869 6.917 45.455-46.443 7.905-6.916-46.443zM20.751 62.253 77.075 431.82l-19.763 2.965L0 65.218zm21.737-31.621 61.265 397.234-19.763 2.964L22.725 34.585zM84.984 0l64.23 420.95-19.764 1.975L65.22 3.952zm31.615 33.595 59.288 383.4-18.775 1.976L97.824 36.56zm52.375 35.576 52.37 339.92-19.762 3.954-52.372-340.91zm24.703-16.798 54.347 352.768-18.773 2.964-55.337-352.767zM493.083 468.38 500 514.822l-203.557 31.621-7.905-47.431zm-11.854-72.133 7.905 45.454-204.545 31.621-5.928-45.455z"
	}, null, -1)])]);
}
var grafana_default$1 = { render: render$10 };
var _hoisted_1$9 = {
	xmlns: "http://www.w3.org/2000/svg",
	"xml:space": "preserve",
	id: "Layer_1",
	x: "0",
	y: "0",
	version: "1.1",
	viewBox: "0 0 512 512"
};
function render$9(_ctx, _cache) {
	return openBlock(), createElementBlock("svg", _hoisted_1$9, [(openBlock(), createBlock(resolveDynamicComponent("style"), null, {
		default: withCtx(() => [..._cache[0] || (_cache[0] = [createTextVNode(".st0{fill-rule:evenodd;clip-rule:evenodd;fill:#ff0026}", -1)])]),
		_: 1
	})), _cache[1] || (_cache[1] = createStaticVNode("<g id=\"logo_horizontal\" transform=\"translate(143 208.025)\"><path id=\"Fill-33\" d=\"M-30.5-148.6 130.2-31.8 171.8-89 11.1-205.8z\" class=\"st0\"></path><path id=\"Fill-34\" d=\"M-124.7 29.3 67.2-22.1 48.9-90.4-143-39z\" class=\"st0\"></path><path id=\"Fill-35\" d=\"M-45.6 214 35.2 32.5-29.4 3.8l-80.8 181.4z\" class=\"st0\"></path><path id=\"Fill-36\" d=\"M147.4 269.6 57.2 92.7l-63 32.1 90.2 177z\" class=\"st0\"></path><path id=\"Fill-37\" d=\"m311.5 153.2-194.4-41.3-14.7 69.1 194.3 41.3z\" class=\"st0\"></path><path id=\"Fill-38\" d=\"m324.5-47.6-154.4 125 44.5 54.9L369 7.3z\" class=\"st0\"></path><path id=\"Fill-39\" d=\"M172.1 17.9h70.7v-198.7h-70.7z\" class=\"st0\"></path></g>", 1))]);
}
var quickwit_default = { render: render$9 };
var _hoisted_1$8 = {
	xmlns: "http://www.w3.org/2000/svg",
	width: "100",
	height: "100",
	viewBox: "0 0 48 48"
};
function render$8(_ctx, _cache) {
	return openBlock(), createElementBlock("svg", _hoisted_1$8, [..._cache[0] || (_cache[0] = [
		createElementVNode("path", {
			fill: "#0d47a1",
			d: "M42 24.649V11.784C23.741 18.92 17.065 24.368 18.881 41.55c.09.85.596 1.613 1.371 1.973 1.442.668 2.742 1.035 3.748 1.035 5.143 0 18-9.606 18-19.909"
		}, null, -1),
		createElementVNode("path", {
			fill: "#1e88e5",
			d: "M24 4.042c3.461 0 10.416 1.75 14.595 2.895q.587.162 1.094.308C41.078 7.647 42 8.932 42 10.379v2.128c-.413 9.479-3.45 12.236-11.928 19.062-1.113.985-2.258 1.923-3.42 2.874-1.665 1.363-3.365 2.756-5.062 4.362a3.365 3.365 0 0 0 1.141 5.597 10 10 0 0 1-.982-.277c-3.101-1.039-7.286-3.87-10.563-7.63C8.603 20.397 13.667 12.507 24 4.042"
		}, null, -1),
		createElementVNode("path", {
			fill: "#80d8ff",
			d: "M8.409 7.212C12.383 6.1 20.246 4.042 24 4.042q.406 0 .872.032a6.774 6.774 0 0 1 5.146 10.233c-1.314 2.619-3.465 4.677-6.738 7.372-.94.774-2.018 1.628-3.093 2.48a230 230 0 0 0-2.919 2.338c-2.164 1.774-3.486 2.858-4.214 4.219a6.75 6.75 0 0 0-1.095 3.694c0 1.995.863 3.788 2.235 5.028q.066.074.132.143l.035.053a32 32 0 0 1-1.29-1.167C9.214 34.778 6 29.8 6 24.648V10.414c0-1.491.973-2.8 2.409-3.202"
		}, null, -1)
	])]);
}
var kql_default = { render: render$8 };
var _hoisted_1$7 = {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 512 512"
};
function render$7(_ctx, _cache) {
	return openBlock(), createElementBlock("svg", _hoisted_1$7, [createElementVNode("defs", null, [(openBlock(), createBlock(resolveDynamicComponent("style"), null, {
		default: withCtx(() => [..._cache[0] || (_cache[0] = [createTextVNode(".st1{fill:#4285f4}", -1)])]),
		_: 1
	}))]), _cache[1] || (_cache[1] = createStaticVNode("<path d=\"M256 458c-1.9 0-3.8-.3-5.6-1s-45.2-17.1-89.1-49.6c-26.2-19.4-47.1-40.6-62.2-63-19.5-28.8-29.3-59.5-29.3-91.3V86c0-17.6 14.4-32 32-32h308.4c8.5 0 16.6 3.3 22.6 9.4 6 6 9.4 14.1 9.4 22.6v167.1c0 31.8-9.9 62.5-29.4 91.3-15.1 22.4-36.1 43.5-62.2 63-42.6 31.6-86.8 49.1-90.5 50.1-1.4.4-2.8.5-4.1.5M101.8 86v167.1c0 100.4 125.9 159.6 154.2 171.6 28.3-12 154.2-71.2 154.2-171.7V86z\" class=\"st1\"></path><path d=\"M256.1 362.7c-1.9 0-3.7-.3-5.5-1-3.9-1.4-96.2-35.9-96.2-107.6v-83.7c0-17.6 14.4-32 32-32h139.3c8.5 0 16.6 3.3 22.6 9.4s9.4 14.1 9.4 22.6v83.7c0 30.4-17.1 58.9-49.5 82.3-9.6 7-20.4 13.3-31.8 18.9-15.4 7.4-18.1 7.4-20.4 7.4Zm-69.7-192.3v83.7c0 19.9 12 38.7 35.6 55.9 13.2 9.6 26.7 16.2 34 19.4 7.3-3.2 20.8-9.7 34.1-19.4 23.6-17.2 35.6-36 35.6-55.9v-83.7z\" style=\"fill:#fbbc04;\"></path><path d=\"m260.2 457.5-4.1-15.5-5.6-15c1.6-.6 159.8-61.4 159.8-173.9V54c17.7 0 32 14.3 32 32v167.1c0 31.8-9.9 62.6-29.4 91.3-15.1 22.4-36.1 43.5-62.2 63-42.6 31.6-86.8 49.1-90.5 50.1\" style=\"fill:#34a853;\"></path><path d=\"M250.4 457c-2.5-1-45.5-17.4-89-49.6-26.2-19.4-47.1-40.6-62.2-63-19.5-28.8-29.3-59.5-29.3-91.3s7.2-16 16-16 16 7.2 16 16c0 112.6 158.3 173.4 159.9 174h.1l35.5 13.6s-15.8 8.3-29.9 14.1c-2.1.9-4.4 1.8-7.1 2.7-4 1.3-9.8-.5-9.8-.5Z\" class=\"st1\"></path><path d=\"m215.3 344 35.4-12.4c2.6-1 75.1-28.8 75.1-77.5v-83.7H186.5v-32h139.3c8.5 0 16.6 3.3 22.6 9.4s9.4 14.1 9.4 22.6v83.7c0 30.5-17.1 58.9-49.5 82.3-9.6 7-20.3 13.3-31.8 18.9-7.6 3.7-12.2 5.6-15.1 6.5 0 0-1.5.5-2.2.6-.4 0-2 .5-4.9.2-3.2-.4-5.9-1.7-8.4-2.7s-6.1-2.7-9.3-4.2c-10.6-4.9-21.3-11.6-21.3-11.6Z\" style=\"fill:#ea4335;\"></path>", 5))]);
}
var secops_default = { render: render$7 };
var _hoisted_1$6 = {
	xmlns: "http://www.w3.org/2000/svg",
	version: "1.2",
	viewBox: "0 0 1605 1259"
};
function render$6(_ctx, _cache) {
	return openBlock(), createElementBlock("svg", _hoisted_1$6, [(openBlock(), createBlock(resolveDynamicComponent("style"), null, {
		default: withCtx(() => [..._cache[0] || (_cache[0] = [createTextVNode(".s0{fill:#ff3c1a}", -1)])]),
		_: 1
	})), _cache[1] || (_cache[1] = createStaticVNode("<g id=\"图层 1\"><g id=\"&lt;Group&gt;\"><path id=\"&lt;Path&gt;\" d=\"M1525.1 1011.5c-34.6-3.4-95.9-12-172.6 26.7s-106.8 40.3-144.5 36.3c11.1 20.3 33.5 48 104 53s104.2 7.1 67.1 94.9c.9-26.5-5.4-77.8-75.3-68.8-70 9-86.3 72-11.3 103.4-24.4 4.9-76.1 7.9-113-88.8-25.6 11.1-65.1 33.4-136.7-21.8q25 9 55.8 9.6c-63.5-30.3-124.2-86.7-163-140 30.8 23 64.8 45.8 99.2 50.1-40.7-49.5-134.6-148.7-249.6-250.5 73.9 48.3 163.1 124.5 309.1 107.4 146-17.2 244.1-50.6 430.8 88.5\" class=\"s0\"></path><path d=\"M900.2 977.1c-91.5-39.7-111.1-47.6-228.8-77.5s-233.5-92.2-310.9-189.3c54.6 40 166 120.4 280.5 111.7-17.4-25.5-49.5-45.3-87.8-65.3 43.3 10.4 174.2 43.9 347 220.4M376.3 391.7C73.7 202.6 13.6 56.9 0 .9c190.1 207.9 334.5 289.3 432.8 354.3C634.8 484 677.4 570.6 701 638.3c-96.9-136.8-225.2-178.7-324.7-246.6M413.9 541.6C137 395.2 72.7 278 60.1 224.6c138.6 147.8 292.7 225.6 383 276.1 195.6 104.9 245.5 178.5 270.3 235.8-93.2-113.1-222.8-152.7-299.5-194.9\" class=\"s0\"></path><path id=\"&lt;Compound Path&gt;\" fill-rule=\"evenodd\" d=\"M1310.1 731.2c-25.7 61.1 3.9 67.9 15.9 72.5 60.9 23.3 222 53.2 211.9 121.3 18.8 18.8 88.4 93.7 59.3 145.7-25-40.8-139.9-146.7-278.9-168.5s-265.7 25.2-370.4-44.3c-88.9-64-103.2-88.2-192.7-234.8-40.2-65.8-48-125.7-184.5-237.1S306.5 215.2 252.9 49.3c117.3 144.2 269 281.9 650.3 391 477.6 133.2 441.5 206.5 406.9 290.9M1523 940.3c-.8-26.4 2.8-41.7-69.5-52.7q38.7 19.1 69.5 52.7\" class=\"s0\"></path></g></g>", 1))]);
}
var crowdstrike_default = { render: render$6 };
var _hoisted_1$5 = {
	xmlns: "http://www.w3.org/2000/svg",
	fill: "none",
	viewBox: "0 0 35 32"
};
function render$5(_ctx, _cache) {
	return openBlock(), createElementBlock("svg", _hoisted_1$5, [..._cache[0] || (_cache[0] = [createElementVNode("path", {
		fill: "#fff",
		d: "m34.302 5.063-2.79 5.163a.56.56 0 0 0-.063.354l1.016 7.595a.96.96 0 0 1-.406.92l-5.78 4.039a.6.6 0 0 0-.201.245l-2.84 6.573c-.16.369-.497.63-.895.689l-4.895.714a1.5 1.5 0 0 1-.447 0l-4.895-.714a1.17 1.17 0 0 1-.897-.688L8.37 23.38a.56.56 0 0 0-.2-.246L2.39 19.098a.96.96 0 0 1-.406-.92L3 10.584a.6.6 0 0 0-.063-.353L.139 5.063a1.2 1.2 0 0 1-.137-.621L.135 2.18c.027-.416.268-.785.644-.97L2.37.42a1.45 1.45 0 0 1 1.414.07l3.574 2.237a.58.58 0 0 0 .477.063L16.77.067a1.55 1.55 0 0 1 .9 0l8.935 2.723a.58.58 0 0 0 .476-.063L30.657.49A1.45 1.45 0 0 1 32.07.42l1.589.788c.372.186.617.555.643.97l.134 2.263c.01.216-.033.43-.138.62z"
	}, null, -1)])]);
}
var panther_default = { render: render$5 };
var _hoisted_1$4 = {
	xmlns: "http://www.w3.org/2000/svg",
	fill: "none",
	viewBox: "0 0 142 159"
};
function render$4(_ctx, _cache) {
	return openBlock(), createElementBlock("svg", _hoisted_1$4, [..._cache[0] || (_cache[0] = [createStaticVNode("<path fill=\"#0F80CC\" d=\"M111.632 7.036H12.126C5.456 7.036 0 12.494 0 19.163v109.736c0 6.668 5.457 12.125 12.126 12.125h65.537c-.744-32.609 10.392-95.894 33.969-133.988\"></path><path fill=\"url(#a)\" d=\"M108.016 10.574h-95.89c-4.736 0-8.59 3.852-8.59 8.589v101.73c21.718-8.335 54.313-15.527 76.85-15.201 4.53-23.68 17.84-70.09 27.63-95.118\"></path><path fill=\"#003B57\" d=\"M134.842 3.445c-6.815-6.078-15.067-3.636-23.21 3.591a58 58 0 0 0-3.615 3.538c-13.932 14.779-26.863 42.153-30.88 63.06 1.564 3.174 2.787 7.224 3.592 10.317.206.794.392 1.539.541 2.173.354 1.5.544 2.472.544 2.472s-.125-.472-.637-1.959c-.098-.284-.207-.596-.336-.962a11 11 0 0 0-.215-.531c-.908-2.113-3.422-6.571-4.528-8.513a213 213 0 0 0-2.483 7.765c3.194 5.844 5.14 15.858 5.14 15.858s-.168-.649-.971-2.914c-.713-2.004-4.261-8.221-5.102-9.675-1.438 5.309-2.01 8.893-1.494 9.765 1 1.691 1.953 4.609 2.79 7.835 1.89 7.269 3.204 16.117 3.204 16.117s.042.587.113 1.489a148 148 0 0 0 .368 18.153c.626 7.572 1.805 14.077 3.307 17.558l1.02-.556c-2.206-6.859-3.102-15.847-2.71-26.214.594-15.845 4.24-34.953 10.978-54.87 11.382-30.064 27.175-54.187 41.629-65.707-13.174 11.898-31.004 50.409-36.342 64.67-5.976 15.97-10.211 30.956-12.764 45.315 4.404-13.461 18.643-19.247 18.643-19.247s6.984-8.613 15.145-20.918c-4.889 1.115-12.916 3.024-15.605 4.154-3.966 1.663-5.035 2.231-5.035 2.231s12.847-7.824 23.87-11.366c15.159-23.875 31.674-57.793 15.043-72.629\"></path><defs><linearGradient id=\"a\" x1=\"63.781\" x2=\"63.781\" y1=\"12.831\" y2=\"114.758\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#97D9F6\"></stop><stop offset=\".92\" stop-color=\"#0F80CC\"></stop><stop offset=\"1\" stop-color=\"#0F80CC\"></stop></linearGradient></defs>", 4)])]);
}
var sqlite_default = { render: render$4 };
var _hoisted_1$3 = {
	xmlns: "http://www.w3.org/2000/svg",
	fill: "none",
	viewBox: "0 0 64 64"
};
function render$3(_ctx, _cache) {
	return openBlock(), createElementBlock("svg", _hoisted_1$3, [..._cache[0] || (_cache[0] = [
		createElementVNode("path", {
			fill: "#00A3E0",
			d: "M61.737 23.5a2.263 2.263 0 0 0-2.262 2.263c0 18.618-15.094 33.712-33.712 33.712a2.263 2.263 0 1 0 0 4.525C46.88 64 64 46.88 64 25.763a2.263 2.263 0 0 0-2.263-2.263"
		}, null, -1),
		createElementVNode("path", {
			fill: "#B9D9EB",
			d: "M48.081 38c2.176-3.55 4.28-8.282 3.866-14.908C51.09 9.367 38.66-1.045 26.922.084c-4.596.441-9.314 4.187-8.895 10.897.182 2.915 1.61 4.636 3.928 5.959 2.208 1.26 5.044 2.057 8.259 2.961 3.883 1.092 8.388 2.32 11.85 4.87 4.15 3.058 6.986 6.603 6.018 13.229"
		}, null, -1),
		createElementVNode("path", {
			fill: "#00A3E0",
			d: "M3.919 14C1.743 17.55-.361 22.282.052 28.908.91 42.633 13.342 53.045 25.08 51.916c4.596-.441 9.314-4.187 8.895-10.896-.182-2.916-1.61-4.637-3.928-5.96-2.208-1.26-5.044-2.057-8.259-2.961-3.883-1.092-8.388-2.32-11.85-4.87C5.787 24.17 2.95 20.625 3.919 14"
		}, null, -1)
	])]);
}
const supportedSiems = [
	{
		id: "splunk",
		name: "Splunk",
		icon: splunk_default$1,
		company: "Splunk",
		colorClass: "text-[#74B036]!",
		backend: "pysigma-backend-splunk",
		correlation: true
	},
	{
		id: "esql",
		name: "ES | QL",
		icon: elasticsearch_default$1,
		company: "Elasticsearch",
		colorClass: "text-[#23BBB1]!",
		backend: "pysigma-backend-elasticsearch",
		correlation: true
	},
	{
		id: "lucene",
		name: "Lucene",
		icon: elasticsearch_default$1,
		company: "Elasticsearch",
		colorClass: "text-[#23BBB1]!",
		backend: "pysigma-backend-elasticsearch"
	},
	{
		id: "eql",
		name: "EQL",
		icon: elasticsearch_default$1,
		company: "Elasticsearch",
		colorClass: "text-[#23BBB1]!",
		backend: "pysigma-backend-elasticsearch"
	},
	{
		id: "loki",
		name: "Loki",
		icon: grafana_default$1,
		company: "Grafana",
		colorClass: "text-[#F49D2A]!",
		backend: "pysigma-backend-loki",
		correlation: true
	},
	{
		id: "carbon_black",
		name: "Carbon Black",
		icon: null,
		backend: "pysigma-backend-carbonblack"
	},
	{
		id: "log_scale",
		name: "CrowdStrike Logscale",
		icon: crowdstrike_default,
		backend: "pysigma-backend-crowdstrike"
	},
	{
		id: "opensearch_lucene",
		name: "OpenSearch",
		icon: { render: render$3 },
		backend: "pysigma-backend-opensearch"
	},
	{
		id: "datadog",
		name: "DataDog",
		icon: null,
		backend: "pysigma-backend-datadog"
	},
	{
		id: "kusto",
		name: "KQL (Kusto)",
		icon: kql_default,
		backend: "pysigma-backend-kusto"
	},
	{
		id: "net_witness",
		name: "NetWitness",
		icon: null,
		backend: "pysigma-backend-netwitness"
	},
	{
		id: "panther",
		name: "Panther",
		icon: panther_default,
		backend: "pysigma-backend-panther"
	},
	{
		id: "quickwit",
		name: "QuickWit",
		icon: quickwit_default,
		backend: "pysigma-backend-quickwit"
	},
	{
		id: "secops",
		name: "Google SecOps",
		icon: secops_default,
		backend: "pysigma-backend-secops"
	},
	{
		id: "sentinel_one",
		name: "Sentinel One",
		icon: null,
		backend: "pysigma-backend-sentinelone"
	},
	{
		id: "sqlite",
		name: "SQLite",
		icon: sqlite_default,
		backend: "pysigma-backend-sqlite"
	},
	{
		id: "surreal_ql",
		name: "SurrealQL",
		icon: null,
		backend: "pysigma-backend-surrealql"
	},
	{
		id: "uberagent",
		name: "uberAgent",
		icon: null,
		backend: "pysigma-backend-uberagent"
	}
];
const SIGMA_TARGETS = new Map(supportedSiems.map((siem) => [siem.id, {
	id: siem.id,
	title: siem.name,
	backend: siem.backend
}]));
var worker;
var promiseWorker;
var statusListeners = [];
function getWorker() {
	if (!promiseWorker) {
		if (typeof window !== "undefined" && typeof Worker !== "undefined") {
			worker = new Worker(new URL("./webWorker.ts", import.meta.url), { type: "module" });
			promiseWorker = new PromiseWorker(worker);
			worker.addEventListener("message", (event) => {
				const data = event.data;
				if (data && data.type === "status_update") notifyStatusListeners(data.status);
			});
		}
	}
	return promiseWorker;
}
function addStatusListener(listener) {
	statusListeners.push(listener);
	getWorkerStatus().then((status) => {
		listener(status);
	}).catch((error) => {
		console.error("Error fetching initial worker status:", error);
	});
	return () => {
		const index = statusListeners.indexOf(listener);
		if (index !== -1) statusListeners.splice(index, 1);
	};
}
function notifyStatusListeners(status) {
	statusListeners.forEach((listener) => listener(status));
}
function convert(conversionParams) {
	return getWorker().postMessage({
		type: "convert",
		conversionParams
	});
}
function installBackend(target) {
	return getWorker().postMessage({
		type: "install",
		target
	});
}
function getWorkerStatus() {
	return getWorker().postMessage({ type: "status" });
}
function getAvailablePipelines(target) {
	return getWorker().postMessage({
		type: "get_pipelines",
		target
	});
}
var SigmaConverter = class {
	readinessListeners = [];
	statusListeners = [];
	currentStatus = {
		ready: false,
		pyodideReady: false,
		installedBackends: []
	};
	cleanupListener = null;
	constructor() {
		this.cleanupListener = addStatusListener(this.handleStatusUpdate.bind(this));
		this.refreshStatus();
	}
	handleStatusUpdate(status) {
		this.currentStatus = status;
		this.statusListeners.forEach((listener) => listener(status));
		this.readinessListeners.forEach((listener) => listener(status.ready));
	}
	async refreshStatus() {
		try {
			const status = await getWorkerStatus();
			this.handleStatusUpdate(status);
		} catch (error) {
			console.error("Error refreshing worker status:", error);
		}
	}
	addStatusListener(listener) {
		this.statusListeners.push(listener);
		listener(this.currentStatus);
		return () => {
			const index = this.statusListeners.indexOf(listener);
			if (index !== -1) this.statusListeners.splice(index, 1);
		};
	}
	addReadinessListener(listener) {
		this.readinessListeners.push(listener);
		listener(this.currentStatus.ready);
		return () => {
			const index = this.readinessListeners.indexOf(listener);
			if (index !== -1) this.readinessListeners.splice(index, 1);
		};
	}
	async convert(rule, target, pipeline = [], pipelineYmls = [], filterYml = "", format = "", correlationMethod = "", backendOptions = {}) {
		if (typeof Worker === "undefined") return {
			query: "",
			error: "Conversion not available during server-side rendering"
		};
		if (!SIGMA_TARGETS.has(target)) return {
			query: "",
			error: `Unsupported target: ${target}`
		};
		try {
			if (!this.currentStatus.installedBackends.includes(target)) {
				const installResult = await installBackend(target);
				if (!installResult.success && installResult.error) return {
					query: "",
					error: `Failed to install backend: ${installResult.error}`
				};
			}
			const params = {
				rule,
				target,
				pipelines: pipeline,
				pipelineYmls,
				filterYml,
				format,
				correlationMethod,
				backendOptions
			};
			const result = await convert(JSON.parse(JSON.stringify(params)));
			if (result.error) return {
				query: "",
				error: result.error
			};
			return {
				query: result.result || "",
				error: void 0
			};
		} catch (e) {
			console.error("Error during Pyodide Sigma conversion:", e);
			return {
				query: "",
				error: e instanceof Error ? e.message : String(e)
			};
		}
	}
	isReady() {
		return this.currentStatus.ready;
	}
	getStatus() {
		return { ...this.currentStatus };
	}
	dispose() {
		if (this.cleanupListener) {
			this.cleanupListener();
			this.cleanupListener = null;
		}
		this.readinessListeners = [];
		this.statusListeners = [];
	}
};
function createSigmaStore(id) {
	return defineStore(id + "-sigma", () => {
		const workspace = useWorkspaceStore();
		const fs = computed(() => workspace.currentWorkspace.fileStore());
		const active_sigma_rule_file_id = ref("");
		const file_content = computed(() => fs.value?.getFile(active_sigma_rule_file_id.value)?.content);
		watch(fs.value?.getActiveFile ?? fs.value?.files.find((f) => ["sigma", "correlation"].includes(f.type ?? "")), () => {
			let file = computed(() => fs.value?.getActiveFile())?.value;
			if (file) {
				if (["sigma", "correlation"].includes(file?.type ?? "")) active_sigma_rule_file_id.value = file.id;
			}
		});
		const selected_siem = ref("splunk");
		const siem_conversion_error = ref("");
		const sigmaConverter = ref(new SigmaConverter());
		const isReady = ref(false);
		const removeReadinessListener = sigmaConverter.value.addReadinessListener((ready) => {
			isReady.value = ready;
		});
		onUnmounted(() => {
			removeReadinessListener();
			sigmaConverter.value.dispose();
		});
		const selected_pipelines = ref([]);
		function updateSelectedPipelines(pipelines) {
			selected_pipelines.value = pipelines;
		}
		const siem_query = computedAsync(async () => {
			if (typeof Worker === "undefined") return "";
			if (!file_content.value) return "";
			const pipelineYmls = fs.value?.files.filter((f) => f.type === "pipeline").map((f) => f.content) || [];
			const filterYml = fs.value?.files.filter((f) => f.type === "filter").map((f) => f.content).join("\n---\n");
			return await convert$1(file_content.value || "", selected_siem.value, selected_pipelines.value, pipelineYmls, filterYml) ?? "";
		}, "");
		async function convert$1(rule, target, pipeline, pipelineYmls, filterYml) {
			try {
				const result = await sigmaConverter.value.convert(rule, target, pipeline, pipelineYmls, filterYml);
				if (result.error) {
					siem_conversion_error.value = result.error;
					return siem_query.value;
				}
				siem_conversion_error.value = "";
				return result.query;
			} catch (e) {
				console.error("Error in convert function:", e);
				siem_conversion_error.value = e instanceof Error ? e.message : String(e);
				return "";
			}
		}
		return {
			convert: convert$1,
			siem_query,
			siem_conversion_error,
			selected_siem,
			active_sigma_rule_file_id,
			selected_pipelines,
			updateSelectedPipelines,
			isReady
		};
	}, { persist: true });
}
function createFileStore(id) {
	return defineStore(id + "-file", () => {
		const files = ref([]);
		const openFiles = ref([]);
		const currentlyOpenFileId = ref(null);
		const fileBeingEdited = ref(null);
		const editingFileName = ref("");
		function getFile(id$1 = currentlyOpenFileId.value) {
			return files.value.find((f) => f.id === id$1);
		}
		function addFile(file) {
			const id$1 = Math.random().toString(36).substring(2, 9);
			files.value.push({
				...file,
				id: id$1
			});
			openFile(id$1);
			sortFiles();
			return id$1;
		}
		function updateFile(id$1, content) {
			const file = files.value.find((f) => f.id === id$1);
			if (file) {
				file.content = content;
				if (file.active) setActiveFile(id$1);
			}
		}
		function deleteFile(id$1) {
			const index = files.value.findIndex((f) => f.id === id$1);
			if (index !== -1) {
				closeFile(id$1);
				files.value.splice(index, 1);
				sortFiles();
				if (currentlyOpenFileId.value === id$1) currentlyOpenFileId.value = openFiles.value[0] || null;
			}
		}
		function duplicateFile(id$1) {
			const file = files.value.find((f) => f.id === id$1);
			if (file) return addFile({
				name: `${file.name} (copy)`,
				content: file.content,
				type: file.type
			});
		}
		function startRename(id$1) {
			if (id$1 === null) {
				fileBeingEdited.value = null;
				editingFileName.value = "";
				return;
			}
			const file = files.value.find((f) => f.id === id$1);
			if (file) {
				fileBeingEdited.value = id$1;
				editingFileName.value = file.name;
			}
		}
		function saveRename() {
			if (fileBeingEdited.value && editingFileName.value.trim()) {
				const file = files.value.find((f) => f.id === fileBeingEdited.value);
				if (file) {
					file.name = editingFileName.value.trim().replace(/\.yml$/, "").replace(/\.yaml$/, "").replace(/\s+/g, "_");
					sortFiles();
				}
			}
			fileBeingEdited.value = null;
			editingFileName.value = "";
		}
		function cancelRename() {
			fileBeingEdited.value = null;
			editingFileName.value = "";
		}
		function openFile(id$1) {
			if (!openFiles.value.includes(id$1)) openFiles.value.push(id$1);
			setActiveFile(id$1);
		}
		function closeFile(id$1) {
			const index = openFiles.value.indexOf(id$1);
			if (index !== -1) {
				openFiles.value.splice(index, 1);
				if (currentlyOpenFileId.value === id$1) currentlyOpenFileId.value = openFiles.value[openFiles.value.length - 1] || null;
			}
		}
		function closeAllOpenFiles() {
			openFiles.value = [];
			currentlyOpenFileId.value = null;
		}
		function setActiveFile(id$1) {
			currentlyOpenFileId.value = id$1;
			files.value = files.value.map((f) => ({
				...f,
				active: f.id === id$1
			}));
		}
		const sortFiles = () => {
			files.value.sort((a, b) => a.name.localeCompare(b.name));
		};
		function getActiveFile() {
			return files.value.find((f) => f.id === currentlyOpenFileId.value);
		}
		return {
			files,
			openFiles,
			currentlyOpenFileId,
			fileBeingEdited,
			editingFileName,
			getFile,
			addFile,
			updateFile,
			deleteFile,
			duplicateFile,
			startRename,
			saveRename,
			cancelRename,
			openFile,
			closeFile,
			closeAllOpenFiles,
			getActiveFile
		};
	}, {
		undo: { omit: [
			"currentlyOpenFileId",
			"fileBeingEdited",
			"editingFileName",
			"openFiles"
		] },
		persist: true
	});
}
function createDataStore(id) {
	return defineStore(id + "-data", () => {
		const current_data_frame = ref(null);
		function setCurrentDataFrame(data_frame) {
			current_data_frame.value = data_frame;
		}
		function clearCurrentDataFrame() {
			current_data_frame.value = null;
		}
		return {
			current_data_frame,
			setCurrentDataFrame,
			clearCurrentDataFrame
		};
	}, { persist: true });
}
const useWorkspaceSharingStore = defineStore("workspaceSharing", () => {
	function serializeWorkspace(workspace) {
		const sigmaState = workspace.sigmaStore()?.$state;
		const fileState = workspace.fileStore()?.$state;
		const dataState = workspace.dataStore()?.$state;
		return {
			id: workspace.id,
			name: workspace.name,
			plan: workspace.plan,
			sigmaState,
			fileState,
			dataState
		};
	}
	function deserializeWorkspace(serialized) {
		const newId = Math.random().toString(36).substring(7);
		const sigmaStore = createSigmaStore(newId);
		const fileStore = createFileStore(newId);
		const dataStore = createDataStore(newId);
		if (serialized.fileState) fileStore().$state = serialized.fileState;
		if (serialized.sigmaState) sigmaStore().$state = serialized.sigmaState;
		if (serialized.dataState) dataStore().$state = serialized.dataState;
		return {
			id: newId,
			name: `${serialized.name} (Imported)`,
			plan: serialized.plan,
			sigmaStore,
			fileStore,
			dataStore
		};
	}
	function generateShareableUrl(workspace) {
		const shareData = {
			workspace: serializeWorkspace(workspace),
			timestamp: Date.now(),
			version: "1.0"
		};
		const base64url = btoa(JSON.stringify(shareData)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
		return `${window.location.origin}/#${base64url}`;
	}
	function reconstructFromUrl(shareParam) {
		const base64 = shareParam.replace(/-/g, "+").replace(/_/g, "/");
		const padding = base64.length % 4;
		const paddedBase64 = padding ? base64 + "=".repeat(4 - padding) : base64;
		const shareData = JSON.parse(atob(paddedBase64));
		if (shareData.version !== "1.0") console.warn("Workspace share version mismatch");
		return deserializeWorkspace(shareData.workspace);
	}
	return {
		generateShareableUrl,
		reconstructFromUrl,
		serializeWorkspace,
		deserializeWorkspace
	};
});
const useWorkspaceStore = defineStore("workspace", () => {
	const sidebarOpen = ref(true);
	const availableWorkspaces = ref([]);
	const currentWorkspaceID = ref("default");
	const shareStore = useWorkspaceSharingStore();
	function loadWorkspaceFromHash() {
		const hash = window.location.hash.slice(1);
		if (!hash) return;
		const workspace = shareStore.reconstructFromUrl(hash);
		if (workspace) {
			if (availableWorkspaces.value.some((w) => w.name.replace(" (Imported)", "") === workspace.name.replace(" (Imported)", ""))) {
				const baseNameMatch = workspace.name.match(/(.*?)( \(\d+\))?( \(Imported\))?$/);
				const baseName = baseNameMatch ? baseNameMatch[1] : workspace.name;
				let counter = 1;
				let newName = `${baseName} (${counter})`;
				while (availableWorkspaces.value.some((w) => w.name.replace(" (Imported)", "") === newName)) {
					counter++;
					newName = `${baseName} (${counter})`;
				}
				workspace.name = `${newName} (Imported)`;
			}
			availableWorkspaces.value.push(workspace);
			setCurrentWorkspace(workspace);
			removeHash();
		}
	}
	function removeHash() {
		var scrollV, scrollH, loc = window.location;
		if ("pushState" in history) history.pushState("", document.title, loc.pathname + loc.search);
		else {
			scrollV = document.body.scrollTop;
			scrollH = document.body.scrollLeft;
			loc.hash = "";
			document.body.scrollTop = scrollV;
			document.body.scrollLeft = scrollH;
		}
	}
	onMounted(() => loadWorkspaceFromHash());
	function initializeDefaultWorkspaces() {
		const id = Math.random().toString(36).substring(7);
		availableWorkspaces.value = [{
			id,
			name: "Default",
			plan: "free",
			fileStore: createFileStore(id),
			sigmaStore: createSigmaStore(id),
			dataStore: createDataStore(id)
		}];
		setCurrentWorkspace(availableWorkspaces.value[0]);
	}
	onMounted(() => {
		if (availableWorkspaces.value.length === 0) initializeDefaultWorkspaces();
	});
	function setCurrentWorkspace(workspace) {
		currentWorkspaceID.value = workspace.id;
	}
	function newWorkspace(name, plan) {
		const id = Math.random().toString(36).substring(7);
		const newWorkspace$1 = {
			id,
			name,
			plan,
			fileStore: createFileStore(id),
			sigmaStore: createSigmaStore(id),
			dataStore: createDataStore(id)
		};
		availableWorkspaces.value.push(newWorkspace$1);
		setCurrentWorkspace(newWorkspace$1);
		return newWorkspace$1;
	}
	const currentWorkspace = computed(() => availableWorkspaces.value.find((w) => w.id === currentWorkspaceID.value) ?? availableWorkspaces.value[0] ?? newWorkspace("Default", "free"));
	function deleteWorkspace(workspaceId) {
		if (availableWorkspaces.value.length <= 1) return false;
		availableWorkspaces.value = availableWorkspaces.value.filter((w) => w.id !== workspaceId);
		if (currentWorkspaceID.value === workspaceId && availableWorkspaces.value.length > 0) setCurrentWorkspace(availableWorkspaces.value[0]);
		return true;
	}
	function renameWorkspace(workspaceId, newName) {
		const workspace = availableWorkspaces.value.find((w) => w.id === workspaceId);
		if (workspace) {
			workspace.name = newName;
			return true;
		}
		return false;
	}
	return {
		sidebarOpen,
		currentWorkspaceID,
		availableWorkspaces,
		setCurrentWorkspace,
		newWorkspace,
		currentWorkspace,
		deleteWorkspace,
		renameWorkspace
	};
}, { persist: { serializer: {
	serialize: (state) => {
		return JSON.stringify({
			...state,
			availableWorkspaces: state.availableWorkspaces
		});
	},
	deserialize: (state) => {
		const parsed = JSON.parse(state);
		const reconstructedWorkspaces = parsed.availableWorkspaces.map((w) => ({
			...w,
			sigmaStore: createSigmaStore(w.id),
			fileStore: createFileStore(w.id),
			dataStore: createDataStore(w.id)
		}));
		return {
			...parsed,
			availableWorkspaces: reconstructedWorkspaces
		};
	}
} } });
var DropdownMenu_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenu",
	__ssrInlineRender: true,
	props: {
		defaultOpen: { type: Boolean },
		open: { type: Boolean },
		dir: {},
		modal: { type: Boolean }
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DropdownMenuRoot), mergeProps(unref(forwarded), _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$29 = DropdownMenu_vue_vue_type_script_setup_true_lang_default.setup;
DropdownMenu_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dropdown-menu/DropdownMenu.vue");
	return _sfc_setup$29 ? _sfc_setup$29(props, ctx) : void 0;
};
var DropdownMenu_default = DropdownMenu_vue_vue_type_script_setup_true_lang_default;
var DropdownMenuCheckboxItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuCheckboxItem",
	__ssrInlineRender: true,
	props: {
		modelValue: { type: [Boolean, String] },
		disabled: { type: Boolean },
		textValue: {},
		asChild: { type: Boolean },
		as: {},
		class: {}
	},
	emits: ["select", "update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DropdownMenuCheckboxItem), mergeProps(unref(forwarded), { class: unref(cn)("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(`<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center"${_scopeId}>`);
						_push$1(ssrRenderComponent(unref(DropdownMenuItemIndicator), null, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) _push$2(ssrRenderComponent(unref(Check), { class: "w-4 h-4" }, null, _parent$2, _scopeId$1));
								else return [createVNode(unref(Check), { class: "w-4 h-4" })];
							}),
							_: 1
						}, _parent$1, _scopeId));
						_push$1(`</span>`);
						ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					} else return [createVNode("span", { class: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center" }, [createVNode(unref(DropdownMenuItemIndicator), null, {
						default: withCtx(() => [createVNode(unref(Check), { class: "w-4 h-4" })]),
						_: 1
					})]), renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$28 = DropdownMenuCheckboxItem_vue_vue_type_script_setup_true_lang_default.setup;
DropdownMenuCheckboxItem_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dropdown-menu/DropdownMenuCheckboxItem.vue");
	return _sfc_setup$28 ? _sfc_setup$28(props, ctx) : void 0;
};
var DropdownMenuContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuContent",
	__ssrInlineRender: true,
	props: {
		forceMount: { type: Boolean },
		loop: { type: Boolean },
		side: {},
		sideOffset: { default: 4 },
		sideFlip: { type: Boolean },
		align: {},
		alignOffset: {},
		alignFlip: { type: Boolean },
		avoidCollisions: { type: Boolean },
		collisionBoundary: {},
		collisionPadding: {},
		arrowPadding: {},
		sticky: {},
		hideWhenDetached: { type: Boolean },
		positionStrategy: {},
		updatePositionStrategy: {},
		disableUpdateOnLayoutShift: { type: Boolean },
		prioritizePosition: { type: Boolean },
		reference: {},
		asChild: { type: Boolean },
		as: {},
		class: {}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DropdownMenuPortal), _attrs, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(ssrRenderComponent(unref(DropdownMenuContent), mergeProps(unref(forwarded), { class: unref(cn)("z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", props.class) }), {
						default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
							if (_push$2) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$2, _parent$2, _scopeId$1);
							else return [renderSlot(_ctx.$slots, "default")];
						}),
						_: 3
					}, _parent$1, _scopeId));
					else return [createVNode(unref(DropdownMenuContent), mergeProps(unref(forwarded), { class: unref(cn)("z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", props.class) }), {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
						_: 3
					}, 16, ["class"])];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$27 = DropdownMenuContent_vue_vue_type_script_setup_true_lang_default.setup;
DropdownMenuContent_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dropdown-menu/DropdownMenuContent.vue");
	return _sfc_setup$27 ? _sfc_setup$27(props, ctx) : void 0;
};
var DropdownMenuContent_default = DropdownMenuContent_vue_vue_type_script_setup_true_lang_default;
var DropdownMenuGroup_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuGroup",
	__ssrInlineRender: true,
	props: {
		asChild: { type: Boolean },
		as: {}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DropdownMenuGroup), mergeProps(props, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$26 = DropdownMenuGroup_vue_vue_type_script_setup_true_lang_default.setup;
DropdownMenuGroup_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dropdown-menu/DropdownMenuGroup.vue");
	return _sfc_setup$26 ? _sfc_setup$26(props, ctx) : void 0;
};
var DropdownMenuGroup_default = DropdownMenuGroup_vue_vue_type_script_setup_true_lang_default;
var DropdownMenuItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuItem",
	__ssrInlineRender: true,
	props: {
		disabled: { type: Boolean },
		textValue: {},
		asChild: { type: Boolean },
		as: {},
		class: {},
		inset: { type: Boolean }
	},
	setup(__props) {
		const props = __props;
		const forwardedProps = useForwardProps(reactiveOmit(props, "class"));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DropdownMenuItem), mergeProps(unref(forwardedProps), { class: unref(cn)("relative flex cursor-default select-none items-center rounded-sm gap-2 px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", __props.inset && "pl-8", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$25 = DropdownMenuItem_vue_vue_type_script_setup_true_lang_default.setup;
DropdownMenuItem_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dropdown-menu/DropdownMenuItem.vue");
	return _sfc_setup$25 ? _sfc_setup$25(props, ctx) : void 0;
};
var DropdownMenuItem_default = DropdownMenuItem_vue_vue_type_script_setup_true_lang_default;
var DropdownMenuLabel_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuLabel",
	__ssrInlineRender: true,
	props: {
		asChild: { type: Boolean },
		as: {},
		class: {},
		inset: { type: Boolean }
	},
	setup(__props) {
		const props = __props;
		const forwardedProps = useForwardProps(reactiveOmit(props, "class"));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DropdownMenuLabel), mergeProps(unref(forwardedProps), { class: unref(cn)("px-2 py-1.5 text-sm font-semibold", __props.inset && "pl-8", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$24 = DropdownMenuLabel_vue_vue_type_script_setup_true_lang_default.setup;
DropdownMenuLabel_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dropdown-menu/DropdownMenuLabel.vue");
	return _sfc_setup$24 ? _sfc_setup$24(props, ctx) : void 0;
};
var DropdownMenuLabel_default = DropdownMenuLabel_vue_vue_type_script_setup_true_lang_default;
var DropdownMenuRadioGroup_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuRadioGroup",
	__ssrInlineRender: true,
	props: {
		modelValue: {},
		asChild: { type: Boolean },
		as: {}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DropdownMenuRadioGroup), mergeProps(unref(forwarded), _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$23 = DropdownMenuRadioGroup_vue_vue_type_script_setup_true_lang_default.setup;
DropdownMenuRadioGroup_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dropdown-menu/DropdownMenuRadioGroup.vue");
	return _sfc_setup$23 ? _sfc_setup$23(props, ctx) : void 0;
};
var DropdownMenuRadioItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuRadioItem",
	__ssrInlineRender: true,
	props: {
		value: {},
		disabled: { type: Boolean },
		textValue: {},
		asChild: { type: Boolean },
		as: {},
		class: {}
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DropdownMenuRadioItem), mergeProps(unref(forwarded), { class: unref(cn)("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(`<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center"${_scopeId}>`);
						_push$1(ssrRenderComponent(unref(DropdownMenuItemIndicator), null, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) _push$2(ssrRenderComponent(unref(Circle), { class: "h-4 w-4 fill-current" }, null, _parent$2, _scopeId$1));
								else return [createVNode(unref(Circle), { class: "h-4 w-4 fill-current" })];
							}),
							_: 1
						}, _parent$1, _scopeId));
						_push$1(`</span>`);
						ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					} else return [createVNode("span", { class: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center" }, [createVNode(unref(DropdownMenuItemIndicator), null, {
						default: withCtx(() => [createVNode(unref(Circle), { class: "h-4 w-4 fill-current" })]),
						_: 1
					})]), renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$22 = DropdownMenuRadioItem_vue_vue_type_script_setup_true_lang_default.setup;
DropdownMenuRadioItem_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dropdown-menu/DropdownMenuRadioItem.vue");
	return _sfc_setup$22 ? _sfc_setup$22(props, ctx) : void 0;
};
var DropdownMenuSeparator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuSeparator",
	__ssrInlineRender: true,
	props: {
		asChild: { type: Boolean },
		as: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		const delegatedProps = reactiveOmit(props, "class");
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DropdownMenuSeparator), mergeProps(unref(delegatedProps), { class: unref(cn)("-mx-1 my-1 h-px bg-muted", props.class) }, _attrs), null, _parent));
		};
	}
});
var _sfc_setup$21 = DropdownMenuSeparator_vue_vue_type_script_setup_true_lang_default.setup;
DropdownMenuSeparator_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dropdown-menu/DropdownMenuSeparator.vue");
	return _sfc_setup$21 ? _sfc_setup$21(props, ctx) : void 0;
};
var DropdownMenuSeparator_default = DropdownMenuSeparator_vue_vue_type_script_setup_true_lang_default;
var DropdownMenuShortcut_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuShortcut",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<span${ssrRenderAttrs(mergeProps({ class: unref(cn)("ml-auto text-xs tracking-widest opacity-60", props.class) }, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</span>`);
		};
	}
});
var _sfc_setup$20 = DropdownMenuShortcut_vue_vue_type_script_setup_true_lang_default.setup;
DropdownMenuShortcut_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dropdown-menu/DropdownMenuShortcut.vue");
	return _sfc_setup$20 ? _sfc_setup$20(props, ctx) : void 0;
};
var DropdownMenuSub_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuSub",
	__ssrInlineRender: true,
	props: {
		defaultOpen: { type: Boolean },
		open: { type: Boolean }
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DropdownMenuSub), mergeProps(unref(forwarded), _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$19 = DropdownMenuSub_vue_vue_type_script_setup_true_lang_default.setup;
DropdownMenuSub_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dropdown-menu/DropdownMenuSub.vue");
	return _sfc_setup$19 ? _sfc_setup$19(props, ctx) : void 0;
};
var DropdownMenuSub_default = DropdownMenuSub_vue_vue_type_script_setup_true_lang_default;
var DropdownMenuSubContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuSubContent",
	__ssrInlineRender: true,
	props: {
		forceMount: { type: Boolean },
		loop: { type: Boolean },
		sideOffset: {},
		sideFlip: { type: Boolean },
		alignOffset: {},
		alignFlip: { type: Boolean },
		avoidCollisions: { type: Boolean },
		collisionBoundary: {},
		collisionPadding: {},
		arrowPadding: {},
		sticky: {},
		hideWhenDetached: { type: Boolean },
		positionStrategy: {},
		updatePositionStrategy: {},
		disableUpdateOnLayoutShift: { type: Boolean },
		prioritizePosition: { type: Boolean },
		reference: {},
		asChild: { type: Boolean },
		as: {},
		class: {}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DropdownMenuSubContent), mergeProps(unref(forwarded), { class: unref(cn)("z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$18 = DropdownMenuSubContent_vue_vue_type_script_setup_true_lang_default.setup;
DropdownMenuSubContent_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dropdown-menu/DropdownMenuSubContent.vue");
	return _sfc_setup$18 ? _sfc_setup$18(props, ctx) : void 0;
};
var DropdownMenuSubContent_default = DropdownMenuSubContent_vue_vue_type_script_setup_true_lang_default;
var DropdownMenuSubTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuSubTrigger",
	__ssrInlineRender: true,
	props: {
		disabled: { type: Boolean },
		textValue: {},
		asChild: { type: Boolean },
		as: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		const forwardedProps = useForwardProps(reactiveOmit(props, "class"));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DropdownMenuSubTrigger), mergeProps(unref(forwardedProps), { class: unref(cn)("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
						_push$1(ssrRenderComponent(unref(ChevronRight), { class: "ml-auto h-4 w-4" }, null, _parent$1, _scopeId));
					} else return [renderSlot(_ctx.$slots, "default"), createVNode(unref(ChevronRight), { class: "ml-auto h-4 w-4" })];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$17 = DropdownMenuSubTrigger_vue_vue_type_script_setup_true_lang_default.setup;
DropdownMenuSubTrigger_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dropdown-menu/DropdownMenuSubTrigger.vue");
	return _sfc_setup$17 ? _sfc_setup$17(props, ctx) : void 0;
};
var DropdownMenuSubTrigger_default = DropdownMenuSubTrigger_vue_vue_type_script_setup_true_lang_default;
var DropdownMenuTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuTrigger",
	__ssrInlineRender: true,
	props: {
		disabled: { type: Boolean },
		asChild: { type: Boolean },
		as: {}
	},
	setup(__props) {
		const forwardedProps = useForwardProps(__props);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DropdownMenuTrigger), mergeProps({ class: "outline-none" }, unref(forwardedProps), _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$16 = DropdownMenuTrigger_vue_vue_type_script_setup_true_lang_default.setup;
DropdownMenuTrigger_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dropdown-menu/DropdownMenuTrigger.vue");
	return _sfc_setup$16 ? _sfc_setup$16(props, ctx) : void 0;
};
var DropdownMenuTrigger_default = DropdownMenuTrigger_vue_vue_type_script_setup_true_lang_default;
var Dialog_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Dialog",
	__ssrInlineRender: true,
	props: {
		open: { type: Boolean },
		defaultOpen: { type: Boolean },
		modal: { type: Boolean }
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DialogRoot), mergeProps({ "data-slot": "dialog" }, unref(forwarded), _attrs), {
				default: withCtx((slotProps, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", slotProps, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default", slotProps)];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$15 = Dialog_vue_vue_type_script_setup_true_lang_default.setup;
Dialog_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dialog/Dialog.vue");
	return _sfc_setup$15 ? _sfc_setup$15(props, ctx) : void 0;
};
var Dialog_default = Dialog_vue_vue_type_script_setup_true_lang_default;
var DialogClose_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "DialogClose",
	__ssrInlineRender: true,
	props: {
		asChild: { type: Boolean },
		as: {}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DialogClose), mergeProps({ "data-slot": "dialog-close" }, props, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$14 = DialogClose_vue_vue_type_script_setup_true_lang_default.setup;
DialogClose_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dialog/DialogClose.vue");
	return _sfc_setup$14 ? _sfc_setup$14(props, ctx) : void 0;
};
var DialogOverlay_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "DialogOverlay",
	__ssrInlineRender: true,
	props: {
		forceMount: { type: Boolean },
		asChild: { type: Boolean },
		as: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		const delegatedProps = reactiveOmit(props, "class");
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DialogOverlay), mergeProps({ "data-slot": "dialog-overlay" }, unref(delegatedProps), { class: unref(cn)("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$13 = DialogOverlay_vue_vue_type_script_setup_true_lang_default.setup;
DialogOverlay_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dialog/DialogOverlay.vue");
	return _sfc_setup$13 ? _sfc_setup$13(props, ctx) : void 0;
};
var DialogOverlay_default = DialogOverlay_vue_vue_type_script_setup_true_lang_default;
var DialogContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "DialogContent",
	__ssrInlineRender: true,
	props: {
		forceMount: { type: Boolean },
		disableOutsidePointerEvents: { type: Boolean },
		asChild: { type: Boolean },
		as: {},
		class: {},
		showCloseButton: {
			type: Boolean,
			default: true
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DialogPortal), _attrs, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(DialogOverlay_default, null, null, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(DialogContent), mergeProps({ "data-slot": "dialog-content" }, {
							..._ctx.$attrs,
							...unref(forwarded)
						}, { class: unref(cn)("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg", props.class) }), {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) {
									ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$2, _parent$2, _scopeId$1);
									if (__props.showCloseButton) _push$2(ssrRenderComponent(unref(DialogClose), {
										"data-slot": "dialog-close",
										class: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
									}, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) {
												_push$3(ssrRenderComponent(unref(X), null, null, _parent$3, _scopeId$2));
												_push$3(`<span class="sr-only"${_scopeId$2}>Close</span>`);
											} else return [createVNode(unref(X)), createVNode("span", { class: "sr-only" }, "Close")];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									else _push$2(`<!---->`);
								} else return [renderSlot(_ctx.$slots, "default"), __props.showCloseButton ? (openBlock(), createBlock(unref(DialogClose), {
									key: 0,
									"data-slot": "dialog-close",
									class: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
								}, {
									default: withCtx(() => [createVNode(unref(X)), createVNode("span", { class: "sr-only" }, "Close")]),
									_: 1
								})) : createCommentVNode("", true)];
							}),
							_: 3
						}, _parent$1, _scopeId));
					} else return [createVNode(DialogOverlay_default), createVNode(unref(DialogContent), mergeProps({ "data-slot": "dialog-content" }, {
						..._ctx.$attrs,
						...unref(forwarded)
					}, { class: unref(cn)("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg", props.class) }), {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default"), __props.showCloseButton ? (openBlock(), createBlock(unref(DialogClose), {
							key: 0,
							"data-slot": "dialog-close",
							class: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
						}, {
							default: withCtx(() => [createVNode(unref(X)), createVNode("span", { class: "sr-only" }, "Close")]),
							_: 1
						})) : createCommentVNode("", true)]),
						_: 3
					}, 16, ["class"])];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$12 = DialogContent_vue_vue_type_script_setup_true_lang_default.setup;
DialogContent_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dialog/DialogContent.vue");
	return _sfc_setup$12 ? _sfc_setup$12(props, ctx) : void 0;
};
var DialogContent_default = DialogContent_vue_vue_type_script_setup_true_lang_default;
var DialogDescription_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "DialogDescription",
	__ssrInlineRender: true,
	props: {
		asChild: { type: Boolean },
		as: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		const forwardedProps = useForwardProps(reactiveOmit(props, "class"));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DialogDescription), mergeProps({ "data-slot": "dialog-description" }, unref(forwardedProps), { class: unref(cn)("text-muted-foreground text-sm", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$11 = DialogDescription_vue_vue_type_script_setup_true_lang_default.setup;
DialogDescription_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dialog/DialogDescription.vue");
	return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
var DialogDescription_default = DialogDescription_vue_vue_type_script_setup_true_lang_default;
var DialogFooter_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "DialogFooter",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				"data-slot": "dialog-footer",
				class: unref(cn)("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", props.class)
			}, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div>`);
		};
	}
});
var _sfc_setup$10 = DialogFooter_vue_vue_type_script_setup_true_lang_default.setup;
DialogFooter_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dialog/DialogFooter.vue");
	return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
var DialogFooter_default = DialogFooter_vue_vue_type_script_setup_true_lang_default;
var DialogHeader_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "DialogHeader",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				"data-slot": "dialog-header",
				class: unref(cn)("flex flex-col gap-2 text-center sm:text-left", props.class)
			}, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div>`);
		};
	}
});
var _sfc_setup$9 = DialogHeader_vue_vue_type_script_setup_true_lang_default.setup;
DialogHeader_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dialog/DialogHeader.vue");
	return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
var DialogHeader_default = DialogHeader_vue_vue_type_script_setup_true_lang_default;
var DialogScrollContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "DialogScrollContent",
	__ssrInlineRender: true,
	props: {
		forceMount: { type: Boolean },
		disableOutsidePointerEvents: { type: Boolean },
		asChild: { type: Boolean },
		as: {},
		class: {}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DialogPortal), _attrs, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(ssrRenderComponent(unref(DialogOverlay), { class: "fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }, {
						default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
							if (_push$2) _push$2(ssrRenderComponent(unref(DialogContent), mergeProps({ class: unref(cn)("relative z-50 grid w-full max-w-lg my-8 gap-4 border border-border bg-background p-6 shadow-lg duration-200 sm:rounded-lg md:w-full", props.class) }, {
								..._ctx.$attrs,
								...unref(forwarded)
							}, { onPointerDownOutside: (event) => {
								const originalEvent = event.detail.originalEvent;
								const target = originalEvent.target;
								if (originalEvent.offsetX > target.clientWidth || originalEvent.offsetY > target.clientHeight) event.preventDefault();
							} }), {
								default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
									if (_push$3) {
										ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$3, _parent$3, _scopeId$2);
										_push$3(ssrRenderComponent(unref(DialogClose), { class: "absolute top-4 right-4 p-0.5 transition-colors rounded-md hover:bg-secondary" }, {
											default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
												if (_push$4) {
													_push$4(ssrRenderComponent(unref(X), { class: "w-4 h-4" }, null, _parent$4, _scopeId$3));
													_push$4(`<span class="sr-only"${_scopeId$3}>Close</span>`);
												} else return [createVNode(unref(X), { class: "w-4 h-4" }), createVNode("span", { class: "sr-only" }, "Close")];
											}),
											_: 1
										}, _parent$3, _scopeId$2));
									} else return [renderSlot(_ctx.$slots, "default"), createVNode(unref(DialogClose), { class: "absolute top-4 right-4 p-0.5 transition-colors rounded-md hover:bg-secondary" }, {
										default: withCtx(() => [createVNode(unref(X), { class: "w-4 h-4" }), createVNode("span", { class: "sr-only" }, "Close")]),
										_: 1
									})];
								}),
								_: 3
							}, _parent$2, _scopeId$1));
							else return [createVNode(unref(DialogContent), mergeProps({ class: unref(cn)("relative z-50 grid w-full max-w-lg my-8 gap-4 border border-border bg-background p-6 shadow-lg duration-200 sm:rounded-lg md:w-full", props.class) }, {
								..._ctx.$attrs,
								...unref(forwarded)
							}, { onPointerDownOutside: (event) => {
								const originalEvent = event.detail.originalEvent;
								const target = originalEvent.target;
								if (originalEvent.offsetX > target.clientWidth || originalEvent.offsetY > target.clientHeight) event.preventDefault();
							} }), {
								default: withCtx(() => [renderSlot(_ctx.$slots, "default"), createVNode(unref(DialogClose), { class: "absolute top-4 right-4 p-0.5 transition-colors rounded-md hover:bg-secondary" }, {
									default: withCtx(() => [createVNode(unref(X), { class: "w-4 h-4" }), createVNode("span", { class: "sr-only" }, "Close")]),
									_: 1
								})]),
								_: 3
							}, 16, ["class", "onPointerDownOutside"])];
						}),
						_: 3
					}, _parent$1, _scopeId));
					else return [createVNode(unref(DialogOverlay), { class: "fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }, {
						default: withCtx(() => [createVNode(unref(DialogContent), mergeProps({ class: unref(cn)("relative z-50 grid w-full max-w-lg my-8 gap-4 border border-border bg-background p-6 shadow-lg duration-200 sm:rounded-lg md:w-full", props.class) }, {
							..._ctx.$attrs,
							...unref(forwarded)
						}, { onPointerDownOutside: (event) => {
							const originalEvent = event.detail.originalEvent;
							const target = originalEvent.target;
							if (originalEvent.offsetX > target.clientWidth || originalEvent.offsetY > target.clientHeight) event.preventDefault();
						} }), {
							default: withCtx(() => [renderSlot(_ctx.$slots, "default"), createVNode(unref(DialogClose), { class: "absolute top-4 right-4 p-0.5 transition-colors rounded-md hover:bg-secondary" }, {
								default: withCtx(() => [createVNode(unref(X), { class: "w-4 h-4" }), createVNode("span", { class: "sr-only" }, "Close")]),
								_: 1
							})]),
							_: 3
						}, 16, ["class", "onPointerDownOutside"])]),
						_: 3
					})];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$8 = DialogScrollContent_vue_vue_type_script_setup_true_lang_default.setup;
DialogScrollContent_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dialog/DialogScrollContent.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var DialogTitle_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "DialogTitle",
	__ssrInlineRender: true,
	props: {
		asChild: { type: Boolean },
		as: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		const forwardedProps = useForwardProps(reactiveOmit(props, "class"));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DialogTitle), mergeProps({ "data-slot": "dialog-title" }, unref(forwardedProps), { class: unref(cn)("text-lg leading-none font-semibold", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$7 = DialogTitle_vue_vue_type_script_setup_true_lang_default.setup;
DialogTitle_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dialog/DialogTitle.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var DialogTitle_default = DialogTitle_vue_vue_type_script_setup_true_lang_default;
var DialogTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "DialogTrigger",
	__ssrInlineRender: true,
	props: {
		asChild: { type: Boolean },
		as: {}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DialogTrigger), mergeProps({ "data-slot": "dialog-trigger" }, props, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$6 = DialogTrigger_vue_vue_type_script_setup_true_lang_default.setup;
DialogTrigger_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dialog/DialogTrigger.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var DialogTrigger_default = DialogTrigger_vue_vue_type_script_setup_true_lang_default;
var _hoisted_1$2 = {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 500 500"
};
function render$2(_ctx, _cache) {
	return openBlock(), createElementBlock("svg", _hoisted_1$2, [..._cache[0] || (_cache[0] = [createElementVNode("path", {
		fill: "currentColor",
		"fill-rule": "nonzero",
		d: "M418.75 0H81.25C36.377 0 0 36.377 0 81.25v337.5A81.25 81.25 0 0 0 81.25 500h337.5A81.25 81.25 0 0 0 500 418.75V81.25A81.25 81.25 0 0 0 418.75 0M370 276.25c0 1.25 0 2.5-2.5 3.75L133.75 397.5c-1.25 1.25-3.75-1.25-3.75-2.5v-60c0-1.25 0-2.5 1.25-2.5l170-85-170-86.25c-1.25 0-1.25-1.25-1.25-2.5v-60c0-1.25 2.5-3.75 3.75-2.5l233.75 117.5a6.25 6.25 0 0 1 2.5 5z"
	}, null, -1)])]);
}
var splunk_default = { render: render$2 };
var _hoisted_1$1 = {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 500 580"
};
function render$1(_ctx, _cache) {
	return openBlock(), createElementBlock("svg", _hoisted_1$1, [..._cache[0] || (_cache[0] = [createElementVNode("path", {
		fill: "currentColor",
		"fill-rule": "nonzero",
		d: "m118.581 525.69 6.917 46.444-45.455 6.917-7.905-46.442zm72.132-10.868 7.905 45.454-47.43 7.906-5.93-46.443zm72.13-11.86 6.916 47.432-45.454 5.93-7.905-45.456zm-155.136-49.404L114.624 500l-46.443 6.918-6.917-46.444zm72.132-10.87 6.918 46.444-45.455 6.915-7.904-46.442zm72.134-10.869 6.917 45.455-46.443 7.905-6.916-46.443zM20.751 62.253 77.075 431.82l-19.763 2.965L0 65.218zm21.737-31.621 61.265 397.234-19.763 2.964L22.725 34.585zM84.984 0l64.23 420.95-19.764 1.975L65.22 3.952zm31.615 33.595 59.288 383.4-18.775 1.976L97.824 36.56zm52.375 35.576 52.37 339.92-19.762 3.954-52.372-340.91zm24.703-16.798 54.347 352.768-18.773 2.964-55.337-352.767zM493.083 468.38 500 514.822l-203.557 31.621-7.905-47.431zm-11.854-72.133 7.905 45.454-204.545 31.621-5.928-45.455z"
	}, null, -1)])]);
}
var grafana_default = { render: render$1 };
var _hoisted_1 = {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 503 500"
};
function render(_ctx, _cache) {
	return openBlock(), createElementBlock("svg", _hoisted_1, [..._cache[0] || (_cache[0] = [createElementVNode("path", {
		fill: "currentColor",
		"fill-rule": "nonzero",
		d: "m425.539 340.598-82.77-19.402-22.045-41.967 108.34-94.917c32.148 12.132 53.517 42.942 53.517 77.466 0 35.39-23.43 67.68-57.042 78.82m-62.266 97.844c-12.887 0-25.492-4.343-35.814-12.21l16.38-85.304 75.154 17.624c2.376 6.468 3.603 13.36 3.603 20.567 0 32.793-26.561 59.339-59.339 59.339zm-55.153-12.21c-23.037 34.036-61.48 54.429-102.613 54.335-68.528 0-124.248-55.72-124.248-124.17 0-8.435.818-16.727 2.455-24.737l108.025-97.702L302.06 284.2l24.422 46.704zM19.465 238.315c0-35.39 23.352-67.679 56.963-78.82l82.596 19.576 19.434 41.4-105.633 95.484c-32.054-12.21-53.36-43.037-53.36-77.624zm119.229-176.68c13.045 0 25.665 4.265 36.066 12.133l-16.475 85.554-75.327-17.702c-2.376-6.546-3.603-13.454-3.603-20.645 0-32.715 26.64-59.34 59.339-59.34M194.35 73.91C217.53 40.236 255.657 20.08 296.554 20.08c68.277 0 123.824 55.578 123.824 123.918 0 8.371-.74 16.318-2.376 24.343l-110.795 97.12-109.835-50.055-21.463-45.822zm307.663 188.088c0-42.124-26.137-78.914-65.397-93.17 1.81-8.938 2.628-17.955 2.628-26.955C439.245 63.683 375.625 0 297.45 0c-45.744 0-88.183 21.967-114.918 58.851-13.202-10.26-29.41-15.814-46.058-15.735-41.558 0-75.326 33.753-75.326 75.232 0 9.174 1.636 17.938 4.673 26.231C26.798 158.68 0 196.302 0 238.175c0 42.281 26.231 79.166 65.65 93.422-1.716 8.86-2.629 17.86-2.629 26.955 0 78.033 63.51 141.448 141.542 141.448 45.823 0 88.262-21.967 114.823-59.087 13.203 10.4 29.332 16.05 46.137 16.05 41.48 0 75.232-33.674 75.232-75.232 0-9.174-1.636-17.939-4.673-26.231 39.024-14.1 65.9-51.723 65.9-93.517z"
	}, null, -1)])]);
}
var elasticsearch_default = { render };
var WorkspaceSelection_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "WorkspaceSelection",
	__ssrInlineRender: true,
	setup(__props) {
		const workStore = useWorkspaceStore();
		const sigma = computed(() => workStore.currentWorkspace?.sigmaStore());
		computed(() => workStore.currentWorkspace?.fileStore());
		function createWorkspace() {
			workStore.newWorkspace("New Workspace", "Free");
		}
		const isRenameDialogOpen = ref(false);
		const workspaceToRename = ref("");
		const newWorkspaceName = ref("");
		const isDeleteDialogOpen = ref(false);
		const workspaceToDelete = ref("");
		const workspaceNameToDelete = ref("");
		function startRename(workspace) {
			workspaceToRename.value = workspace.id;
			newWorkspaceName.value = workspace.name;
			isRenameDialogOpen.value = true;
		}
		function confirmRename() {
			if (newWorkspaceName.value.trim() && workspaceToRename.value) {
				workStore.renameWorkspace(workspaceToRename.value, newWorkspaceName.value.trim());
				cancelRename();
			}
		}
		function cancelRename() {
			isRenameDialogOpen.value = false;
			workspaceToRename.value = "";
			newWorkspaceName.value = "";
		}
		function startDelete(workspace) {
			workspaceToDelete.value = workspace.id;
			workspaceNameToDelete.value = workspace.name;
			isDeleteDialogOpen.value = true;
		}
		function confirmDelete() {
			if (workspaceToDelete.value) {
				workStore.deleteWorkspace(workspaceToDelete.value);
				cancelDelete();
			}
		}
		function cancelDelete() {
			isDeleteDialogOpen.value = false;
			workspaceToDelete.value = "";
			workspaceNameToDelete.value = "";
		}
		function handleKeydown(e) {
			if (e.key === "Enter") confirmRename();
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(DropdownMenu_default), null, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(unref(DropdownMenuTrigger_default), { "as-child": "" }, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) _push$2(ssrRenderComponent(unref(SidebarMenuButton_default), {
									class: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
									size: "lg"
								}, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) {
											_push$3(`<div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-secondary text-sidebar-primary-foreground border-2 border-primary"${_scopeId$2}>`);
											if (unref(supportedSiems).find((s) => s.id === unref(workStore).currentWorkspace.sigmaStore().selected_siem)?.icon) ssrRenderVNode(_push$3, createVNode(resolveDynamicComponent(unref(supportedSiems).find((s) => s.id === unref(workStore).currentWorkspace.sigmaStore().selected_siem)?.icon), { class: "w-4 h-4 shrink-0" }, null), _parent$3, _scopeId$2);
											else _push$3(ssrRenderComponent(unref(Layers2), { class: "h-4 shrink-0" }, null, _parent$3, _scopeId$2));
											_push$3(`</div><div class="grid text-left text-sm leading-tight"${_scopeId$2}><span class="truncate font-semibold"${_scopeId$2}>${ssrInterpolate(unref(workStore).currentWorkspace?.name)}</span><span class="truncate text-xs"${_scopeId$2}>${ssrInterpolate(unref(supportedSiems).find((s) => s.id === sigma.value.selected_siem)?.name ?? "")}</span></div>`);
											_push$3(ssrRenderComponent(unref(ChevronsUpDown), { class: "ml-auto" }, null, _parent$3, _scopeId$2));
										} else return [
											createVNode("div", { class: "flex aspect-square size-8 items-center justify-center rounded-lg bg-secondary text-sidebar-primary-foreground border-2 border-primary" }, [unref(supportedSiems).find((s) => s.id === unref(workStore).currentWorkspace.sigmaStore().selected_siem)?.icon ? (openBlock(), createBlock(resolveDynamicComponent(unref(supportedSiems).find((s) => s.id === unref(workStore).currentWorkspace.sigmaStore().selected_siem)?.icon), {
												key: 0,
												class: "w-4 h-4 shrink-0"
											})) : (openBlock(), createBlock(unref(Layers2), {
												key: 1,
												class: "h-4 shrink-0"
											}))]),
											createVNode("div", { class: "grid text-left text-sm leading-tight" }, [createVNode("span", { class: "truncate font-semibold" }, toDisplayString(unref(workStore).currentWorkspace?.name), 1), createVNode("span", { class: "truncate text-xs" }, toDisplayString(unref(supportedSiems).find((s) => s.id === sigma.value.selected_siem)?.name ?? ""), 1)]),
											createVNode(unref(ChevronsUpDown), { class: "ml-auto" })
										];
									}),
									_: 1
								}, _parent$2, _scopeId$1));
								else return [createVNode(unref(SidebarMenuButton_default), {
									class: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
									size: "lg"
								}, {
									default: withCtx(() => [
										createVNode("div", { class: "flex aspect-square size-8 items-center justify-center rounded-lg bg-secondary text-sidebar-primary-foreground border-2 border-primary" }, [unref(supportedSiems).find((s) => s.id === unref(workStore).currentWorkspace.sigmaStore().selected_siem)?.icon ? (openBlock(), createBlock(resolveDynamicComponent(unref(supportedSiems).find((s) => s.id === unref(workStore).currentWorkspace.sigmaStore().selected_siem)?.icon), {
											key: 0,
											class: "w-4 h-4 shrink-0"
										})) : (openBlock(), createBlock(unref(Layers2), {
											key: 1,
											class: "h-4 shrink-0"
										}))]),
										createVNode("div", { class: "grid text-left text-sm leading-tight" }, [createVNode("span", { class: "truncate font-semibold" }, toDisplayString(unref(workStore).currentWorkspace?.name), 1), createVNode("span", { class: "truncate text-xs" }, toDisplayString(unref(supportedSiems).find((s) => s.id === sigma.value.selected_siem)?.name ?? ""), 1)]),
										createVNode(unref(ChevronsUpDown), { class: "ml-auto" })
									]),
									_: 1
								})];
							}),
							_: 1
						}, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(DropdownMenuContent_default), {
							"side-offset": 4,
							align: "start",
							class: "w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg",
							side: "bottom"
						}, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) {
									_push$2(ssrRenderComponent(unref(DropdownMenuLabel_default), { class: "text-xs text-muted-foreground" }, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) _push$3(` Workspaces`);
											else return [createTextVNode(" Workspaces")];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(`<!--[-->`);
									ssrRenderList(unref(workStore).availableWorkspaces, (workspace, index) => {
										_push$2(ssrRenderComponent(unref(DropdownMenuItem_default), {
											key: workspace.name,
											class: "gap-2 p-2",
											onClick: ($event) => unref(workStore).setCurrentWorkspace(workspace)
										}, {
											default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
												if (_push$3) {
													_push$3(`<div class="flex w-full items-center justify-between"${_scopeId$2}><div class="flex items-center gap-2 cursor-pointer"${_scopeId$2}><div class="flex size-6 items-center justify-center rounded-sm border"${_scopeId$2}>`);
													if (workspace.sigmaStore().selected_siem === "splunk") ssrRenderVNode(_push$3, createVNode(resolveDynamicComponent(unref(splunk_default)), { class: "w-4 h-4 shrink-0" }, null), _parent$3, _scopeId$2);
													else if (workspace.sigmaStore().selected_siem === "es|ql" || workspace.sigmaStore().selected_siem === "eql" || workspace.sigmaStore().selected_siem === "lucene") ssrRenderVNode(_push$3, createVNode(resolveDynamicComponent(unref(elasticsearch_default)), { class: "w-4 h-4 shrink-0" }, null), _parent$3, _scopeId$2);
													else if (workspace.sigmaStore().selected_siem === "loki") ssrRenderVNode(_push$3, createVNode(resolveDynamicComponent(unref(grafana_default)), { class: "w-4 h-4 shrink-0" }, null), _parent$3, _scopeId$2);
													else _push$3(ssrRenderComponent(unref(Layers2), { class: "h-4 shrink-0" }, null, _parent$3, _scopeId$2));
													_push$3(`</div><span${_scopeId$2}>${ssrInterpolate(workspace.name)}</span></div>`);
													if (unref(workStore).currentWorkspaceID === workspace.id) {
														_push$3(`<div class="flex items-center gap-1 ml-2"${_scopeId$2}><button class="rounded p-1 hover:bg-muted"${_scopeId$2}>`);
														_push$3(ssrRenderComponent(unref(Edit2), { class: "h-4 w-4 text-muted-foreground" }, null, _parent$3, _scopeId$2));
														_push$3(`</button><button class="${ssrRenderClass([{ "opacity-40": unref(workStore).availableWorkspaces.length <= 1 }, "rounded p-1 hover:bg-muted"])}"${ssrIncludeBooleanAttr(unref(workStore).availableWorkspaces.length <= 1) ? " disabled" : ""}${_scopeId$2}>`);
														_push$3(ssrRenderComponent(unref(Trash2), { class: "h-4 w-4 text-destructive" }, null, _parent$3, _scopeId$2));
														_push$3(`</button></div>`);
													} else _push$3(`<!---->`);
													_push$3(`</div>`);
												} else return [createVNode("div", { class: "flex w-full items-center justify-between" }, [createVNode("div", { class: "flex items-center gap-2 cursor-pointer" }, [createVNode("div", { class: "flex size-6 items-center justify-center rounded-sm border" }, [workspace.sigmaStore().selected_siem === "splunk" ? (openBlock(), createBlock(resolveDynamicComponent(unref(splunk_default)), {
													key: 0,
													class: "w-4 h-4 shrink-0"
												})) : workspace.sigmaStore().selected_siem === "es|ql" || workspace.sigmaStore().selected_siem === "eql" || workspace.sigmaStore().selected_siem === "lucene" ? (openBlock(), createBlock(resolveDynamicComponent(unref(elasticsearch_default)), {
													key: 1,
													class: "w-4 h-4 shrink-0"
												})) : workspace.sigmaStore().selected_siem === "loki" ? (openBlock(), createBlock(resolveDynamicComponent(unref(grafana_default)), {
													key: 2,
													class: "w-4 h-4 shrink-0"
												})) : (openBlock(), createBlock(unref(Layers2), {
													key: 3,
													class: "h-4 shrink-0"
												}))]), createVNode("span", null, toDisplayString(workspace.name), 1)]), unref(workStore).currentWorkspaceID === workspace.id ? (openBlock(), createBlock("div", {
													key: 0,
													class: "flex items-center gap-1 ml-2"
												}, [createVNode("button", {
													class: "rounded p-1 hover:bg-muted",
													onClick: withModifiers(($event) => startRename(workspace), ["stop"])
												}, [createVNode(unref(Edit2), { class: "h-4 w-4 text-muted-foreground" })], 8, ["onClick"]), createVNode("button", {
													class: [{ "opacity-40": unref(workStore).availableWorkspaces.length <= 1 }, "rounded p-1 hover:bg-muted"],
													disabled: unref(workStore).availableWorkspaces.length <= 1,
													onClick: withModifiers(($event) => startDelete(workspace), ["stop"])
												}, [createVNode(unref(Trash2), { class: "h-4 w-4 text-destructive" })], 10, ["disabled", "onClick"])])) : createCommentVNode("", true)])];
											}),
											_: 2
										}, _parent$2, _scopeId$1));
									});
									_push$2(`<!--]-->`);
									_push$2(ssrRenderComponent(unref(DropdownMenuSeparator_default), null, null, _parent$2, _scopeId$1));
									_push$2(ssrRenderComponent(unref(DropdownMenuItem_default), {
										class: "gap-2 p-2",
										onClick: createWorkspace
									}, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) {
												_push$3(`<div class="flex size-6 items-center justify-center rounded-md border bg-background"${_scopeId$2}>`);
												_push$3(ssrRenderComponent(unref(Plus), { class: "size-4" }, null, _parent$3, _scopeId$2));
												_push$3(`</div><div class="font-medium text-muted-foreground"${_scopeId$2}>New Workspace</div>`);
											} else return [createVNode("div", { class: "flex size-6 items-center justify-center rounded-md border bg-background" }, [createVNode(unref(Plus), { class: "size-4" })]), createVNode("div", { class: "font-medium text-muted-foreground" }, "New Workspace")];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
								} else return [
									createVNode(unref(DropdownMenuLabel_default), { class: "text-xs text-muted-foreground" }, {
										default: withCtx(() => [createTextVNode(" Workspaces")]),
										_: 1
									}),
									(openBlock(true), createBlock(Fragment, null, renderList(unref(workStore).availableWorkspaces, (workspace, index) => {
										return openBlock(), createBlock(unref(DropdownMenuItem_default), {
											key: workspace.name,
											class: "gap-2 p-2",
											onClick: withModifiers(($event) => unref(workStore).setCurrentWorkspace(workspace), ["stop"])
										}, {
											default: withCtx(() => [createVNode("div", { class: "flex w-full items-center justify-between" }, [createVNode("div", { class: "flex items-center gap-2 cursor-pointer" }, [createVNode("div", { class: "flex size-6 items-center justify-center rounded-sm border" }, [workspace.sigmaStore().selected_siem === "splunk" ? (openBlock(), createBlock(resolveDynamicComponent(unref(splunk_default)), {
												key: 0,
												class: "w-4 h-4 shrink-0"
											})) : workspace.sigmaStore().selected_siem === "es|ql" || workspace.sigmaStore().selected_siem === "eql" || workspace.sigmaStore().selected_siem === "lucene" ? (openBlock(), createBlock(resolveDynamicComponent(unref(elasticsearch_default)), {
												key: 1,
												class: "w-4 h-4 shrink-0"
											})) : workspace.sigmaStore().selected_siem === "loki" ? (openBlock(), createBlock(resolveDynamicComponent(unref(grafana_default)), {
												key: 2,
												class: "w-4 h-4 shrink-0"
											})) : (openBlock(), createBlock(unref(Layers2), {
												key: 3,
												class: "h-4 shrink-0"
											}))]), createVNode("span", null, toDisplayString(workspace.name), 1)]), unref(workStore).currentWorkspaceID === workspace.id ? (openBlock(), createBlock("div", {
												key: 0,
												class: "flex items-center gap-1 ml-2"
											}, [createVNode("button", {
												class: "rounded p-1 hover:bg-muted",
												onClick: withModifiers(($event) => startRename(workspace), ["stop"])
											}, [createVNode(unref(Edit2), { class: "h-4 w-4 text-muted-foreground" })], 8, ["onClick"]), createVNode("button", {
												class: [{ "opacity-40": unref(workStore).availableWorkspaces.length <= 1 }, "rounded p-1 hover:bg-muted"],
												disabled: unref(workStore).availableWorkspaces.length <= 1,
												onClick: withModifiers(($event) => startDelete(workspace), ["stop"])
											}, [createVNode(unref(Trash2), { class: "h-4 w-4 text-destructive" })], 10, ["disabled", "onClick"])])) : createCommentVNode("", true)])]),
											_: 2
										}, 1032, ["onClick"]);
									}), 128)),
									createVNode(unref(DropdownMenuSeparator_default)),
									createVNode(unref(DropdownMenuItem_default), {
										class: "gap-2 p-2",
										onClick: createWorkspace
									}, {
										default: withCtx(() => [createVNode("div", { class: "flex size-6 items-center justify-center rounded-md border bg-background" }, [createVNode(unref(Plus), { class: "size-4" })]), createVNode("div", { class: "font-medium text-muted-foreground" }, "New Workspace")]),
										_: 1
									})
								];
							}),
							_: 1
						}, _parent$1, _scopeId));
					} else return [createVNode(unref(DropdownMenuTrigger_default), { "as-child": "" }, {
						default: withCtx(() => [createVNode(unref(SidebarMenuButton_default), {
							class: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
							size: "lg"
						}, {
							default: withCtx(() => [
								createVNode("div", { class: "flex aspect-square size-8 items-center justify-center rounded-lg bg-secondary text-sidebar-primary-foreground border-2 border-primary" }, [unref(supportedSiems).find((s) => s.id === unref(workStore).currentWorkspace.sigmaStore().selected_siem)?.icon ? (openBlock(), createBlock(resolveDynamicComponent(unref(supportedSiems).find((s) => s.id === unref(workStore).currentWorkspace.sigmaStore().selected_siem)?.icon), {
									key: 0,
									class: "w-4 h-4 shrink-0"
								})) : (openBlock(), createBlock(unref(Layers2), {
									key: 1,
									class: "h-4 shrink-0"
								}))]),
								createVNode("div", { class: "grid text-left text-sm leading-tight" }, [createVNode("span", { class: "truncate font-semibold" }, toDisplayString(unref(workStore).currentWorkspace?.name), 1), createVNode("span", { class: "truncate text-xs" }, toDisplayString(unref(supportedSiems).find((s) => s.id === sigma.value.selected_siem)?.name ?? ""), 1)]),
								createVNode(unref(ChevronsUpDown), { class: "ml-auto" })
							]),
							_: 1
						})]),
						_: 1
					}), createVNode(unref(DropdownMenuContent_default), {
						"side-offset": 4,
						align: "start",
						class: "w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg",
						side: "bottom"
					}, {
						default: withCtx(() => [
							createVNode(unref(DropdownMenuLabel_default), { class: "text-xs text-muted-foreground" }, {
								default: withCtx(() => [createTextVNode(" Workspaces")]),
								_: 1
							}),
							(openBlock(true), createBlock(Fragment, null, renderList(unref(workStore).availableWorkspaces, (workspace, index) => {
								return openBlock(), createBlock(unref(DropdownMenuItem_default), {
									key: workspace.name,
									class: "gap-2 p-2",
									onClick: withModifiers(($event) => unref(workStore).setCurrentWorkspace(workspace), ["stop"])
								}, {
									default: withCtx(() => [createVNode("div", { class: "flex w-full items-center justify-between" }, [createVNode("div", { class: "flex items-center gap-2 cursor-pointer" }, [createVNode("div", { class: "flex size-6 items-center justify-center rounded-sm border" }, [workspace.sigmaStore().selected_siem === "splunk" ? (openBlock(), createBlock(resolveDynamicComponent(unref(splunk_default)), {
										key: 0,
										class: "w-4 h-4 shrink-0"
									})) : workspace.sigmaStore().selected_siem === "es|ql" || workspace.sigmaStore().selected_siem === "eql" || workspace.sigmaStore().selected_siem === "lucene" ? (openBlock(), createBlock(resolveDynamicComponent(unref(elasticsearch_default)), {
										key: 1,
										class: "w-4 h-4 shrink-0"
									})) : workspace.sigmaStore().selected_siem === "loki" ? (openBlock(), createBlock(resolveDynamicComponent(unref(grafana_default)), {
										key: 2,
										class: "w-4 h-4 shrink-0"
									})) : (openBlock(), createBlock(unref(Layers2), {
										key: 3,
										class: "h-4 shrink-0"
									}))]), createVNode("span", null, toDisplayString(workspace.name), 1)]), unref(workStore).currentWorkspaceID === workspace.id ? (openBlock(), createBlock("div", {
										key: 0,
										class: "flex items-center gap-1 ml-2"
									}, [createVNode("button", {
										class: "rounded p-1 hover:bg-muted",
										onClick: withModifiers(($event) => startRename(workspace), ["stop"])
									}, [createVNode(unref(Edit2), { class: "h-4 w-4 text-muted-foreground" })], 8, ["onClick"]), createVNode("button", {
										class: [{ "opacity-40": unref(workStore).availableWorkspaces.length <= 1 }, "rounded p-1 hover:bg-muted"],
										disabled: unref(workStore).availableWorkspaces.length <= 1,
										onClick: withModifiers(($event) => startDelete(workspace), ["stop"])
									}, [createVNode(unref(Trash2), { class: "h-4 w-4 text-destructive" })], 10, ["disabled", "onClick"])])) : createCommentVNode("", true)])]),
									_: 2
								}, 1032, ["onClick"]);
							}), 128)),
							createVNode(unref(DropdownMenuSeparator_default)),
							createVNode(unref(DropdownMenuItem_default), {
								class: "gap-2 p-2",
								onClick: createWorkspace
							}, {
								default: withCtx(() => [createVNode("div", { class: "flex size-6 items-center justify-center rounded-md border bg-background" }, [createVNode(unref(Plus), { class: "size-4" })]), createVNode("div", { class: "font-medium text-muted-foreground" }, "New Workspace")]),
								_: 1
							})
						]),
						_: 1
					})];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(Dialog_default), {
				open: isRenameDialogOpen.value,
				"onUpdate:open": ($event) => isRenameDialogOpen.value = $event
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(ssrRenderComponent(unref(DialogContent_default), { class: "sm:max-w-md" }, {
						default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
							if (_push$2) {
								_push$2(ssrRenderComponent(unref(DialogTitle_default), null, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) _push$3(`Rename Workspace`);
										else return [createTextVNode("Rename Workspace")];
									}),
									_: 1
								}, _parent$2, _scopeId$1));
								_push$2(`<div class="mt-4"${_scopeId$1}>`);
								_push$2(ssrRenderComponent(unref(Input_default), {
									modelValue: newWorkspaceName.value,
									"onUpdate:modelValue": ($event) => newWorkspaceName.value = $event,
									autofocus: "",
									class: "w-full",
									placeholder: "Workspace name",
									onKeydown: handleKeydown
								}, null, _parent$2, _scopeId$1));
								_push$2(`</div>`);
								_push$2(ssrRenderComponent(unref(DialogFooter_default), { class: "mt-4" }, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) {
											_push$3(ssrRenderComponent(unref(Button_default), {
												variant: "outline",
												onClick: cancelRename
											}, {
												default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
													if (_push$4) _push$4(`Cancel`);
													else return [createTextVNode("Cancel")];
												}),
												_: 1
											}, _parent$3, _scopeId$2));
											_push$3(ssrRenderComponent(unref(Button_default), { onClick: confirmRename }, {
												default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
													if (_push$4) _push$4(`Save`);
													else return [createTextVNode("Save")];
												}),
												_: 1
											}, _parent$3, _scopeId$2));
										} else return [createVNode(unref(Button_default), {
											variant: "outline",
											onClick: cancelRename
										}, {
											default: withCtx(() => [createTextVNode("Cancel")]),
											_: 1
										}), createVNode(unref(Button_default), { onClick: confirmRename }, {
											default: withCtx(() => [createTextVNode("Save")]),
											_: 1
										})];
									}),
									_: 1
								}, _parent$2, _scopeId$1));
							} else return [
								createVNode(unref(DialogTitle_default), null, {
									default: withCtx(() => [createTextVNode("Rename Workspace")]),
									_: 1
								}),
								createVNode("div", { class: "mt-4" }, [createVNode(unref(Input_default), {
									modelValue: newWorkspaceName.value,
									"onUpdate:modelValue": ($event) => newWorkspaceName.value = $event,
									autofocus: "",
									class: "w-full",
									placeholder: "Workspace name",
									onKeydown: handleKeydown
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								createVNode(unref(DialogFooter_default), { class: "mt-4" }, {
									default: withCtx(() => [createVNode(unref(Button_default), {
										variant: "outline",
										onClick: cancelRename
									}, {
										default: withCtx(() => [createTextVNode("Cancel")]),
										_: 1
									}), createVNode(unref(Button_default), { onClick: confirmRename }, {
										default: withCtx(() => [createTextVNode("Save")]),
										_: 1
									})]),
									_: 1
								})
							];
						}),
						_: 1
					}, _parent$1, _scopeId));
					else return [createVNode(unref(DialogContent_default), { class: "sm:max-w-md" }, {
						default: withCtx(() => [
							createVNode(unref(DialogTitle_default), null, {
								default: withCtx(() => [createTextVNode("Rename Workspace")]),
								_: 1
							}),
							createVNode("div", { class: "mt-4" }, [createVNode(unref(Input_default), {
								modelValue: newWorkspaceName.value,
								"onUpdate:modelValue": ($event) => newWorkspaceName.value = $event,
								autofocus: "",
								class: "w-full",
								placeholder: "Workspace name",
								onKeydown: handleKeydown
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							createVNode(unref(DialogFooter_default), { class: "mt-4" }, {
								default: withCtx(() => [createVNode(unref(Button_default), {
									variant: "outline",
									onClick: cancelRename
								}, {
									default: withCtx(() => [createTextVNode("Cancel")]),
									_: 1
								}), createVNode(unref(Button_default), { onClick: confirmRename }, {
									default: withCtx(() => [createTextVNode("Save")]),
									_: 1
								})]),
								_: 1
							})
						]),
						_: 1
					})];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(Dialog_default), {
				open: isDeleteDialogOpen.value,
				"onUpdate:open": ($event) => isDeleteDialogOpen.value = $event
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(ssrRenderComponent(unref(DialogContent_default), { class: "sm:max-w-md" }, {
						default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
							if (_push$2) {
								_push$2(ssrRenderComponent(unref(DialogTitle_default), null, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) _push$3(`Delete Workspace`);
										else return [createTextVNode("Delete Workspace")];
									}),
									_: 1
								}, _parent$2, _scopeId$1));
								_push$2(`<div class="mt-4"${_scopeId$1}><p class="text-sm text-muted-foreground"${_scopeId$1}> Are you sure you want to delete the workspace &quot;${ssrInterpolate(workspaceNameToDelete.value)}&quot;? This action cannot be undone. </p></div>`);
								_push$2(ssrRenderComponent(unref(DialogFooter_default), { class: "mt-4" }, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) {
											_push$3(ssrRenderComponent(unref(Button_default), {
												variant: "outline",
												onClick: cancelDelete
											}, {
												default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
													if (_push$4) _push$4(`Cancel`);
													else return [createTextVNode("Cancel")];
												}),
												_: 1
											}, _parent$3, _scopeId$2));
											_push$3(ssrRenderComponent(unref(Button_default), {
												variant: "destructive",
												onClick: confirmDelete
											}, {
												default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
													if (_push$4) _push$4(`Delete`);
													else return [createTextVNode("Delete")];
												}),
												_: 1
											}, _parent$3, _scopeId$2));
										} else return [createVNode(unref(Button_default), {
											variant: "outline",
											onClick: cancelDelete
										}, {
											default: withCtx(() => [createTextVNode("Cancel")]),
											_: 1
										}), createVNode(unref(Button_default), {
											variant: "destructive",
											onClick: confirmDelete
										}, {
											default: withCtx(() => [createTextVNode("Delete")]),
											_: 1
										})];
									}),
									_: 1
								}, _parent$2, _scopeId$1));
							} else return [
								createVNode(unref(DialogTitle_default), null, {
									default: withCtx(() => [createTextVNode("Delete Workspace")]),
									_: 1
								}),
								createVNode("div", { class: "mt-4" }, [createVNode("p", { class: "text-sm text-muted-foreground" }, " Are you sure you want to delete the workspace \"" + toDisplayString(workspaceNameToDelete.value) + "\"? This action cannot be undone. ", 1)]),
								createVNode(unref(DialogFooter_default), { class: "mt-4" }, {
									default: withCtx(() => [createVNode(unref(Button_default), {
										variant: "outline",
										onClick: cancelDelete
									}, {
										default: withCtx(() => [createTextVNode("Cancel")]),
										_: 1
									}), createVNode(unref(Button_default), {
										variant: "destructive",
										onClick: confirmDelete
									}, {
										default: withCtx(() => [createTextVNode("Delete")]),
										_: 1
									})]),
									_: 1
								})
							];
						}),
						_: 1
					}, _parent$1, _scopeId));
					else return [createVNode(unref(DialogContent_default), { class: "sm:max-w-md" }, {
						default: withCtx(() => [
							createVNode(unref(DialogTitle_default), null, {
								default: withCtx(() => [createTextVNode("Delete Workspace")]),
								_: 1
							}),
							createVNode("div", { class: "mt-4" }, [createVNode("p", { class: "text-sm text-muted-foreground" }, " Are you sure you want to delete the workspace \"" + toDisplayString(workspaceNameToDelete.value) + "\"? This action cannot be undone. ", 1)]),
							createVNode(unref(DialogFooter_default), { class: "mt-4" }, {
								default: withCtx(() => [createVNode(unref(Button_default), {
									variant: "outline",
									onClick: cancelDelete
								}, {
									default: withCtx(() => [createTextVNode("Cancel")]),
									_: 1
								}), createVNode(unref(Button_default), {
									variant: "destructive",
									onClick: confirmDelete
								}, {
									default: withCtx(() => [createTextVNode("Delete")]),
									_: 1
								})]),
								_: 1
							})
						]),
						_: 1
					})];
				}),
				_: 1
			}, _parent));
			_push(`<!--]-->`);
		};
	}
});
var _sfc_setup$5 = WorkspaceSelection_vue_vue_type_script_setup_true_lang_default.setup;
WorkspaceSelection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/WorkspaceSelection.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var WorkspaceSelection_default = WorkspaceSelection_vue_vue_type_script_setup_true_lang_default;
var ScrollBar_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ScrollBar",
	__ssrInlineRender: true,
	props: {
		orientation: { default: "vertical" },
		forceMount: { type: Boolean },
		asChild: { type: Boolean },
		as: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		const delegatedProps = reactiveOmit(props, "class");
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(ScrollAreaScrollbar), mergeProps(unref(delegatedProps), { class: unref(cn)("flex touch-none select-none transition-colors", __props.orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-px", __props.orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-px", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(ssrRenderComponent(unref(ScrollAreaThumb), { class: "relative flex-1 rounded-full bg-border" }, null, _parent$1, _scopeId));
					else return [createVNode(unref(ScrollAreaThumb), { class: "relative flex-1 rounded-full bg-border" })];
				}),
				_: 1
			}, _parent));
		};
	}
});
var _sfc_setup$4 = ScrollBar_vue_vue_type_script_setup_true_lang_default.setup;
ScrollBar_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/scroll-area/ScrollBar.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var ScrollBar_default = ScrollBar_vue_vue_type_script_setup_true_lang_default;
var ScrollArea_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ScrollArea",
	__ssrInlineRender: true,
	props: {
		type: {},
		dir: {},
		scrollHideDelay: {},
		asChild: { type: Boolean },
		as: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		const delegatedProps = reactiveOmit(props, "class");
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(ScrollAreaRoot), mergeProps(unref(delegatedProps), { class: unref(cn)("relative overflow-hidden", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(unref(ScrollAreaViewport), { class: "h-full w-full rounded-[inherit]" }, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$2, _parent$2, _scopeId$1);
								else return [renderSlot(_ctx.$slots, "default")];
							}),
							_: 3
						}, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(ScrollBar_default, null, null, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(ScrollAreaCorner), null, null, _parent$1, _scopeId));
					} else return [
						createVNode(unref(ScrollAreaViewport), { class: "h-full w-full rounded-[inherit]" }, {
							default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
							_: 3
						}),
						createVNode(ScrollBar_default),
						createVNode(unref(ScrollAreaCorner))
					];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$3 = ScrollArea_vue_vue_type_script_setup_true_lang_default.setup;
ScrollArea_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/scroll-area/ScrollArea.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var ScrollArea_default = ScrollArea_vue_vue_type_script_setup_true_lang_default;
var Badge_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Badge",
	__ssrInlineRender: true,
	props: {
		variant: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: unref(cn)(unref(badgeVariants)({ variant: __props.variant }), props.class) }, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div>`);
		};
	}
});
var _sfc_setup$2 = Badge_vue_vue_type_script_setup_true_lang_default.setup;
Badge_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/badge/Badge.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var Badge_default = Badge_vue_vue_type_script_setup_true_lang_default;
const badgeVariants = cva("inline-flex gap-1 items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
var CHANGELOG_BASE_URL = "/changelogs";
var DISMISSED_RELEASES_KEY = "dismissedReleases";
function useChangelog() {
	const manifest = ref(null);
	const changelogs = ref(/* @__PURE__ */ new Map());
	const loading = ref(false);
	const error = ref(null);
	const dismissedReleases = useStorage(DISMISSED_RELEASES_KEY, []);
	async function loadManifest() {
		try {
			loading.value = true;
			error.value = null;
			const response = await fetch(`${CHANGELOG_BASE_URL}/manifest.json`);
			if (!response.ok) throw new Error("Failed to load changelog manifest");
			manifest.value = await response.json();
		} catch (e) {
			error.value = e instanceof Error ? e.message : "Unknown error";
			console.error("Error loading changelog manifest:", e);
		} finally {
			loading.value = false;
		}
	}
	async function loadChangelog(version) {
		if (changelogs.value.has(version)) return changelogs.value.get(version);
		try {
			const release = manifest.value?.releases.find((r) => r.version === version);
			if (!release) throw new Error(`Release ${version} not found`);
			const response = await fetch(`${CHANGELOG_BASE_URL}/${release.file}`);
			if (!response.ok) throw new Error(`Failed to load changelog for version ${version}`);
			const content = await response.text();
			changelogs.value.set(version, content);
			return content;
		} catch (e) {
			error.value = e instanceof Error ? e.message : "Unknown error";
			console.error(`Error loading changelog for ${version}:`, e);
			return null;
		}
	}
	async function loadAllChangelogs() {
		if (!manifest.value) await loadManifest();
		if (!manifest.value?.releases) return "";
		return (await Promise.all(manifest.value.releases.map((release) => loadChangelog(release.version)))).filter(Boolean).join("\n\n---\n\n");
	}
	const latestRelease = computed(() => {
		return manifest.value?.releases[0] || null;
	});
	const hasNewRelease = computed(() => {
		if (!latestRelease.value) return false;
		return !dismissedReleases.value.includes(latestRelease.value.version);
	});
	function dismissRelease(version) {
		if (!dismissedReleases.value.includes(version)) dismissedReleases.value = [...dismissedReleases.value, version];
	}
	function markdownToHtml(markdown) {
		let html = markdown.replace(/^### (.*$)/gim, "<h3>$1</h3>").replace(/^## (.*$)/gim, "<h2>$1</h2>").replace(/^# (.*$)/gim, "<h1>$1</h1>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em class=\"italic\">$1</em>").replace(/^- (.*$)/gim, "<li>$1</li>").replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<a href=\"$2\" target=\"_blank\" rel=\"noopener noreferrer\">$1</a>").replace(/^---$/gim, "<hr />").replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br />");
		html = `<p>${html}</p>`;
		html = html.replace(/(<li.*?<\/li>(?:\s*<li.*?<\/li>)*)/g, "<ul class=\"list-disc\">$1</ul>");
		return html;
	}
	return {
		manifest,
		changelogs,
		loading,
		error,
		latestRelease,
		hasNewRelease,
		loadManifest,
		loadChangelog,
		loadAllChangelogs,
		dismissRelease,
		markdownToHtml
	};
}
var ChangelogDialog_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ChangelogDialog",
	__ssrInlineRender: true,
	props: {
		open: { type: Boolean },
		autoShow: { type: Boolean }
	},
	emits: ["update:open"],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { manifest, latestRelease, hasNewRelease, loading, error, loadManifest, loadChangelog, dismissRelease, markdownToHtml } = useChangelog();
		const isOpen = ref(false);
		const selectedVersion = ref(null);
		const changelogContent = ref("");
		const loadingChangelog = ref(false);
		function isLatestRelease(version) {
			return manifest.value?.releases[0]?.version === version;
		}
		watch(() => props.open, (value) => {
			if (value !== void 0) isOpen.value = value;
		});
		watch(isOpen, (value) => {
			emit("update:open", value);
			if (!value && latestRelease.value) dismissRelease(latestRelease.value.version);
		});
		onMounted(async () => {
			await loadManifest();
			if (props.autoShow && hasNewRelease.value) {
				await selectRelease(latestRelease.value.version);
				isOpen.value = true;
			}
		});
		async function selectRelease(version) {
			selectedVersion.value = version;
			loadingChangelog.value = true;
			changelogContent.value = "";
			try {
				changelogContent.value = await loadChangelog(version) || "";
			} finally {
				loadingChangelog.value = false;
			}
		}
		async function openDialog() {
			if (!selectedVersion.value && latestRelease.value) await selectRelease(latestRelease.value.version);
			isOpen.value = true;
		}
		function closeDialog() {
			isOpen.value = false;
		}
		const htmlContent = computed(() => {
			if (!changelogContent.value) return "";
			return markdownToHtml(changelogContent.value);
		});
		__expose({ openDialog });
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Dialog_default), mergeProps({
				open: isOpen.value,
				"onUpdate:open": ($event) => isOpen.value = $event
			}, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(ssrRenderComponent(unref(DialogContent_default), { class: "max-w-5xl! max-h-[85vh]" }, {
						default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
							if (_push$2) {
								_push$2(ssrRenderComponent(unref(DialogHeader_default), { class: "pb-4 bg-secondary/30 mb-4 -mt-6 -mx-6 p-6 rounded-b" }, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) {
											_push$3(ssrRenderComponent(unref(DialogTitle_default), { class: "text-2xl font-bold flex items-center gap-2" }, {
												default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
													if (_push$4) {
														_push$4(ssrRenderComponent(unref(Sparkles), { class: "h-6 w-6 text-muted-foreground" }, null, _parent$4, _scopeId$3));
														_push$4(` What&#39;s New `);
													} else return [createVNode(unref(Sparkles), { class: "h-6 w-6 text-muted-foreground" }), createTextVNode(" What's New ")];
												}),
												_: 1
											}, _parent$3, _scopeId$2));
											_push$3(ssrRenderComponent(unref(DialogDescription_default), { class: "text-base" }, {
												default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
													if (_push$4) _push$4(` Check out the latest updates and improvements to Detection Studio `);
													else return [createTextVNode(" Check out the latest updates and improvements to Detection Studio ")];
												}),
												_: 1
											}, _parent$3, _scopeId$2));
										} else return [createVNode(unref(DialogTitle_default), { class: "text-2xl font-bold flex items-center gap-2" }, {
											default: withCtx(() => [createVNode(unref(Sparkles), { class: "h-6 w-6 text-muted-foreground" }), createTextVNode(" What's New ")]),
											_: 1
										}), createVNode(unref(DialogDescription_default), { class: "text-base" }, {
											default: withCtx(() => [createTextVNode(" Check out the latest updates and improvements to Detection Studio ")]),
											_: 1
										})];
									}),
									_: 1
								}, _parent$2, _scopeId$1));
								if (unref(loading)) _push$2(`<div class="flex items-center justify-center py-12" data-v-e480cada${_scopeId$1}><div class="text-muted-foreground" data-v-e480cada${_scopeId$1}>Loading changelogs...</div></div>`);
								else if (unref(error)) _push$2(`<div class="text-destructive py-4" data-v-e480cada${_scopeId$1}> Error loading changelogs: ${ssrInterpolate(unref(error))}</div>`);
								else {
									_push$2(`<div class="grid grid-cols-[280px_1fr] h-[50vh] -mt-3" data-v-e480cada${_scopeId$1}>`);
									_push$2(ssrRenderComponent(unref(ScrollArea_default), { class: "pr-6" }, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) {
												_push$3(`<div class="space-y-2" data-v-e480cada${_scopeId$2}><!--[-->`);
												ssrRenderList(unref(manifest)?.releases, (release) => {
													_push$3(`<button class="${ssrRenderClass([{
														"bg-primary/10 border border-primary/20 shadow-sm": selectedVersion.value === release.version,
														"hover:border hover:border-border": selectedVersion.value !== release.version
													}, "w-full text-left px-4 py-3 rounded-lg transition-all hover:bg-accent hover:shadow-sm group relative"])}" data-v-e480cada${_scopeId$2}><div class="flex items-center justify-between mb-1" data-v-e480cada${_scopeId$2}><div class="${ssrRenderClass([{ "text-primary": selectedVersion.value === release.version }, "text-sm font-bold"])}" data-v-e480cada${_scopeId$2}>${ssrInterpolate(release.version)}</div>`);
													if (isLatestRelease(release.version)) _push$3(ssrRenderComponent(unref(Badge_default), {
														variant: "secondary",
														class: "text-xs px-2 py-0"
													}, {
														default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
															if (_push$4) _push$4(` NEW `);
															else return [createTextVNode(" NEW ")];
														}),
														_: 2
													}, _parent$3, _scopeId$2));
													else _push$3(`<!---->`);
													_push$3(`</div><div class="flex items-center gap-1.5 text-xs text-muted-foreground" data-v-e480cada${_scopeId$2}>`);
													_push$3(ssrRenderComponent(unref(CalendarDays), { class: "h-3 w-3" }, null, _parent$3, _scopeId$2));
													_push$3(` ${ssrInterpolate(release.date)}</div></button>`);
												});
												_push$3(`<!--]--></div>`);
											} else return [createVNode("div", { class: "space-y-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(manifest)?.releases, (release) => {
												return openBlock(), createBlock("button", {
													key: release.version,
													onClick: ($event) => selectRelease(release.version),
													class: ["w-full text-left px-4 py-3 rounded-lg transition-all hover:bg-accent hover:shadow-sm group relative", {
														"bg-primary/10 border border-primary/20 shadow-sm": selectedVersion.value === release.version,
														"hover:border hover:border-border": selectedVersion.value !== release.version
													}]
												}, [createVNode("div", { class: "flex items-center justify-between mb-1" }, [createVNode("div", { class: ["text-sm font-bold", { "text-primary": selectedVersion.value === release.version }] }, toDisplayString(release.version), 3), isLatestRelease(release.version) ? (openBlock(), createBlock(unref(Badge_default), {
													key: 0,
													variant: "secondary",
													class: "text-xs px-2 py-0"
												}, {
													default: withCtx(() => [createTextVNode(" NEW ")]),
													_: 1
												})) : createCommentVNode("", true)]), createVNode("div", { class: "flex items-center gap-1.5 text-xs text-muted-foreground" }, [createVNode(unref(CalendarDays), { class: "h-3 w-3" }), createTextVNode(" " + toDisplayString(release.date), 1)])], 10, ["onClick"]);
											}), 128))])];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(ssrRenderComponent(unref(ScrollArea_default), { class: "pr-4" }, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) if (loadingChangelog.value) _push$3(`<div class="flex items-center justify-center py-12" data-v-e480cada${_scopeId$2}><div class="text-muted-foreground" data-v-e480cada${_scopeId$2}>Loading release notes...</div></div>`);
											else if (changelogContent.value) _push$3(`<div class="changelog-content space-y-6 pb-4" data-v-e480cada${_scopeId$2}>${htmlContent.value ?? ""}</div>`);
											else {
												_push$3(`<div class="flex flex-col items-center justify-center py-12 text-muted-foreground" data-v-e480cada${_scopeId$2}>`);
												_push$3(ssrRenderComponent(unref(Sparkles), { class: "h-12 w-12 mb-3 opacity-50" }, null, _parent$3, _scopeId$2));
												_push$3(`<p data-v-e480cada${_scopeId$2}>Select a release to view its notes</p></div>`);
											}
											else return [loadingChangelog.value ? (openBlock(), createBlock("div", {
												key: 0,
												class: "flex items-center justify-center py-12"
											}, [createVNode("div", { class: "text-muted-foreground" }, "Loading release notes...")])) : changelogContent.value ? (openBlock(), createBlock("div", {
												key: 1,
												class: "changelog-content space-y-6 pb-4",
												innerHTML: htmlContent.value
											}, null, 8, ["innerHTML"])) : (openBlock(), createBlock("div", {
												key: 2,
												class: "flex flex-col items-center justify-center py-12 text-muted-foreground"
											}, [createVNode(unref(Sparkles), { class: "h-12 w-12 mb-3 opacity-50" }), createVNode("p", null, "Select a release to view its notes")]))];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(`</div>`);
								}
								_push$2(`<div class="flex justify-end gap-2 pt-4 border-t" data-v-e480cada${_scopeId$1}>`);
								_push$2(ssrRenderComponent(unref(Button_default), {
									variant: "outline",
									onClick: closeDialog
								}, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) _push$3(` Close `);
										else return [createTextVNode(" Close ")];
									}),
									_: 1
								}, _parent$2, _scopeId$1));
								_push$2(`</div>`);
							} else return [
								createVNode(unref(DialogHeader_default), { class: "pb-4 bg-secondary/30 mb-4 -mt-6 -mx-6 p-6 rounded-b" }, {
									default: withCtx(() => [createVNode(unref(DialogTitle_default), { class: "text-2xl font-bold flex items-center gap-2" }, {
										default: withCtx(() => [createVNode(unref(Sparkles), { class: "h-6 w-6 text-muted-foreground" }), createTextVNode(" What's New ")]),
										_: 1
									}), createVNode(unref(DialogDescription_default), { class: "text-base" }, {
										default: withCtx(() => [createTextVNode(" Check out the latest updates and improvements to Detection Studio ")]),
										_: 1
									})]),
									_: 1
								}),
								unref(loading) ? (openBlock(), createBlock("div", {
									key: 0,
									class: "flex items-center justify-center py-12"
								}, [createVNode("div", { class: "text-muted-foreground" }, "Loading changelogs...")])) : unref(error) ? (openBlock(), createBlock("div", {
									key: 1,
									class: "text-destructive py-4"
								}, " Error loading changelogs: " + toDisplayString(unref(error)), 1)) : (openBlock(), createBlock("div", {
									key: 2,
									class: "grid grid-cols-[280px_1fr] h-[50vh] -mt-3"
								}, [createVNode(unref(ScrollArea_default), { class: "pr-6" }, {
									default: withCtx(() => [createVNode("div", { class: "space-y-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(manifest)?.releases, (release) => {
										return openBlock(), createBlock("button", {
											key: release.version,
											onClick: ($event) => selectRelease(release.version),
											class: ["w-full text-left px-4 py-3 rounded-lg transition-all hover:bg-accent hover:shadow-sm group relative", {
												"bg-primary/10 border border-primary/20 shadow-sm": selectedVersion.value === release.version,
												"hover:border hover:border-border": selectedVersion.value !== release.version
											}]
										}, [createVNode("div", { class: "flex items-center justify-between mb-1" }, [createVNode("div", { class: ["text-sm font-bold", { "text-primary": selectedVersion.value === release.version }] }, toDisplayString(release.version), 3), isLatestRelease(release.version) ? (openBlock(), createBlock(unref(Badge_default), {
											key: 0,
											variant: "secondary",
											class: "text-xs px-2 py-0"
										}, {
											default: withCtx(() => [createTextVNode(" NEW ")]),
											_: 1
										})) : createCommentVNode("", true)]), createVNode("div", { class: "flex items-center gap-1.5 text-xs text-muted-foreground" }, [createVNode(unref(CalendarDays), { class: "h-3 w-3" }), createTextVNode(" " + toDisplayString(release.date), 1)])], 10, ["onClick"]);
									}), 128))])]),
									_: 1
								}), createVNode(unref(ScrollArea_default), { class: "pr-4" }, {
									default: withCtx(() => [loadingChangelog.value ? (openBlock(), createBlock("div", {
										key: 0,
										class: "flex items-center justify-center py-12"
									}, [createVNode("div", { class: "text-muted-foreground" }, "Loading release notes...")])) : changelogContent.value ? (openBlock(), createBlock("div", {
										key: 1,
										class: "changelog-content space-y-6 pb-4",
										innerHTML: htmlContent.value
									}, null, 8, ["innerHTML"])) : (openBlock(), createBlock("div", {
										key: 2,
										class: "flex flex-col items-center justify-center py-12 text-muted-foreground"
									}, [createVNode(unref(Sparkles), { class: "h-12 w-12 mb-3 opacity-50" }), createVNode("p", null, "Select a release to view its notes")]))]),
									_: 1
								})])),
								createVNode("div", { class: "flex justify-end gap-2 pt-4 border-t" }, [createVNode(unref(Button_default), {
									variant: "outline",
									onClick: closeDialog
								}, {
									default: withCtx(() => [createTextVNode(" Close ")]),
									_: 1
								})])
							];
						}),
						_: 1
					}, _parent$1, _scopeId));
					else return [createVNode(unref(DialogContent_default), { class: "max-w-5xl! max-h-[85vh]" }, {
						default: withCtx(() => [
							createVNode(unref(DialogHeader_default), { class: "pb-4 bg-secondary/30 mb-4 -mt-6 -mx-6 p-6 rounded-b" }, {
								default: withCtx(() => [createVNode(unref(DialogTitle_default), { class: "text-2xl font-bold flex items-center gap-2" }, {
									default: withCtx(() => [createVNode(unref(Sparkles), { class: "h-6 w-6 text-muted-foreground" }), createTextVNode(" What's New ")]),
									_: 1
								}), createVNode(unref(DialogDescription_default), { class: "text-base" }, {
									default: withCtx(() => [createTextVNode(" Check out the latest updates and improvements to Detection Studio ")]),
									_: 1
								})]),
								_: 1
							}),
							unref(loading) ? (openBlock(), createBlock("div", {
								key: 0,
								class: "flex items-center justify-center py-12"
							}, [createVNode("div", { class: "text-muted-foreground" }, "Loading changelogs...")])) : unref(error) ? (openBlock(), createBlock("div", {
								key: 1,
								class: "text-destructive py-4"
							}, " Error loading changelogs: " + toDisplayString(unref(error)), 1)) : (openBlock(), createBlock("div", {
								key: 2,
								class: "grid grid-cols-[280px_1fr] h-[50vh] -mt-3"
							}, [createVNode(unref(ScrollArea_default), { class: "pr-6" }, {
								default: withCtx(() => [createVNode("div", { class: "space-y-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(manifest)?.releases, (release) => {
									return openBlock(), createBlock("button", {
										key: release.version,
										onClick: ($event) => selectRelease(release.version),
										class: ["w-full text-left px-4 py-3 rounded-lg transition-all hover:bg-accent hover:shadow-sm group relative", {
											"bg-primary/10 border border-primary/20 shadow-sm": selectedVersion.value === release.version,
											"hover:border hover:border-border": selectedVersion.value !== release.version
										}]
									}, [createVNode("div", { class: "flex items-center justify-between mb-1" }, [createVNode("div", { class: ["text-sm font-bold", { "text-primary": selectedVersion.value === release.version }] }, toDisplayString(release.version), 3), isLatestRelease(release.version) ? (openBlock(), createBlock(unref(Badge_default), {
										key: 0,
										variant: "secondary",
										class: "text-xs px-2 py-0"
									}, {
										default: withCtx(() => [createTextVNode(" NEW ")]),
										_: 1
									})) : createCommentVNode("", true)]), createVNode("div", { class: "flex items-center gap-1.5 text-xs text-muted-foreground" }, [createVNode(unref(CalendarDays), { class: "h-3 w-3" }), createTextVNode(" " + toDisplayString(release.date), 1)])], 10, ["onClick"]);
								}), 128))])]),
								_: 1
							}), createVNode(unref(ScrollArea_default), { class: "pr-4" }, {
								default: withCtx(() => [loadingChangelog.value ? (openBlock(), createBlock("div", {
									key: 0,
									class: "flex items-center justify-center py-12"
								}, [createVNode("div", { class: "text-muted-foreground" }, "Loading release notes...")])) : changelogContent.value ? (openBlock(), createBlock("div", {
									key: 1,
									class: "changelog-content space-y-6 pb-4",
									innerHTML: htmlContent.value
								}, null, 8, ["innerHTML"])) : (openBlock(), createBlock("div", {
									key: 2,
									class: "flex flex-col items-center justify-center py-12 text-muted-foreground"
								}, [createVNode(unref(Sparkles), { class: "h-12 w-12 mb-3 opacity-50" }), createVNode("p", null, "Select a release to view its notes")]))]),
								_: 1
							})])),
							createVNode("div", { class: "flex justify-end gap-2 pt-4 border-t" }, [createVNode(unref(Button_default), {
								variant: "outline",
								onClick: closeDialog
							}, {
								default: withCtx(() => [createTextVNode(" Close ")]),
								_: 1
							})])
						]),
						_: 1
					})];
				}),
				_: 1
			}, _parent));
		};
	}
});
var _sfc_setup$1 = ChangelogDialog_vue_vue_type_script_setup_true_lang_default.setup;
ChangelogDialog_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ChangelogDialog.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var ChangelogDialog_default = /* @__PURE__ */ _plugin_vue_export_helper_default(ChangelogDialog_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-e480cada"]]);
var App_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "App",
	__ssrInlineRender: true,
	setup(__props) {
		const data = {
			navMain: [
				{
					title: "Studio",
					url: "#",
					icon: PaletteIcon,
					isActive: true,
					items: [
						{
							title: "History",
							url: "#"
						},
						{
							title: "Starred",
							url: "#"
						},
						{
							title: "Settings",
							url: "#"
						}
					]
				},
				{
					title: "Browser",
					url: "#",
					icon: GlobeIcon,
					items: [{
						title: "Recent",
						url: "#"
					}, {
						title: "Saved",
						url: "#"
					}]
				},
				{
					title: "Settings",
					url: "#",
					icon: Settings2,
					items: [
						{
							title: "Profile",
							url: "#"
						},
						{
							title: "Team",
							url: "#"
						},
						{
							title: "Billing",
							url: "#"
						}
					]
				}
			],
			documentation: [{
				title: "Documentation",
				url: "#",
				icon: BookOpen,
				items: [{
					title: "Sigma Documentation",
					url: "https://sigmahq.io/docs/"
				}]
			}]
		};
		const workStore = useWorkspaceStore();
		const changelogDialogRef = ref();
		function openChangelog() {
			changelogDialogRef.value?.openDialog();
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_router_link = resolveComponent("router-link");
			const _component_router_view = resolveComponent("router-view");
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(SidebarProvider_default), {
				open: unref(workStore).sidebarOpen,
				"onUpdate:open": ($event) => unref(workStore).sidebarOpen = $event,
				class: "flex min-h-screen"
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(unref(Sidebar_default), {
							class: "-mr-1",
							collapsible: "icon",
							variant: "inset"
						}, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) {
									_push$2(ssrRenderComponent(unref(SidebarHeader_default), null, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) {
												_push$3(ssrRenderComponent(unref(SidebarMenu_default), null, {
													default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
														if (_push$4) _push$4(ssrRenderComponent(unref(SidebarMenuItem_default), { class: [{ "mx-2": unref(workStore).sidebarOpen }, "flex items-center gap-2"] }, {
															default: withCtx((_$4, _push$5, _parent$5, _scopeId$4) => {
																if (_push$5) {
																	_push$5(``);
																	if (unref(workStore).sidebarOpen) _push$5(`<div class="w-full font-semibold whitespace-nowrap"${_scopeId$4}> Detection Studio </div>`);
																	else _push$5(`<div class="pl-1 w-full font-semibold"${_scopeId$4}><img alt="Logo" class="w-7.5 h-7.5"${ssrRenderAttr("src", logo_default)}${_scopeId$4}></div>`);
																} else return [createVNode(Transition, {
																	"enter-active-class": "transition-opacity duration-100",
																	"enter-from-class": "opacity-0",
																	"enter-to-class": "opacity-100",
																	"leave-active-class": "transition-opacity duration-100",
																	"leave-from-class": "opacity-100",
																	"leave-to-class": "opacity-0",
																	mode: "out-in"
																}, {
																	default: withCtx(() => [unref(workStore).sidebarOpen ? (openBlock(), createBlock("div", {
																		key: "label",
																		class: "w-full font-semibold whitespace-nowrap"
																	}, " Detection Studio ")) : (openBlock(), createBlock("div", {
																		key: "logo",
																		class: "pl-1 w-full font-semibold"
																	}, [createVNode("img", {
																		alt: "Logo",
																		class: "w-7.5 h-7.5",
																		src: logo_default
																	})]))]),
																	_: 1
																})];
															}),
															_: 1
														}, _parent$4, _scopeId$3));
														else return [createVNode(unref(SidebarMenuItem_default), { class: [{ "mx-2": unref(workStore).sidebarOpen }, "flex items-center gap-2"] }, {
															default: withCtx(() => [createVNode(Transition, {
																"enter-active-class": "transition-opacity duration-100",
																"enter-from-class": "opacity-0",
																"enter-to-class": "opacity-100",
																"leave-active-class": "transition-opacity duration-100",
																"leave-from-class": "opacity-100",
																"leave-to-class": "opacity-0",
																mode: "out-in"
															}, {
																default: withCtx(() => [unref(workStore).sidebarOpen ? (openBlock(), createBlock("div", {
																	key: "label",
																	class: "w-full font-semibold whitespace-nowrap"
																}, " Detection Studio ")) : (openBlock(), createBlock("div", {
																	key: "logo",
																	class: "pl-1 w-full font-semibold"
																}, [createVNode("img", {
																	alt: "Logo",
																	class: "w-7.5 h-7.5",
																	src: logo_default
																})]))]),
																_: 1
															})]),
															_: 1
														}, 8, ["class"])];
													}),
													_: 1
												}, _parent$3, _scopeId$2));
												_push$3(ssrRenderComponent(unref(SidebarSeparator_default), { class: [{ "mx-2": unref(workStore).sidebarOpen }, "w-full bg-border! mx-0"] }, null, _parent$3, _scopeId$2));
												_push$3(ssrRenderComponent(unref(SidebarMenu_default), null, {
													default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
														if (_push$4) _push$4(ssrRenderComponent(unref(SidebarMenuItem_default), null, {
															default: withCtx((_$4, _push$5, _parent$5, _scopeId$4) => {
																if (_push$5) _push$5(ssrRenderComponent(WorkspaceSelection_default, null, null, _parent$5, _scopeId$4));
																else return [createVNode(WorkspaceSelection_default)];
															}),
															_: 1
														}, _parent$4, _scopeId$3));
														else return [createVNode(unref(SidebarMenuItem_default), null, {
															default: withCtx(() => [createVNode(WorkspaceSelection_default)]),
															_: 1
														})];
													}),
													_: 1
												}, _parent$3, _scopeId$2));
											} else return [
												createVNode(unref(SidebarMenu_default), null, {
													default: withCtx(() => [createVNode(unref(SidebarMenuItem_default), { class: [{ "mx-2": unref(workStore).sidebarOpen }, "flex items-center gap-2"] }, {
														default: withCtx(() => [createVNode(Transition, {
															"enter-active-class": "transition-opacity duration-100",
															"enter-from-class": "opacity-0",
															"enter-to-class": "opacity-100",
															"leave-active-class": "transition-opacity duration-100",
															"leave-from-class": "opacity-100",
															"leave-to-class": "opacity-0",
															mode: "out-in"
														}, {
															default: withCtx(() => [unref(workStore).sidebarOpen ? (openBlock(), createBlock("div", {
																key: "label",
																class: "w-full font-semibold whitespace-nowrap"
															}, " Detection Studio ")) : (openBlock(), createBlock("div", {
																key: "logo",
																class: "pl-1 w-full font-semibold"
															}, [createVNode("img", {
																alt: "Logo",
																class: "w-7.5 h-7.5",
																src: logo_default
															})]))]),
															_: 1
														})]),
														_: 1
													}, 8, ["class"])]),
													_: 1
												}),
												createVNode(unref(SidebarSeparator_default), { class: [{ "mx-2": unref(workStore).sidebarOpen }, "w-full bg-border! mx-0"] }, null, 8, ["class"]),
												createVNode(unref(SidebarMenu_default), null, {
													default: withCtx(() => [createVNode(unref(SidebarMenuItem_default), null, {
														default: withCtx(() => [createVNode(WorkspaceSelection_default)]),
														_: 1
													})]),
													_: 1
												})
											];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(ssrRenderComponent(unref(SidebarContent_default), null, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) {
												_push$3(ssrRenderComponent(unref(SidebarGroup_default), null, {
													default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
														if (_push$4) _push$4(ssrRenderComponent(unref(SidebarGroupContent_default), null, {
															default: withCtx((_$4, _push$5, _parent$5, _scopeId$4) => {
																if (_push$5) _push$5(ssrRenderComponent(unref(SidebarMenu_default), null, {
																	default: withCtx((_$5, _push$6, _parent$6, _scopeId$5) => {
																		if (_push$6) {
																			_push$6(ssrRenderComponent(unref(SidebarMenuItem_default), null, {
																				default: withCtx((_$6, _push$7, _parent$7, _scopeId$6) => {
																					if (_push$7) _push$7(ssrRenderComponent(_component_router_link, {
																						custom: "",
																						to: "/"
																					}, {
																						default: withCtx(({ isActive, navigate }, _push$8, _parent$8, _scopeId$7) => {
																							if (_push$8) _push$8(ssrRenderComponent(unref(SidebarMenuButton_default), {
																								active: isActive,
																								class: [{ "text-primary bg-primary/10": isActive }, "[active=true]/text-white"],
																								onClick: navigate
																							}, {
																								default: withCtx((_$7, _push$9, _parent$9, _scopeId$8) => {
																									if (_push$9) {
																										_push$9(ssrRenderComponent(unref(PaletteIcon), null, null, _parent$9, _scopeId$8));
																										_push$9(`<span${_scopeId$8}>Studio</span>`);
																									} else return [createVNode(unref(PaletteIcon)), createVNode("span", null, "Studio")];
																								}),
																								_: 2
																							}, _parent$8, _scopeId$7));
																							else return [createVNode(unref(SidebarMenuButton_default), {
																								active: isActive,
																								class: [{ "text-primary bg-primary/10": isActive }, "[active=true]/text-white"],
																								onClick: navigate
																							}, {
																								default: withCtx(() => [createVNode(unref(PaletteIcon)), createVNode("span", null, "Studio")]),
																								_: 1
																							}, 8, [
																								"active",
																								"class",
																								"onClick"
																							])];
																						}),
																						_: 1
																					}, _parent$7, _scopeId$6));
																					else return [createVNode(_component_router_link, {
																						custom: "",
																						to: "/"
																					}, {
																						default: withCtx(({ isActive, navigate }) => [createVNode(unref(SidebarMenuButton_default), {
																							active: isActive,
																							class: [{ "text-primary bg-primary/10": isActive }, "[active=true]/text-white"],
																							onClick: navigate
																						}, {
																							default: withCtx(() => [createVNode(unref(PaletteIcon)), createVNode("span", null, "Studio")]),
																							_: 1
																						}, 8, [
																							"active",
																							"class",
																							"onClick"
																						])]),
																						_: 1
																					})];
																				}),
																				_: 1
																			}, _parent$6, _scopeId$5));
																			_push$6(ssrRenderComponent(unref(SidebarMenuItem_default), null, {
																				default: withCtx((_$6, _push$7, _parent$7, _scopeId$6) => {
																					if (_push$7) _push$7(ssrRenderComponent(_component_router_link, {
																						custom: "",
																						to: "/browser"
																					}, {
																						default: withCtx(({ isActive, navigate }, _push$8, _parent$8, _scopeId$7) => {
																							if (_push$8) _push$8(ssrRenderComponent(unref(SidebarMenuButton_default), {
																								active: isActive,
																								class: { "text-primary bg-primary/10": isActive },
																								onClick: navigate
																							}, {
																								default: withCtx((_$7, _push$9, _parent$9, _scopeId$8) => {
																									if (_push$9) {
																										_push$9(ssrRenderComponent(unref(GlobeIcon), null, null, _parent$9, _scopeId$8));
																										_push$9(`<span${_scopeId$8}>Browser</span>`);
																									} else return [createVNode(unref(GlobeIcon)), createVNode("span", null, "Browser")];
																								}),
																								_: 2
																							}, _parent$8, _scopeId$7));
																							else return [createVNode(unref(SidebarMenuButton_default), {
																								active: isActive,
																								class: { "text-primary bg-primary/10": isActive },
																								onClick: navigate
																							}, {
																								default: withCtx(() => [createVNode(unref(GlobeIcon)), createVNode("span", null, "Browser")]),
																								_: 1
																							}, 8, [
																								"active",
																								"class",
																								"onClick"
																							])];
																						}),
																						_: 1
																					}, _parent$7, _scopeId$6));
																					else return [createVNode(_component_router_link, {
																						custom: "",
																						to: "/browser"
																					}, {
																						default: withCtx(({ isActive, navigate }) => [createVNode(unref(SidebarMenuButton_default), {
																							active: isActive,
																							class: { "text-primary bg-primary/10": isActive },
																							onClick: navigate
																						}, {
																							default: withCtx(() => [createVNode(unref(GlobeIcon)), createVNode("span", null, "Browser")]),
																							_: 1
																						}, 8, [
																							"active",
																							"class",
																							"onClick"
																						])]),
																						_: 1
																					})];
																				}),
																				_: 1
																			}, _parent$6, _scopeId$5));
																			_push$6(ssrRenderComponent(unref(SidebarMenuItem_default), null, {
																				default: withCtx((_$6, _push$7, _parent$7, _scopeId$6) => {
																					if (_push$7) _push$7(ssrRenderComponent(_component_router_link, {
																						custom: "",
																						disabled: "",
																						to: "/settings"
																					}, {
																						default: withCtx(({ isActive, navigate }, _push$8, _parent$8, _scopeId$7) => {
																							if (_push$8) _push$8(ssrRenderComponent(unref(SidebarMenuButton_default), {
																								active: isActive,
																								class: { "text-primary bg-primary/10": isActive },
																								disabled: "",
																								onClick: navigate
																							}, {
																								default: withCtx((_$7, _push$9, _parent$9, _scopeId$8) => {
																									if (_push$9) {
																										_push$9(ssrRenderComponent(unref(Settings2), null, null, _parent$9, _scopeId$8));
																										_push$9(`<span${_scopeId$8}>Settings</span>`);
																									} else return [createVNode(unref(Settings2)), createVNode("span", null, "Settings")];
																								}),
																								_: 2
																							}, _parent$8, _scopeId$7));
																							else return [createVNode(unref(SidebarMenuButton_default), {
																								active: isActive,
																								class: { "text-primary bg-primary/10": isActive },
																								disabled: "",
																								onClick: navigate
																							}, {
																								default: withCtx(() => [createVNode(unref(Settings2)), createVNode("span", null, "Settings")]),
																								_: 1
																							}, 8, [
																								"active",
																								"class",
																								"onClick"
																							])];
																						}),
																						_: 1
																					}, _parent$7, _scopeId$6));
																					else return [createVNode(_component_router_link, {
																						custom: "",
																						disabled: "",
																						to: "/settings"
																					}, {
																						default: withCtx(({ isActive, navigate }) => [createVNode(unref(SidebarMenuButton_default), {
																							active: isActive,
																							class: { "text-primary bg-primary/10": isActive },
																							disabled: "",
																							onClick: navigate
																						}, {
																							default: withCtx(() => [createVNode(unref(Settings2)), createVNode("span", null, "Settings")]),
																							_: 1
																						}, 8, [
																							"active",
																							"class",
																							"onClick"
																						])]),
																						_: 1
																					})];
																				}),
																				_: 1
																			}, _parent$6, _scopeId$5));
																		} else return [
																			createVNode(unref(SidebarMenuItem_default), null, {
																				default: withCtx(() => [createVNode(_component_router_link, {
																					custom: "",
																					to: "/"
																				}, {
																					default: withCtx(({ isActive, navigate }) => [createVNode(unref(SidebarMenuButton_default), {
																						active: isActive,
																						class: [{ "text-primary bg-primary/10": isActive }, "[active=true]/text-white"],
																						onClick: navigate
																					}, {
																						default: withCtx(() => [createVNode(unref(PaletteIcon)), createVNode("span", null, "Studio")]),
																						_: 1
																					}, 8, [
																						"active",
																						"class",
																						"onClick"
																					])]),
																					_: 1
																				})]),
																				_: 1
																			}),
																			createVNode(unref(SidebarMenuItem_default), null, {
																				default: withCtx(() => [createVNode(_component_router_link, {
																					custom: "",
																					to: "/browser"
																				}, {
																					default: withCtx(({ isActive, navigate }) => [createVNode(unref(SidebarMenuButton_default), {
																						active: isActive,
																						class: { "text-primary bg-primary/10": isActive },
																						onClick: navigate
																					}, {
																						default: withCtx(() => [createVNode(unref(GlobeIcon)), createVNode("span", null, "Browser")]),
																						_: 1
																					}, 8, [
																						"active",
																						"class",
																						"onClick"
																					])]),
																					_: 1
																				})]),
																				_: 1
																			}),
																			createVNode(unref(SidebarMenuItem_default), null, {
																				default: withCtx(() => [createVNode(_component_router_link, {
																					custom: "",
																					disabled: "",
																					to: "/settings"
																				}, {
																					default: withCtx(({ isActive, navigate }) => [createVNode(unref(SidebarMenuButton_default), {
																						active: isActive,
																						class: { "text-primary bg-primary/10": isActive },
																						disabled: "",
																						onClick: navigate
																					}, {
																						default: withCtx(() => [createVNode(unref(Settings2)), createVNode("span", null, "Settings")]),
																						_: 1
																					}, 8, [
																						"active",
																						"class",
																						"onClick"
																					])]),
																					_: 1
																				})]),
																				_: 1
																			})
																		];
																	}),
																	_: 1
																}, _parent$5, _scopeId$4));
																else return [createVNode(unref(SidebarMenu_default), null, {
																	default: withCtx(() => [
																		createVNode(unref(SidebarMenuItem_default), null, {
																			default: withCtx(() => [createVNode(_component_router_link, {
																				custom: "",
																				to: "/"
																			}, {
																				default: withCtx(({ isActive, navigate }) => [createVNode(unref(SidebarMenuButton_default), {
																					active: isActive,
																					class: [{ "text-primary bg-primary/10": isActive }, "[active=true]/text-white"],
																					onClick: navigate
																				}, {
																					default: withCtx(() => [createVNode(unref(PaletteIcon)), createVNode("span", null, "Studio")]),
																					_: 1
																				}, 8, [
																					"active",
																					"class",
																					"onClick"
																				])]),
																				_: 1
																			})]),
																			_: 1
																		}),
																		createVNode(unref(SidebarMenuItem_default), null, {
																			default: withCtx(() => [createVNode(_component_router_link, {
																				custom: "",
																				to: "/browser"
																			}, {
																				default: withCtx(({ isActive, navigate }) => [createVNode(unref(SidebarMenuButton_default), {
																					active: isActive,
																					class: { "text-primary bg-primary/10": isActive },
																					onClick: navigate
																				}, {
																					default: withCtx(() => [createVNode(unref(GlobeIcon)), createVNode("span", null, "Browser")]),
																					_: 1
																				}, 8, [
																					"active",
																					"class",
																					"onClick"
																				])]),
																				_: 1
																			})]),
																			_: 1
																		}),
																		createVNode(unref(SidebarMenuItem_default), null, {
																			default: withCtx(() => [createVNode(_component_router_link, {
																				custom: "",
																				disabled: "",
																				to: "/settings"
																			}, {
																				default: withCtx(({ isActive, navigate }) => [createVNode(unref(SidebarMenuButton_default), {
																					active: isActive,
																					class: { "text-primary bg-primary/10": isActive },
																					disabled: "",
																					onClick: navigate
																				}, {
																					default: withCtx(() => [createVNode(unref(Settings2)), createVNode("span", null, "Settings")]),
																					_: 1
																				}, 8, [
																					"active",
																					"class",
																					"onClick"
																				])]),
																				_: 1
																			})]),
																			_: 1
																		})
																	]),
																	_: 1
																})];
															}),
															_: 1
														}, _parent$4, _scopeId$3));
														else return [createVNode(unref(SidebarGroupContent_default), null, {
															default: withCtx(() => [createVNode(unref(SidebarMenu_default), null, {
																default: withCtx(() => [
																	createVNode(unref(SidebarMenuItem_default), null, {
																		default: withCtx(() => [createVNode(_component_router_link, {
																			custom: "",
																			to: "/"
																		}, {
																			default: withCtx(({ isActive, navigate }) => [createVNode(unref(SidebarMenuButton_default), {
																				active: isActive,
																				class: [{ "text-primary bg-primary/10": isActive }, "[active=true]/text-white"],
																				onClick: navigate
																			}, {
																				default: withCtx(() => [createVNode(unref(PaletteIcon)), createVNode("span", null, "Studio")]),
																				_: 1
																			}, 8, [
																				"active",
																				"class",
																				"onClick"
																			])]),
																			_: 1
																		})]),
																		_: 1
																	}),
																	createVNode(unref(SidebarMenuItem_default), null, {
																		default: withCtx(() => [createVNode(_component_router_link, {
																			custom: "",
																			to: "/browser"
																		}, {
																			default: withCtx(({ isActive, navigate }) => [createVNode(unref(SidebarMenuButton_default), {
																				active: isActive,
																				class: { "text-primary bg-primary/10": isActive },
																				onClick: navigate
																			}, {
																				default: withCtx(() => [createVNode(unref(GlobeIcon)), createVNode("span", null, "Browser")]),
																				_: 1
																			}, 8, [
																				"active",
																				"class",
																				"onClick"
																			])]),
																			_: 1
																		})]),
																		_: 1
																	}),
																	createVNode(unref(SidebarMenuItem_default), null, {
																		default: withCtx(() => [createVNode(_component_router_link, {
																			custom: "",
																			disabled: "",
																			to: "/settings"
																		}, {
																			default: withCtx(({ isActive, navigate }) => [createVNode(unref(SidebarMenuButton_default), {
																				active: isActive,
																				class: { "text-primary bg-primary/10": isActive },
																				disabled: "",
																				onClick: navigate
																			}, {
																				default: withCtx(() => [createVNode(unref(Settings2)), createVNode("span", null, "Settings")]),
																				_: 1
																			}, 8, [
																				"active",
																				"class",
																				"onClick"
																			])]),
																			_: 1
																		})]),
																		_: 1
																	})
																]),
																_: 1
															})]),
															_: 1
														})];
													}),
													_: 1
												}, _parent$3, _scopeId$2));
												_push$3(ssrRenderComponent(unref(SidebarGroup_default), { class: "group-data-[collapsible=icon]:hidden" }, {
													default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
														if (_push$4) {
															_push$4(ssrRenderComponent(unref(SidebarGroupLabel_default), { class: "text-muted-foreground" }, {
																default: withCtx((_$4, _push$5, _parent$5, _scopeId$4) => {
																	if (_push$5) _push$5(`Documentation `);
																	else return [createTextVNode("Documentation ")];
																}),
																_: 1
															}, _parent$4, _scopeId$3));
															_push$4(ssrRenderComponent(unref(SidebarGroupContent_default), null, {
																default: withCtx((_$4, _push$5, _parent$5, _scopeId$4) => {
																	if (_push$5) _push$5(ssrRenderComponent(unref(SidebarMenu_default), null, {
																		default: withCtx((_$5, _push$6, _parent$6, _scopeId$5) => {
																			if (_push$6) {
																				_push$6(`<!--[-->`);
																				ssrRenderList(data.documentation, (item) => {
																					_push$6(ssrRenderComponent(unref(Collapsible_default), {
																						key: item.title,
																						"default-open": true,
																						"as-child": "",
																						class: "group/collapsible"
																					}, {
																						default: withCtx((_$6, _push$7, _parent$7, _scopeId$6) => {
																							if (_push$7) _push$7(ssrRenderComponent(unref(SidebarMenuItem_default), null, {
																								default: withCtx((_$7, _push$8, _parent$8, _scopeId$7) => {
																									if (_push$8) {
																										_push$8(ssrRenderComponent(unref(CollapsibleTrigger_default), { "as-child": "" }, {
																											default: withCtx((_$8, _push$9, _parent$9, _scopeId$8) => {
																												if (_push$9) _push$9(ssrRenderComponent(unref(SidebarMenuButton_default), { tooltip: item.title }, {
																													default: withCtx((_$9, _push$10, _parent$10, _scopeId$9) => {
																														if (_push$10) {
																															ssrRenderVNode(_push$10, createVNode(resolveDynamicComponent(item.icon), null, null), _parent$10, _scopeId$9);
																															_push$10(`<span${_scopeId$9}>${ssrInterpolate(item.title)}</span>`);
																															_push$10(ssrRenderComponent(unref(ChevronRight), { class: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" }, null, _parent$10, _scopeId$9));
																														} else return [
																															(openBlock(), createBlock(resolveDynamicComponent(item.icon))),
																															createVNode("span", null, toDisplayString(item.title), 1),
																															createVNode(unref(ChevronRight), { class: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" })
																														];
																													}),
																													_: 2
																												}, _parent$9, _scopeId$8));
																												else return [createVNode(unref(SidebarMenuButton_default), { tooltip: item.title }, {
																													default: withCtx(() => [
																														(openBlock(), createBlock(resolveDynamicComponent(item.icon))),
																														createVNode("span", null, toDisplayString(item.title), 1),
																														createVNode(unref(ChevronRight), { class: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" })
																													]),
																													_: 2
																												}, 1032, ["tooltip"])];
																											}),
																											_: 2
																										}, _parent$8, _scopeId$7));
																										_push$8(ssrRenderComponent(unref(CollapsibleContent_default), null, {
																											default: withCtx((_$8, _push$9, _parent$9, _scopeId$8) => {
																												if (_push$9) _push$9(ssrRenderComponent(unref(SidebarMenuSub_default), null, {
																													default: withCtx((_$9, _push$10, _parent$10, _scopeId$9) => {
																														if (_push$10) {
																															_push$10(`<!--[-->`);
																															ssrRenderList(item.items, (subItem) => {
																																_push$10(ssrRenderComponent(unref(SidebarMenuSubItem_default), { key: subItem.title }, {
																																	default: withCtx((_$10, _push$11, _parent$11, _scopeId$10) => {
																																		if (_push$11) _push$11(ssrRenderComponent(unref(SidebarMenuSubButton_default), { "as-child": "" }, {
																																			default: withCtx((_$11, _push$12, _parent$12, _scopeId$11) => {
																																				if (_push$12) _push$12(`<a${ssrRenderAttr("href", subItem.url)} target="_blank"${_scopeId$11}><span${_scopeId$11}>${ssrInterpolate(subItem.title)}</span></a>`);
																																				else return [createVNode("a", {
																																					href: subItem.url,
																																					target: "_blank"
																																				}, [createVNode("span", null, toDisplayString(subItem.title), 1)], 8, ["href"])];
																																			}),
																																			_: 2
																																		}, _parent$11, _scopeId$10));
																																		else return [createVNode(unref(SidebarMenuSubButton_default), { "as-child": "" }, {
																																			default: withCtx(() => [createVNode("a", {
																																				href: subItem.url,
																																				target: "_blank"
																																			}, [createVNode("span", null, toDisplayString(subItem.title), 1)], 8, ["href"])]),
																																			_: 2
																																		}, 1024)];
																																	}),
																																	_: 2
																																}, _parent$10, _scopeId$9));
																															});
																															_push$10(`<!--]-->`);
																														} else return [(openBlock(true), createBlock(Fragment, null, renderList(item.items, (subItem) => {
																															return openBlock(), createBlock(unref(SidebarMenuSubItem_default), { key: subItem.title }, {
																																default: withCtx(() => [createVNode(unref(SidebarMenuSubButton_default), { "as-child": "" }, {
																																	default: withCtx(() => [createVNode("a", {
																																		href: subItem.url,
																																		target: "_blank"
																																	}, [createVNode("span", null, toDisplayString(subItem.title), 1)], 8, ["href"])]),
																																	_: 2
																																}, 1024)]),
																																_: 2
																															}, 1024);
																														}), 128))];
																													}),
																													_: 2
																												}, _parent$9, _scopeId$8));
																												else return [createVNode(unref(SidebarMenuSub_default), null, {
																													default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(item.items, (subItem) => {
																														return openBlock(), createBlock(unref(SidebarMenuSubItem_default), { key: subItem.title }, {
																															default: withCtx(() => [createVNode(unref(SidebarMenuSubButton_default), { "as-child": "" }, {
																																default: withCtx(() => [createVNode("a", {
																																	href: subItem.url,
																																	target: "_blank"
																																}, [createVNode("span", null, toDisplayString(subItem.title), 1)], 8, ["href"])]),
																																_: 2
																															}, 1024)]),
																															_: 2
																														}, 1024);
																													}), 128))]),
																													_: 2
																												}, 1024)];
																											}),
																											_: 2
																										}, _parent$8, _scopeId$7));
																									} else return [createVNode(unref(CollapsibleTrigger_default), { "as-child": "" }, {
																										default: withCtx(() => [createVNode(unref(SidebarMenuButton_default), { tooltip: item.title }, {
																											default: withCtx(() => [
																												(openBlock(), createBlock(resolveDynamicComponent(item.icon))),
																												createVNode("span", null, toDisplayString(item.title), 1),
																												createVNode(unref(ChevronRight), { class: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" })
																											]),
																											_: 2
																										}, 1032, ["tooltip"])]),
																										_: 2
																									}, 1024), createVNode(unref(CollapsibleContent_default), null, {
																										default: withCtx(() => [createVNode(unref(SidebarMenuSub_default), null, {
																											default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(item.items, (subItem) => {
																												return openBlock(), createBlock(unref(SidebarMenuSubItem_default), { key: subItem.title }, {
																													default: withCtx(() => [createVNode(unref(SidebarMenuSubButton_default), { "as-child": "" }, {
																														default: withCtx(() => [createVNode("a", {
																															href: subItem.url,
																															target: "_blank"
																														}, [createVNode("span", null, toDisplayString(subItem.title), 1)], 8, ["href"])]),
																														_: 2
																													}, 1024)]),
																													_: 2
																												}, 1024);
																											}), 128))]),
																											_: 2
																										}, 1024)]),
																										_: 2
																									}, 1024)];
																								}),
																								_: 2
																							}, _parent$7, _scopeId$6));
																							else return [createVNode(unref(SidebarMenuItem_default), null, {
																								default: withCtx(() => [createVNode(unref(CollapsibleTrigger_default), { "as-child": "" }, {
																									default: withCtx(() => [createVNode(unref(SidebarMenuButton_default), { tooltip: item.title }, {
																										default: withCtx(() => [
																											(openBlock(), createBlock(resolveDynamicComponent(item.icon))),
																											createVNode("span", null, toDisplayString(item.title), 1),
																											createVNode(unref(ChevronRight), { class: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" })
																										]),
																										_: 2
																									}, 1032, ["tooltip"])]),
																									_: 2
																								}, 1024), createVNode(unref(CollapsibleContent_default), null, {
																									default: withCtx(() => [createVNode(unref(SidebarMenuSub_default), null, {
																										default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(item.items, (subItem) => {
																											return openBlock(), createBlock(unref(SidebarMenuSubItem_default), { key: subItem.title }, {
																												default: withCtx(() => [createVNode(unref(SidebarMenuSubButton_default), { "as-child": "" }, {
																													default: withCtx(() => [createVNode("a", {
																														href: subItem.url,
																														target: "_blank"
																													}, [createVNode("span", null, toDisplayString(subItem.title), 1)], 8, ["href"])]),
																													_: 2
																												}, 1024)]),
																												_: 2
																											}, 1024);
																										}), 128))]),
																										_: 2
																									}, 1024)]),
																									_: 2
																								}, 1024)]),
																								_: 2
																							}, 1024)];
																						}),
																						_: 2
																					}, _parent$6, _scopeId$5));
																				});
																				_push$6(`<!--]-->`);
																			} else return [(openBlock(true), createBlock(Fragment, null, renderList(data.documentation, (item) => {
																				return openBlock(), createBlock(unref(Collapsible_default), {
																					key: item.title,
																					"default-open": true,
																					"as-child": "",
																					class: "group/collapsible"
																				}, {
																					default: withCtx(() => [createVNode(unref(SidebarMenuItem_default), null, {
																						default: withCtx(() => [createVNode(unref(CollapsibleTrigger_default), { "as-child": "" }, {
																							default: withCtx(() => [createVNode(unref(SidebarMenuButton_default), { tooltip: item.title }, {
																								default: withCtx(() => [
																									(openBlock(), createBlock(resolveDynamicComponent(item.icon))),
																									createVNode("span", null, toDisplayString(item.title), 1),
																									createVNode(unref(ChevronRight), { class: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" })
																								]),
																								_: 2
																							}, 1032, ["tooltip"])]),
																							_: 2
																						}, 1024), createVNode(unref(CollapsibleContent_default), null, {
																							default: withCtx(() => [createVNode(unref(SidebarMenuSub_default), null, {
																								default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(item.items, (subItem) => {
																									return openBlock(), createBlock(unref(SidebarMenuSubItem_default), { key: subItem.title }, {
																										default: withCtx(() => [createVNode(unref(SidebarMenuSubButton_default), { "as-child": "" }, {
																											default: withCtx(() => [createVNode("a", {
																												href: subItem.url,
																												target: "_blank"
																											}, [createVNode("span", null, toDisplayString(subItem.title), 1)], 8, ["href"])]),
																											_: 2
																										}, 1024)]),
																										_: 2
																									}, 1024);
																								}), 128))]),
																								_: 2
																							}, 1024)]),
																							_: 2
																						}, 1024)]),
																						_: 2
																					}, 1024)]),
																					_: 2
																				}, 1024);
																			}), 128))];
																		}),
																		_: 1
																	}, _parent$5, _scopeId$4));
																	else return [createVNode(unref(SidebarMenu_default), null, {
																		default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(data.documentation, (item) => {
																			return openBlock(), createBlock(unref(Collapsible_default), {
																				key: item.title,
																				"default-open": true,
																				"as-child": "",
																				class: "group/collapsible"
																			}, {
																				default: withCtx(() => [createVNode(unref(SidebarMenuItem_default), null, {
																					default: withCtx(() => [createVNode(unref(CollapsibleTrigger_default), { "as-child": "" }, {
																						default: withCtx(() => [createVNode(unref(SidebarMenuButton_default), { tooltip: item.title }, {
																							default: withCtx(() => [
																								(openBlock(), createBlock(resolveDynamicComponent(item.icon))),
																								createVNode("span", null, toDisplayString(item.title), 1),
																								createVNode(unref(ChevronRight), { class: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" })
																							]),
																							_: 2
																						}, 1032, ["tooltip"])]),
																						_: 2
																					}, 1024), createVNode(unref(CollapsibleContent_default), null, {
																						default: withCtx(() => [createVNode(unref(SidebarMenuSub_default), null, {
																							default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(item.items, (subItem) => {
																								return openBlock(), createBlock(unref(SidebarMenuSubItem_default), { key: subItem.title }, {
																									default: withCtx(() => [createVNode(unref(SidebarMenuSubButton_default), { "as-child": "" }, {
																										default: withCtx(() => [createVNode("a", {
																											href: subItem.url,
																											target: "_blank"
																										}, [createVNode("span", null, toDisplayString(subItem.title), 1)], 8, ["href"])]),
																										_: 2
																									}, 1024)]),
																									_: 2
																								}, 1024);
																							}), 128))]),
																							_: 2
																						}, 1024)]),
																						_: 2
																					}, 1024)]),
																					_: 2
																				}, 1024)]),
																				_: 2
																			}, 1024);
																		}), 128))]),
																		_: 1
																	})];
																}),
																_: 1
															}, _parent$4, _scopeId$3));
														} else return [createVNode(unref(SidebarGroupLabel_default), { class: "text-muted-foreground" }, {
															default: withCtx(() => [createTextVNode("Documentation ")]),
															_: 1
														}), createVNode(unref(SidebarGroupContent_default), null, {
															default: withCtx(() => [createVNode(unref(SidebarMenu_default), null, {
																default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(data.documentation, (item) => {
																	return openBlock(), createBlock(unref(Collapsible_default), {
																		key: item.title,
																		"default-open": true,
																		"as-child": "",
																		class: "group/collapsible"
																	}, {
																		default: withCtx(() => [createVNode(unref(SidebarMenuItem_default), null, {
																			default: withCtx(() => [createVNode(unref(CollapsibleTrigger_default), { "as-child": "" }, {
																				default: withCtx(() => [createVNode(unref(SidebarMenuButton_default), { tooltip: item.title }, {
																					default: withCtx(() => [
																						(openBlock(), createBlock(resolveDynamicComponent(item.icon))),
																						createVNode("span", null, toDisplayString(item.title), 1),
																						createVNode(unref(ChevronRight), { class: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" })
																					]),
																					_: 2
																				}, 1032, ["tooltip"])]),
																				_: 2
																			}, 1024), createVNode(unref(CollapsibleContent_default), null, {
																				default: withCtx(() => [createVNode(unref(SidebarMenuSub_default), null, {
																					default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(item.items, (subItem) => {
																						return openBlock(), createBlock(unref(SidebarMenuSubItem_default), { key: subItem.title }, {
																							default: withCtx(() => [createVNode(unref(SidebarMenuSubButton_default), { "as-child": "" }, {
																								default: withCtx(() => [createVNode("a", {
																									href: subItem.url,
																									target: "_blank"
																								}, [createVNode("span", null, toDisplayString(subItem.title), 1)], 8, ["href"])]),
																								_: 2
																							}, 1024)]),
																							_: 2
																						}, 1024);
																					}), 128))]),
																					_: 2
																				}, 1024)]),
																				_: 2
																			}, 1024)]),
																			_: 2
																		}, 1024)]),
																		_: 2
																	}, 1024);
																}), 128))]),
																_: 1
															})]),
															_: 1
														})];
													}),
													_: 1
												}, _parent$3, _scopeId$2));
											} else return [createVNode(unref(SidebarGroup_default), null, {
												default: withCtx(() => [createVNode(unref(SidebarGroupContent_default), null, {
													default: withCtx(() => [createVNode(unref(SidebarMenu_default), null, {
														default: withCtx(() => [
															createVNode(unref(SidebarMenuItem_default), null, {
																default: withCtx(() => [createVNode(_component_router_link, {
																	custom: "",
																	to: "/"
																}, {
																	default: withCtx(({ isActive, navigate }) => [createVNode(unref(SidebarMenuButton_default), {
																		active: isActive,
																		class: [{ "text-primary bg-primary/10": isActive }, "[active=true]/text-white"],
																		onClick: navigate
																	}, {
																		default: withCtx(() => [createVNode(unref(PaletteIcon)), createVNode("span", null, "Studio")]),
																		_: 1
																	}, 8, [
																		"active",
																		"class",
																		"onClick"
																	])]),
																	_: 1
																})]),
																_: 1
															}),
															createVNode(unref(SidebarMenuItem_default), null, {
																default: withCtx(() => [createVNode(_component_router_link, {
																	custom: "",
																	to: "/browser"
																}, {
																	default: withCtx(({ isActive, navigate }) => [createVNode(unref(SidebarMenuButton_default), {
																		active: isActive,
																		class: { "text-primary bg-primary/10": isActive },
																		onClick: navigate
																	}, {
																		default: withCtx(() => [createVNode(unref(GlobeIcon)), createVNode("span", null, "Browser")]),
																		_: 1
																	}, 8, [
																		"active",
																		"class",
																		"onClick"
																	])]),
																	_: 1
																})]),
																_: 1
															}),
															createVNode(unref(SidebarMenuItem_default), null, {
																default: withCtx(() => [createVNode(_component_router_link, {
																	custom: "",
																	disabled: "",
																	to: "/settings"
																}, {
																	default: withCtx(({ isActive, navigate }) => [createVNode(unref(SidebarMenuButton_default), {
																		active: isActive,
																		class: { "text-primary bg-primary/10": isActive },
																		disabled: "",
																		onClick: navigate
																	}, {
																		default: withCtx(() => [createVNode(unref(Settings2)), createVNode("span", null, "Settings")]),
																		_: 1
																	}, 8, [
																		"active",
																		"class",
																		"onClick"
																	])]),
																	_: 1
																})]),
																_: 1
															})
														]),
														_: 1
													})]),
													_: 1
												})]),
												_: 1
											}), createVNode(unref(SidebarGroup_default), { class: "group-data-[collapsible=icon]:hidden" }, {
												default: withCtx(() => [createVNode(unref(SidebarGroupLabel_default), { class: "text-muted-foreground" }, {
													default: withCtx(() => [createTextVNode("Documentation ")]),
													_: 1
												}), createVNode(unref(SidebarGroupContent_default), null, {
													default: withCtx(() => [createVNode(unref(SidebarMenu_default), null, {
														default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(data.documentation, (item) => {
															return openBlock(), createBlock(unref(Collapsible_default), {
																key: item.title,
																"default-open": true,
																"as-child": "",
																class: "group/collapsible"
															}, {
																default: withCtx(() => [createVNode(unref(SidebarMenuItem_default), null, {
																	default: withCtx(() => [createVNode(unref(CollapsibleTrigger_default), { "as-child": "" }, {
																		default: withCtx(() => [createVNode(unref(SidebarMenuButton_default), { tooltip: item.title }, {
																			default: withCtx(() => [
																				(openBlock(), createBlock(resolveDynamicComponent(item.icon))),
																				createVNode("span", null, toDisplayString(item.title), 1),
																				createVNode(unref(ChevronRight), { class: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" })
																			]),
																			_: 2
																		}, 1032, ["tooltip"])]),
																		_: 2
																	}, 1024), createVNode(unref(CollapsibleContent_default), null, {
																		default: withCtx(() => [createVNode(unref(SidebarMenuSub_default), null, {
																			default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(item.items, (subItem) => {
																				return openBlock(), createBlock(unref(SidebarMenuSubItem_default), { key: subItem.title }, {
																					default: withCtx(() => [createVNode(unref(SidebarMenuSubButton_default), { "as-child": "" }, {
																						default: withCtx(() => [createVNode("a", {
																							href: subItem.url,
																							target: "_blank"
																						}, [createVNode("span", null, toDisplayString(subItem.title), 1)], 8, ["href"])]),
																						_: 2
																					}, 1024)]),
																					_: 2
																				}, 1024);
																			}), 128))]),
																			_: 2
																		}, 1024)]),
																		_: 2
																	}, 1024)]),
																	_: 2
																}, 1024)]),
																_: 2
															}, 1024);
														}), 128))]),
														_: 1
													})]),
													_: 1
												})]),
												_: 1
											})];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(ssrRenderComponent(unref(SidebarFooter_default), null, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) _push$3(ssrRenderComponent(unref(SidebarMenu_default), null, {
												default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
													if (_push$4) {
														_push$4(ssrRenderComponent(unref(SidebarMenuItem_default), null, {
															default: withCtx((_$4, _push$5, _parent$5, _scopeId$4) => {
																if (_push$5) _push$5(ssrRenderComponent(unref(SidebarMenuButton_default), {
																	class: "relative",
																	tooltip: "Changelog",
																	onClick: openChangelog
																}, {
																	default: withCtx((_$5, _push$6, _parent$6, _scopeId$5) => {
																		if (_push$6) {
																			_push$6(ssrRenderComponent(unref(FileText), null, null, _parent$6, _scopeId$5));
																			_push$6(`<span${_scopeId$5}>What&#39;s New</span><div class="relative flex size-3"${_scopeId$5}><div class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"${_scopeId$5}></div><div class="relative inline-flex size-3 rounded-full bg-sky-500"${_scopeId$5}></div></div>`);
																		} else return [
																			createVNode(unref(FileText)),
																			createVNode("span", null, "What's New"),
																			createVNode("div", { class: "relative flex size-3" }, [createVNode("div", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" }), createVNode("div", { class: "relative inline-flex size-3 rounded-full bg-sky-500" })])
																		];
																	}),
																	_: 1
																}, _parent$5, _scopeId$4));
																else return [createVNode(unref(SidebarMenuButton_default), {
																	class: "relative",
																	tooltip: "Changelog",
																	onClick: openChangelog
																}, {
																	default: withCtx(() => [
																		createVNode(unref(FileText)),
																		createVNode("span", null, "What's New"),
																		createVNode("div", { class: "relative flex size-3" }, [createVNode("div", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" }), createVNode("div", { class: "relative inline-flex size-3 rounded-full bg-sky-500" })])
																	]),
																	_: 1
																})];
															}),
															_: 1
														}, _parent$4, _scopeId$3));
														_push$4(ssrRenderComponent(unref(SidebarMenuItem_default), null, {
															default: withCtx((_$4, _push$5, _parent$5, _scopeId$4) => {
																if (_push$5) {
																	_push$5(``);
																	if (unref(workStore).sidebarOpen) _push$5(ssrRenderComponent(unref(Card_default), { class: "text-xs text-muted-foreground p-2 flex items-center gap-2" }, {
																		default: withCtx((_$5, _push$6, _parent$6, _scopeId$5) => {
																			if (_push$6) {
																				_push$6(` Powered by `);
																				_push$6(ssrRenderComponent(unref(Sparkles), { class: "text-primary h-4 w-4" }, null, _parent$6, _scopeId$5));
																				_push$6(`<a class="text-primary font-semibold" href="https://north.sh/" target="_blank"${_scopeId$5}> north.sh </a>`);
																			} else return [
																				createTextVNode(" Powered by "),
																				createVNode(unref(Sparkles), { class: "text-primary h-4 w-4" }),
																				createVNode("a", {
																					class: "text-primary font-semibold",
																					href: "https://north.sh/",
																					target: "_blank"
																				}, " north.sh ")
																			];
																		}),
																		_: 1
																	}, _parent$5, _scopeId$4));
																	else _push$5(`<!---->`);
																} else return [createVNode(Transition, null, {
																	default: withCtx(() => [unref(workStore).sidebarOpen ? (openBlock(), createBlock(unref(Card_default), {
																		key: 0,
																		class: "text-xs text-muted-foreground p-2 flex items-center gap-2"
																	}, {
																		default: withCtx(() => [
																			createTextVNode(" Powered by "),
																			createVNode(unref(Sparkles), { class: "text-primary h-4 w-4" }),
																			createVNode("a", {
																				class: "text-primary font-semibold",
																				href: "https://north.sh/",
																				target: "_blank"
																			}, " north.sh ")
																		]),
																		_: 1
																	})) : createCommentVNode("", true)]),
																	_: 1
																})];
															}),
															_: 1
														}, _parent$4, _scopeId$3));
													} else return [createVNode(unref(SidebarMenuItem_default), null, {
														default: withCtx(() => [createVNode(unref(SidebarMenuButton_default), {
															class: "relative",
															tooltip: "Changelog",
															onClick: openChangelog
														}, {
															default: withCtx(() => [
																createVNode(unref(FileText)),
																createVNode("span", null, "What's New"),
																createVNode("div", { class: "relative flex size-3" }, [createVNode("div", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" }), createVNode("div", { class: "relative inline-flex size-3 rounded-full bg-sky-500" })])
															]),
															_: 1
														})]),
														_: 1
													}), createVNode(unref(SidebarMenuItem_default), null, {
														default: withCtx(() => [createVNode(Transition, null, {
															default: withCtx(() => [unref(workStore).sidebarOpen ? (openBlock(), createBlock(unref(Card_default), {
																key: 0,
																class: "text-xs text-muted-foreground p-2 flex items-center gap-2"
															}, {
																default: withCtx(() => [
																	createTextVNode(" Powered by "),
																	createVNode(unref(Sparkles), { class: "text-primary h-4 w-4" }),
																	createVNode("a", {
																		class: "text-primary font-semibold",
																		href: "https://north.sh/",
																		target: "_blank"
																	}, " north.sh ")
																]),
																_: 1
															})) : createCommentVNode("", true)]),
															_: 1
														})]),
														_: 1
													})];
												}),
												_: 1
											}, _parent$3, _scopeId$2));
											else return [createVNode(unref(SidebarMenu_default), null, {
												default: withCtx(() => [createVNode(unref(SidebarMenuItem_default), null, {
													default: withCtx(() => [createVNode(unref(SidebarMenuButton_default), {
														class: "relative",
														tooltip: "Changelog",
														onClick: openChangelog
													}, {
														default: withCtx(() => [
															createVNode(unref(FileText)),
															createVNode("span", null, "What's New"),
															createVNode("div", { class: "relative flex size-3" }, [createVNode("div", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" }), createVNode("div", { class: "relative inline-flex size-3 rounded-full bg-sky-500" })])
														]),
														_: 1
													})]),
													_: 1
												}), createVNode(unref(SidebarMenuItem_default), null, {
													default: withCtx(() => [createVNode(Transition, null, {
														default: withCtx(() => [unref(workStore).sidebarOpen ? (openBlock(), createBlock(unref(Card_default), {
															key: 0,
															class: "text-xs text-muted-foreground p-2 flex items-center gap-2"
														}, {
															default: withCtx(() => [
																createTextVNode(" Powered by "),
																createVNode(unref(Sparkles), { class: "text-primary h-4 w-4" }),
																createVNode("a", {
																	class: "text-primary font-semibold",
																	href: "https://north.sh/",
																	target: "_blank"
																}, " north.sh ")
															]),
															_: 1
														})) : createCommentVNode("", true)]),
														_: 1
													})]),
													_: 1
												})]),
												_: 1
											})];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(ssrRenderComponent(unref(SidebarRail_default), null, null, _parent$2, _scopeId$1));
								} else return [
									createVNode(unref(SidebarHeader_default), null, {
										default: withCtx(() => [
											createVNode(unref(SidebarMenu_default), null, {
												default: withCtx(() => [createVNode(unref(SidebarMenuItem_default), { class: [{ "mx-2": unref(workStore).sidebarOpen }, "flex items-center gap-2"] }, {
													default: withCtx(() => [createVNode(Transition, {
														"enter-active-class": "transition-opacity duration-100",
														"enter-from-class": "opacity-0",
														"enter-to-class": "opacity-100",
														"leave-active-class": "transition-opacity duration-100",
														"leave-from-class": "opacity-100",
														"leave-to-class": "opacity-0",
														mode: "out-in"
													}, {
														default: withCtx(() => [unref(workStore).sidebarOpen ? (openBlock(), createBlock("div", {
															key: "label",
															class: "w-full font-semibold whitespace-nowrap"
														}, " Detection Studio ")) : (openBlock(), createBlock("div", {
															key: "logo",
															class: "pl-1 w-full font-semibold"
														}, [createVNode("img", {
															alt: "Logo",
															class: "w-7.5 h-7.5",
															src: logo_default
														})]))]),
														_: 1
													})]),
													_: 1
												}, 8, ["class"])]),
												_: 1
											}),
											createVNode(unref(SidebarSeparator_default), { class: [{ "mx-2": unref(workStore).sidebarOpen }, "w-full bg-border! mx-0"] }, null, 8, ["class"]),
											createVNode(unref(SidebarMenu_default), null, {
												default: withCtx(() => [createVNode(unref(SidebarMenuItem_default), null, {
													default: withCtx(() => [createVNode(WorkspaceSelection_default)]),
													_: 1
												})]),
												_: 1
											})
										]),
										_: 1
									}),
									createVNode(unref(SidebarContent_default), null, {
										default: withCtx(() => [createVNode(unref(SidebarGroup_default), null, {
											default: withCtx(() => [createVNode(unref(SidebarGroupContent_default), null, {
												default: withCtx(() => [createVNode(unref(SidebarMenu_default), null, {
													default: withCtx(() => [
														createVNode(unref(SidebarMenuItem_default), null, {
															default: withCtx(() => [createVNode(_component_router_link, {
																custom: "",
																to: "/"
															}, {
																default: withCtx(({ isActive, navigate }) => [createVNode(unref(SidebarMenuButton_default), {
																	active: isActive,
																	class: [{ "text-primary bg-primary/10": isActive }, "[active=true]/text-white"],
																	onClick: navigate
																}, {
																	default: withCtx(() => [createVNode(unref(PaletteIcon)), createVNode("span", null, "Studio")]),
																	_: 1
																}, 8, [
																	"active",
																	"class",
																	"onClick"
																])]),
																_: 1
															})]),
															_: 1
														}),
														createVNode(unref(SidebarMenuItem_default), null, {
															default: withCtx(() => [createVNode(_component_router_link, {
																custom: "",
																to: "/browser"
															}, {
																default: withCtx(({ isActive, navigate }) => [createVNode(unref(SidebarMenuButton_default), {
																	active: isActive,
																	class: { "text-primary bg-primary/10": isActive },
																	onClick: navigate
																}, {
																	default: withCtx(() => [createVNode(unref(GlobeIcon)), createVNode("span", null, "Browser")]),
																	_: 1
																}, 8, [
																	"active",
																	"class",
																	"onClick"
																])]),
																_: 1
															})]),
															_: 1
														}),
														createVNode(unref(SidebarMenuItem_default), null, {
															default: withCtx(() => [createVNode(_component_router_link, {
																custom: "",
																disabled: "",
																to: "/settings"
															}, {
																default: withCtx(({ isActive, navigate }) => [createVNode(unref(SidebarMenuButton_default), {
																	active: isActive,
																	class: { "text-primary bg-primary/10": isActive },
																	disabled: "",
																	onClick: navigate
																}, {
																	default: withCtx(() => [createVNode(unref(Settings2)), createVNode("span", null, "Settings")]),
																	_: 1
																}, 8, [
																	"active",
																	"class",
																	"onClick"
																])]),
																_: 1
															})]),
															_: 1
														})
													]),
													_: 1
												})]),
												_: 1
											})]),
											_: 1
										}), createVNode(unref(SidebarGroup_default), { class: "group-data-[collapsible=icon]:hidden" }, {
											default: withCtx(() => [createVNode(unref(SidebarGroupLabel_default), { class: "text-muted-foreground" }, {
												default: withCtx(() => [createTextVNode("Documentation ")]),
												_: 1
											}), createVNode(unref(SidebarGroupContent_default), null, {
												default: withCtx(() => [createVNode(unref(SidebarMenu_default), null, {
													default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(data.documentation, (item) => {
														return openBlock(), createBlock(unref(Collapsible_default), {
															key: item.title,
															"default-open": true,
															"as-child": "",
															class: "group/collapsible"
														}, {
															default: withCtx(() => [createVNode(unref(SidebarMenuItem_default), null, {
																default: withCtx(() => [createVNode(unref(CollapsibleTrigger_default), { "as-child": "" }, {
																	default: withCtx(() => [createVNode(unref(SidebarMenuButton_default), { tooltip: item.title }, {
																		default: withCtx(() => [
																			(openBlock(), createBlock(resolveDynamicComponent(item.icon))),
																			createVNode("span", null, toDisplayString(item.title), 1),
																			createVNode(unref(ChevronRight), { class: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" })
																		]),
																		_: 2
																	}, 1032, ["tooltip"])]),
																	_: 2
																}, 1024), createVNode(unref(CollapsibleContent_default), null, {
																	default: withCtx(() => [createVNode(unref(SidebarMenuSub_default), null, {
																		default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(item.items, (subItem) => {
																			return openBlock(), createBlock(unref(SidebarMenuSubItem_default), { key: subItem.title }, {
																				default: withCtx(() => [createVNode(unref(SidebarMenuSubButton_default), { "as-child": "" }, {
																					default: withCtx(() => [createVNode("a", {
																						href: subItem.url,
																						target: "_blank"
																					}, [createVNode("span", null, toDisplayString(subItem.title), 1)], 8, ["href"])]),
																					_: 2
																				}, 1024)]),
																				_: 2
																			}, 1024);
																		}), 128))]),
																		_: 2
																	}, 1024)]),
																	_: 2
																}, 1024)]),
																_: 2
															}, 1024)]),
															_: 2
														}, 1024);
													}), 128))]),
													_: 1
												})]),
												_: 1
											})]),
											_: 1
										})]),
										_: 1
									}),
									createVNode(unref(SidebarFooter_default), null, {
										default: withCtx(() => [createVNode(unref(SidebarMenu_default), null, {
											default: withCtx(() => [createVNode(unref(SidebarMenuItem_default), null, {
												default: withCtx(() => [createVNode(unref(SidebarMenuButton_default), {
													class: "relative",
													tooltip: "Changelog",
													onClick: openChangelog
												}, {
													default: withCtx(() => [
														createVNode(unref(FileText)),
														createVNode("span", null, "What's New"),
														createVNode("div", { class: "relative flex size-3" }, [createVNode("div", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" }), createVNode("div", { class: "relative inline-flex size-3 rounded-full bg-sky-500" })])
													]),
													_: 1
												})]),
												_: 1
											}), createVNode(unref(SidebarMenuItem_default), null, {
												default: withCtx(() => [createVNode(Transition, null, {
													default: withCtx(() => [unref(workStore).sidebarOpen ? (openBlock(), createBlock(unref(Card_default), {
														key: 0,
														class: "text-xs text-muted-foreground p-2 flex items-center gap-2"
													}, {
														default: withCtx(() => [
															createTextVNode(" Powered by "),
															createVNode(unref(Sparkles), { class: "text-primary h-4 w-4" }),
															createVNode("a", {
																class: "text-primary font-semibold",
																href: "https://north.sh/",
																target: "_blank"
															}, " north.sh ")
														]),
														_: 1
													})) : createCommentVNode("", true)]),
													_: 1
												})]),
												_: 1
											})]),
											_: 1
										})]),
										_: 1
									}),
									createVNode(unref(SidebarRail_default))
								];
							}),
							_: 1
						}, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(SidebarInset_default), { class: "bg-muted/30 flex-1 flex flex-col overflow-hidden" }, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) _push$2(ssrRenderComponent(_component_router_view, { class: "flex-1 w-full overflow-hidden" }, null, _parent$2, _scopeId$1));
								else return [createVNode(_component_router_view, { class: "flex-1 w-full overflow-hidden" })];
							}),
							_: 1
						}, _parent$1, _scopeId));
					} else return [createVNode(unref(Sidebar_default), {
						class: "-mr-1",
						collapsible: "icon",
						variant: "inset"
					}, {
						default: withCtx(() => [
							createVNode(unref(SidebarHeader_default), null, {
								default: withCtx(() => [
									createVNode(unref(SidebarMenu_default), null, {
										default: withCtx(() => [createVNode(unref(SidebarMenuItem_default), { class: [{ "mx-2": unref(workStore).sidebarOpen }, "flex items-center gap-2"] }, {
											default: withCtx(() => [createVNode(Transition, {
												"enter-active-class": "transition-opacity duration-100",
												"enter-from-class": "opacity-0",
												"enter-to-class": "opacity-100",
												"leave-active-class": "transition-opacity duration-100",
												"leave-from-class": "opacity-100",
												"leave-to-class": "opacity-0",
												mode: "out-in"
											}, {
												default: withCtx(() => [unref(workStore).sidebarOpen ? (openBlock(), createBlock("div", {
													key: "label",
													class: "w-full font-semibold whitespace-nowrap"
												}, " Detection Studio ")) : (openBlock(), createBlock("div", {
													key: "logo",
													class: "pl-1 w-full font-semibold"
												}, [createVNode("img", {
													alt: "Logo",
													class: "w-7.5 h-7.5",
													src: logo_default
												})]))]),
												_: 1
											})]),
											_: 1
										}, 8, ["class"])]),
										_: 1
									}),
									createVNode(unref(SidebarSeparator_default), { class: [{ "mx-2": unref(workStore).sidebarOpen }, "w-full bg-border! mx-0"] }, null, 8, ["class"]),
									createVNode(unref(SidebarMenu_default), null, {
										default: withCtx(() => [createVNode(unref(SidebarMenuItem_default), null, {
											default: withCtx(() => [createVNode(WorkspaceSelection_default)]),
											_: 1
										})]),
										_: 1
									})
								]),
								_: 1
							}),
							createVNode(unref(SidebarContent_default), null, {
								default: withCtx(() => [createVNode(unref(SidebarGroup_default), null, {
									default: withCtx(() => [createVNode(unref(SidebarGroupContent_default), null, {
										default: withCtx(() => [createVNode(unref(SidebarMenu_default), null, {
											default: withCtx(() => [
												createVNode(unref(SidebarMenuItem_default), null, {
													default: withCtx(() => [createVNode(_component_router_link, {
														custom: "",
														to: "/"
													}, {
														default: withCtx(({ isActive, navigate }) => [createVNode(unref(SidebarMenuButton_default), {
															active: isActive,
															class: [{ "text-primary bg-primary/10": isActive }, "[active=true]/text-white"],
															onClick: navigate
														}, {
															default: withCtx(() => [createVNode(unref(PaletteIcon)), createVNode("span", null, "Studio")]),
															_: 1
														}, 8, [
															"active",
															"class",
															"onClick"
														])]),
														_: 1
													})]),
													_: 1
												}),
												createVNode(unref(SidebarMenuItem_default), null, {
													default: withCtx(() => [createVNode(_component_router_link, {
														custom: "",
														to: "/browser"
													}, {
														default: withCtx(({ isActive, navigate }) => [createVNode(unref(SidebarMenuButton_default), {
															active: isActive,
															class: { "text-primary bg-primary/10": isActive },
															onClick: navigate
														}, {
															default: withCtx(() => [createVNode(unref(GlobeIcon)), createVNode("span", null, "Browser")]),
															_: 1
														}, 8, [
															"active",
															"class",
															"onClick"
														])]),
														_: 1
													})]),
													_: 1
												}),
												createVNode(unref(SidebarMenuItem_default), null, {
													default: withCtx(() => [createVNode(_component_router_link, {
														custom: "",
														disabled: "",
														to: "/settings"
													}, {
														default: withCtx(({ isActive, navigate }) => [createVNode(unref(SidebarMenuButton_default), {
															active: isActive,
															class: { "text-primary bg-primary/10": isActive },
															disabled: "",
															onClick: navigate
														}, {
															default: withCtx(() => [createVNode(unref(Settings2)), createVNode("span", null, "Settings")]),
															_: 1
														}, 8, [
															"active",
															"class",
															"onClick"
														])]),
														_: 1
													})]),
													_: 1
												})
											]),
											_: 1
										})]),
										_: 1
									})]),
									_: 1
								}), createVNode(unref(SidebarGroup_default), { class: "group-data-[collapsible=icon]:hidden" }, {
									default: withCtx(() => [createVNode(unref(SidebarGroupLabel_default), { class: "text-muted-foreground" }, {
										default: withCtx(() => [createTextVNode("Documentation ")]),
										_: 1
									}), createVNode(unref(SidebarGroupContent_default), null, {
										default: withCtx(() => [createVNode(unref(SidebarMenu_default), null, {
											default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(data.documentation, (item) => {
												return openBlock(), createBlock(unref(Collapsible_default), {
													key: item.title,
													"default-open": true,
													"as-child": "",
													class: "group/collapsible"
												}, {
													default: withCtx(() => [createVNode(unref(SidebarMenuItem_default), null, {
														default: withCtx(() => [createVNode(unref(CollapsibleTrigger_default), { "as-child": "" }, {
															default: withCtx(() => [createVNode(unref(SidebarMenuButton_default), { tooltip: item.title }, {
																default: withCtx(() => [
																	(openBlock(), createBlock(resolveDynamicComponent(item.icon))),
																	createVNode("span", null, toDisplayString(item.title), 1),
																	createVNode(unref(ChevronRight), { class: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" })
																]),
																_: 2
															}, 1032, ["tooltip"])]),
															_: 2
														}, 1024), createVNode(unref(CollapsibleContent_default), null, {
															default: withCtx(() => [createVNode(unref(SidebarMenuSub_default), null, {
																default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(item.items, (subItem) => {
																	return openBlock(), createBlock(unref(SidebarMenuSubItem_default), { key: subItem.title }, {
																		default: withCtx(() => [createVNode(unref(SidebarMenuSubButton_default), { "as-child": "" }, {
																			default: withCtx(() => [createVNode("a", {
																				href: subItem.url,
																				target: "_blank"
																			}, [createVNode("span", null, toDisplayString(subItem.title), 1)], 8, ["href"])]),
																			_: 2
																		}, 1024)]),
																		_: 2
																	}, 1024);
																}), 128))]),
																_: 2
															}, 1024)]),
															_: 2
														}, 1024)]),
														_: 2
													}, 1024)]),
													_: 2
												}, 1024);
											}), 128))]),
											_: 1
										})]),
										_: 1
									})]),
									_: 1
								})]),
								_: 1
							}),
							createVNode(unref(SidebarFooter_default), null, {
								default: withCtx(() => [createVNode(unref(SidebarMenu_default), null, {
									default: withCtx(() => [createVNode(unref(SidebarMenuItem_default), null, {
										default: withCtx(() => [createVNode(unref(SidebarMenuButton_default), {
											class: "relative",
											tooltip: "Changelog",
											onClick: openChangelog
										}, {
											default: withCtx(() => [
												createVNode(unref(FileText)),
												createVNode("span", null, "What's New"),
												createVNode("div", { class: "relative flex size-3" }, [createVNode("div", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" }), createVNode("div", { class: "relative inline-flex size-3 rounded-full bg-sky-500" })])
											]),
											_: 1
										})]),
										_: 1
									}), createVNode(unref(SidebarMenuItem_default), null, {
										default: withCtx(() => [createVNode(Transition, null, {
											default: withCtx(() => [unref(workStore).sidebarOpen ? (openBlock(), createBlock(unref(Card_default), {
												key: 0,
												class: "text-xs text-muted-foreground p-2 flex items-center gap-2"
											}, {
												default: withCtx(() => [
													createTextVNode(" Powered by "),
													createVNode(unref(Sparkles), { class: "text-primary h-4 w-4" }),
													createVNode("a", {
														class: "text-primary font-semibold",
														href: "https://north.sh/",
														target: "_blank"
													}, " north.sh ")
												]),
												_: 1
											})) : createCommentVNode("", true)]),
											_: 1
										})]),
										_: 1
									})]),
									_: 1
								})]),
								_: 1
							}),
							createVNode(unref(SidebarRail_default))
						]),
						_: 1
					}), createVNode(unref(SidebarInset_default), { class: "bg-muted/30 flex-1 flex flex-col overflow-hidden" }, {
						default: withCtx(() => [createVNode(_component_router_view, { class: "flex-1 w-full overflow-hidden" })]),
						_: 1
					})];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(ChangelogDialog_default, {
				ref_key: "changelogDialogRef",
				ref: changelogDialogRef,
				"auto-show": true
			}, null, _parent));
			_push(`<!--]-->`);
		};
	}
});
var _sfc_setup = App_vue_vue_type_script_setup_true_lang_default.setup;
App_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/App.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var App_default = App_vue_vue_type_script_setup_true_lang_default;
function useSearchWorker() {
	const worker$1 = ref(null);
	const isReady = ref(false);
	const isSearching = ref(false);
	const searchError = ref(null);
	function initWorker() {
		if (worker$1.value) return;
		try {
			worker$1.value = new Worker(new URL("../workers/searchWorker.ts", import.meta.url), { type: "module" });
			worker$1.value.onmessage = handleWorkerMessage;
			worker$1.value.onerror = handleWorkerError;
		} catch (error) {
			console.error("Failed to initialize search worker:", error);
			searchError.value = "Failed to initialize search worker";
		}
	}
	let loadCallback = null;
	function handleWorkerMessage(event) {
		const { type, results, rules, error } = event.data;
		if (type === "ready") {
			isReady.value = true;
			console.log("Search worker initialized");
		} else if (type === "loaded") {
			if (loadCallback && rules) {
				loadCallback(rules);
				loadCallback = null;
			}
		} else if (type === "result") {
			isSearching.value = false;
			if (searchCallback) searchCallback(results || []);
		} else if (type === "error") {
			isSearching.value = false;
			searchError.value = error || "Unknown error";
			console.error("Search worker error:", error);
			if (loadCallback) loadCallback = null;
		}
	}
	function handleWorkerError(error) {
		console.error("Search worker error:", error);
		searchError.value = error.message;
		isSearching.value = false;
	}
	let searchCallback = null;
	function initializeIndex(rules) {
		return new Promise((resolve, reject) => {
			if (!worker$1.value) initWorker();
			if (!worker$1.value) {
				reject(/* @__PURE__ */ new Error("Failed to initialize worker"));
				return;
			}
			const onReady = (event) => {
				if (event.data.type === "ready") {
					worker$1.value?.removeEventListener("message", onReady);
					resolve();
				} else if (event.data.type === "error") {
					worker$1.value?.removeEventListener("message", onReady);
					reject(new Error(event.data.error));
				}
			};
			worker$1.value.addEventListener("message", onReady);
			const message = {
				type: "init",
				rules: JSON.parse(JSON.stringify(rules))
			};
			worker$1.value.postMessage(message);
		});
	}
	function loadRules() {
		return new Promise((resolve, reject) => {
			if (!worker$1.value) initWorker();
			if (!worker$1.value) {
				reject(/* @__PURE__ */ new Error("Failed to initialize worker"));
				return;
			}
			loadCallback = (rules) => {
				resolve(rules);
			};
			worker$1.value.postMessage({ type: "load" });
		});
	}
	function search(query) {
		return new Promise((resolve, reject) => {
			if (!worker$1.value || !isReady.value) {
				reject(/* @__PURE__ */ new Error("Worker not ready"));
				return;
			}
			isSearching.value = true;
			searchError.value = null;
			searchCallback = (results) => {
				resolve(results);
				searchCallback = null;
			};
			const message = {
				type: "search",
				query
			};
			worker$1.value.postMessage(message);
		});
	}
	function terminateWorker() {
		if (worker$1.value) {
			worker$1.value.terminate();
			worker$1.value = null;
			isReady.value = false;
		}
	}
	if (getCurrentInstance()) onUnmounted(() => {
		terminateWorker();
	});
	return {
		initWorker,
		initializeIndex,
		loadRules,
		search,
		terminateWorker,
		isReady,
		isSearching,
		searchError
	};
}
const useSigmaRulesStore = defineStore("sigmaRules", () => {
	const rules = ref([]);
	const isLoading = ref(false);
	const isLoadingIndividualRule = ref(false);
	const currentRule = ref(null);
	const currentRuleContent = ref("");
	const searchQuery = ref("");
	const searchResults = ref([]);
	const error = ref(null);
	const allRules = ref([]);
	const isRulesLoaded = ref(false);
	const searchWorker = useSearchWorker();
	async function fetchRules(forceReload = false) {
		isLoading.value = true;
		error.value = null;
		try {
			if (forceReload) isRulesLoaded.value = false;
			if (!isRulesLoaded.value) {
				console.log("SigmaRulesStore: Loading rules via worker...");
				const loadedRules = await searchWorker.loadRules();
				allRules.value = loadedRules;
				rules.value = loadedRules;
				isRulesLoaded.value = true;
				console.log(`SigmaRulesStore: Loaded ${rules.value.length} rules via worker`);
			} else {
				rules.value = allRules.value;
				console.log(`SigmaRulesStore: Using cached ${rules.value.length} rules`);
			}
		} catch (err) {
			console.error("Error fetching sigma rules:", err);
			error.value = err instanceof Error ? err.message : "Failed to fetch rules";
		} finally {
			isLoading.value = false;
		}
	}
	async function fetchRuleContent(rulePath) {
		isLoadingIndividualRule.value = true;
		error.value = null;
		try {
			const cdnPath = `https://cdn.jsdelivr.net/gh/SigmaHQ/sigma@master/${rulePath}`;
			const response = await fetch(cdnPath);
			if (!response.ok) throw new Error(`Failed to fetch rule: ${response.status} ${response.statusText}`);
			currentRuleContent.value = await response.text();
		} catch (err) {
			console.error(`Error fetching rule content for ${rulePath}:`, err);
			error.value = err instanceof Error ? err.message : "Failed to fetch rule content";
			currentRuleContent.value = "";
		} finally {
			isLoadingIndividualRule.value = false;
		}
	}
	async function setCurrentRule(rule) {
		currentRule.value = rule;
		await fetchRuleContent(rule.path);
	}
	async function searchRules(query) {
		searchQuery.value = query;
		if (!query || query.trim() === "") {
			searchResults.value = [];
			return;
		}
		try {
			const results = await searchWorker.search(query);
			searchResults.value = results;
			console.log(`SigmaRulesStore: Search completed, found ${results.length} results`);
		} catch (err) {
			console.error("SigmaRulesStore: Search error:", err);
			searchResults.value = [];
		}
	}
	const filteredRules = () => {
		if (!searchQuery.value || searchQuery.value.trim() === "") return rules.value;
		return searchResults.value;
	};
	return {
		rules,
		isLoading,
		isLoadingIndividualRule,
		currentRule,
		currentRuleContent,
		searchQuery,
		searchResults,
		error,
		filteredRules,
		isSearching: searchWorker.isSearching,
		fetchRules,
		fetchRuleContent,
		setCurrentRule,
		searchRules
	};
});
const useSettingsStore = defineStore("settings", () => {
	const defaultAuthor = ref("");
	const defaultSIEM = ref("splunk");
	const defaultTemplate = ref("default");
	function setDefaultAuthor(author) {
		defaultAuthor.value = author;
	}
	function setDefaultSIEM(siem) {
		defaultSIEM.value = siem;
	}
	function setDefaultTemplate(template) {
		defaultTemplate.value = template;
	}
	return {
		defaultAuthor,
		defaultSIEM,
		defaultTemplate,
		setDefaultAuthor,
		setDefaultSIEM,
		setDefaultTemplate
	};
}, { persist: true });
var ClientOnly = defineComponent({ setup(props, { slots }) {
	const mounted = ref(false);
	onMounted(() => mounted.value = true);
	return () => {
		if (!mounted.value) return slots.placeholder && slots.placeholder({});
		return slots.default && slots.default({});
	};
} });
function ViteSSG(App, routerOptions, fn, options) {
	const { transformState, registerComponents = true, useHead = true, rootContainer = "#app" } = options ?? {};
	async function createApp$1$1(routePath) {
		const app = createSSRApp(App);
		let head;
		if (useHead) app.use(head = createHead());
		const router = createRouter({
			history: createMemoryHistory(routerOptions.base),
			...routerOptions
		});
		const { routes: routes$1 } = routerOptions;
		if (registerComponents) app.component("ClientOnly", ClientOnly);
		const appRenderCallbacks = [];
		const onSSRAppRendered = (cb) => appRenderCallbacks.push(cb);
		const triggerOnSSRAppRendered = () => {
			return Promise.all(appRenderCallbacks.map((cb) => cb()));
		};
		const context = {
			app,
			head,
			isClient: false,
			router,
			routes: routes$1,
			onSSRAppRendered,
			triggerOnSSRAppRendered,
			initialState: {},
			transformState,
			routePath
		};
		await fn?.(context);
		app.use(router);
		let entryRoutePath;
		let isFirstRoute = true;
		router.beforeEach((to, from, next) => {
			if (isFirstRoute || entryRoutePath && entryRoutePath === to.path) {
				isFirstRoute = false;
				entryRoutePath = to.path;
				to.meta.state = context.initialState;
			}
			next();
		});
		{
			const route = context.routePath ?? "/";
			router.push(route);
			await router.isReady();
			context.initialState = router.currentRoute.value.meta.state || {};
		}
		const initialState = context.initialState;
		return {
			...context,
			initialState
		};
	}
	return createApp$1$1;
}
const createApp = ViteSSG(App_default, { routes: [
	{
		path: "/",
		name: "studio",
		component: () => import("./assets/Studio-C81JcG42.js")
	},
	{
		path: "/browser",
		name: "browser",
		component: () => import("./assets/RulesBrowser-CV-c7jdW.js"),
		props: (route) => ({ ruleId: route.query.ruleId || null })
	},
	{
		path: "/settings",
		name: "settings",
		component: () => import("./assets/Settings-BisLyKjz.js")
	}
] }, ({ app, router }) => {
	Sentry.init({
		app,
		dsn: "https://06963991798b6199bdeceff9d0df653c@o151013.ingest.us.sentry.io/4508833813364736",
		integrations: [
			Sentry.browserTracingIntegration({ router }),
			Sentry.replayIntegration({
				maskAllText: false,
				blockAllMedia: false
			}),
			Sentry.feedbackIntegration({ colorScheme: "dark" })
		],
		tracesSampleRate: 1,
		replaysSessionSampleRate: .1,
		replaysOnErrorSampleRate: 1
	});
	let pinia = createPinia();
	pinia = pinia.use(PiniaUndo).use(piniaPluginPersistedState);
	app.use(pinia).use(PiniaColada, {});
	useSigmaRulesStore(pinia);
	useSettingsStore(pinia);
});
export { CardHeader_default as A, TooltipTrigger_default as B, DropdownMenuContent_default as C, getAvailablePipelines as D, useWorkspaceSharingStore as E, SidebarTrigger_default as F, cn as G, TooltipContent_default as H, Button_default as I, Collapsible_default as J, CollapsibleTrigger_default as K, Separator_default as L, CardDescription_default as M, CardContent_default as N, supportedSiems as O, Card_default as P, _plugin_vue_export_helper_default as R, DropdownMenuGroup_default as S, useWorkspaceStore as T, Tooltip_default as U, TooltipProvider_default as V, Input_default as W, DropdownMenuSubContent_default as _, ScrollBar_default as a, DropdownMenuLabel_default as b, splunk_default as c, createApp, DialogHeader_default as d, DialogDescription_default as f, DropdownMenuSubTrigger_default as g, DropdownMenuTrigger_default as h, ScrollArea_default as i, CardFooter_default as j, CardTitle_default as k, DialogTrigger_default as l, Dialog_default as m, useSigmaRulesStore as n, elasticsearch_default as o, DialogContent_default as p, CollapsibleContent_default as q, Badge_default as r, grafana_default as s, useSettingsStore as t, DialogTitle_default as u, DropdownMenuSub_default as v, DropdownMenu_default as w, DropdownMenuItem_default as x, DropdownMenuSeparator_default as y, Skeleton_default as z };

//# sourceMappingURL=main.mjs.map