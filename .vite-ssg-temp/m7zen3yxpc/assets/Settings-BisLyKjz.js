(function() {
	try {
		var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {};
		e.SENTRY_RELEASE = { id: "a2373c7004d0269c74d9ea84d69f613722a72468" };
	} catch (e) {}
})();
try {
	(function() {
		var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
		n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "db348c37-89eb-405c-8701-b4820e2521a0", e._sentryDebugIdIdentifier = "sentry-dbid-db348c37-89eb-405c-8701-b4820e2521a0");
	})();
} catch (e) {}
import { A as CardHeader_default, G as cn, I as Button_default, M as CardDescription_default, N as CardContent_default, O as supportedSiems, P as Card_default, W as Input_default, j as CardFooter_default, k as CardTitle_default, t as useSettingsStore } from "../main.mjs";
import { t as Label_default } from "./label-Ds9pnXNm.js";
import { Fragment, createBlock, createTextVNode, createVNode, defineComponent, mergeProps, openBlock, ref, renderList, renderSlot, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderSlot } from "vue/server-renderer";
import { SelectContent, SelectGroup, SelectIcon, SelectItem, SelectItemIndicator, SelectItemText, SelectLabel, SelectPortal, SelectRoot, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, SelectViewport, useForwardProps, useForwardPropsEmits } from "reka-ui";
import { reactiveOmit } from "@vueuse/core";
import { Check, ChevronDown, ChevronUp } from "lucide-vue-next";
var Select_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Select",
	__ssrInlineRender: true,
	props: {
		open: { type: Boolean },
		defaultOpen: { type: Boolean },
		defaultValue: {},
		modelValue: {},
		by: { type: [String, Function] },
		dir: {},
		multiple: { type: Boolean },
		autocomplete: {},
		disabled: { type: Boolean },
		name: {},
		required: { type: Boolean }
	},
	emits: ["update:modelValue", "update:open"],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(SelectRoot), mergeProps(unref(forwarded), _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$11 = Select_vue_vue_type_script_setup_true_lang_default.setup;
Select_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/select/Select.vue");
	return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
var Select_default = Select_vue_vue_type_script_setup_true_lang_default;
var SelectContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "SelectContent",
	__ssrInlineRender: true,
	props: {
		forceMount: { type: Boolean },
		position: { default: "popper" },
		bodyLock: { type: Boolean },
		side: {},
		sideOffset: {},
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
		"closeAutoFocus",
		"escapeKeyDown",
		"pointerDownOutside"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(SelectPortal), _attrs, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(ssrRenderComponent(unref(SelectContent), mergeProps({
						...unref(forwarded),
						..._ctx.$attrs
					}, { class: unref(cn)("relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", __props.position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", props.class) }), {
						default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
							if (_push$2) {
								_push$2(ssrRenderComponent(unref(SelectScrollUpButton_default), null, null, _parent$2, _scopeId$1));
								_push$2(ssrRenderComponent(unref(SelectViewport), { class: unref(cn)("p-1", __props.position === "popper" && "h-(--reka-select-trigger-height) w-full min-w-(--reka-select-trigger-width)") }, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$3, _parent$3, _scopeId$2);
										else return [renderSlot(_ctx.$slots, "default")];
									}),
									_: 3
								}, _parent$2, _scopeId$1));
								_push$2(ssrRenderComponent(unref(SelectScrollDownButton_default), null, null, _parent$2, _scopeId$1));
							} else return [
								createVNode(unref(SelectScrollUpButton_default)),
								createVNode(unref(SelectViewport), { class: unref(cn)("p-1", __props.position === "popper" && "h-(--reka-select-trigger-height) w-full min-w-(--reka-select-trigger-width)") }, {
									default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
									_: 3
								}, 8, ["class"]),
								createVNode(unref(SelectScrollDownButton_default))
							];
						}),
						_: 3
					}, _parent$1, _scopeId));
					else return [createVNode(unref(SelectContent), mergeProps({
						...unref(forwarded),
						..._ctx.$attrs
					}, { class: unref(cn)("relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", __props.position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", props.class) }), {
						default: withCtx(() => [
							createVNode(unref(SelectScrollUpButton_default)),
							createVNode(unref(SelectViewport), { class: unref(cn)("p-1", __props.position === "popper" && "h-(--reka-select-trigger-height) w-full min-w-(--reka-select-trigger-width)") }, {
								default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
								_: 3
							}, 8, ["class"]),
							createVNode(unref(SelectScrollDownButton_default))
						]),
						_: 3
					}, 16, ["class"])];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$10 = SelectContent_vue_vue_type_script_setup_true_lang_default.setup;
SelectContent_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/select/SelectContent.vue");
	return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
var SelectContent_default = SelectContent_vue_vue_type_script_setup_true_lang_default;
var SelectGroup_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SelectGroup",
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
			_push(ssrRenderComponent(unref(SelectGroup), mergeProps({ class: unref(cn)("p-1 w-full", props.class) }, unref(delegatedProps), _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$9 = SelectGroup_vue_vue_type_script_setup_true_lang_default.setup;
SelectGroup_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/select/SelectGroup.vue");
	return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
var SelectItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SelectItem",
	__ssrInlineRender: true,
	props: {
		value: {},
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
			_push(ssrRenderComponent(unref(SelectItem), mergeProps(unref(forwardedProps), { class: unref(cn)("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(`<span class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center"${_scopeId}>`);
						_push$1(ssrRenderComponent(unref(SelectItemIndicator), null, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) _push$2(ssrRenderComponent(unref(Check), { class: "h-4 w-4" }, null, _parent$2, _scopeId$1));
								else return [createVNode(unref(Check), { class: "h-4 w-4" })];
							}),
							_: 1
						}, _parent$1, _scopeId));
						_push$1(`</span>`);
						_push$1(ssrRenderComponent(unref(SelectItemText), null, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$2, _parent$2, _scopeId$1);
								else return [renderSlot(_ctx.$slots, "default")];
							}),
							_: 3
						}, _parent$1, _scopeId));
					} else return [createVNode("span", { class: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center" }, [createVNode(unref(SelectItemIndicator), null, {
						default: withCtx(() => [createVNode(unref(Check), { class: "h-4 w-4" })]),
						_: 1
					})]), createVNode(unref(SelectItemText), null, {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
						_: 3
					})];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$8 = SelectItem_vue_vue_type_script_setup_true_lang_default.setup;
SelectItem_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/select/SelectItem.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var SelectItem_default = SelectItem_vue_vue_type_script_setup_true_lang_default;
var SelectItemText_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SelectItemText",
	__ssrInlineRender: true,
	props: {
		asChild: { type: Boolean },
		as: {}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(SelectItemText), mergeProps(props, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$7 = SelectItemText_vue_vue_type_script_setup_true_lang_default.setup;
SelectItemText_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/select/SelectItemText.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var SelectLabel_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SelectLabel",
	__ssrInlineRender: true,
	props: {
		for: {},
		asChild: { type: Boolean },
		as: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(SelectLabel), mergeProps({ class: unref(cn)("px-2 py-1.5 text-sm font-semibold", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$6 = SelectLabel_vue_vue_type_script_setup_true_lang_default.setup;
SelectLabel_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/select/SelectLabel.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var SelectScrollDownButton_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SelectScrollDownButton",
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
			_push(ssrRenderComponent(unref(SelectScrollDownButton), mergeProps(unref(forwardedProps), { class: unref(cn)("flex cursor-default items-center justify-center py-1", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, () => {
						_push$1(ssrRenderComponent(unref(ChevronDown), null, null, _parent$1, _scopeId));
					}, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default", {}, () => [createVNode(unref(ChevronDown))])];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$5 = SelectScrollDownButton_vue_vue_type_script_setup_true_lang_default.setup;
SelectScrollDownButton_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/select/SelectScrollDownButton.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var SelectScrollDownButton_default = SelectScrollDownButton_vue_vue_type_script_setup_true_lang_default;
var SelectScrollUpButton_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SelectScrollUpButton",
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
			_push(ssrRenderComponent(unref(SelectScrollUpButton), mergeProps(unref(forwardedProps), { class: unref(cn)("flex cursor-default items-center justify-center py-1", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, () => {
						_push$1(ssrRenderComponent(unref(ChevronUp), null, null, _parent$1, _scopeId));
					}, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default", {}, () => [createVNode(unref(ChevronUp))])];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$4 = SelectScrollUpButton_vue_vue_type_script_setup_true_lang_default.setup;
SelectScrollUpButton_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/select/SelectScrollUpButton.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var SelectScrollUpButton_default = SelectScrollUpButton_vue_vue_type_script_setup_true_lang_default;
var SelectSeparator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SelectSeparator",
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
			_push(ssrRenderComponent(unref(SelectSeparator), mergeProps(unref(delegatedProps), { class: unref(cn)("-mx-1 my-1 h-px bg-muted", props.class) }, _attrs), null, _parent));
		};
	}
});
var _sfc_setup$3 = SelectSeparator_vue_vue_type_script_setup_true_lang_default.setup;
SelectSeparator_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/select/SelectSeparator.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var SelectTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SelectTrigger",
	__ssrInlineRender: true,
	props: {
		disabled: { type: Boolean },
		reference: {},
		asChild: { type: Boolean },
		as: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		const forwardedProps = useForwardProps(reactiveOmit(props, "class"));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(SelectTrigger), mergeProps(unref(forwardedProps), { class: unref(cn)("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:truncate text-start", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
						_push$1(ssrRenderComponent(unref(SelectIcon), { "as-child": "" }, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) _push$2(ssrRenderComponent(unref(ChevronDown), { class: "w-4 h-4 opacity-50 shrink-0" }, null, _parent$2, _scopeId$1));
								else return [createVNode(unref(ChevronDown), { class: "w-4 h-4 opacity-50 shrink-0" })];
							}),
							_: 1
						}, _parent$1, _scopeId));
					} else return [renderSlot(_ctx.$slots, "default"), createVNode(unref(SelectIcon), { "as-child": "" }, {
						default: withCtx(() => [createVNode(unref(ChevronDown), { class: "w-4 h-4 opacity-50 shrink-0" })]),
						_: 1
					})];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$2 = SelectTrigger_vue_vue_type_script_setup_true_lang_default.setup;
SelectTrigger_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/select/SelectTrigger.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var SelectTrigger_default = SelectTrigger_vue_vue_type_script_setup_true_lang_default;
var SelectValue_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SelectValue",
	__ssrInlineRender: true,
	props: {
		placeholder: {},
		asChild: { type: Boolean },
		as: {}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(SelectValue), mergeProps(props, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$1 = SelectValue_vue_vue_type_script_setup_true_lang_default.setup;
SelectValue_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/select/SelectValue.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var SelectValue_default = SelectValue_vue_vue_type_script_setup_true_lang_default;
var Settings_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Settings",
	__ssrInlineRender: true,
	setup(__props) {
		const settingsStore = useSettingsStore();
		const defaultAuthor = ref(settingsStore.defaultAuthor);
		const defaultSIEM = ref(settingsStore.defaultSIEM);
		const defaultTemplate = ref(settingsStore.defaultTemplate);
		const templateOptions = [
			{
				value: "default",
				label: "Default Sigma Rule"
			},
			{
				value: "process_creation",
				label: "Process Creation"
			},
			{
				value: "network_connection",
				label: "Network Connection"
			},
			{
				value: "registry_event",
				label: "Registry Event"
			},
			{
				value: "file_event",
				label: "File Event"
			}
		];
		function saveSettings() {
			settingsStore.setDefaultAuthor(defaultAuthor.value);
			settingsStore.setDefaultSIEM(defaultSIEM.value);
			settingsStore.setDefaultTemplate(defaultTemplate.value);
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "container py-10" }, _attrs))}><div class="mx-auto max-w-3xl"><h1 class="text-3xl font-bold mb-6">Settings</h1>`);
			_push(ssrRenderComponent(unref(Card_default), { class: "mb-6" }, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(unref(CardHeader_default), null, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) {
									_push$2(ssrRenderComponent(unref(CardTitle_default), null, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) _push$3(`User Preferences`);
											else return [createTextVNode("User Preferences")];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(ssrRenderComponent(unref(CardDescription_default), null, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) _push$3(`Customize your detection authoring experience`);
											else return [createTextVNode("Customize your detection authoring experience")];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
								} else return [createVNode(unref(CardTitle_default), null, {
									default: withCtx(() => [createTextVNode("User Preferences")]),
									_: 1
								}), createVNode(unref(CardDescription_default), null, {
									default: withCtx(() => [createTextVNode("Customize your detection authoring experience")]),
									_: 1
								})];
							}),
							_: 1
						}, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(CardContent_default), null, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) {
									_push$2(`<div class="space-y-4"${_scopeId$1}><div class="grid gap-2"${_scopeId$1}>`);
									_push$2(ssrRenderComponent(unref(Label_default), { for: "default-author" }, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) _push$3(`Default Author`);
											else return [createTextVNode("Default Author")];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(ssrRenderComponent(unref(Input_default), {
										id: "default-author",
										modelValue: defaultAuthor.value,
										"onUpdate:modelValue": ($event) => defaultAuthor.value = $event,
										placeholder: "Your name or organization"
									}, null, _parent$2, _scopeId$1));
									_push$2(`<p class="text-sm text-muted-foreground"${_scopeId$1}> This will be used as the default author in new Sigma rules </p></div><div class="grid gap-2"${_scopeId$1}>`);
									_push$2(ssrRenderComponent(unref(Label_default), { for: "default-siem" }, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) _push$3(`Default SIEM`);
											else return [createTextVNode("Default SIEM")];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(ssrRenderComponent(unref(Select_default), {
										modelValue: defaultSIEM.value,
										"onUpdate:modelValue": ($event) => defaultSIEM.value = $event
									}, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) {
												_push$3(ssrRenderComponent(unref(SelectTrigger_default), {
													id: "default-siem",
													class: "w-full"
												}, {
													default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
														if (_push$4) _push$4(ssrRenderComponent(unref(SelectValue_default), { placeholder: "Select your primary SIEM" }, null, _parent$4, _scopeId$3));
														else return [createVNode(unref(SelectValue_default), { placeholder: "Select your primary SIEM" })];
													}),
													_: 1
												}, _parent$3, _scopeId$2));
												_push$3(ssrRenderComponent(unref(SelectContent_default), null, {
													default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
														if (_push$4) {
															_push$4(`<!--[-->`);
															ssrRenderList(unref(supportedSiems), (siem) => {
																_push$4(ssrRenderComponent(unref(SelectItem_default), {
																	key: siem.id,
																	value: siem.id
																}, {
																	default: withCtx((_$4, _push$5, _parent$5, _scopeId$4) => {
																		if (_push$5) _push$5(`${ssrInterpolate(siem.name)}`);
																		else return [createTextVNode(toDisplayString(siem.name), 1)];
																	}),
																	_: 2
																}, _parent$4, _scopeId$3));
															});
															_push$4(`<!--]-->`);
														} else return [(openBlock(true), createBlock(Fragment, null, renderList(unref(supportedSiems), (siem) => {
															return openBlock(), createBlock(unref(SelectItem_default), {
																key: siem.id,
																value: siem.id
															}, {
																default: withCtx(() => [createTextVNode(toDisplayString(siem.name), 1)]),
																_: 2
															}, 1032, ["value"]);
														}), 128))];
													}),
													_: 1
												}, _parent$3, _scopeId$2));
											} else return [createVNode(unref(SelectTrigger_default), {
												id: "default-siem",
												class: "w-full"
											}, {
												default: withCtx(() => [createVNode(unref(SelectValue_default), { placeholder: "Select your primary SIEM" })]),
												_: 1
											}), createVNode(unref(SelectContent_default), null, {
												default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(unref(supportedSiems), (siem) => {
													return openBlock(), createBlock(unref(SelectItem_default), {
														key: siem.id,
														value: siem.id
													}, {
														default: withCtx(() => [createTextVNode(toDisplayString(siem.name), 1)]),
														_: 2
													}, 1032, ["value"]);
												}), 128))]),
												_: 1
											})];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(`<p class="text-sm text-muted-foreground"${_scopeId$1}> The default SIEM for rule conversion </p></div><div class="grid gap-2"${_scopeId$1}>`);
									_push$2(ssrRenderComponent(unref(Label_default), { for: "default-template" }, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) _push$3(`Default Template`);
											else return [createTextVNode("Default Template")];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(ssrRenderComponent(unref(Select_default), {
										modelValue: defaultTemplate.value,
										"onUpdate:modelValue": ($event) => defaultTemplate.value = $event
									}, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) {
												_push$3(ssrRenderComponent(unref(SelectTrigger_default), {
													id: "default-template",
													class: "w-full"
												}, {
													default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
														if (_push$4) _push$4(ssrRenderComponent(unref(SelectValue_default), { placeholder: "Select a default template" }, null, _parent$4, _scopeId$3));
														else return [createVNode(unref(SelectValue_default), { placeholder: "Select a default template" })];
													}),
													_: 1
												}, _parent$3, _scopeId$2));
												_push$3(ssrRenderComponent(unref(SelectContent_default), null, {
													default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
														if (_push$4) {
															_push$4(`<!--[-->`);
															ssrRenderList(templateOptions, (template) => {
																_push$4(ssrRenderComponent(unref(SelectItem_default), {
																	key: template.value,
																	value: template.value
																}, {
																	default: withCtx((_$4, _push$5, _parent$5, _scopeId$4) => {
																		if (_push$5) _push$5(`${ssrInterpolate(template.label)}`);
																		else return [createTextVNode(toDisplayString(template.label), 1)];
																	}),
																	_: 2
																}, _parent$4, _scopeId$3));
															});
															_push$4(`<!--]-->`);
														} else return [(openBlock(), createBlock(Fragment, null, renderList(templateOptions, (template) => {
															return createVNode(unref(SelectItem_default), {
																key: template.value,
																value: template.value
															}, {
																default: withCtx(() => [createTextVNode(toDisplayString(template.label), 1)]),
																_: 2
															}, 1032, ["value"]);
														}), 64))];
													}),
													_: 1
												}, _parent$3, _scopeId$2));
											} else return [createVNode(unref(SelectTrigger_default), {
												id: "default-template",
												class: "w-full"
											}, {
												default: withCtx(() => [createVNode(unref(SelectValue_default), { placeholder: "Select a default template" })]),
												_: 1
											}), createVNode(unref(SelectContent_default), null, {
												default: withCtx(() => [(openBlock(), createBlock(Fragment, null, renderList(templateOptions, (template) => {
													return createVNode(unref(SelectItem_default), {
														key: template.value,
														value: template.value
													}, {
														default: withCtx(() => [createTextVNode(toDisplayString(template.label), 1)]),
														_: 2
													}, 1032, ["value"]);
												}), 64))]),
												_: 1
											})];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(`<p class="text-sm text-muted-foreground"${_scopeId$1}> The default template for new Sigma rules </p></div></div>`);
								} else return [createVNode("div", { class: "space-y-4" }, [
									createVNode("div", { class: "grid gap-2" }, [
										createVNode(unref(Label_default), { for: "default-author" }, {
											default: withCtx(() => [createTextVNode("Default Author")]),
											_: 1
										}),
										createVNode(unref(Input_default), {
											id: "default-author",
											modelValue: defaultAuthor.value,
											"onUpdate:modelValue": ($event) => defaultAuthor.value = $event,
											placeholder: "Your name or organization"
										}, null, 8, ["modelValue", "onUpdate:modelValue"]),
										createVNode("p", { class: "text-sm text-muted-foreground" }, " This will be used as the default author in new Sigma rules ")
									]),
									createVNode("div", { class: "grid gap-2" }, [
										createVNode(unref(Label_default), { for: "default-siem" }, {
											default: withCtx(() => [createTextVNode("Default SIEM")]),
											_: 1
										}),
										createVNode(unref(Select_default), {
											modelValue: defaultSIEM.value,
											"onUpdate:modelValue": ($event) => defaultSIEM.value = $event
										}, {
											default: withCtx(() => [createVNode(unref(SelectTrigger_default), {
												id: "default-siem",
												class: "w-full"
											}, {
												default: withCtx(() => [createVNode(unref(SelectValue_default), { placeholder: "Select your primary SIEM" })]),
												_: 1
											}), createVNode(unref(SelectContent_default), null, {
												default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(unref(supportedSiems), (siem) => {
													return openBlock(), createBlock(unref(SelectItem_default), {
														key: siem.id,
														value: siem.id
													}, {
														default: withCtx(() => [createTextVNode(toDisplayString(siem.name), 1)]),
														_: 2
													}, 1032, ["value"]);
												}), 128))]),
												_: 1
											})]),
											_: 1
										}, 8, ["modelValue", "onUpdate:modelValue"]),
										createVNode("p", { class: "text-sm text-muted-foreground" }, " The default SIEM for rule conversion ")
									]),
									createVNode("div", { class: "grid gap-2" }, [
										createVNode(unref(Label_default), { for: "default-template" }, {
											default: withCtx(() => [createTextVNode("Default Template")]),
											_: 1
										}),
										createVNode(unref(Select_default), {
											modelValue: defaultTemplate.value,
											"onUpdate:modelValue": ($event) => defaultTemplate.value = $event
										}, {
											default: withCtx(() => [createVNode(unref(SelectTrigger_default), {
												id: "default-template",
												class: "w-full"
											}, {
												default: withCtx(() => [createVNode(unref(SelectValue_default), { placeholder: "Select a default template" })]),
												_: 1
											}), createVNode(unref(SelectContent_default), null, {
												default: withCtx(() => [(openBlock(), createBlock(Fragment, null, renderList(templateOptions, (template) => {
													return createVNode(unref(SelectItem_default), {
														key: template.value,
														value: template.value
													}, {
														default: withCtx(() => [createTextVNode(toDisplayString(template.label), 1)]),
														_: 2
													}, 1032, ["value"]);
												}), 64))]),
												_: 1
											})]),
											_: 1
										}, 8, ["modelValue", "onUpdate:modelValue"]),
										createVNode("p", { class: "text-sm text-muted-foreground" }, " The default template for new Sigma rules ")
									])
								])];
							}),
							_: 1
						}, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(CardFooter_default), null, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) _push$2(ssrRenderComponent(unref(Button_default), { onClick: saveSettings }, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) _push$3(`Save Changes`);
										else return [createTextVNode("Save Changes")];
									}),
									_: 1
								}, _parent$2, _scopeId$1));
								else return [createVNode(unref(Button_default), { onClick: saveSettings }, {
									default: withCtx(() => [createTextVNode("Save Changes")]),
									_: 1
								})];
							}),
							_: 1
						}, _parent$1, _scopeId));
					} else return [
						createVNode(unref(CardHeader_default), null, {
							default: withCtx(() => [createVNode(unref(CardTitle_default), null, {
								default: withCtx(() => [createTextVNode("User Preferences")]),
								_: 1
							}), createVNode(unref(CardDescription_default), null, {
								default: withCtx(() => [createTextVNode("Customize your detection authoring experience")]),
								_: 1
							})]),
							_: 1
						}),
						createVNode(unref(CardContent_default), null, {
							default: withCtx(() => [createVNode("div", { class: "space-y-4" }, [
								createVNode("div", { class: "grid gap-2" }, [
									createVNode(unref(Label_default), { for: "default-author" }, {
										default: withCtx(() => [createTextVNode("Default Author")]),
										_: 1
									}),
									createVNode(unref(Input_default), {
										id: "default-author",
										modelValue: defaultAuthor.value,
										"onUpdate:modelValue": ($event) => defaultAuthor.value = $event,
										placeholder: "Your name or organization"
									}, null, 8, ["modelValue", "onUpdate:modelValue"]),
									createVNode("p", { class: "text-sm text-muted-foreground" }, " This will be used as the default author in new Sigma rules ")
								]),
								createVNode("div", { class: "grid gap-2" }, [
									createVNode(unref(Label_default), { for: "default-siem" }, {
										default: withCtx(() => [createTextVNode("Default SIEM")]),
										_: 1
									}),
									createVNode(unref(Select_default), {
										modelValue: defaultSIEM.value,
										"onUpdate:modelValue": ($event) => defaultSIEM.value = $event
									}, {
										default: withCtx(() => [createVNode(unref(SelectTrigger_default), {
											id: "default-siem",
											class: "w-full"
										}, {
											default: withCtx(() => [createVNode(unref(SelectValue_default), { placeholder: "Select your primary SIEM" })]),
											_: 1
										}), createVNode(unref(SelectContent_default), null, {
											default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(unref(supportedSiems), (siem) => {
												return openBlock(), createBlock(unref(SelectItem_default), {
													key: siem.id,
													value: siem.id
												}, {
													default: withCtx(() => [createTextVNode(toDisplayString(siem.name), 1)]),
													_: 2
												}, 1032, ["value"]);
											}), 128))]),
											_: 1
										})]),
										_: 1
									}, 8, ["modelValue", "onUpdate:modelValue"]),
									createVNode("p", { class: "text-sm text-muted-foreground" }, " The default SIEM for rule conversion ")
								]),
								createVNode("div", { class: "grid gap-2" }, [
									createVNode(unref(Label_default), { for: "default-template" }, {
										default: withCtx(() => [createTextVNode("Default Template")]),
										_: 1
									}),
									createVNode(unref(Select_default), {
										modelValue: defaultTemplate.value,
										"onUpdate:modelValue": ($event) => defaultTemplate.value = $event
									}, {
										default: withCtx(() => [createVNode(unref(SelectTrigger_default), {
											id: "default-template",
											class: "w-full"
										}, {
											default: withCtx(() => [createVNode(unref(SelectValue_default), { placeholder: "Select a default template" })]),
											_: 1
										}), createVNode(unref(SelectContent_default), null, {
											default: withCtx(() => [(openBlock(), createBlock(Fragment, null, renderList(templateOptions, (template) => {
												return createVNode(unref(SelectItem_default), {
													key: template.value,
													value: template.value
												}, {
													default: withCtx(() => [createTextVNode(toDisplayString(template.label), 1)]),
													_: 2
												}, 1032, ["value"]);
											}), 64))]),
											_: 1
										})]),
										_: 1
									}, 8, ["modelValue", "onUpdate:modelValue"]),
									createVNode("p", { class: "text-sm text-muted-foreground" }, " The default template for new Sigma rules ")
								])
							])]),
							_: 1
						}),
						createVNode(unref(CardFooter_default), null, {
							default: withCtx(() => [createVNode(unref(Button_default), { onClick: saveSettings }, {
								default: withCtx(() => [createTextVNode("Save Changes")]),
								_: 1
							})]),
							_: 1
						})
					];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(Card_default), null, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(unref(CardHeader_default), null, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) {
									_push$2(ssrRenderComponent(unref(CardTitle_default), null, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) _push$3(`Application Settings`);
											else return [createTextVNode("Application Settings")];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(ssrRenderComponent(unref(CardDescription_default), null, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) _push$3(`Configure application-wide settings`);
											else return [createTextVNode("Configure application-wide settings")];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
								} else return [createVNode(unref(CardTitle_default), null, {
									default: withCtx(() => [createTextVNode("Application Settings")]),
									_: 1
								}), createVNode(unref(CardDescription_default), null, {
									default: withCtx(() => [createTextVNode("Configure application-wide settings")]),
									_: 1
								})];
							}),
							_: 1
						}, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(CardContent_default), null, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) {
									_push$2(`<div class="space-y-4"${_scopeId$1}><div class="grid gap-2"${_scopeId$1}>`);
									_push$2(ssrRenderComponent(unref(Label_default), { for: "theme" }, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) _push$3(`Theme`);
											else return [createTextVNode("Theme")];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(ssrRenderComponent(unref(Select_default), { disabled: "" }, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) {
												_push$3(ssrRenderComponent(unref(SelectTrigger_default), {
													id: "theme",
													class: "w-full"
												}, {
													default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
														if (_push$4) _push$4(ssrRenderComponent(unref(SelectValue_default), { placeholder: "System default" }, null, _parent$4, _scopeId$3));
														else return [createVNode(unref(SelectValue_default), { placeholder: "System default" })];
													}),
													_: 1
												}, _parent$3, _scopeId$2));
												_push$3(ssrRenderComponent(unref(SelectContent_default), null, {
													default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
														if (_push$4) {
															_push$4(ssrRenderComponent(unref(SelectItem_default), { value: "light" }, {
																default: withCtx((_$4, _push$5, _parent$5, _scopeId$4) => {
																	if (_push$5) _push$5(`Light`);
																	else return [createTextVNode("Light")];
																}),
																_: 1
															}, _parent$4, _scopeId$3));
															_push$4(ssrRenderComponent(unref(SelectItem_default), { value: "dark" }, {
																default: withCtx((_$4, _push$5, _parent$5, _scopeId$4) => {
																	if (_push$5) _push$5(`Dark`);
																	else return [createTextVNode("Dark")];
																}),
																_: 1
															}, _parent$4, _scopeId$3));
															_push$4(ssrRenderComponent(unref(SelectItem_default), { value: "system" }, {
																default: withCtx((_$4, _push$5, _parent$5, _scopeId$4) => {
																	if (_push$5) _push$5(`System default`);
																	else return [createTextVNode("System default")];
																}),
																_: 1
															}, _parent$4, _scopeId$3));
														} else return [
															createVNode(unref(SelectItem_default), { value: "light" }, {
																default: withCtx(() => [createTextVNode("Light")]),
																_: 1
															}),
															createVNode(unref(SelectItem_default), { value: "dark" }, {
																default: withCtx(() => [createTextVNode("Dark")]),
																_: 1
															}),
															createVNode(unref(SelectItem_default), { value: "system" }, {
																default: withCtx(() => [createTextVNode("System default")]),
																_: 1
															})
														];
													}),
													_: 1
												}, _parent$3, _scopeId$2));
											} else return [createVNode(unref(SelectTrigger_default), {
												id: "theme",
												class: "w-full"
											}, {
												default: withCtx(() => [createVNode(unref(SelectValue_default), { placeholder: "System default" })]),
												_: 1
											}), createVNode(unref(SelectContent_default), null, {
												default: withCtx(() => [
													createVNode(unref(SelectItem_default), { value: "light" }, {
														default: withCtx(() => [createTextVNode("Light")]),
														_: 1
													}),
													createVNode(unref(SelectItem_default), { value: "dark" }, {
														default: withCtx(() => [createTextVNode("Dark")]),
														_: 1
													}),
													createVNode(unref(SelectItem_default), { value: "system" }, {
														default: withCtx(() => [createTextVNode("System default")]),
														_: 1
													})
												]),
												_: 1
											})];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(`<p class="text-sm text-muted-foreground"${_scopeId$1}> Coming soon: Application theme preference </p></div><div class="grid gap-2"${_scopeId$1}>`);
									_push$2(ssrRenderComponent(unref(Label_default), { for: "code-font-size" }, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) _push$3(`Code Font Size`);
											else return [createTextVNode("Code Font Size")];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(ssrRenderComponent(unref(Select_default), { disabled: "" }, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) {
												_push$3(ssrRenderComponent(unref(SelectTrigger_default), {
													id: "code-font-size",
													class: "w-full"
												}, {
													default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
														if (_push$4) _push$4(ssrRenderComponent(unref(SelectValue_default), { placeholder: "Medium (14px)" }, null, _parent$4, _scopeId$3));
														else return [createVNode(unref(SelectValue_default), { placeholder: "Medium (14px)" })];
													}),
													_: 1
												}, _parent$3, _scopeId$2));
												_push$3(ssrRenderComponent(unref(SelectContent_default), null, {
													default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
														if (_push$4) {
															_push$4(ssrRenderComponent(unref(SelectItem_default), { value: "small" }, {
																default: withCtx((_$4, _push$5, _parent$5, _scopeId$4) => {
																	if (_push$5) _push$5(`Small (12px)`);
																	else return [createTextVNode("Small (12px)")];
																}),
																_: 1
															}, _parent$4, _scopeId$3));
															_push$4(ssrRenderComponent(unref(SelectItem_default), { value: "medium" }, {
																default: withCtx((_$4, _push$5, _parent$5, _scopeId$4) => {
																	if (_push$5) _push$5(`Medium (14px)`);
																	else return [createTextVNode("Medium (14px)")];
																}),
																_: 1
															}, _parent$4, _scopeId$3));
															_push$4(ssrRenderComponent(unref(SelectItem_default), { value: "large" }, {
																default: withCtx((_$4, _push$5, _parent$5, _scopeId$4) => {
																	if (_push$5) _push$5(`Large (16px)`);
																	else return [createTextVNode("Large (16px)")];
																}),
																_: 1
															}, _parent$4, _scopeId$3));
														} else return [
															createVNode(unref(SelectItem_default), { value: "small" }, {
																default: withCtx(() => [createTextVNode("Small (12px)")]),
																_: 1
															}),
															createVNode(unref(SelectItem_default), { value: "medium" }, {
																default: withCtx(() => [createTextVNode("Medium (14px)")]),
																_: 1
															}),
															createVNode(unref(SelectItem_default), { value: "large" }, {
																default: withCtx(() => [createTextVNode("Large (16px)")]),
																_: 1
															})
														];
													}),
													_: 1
												}, _parent$3, _scopeId$2));
											} else return [createVNode(unref(SelectTrigger_default), {
												id: "code-font-size",
												class: "w-full"
											}, {
												default: withCtx(() => [createVNode(unref(SelectValue_default), { placeholder: "Medium (14px)" })]),
												_: 1
											}), createVNode(unref(SelectContent_default), null, {
												default: withCtx(() => [
													createVNode(unref(SelectItem_default), { value: "small" }, {
														default: withCtx(() => [createTextVNode("Small (12px)")]),
														_: 1
													}),
													createVNode(unref(SelectItem_default), { value: "medium" }, {
														default: withCtx(() => [createTextVNode("Medium (14px)")]),
														_: 1
													}),
													createVNode(unref(SelectItem_default), { value: "large" }, {
														default: withCtx(() => [createTextVNode("Large (16px)")]),
														_: 1
													})
												]),
												_: 1
											})];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(`<p class="text-sm text-muted-foreground"${_scopeId$1}> Coming soon: Change the font size in code editors </p></div></div>`);
								} else return [createVNode("div", { class: "space-y-4" }, [createVNode("div", { class: "grid gap-2" }, [
									createVNode(unref(Label_default), { for: "theme" }, {
										default: withCtx(() => [createTextVNode("Theme")]),
										_: 1
									}),
									createVNode(unref(Select_default), { disabled: "" }, {
										default: withCtx(() => [createVNode(unref(SelectTrigger_default), {
											id: "theme",
											class: "w-full"
										}, {
											default: withCtx(() => [createVNode(unref(SelectValue_default), { placeholder: "System default" })]),
											_: 1
										}), createVNode(unref(SelectContent_default), null, {
											default: withCtx(() => [
												createVNode(unref(SelectItem_default), { value: "light" }, {
													default: withCtx(() => [createTextVNode("Light")]),
													_: 1
												}),
												createVNode(unref(SelectItem_default), { value: "dark" }, {
													default: withCtx(() => [createTextVNode("Dark")]),
													_: 1
												}),
												createVNode(unref(SelectItem_default), { value: "system" }, {
													default: withCtx(() => [createTextVNode("System default")]),
													_: 1
												})
											]),
											_: 1
										})]),
										_: 1
									}),
									createVNode("p", { class: "text-sm text-muted-foreground" }, " Coming soon: Application theme preference ")
								]), createVNode("div", { class: "grid gap-2" }, [
									createVNode(unref(Label_default), { for: "code-font-size" }, {
										default: withCtx(() => [createTextVNode("Code Font Size")]),
										_: 1
									}),
									createVNode(unref(Select_default), { disabled: "" }, {
										default: withCtx(() => [createVNode(unref(SelectTrigger_default), {
											id: "code-font-size",
											class: "w-full"
										}, {
											default: withCtx(() => [createVNode(unref(SelectValue_default), { placeholder: "Medium (14px)" })]),
											_: 1
										}), createVNode(unref(SelectContent_default), null, {
											default: withCtx(() => [
												createVNode(unref(SelectItem_default), { value: "small" }, {
													default: withCtx(() => [createTextVNode("Small (12px)")]),
													_: 1
												}),
												createVNode(unref(SelectItem_default), { value: "medium" }, {
													default: withCtx(() => [createTextVNode("Medium (14px)")]),
													_: 1
												}),
												createVNode(unref(SelectItem_default), { value: "large" }, {
													default: withCtx(() => [createTextVNode("Large (16px)")]),
													_: 1
												})
											]),
											_: 1
										})]),
										_: 1
									}),
									createVNode("p", { class: "text-sm text-muted-foreground" }, " Coming soon: Change the font size in code editors ")
								])])];
							}),
							_: 1
						}, _parent$1, _scopeId));
					} else return [createVNode(unref(CardHeader_default), null, {
						default: withCtx(() => [createVNode(unref(CardTitle_default), null, {
							default: withCtx(() => [createTextVNode("Application Settings")]),
							_: 1
						}), createVNode(unref(CardDescription_default), null, {
							default: withCtx(() => [createTextVNode("Configure application-wide settings")]),
							_: 1
						})]),
						_: 1
					}), createVNode(unref(CardContent_default), null, {
						default: withCtx(() => [createVNode("div", { class: "space-y-4" }, [createVNode("div", { class: "grid gap-2" }, [
							createVNode(unref(Label_default), { for: "theme" }, {
								default: withCtx(() => [createTextVNode("Theme")]),
								_: 1
							}),
							createVNode(unref(Select_default), { disabled: "" }, {
								default: withCtx(() => [createVNode(unref(SelectTrigger_default), {
									id: "theme",
									class: "w-full"
								}, {
									default: withCtx(() => [createVNode(unref(SelectValue_default), { placeholder: "System default" })]),
									_: 1
								}), createVNode(unref(SelectContent_default), null, {
									default: withCtx(() => [
										createVNode(unref(SelectItem_default), { value: "light" }, {
											default: withCtx(() => [createTextVNode("Light")]),
											_: 1
										}),
										createVNode(unref(SelectItem_default), { value: "dark" }, {
											default: withCtx(() => [createTextVNode("Dark")]),
											_: 1
										}),
										createVNode(unref(SelectItem_default), { value: "system" }, {
											default: withCtx(() => [createTextVNode("System default")]),
											_: 1
										})
									]),
									_: 1
								})]),
								_: 1
							}),
							createVNode("p", { class: "text-sm text-muted-foreground" }, " Coming soon: Application theme preference ")
						]), createVNode("div", { class: "grid gap-2" }, [
							createVNode(unref(Label_default), { for: "code-font-size" }, {
								default: withCtx(() => [createTextVNode("Code Font Size")]),
								_: 1
							}),
							createVNode(unref(Select_default), { disabled: "" }, {
								default: withCtx(() => [createVNode(unref(SelectTrigger_default), {
									id: "code-font-size",
									class: "w-full"
								}, {
									default: withCtx(() => [createVNode(unref(SelectValue_default), { placeholder: "Medium (14px)" })]),
									_: 1
								}), createVNode(unref(SelectContent_default), null, {
									default: withCtx(() => [
										createVNode(unref(SelectItem_default), { value: "small" }, {
											default: withCtx(() => [createTextVNode("Small (12px)")]),
											_: 1
										}),
										createVNode(unref(SelectItem_default), { value: "medium" }, {
											default: withCtx(() => [createTextVNode("Medium (14px)")]),
											_: 1
										}),
										createVNode(unref(SelectItem_default), { value: "large" }, {
											default: withCtx(() => [createTextVNode("Large (16px)")]),
											_: 1
										})
									]),
									_: 1
								})]),
								_: 1
							}),
							createVNode("p", { class: "text-sm text-muted-foreground" }, " Coming soon: Change the font size in code editors ")
						])])]),
						_: 1
					})];
				}),
				_: 1
			}, _parent));
			_push(`</div></div>`);
		};
	}
});
var _sfc_setup = Settings_vue_vue_type_script_setup_true_lang_default.setup;
Settings_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/Settings.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Settings_default = Settings_vue_vue_type_script_setup_true_lang_default;
export { Settings_default as default };

//# sourceMappingURL=Settings-BisLyKjz.js.map