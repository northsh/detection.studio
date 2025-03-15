(function() {
	try {
		var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {};
		e.SENTRY_RELEASE = { id: "a2373c7004d0269c74d9ea84d69f613722a72468" };
	} catch (e) {}
})();
try {
	(function() {
		var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
		n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "8be7f008-80a7-4f1a-8c72-431301be4855", e._sentryDebugIdIdentifier = "sentry-dbid-8be7f008-80a7-4f1a-8c72-431301be4855");
	})();
} catch (e) {}
import { B as TooltipTrigger_default, C as DropdownMenuContent_default, D as getAvailablePipelines, E as useWorkspaceSharingStore, F as SidebarTrigger_default, G as cn, H as TooltipContent_default, I as Button_default, L as Separator_default, O as supportedSiems, P as Card_default, R as _plugin_vue_export_helper_default, S as DropdownMenuGroup_default, T as useWorkspaceStore, U as Tooltip_default, V as TooltipProvider_default, W as Input_default, _ as DropdownMenuSubContent_default, a as ScrollBar_default, b as DropdownMenuLabel_default, c as splunk_default, d as DialogHeader_default, f as DialogDescription_default, g as DropdownMenuSubTrigger_default, h as DropdownMenuTrigger_default, i as ScrollArea_default, l as DialogTrigger_default, m as Dialog_default, o as elasticsearch_default, p as DialogContent_default, r as Badge_default, s as grafana_default, u as DialogTitle_default, v as DropdownMenuSub_default, w as DropdownMenu_default, x as DropdownMenuItem_default, y as DropdownMenuSeparator_default, z as Skeleton_default } from "../main.mjs";
import { i as ComboboxItem_default, l as Combobox_default, o as ComboboxGroup_default, t as PrismEditor_default } from "./PrismEditor-TnP7lcFX.js";
import { t as Label_default } from "./label-Ds9pnXNm.js";
import { Fragment, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createStaticVNode, createTextVNode, createVNode, defineComponent, mergeProps, onBeforeUnmount, onMounted, openBlock, ref, renderList, renderSlot, resolveDynamicComponent, toDisplayString, unref, useSSRContext, useTemplateRef, watch, watchEffect, withCtx, withKeys, withModifiers } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderSlot, ssrRenderVNode } from "vue/server-renderer";
import { CheckboxIndicator, CheckboxRoot, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuItemIndicator, ContextMenuLabel, ContextMenuPortal, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuRoot, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger, DropdownMenuPortal, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger, Primitive, SplitterGroup, SplitterPanel as ResizablePanel, SplitterResizeHandle, TabsContent, TabsList, TabsRoot, TabsTrigger, useForwardProps, useForwardPropsEmits } from "reka-ui";
import { breakpointsTailwind, reactiveOmit, useBreakpoints, useClipboard, useDebounceFn, useElementSize, useFileDialog, useFocus, useWindowSize } from "@vueuse/core";
import { AlertCircleIcon, Check, CheckCircleIcon, ChevronDown, ChevronRight, Circle, Download, FileText, Files, Folder, Github, GripVertical, Loader2, LoaderIcon, MoreHorizontal, MoreVertical, PanelRightClose, PanelRightOpen, Plus, PlusIcon, SearchIcon, Share, TextCursor, Trash, X } from "lucide-vue-next";
import yaml from "js-yaml";
import { useHead } from "@unhead/vue";
import { v4 } from "uuid";
import { createTable, getCoreRowModel, getPaginationRowModel, useVueTable } from "@tanstack/vue-table";
import JSZip from "jszip";
import { useChangeCase } from "@vueuse/integrations/useChangeCase";
var Breadcrumb_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Breadcrumb",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<nav${ssrRenderAttrs(mergeProps({
				"aria-label": "breadcrumb",
				class: props.class
			}, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</nav>`);
		};
	}
});
var _sfc_setup$40 = Breadcrumb_vue_vue_type_script_setup_true_lang_default.setup;
Breadcrumb_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/breadcrumb/Breadcrumb.vue");
	return _sfc_setup$40 ? _sfc_setup$40(props, ctx) : void 0;
};
var BreadcrumbEllipsis_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "BreadcrumbEllipsis",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<span${ssrRenderAttrs(mergeProps({
				role: "presentation",
				"aria-hidden": "true",
				class: unref(cn)("flex h-9 w-9 items-center justify-center", props.class)
			}, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, () => {
				_push(ssrRenderComponent(unref(MoreHorizontal), { class: "h-4 w-4" }, null, _parent));
			}, _push, _parent);
			_push(`<span class="sr-only">More</span></span>`);
		};
	}
});
var _sfc_setup$39 = BreadcrumbEllipsis_vue_vue_type_script_setup_true_lang_default.setup;
BreadcrumbEllipsis_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/breadcrumb/BreadcrumbEllipsis.vue");
	return _sfc_setup$39 ? _sfc_setup$39(props, ctx) : void 0;
};
var BreadcrumbItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "BreadcrumbItem",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<li${ssrRenderAttrs(mergeProps({ class: unref(cn)("inline-flex items-center gap-1.5", props.class) }, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</li>`);
		};
	}
});
var _sfc_setup$38 = BreadcrumbItem_vue_vue_type_script_setup_true_lang_default.setup;
BreadcrumbItem_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/breadcrumb/BreadcrumbItem.vue");
	return _sfc_setup$38 ? _sfc_setup$38(props, ctx) : void 0;
};
var BreadcrumbLink_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "BreadcrumbLink",
	__ssrInlineRender: true,
	props: {
		asChild: { type: Boolean },
		as: { default: "a" },
		class: {}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Primitive), mergeProps({
				as: __props.as,
				"as-child": __props.asChild,
				class: unref(cn)("transition-colors hover:text-foreground", props.class)
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
var _sfc_setup$37 = BreadcrumbLink_vue_vue_type_script_setup_true_lang_default.setup;
BreadcrumbLink_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/breadcrumb/BreadcrumbLink.vue");
	return _sfc_setup$37 ? _sfc_setup$37(props, ctx) : void 0;
};
var BreadcrumbList_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "BreadcrumbList",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<ol${ssrRenderAttrs(mergeProps({ class: unref(cn)("flex flex-wrap items-center gap-1.5 wrap-break-word text-sm text-muted-foreground sm:gap-2.5", props.class) }, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</ol>`);
		};
	}
});
var _sfc_setup$36 = BreadcrumbList_vue_vue_type_script_setup_true_lang_default.setup;
BreadcrumbList_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/breadcrumb/BreadcrumbList.vue");
	return _sfc_setup$36 ? _sfc_setup$36(props, ctx) : void 0;
};
var BreadcrumbPage_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "BreadcrumbPage",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<span${ssrRenderAttrs(mergeProps({
				role: "link",
				"aria-disabled": "true",
				"aria-current": "page",
				class: unref(cn)("font-normal text-foreground", props.class)
			}, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</span>`);
		};
	}
});
var _sfc_setup$35 = BreadcrumbPage_vue_vue_type_script_setup_true_lang_default.setup;
BreadcrumbPage_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/breadcrumb/BreadcrumbPage.vue");
	return _sfc_setup$35 ? _sfc_setup$35(props, ctx) : void 0;
};
var BreadcrumbSeparator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "BreadcrumbSeparator",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<li${ssrRenderAttrs(mergeProps({
				role: "presentation",
				"aria-hidden": "true",
				class: unref(cn)("[&>svg]:size-3.5", props.class)
			}, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, () => {
				_push(ssrRenderComponent(unref(ChevronRight), null, null, _parent));
			}, _push, _parent);
			_push(`</li>`);
		};
	}
});
var _sfc_setup$34 = BreadcrumbSeparator_vue_vue_type_script_setup_true_lang_default.setup;
BreadcrumbSeparator_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/breadcrumb/BreadcrumbSeparator.vue");
	return _sfc_setup$34 ? _sfc_setup$34(props, ctx) : void 0;
};
var ResizableHandle_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ResizableHandle",
	__ssrInlineRender: true,
	props: {
		id: {},
		hitAreaMargins: {},
		tabindex: {},
		disabled: { type: Boolean },
		nonce: {},
		asChild: { type: Boolean },
		as: {},
		class: {},
		withHandle: { type: Boolean }
	},
	emits: ["dragging"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(SplitterResizeHandle), mergeProps(unref(forwarded), { class: unref(cn)("relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full data-[orientation=vertical]:after:left-0 data-[orientation=vertical]:after:h-1 data-[orientation=vertical]:after:w-full data-[orientation=vertical]:after:-translate-y-1/2 data-[orientation=vertical]:after:translate-x-0 [&[data-orientation=vertical]>div]:rotate-90", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) if (props.withHandle) {
						_push$1(`<div class="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border"${_scopeId}>`);
						_push$1(ssrRenderComponent(unref(GripVertical), { class: "h-2.5 w-2.5" }, null, _parent$1, _scopeId));
						_push$1(`</div>`);
					} else _push$1(`<!---->`);
					else return [props.withHandle ? (openBlock(), createBlock("div", {
						key: 0,
						class: "z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border"
					}, [createVNode(unref(GripVertical), { class: "h-2.5 w-2.5" })])) : createCommentVNode("", true)];
				}),
				_: 1
			}, _parent));
		};
	}
});
var _sfc_setup$33 = ResizableHandle_vue_vue_type_script_setup_true_lang_default.setup;
ResizableHandle_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/resizable/ResizableHandle.vue");
	return _sfc_setup$33 ? _sfc_setup$33(props, ctx) : void 0;
};
var ResizableHandle_default = ResizableHandle_vue_vue_type_script_setup_true_lang_default;
var ResizablePanelGroup_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ResizablePanelGroup",
	__ssrInlineRender: true,
	props: {
		id: {},
		autoSaveId: {},
		direction: {},
		keyboardResizeBy: {},
		storage: {},
		asChild: { type: Boolean },
		as: {},
		class: {}
	},
	emits: ["layout"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(SplitterGroup), mergeProps(unref(forwarded), { class: unref(cn)("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$32 = ResizablePanelGroup_vue_vue_type_script_setup_true_lang_default.setup;
ResizablePanelGroup_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/resizable/ResizablePanelGroup.vue");
	return _sfc_setup$32 ? _sfc_setup$32(props, ctx) : void 0;
};
var ResizablePanelGroup_default = ResizablePanelGroup_vue_vue_type_script_setup_true_lang_default;
var Tabs_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Tabs",
	__ssrInlineRender: true,
	props: {
		defaultValue: {},
		orientation: {},
		dir: {},
		activationMode: {},
		modelValue: {},
		unmountOnHide: { type: Boolean },
		asChild: { type: Boolean },
		as: {}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(TabsRoot), mergeProps(unref(forwarded), _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$31 = Tabs_vue_vue_type_script_setup_true_lang_default.setup;
Tabs_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/tabs/Tabs.vue");
	return _sfc_setup$31 ? _sfc_setup$31(props, ctx) : void 0;
};
var Tabs_default = Tabs_vue_vue_type_script_setup_true_lang_default;
var TabsContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "TabsContent",
	__ssrInlineRender: true,
	props: {
		value: {},
		forceMount: { type: Boolean },
		asChild: { type: Boolean },
		as: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		const delegatedProps = reactiveOmit(props, "class");
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(TabsContent), mergeProps({ class: unref(cn)("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", props.class) }, unref(delegatedProps), _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$30 = TabsContent_vue_vue_type_script_setup_true_lang_default.setup;
TabsContent_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/tabs/TabsContent.vue");
	return _sfc_setup$30 ? _sfc_setup$30(props, ctx) : void 0;
};
var TabsContent_default = TabsContent_vue_vue_type_script_setup_true_lang_default;
var TabsList_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "TabsList",
	__ssrInlineRender: true,
	props: {
		loop: { type: Boolean },
		asChild: { type: Boolean },
		as: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		const delegatedProps = reactiveOmit(props, "class");
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(TabsList), mergeProps(unref(delegatedProps), { class: unref(cn)("inline-flex items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$29 = TabsList_vue_vue_type_script_setup_true_lang_default.setup;
TabsList_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/tabs/TabsList.vue");
	return _sfc_setup$29 ? _sfc_setup$29(props, ctx) : void 0;
};
var TabsList_default = TabsList_vue_vue_type_script_setup_true_lang_default;
var TabsTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "TabsTrigger",
	__ssrInlineRender: true,
	props: {
		value: {},
		disabled: { type: Boolean },
		asChild: { type: Boolean },
		as: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		const forwardedProps = useForwardProps(reactiveOmit(props, "class"));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(TabsTrigger), mergeProps(unref(forwardedProps), { class: unref(cn)("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(`<span class="truncate"${_scopeId}>`);
						ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
						_push$1(`</span>`);
					} else return [createVNode("span", { class: "truncate" }, [renderSlot(_ctx.$slots, "default")])];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$28 = TabsTrigger_vue_vue_type_script_setup_true_lang_default.setup;
TabsTrigger_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/tabs/TabsTrigger.vue");
	return _sfc_setup$28 ? _sfc_setup$28(props, ctx) : void 0;
};
var TabsTrigger_default = TabsTrigger_vue_vue_type_script_setup_true_lang_default;
function sigmaTemplate() {
	return `title: Example Sigma Rule
id: ${v4()}
description: Detects suspicious activity
status: experimental
author: Your Name
date: 2023-10-01
logsource:
  category: process_creation
  product: windows
detection:
  selection:
    EventID: 4688
    CommandLine|contains:
      - "suspicious_command"
  condition: selection
falsepositives:
  - Legitimate administrative activity
level: high
tags:
  - attack.execution
  - attack.t1059
`;
}
function sigmaCorrelationTemplate() {
	return `title: Windows Failed Logon Event
id: ${v4()}
name: failed_logon # Rule Reference
description: Detects failed logon events on Windows systems.
logsource:
    product: windows
    service: security
detection:
    selection:
        EventID: 4625
    condition: selection
---
title: Multiple failed logons for a single user (possible brute force attack)
id: ${v4()}
correlation:
    type: event_count
    rules:
        - failed_logon # Referenced here
    group-by:
        - TargetUserName
        - TargetDomainName
    timespan: 5m
    condition:
        gte: 10
`;
}
function sigmaCorrelationTemplate$1() {
	return `title: High-privilege group enumeration
name: privileged_group_enumeration
id: ${v4()}
status: stable
logsource:
  product: windows
  service: security
detection:
  selection:
    EventID: 4799
    CallerProcessId: 0x0
    TargetUserName:
      - Administrators
      - Remote Desktop Users
      - Remote Management Users
      - Distributed COM Users
  condition: selection
level: informational
falsepositives:
  - Administrative activity
  - Directory assessment tools
---
title: Enumeration of multiple high-privilege groups by tools like BloodHound
id: ${v4()}
status: stable
correlation:
  type: value_count
  rules:
    - privileged_group_enumeration
  group-by:
    - SubjectUserName
  timespan: 15m
  condition:
    gte: 4
    field: TargetUserName
level: high
falsepositives:
  - Administrative activity
  - Directory assessment tools
`;
}
function sigmaCorrelationTemplate$2() {
	return `
title: Suspicious Scheduled Task Creation
id: ${v4()}
name: suspicious_schtask_creation
description: Detects the creation of a scheduled task with suspicious parameters
status: experimental
logsource:
  product: windows
  service: security
  category: process_creation
detection:
  selection:
    Image|endswith: 
      - '\\schtasks.exe'
    CommandLine|contains: 
      - ' /create '
      - ' /sc '
    CommandLine|contains|all:
      - '.exe'
  filter:
    User: 'NT AUTHORITY\\SYSTEM'
  condition: selection and not filter
falsepositives:
  - Legitimate task scheduling by administrators
  - Software installation and updates
tags:
  - attack.persistence
  - attack.t1053.005
---
title: Suspicious Process with System Privileges
id: ${v4()}
name: suspicious_system_process
description: Detects execution of suspicious processes with SYSTEM privileges
status: experimental
logsource:
  product: windows
  service: security
  category: process_creation
detection:
  selection:
    User: 'NT AUTHORITY\\SYSTEM'
    Image|endswith:
      - '\\powershell.exe'
      - '\\cmd.exe'
      - '\\wscript.exe'
      - '\\cscript.exe'
      - '\\rundll32.exe'
      - '\\regsvr32.exe'
    CommandLine|contains:
      - 'iex'
      - 'Invoke-Expression'
      - 'Invoke-WebRequest'
      - 'wget'
      - 'curl'
      - 'DownloadString'
      - 'DownloadFile'
      - 'WebClient'
      - 'hidden'
      - '-enc'
      - '-encoded'
      - '-e '
      - 'base64'
  condition: selection
falsepositives:
  - Administrative scripts
  - Software updates
tags:
  - attack.execution
  - attack.t1059
---
title: Potential Privilege Escalation via Scheduled Task Chain
id: ${v4()}
description: Detects a suspicious scheduled task creation followed by execution of suspicious process with SYSTEM privileges
status: experimental
correlation:
  type: temporal
  rules:
    - suspicious_schtask_creation
    - suspicious_system_process
  group-by:
    - Hostname
  timespan: 2m
level: high
tags:
  - attack.privilege_escalation
  - attack.persistence
  - attack.t1053.005
  - attack.execution
  - attack.t1059
falsepositives:
  - Legitimate administrative activity
  - Some automated software updates
references:
  - https://attack.mitre.org/techniques/T1053/005/
  - https://attack.mitre.org/techniques/T1059/
`;
}
const indentString = (str, count, indent = " ") => str.replace(/^/gm, indent.repeat(count));
const dedentString = (str) => {
	const match = str.match(/^\s+/);
	if (!match) return str;
	const indent = match[0];
	return str.replace(new RegExp("^" + indent, "gm"), "");
};
function sigmaFilterTemplate(file) {
	if (!file?.content) return "";
	let sigma_file = file.content;
	const sigmaYaml = yaml.loadAll(sigma_file);
	let logsourceYaml = yaml.dump(sigmaYaml[0]?.logsource ?? "").trim();
	const rule_id = sigmaYaml[0]?.id || v4();
	logsourceYaml = indentString(dedentString(logsourceYaml), 4);
	return `title: Filter Out Domain Controllers
id: ${v4()}
description: Filter out events from Domain Controllers
logsource:\n` + logsourceYaml + `
filter:
  rules:
    - ${rule_id}
  selection:
    ComputerName|startswith: "DC-"
  condition: not selection
`;
}
var SigmaPipeline = class {
	name = "Example Sigma Pipeline Config";
	priority = 100;
	transformations = [];
	addTransformation(id, type, fields, logsource) {
		delete logsource["definition"];
		this.transformations.push({
			id: id || v4(),
			type,
			...fields,
			rule_conditions: [{
				type: "logsource",
				...logsource
			}]
		});
	}
	addCondition(id, index, source, logsource) {
		delete logsource["definition"];
		this.transformations.push({
			id: id || v4(),
			type: "add_condition",
			conditions: {
				index,
				source
			},
			rule_conditions: [{
				type: "logsource",
				...logsource
			}]
		});
	}
	fieldMapping(id, mapping, logsource) {
		delete logsource["definition"];
		this.transformations.push({
			id: id || v4(),
			type: "field_name_mapping",
			mapping,
			rule_conditions: [{
				type: "logsource",
				...logsource
			}]
		});
	}
};
function sigmaPipelineTemplate(file, kind) {
	if (!file?.content) return "";
	const workStore = useWorkspaceStore();
	const sigma = computed(() => workStore.currentWorkspace?.sigmaStore());
	if (!kind) kind = sigma.value?.selected_siem || "splunk";
	const logsource = (yaml.loadAll(file.content)[0] ?? {})?.logsource || {};
	const pipeline = new SigmaPipeline();
	if (logsource) {
		if (kind === "splunk") pipeline.addCondition("prefix_source_and_index", "index_name", "Source/Type", logsource);
		if (kind === "esql") pipeline.addTransformation("prefix_esql_logs", "set_state", {
			key: "index",
			val: "logs-test-*"
		}, logsource);
		if (kind === "loki") pipeline.addTransformation("loki_custom_mapping", "set_custom_log_source", { selection: {
			job: "job-name",
			app: "loki"
		} }, logsource);
		pipeline.fieldMapping("map_fields", { status: "status" }, logsource);
	}
	return yaml.dump(pipeline);
}
var ContextMenu_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ContextMenu",
	__ssrInlineRender: true,
	props: {
		pressOpenDelay: {},
		dir: {},
		modal: { type: Boolean }
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(ContextMenuRoot), mergeProps(unref(forwarded), _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$27 = ContextMenu_vue_vue_type_script_setup_true_lang_default.setup;
ContextMenu_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/context-menu/ContextMenu.vue");
	return _sfc_setup$27 ? _sfc_setup$27(props, ctx) : void 0;
};
var ContextMenu_default = ContextMenu_vue_vue_type_script_setup_true_lang_default;
var ContextMenuCheckboxItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ContextMenuCheckboxItem",
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
			_push(ssrRenderComponent(unref(ContextMenuCheckboxItem), mergeProps(unref(forwarded), { class: unref(cn)("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(`<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center"${_scopeId}>`);
						_push$1(ssrRenderComponent(unref(ContextMenuItemIndicator), null, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) _push$2(ssrRenderComponent(unref(Check), { class: "h-4 w-4" }, null, _parent$2, _scopeId$1));
								else return [createVNode(unref(Check), { class: "h-4 w-4" })];
							}),
							_: 1
						}, _parent$1, _scopeId));
						_push$1(`</span>`);
						ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					} else return [createVNode("span", { class: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center" }, [createVNode(unref(ContextMenuItemIndicator), null, {
						default: withCtx(() => [createVNode(unref(Check), { class: "h-4 w-4" })]),
						_: 1
					})]), renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$26 = ContextMenuCheckboxItem_vue_vue_type_script_setup_true_lang_default.setup;
ContextMenuCheckboxItem_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/context-menu/ContextMenuCheckboxItem.vue");
	return _sfc_setup$26 ? _sfc_setup$26(props, ctx) : void 0;
};
var ContextMenuContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ContextMenuContent",
	__ssrInlineRender: true,
	props: {
		forceMount: { type: Boolean },
		loop: { type: Boolean },
		sideFlip: { type: Boolean },
		alignOffset: {},
		alignFlip: { type: Boolean },
		avoidCollisions: { type: Boolean },
		collisionBoundary: {},
		collisionPadding: {},
		sticky: {},
		hideWhenDetached: { type: Boolean },
		positionStrategy: {},
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
			_push(ssrRenderComponent(unref(ContextMenuPortal), _attrs, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(ssrRenderComponent(unref(ContextMenuContent), mergeProps(unref(forwarded), { class: unref(cn)("z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", props.class) }), {
						default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
							if (_push$2) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$2, _parent$2, _scopeId$1);
							else return [renderSlot(_ctx.$slots, "default")];
						}),
						_: 3
					}, _parent$1, _scopeId));
					else return [createVNode(unref(ContextMenuContent), mergeProps(unref(forwarded), { class: unref(cn)("z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", props.class) }), {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
						_: 3
					}, 16, ["class"])];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$25 = ContextMenuContent_vue_vue_type_script_setup_true_lang_default.setup;
ContextMenuContent_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/context-menu/ContextMenuContent.vue");
	return _sfc_setup$25 ? _sfc_setup$25(props, ctx) : void 0;
};
var ContextMenuContent_default = ContextMenuContent_vue_vue_type_script_setup_true_lang_default;
var ContextMenuGroup_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ContextMenuGroup",
	__ssrInlineRender: true,
	props: {
		asChild: { type: Boolean },
		as: {}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(ContextMenuGroup), mergeProps(props, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$24 = ContextMenuGroup_vue_vue_type_script_setup_true_lang_default.setup;
ContextMenuGroup_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/context-menu/ContextMenuGroup.vue");
	return _sfc_setup$24 ? _sfc_setup$24(props, ctx) : void 0;
};
var ContextMenuItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ContextMenuItem",
	__ssrInlineRender: true,
	props: {
		disabled: { type: Boolean },
		textValue: {},
		asChild: { type: Boolean },
		as: {},
		class: {},
		inset: { type: Boolean }
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(ContextMenuItem), mergeProps(unref(forwarded), { class: unref(cn)("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50", __props.inset && "pl-8", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$23 = ContextMenuItem_vue_vue_type_script_setup_true_lang_default.setup;
ContextMenuItem_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/context-menu/ContextMenuItem.vue");
	return _sfc_setup$23 ? _sfc_setup$23(props, ctx) : void 0;
};
var ContextMenuItem_default = ContextMenuItem_vue_vue_type_script_setup_true_lang_default;
var ContextMenuLabel_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ContextMenuLabel",
	__ssrInlineRender: true,
	props: {
		asChild: { type: Boolean },
		as: {},
		class: {},
		inset: { type: Boolean }
	},
	setup(__props) {
		const props = __props;
		const delegatedProps = reactiveOmit(props, "class");
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(ContextMenuLabel), mergeProps(unref(delegatedProps), { class: unref(cn)("px-2 py-1.5 text-sm font-semibold text-foreground", __props.inset && "pl-8", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$22 = ContextMenuLabel_vue_vue_type_script_setup_true_lang_default.setup;
ContextMenuLabel_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/context-menu/ContextMenuLabel.vue");
	return _sfc_setup$22 ? _sfc_setup$22(props, ctx) : void 0;
};
var ContextMenuRadioGroup_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ContextMenuRadioGroup",
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
			_push(ssrRenderComponent(unref(ContextMenuRadioGroup), mergeProps(unref(forwarded), _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$21 = ContextMenuRadioGroup_vue_vue_type_script_setup_true_lang_default.setup;
ContextMenuRadioGroup_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/context-menu/ContextMenuRadioGroup.vue");
	return _sfc_setup$21 ? _sfc_setup$21(props, ctx) : void 0;
};
var ContextMenuRadioItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ContextMenuRadioItem",
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
			_push(ssrRenderComponent(unref(ContextMenuRadioItem), mergeProps(unref(forwarded), { class: unref(cn)("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(`<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center"${_scopeId}>`);
						_push$1(ssrRenderComponent(unref(ContextMenuItemIndicator), null, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) _push$2(ssrRenderComponent(unref(Circle), { class: "h-4 w-4 fill-current" }, null, _parent$2, _scopeId$1));
								else return [createVNode(unref(Circle), { class: "h-4 w-4 fill-current" })];
							}),
							_: 1
						}, _parent$1, _scopeId));
						_push$1(`</span>`);
						ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					} else return [createVNode("span", { class: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center" }, [createVNode(unref(ContextMenuItemIndicator), null, {
						default: withCtx(() => [createVNode(unref(Circle), { class: "h-4 w-4 fill-current" })]),
						_: 1
					})]), renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$20 = ContextMenuRadioItem_vue_vue_type_script_setup_true_lang_default.setup;
ContextMenuRadioItem_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/context-menu/ContextMenuRadioItem.vue");
	return _sfc_setup$20 ? _sfc_setup$20(props, ctx) : void 0;
};
var ContextMenuSeparator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ContextMenuSeparator",
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
			_push(ssrRenderComponent(unref(ContextMenuSeparator), mergeProps(unref(delegatedProps), { class: unref(cn)("-mx-1 my-1 h-px bg-border", props.class) }, _attrs), null, _parent));
		};
	}
});
var _sfc_setup$19 = ContextMenuSeparator_vue_vue_type_script_setup_true_lang_default.setup;
ContextMenuSeparator_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/context-menu/ContextMenuSeparator.vue");
	return _sfc_setup$19 ? _sfc_setup$19(props, ctx) : void 0;
};
var ContextMenuSeparator_default = ContextMenuSeparator_vue_vue_type_script_setup_true_lang_default;
var ContextMenuShortcut_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ContextMenuShortcut",
	__ssrInlineRender: true,
	props: { class: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<span${ssrRenderAttrs(mergeProps({ class: unref(cn)("ml-auto text-xs tracking-widest text-muted-foreground", props.class) }, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</span>`);
		};
	}
});
var _sfc_setup$18 = ContextMenuShortcut_vue_vue_type_script_setup_true_lang_default.setup;
ContextMenuShortcut_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/context-menu/ContextMenuShortcut.vue");
	return _sfc_setup$18 ? _sfc_setup$18(props, ctx) : void 0;
};
var ContextMenuSub_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ContextMenuSub",
	__ssrInlineRender: true,
	props: {
		defaultOpen: { type: Boolean },
		open: { type: Boolean }
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(ContextMenuSub), mergeProps(unref(forwarded), _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$17 = ContextMenuSub_vue_vue_type_script_setup_true_lang_default.setup;
ContextMenuSub_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/context-menu/ContextMenuSub.vue");
	return _sfc_setup$17 ? _sfc_setup$17(props, ctx) : void 0;
};
var ContextMenuSubContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ContextMenuSubContent",
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
			_push(ssrRenderComponent(unref(ContextMenuSubContent), mergeProps(unref(forwarded), { class: unref(cn)("z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$16 = ContextMenuSubContent_vue_vue_type_script_setup_true_lang_default.setup;
ContextMenuSubContent_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/context-menu/ContextMenuSubContent.vue");
	return _sfc_setup$16 ? _sfc_setup$16(props, ctx) : void 0;
};
var ContextMenuSubTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ContextMenuSubTrigger",
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
			_push(ssrRenderComponent(unref(ContextMenuSubTrigger), mergeProps(unref(forwardedProps), { class: unref(cn)("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground", __props.inset && "pl-8", props.class) }, _attrs), {
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
var _sfc_setup$15 = ContextMenuSubTrigger_vue_vue_type_script_setup_true_lang_default.setup;
ContextMenuSubTrigger_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/context-menu/ContextMenuSubTrigger.vue");
	return _sfc_setup$15 ? _sfc_setup$15(props, ctx) : void 0;
};
var ContextMenuTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ContextMenuTrigger",
	__ssrInlineRender: true,
	props: {
		disabled: { type: Boolean },
		asChild: { type: Boolean },
		as: {}
	},
	setup(__props) {
		const forwardedProps = useForwardProps(__props);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(ContextMenuTrigger), mergeProps(unref(forwardedProps), _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$14 = ContextMenuTrigger_vue_vue_type_script_setup_true_lang_default.setup;
ContextMenuTrigger_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/context-menu/ContextMenuTrigger.vue");
	return _sfc_setup$14 ? _sfc_setup$14(props, ctx) : void 0;
};
var ContextMenuTrigger_default = ContextMenuTrigger_vue_vue_type_script_setup_true_lang_default;
var FileListItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "FileListItem",
	__ssrInlineRender: true,
	props: { file: {} },
	setup(__props) {
		const workspace = useWorkspaceStore();
		const fs = computed(() => workspace.currentWorkspace?.fileStore());
		const sigma = computed(() => workspace.currentWorkspace?.sigmaStore());
		const inputRef = useTemplateRef("rename-input");
		const { focused } = useFocus(computed(() => inputRef?.value?.$el));
		watchEffect(() => {
			focused.value = !!inputRef.value;
			if (focused.value) inputRef.value?.$el.select();
		}, { flush: "post" });
		const debounceFocus = useDebounceFn(() => {
			if (!focused.value) fs.value.saveRename();
		}, 100);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(ContextMenu_default), _attrs, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(unref(ContextMenuTrigger_default), null, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) {
									_push$2(`<div class="group relative"${_scopeId$1}>`);
									_push$2(ssrRenderComponent(unref(Button_default), {
										class: ["w-full justify-start h-7 px-2 hover:bg-muted/50 flex gap-2 outline-primary/30", fs.value.currentlyOpenFileId == __props.file.id && "bg-muted outline-1"],
										variant: "ghost",
										onClick: ($event) => fs.value.openFile(__props.file.id)
									}, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) {
												_push$3(ssrRenderComponent(unref(FileText), { class: "ml-4 text-muted-foreground min-h-4 min-w-4 h-4 w-4" }, null, _parent$3, _scopeId$2));
												if (fs.value.fileBeingEdited === __props.file.id) {
													_push$3(`<span${_scopeId$2}>`);
													_push$3(ssrRenderComponent(unref(Input_default), {
														ref: "rename-input",
														modelValue: fs.value.editingFileName,
														"onUpdate:modelValue": ($event) => fs.value.editingFileName = $event,
														class: "bg-transparent border-none outline-hidden focus:ring-1 focus:ring-primary px-1 -ml-1 h-8",
														onBlur: unref(debounceFocus),
														onKeyup: [fs.value.saveRename, fs.value.cancelRename]
													}, null, _parent$3, _scopeId$2));
													_push$3(`</span>`);
												} else _push$3(`<span class="truncate"${_scopeId$2}>${ssrInterpolate(__props.file.name)}<span class="pl-0.5 text-muted-foreground/70 truncate"${_scopeId$2}>.yml</span></span>`);
												_push$3(`<div class="grow"${_scopeId$2}></div>`);
												_push$3(ssrRenderComponent(unref(Tooltip_default), null, {
													default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
														if (_push$4) {
															_push$4(ssrRenderComponent(unref(TooltipTrigger_default), null, {
																default: withCtx((_$4, _push$5, _parent$5, _scopeId$4) => {
																	if (_push$5) if (sigma.value.active_sigma_rule_file_id === __props.file.id) _push$5(`<span class="block rounded-full bg-sky-500 h-2 w-2"${_scopeId$4}></span>`);
																	else _push$5(`<!---->`);
																	else return [sigma.value.active_sigma_rule_file_id === __props.file.id ? (openBlock(), createBlock("span", {
																		key: 0,
																		class: "block rounded-full bg-sky-500 h-2 w-2"
																	})) : createCommentVNode("", true)];
																}),
																_: 1
															}, _parent$4, _scopeId$3));
															_push$4(ssrRenderComponent(unref(TooltipContent_default), {
																align: "start",
																side: "bottom"
															}, {
																default: withCtx((_$4, _push$5, _parent$5, _scopeId$4) => {
																	if (_push$5) _push$5(`<p${_scopeId$4}>Active Sigma Rule</p>`);
																	else return [createVNode("p", null, "Active Sigma Rule")];
																}),
																_: 1
															}, _parent$4, _scopeId$3));
														} else return [createVNode(unref(TooltipTrigger_default), null, {
															default: withCtx(() => [sigma.value.active_sigma_rule_file_id === __props.file.id ? (openBlock(), createBlock("span", {
																key: 0,
																class: "block rounded-full bg-sky-500 h-2 w-2"
															})) : createCommentVNode("", true)]),
															_: 1
														}), createVNode(unref(TooltipContent_default), {
															align: "start",
															side: "bottom"
														}, {
															default: withCtx(() => [createVNode("p", null, "Active Sigma Rule")]),
															_: 1
														})];
													}),
													_: 1
												}, _parent$3, _scopeId$2));
											} else return [
												createVNode(unref(FileText), { class: "ml-4 text-muted-foreground min-h-4 min-w-4 h-4 w-4" }),
												fs.value.fileBeingEdited === __props.file.id ? (openBlock(), createBlock("span", {
													key: 0,
													onClick: withModifiers(() => {}, ["stop"])
												}, [createVNode(unref(Input_default), {
													ref: "rename-input",
													modelValue: fs.value.editingFileName,
													"onUpdate:modelValue": ($event) => fs.value.editingFileName = $event,
													class: "bg-transparent border-none outline-hidden focus:ring-1 focus:ring-primary px-1 -ml-1 h-8",
													onBlur: unref(debounceFocus),
													onKeyup: [withKeys(fs.value.saveRename, ["enter"]), withKeys(fs.value.cancelRename, ["esc"])]
												}, null, 8, [
													"modelValue",
													"onUpdate:modelValue",
													"onBlur",
													"onKeyup"
												])], 8, ["onClick"])) : (openBlock(), createBlock("span", {
													key: 1,
													class: "truncate",
													onDblclick: ($event) => fs.value.startRename(__props.file.id)
												}, [createTextVNode(toDisplayString(__props.file.name), 1), createVNode("span", { class: "pl-0.5 text-muted-foreground/70 truncate" }, ".yml")], 40, ["onDblclick"])),
												createVNode("div", { class: "grow" }),
												createVNode(unref(Tooltip_default), null, {
													default: withCtx(() => [createVNode(unref(TooltipTrigger_default), null, {
														default: withCtx(() => [sigma.value.active_sigma_rule_file_id === __props.file.id ? (openBlock(), createBlock("span", {
															key: 0,
															class: "block rounded-full bg-sky-500 h-2 w-2"
														})) : createCommentVNode("", true)]),
														_: 1
													}), createVNode(unref(TooltipContent_default), {
														align: "start",
														side: "bottom"
													}, {
														default: withCtx(() => [createVNode("p", null, "Active Sigma Rule")]),
														_: 1
													})]),
													_: 1
												})
											];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(`</div>`);
								} else return [createVNode("div", { class: "group relative" }, [createVNode(unref(Button_default), {
									class: ["w-full justify-start h-7 px-2 hover:bg-muted/50 flex gap-2 outline-primary/30", fs.value.currentlyOpenFileId == __props.file.id && "bg-muted outline-1"],
									variant: "ghost",
									onClick: ($event) => fs.value.openFile(__props.file.id)
								}, {
									default: withCtx(() => [
										createVNode(unref(FileText), { class: "ml-4 text-muted-foreground min-h-4 min-w-4 h-4 w-4" }),
										fs.value.fileBeingEdited === __props.file.id ? (openBlock(), createBlock("span", {
											key: 0,
											onClick: withModifiers(() => {}, ["stop"])
										}, [createVNode(unref(Input_default), {
											ref: "rename-input",
											modelValue: fs.value.editingFileName,
											"onUpdate:modelValue": ($event) => fs.value.editingFileName = $event,
											class: "bg-transparent border-none outline-hidden focus:ring-1 focus:ring-primary px-1 -ml-1 h-8",
											onBlur: unref(debounceFocus),
											onKeyup: [withKeys(fs.value.saveRename, ["enter"]), withKeys(fs.value.cancelRename, ["esc"])]
										}, null, 8, [
											"modelValue",
											"onUpdate:modelValue",
											"onBlur",
											"onKeyup"
										])], 8, ["onClick"])) : (openBlock(), createBlock("span", {
											key: 1,
											class: "truncate",
											onDblclick: ($event) => fs.value.startRename(__props.file.id)
										}, [createTextVNode(toDisplayString(__props.file.name), 1), createVNode("span", { class: "pl-0.5 text-muted-foreground/70 truncate" }, ".yml")], 40, ["onDblclick"])),
										createVNode("div", { class: "grow" }),
										createVNode(unref(Tooltip_default), null, {
											default: withCtx(() => [createVNode(unref(TooltipTrigger_default), null, {
												default: withCtx(() => [sigma.value.active_sigma_rule_file_id === __props.file.id ? (openBlock(), createBlock("span", {
													key: 0,
													class: "block rounded-full bg-sky-500 h-2 w-2"
												})) : createCommentVNode("", true)]),
												_: 1
											}), createVNode(unref(TooltipContent_default), {
												align: "start",
												side: "bottom"
											}, {
												default: withCtx(() => [createVNode("p", null, "Active Sigma Rule")]),
												_: 1
											})]),
											_: 1
										})
									]),
									_: 1
								}, 8, ["class", "onClick"])])];
							}),
							_: 1
						}, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(ContextMenuContent_default), null, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) {
									_push$2(ssrRenderComponent(unref(ContextMenuItem_default), { onClick: ($event) => fs.value.openFile(__props.file.id) }, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) _push$3(`Open`);
											else return [createTextVNode("Open")];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(ssrRenderComponent(unref(ContextMenuSeparator_default), null, null, _parent$2, _scopeId$1));
									_push$2(ssrRenderComponent(unref(ContextMenuItem_default), { disabled: "" }, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) _push$3(`Create Filter`);
											else return [createTextVNode("Create Filter")];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(ssrRenderComponent(unref(ContextMenuItem_default), { disabled: "" }, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) _push$3(`Create Field Mapping Pipeline`);
											else return [createTextVNode("Create Field Mapping Pipeline")];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(ssrRenderComponent(unref(ContextMenuItem_default), { disabled: "" }, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) _push$3(`Create Logsource Pipeline`);
											else return [createTextVNode("Create Logsource Pipeline")];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(ssrRenderComponent(unref(ContextMenuSeparator_default), null, null, _parent$2, _scopeId$1));
									_push$2(ssrRenderComponent(unref(ContextMenuItem_default), { onClick: ($event) => fs.value.duplicateFile(__props.file.id) }, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) _push$3(`Duplicate`);
											else return [createTextVNode("Duplicate")];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(ssrRenderComponent(unref(ContextMenuItem_default), { onClick: ($event) => fs.value.startRename(__props.file.id) }, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) _push$3(`Rename`);
											else return [createTextVNode("Rename")];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(ssrRenderComponent(unref(ContextMenuItem_default), {
										class: "text-red-600",
										onClick: ($event) => fs.value.deleteFile(__props.file.id)
									}, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) _push$3(`Delete`);
											else return [createTextVNode("Delete")];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
								} else return [
									createVNode(unref(ContextMenuItem_default), { onClick: ($event) => fs.value.openFile(__props.file.id) }, {
										default: withCtx(() => [createTextVNode("Open")]),
										_: 1
									}, 8, ["onClick"]),
									createVNode(unref(ContextMenuSeparator_default)),
									createVNode(unref(ContextMenuItem_default), { disabled: "" }, {
										default: withCtx(() => [createTextVNode("Create Filter")]),
										_: 1
									}),
									createVNode(unref(ContextMenuItem_default), { disabled: "" }, {
										default: withCtx(() => [createTextVNode("Create Field Mapping Pipeline")]),
										_: 1
									}),
									createVNode(unref(ContextMenuItem_default), { disabled: "" }, {
										default: withCtx(() => [createTextVNode("Create Logsource Pipeline")]),
										_: 1
									}),
									createVNode(unref(ContextMenuSeparator_default)),
									createVNode(unref(ContextMenuItem_default), { onClick: ($event) => fs.value.duplicateFile(__props.file.id) }, {
										default: withCtx(() => [createTextVNode("Duplicate")]),
										_: 1
									}, 8, ["onClick"]),
									createVNode(unref(ContextMenuItem_default), { onClick: ($event) => fs.value.startRename(__props.file.id) }, {
										default: withCtx(() => [createTextVNode("Rename")]),
										_: 1
									}, 8, ["onClick"]),
									createVNode(unref(ContextMenuItem_default), {
										class: "text-red-600",
										onClick: ($event) => fs.value.deleteFile(__props.file.id)
									}, {
										default: withCtx(() => [createTextVNode("Delete")]),
										_: 1
									}, 8, ["onClick"])
								];
							}),
							_: 1
						}, _parent$1, _scopeId));
					} else return [createVNode(unref(ContextMenuTrigger_default), null, {
						default: withCtx(() => [createVNode("div", { class: "group relative" }, [createVNode(unref(Button_default), {
							class: ["w-full justify-start h-7 px-2 hover:bg-muted/50 flex gap-2 outline-primary/30", fs.value.currentlyOpenFileId == __props.file.id && "bg-muted outline-1"],
							variant: "ghost",
							onClick: ($event) => fs.value.openFile(__props.file.id)
						}, {
							default: withCtx(() => [
								createVNode(unref(FileText), { class: "ml-4 text-muted-foreground min-h-4 min-w-4 h-4 w-4" }),
								fs.value.fileBeingEdited === __props.file.id ? (openBlock(), createBlock("span", {
									key: 0,
									onClick: withModifiers(() => {}, ["stop"])
								}, [createVNode(unref(Input_default), {
									ref: "rename-input",
									modelValue: fs.value.editingFileName,
									"onUpdate:modelValue": ($event) => fs.value.editingFileName = $event,
									class: "bg-transparent border-none outline-hidden focus:ring-1 focus:ring-primary px-1 -ml-1 h-8",
									onBlur: unref(debounceFocus),
									onKeyup: [withKeys(fs.value.saveRename, ["enter"]), withKeys(fs.value.cancelRename, ["esc"])]
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"onBlur",
									"onKeyup"
								])], 8, ["onClick"])) : (openBlock(), createBlock("span", {
									key: 1,
									class: "truncate",
									onDblclick: ($event) => fs.value.startRename(__props.file.id)
								}, [createTextVNode(toDisplayString(__props.file.name), 1), createVNode("span", { class: "pl-0.5 text-muted-foreground/70 truncate" }, ".yml")], 40, ["onDblclick"])),
								createVNode("div", { class: "grow" }),
								createVNode(unref(Tooltip_default), null, {
									default: withCtx(() => [createVNode(unref(TooltipTrigger_default), null, {
										default: withCtx(() => [sigma.value.active_sigma_rule_file_id === __props.file.id ? (openBlock(), createBlock("span", {
											key: 0,
											class: "block rounded-full bg-sky-500 h-2 w-2"
										})) : createCommentVNode("", true)]),
										_: 1
									}), createVNode(unref(TooltipContent_default), {
										align: "start",
										side: "bottom"
									}, {
										default: withCtx(() => [createVNode("p", null, "Active Sigma Rule")]),
										_: 1
									})]),
									_: 1
								})
							]),
							_: 1
						}, 8, ["class", "onClick"])])]),
						_: 1
					}), createVNode(unref(ContextMenuContent_default), null, {
						default: withCtx(() => [
							createVNode(unref(ContextMenuItem_default), { onClick: ($event) => fs.value.openFile(__props.file.id) }, {
								default: withCtx(() => [createTextVNode("Open")]),
								_: 1
							}, 8, ["onClick"]),
							createVNode(unref(ContextMenuSeparator_default)),
							createVNode(unref(ContextMenuItem_default), { disabled: "" }, {
								default: withCtx(() => [createTextVNode("Create Filter")]),
								_: 1
							}),
							createVNode(unref(ContextMenuItem_default), { disabled: "" }, {
								default: withCtx(() => [createTextVNode("Create Field Mapping Pipeline")]),
								_: 1
							}),
							createVNode(unref(ContextMenuItem_default), { disabled: "" }, {
								default: withCtx(() => [createTextVNode("Create Logsource Pipeline")]),
								_: 1
							}),
							createVNode(unref(ContextMenuSeparator_default)),
							createVNode(unref(ContextMenuItem_default), { onClick: ($event) => fs.value.duplicateFile(__props.file.id) }, {
								default: withCtx(() => [createTextVNode("Duplicate")]),
								_: 1
							}, 8, ["onClick"]),
							createVNode(unref(ContextMenuItem_default), { onClick: ($event) => fs.value.startRename(__props.file.id) }, {
								default: withCtx(() => [createTextVNode("Rename")]),
								_: 1
							}, 8, ["onClick"]),
							createVNode(unref(ContextMenuItem_default), {
								class: "text-red-600",
								onClick: ($event) => fs.value.deleteFile(__props.file.id)
							}, {
								default: withCtx(() => [createTextVNode("Delete")]),
								_: 1
							}, 8, ["onClick"])
						]),
						_: 1
					})];
				}),
				_: 1
			}, _parent));
		};
	}
});
var _sfc_setup$13 = FileListItem_vue_vue_type_script_setup_true_lang_default.setup;
FileListItem_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/FileListItem.vue");
	return _sfc_setup$13 ? _sfc_setup$13(props, ctx) : void 0;
};
var FileListItem_default = FileListItem_vue_vue_type_script_setup_true_lang_default;
var _hoisted_1 = {
	xmlns: "http://www.w3.org/2000/svg",
	"xmlns:xlink": "http://www.w3.org/1999/xlink",
	viewBox: "0 0 559 539"
};
function render(_ctx, _cache) {
	return openBlock(), createElementBlock("svg", _hoisted_1, [..._cache[0] || (_cache[0] = [createStaticVNode("<defs><filter id=\"a\" width=\"117.4%\" height=\"120.7%\" x=\"-8.7%\" y=\"-10.4%\" filterUnits=\"objectBoundingBox\"><feGaussianBlur in=\"SourceGraphic\" stdDeviation=\"14.4\"></feGaussianBlur></filter><filter id=\"c\" width=\"103.6%\" height=\"104.3%\" x=\"-1.8%\" y=\"-2.2%\" filterUnits=\"objectBoundingBox\"><feMorphology in=\"SourceAlpha\" radius=\"9\" result=\"shadowSpreadInner1\"></feMorphology><feGaussianBlur in=\"shadowSpreadInner1\" result=\"shadowBlurInner1\" stdDeviation=\"4.5\"></feGaussianBlur><feOffset in=\"shadowBlurInner1\" result=\"shadowOffsetInner1\"></feOffset><feComposite in=\"shadowOffsetInner1\" in2=\"SourceAlpha\" k2=\"-1\" k3=\"1\" operator=\"arithmetic\" result=\"shadowInnerInner1\"></feComposite><feColorMatrix in=\"shadowInnerInner1\" values=\"0 0 0 0 0.23 0 0 0 0 0.935833333 0 0 0 0 1 0 0 0 0.308484484 0\"></feColorMatrix></filter><path id=\"b\" d=\"M557.43 60.824q3.11 26.304-17.038 50.655-20.146 24.35-54.25 24.35l-43.232.25c27.043 36.17 41.174 82.68 36.798 133.421-9.938 115.249-111.587 208.676-227.04 208.676S51.68 384.75 61.618 269.5 173.205 60.824 288.658 60.824zm-275.342 76.183c-73.303 0-137.842 59.32-144.152 132.493-6.31 73.174 47.999 132.493 121.302 132.493S397.08 342.673 403.39 269.5c6.31-73.174-47.998-132.493-121.302-132.493\"></path></defs><g fill=\"none\" fill-rule=\"nonzero\"><path fill=\"none\" fill-opacity=\"0\" d=\"M557.43 62.518q3.11 26.305-17.038 50.656-20.146 24.35-54.25 24.35l-43.232.25c27.043 36.17 41.174 82.68 36.798 133.421-9.938 115.249-111.587 208.676-227.04 208.676S51.68 386.444 61.618 271.195 173.205 62.518 288.658 62.518zm-275.342 76.184c-73.303 0-137.842 59.32-144.152 132.493-6.31 73.174 47.999 132.493 121.302 132.493s137.842-59.32 144.152-132.493c6.31-73.174-47.998-132.493-121.302-132.493\" filter=\"url(#a)\" opacity=\".243\" transform=\"translate(.77)\"></path><g transform=\"translate(.77)\"><use xlink:href=\"#b\" fill=\"#1FD1FF\"></use><use xlink:href=\"#b\" fill=\"#000\" filter=\"url(#c)\"></use></g></g>", 2)])]);
}
var sigma_default = { render };
var FileList_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "FileList",
	__ssrInlineRender: true,
	setup(__props) {
		const workspace = useWorkspaceStore();
		const fs = computed(() => workspace.currentWorkspace?.fileStore());
		const sigma = computed(() => workspace.currentWorkspace?.sigmaStore());
		const templates = {
			sigma: sigmaTemplate,
			correlation: sigmaCorrelationTemplate,
			filter: () => sigmaFilterTemplate(fs.value.getFile(sigma.value.active_sigma_rule_file_id)),
			pipeline: () => sigmaPipelineTemplate(fs.value.getFile(sigma.value.active_sigma_rule_file_id)),
			eventCount: sigmaCorrelationTemplate,
			valueCount: sigmaCorrelationTemplate$1,
			temporal: sigmaCorrelationTemplate$2
		};
		const newFile = (rule_type, template = "") => {
			fs.value.addFile({
				name: `new_${rule_type}_rule`,
				content: (templates[template] ?? templates[rule_type])(),
				type: rule_type
			});
		};
		const groupedFiles = computed(function() {
			return {
				config: fs.value.files.filter((f) => f.type === "pipeline"),
				filters: fs.value.files.filter((f) => f.type === "filter"),
				rules: fs.value.files.filter((f) => ["sigma", "correlation"].includes(f.type))
			};
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col h-full" }, _attrs))} data-v-1dc2210d><div class="space-y-2" data-v-1dc2210d><div class="flex bg-background pt-1 pl-2.5 pb-0 mb-0.5" data-v-1dc2210d>`);
			_push(ssrRenderComponent(unref(TooltipProvider_default), null, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(unref(DropdownMenu_default), null, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) {
									_push$2(ssrRenderComponent(unref(DropdownMenuTrigger_default), null, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) _push$3(ssrRenderComponent(unref(Tooltip_default), null, {
												default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
													if (_push$4) {
														_push$4(ssrRenderComponent(unref(TooltipTrigger_default), null, {
															default: withCtx((_$4, _push$5, _parent$5, _scopeId$4) => {
																if (_push$5) _push$5(ssrRenderComponent(unref(Button_default), {
																	class: "h-6 w-6",
																	"data-test-id": "new-sigma-rule",
																	size: "icon"
																}, {
																	default: withCtx((_$5, _push$6, _parent$6, _scopeId$5) => {
																		if (_push$6) _push$6(ssrRenderComponent(unref(Plus), { class: "h-4 w-4" }, null, _parent$6, _scopeId$5));
																		else return [createVNode(unref(Plus), { class: "h-4 w-4" })];
																	}),
																	_: 1
																}, _parent$5, _scopeId$4));
																else return [createVNode(unref(Button_default), {
																	class: "h-6 w-6",
																	"data-test-id": "new-sigma-rule",
																	size: "icon"
																}, {
																	default: withCtx(() => [createVNode(unref(Plus), { class: "h-4 w-4" })]),
																	_: 1
																})];
															}),
															_: 1
														}, _parent$4, _scopeId$3));
														_push$4(ssrRenderComponent(unref(TooltipContent_default), {
															align: "start",
															side: "bottom"
														}, {
															default: withCtx((_$4, _push$5, _parent$5, _scopeId$4) => {
																if (_push$5) _push$5(`<p data-v-1dc2210d${_scopeId$4}>Add to library</p>`);
																else return [createVNode("p", null, "Add to library")];
															}),
															_: 1
														}, _parent$4, _scopeId$3));
													} else return [createVNode(unref(TooltipTrigger_default), null, {
														default: withCtx(() => [createVNode(unref(Button_default), {
															class: "h-6 w-6",
															"data-test-id": "new-sigma-rule",
															size: "icon"
														}, {
															default: withCtx(() => [createVNode(unref(Plus), { class: "h-4 w-4" })]),
															_: 1
														})]),
														_: 1
													}), createVNode(unref(TooltipContent_default), {
														align: "start",
														side: "bottom"
													}, {
														default: withCtx(() => [createVNode("p", null, "Add to library")]),
														_: 1
													})];
												}),
												_: 1
											}, _parent$3, _scopeId$2));
											else return [createVNode(unref(Tooltip_default), null, {
												default: withCtx(() => [createVNode(unref(TooltipTrigger_default), null, {
													default: withCtx(() => [createVNode(unref(Button_default), {
														class: "h-6 w-6",
														"data-test-id": "new-sigma-rule",
														size: "icon"
													}, {
														default: withCtx(() => [createVNode(unref(Plus), { class: "h-4 w-4" })]),
														_: 1
													})]),
													_: 1
												}), createVNode(unref(TooltipContent_default), {
													align: "start",
													side: "bottom"
												}, {
													default: withCtx(() => [createVNode("p", null, "Add to library")]),
													_: 1
												})]),
												_: 1
											})];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(ssrRenderComponent(unref(DropdownMenuContent_default), {
										align: "start",
										side: "bottom"
									}, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) {
												_push$3(ssrRenderComponent(unref(DropdownMenuGroup_default), null, {
													default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
														if (_push$4) _push$4(ssrRenderComponent(unref(DropdownMenuLabel_default), null, {
															default: withCtx((_$4, _push$5, _parent$5, _scopeId$4) => {
																if (_push$5) _push$5(`Rule Type`);
																else return [createTextVNode("Rule Type")];
															}),
															_: 1
														}, _parent$4, _scopeId$3));
														else return [createVNode(unref(DropdownMenuLabel_default), null, {
															default: withCtx(() => [createTextVNode("Rule Type")]),
															_: 1
														})];
													}),
													_: 1
												}, _parent$3, _scopeId$2));
												_push$3(ssrRenderComponent(unref(DropdownMenuItem_default), {
													class: "flex gap-2 items-center",
													onClick: ($event) => newFile("sigma")
												}, {
													default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
														if (_push$4) {
															_push$4(ssrRenderComponent(unref(sigma_default), { class: "h-4 w-4" }, null, _parent$4, _scopeId$3));
															_push$4(` Sigma Rule `);
														} else return [createVNode(unref(sigma_default), { class: "h-4 w-4" }), createTextVNode(" Sigma Rule ")];
													}),
													_: 1
												}, _parent$3, _scopeId$2));
												_push$3(ssrRenderComponent(unref(DropdownMenuSub_default), null, {
													default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
														if (_push$4) {
															_push$4(ssrRenderComponent(unref(DropdownMenuSubTrigger_default), { class: "flex gap-2 items-center" }, {
																default: withCtx((_$4, _push$5, _parent$5, _scopeId$4) => {
																	if (_push$5) {
																		_push$5(ssrRenderComponent(unref(sigma_default), { class: "h-4 w-4" }, null, _parent$5, _scopeId$4));
																		_push$5(`<span data-v-1dc2210d${_scopeId$4}>Sigma Correlation Rule</span>`);
																	} else return [createVNode(unref(sigma_default), { class: "h-4 w-4" }), createVNode("span", null, "Sigma Correlation Rule")];
																}),
																_: 1
															}, _parent$4, _scopeId$3));
															_push$4(ssrRenderComponent(unref(DropdownMenuPortal), null, {
																default: withCtx((_$4, _push$5, _parent$5, _scopeId$4) => {
																	if (_push$5) _push$5(ssrRenderComponent(unref(DropdownMenuSubContent_default), null, {
																		default: withCtx((_$5, _push$6, _parent$6, _scopeId$5) => {
																			if (_push$6) {
																				_push$6(ssrRenderComponent(unref(DropdownMenuItem_default), {
																					class: "flex flex-col items-start gap-1",
																					onClick: ($event) => newFile("correlation", "eventCount")
																				}, {
																					default: withCtx((_$6, _push$7, _parent$7, _scopeId$6) => {
																						if (_push$7) _push$7(` Event Count <p class="text-muted-foreground" data-v-1dc2210d${_scopeId$6}> Count the number of events in a time window </p>`);
																						else return [createTextVNode(" Event Count "), createVNode("p", { class: "text-muted-foreground" }, " Count the number of events in a time window ")];
																					}),
																					_: 1
																				}, _parent$6, _scopeId$5));
																				_push$6(ssrRenderComponent(unref(DropdownMenuItem_default), {
																					class: "flex flex-col items-start gap-1",
																					onClick: ($event) => newFile("correlation", "valueCount")
																				}, {
																					default: withCtx((_$6, _push$7, _parent$7, _scopeId$6) => {
																						if (_push$7) _push$7(` Value Count <p class="text-muted-foreground" data-v-1dc2210d${_scopeId$6}> Count the number of individual values in a time window </p>`);
																						else return [createTextVNode(" Value Count "), createVNode("p", { class: "text-muted-foreground" }, " Count the number of individual values in a time window ")];
																					}),
																					_: 1
																				}, _parent$6, _scopeId$5));
																				_push$6(ssrRenderComponent(unref(DropdownMenuItem_default), {
																					class: "flex flex-col items-start gap-1",
																					onClick: ($event) => newFile("correlation", "temporal")
																				}, {
																					default: withCtx((_$6, _push$7, _parent$7, _scopeId$6) => {
																						if (_push$7) _push$7(` Temporal <p class="text-muted-foreground" data-v-1dc2210d${_scopeId$6}> Multiple different events close together in time </p>`);
																						else return [createTextVNode(" Temporal "), createVNode("p", { class: "text-muted-foreground" }, " Multiple different events close together in time ")];
																					}),
																					_: 1
																				}, _parent$6, _scopeId$5));
																				_push$6(ssrRenderComponent(unref(DropdownMenuItem_default), { disabled: "" }, {
																					default: withCtx((_$6, _push$7, _parent$7, _scopeId$6) => {
																						if (_push$7) _push$7(`Ordered Temporal`);
																						else return [createTextVNode("Ordered Temporal")];
																					}),
																					_: 1
																				}, _parent$6, _scopeId$5));
																			} else return [
																				createVNode(unref(DropdownMenuItem_default), {
																					class: "flex flex-col items-start gap-1",
																					onClick: ($event) => newFile("correlation", "eventCount")
																				}, {
																					default: withCtx(() => [createTextVNode(" Event Count "), createVNode("p", { class: "text-muted-foreground" }, " Count the number of events in a time window ")]),
																					_: 1
																				}, 8, ["onClick"]),
																				createVNode(unref(DropdownMenuItem_default), {
																					class: "flex flex-col items-start gap-1",
																					onClick: ($event) => newFile("correlation", "valueCount")
																				}, {
																					default: withCtx(() => [createTextVNode(" Value Count "), createVNode("p", { class: "text-muted-foreground" }, " Count the number of individual values in a time window ")]),
																					_: 1
																				}, 8, ["onClick"]),
																				createVNode(unref(DropdownMenuItem_default), {
																					class: "flex flex-col items-start gap-1",
																					onClick: ($event) => newFile("correlation", "temporal")
																				}, {
																					default: withCtx(() => [createTextVNode(" Temporal "), createVNode("p", { class: "text-muted-foreground" }, " Multiple different events close together in time ")]),
																					_: 1
																				}, 8, ["onClick"]),
																				createVNode(unref(DropdownMenuItem_default), { disabled: "" }, {
																					default: withCtx(() => [createTextVNode("Ordered Temporal")]),
																					_: 1
																				})
																			];
																		}),
																		_: 1
																	}, _parent$5, _scopeId$4));
																	else return [createVNode(unref(DropdownMenuSubContent_default), null, {
																		default: withCtx(() => [
																			createVNode(unref(DropdownMenuItem_default), {
																				class: "flex flex-col items-start gap-1",
																				onClick: ($event) => newFile("correlation", "eventCount")
																			}, {
																				default: withCtx(() => [createTextVNode(" Event Count "), createVNode("p", { class: "text-muted-foreground" }, " Count the number of events in a time window ")]),
																				_: 1
																			}, 8, ["onClick"]),
																			createVNode(unref(DropdownMenuItem_default), {
																				class: "flex flex-col items-start gap-1",
																				onClick: ($event) => newFile("correlation", "valueCount")
																			}, {
																				default: withCtx(() => [createTextVNode(" Value Count "), createVNode("p", { class: "text-muted-foreground" }, " Count the number of individual values in a time window ")]),
																				_: 1
																			}, 8, ["onClick"]),
																			createVNode(unref(DropdownMenuItem_default), {
																				class: "flex flex-col items-start gap-1",
																				onClick: ($event) => newFile("correlation", "temporal")
																			}, {
																				default: withCtx(() => [createTextVNode(" Temporal "), createVNode("p", { class: "text-muted-foreground" }, " Multiple different events close together in time ")]),
																				_: 1
																			}, 8, ["onClick"]),
																			createVNode(unref(DropdownMenuItem_default), { disabled: "" }, {
																				default: withCtx(() => [createTextVNode("Ordered Temporal")]),
																				_: 1
																			})
																		]),
																		_: 1
																	})];
																}),
																_: 1
															}, _parent$4, _scopeId$3));
														} else return [createVNode(unref(DropdownMenuSubTrigger_default), { class: "flex gap-2 items-center" }, {
															default: withCtx(() => [createVNode(unref(sigma_default), { class: "h-4 w-4" }), createVNode("span", null, "Sigma Correlation Rule")]),
															_: 1
														}), createVNode(unref(DropdownMenuPortal), null, {
															default: withCtx(() => [createVNode(unref(DropdownMenuSubContent_default), null, {
																default: withCtx(() => [
																	createVNode(unref(DropdownMenuItem_default), {
																		class: "flex flex-col items-start gap-1",
																		onClick: ($event) => newFile("correlation", "eventCount")
																	}, {
																		default: withCtx(() => [createTextVNode(" Event Count "), createVNode("p", { class: "text-muted-foreground" }, " Count the number of events in a time window ")]),
																		_: 1
																	}, 8, ["onClick"]),
																	createVNode(unref(DropdownMenuItem_default), {
																		class: "flex flex-col items-start gap-1",
																		onClick: ($event) => newFile("correlation", "valueCount")
																	}, {
																		default: withCtx(() => [createTextVNode(" Value Count "), createVNode("p", { class: "text-muted-foreground" }, " Count the number of individual values in a time window ")]),
																		_: 1
																	}, 8, ["onClick"]),
																	createVNode(unref(DropdownMenuItem_default), {
																		class: "flex flex-col items-start gap-1",
																		onClick: ($event) => newFile("correlation", "temporal")
																	}, {
																		default: withCtx(() => [createTextVNode(" Temporal "), createVNode("p", { class: "text-muted-foreground" }, " Multiple different events close together in time ")]),
																		_: 1
																	}, 8, ["onClick"]),
																	createVNode(unref(DropdownMenuItem_default), { disabled: "" }, {
																		default: withCtx(() => [createTextVNode("Ordered Temporal")]),
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
												_push$3(ssrRenderComponent(unref(DropdownMenuSeparator_default), null, null, _parent$3, _scopeId$2));
												_push$3(ssrRenderComponent(unref(DropdownMenuItem_default), { onClick: ($event) => newFile("filter") }, {
													default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
														if (_push$4) _push$4(`Sigma Filter`);
														else return [createTextVNode("Sigma Filter")];
													}),
													_: 1
												}, _parent$3, _scopeId$2));
												_push$3(ssrRenderComponent(unref(DropdownMenuItem_default), { onClick: ($event) => newFile("pipeline") }, {
													default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
														if (_push$4) _push$4(`Sigma Pipeline`);
														else return [createTextVNode("Sigma Pipeline")];
													}),
													_: 1
												}, _parent$3, _scopeId$2));
											} else return [
												createVNode(unref(DropdownMenuGroup_default), null, {
													default: withCtx(() => [createVNode(unref(DropdownMenuLabel_default), null, {
														default: withCtx(() => [createTextVNode("Rule Type")]),
														_: 1
													})]),
													_: 1
												}),
												createVNode(unref(DropdownMenuItem_default), {
													class: "flex gap-2 items-center",
													onClick: ($event) => newFile("sigma")
												}, {
													default: withCtx(() => [createVNode(unref(sigma_default), { class: "h-4 w-4" }), createTextVNode(" Sigma Rule ")]),
													_: 1
												}, 8, ["onClick"]),
												createVNode(unref(DropdownMenuSub_default), null, {
													default: withCtx(() => [createVNode(unref(DropdownMenuSubTrigger_default), { class: "flex gap-2 items-center" }, {
														default: withCtx(() => [createVNode(unref(sigma_default), { class: "h-4 w-4" }), createVNode("span", null, "Sigma Correlation Rule")]),
														_: 1
													}), createVNode(unref(DropdownMenuPortal), null, {
														default: withCtx(() => [createVNode(unref(DropdownMenuSubContent_default), null, {
															default: withCtx(() => [
																createVNode(unref(DropdownMenuItem_default), {
																	class: "flex flex-col items-start gap-1",
																	onClick: ($event) => newFile("correlation", "eventCount")
																}, {
																	default: withCtx(() => [createTextVNode(" Event Count "), createVNode("p", { class: "text-muted-foreground" }, " Count the number of events in a time window ")]),
																	_: 1
																}, 8, ["onClick"]),
																createVNode(unref(DropdownMenuItem_default), {
																	class: "flex flex-col items-start gap-1",
																	onClick: ($event) => newFile("correlation", "valueCount")
																}, {
																	default: withCtx(() => [createTextVNode(" Value Count "), createVNode("p", { class: "text-muted-foreground" }, " Count the number of individual values in a time window ")]),
																	_: 1
																}, 8, ["onClick"]),
																createVNode(unref(DropdownMenuItem_default), {
																	class: "flex flex-col items-start gap-1",
																	onClick: ($event) => newFile("correlation", "temporal")
																}, {
																	default: withCtx(() => [createTextVNode(" Temporal "), createVNode("p", { class: "text-muted-foreground" }, " Multiple different events close together in time ")]),
																	_: 1
																}, 8, ["onClick"]),
																createVNode(unref(DropdownMenuItem_default), { disabled: "" }, {
																	default: withCtx(() => [createTextVNode("Ordered Temporal")]),
																	_: 1
																})
															]),
															_: 1
														})]),
														_: 1
													})]),
													_: 1
												}),
												createVNode(unref(DropdownMenuSeparator_default)),
												createVNode(unref(DropdownMenuItem_default), { onClick: ($event) => newFile("filter") }, {
													default: withCtx(() => [createTextVNode("Sigma Filter")]),
													_: 1
												}, 8, ["onClick"]),
												createVNode(unref(DropdownMenuItem_default), { onClick: ($event) => newFile("pipeline") }, {
													default: withCtx(() => [createTextVNode("Sigma Pipeline")]),
													_: 1
												}, 8, ["onClick"])
											];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
								} else return [createVNode(unref(DropdownMenuTrigger_default), null, {
									default: withCtx(() => [createVNode(unref(Tooltip_default), null, {
										default: withCtx(() => [createVNode(unref(TooltipTrigger_default), null, {
											default: withCtx(() => [createVNode(unref(Button_default), {
												class: "h-6 w-6",
												"data-test-id": "new-sigma-rule",
												size: "icon"
											}, {
												default: withCtx(() => [createVNode(unref(Plus), { class: "h-4 w-4" })]),
												_: 1
											})]),
											_: 1
										}), createVNode(unref(TooltipContent_default), {
											align: "start",
											side: "bottom"
										}, {
											default: withCtx(() => [createVNode("p", null, "Add to library")]),
											_: 1
										})]),
										_: 1
									})]),
									_: 1
								}), createVNode(unref(DropdownMenuContent_default), {
									align: "start",
									side: "bottom"
								}, {
									default: withCtx(() => [
										createVNode(unref(DropdownMenuGroup_default), null, {
											default: withCtx(() => [createVNode(unref(DropdownMenuLabel_default), null, {
												default: withCtx(() => [createTextVNode("Rule Type")]),
												_: 1
											})]),
											_: 1
										}),
										createVNode(unref(DropdownMenuItem_default), {
											class: "flex gap-2 items-center",
											onClick: ($event) => newFile("sigma")
										}, {
											default: withCtx(() => [createVNode(unref(sigma_default), { class: "h-4 w-4" }), createTextVNode(" Sigma Rule ")]),
											_: 1
										}, 8, ["onClick"]),
										createVNode(unref(DropdownMenuSub_default), null, {
											default: withCtx(() => [createVNode(unref(DropdownMenuSubTrigger_default), { class: "flex gap-2 items-center" }, {
												default: withCtx(() => [createVNode(unref(sigma_default), { class: "h-4 w-4" }), createVNode("span", null, "Sigma Correlation Rule")]),
												_: 1
											}), createVNode(unref(DropdownMenuPortal), null, {
												default: withCtx(() => [createVNode(unref(DropdownMenuSubContent_default), null, {
													default: withCtx(() => [
														createVNode(unref(DropdownMenuItem_default), {
															class: "flex flex-col items-start gap-1",
															onClick: ($event) => newFile("correlation", "eventCount")
														}, {
															default: withCtx(() => [createTextVNode(" Event Count "), createVNode("p", { class: "text-muted-foreground" }, " Count the number of events in a time window ")]),
															_: 1
														}, 8, ["onClick"]),
														createVNode(unref(DropdownMenuItem_default), {
															class: "flex flex-col items-start gap-1",
															onClick: ($event) => newFile("correlation", "valueCount")
														}, {
															default: withCtx(() => [createTextVNode(" Value Count "), createVNode("p", { class: "text-muted-foreground" }, " Count the number of individual values in a time window ")]),
															_: 1
														}, 8, ["onClick"]),
														createVNode(unref(DropdownMenuItem_default), {
															class: "flex flex-col items-start gap-1",
															onClick: ($event) => newFile("correlation", "temporal")
														}, {
															default: withCtx(() => [createTextVNode(" Temporal "), createVNode("p", { class: "text-muted-foreground" }, " Multiple different events close together in time ")]),
															_: 1
														}, 8, ["onClick"]),
														createVNode(unref(DropdownMenuItem_default), { disabled: "" }, {
															default: withCtx(() => [createTextVNode("Ordered Temporal")]),
															_: 1
														})
													]),
													_: 1
												})]),
												_: 1
											})]),
											_: 1
										}),
										createVNode(unref(DropdownMenuSeparator_default)),
										createVNode(unref(DropdownMenuItem_default), { onClick: ($event) => newFile("filter") }, {
											default: withCtx(() => [createTextVNode("Sigma Filter")]),
											_: 1
										}, 8, ["onClick"]),
										createVNode(unref(DropdownMenuItem_default), { onClick: ($event) => newFile("pipeline") }, {
											default: withCtx(() => [createTextVNode("Sigma Pipeline")]),
											_: 1
										}, 8, ["onClick"])
									]),
									_: 1
								})];
							}),
							_: 1
						}, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(Tooltip_default), null, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) {
									_push$2(ssrRenderComponent(unref(TooltipTrigger_default), null, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) _push$3(ssrRenderComponent(unref(Button_default), {
												class: "h-6 w-6",
												size: "icon",
												variant: "ghost",
												onClick: ($event) => fs.value.startRename(fs.value.currentlyOpenFileId)
											}, {
												default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
													if (_push$4) _push$4(ssrRenderComponent(unref(TextCursor), { class: "text-muted-foreground h-4 w-4" }, null, _parent$4, _scopeId$3));
													else return [createVNode(unref(TextCursor), { class: "text-muted-foreground h-4 w-4" })];
												}),
												_: 1
											}, _parent$3, _scopeId$2));
											else return [createVNode(unref(Button_default), {
												class: "h-6 w-6",
												size: "icon",
												variant: "ghost",
												onClick: ($event) => fs.value.startRename(fs.value.currentlyOpenFileId)
											}, {
												default: withCtx(() => [createVNode(unref(TextCursor), { class: "text-muted-foreground h-4 w-4" })]),
												_: 1
											}, 8, ["onClick"])];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(ssrRenderComponent(unref(TooltipContent_default), {
										align: "start",
										side: "bottom"
									}, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) _push$3(`<p data-v-1dc2210d${_scopeId$2}>Rename File</p>`);
											else return [createVNode("p", null, "Rename File")];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
								} else return [createVNode(unref(TooltipTrigger_default), null, {
									default: withCtx(() => [createVNode(unref(Button_default), {
										class: "h-6 w-6",
										size: "icon",
										variant: "ghost",
										onClick: ($event) => fs.value.startRename(fs.value.currentlyOpenFileId)
									}, {
										default: withCtx(() => [createVNode(unref(TextCursor), { class: "text-muted-foreground h-4 w-4" })]),
										_: 1
									}, 8, ["onClick"])]),
									_: 1
								}), createVNode(unref(TooltipContent_default), {
									align: "start",
									side: "bottom"
								}, {
									default: withCtx(() => [createVNode("p", null, "Rename File")]),
									_: 1
								})];
							}),
							_: 1
						}, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(Tooltip_default), null, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) {
									_push$2(ssrRenderComponent(unref(TooltipTrigger_default), null, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) _push$3(ssrRenderComponent(unref(Button_default), {
												class: "h-6 w-6",
												size: "icon",
												variant: "ghost",
												onClick: ($event) => fs.value.duplicateFile(fs.value.currentlyOpenFileId)
											}, {
												default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
													if (_push$4) _push$4(ssrRenderComponent(unref(Files), { class: "text-muted-foreground h-4 w-4" }, null, _parent$4, _scopeId$3));
													else return [createVNode(unref(Files), { class: "text-muted-foreground h-4 w-4" })];
												}),
												_: 1
											}, _parent$3, _scopeId$2));
											else return [createVNode(unref(Button_default), {
												class: "h-6 w-6",
												size: "icon",
												variant: "ghost",
												onClick: ($event) => fs.value.duplicateFile(fs.value.currentlyOpenFileId)
											}, {
												default: withCtx(() => [createVNode(unref(Files), { class: "text-muted-foreground h-4 w-4" })]),
												_: 1
											}, 8, ["onClick"])];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(ssrRenderComponent(unref(TooltipContent_default), {
										align: "start",
										side: "bottom"
									}, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) _push$3(`<p data-v-1dc2210d${_scopeId$2}>Duplicate</p>`);
											else return [createVNode("p", null, "Duplicate")];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
								} else return [createVNode(unref(TooltipTrigger_default), null, {
									default: withCtx(() => [createVNode(unref(Button_default), {
										class: "h-6 w-6",
										size: "icon",
										variant: "ghost",
										onClick: ($event) => fs.value.duplicateFile(fs.value.currentlyOpenFileId)
									}, {
										default: withCtx(() => [createVNode(unref(Files), { class: "text-muted-foreground h-4 w-4" })]),
										_: 1
									}, 8, ["onClick"])]),
									_: 1
								}), createVNode(unref(TooltipContent_default), {
									align: "start",
									side: "bottom"
								}, {
									default: withCtx(() => [createVNode("p", null, "Duplicate")]),
									_: 1
								})];
							}),
							_: 1
						}, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(Tooltip_default), null, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) {
									_push$2(ssrRenderComponent(unref(TooltipTrigger_default), null, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) _push$3(ssrRenderComponent(unref(Button_default), {
												class: "h-6 w-6",
												size: "icon",
												variant: "ghost",
												onClick: ($event) => fs.value.deleteFile(fs.value.currentlyOpenFileId)
											}, {
												default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
													if (_push$4) _push$4(ssrRenderComponent(unref(Trash), { class: "text-muted-foreground h-4 w-4" }, null, _parent$4, _scopeId$3));
													else return [createVNode(unref(Trash), { class: "text-muted-foreground h-4 w-4" })];
												}),
												_: 1
											}, _parent$3, _scopeId$2));
											else return [createVNode(unref(Button_default), {
												class: "h-6 w-6",
												size: "icon",
												variant: "ghost",
												onClick: ($event) => fs.value.deleteFile(fs.value.currentlyOpenFileId)
											}, {
												default: withCtx(() => [createVNode(unref(Trash), { class: "text-muted-foreground h-4 w-4" })]),
												_: 1
											}, 8, ["onClick"])];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(ssrRenderComponent(unref(TooltipContent_default), {
										align: "start",
										side: "bottom"
									}, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) _push$3(`<p data-v-1dc2210d${_scopeId$2}>Delete File(s)</p>`);
											else return [createVNode("p", null, "Delete File(s)")];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
								} else return [createVNode(unref(TooltipTrigger_default), null, {
									default: withCtx(() => [createVNode(unref(Button_default), {
										class: "h-6 w-6",
										size: "icon",
										variant: "ghost",
										onClick: ($event) => fs.value.deleteFile(fs.value.currentlyOpenFileId)
									}, {
										default: withCtx(() => [createVNode(unref(Trash), { class: "text-muted-foreground h-4 w-4" })]),
										_: 1
									}, 8, ["onClick"])]),
									_: 1
								}), createVNode(unref(TooltipContent_default), {
									align: "start",
									side: "bottom"
								}, {
									default: withCtx(() => [createVNode("p", null, "Delete File(s)")]),
									_: 1
								})];
							}),
							_: 1
						}, _parent$1, _scopeId));
					} else return [
						createVNode(unref(DropdownMenu_default), null, {
							default: withCtx(() => [createVNode(unref(DropdownMenuTrigger_default), null, {
								default: withCtx(() => [createVNode(unref(Tooltip_default), null, {
									default: withCtx(() => [createVNode(unref(TooltipTrigger_default), null, {
										default: withCtx(() => [createVNode(unref(Button_default), {
											class: "h-6 w-6",
											"data-test-id": "new-sigma-rule",
											size: "icon"
										}, {
											default: withCtx(() => [createVNode(unref(Plus), { class: "h-4 w-4" })]),
											_: 1
										})]),
										_: 1
									}), createVNode(unref(TooltipContent_default), {
										align: "start",
										side: "bottom"
									}, {
										default: withCtx(() => [createVNode("p", null, "Add to library")]),
										_: 1
									})]),
									_: 1
								})]),
								_: 1
							}), createVNode(unref(DropdownMenuContent_default), {
								align: "start",
								side: "bottom"
							}, {
								default: withCtx(() => [
									createVNode(unref(DropdownMenuGroup_default), null, {
										default: withCtx(() => [createVNode(unref(DropdownMenuLabel_default), null, {
											default: withCtx(() => [createTextVNode("Rule Type")]),
											_: 1
										})]),
										_: 1
									}),
									createVNode(unref(DropdownMenuItem_default), {
										class: "flex gap-2 items-center",
										onClick: ($event) => newFile("sigma")
									}, {
										default: withCtx(() => [createVNode(unref(sigma_default), { class: "h-4 w-4" }), createTextVNode(" Sigma Rule ")]),
										_: 1
									}, 8, ["onClick"]),
									createVNode(unref(DropdownMenuSub_default), null, {
										default: withCtx(() => [createVNode(unref(DropdownMenuSubTrigger_default), { class: "flex gap-2 items-center" }, {
											default: withCtx(() => [createVNode(unref(sigma_default), { class: "h-4 w-4" }), createVNode("span", null, "Sigma Correlation Rule")]),
											_: 1
										}), createVNode(unref(DropdownMenuPortal), null, {
											default: withCtx(() => [createVNode(unref(DropdownMenuSubContent_default), null, {
												default: withCtx(() => [
													createVNode(unref(DropdownMenuItem_default), {
														class: "flex flex-col items-start gap-1",
														onClick: ($event) => newFile("correlation", "eventCount")
													}, {
														default: withCtx(() => [createTextVNode(" Event Count "), createVNode("p", { class: "text-muted-foreground" }, " Count the number of events in a time window ")]),
														_: 1
													}, 8, ["onClick"]),
													createVNode(unref(DropdownMenuItem_default), {
														class: "flex flex-col items-start gap-1",
														onClick: ($event) => newFile("correlation", "valueCount")
													}, {
														default: withCtx(() => [createTextVNode(" Value Count "), createVNode("p", { class: "text-muted-foreground" }, " Count the number of individual values in a time window ")]),
														_: 1
													}, 8, ["onClick"]),
													createVNode(unref(DropdownMenuItem_default), {
														class: "flex flex-col items-start gap-1",
														onClick: ($event) => newFile("correlation", "temporal")
													}, {
														default: withCtx(() => [createTextVNode(" Temporal "), createVNode("p", { class: "text-muted-foreground" }, " Multiple different events close together in time ")]),
														_: 1
													}, 8, ["onClick"]),
													createVNode(unref(DropdownMenuItem_default), { disabled: "" }, {
														default: withCtx(() => [createTextVNode("Ordered Temporal")]),
														_: 1
													})
												]),
												_: 1
											})]),
											_: 1
										})]),
										_: 1
									}),
									createVNode(unref(DropdownMenuSeparator_default)),
									createVNode(unref(DropdownMenuItem_default), { onClick: ($event) => newFile("filter") }, {
										default: withCtx(() => [createTextVNode("Sigma Filter")]),
										_: 1
									}, 8, ["onClick"]),
									createVNode(unref(DropdownMenuItem_default), { onClick: ($event) => newFile("pipeline") }, {
										default: withCtx(() => [createTextVNode("Sigma Pipeline")]),
										_: 1
									}, 8, ["onClick"])
								]),
								_: 1
							})]),
							_: 1
						}),
						createVNode(unref(Tooltip_default), null, {
							default: withCtx(() => [createVNode(unref(TooltipTrigger_default), null, {
								default: withCtx(() => [createVNode(unref(Button_default), {
									class: "h-6 w-6",
									size: "icon",
									variant: "ghost",
									onClick: ($event) => fs.value.startRename(fs.value.currentlyOpenFileId)
								}, {
									default: withCtx(() => [createVNode(unref(TextCursor), { class: "text-muted-foreground h-4 w-4" })]),
									_: 1
								}, 8, ["onClick"])]),
								_: 1
							}), createVNode(unref(TooltipContent_default), {
								align: "start",
								side: "bottom"
							}, {
								default: withCtx(() => [createVNode("p", null, "Rename File")]),
								_: 1
							})]),
							_: 1
						}),
						createVNode(unref(Tooltip_default), null, {
							default: withCtx(() => [createVNode(unref(TooltipTrigger_default), null, {
								default: withCtx(() => [createVNode(unref(Button_default), {
									class: "h-6 w-6",
									size: "icon",
									variant: "ghost",
									onClick: ($event) => fs.value.duplicateFile(fs.value.currentlyOpenFileId)
								}, {
									default: withCtx(() => [createVNode(unref(Files), { class: "text-muted-foreground h-4 w-4" })]),
									_: 1
								}, 8, ["onClick"])]),
								_: 1
							}), createVNode(unref(TooltipContent_default), {
								align: "start",
								side: "bottom"
							}, {
								default: withCtx(() => [createVNode("p", null, "Duplicate")]),
								_: 1
							})]),
							_: 1
						}),
						createVNode(unref(Tooltip_default), null, {
							default: withCtx(() => [createVNode(unref(TooltipTrigger_default), null, {
								default: withCtx(() => [createVNode(unref(Button_default), {
									class: "h-6 w-6",
									size: "icon",
									variant: "ghost",
									onClick: ($event) => fs.value.deleteFile(fs.value.currentlyOpenFileId)
								}, {
									default: withCtx(() => [createVNode(unref(Trash), { class: "text-muted-foreground h-4 w-4" })]),
									_: 1
								}, 8, ["onClick"])]),
								_: 1
							}), createVNode(unref(TooltipContent_default), {
								align: "start",
								side: "bottom"
							}, {
								default: withCtx(() => [createVNode("p", null, "Delete File(s)")]),
								_: 1
							})]),
							_: 1
						})
					];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="min-h-0" data-v-1dc2210d>`);
			_push(ssrRenderComponent(unref(ScrollArea_default), { class: "h-full" }, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(`<div class="space-y-1 p-2" data-v-1dc2210d${_scopeId}><!--[-->`);
						ssrRenderList(groupedFiles.value, (files, type) => {
							_push$1(`<!--[-->`);
							if (files.length) {
								_push$1(`<!--[--><div data-v-1dc2210d${_scopeId}>`);
								_push$1(ssrRenderComponent(unref(Button_default), {
									class: "w-full justify-start h-7 px-2 hover:bg-muted/50",
									variant: "ghost"
								}, {
									default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
										if (_push$2) {
											_push$2(ssrRenderComponent(unref(Folder), { class: "mr-2 text-muted-foreground h-4 w-4" }, null, _parent$2, _scopeId$1));
											_push$2(`<span class="truncate" data-v-1dc2210d${_scopeId$1}>${ssrInterpolate(type)}</span>`);
										} else return [createVNode(unref(Folder), { class: "mr-2 text-muted-foreground h-4 w-4" }), createVNode("span", { class: "truncate" }, toDisplayString(type), 1)];
									}),
									_: 2
								}, _parent$1, _scopeId));
								_push$1(`</div><!--[-->`);
								ssrRenderList(files, (file) => {
									_push$1(ssrRenderComponent(FileListItem_default, {
										key: file.id,
										file
									}, null, _parent$1, _scopeId));
								});
								_push$1(`<!--]--><!--]-->`);
							} else _push$1(`<!---->`);
							_push$1(`<!--]-->`);
						});
						_push$1(`<!--]--></div>`);
					} else return [createVNode("div", { class: "space-y-1 p-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(groupedFiles.value, (files, type) => {
						return openBlock(), createBlock(Fragment, { key: type }, [files.length ? (openBlock(), createBlock(Fragment, { key: 0 }, [createVNode("div", null, [createVNode(unref(Button_default), {
							class: "w-full justify-start h-7 px-2 hover:bg-muted/50",
							variant: "ghost"
						}, {
							default: withCtx(() => [createVNode(unref(Folder), { class: "mr-2 text-muted-foreground h-4 w-4" }), createVNode("span", { class: "truncate" }, toDisplayString(type), 1)]),
							_: 2
						}, 1024)]), (openBlock(true), createBlock(Fragment, null, renderList(files, (file) => {
							return openBlock(), createBlock(FileListItem_default, {
								key: file.id,
								file
							}, null, 8, ["file"]);
						}), 128))], 64)) : createCommentVNode("", true)], 64);
					}), 128))])];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></div>`);
		};
	}
});
var _sfc_setup$12 = FileList_vue_vue_type_script_setup_true_lang_default.setup;
FileList_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/FileList.vue");
	return _sfc_setup$12 ? _sfc_setup$12(props, ctx) : void 0;
};
var FileList_default = /* @__PURE__ */ _plugin_vue_export_helper_default(FileList_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-1dc2210d"]]);
var Editor_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Editor",
	__ssrInlineRender: true,
	setup(__props) {
		const workspace = useWorkspaceStore();
		const fs = computed(() => workspace.currentWorkspace?.fileStore());
		const sigma = computed(() => workspace.currentWorkspace?.sigmaStore());
		const fileStorePanelRef = ref();
		const editorContainerRef = ref(null);
		const tabsContainerRef = ref(null);
		const { width: containerWidth } = useElementSize(editorContainerRef);
		const { height: tabsHeight } = useElementSize(tabsContainerRef);
		const { height: windowHeight } = useWindowSize();
		const editorMaxHeight = computed(() => {
			return `calc(${windowHeight.value}px - 3.5rem - ${tabsHeight.value}px - 1rem)`;
		});
		const isDesktop = useBreakpoints(breakpointsTailwind).greaterOrEqual("md");
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(ResizablePanelGroup_default), mergeProps({
				ref_key: "editorContainerRef",
				ref: editorContainerRef,
				"auto-save-id": "editor",
				class: "h-full w-full min-h-0 flex-1 rounded-lg border",
				direction: "horizontal"
			}, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(unref(ResizablePanel), {
							ref_key: "fileStorePanelRef",
							ref: fileStorePanelRef,
							"default-size": 20,
							"max-size": unref(isDesktop) ? 30 : 90,
							"min-size": unref(isDesktop) ? 20 : 60,
							collapsible: ""
						}, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) _push$2(ssrRenderComponent(FileList_default, null, null, _parent$2, _scopeId$1));
								else return [createVNode(FileList_default)];
							}),
							_: 1
						}, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(ResizableHandle_default), { "with-handle": "" }, null, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(ResizablePanel), {
							"default-size": 80,
							"as-child": "",
							class: "h-full min-h-0 overflow-hidden"
						}, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) _push$2(ssrRenderComponent(unref(Tabs_default), {
									"model-value": fs.value.currentlyOpenFileId,
									"onUpdate:modelValue": ($event) => fs.value.currentlyOpenFileId = $event,
									class: ""
								}, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) {
											_push$3(`<div class="flex items-center"${_scopeId$2}>`);
											if (fileStorePanelRef.value?.isCollapsed) _push$3(ssrRenderComponent(unref(Button_default), {
												class: "flex items-center gap-2 rounded-lg",
												size: "icon",
												variant: "secondary",
												onClick: ($event) => fileStorePanelRef.value?.expand()
											}, {
												default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
													if (_push$4) _push$4(ssrRenderComponent(unref(PanelRightClose), { class: "h-4 w-4" }, null, _parent$4, _scopeId$3));
													else return [createVNode(unref(PanelRightClose), { class: "h-4 w-4" })];
												}),
												_: 1
											}, _parent$3, _scopeId$2));
											else _push$3(`<!---->`);
											if (fileStorePanelRef.value?.isExpanded) _push$3(ssrRenderComponent(unref(Button_default), {
												class: "flex items-center gap-2 rounded-lg",
												size: "icon",
												variant: "ghost",
												onClick: ($event) => fileStorePanelRef.value?.collapse()
											}, {
												default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
													if (_push$4) _push$4(ssrRenderComponent(unref(PanelRightOpen), { class: "h-4 w-4" }, null, _parent$4, _scopeId$3));
													else return [createVNode(unref(PanelRightOpen), { class: "h-4 w-4" })];
												}),
												_: 1
											}, _parent$3, _scopeId$2));
											else _push$3(`<!---->`);
											_push$3(ssrRenderComponent(unref(ScrollArea_default), { class: "w-full" }, {
												default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
													if (_push$4) {
														_push$4(`<div class="w-full relative h-10"${_scopeId$3}>`);
														_push$4(ssrRenderComponent(unref(TabsList_default), { class: "flex items-center absolute h-10 border-none bg-transparent" }, {
															default: withCtx((_$4, _push$5, _parent$5, _scopeId$4) => {
																if (_push$5) {
																	_push$5(`<!--[-->`);
																	ssrRenderList(fs.value.openFiles, (fileId) => {
																		_push$5(ssrRenderComponent(unref(TabsTrigger_default), {
																			value: fileId,
																			"as-child": "",
																			class: "flex items-center gap-2"
																		}, {
																			default: withCtx((_$5, _push$6, _parent$6, _scopeId$5) => {
																				if (_push$6) {
																					_push$6(`${ssrInterpolate(fs.value.files.find((f) => f.id === fileId)?.name)} `);
																					_push$6(ssrRenderComponent(unref(Tooltip_default), null, {
																						default: withCtx((_$6, _push$7, _parent$7, _scopeId$6) => {
																							if (_push$7) {
																								_push$7(ssrRenderComponent(unref(TooltipTrigger_default), null, {
																									default: withCtx((_$7, _push$8, _parent$8, _scopeId$7) => {
																										if (_push$8) if (sigma.value.active_sigma_rule_file_id === fileId) _push$8(`<span class="block rounded-full bg-sky-500 h-2 w-2"${_scopeId$7}></span>`);
																										else _push$8(`<!---->`);
																										else return [sigma.value.active_sigma_rule_file_id === fileId ? (openBlock(), createBlock("span", {
																											key: 0,
																											class: "block rounded-full bg-sky-500 h-2 w-2"
																										})) : createCommentVNode("", true)];
																									}),
																									_: 2
																								}, _parent$7, _scopeId$6));
																								_push$7(ssrRenderComponent(unref(TooltipContent_default), {
																									align: "start",
																									side: "bottom"
																								}, {
																									default: withCtx((_$7, _push$8, _parent$8, _scopeId$7) => {
																										if (_push$8) _push$8(`<p${_scopeId$7}>Active Sigma Rule</p>`);
																										else return [createVNode("p", null, "Active Sigma Rule")];
																									}),
																									_: 2
																								}, _parent$7, _scopeId$6));
																							} else return [createVNode(unref(TooltipTrigger_default), null, {
																								default: withCtx(() => [sigma.value.active_sigma_rule_file_id === fileId ? (openBlock(), createBlock("span", {
																									key: 0,
																									class: "block rounded-full bg-sky-500 h-2 w-2"
																								})) : createCommentVNode("", true)]),
																								_: 2
																							}, 1024), createVNode(unref(TooltipContent_default), {
																								align: "start",
																								side: "bottom"
																							}, {
																								default: withCtx(() => [createVNode("p", null, "Active Sigma Rule")]),
																								_: 1
																							})];
																						}),
																						_: 2
																					}, _parent$6, _scopeId$5));
																					_push$6(`<button class="ml-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2"${_scopeId$5}>`);
																					_push$6(ssrRenderComponent(unref(X), { class: "h-4 w-4" }, null, _parent$6, _scopeId$5));
																					_push$6(`<span class="sr-only"${_scopeId$5}>Close</span></button>`);
																				} else return [
																					createTextVNode(toDisplayString(fs.value.files.find((f) => f.id === fileId)?.name) + " ", 1),
																					createVNode(unref(Tooltip_default), null, {
																						default: withCtx(() => [createVNode(unref(TooltipTrigger_default), null, {
																							default: withCtx(() => [sigma.value.active_sigma_rule_file_id === fileId ? (openBlock(), createBlock("span", {
																								key: 0,
																								class: "block rounded-full bg-sky-500 h-2 w-2"
																							})) : createCommentVNode("", true)]),
																							_: 2
																						}, 1024), createVNode(unref(TooltipContent_default), {
																							align: "start",
																							side: "bottom"
																						}, {
																							default: withCtx(() => [createVNode("p", null, "Active Sigma Rule")]),
																							_: 1
																						})]),
																						_: 2
																					}, 1024),
																					createVNode("button", {
																						class: "ml-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2",
																						onClick: withModifiers(($event) => fs.value.closeFile(fileId), ["stop"])
																					}, [createVNode(unref(X), { class: "h-4 w-4" }), createVNode("span", { class: "sr-only" }, "Close")], 8, ["onClick"])
																				];
																			}),
																			_: 2
																		}, _parent$5, _scopeId$4));
																	});
																	_push$5(`<!--]-->`);
																} else return [(openBlock(true), createBlock(Fragment, null, renderList(fs.value.openFiles, (fileId) => {
																	return openBlock(), createBlock(unref(TabsTrigger_default), {
																		key: fileId,
																		value: fileId,
																		"as-child": "",
																		class: "flex items-center gap-2"
																	}, {
																		default: withCtx(() => [
																			createTextVNode(toDisplayString(fs.value.files.find((f) => f.id === fileId)?.name) + " ", 1),
																			createVNode(unref(Tooltip_default), null, {
																				default: withCtx(() => [createVNode(unref(TooltipTrigger_default), null, {
																					default: withCtx(() => [sigma.value.active_sigma_rule_file_id === fileId ? (openBlock(), createBlock("span", {
																						key: 0,
																						class: "block rounded-full bg-sky-500 h-2 w-2"
																					})) : createCommentVNode("", true)]),
																					_: 2
																				}, 1024), createVNode(unref(TooltipContent_default), {
																					align: "start",
																					side: "bottom"
																				}, {
																					default: withCtx(() => [createVNode("p", null, "Active Sigma Rule")]),
																					_: 1
																				})]),
																				_: 2
																			}, 1024),
																			createVNode("button", {
																				class: "ml-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2",
																				onClick: withModifiers(($event) => fs.value.closeFile(fileId), ["stop"])
																			}, [createVNode(unref(X), { class: "h-4 w-4" }), createVNode("span", { class: "sr-only" }, "Close")], 8, ["onClick"])
																		]),
																		_: 2
																	}, 1032, ["value"]);
																}), 128))];
															}),
															_: 1
														}, _parent$4, _scopeId$3));
														_push$4(`</div>`);
														_push$4(ssrRenderComponent(unref(ScrollBar_default), { orientation: "horizontal" }, null, _parent$4, _scopeId$3));
													} else return [createVNode("div", { class: "w-full relative h-10" }, [createVNode(unref(TabsList_default), { class: "flex items-center absolute h-10 border-none bg-transparent" }, {
														default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(fs.value.openFiles, (fileId) => {
															return openBlock(), createBlock(unref(TabsTrigger_default), {
																key: fileId,
																value: fileId,
																"as-child": "",
																class: "flex items-center gap-2"
															}, {
																default: withCtx(() => [
																	createTextVNode(toDisplayString(fs.value.files.find((f) => f.id === fileId)?.name) + " ", 1),
																	createVNode(unref(Tooltip_default), null, {
																		default: withCtx(() => [createVNode(unref(TooltipTrigger_default), null, {
																			default: withCtx(() => [sigma.value.active_sigma_rule_file_id === fileId ? (openBlock(), createBlock("span", {
																				key: 0,
																				class: "block rounded-full bg-sky-500 h-2 w-2"
																			})) : createCommentVNode("", true)]),
																			_: 2
																		}, 1024), createVNode(unref(TooltipContent_default), {
																			align: "start",
																			side: "bottom"
																		}, {
																			default: withCtx(() => [createVNode("p", null, "Active Sigma Rule")]),
																			_: 1
																		})]),
																		_: 2
																	}, 1024),
																	createVNode("button", {
																		class: "ml-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2",
																		onClick: withModifiers(($event) => fs.value.closeFile(fileId), ["stop"])
																	}, [createVNode(unref(X), { class: "h-4 w-4" }), createVNode("span", { class: "sr-only" }, "Close")], 8, ["onClick"])
																]),
																_: 2
															}, 1032, ["value"]);
														}), 128))]),
														_: 1
													})]), createVNode(unref(ScrollBar_default), { orientation: "horizontal" })];
												}),
												_: 1
											}, _parent$3, _scopeId$2));
											_push$3(`</div><!--[-->`);
											ssrRenderList(fs.value.openFiles, (fileId) => {
												_push$3(ssrRenderComponent(unref(TabsContent_default), {
													key: fileId,
													style: { maxHeight: editorMaxHeight.value },
													value: fileId,
													"as-child": "",
													class: "mt-0! flex-1 min-h-0 bg-[#0D1116] overflow-auto"
												}, {
													default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
														if (_push$4) _push$4(ssrRenderComponent(PrismEditor_default, {
															modelValue: fs.value.files.find((f) => f.id === fileId).content,
															"onUpdate:modelValue": [($event) => fs.value.files.find((f) => f.id === fileId).content = $event, (content) => fs.value.updateFile(fileId, content)],
															"insert-spaces": true,
															"line-numbers": true,
															class: "text-xs md:text-sm h-full w-full",
															language: "yaml",
															onSelectionChange: console.log
														}, null, _parent$4, _scopeId$3));
														else return [createVNode(PrismEditor_default, {
															modelValue: fs.value.files.find((f) => f.id === fileId).content,
															"onUpdate:modelValue": [($event) => fs.value.files.find((f) => f.id === fileId).content = $event, (content) => fs.value.updateFile(fileId, content)],
															"insert-spaces": true,
															"line-numbers": true,
															class: "text-xs md:text-sm h-full w-full",
															language: "yaml",
															onSelectionChange: console.log
														}, null, 8, [
															"modelValue",
															"onUpdate:modelValue",
															"onSelectionChange"
														])];
													}),
													_: 2
												}, _parent$3, _scopeId$2));
											});
											_push$3(`<!--]-->`);
										} else return [createVNode("div", { class: "flex items-center" }, [
											fileStorePanelRef.value?.isCollapsed ? (openBlock(), createBlock(unref(Button_default), {
												key: 0,
												class: "flex items-center gap-2 rounded-lg",
												size: "icon",
												variant: "secondary",
												onClick: ($event) => fileStorePanelRef.value?.expand()
											}, {
												default: withCtx(() => [createVNode(unref(PanelRightClose), { class: "h-4 w-4" })]),
												_: 1
											}, 8, ["onClick"])) : createCommentVNode("", true),
											fileStorePanelRef.value?.isExpanded ? (openBlock(), createBlock(unref(Button_default), {
												key: 1,
												class: "flex items-center gap-2 rounded-lg",
												size: "icon",
												variant: "ghost",
												onClick: ($event) => fileStorePanelRef.value?.collapse()
											}, {
												default: withCtx(() => [createVNode(unref(PanelRightOpen), { class: "h-4 w-4" })]),
												_: 1
											}, 8, ["onClick"])) : createCommentVNode("", true),
											createVNode(unref(ScrollArea_default), { class: "w-full" }, {
												default: withCtx(() => [createVNode("div", { class: "w-full relative h-10" }, [createVNode(unref(TabsList_default), { class: "flex items-center absolute h-10 border-none bg-transparent" }, {
													default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(fs.value.openFiles, (fileId) => {
														return openBlock(), createBlock(unref(TabsTrigger_default), {
															key: fileId,
															value: fileId,
															"as-child": "",
															class: "flex items-center gap-2"
														}, {
															default: withCtx(() => [
																createTextVNode(toDisplayString(fs.value.files.find((f) => f.id === fileId)?.name) + " ", 1),
																createVNode(unref(Tooltip_default), null, {
																	default: withCtx(() => [createVNode(unref(TooltipTrigger_default), null, {
																		default: withCtx(() => [sigma.value.active_sigma_rule_file_id === fileId ? (openBlock(), createBlock("span", {
																			key: 0,
																			class: "block rounded-full bg-sky-500 h-2 w-2"
																		})) : createCommentVNode("", true)]),
																		_: 2
																	}, 1024), createVNode(unref(TooltipContent_default), {
																		align: "start",
																		side: "bottom"
																	}, {
																		default: withCtx(() => [createVNode("p", null, "Active Sigma Rule")]),
																		_: 1
																	})]),
																	_: 2
																}, 1024),
																createVNode("button", {
																	class: "ml-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2",
																	onClick: withModifiers(($event) => fs.value.closeFile(fileId), ["stop"])
																}, [createVNode(unref(X), { class: "h-4 w-4" }), createVNode("span", { class: "sr-only" }, "Close")], 8, ["onClick"])
															]),
															_: 2
														}, 1032, ["value"]);
													}), 128))]),
													_: 1
												})]), createVNode(unref(ScrollBar_default), { orientation: "horizontal" })]),
												_: 1
											})
										]), (openBlock(true), createBlock(Fragment, null, renderList(fs.value.openFiles, (fileId) => {
											return openBlock(), createBlock(unref(TabsContent_default), {
												key: fileId,
												style: { maxHeight: editorMaxHeight.value },
												value: fileId,
												"as-child": "",
												class: "mt-0! flex-1 min-h-0 bg-[#0D1116] overflow-auto"
											}, {
												default: withCtx(() => [createVNode(PrismEditor_default, {
													modelValue: fs.value.files.find((f) => f.id === fileId).content,
													"onUpdate:modelValue": [($event) => fs.value.files.find((f) => f.id === fileId).content = $event, (content) => fs.value.updateFile(fileId, content)],
													"insert-spaces": true,
													"line-numbers": true,
													class: "text-xs md:text-sm h-full w-full",
													language: "yaml",
													onSelectionChange: console.log
												}, null, 8, [
													"modelValue",
													"onUpdate:modelValue",
													"onSelectionChange"
												])]),
												_: 2
											}, 1032, ["style", "value"]);
										}), 128))];
									}),
									_: 1
								}, _parent$2, _scopeId$1));
								else return [createVNode(unref(Tabs_default), {
									"model-value": fs.value.currentlyOpenFileId,
									"onUpdate:modelValue": ($event) => fs.value.currentlyOpenFileId = $event,
									class: ""
								}, {
									default: withCtx(() => [createVNode("div", { class: "flex items-center" }, [
										fileStorePanelRef.value?.isCollapsed ? (openBlock(), createBlock(unref(Button_default), {
											key: 0,
											class: "flex items-center gap-2 rounded-lg",
											size: "icon",
											variant: "secondary",
											onClick: ($event) => fileStorePanelRef.value?.expand()
										}, {
											default: withCtx(() => [createVNode(unref(PanelRightClose), { class: "h-4 w-4" })]),
											_: 1
										}, 8, ["onClick"])) : createCommentVNode("", true),
										fileStorePanelRef.value?.isExpanded ? (openBlock(), createBlock(unref(Button_default), {
											key: 1,
											class: "flex items-center gap-2 rounded-lg",
											size: "icon",
											variant: "ghost",
											onClick: ($event) => fileStorePanelRef.value?.collapse()
										}, {
											default: withCtx(() => [createVNode(unref(PanelRightOpen), { class: "h-4 w-4" })]),
											_: 1
										}, 8, ["onClick"])) : createCommentVNode("", true),
										createVNode(unref(ScrollArea_default), { class: "w-full" }, {
											default: withCtx(() => [createVNode("div", { class: "w-full relative h-10" }, [createVNode(unref(TabsList_default), { class: "flex items-center absolute h-10 border-none bg-transparent" }, {
												default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(fs.value.openFiles, (fileId) => {
													return openBlock(), createBlock(unref(TabsTrigger_default), {
														key: fileId,
														value: fileId,
														"as-child": "",
														class: "flex items-center gap-2"
													}, {
														default: withCtx(() => [
															createTextVNode(toDisplayString(fs.value.files.find((f) => f.id === fileId)?.name) + " ", 1),
															createVNode(unref(Tooltip_default), null, {
																default: withCtx(() => [createVNode(unref(TooltipTrigger_default), null, {
																	default: withCtx(() => [sigma.value.active_sigma_rule_file_id === fileId ? (openBlock(), createBlock("span", {
																		key: 0,
																		class: "block rounded-full bg-sky-500 h-2 w-2"
																	})) : createCommentVNode("", true)]),
																	_: 2
																}, 1024), createVNode(unref(TooltipContent_default), {
																	align: "start",
																	side: "bottom"
																}, {
																	default: withCtx(() => [createVNode("p", null, "Active Sigma Rule")]),
																	_: 1
																})]),
																_: 2
															}, 1024),
															createVNode("button", {
																class: "ml-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2",
																onClick: withModifiers(($event) => fs.value.closeFile(fileId), ["stop"])
															}, [createVNode(unref(X), { class: "h-4 w-4" }), createVNode("span", { class: "sr-only" }, "Close")], 8, ["onClick"])
														]),
														_: 2
													}, 1032, ["value"]);
												}), 128))]),
												_: 1
											})]), createVNode(unref(ScrollBar_default), { orientation: "horizontal" })]),
											_: 1
										})
									]), (openBlock(true), createBlock(Fragment, null, renderList(fs.value.openFiles, (fileId) => {
										return openBlock(), createBlock(unref(TabsContent_default), {
											key: fileId,
											style: { maxHeight: editorMaxHeight.value },
											value: fileId,
											"as-child": "",
											class: "mt-0! flex-1 min-h-0 bg-[#0D1116] overflow-auto"
										}, {
											default: withCtx(() => [createVNode(PrismEditor_default, {
												modelValue: fs.value.files.find((f) => f.id === fileId).content,
												"onUpdate:modelValue": [($event) => fs.value.files.find((f) => f.id === fileId).content = $event, (content) => fs.value.updateFile(fileId, content)],
												"insert-spaces": true,
												"line-numbers": true,
												class: "text-xs md:text-sm h-full w-full",
												language: "yaml",
												onSelectionChange: console.log
											}, null, 8, [
												"modelValue",
												"onUpdate:modelValue",
												"onSelectionChange"
											])]),
											_: 2
										}, 1032, ["style", "value"]);
									}), 128))]),
									_: 1
								}, 8, ["model-value", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent$1, _scopeId));
					} else return [
						createVNode(unref(ResizablePanel), {
							ref_key: "fileStorePanelRef",
							ref: fileStorePanelRef,
							"default-size": 20,
							"max-size": unref(isDesktop) ? 30 : 90,
							"min-size": unref(isDesktop) ? 20 : 60,
							collapsible: ""
						}, {
							default: withCtx(() => [createVNode(FileList_default)]),
							_: 1
						}, 8, ["max-size", "min-size"]),
						createVNode(unref(ResizableHandle_default), { "with-handle": "" }),
						createVNode(unref(ResizablePanel), {
							"default-size": 80,
							"as-child": "",
							class: "h-full min-h-0 overflow-hidden"
						}, {
							default: withCtx(() => [createVNode(unref(Tabs_default), {
								"model-value": fs.value.currentlyOpenFileId,
								"onUpdate:modelValue": ($event) => fs.value.currentlyOpenFileId = $event,
								class: ""
							}, {
								default: withCtx(() => [createVNode("div", { class: "flex items-center" }, [
									fileStorePanelRef.value?.isCollapsed ? (openBlock(), createBlock(unref(Button_default), {
										key: 0,
										class: "flex items-center gap-2 rounded-lg",
										size: "icon",
										variant: "secondary",
										onClick: ($event) => fileStorePanelRef.value?.expand()
									}, {
										default: withCtx(() => [createVNode(unref(PanelRightClose), { class: "h-4 w-4" })]),
										_: 1
									}, 8, ["onClick"])) : createCommentVNode("", true),
									fileStorePanelRef.value?.isExpanded ? (openBlock(), createBlock(unref(Button_default), {
										key: 1,
										class: "flex items-center gap-2 rounded-lg",
										size: "icon",
										variant: "ghost",
										onClick: ($event) => fileStorePanelRef.value?.collapse()
									}, {
										default: withCtx(() => [createVNode(unref(PanelRightOpen), { class: "h-4 w-4" })]),
										_: 1
									}, 8, ["onClick"])) : createCommentVNode("", true),
									createVNode(unref(ScrollArea_default), { class: "w-full" }, {
										default: withCtx(() => [createVNode("div", { class: "w-full relative h-10" }, [createVNode(unref(TabsList_default), { class: "flex items-center absolute h-10 border-none bg-transparent" }, {
											default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(fs.value.openFiles, (fileId) => {
												return openBlock(), createBlock(unref(TabsTrigger_default), {
													key: fileId,
													value: fileId,
													"as-child": "",
													class: "flex items-center gap-2"
												}, {
													default: withCtx(() => [
														createTextVNode(toDisplayString(fs.value.files.find((f) => f.id === fileId)?.name) + " ", 1),
														createVNode(unref(Tooltip_default), null, {
															default: withCtx(() => [createVNode(unref(TooltipTrigger_default), null, {
																default: withCtx(() => [sigma.value.active_sigma_rule_file_id === fileId ? (openBlock(), createBlock("span", {
																	key: 0,
																	class: "block rounded-full bg-sky-500 h-2 w-2"
																})) : createCommentVNode("", true)]),
																_: 2
															}, 1024), createVNode(unref(TooltipContent_default), {
																align: "start",
																side: "bottom"
															}, {
																default: withCtx(() => [createVNode("p", null, "Active Sigma Rule")]),
																_: 1
															})]),
															_: 2
														}, 1024),
														createVNode("button", {
															class: "ml-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2",
															onClick: withModifiers(($event) => fs.value.closeFile(fileId), ["stop"])
														}, [createVNode(unref(X), { class: "h-4 w-4" }), createVNode("span", { class: "sr-only" }, "Close")], 8, ["onClick"])
													]),
													_: 2
												}, 1032, ["value"]);
											}), 128))]),
											_: 1
										})]), createVNode(unref(ScrollBar_default), { orientation: "horizontal" })]),
										_: 1
									})
								]), (openBlock(true), createBlock(Fragment, null, renderList(fs.value.openFiles, (fileId) => {
									return openBlock(), createBlock(unref(TabsContent_default), {
										key: fileId,
										style: { maxHeight: editorMaxHeight.value },
										value: fileId,
										"as-child": "",
										class: "mt-0! flex-1 min-h-0 bg-[#0D1116] overflow-auto"
									}, {
										default: withCtx(() => [createVNode(PrismEditor_default, {
											modelValue: fs.value.files.find((f) => f.id === fileId).content,
											"onUpdate:modelValue": [($event) => fs.value.files.find((f) => f.id === fileId).content = $event, (content) => fs.value.updateFile(fileId, content)],
											"insert-spaces": true,
											"line-numbers": true,
											class: "text-xs md:text-sm h-full w-full",
											language: "yaml",
											onSelectionChange: console.log
										}, null, 8, [
											"modelValue",
											"onUpdate:modelValue",
											"onSelectionChange"
										])]),
										_: 2
									}, 1032, ["style", "value"]);
								}), 128))]),
								_: 1
							}, 8, ["model-value", "onUpdate:modelValue"])]),
							_: 1
						})
					];
				}),
				_: 1
			}, _parent));
		};
	}
});
var _sfc_setup$11 = Editor_vue_vue_type_script_setup_true_lang_default.setup;
Editor_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Editor.vue");
	return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
var Editor_default = Editor_vue_vue_type_script_setup_true_lang_default;
var ShareWorkspaceButton_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ShareWorkspaceButton",
	__ssrInlineRender: true,
	setup(__props) {
		const workspaceStore = useWorkspaceStore();
		const shareStore = useWorkspaceSharingStore();
		const shareUrl = computed(() => {
			return shareStore.generateShareableUrl(workspaceStore.currentWorkspace);
		});
		const { copy, isSupported } = useClipboard({ source: shareUrl });
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
														if (_push$4) _push$4(` Share workspace `);
														else return [createTextVNode(" Share workspace ")];
													}),
													_: 1
												}, _parent$3, _scopeId$2));
												_push$3(ssrRenderComponent(unref(DialogDescription_default), null, {
													default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
														if (_push$4) _push$4(` Share your detection.studio workspace with others by sending them the link below. `);
														else return [createTextVNode(" Share your detection.studio workspace with others by sending them the link below. ")];
													}),
													_: 1
												}, _parent$3, _scopeId$2));
											} else return [createVNode(unref(DialogTitle_default), null, {
												default: withCtx(() => [createTextVNode(" Share workspace ")]),
												_: 1
											}), createVNode(unref(DialogDescription_default), null, {
												default: withCtx(() => [createTextVNode(" Share your detection.studio workspace with others by sending them the link below. ")]),
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
										default: withCtx(() => [createTextVNode(" Share workspace ")]),
										_: 1
									}), createVNode(unref(DialogDescription_default), null, {
										default: withCtx(() => [createTextVNode(" Share your detection.studio workspace with others by sending them the link below. ")]),
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
								default: withCtx(() => [createTextVNode(" Share workspace ")]),
								_: 1
							}), createVNode(unref(DialogDescription_default), null, {
								default: withCtx(() => [createTextVNode(" Share your detection.studio workspace with others by sending them the link below. ")]),
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
var _sfc_setup$10 = ShareWorkspaceButton_vue_vue_type_script_setup_true_lang_default.setup;
ShareWorkspaceButton_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ShareWorkspaceButton.vue");
	return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
var ShareWorkspaceButton_default = ShareWorkspaceButton_vue_vue_type_script_setup_true_lang_default;
var DataView_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "DataView",
	__ssrInlineRender: true,
	setup(__props) {
		const workspace = useWorkspaceStore();
		const data = computed(() => workspace.currentWorkspace?.dataStore());
		const sigma = computed(() => workspace.currentWorkspace?.sigmaStore());
		const activeTab = ref("summary");
		const rowsPerPage = ref(10);
		const showErrorDetails = ref(false);
		const columns = ref([]);
		const { files, open, reset, onCancel, onChange } = useFileDialog({
			accept: "application/json",
			directory: false
		});
		onChange(async (files$1) => {
			data.value.current_data_frame = await files$1[0].text();
		});
		const table = computed(() => {
			return createTable({
				data: sigma.value?.search_results.value?.matches || [],
				columns: columns.value,
				getCoreRowModel: getCoreRowModel(),
				getPaginationRowModel: getPaginationRowModel(),
				state: { pagination: {
					pageIndex: 0,
					pageSize: rowsPerPage.value
				} }
			});
		});
		const tableInstance = computed(() => {
			return useVueTable(table.value);
		});
		watch(() => sigma.value?.search_results.value, (newResults) => {
			if (newResults?.matches?.length > 0) updateTableColumns(newResults.matches);
		}, { deep: true });
		function updateTableColumns(data$1) {
			if (!data$1 || data$1.length === 0) return;
			const firstRecord = data$1[0];
			const newColumns = [];
			Object.keys(firstRecord).forEach((key) => {
				newColumns.push({
					id: key,
					accessorKey: key,
					header: key,
					cell: (info) => highlightMatchingField(info.getValue(), key)
				});
			});
			columns.value = newColumns;
		}
		function highlightMatchingField(value, key) {
			if (value === void 0 || value === null) return "";
			const stringValue = typeof value === "object" ? JSON.stringify(value) : String(value);
			const sqlQuery = sigma.value?.siem_query.value || "";
			if (sqlQuery.includes(key) && (sqlQuery.includes(`${key}=`) || sqlQuery.includes(`${key} =`) || sqlQuery.includes(`\`${key}\`=`) || sqlQuery.includes(`\`${key}\` =`))) return `<span class="text-primary-500 font-semibold">${stringValue}</span>`;
			return stringValue;
		}
		function formatBytes(bytes, decimals = 2) {
			if (bytes === 0) return "0 Bytes";
			const k = 1024;
			const dm = decimals < 0 ? 0 : decimals;
			const sizes = [
				"Bytes",
				"KB",
				"MB",
				"GB",
				"TB"
			];
			const i = Math.floor(Math.log(bytes) / Math.log(k));
			return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full w-full rounded-xl bg-muted/50 flex flex-col gap-2 p-3 overflow-hidden" }, _attrs))} data-v-1d6dce10>`);
			if (!data.value?.current_data_frame) {
				_push(`<div class="flex flex-col items-center justify-center h-full gap-2" data-v-1d6dce10><h2 class="text-lg font-semibold" data-v-1d6dce10>SIEM Sample Data</h2><p class="text-sm text-muted-foreground mb-2" data-v-1d6dce10> Upload sample data to test your SIEM queries </p>`);
				_push(ssrRenderComponent(unref(Button_default), {
					class: "h-8 flex gap-2",
					size: "sm",
					onClick: unref(open)
				}, {
					default: withCtx((_, _push$1, _parent$1, _scopeId) => {
						if (_push$1) {
							_push$1(ssrRenderComponent(unref(PlusIcon), { class: "h-3.5 w-3.5" }, null, _parent$1, _scopeId));
							_push$1(` Upload JSON File `);
						} else return [createVNode(unref(PlusIcon), { class: "h-3.5 w-3.5" }), createTextVNode(" Upload JSON File ")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else {
				_push(`<!--[--><div class="flex items-center justify-between mb-2" data-v-1d6dce10><div class="flex items-center gap-2" data-v-1d6dce10><h2 class="text-sm font-semibold" data-v-1d6dce10>SIEM Sample Data</h2>`);
				if (sigma.value?.is_data_loaded) _push(ssrRenderComponent(unref(Badge_default), { class: "bg-green-600 hover:bg-green-700" }, {
					default: withCtx((_, _push$1, _parent$1, _scopeId) => {
						if (_push$1) {
							_push$1(ssrRenderComponent(unref(CheckCircleIcon), { class: "h-3 w-3 mr-1" }, null, _parent$1, _scopeId));
							_push$1(` Ready for Analysis `);
						} else return [createVNode(unref(CheckCircleIcon), { class: "h-3 w-3 mr-1" }), createTextVNode(" Ready for Analysis ")];
					}),
					_: 1
				}, _parent));
				else if (!sigma.value?.data_loading_error) _push(ssrRenderComponent(unref(Badge_default), { class: "bg-orange-500 hover:bg-orange-600" }, {
					default: withCtx((_, _push$1, _parent$1, _scopeId) => {
						if (_push$1) {
							_push$1(ssrRenderComponent(unref(LoaderIcon), { class: "h-3 w-3 mr-1 animate-spin" }, null, _parent$1, _scopeId));
							_push$1(` Loading Data `);
						} else return [createVNode(unref(LoaderIcon), { class: "h-3 w-3 mr-1 animate-spin" }), createTextVNode(" Loading Data ")];
					}),
					_: 1
				}, _parent));
				else _push(ssrRenderComponent(unref(Badge_default), {
					class: "bg-red-600 hover:bg-red-700 cursor-pointer",
					onClick: ($event) => showErrorDetails.value = !showErrorDetails.value
				}, {
					default: withCtx((_, _push$1, _parent$1, _scopeId) => {
						if (_push$1) {
							_push$1(ssrRenderComponent(unref(AlertCircleIcon), { class: "h-3 w-3 mr-1" }, null, _parent$1, _scopeId));
							_push$1(` Error Loading Data `);
						} else return [createVNode(unref(AlertCircleIcon), { class: "h-3 w-3 mr-1" }), createTextVNode(" Error Loading Data ")];
					}),
					_: 1
				}, _parent));
				if (showErrorDetails.value && sigma.value?.data_loading_error) _push(`<div class="absolute top-12 right-4 bg-red-900/90 text-white p-3 rounded-md text-xs z-10 max-w-md shadow-lg" data-v-1d6dce10><div class="flex justify-between items-center mb-2" data-v-1d6dce10><h4 class="font-semibold" data-v-1d6dce10>Error Details</h4><button class="text-white hover:text-red-200" data-v-1d6dce10> × </button></div><div class="whitespace-pre-wrap" data-v-1d6dce10>${ssrInterpolate(sigma.value.data_loading_error)}</div></div>`);
				else _push(`<!---->`);
				_push(`</div>`);
				_push(ssrRenderComponent(unref(Button_default), {
					class: "h-7 flex gap-1",
					size: "sm",
					variant: "outline",
					onClick: ($event) => data.value.clearCurrentDataFrame()
				}, {
					default: withCtx((_, _push$1, _parent$1, _scopeId) => {
						if (_push$1) {
							_push$1(ssrRenderComponent(unref(PlusIcon), { class: "h-3 w-3" }, null, _parent$1, _scopeId));
							_push$1(` Clear `);
						} else return [createVNode(unref(PlusIcon), { class: "h-3 w-3" }), createTextVNode(" Clear ")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
				_push(ssrRenderComponent(unref(Tabs_default), {
					modelValue: activeTab.value,
					"onUpdate:modelValue": ($event) => activeTab.value = $event,
					class: "flex-1 min-h-0 flex flex-col"
				}, {
					default: withCtx((_, _push$1, _parent$1, _scopeId) => {
						if (_push$1) {
							_push$1(ssrRenderComponent(unref(TabsList_default), { class: "mb-2" }, {
								default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
									if (_push$2) {
										_push$2(ssrRenderComponent(unref(TabsTrigger_default), { value: "summary" }, {
											default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
												if (_push$3) _push$3(`Summary`);
												else return [createTextVNode("Summary")];
											}),
											_: 1
										}, _parent$2, _scopeId$1));
										_push$2(ssrRenderComponent(unref(TabsTrigger_default), { value: "matches" }, {
											default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
												if (_push$3) {
													_push$3(` Matches `);
													if (sigma.value?.search_results.value?.stats?.totalMatches) _push$3(ssrRenderComponent(unref(Badge_default), { class: "ml-1" }, {
														default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
															if (_push$4) _push$4(`${ssrInterpolate(sigma.value?.search_results.value?.stats?.totalMatches)}`);
															else return [createTextVNode(toDisplayString(sigma.value?.search_results.value?.stats?.totalMatches), 1)];
														}),
														_: 1
													}, _parent$3, _scopeId$2));
													else _push$3(`<!---->`);
												} else return [createTextVNode(" Matches "), sigma.value?.search_results.value?.stats?.totalMatches ? (openBlock(), createBlock(unref(Badge_default), {
													key: 0,
													class: "ml-1"
												}, {
													default: withCtx(() => [createTextVNode(toDisplayString(sigma.value?.search_results.value?.stats?.totalMatches), 1)]),
													_: 1
												})) : createCommentVNode("", true)];
											}),
											_: 1
										}, _parent$2, _scopeId$1));
										_push$2(ssrRenderComponent(unref(TabsTrigger_default), { value: "raw" }, {
											default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
												if (_push$3) _push$3(`Raw Data`);
												else return [createTextVNode("Raw Data")];
											}),
											_: 1
										}, _parent$2, _scopeId$1));
									} else return [
										createVNode(unref(TabsTrigger_default), { value: "summary" }, {
											default: withCtx(() => [createTextVNode("Summary")]),
											_: 1
										}),
										createVNode(unref(TabsTrigger_default), { value: "matches" }, {
											default: withCtx(() => [createTextVNode(" Matches "), sigma.value?.search_results.value?.stats?.totalMatches ? (openBlock(), createBlock(unref(Badge_default), {
												key: 0,
												class: "ml-1"
											}, {
												default: withCtx(() => [createTextVNode(toDisplayString(sigma.value?.search_results.value?.stats?.totalMatches), 1)]),
												_: 1
											})) : createCommentVNode("", true)]),
											_: 1
										}),
										createVNode(unref(TabsTrigger_default), { value: "raw" }, {
											default: withCtx(() => [createTextVNode("Raw Data")]),
											_: 1
										})
									];
								}),
								_: 1
							}, _parent$1, _scopeId));
							_push$1(ssrRenderComponent(unref(TabsContent_default), {
								class: "flex-1 min-h-0 data-[state=active]:flex data-[state=active]:flex-col",
								value: "summary"
							}, {
								default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
									if (_push$2) {
										_push$2(ssrRenderComponent(unref(Card_default), { class: "p-4" }, {
											default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
												if (_push$3) _push$3(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-1d6dce10${_scopeId$2}><div class="flex flex-col gap-2" data-v-1d6dce10${_scopeId$2}><h3 class="text-sm font-medium" data-v-1d6dce10${_scopeId$2}>Data Summary</h3><div class="grid grid-cols-2 gap-2 text-xs" data-v-1d6dce10${_scopeId$2}><div class="flex flex-col" data-v-1d6dce10${_scopeId$2}><span class="text-muted-foreground" data-v-1d6dce10${_scopeId$2}>Total Records</span><span class="font-medium" data-v-1d6dce10${_scopeId$2}>${ssrInterpolate(sigma.value?.search_results.value?.stats?.totalRecords || 0)}</span></div><div class="flex flex-col" data-v-1d6dce10${_scopeId$2}><span class="text-muted-foreground" data-v-1d6dce10${_scopeId$2}>File Size</span><span class="font-medium" data-v-1d6dce10${_scopeId$2}>${ssrInterpolate(formatBytes(data.value?.current_data_frame?.length || 0))}</span></div></div></div><div class="flex flex-col gap-2" data-v-1d6dce10${_scopeId$2}><h3 class="text-sm font-medium" data-v-1d6dce10${_scopeId$2}>Query Results</h3><div class="grid grid-cols-2 gap-2 text-xs" data-v-1d6dce10${_scopeId$2}><div class="flex flex-col" data-v-1d6dce10${_scopeId$2}><span class="text-muted-foreground" data-v-1d6dce10${_scopeId$2}>Matches</span><span class="font-medium" data-v-1d6dce10${_scopeId$2}>${ssrInterpolate(sigma.value?.search_results.value?.stats?.totalMatches || 0)}</span></div><div class="flex flex-col" data-v-1d6dce10${_scopeId$2}><span class="text-muted-foreground" data-v-1d6dce10${_scopeId$2}>Match Rate</span><span class="font-medium" data-v-1d6dce10${_scopeId$2}>${ssrInterpolate(sigma.value?.search_results.value?.stats?.totalRecords ? Math.round(sigma.value?.search_results.value?.stats?.totalMatches / sigma.value?.search_results.value?.stats?.totalRecords * 100) : 0)}% </span></div></div></div></div>`);
												else return [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [createVNode("div", { class: "flex flex-col gap-2" }, [createVNode("h3", { class: "text-sm font-medium" }, "Data Summary"), createVNode("div", { class: "grid grid-cols-2 gap-2 text-xs" }, [createVNode("div", { class: "flex flex-col" }, [createVNode("span", { class: "text-muted-foreground" }, "Total Records"), createVNode("span", { class: "font-medium" }, toDisplayString(sigma.value?.search_results.value?.stats?.totalRecords || 0), 1)]), createVNode("div", { class: "flex flex-col" }, [createVNode("span", { class: "text-muted-foreground" }, "File Size"), createVNode("span", { class: "font-medium" }, toDisplayString(formatBytes(data.value?.current_data_frame?.length || 0)), 1)])])]), createVNode("div", { class: "flex flex-col gap-2" }, [createVNode("h3", { class: "text-sm font-medium" }, "Query Results"), createVNode("div", { class: "grid grid-cols-2 gap-2 text-xs" }, [createVNode("div", { class: "flex flex-col" }, [createVNode("span", { class: "text-muted-foreground" }, "Matches"), createVNode("span", { class: "font-medium" }, toDisplayString(sigma.value?.search_results.value?.stats?.totalMatches || 0), 1)]), createVNode("div", { class: "flex flex-col" }, [createVNode("span", { class: "text-muted-foreground" }, "Match Rate"), createVNode("span", { class: "font-medium" }, toDisplayString(sigma.value?.search_results.value?.stats?.totalRecords ? Math.round(sigma.value?.search_results.value?.stats?.totalMatches / sigma.value?.search_results.value?.stats?.totalRecords * 100) : 0) + "% ", 1)])])])])];
											}),
											_: 1
										}, _parent$2, _scopeId$1));
										if (sigma.value?.search_error) {
											_push$2(`<div class="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-md" data-v-1d6dce10${_scopeId$1}><div class="flex items-center gap-2 text-red-500" data-v-1d6dce10${_scopeId$1}>`);
											_push$2(ssrRenderComponent(unref(AlertCircleIcon), { class: "h-4 w-4" }, null, _parent$2, _scopeId$1));
											_push$2(`<h3 class="text-sm font-medium" data-v-1d6dce10${_scopeId$1}>Search Error</h3></div><p class="text-xs mt-1" data-v-1d6dce10${_scopeId$1}>${ssrInterpolate(sigma.value.search_error)}</p></div>`);
										} else if (sigma.value?.data_loading_error) {
											_push$2(`<div class="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-md" data-v-1d6dce10${_scopeId$1}><div class="flex items-center gap-2 text-red-500" data-v-1d6dce10${_scopeId$1}>`);
											_push$2(ssrRenderComponent(unref(AlertCircleIcon), { class: "h-4 w-4" }, null, _parent$2, _scopeId$1));
											_push$2(`<h3 class="text-sm font-medium" data-v-1d6dce10${_scopeId$1}>Data Loading Error</h3></div><p class="text-xs mt-1" data-v-1d6dce10${_scopeId$1}>${ssrInterpolate(sigma.value.data_loading_error)}</p></div>`);
										} else if (sigma.value?.is_searching) {
											_push$2(`<div class="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-md" data-v-1d6dce10${_scopeId$1}><div class="flex items-center gap-2 text-blue-500" data-v-1d6dce10${_scopeId$1}>`);
											_push$2(ssrRenderComponent(unref(LoaderIcon), { class: "h-4 w-4 animate-spin" }, null, _parent$2, _scopeId$1));
											_push$2(`<h3 class="text-sm font-medium" data-v-1d6dce10${_scopeId$1}>Searching...</h3></div></div>`);
										} else _push$2(`<!---->`);
									} else return [createVNode(unref(Card_default), { class: "p-4" }, {
										default: withCtx(() => [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [createVNode("div", { class: "flex flex-col gap-2" }, [createVNode("h3", { class: "text-sm font-medium" }, "Data Summary"), createVNode("div", { class: "grid grid-cols-2 gap-2 text-xs" }, [createVNode("div", { class: "flex flex-col" }, [createVNode("span", { class: "text-muted-foreground" }, "Total Records"), createVNode("span", { class: "font-medium" }, toDisplayString(sigma.value?.search_results.value?.stats?.totalRecords || 0), 1)]), createVNode("div", { class: "flex flex-col" }, [createVNode("span", { class: "text-muted-foreground" }, "File Size"), createVNode("span", { class: "font-medium" }, toDisplayString(formatBytes(data.value?.current_data_frame?.length || 0)), 1)])])]), createVNode("div", { class: "flex flex-col gap-2" }, [createVNode("h3", { class: "text-sm font-medium" }, "Query Results"), createVNode("div", { class: "grid grid-cols-2 gap-2 text-xs" }, [createVNode("div", { class: "flex flex-col" }, [createVNode("span", { class: "text-muted-foreground" }, "Matches"), createVNode("span", { class: "font-medium" }, toDisplayString(sigma.value?.search_results.value?.stats?.totalMatches || 0), 1)]), createVNode("div", { class: "flex flex-col" }, [createVNode("span", { class: "text-muted-foreground" }, "Match Rate"), createVNode("span", { class: "font-medium" }, toDisplayString(sigma.value?.search_results.value?.stats?.totalRecords ? Math.round(sigma.value?.search_results.value?.stats?.totalMatches / sigma.value?.search_results.value?.stats?.totalRecords * 100) : 0) + "% ", 1)])])])])]),
										_: 1
									}), sigma.value?.search_error ? (openBlock(), createBlock("div", {
										key: 0,
										class: "mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-md"
									}, [createVNode("div", { class: "flex items-center gap-2 text-red-500" }, [createVNode(unref(AlertCircleIcon), { class: "h-4 w-4" }), createVNode("h3", { class: "text-sm font-medium" }, "Search Error")]), createVNode("p", { class: "text-xs mt-1" }, toDisplayString(sigma.value.search_error), 1)])) : sigma.value?.data_loading_error ? (openBlock(), createBlock("div", {
										key: 1,
										class: "mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-md"
									}, [createVNode("div", { class: "flex items-center gap-2 text-red-500" }, [createVNode(unref(AlertCircleIcon), { class: "h-4 w-4" }), createVNode("h3", { class: "text-sm font-medium" }, "Data Loading Error")]), createVNode("p", { class: "text-xs mt-1" }, toDisplayString(sigma.value.data_loading_error), 1)])) : sigma.value?.is_searching ? (openBlock(), createBlock("div", {
										key: 2,
										class: "mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-md"
									}, [createVNode("div", { class: "flex items-center gap-2 text-blue-500" }, [createVNode(unref(LoaderIcon), { class: "h-4 w-4 animate-spin" }), createVNode("h3", { class: "text-sm font-medium" }, "Searching...")])])) : createCommentVNode("", true)];
								}),
								_: 1
							}, _parent$1, _scopeId));
							_push$1(ssrRenderComponent(unref(TabsContent_default), {
								class: "flex-1 min-h-0 data-[state=active]:flex data-[state=active]:flex-col",
								value: "matches"
							}, {
								default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
									if (_push$2) if (sigma.value?.search_results.value?.matches?.length) {
										_push$2(`<div class="flex-1 min-h-0 overflow-hidden" data-v-1d6dce10${_scopeId$1}><div class="flex flex-col flex-1 min-h-0" data-v-1d6dce10${_scopeId$1}><div class="border rounded-md overflow-hidden flex-1 min-h-0" data-v-1d6dce10${_scopeId$1}><div class="overflow-x-auto" data-v-1d6dce10${_scopeId$1}><table class="w-full text-sm" data-v-1d6dce10${_scopeId$1}><thead class="bg-muted/50" data-v-1d6dce10${_scopeId$1}><tr data-v-1d6dce10${_scopeId$1}><!--[-->`);
										ssrRenderList(tableInstance.value.getHeaderGroups()[0].headers, (header) => {
											_push$2(`<th class="px-4 py-2 text-left font-medium text-muted-foreground" data-v-1d6dce10${_scopeId$1}>${ssrInterpolate(header.column.columnDef.header)}</th>`);
										});
										_push$2(`<!--]--></tr></thead><tbody data-v-1d6dce10${_scopeId$1}><!--[-->`);
										ssrRenderList(tableInstance.value.getRowModel().rows, (row) => {
											_push$2(`<tr class="border-t hover:bg-muted/30" data-v-1d6dce10${_scopeId$1}><!--[-->`);
											ssrRenderList(row.getVisibleCells(), (cell) => {
												_push$2(`<td class="px-4 py-2 text-xs" data-v-1d6dce10${_scopeId$1}>${(cell.column.columnDef.cell ? cell.column.columnDef.cell(cell.getContext()) : cell.getValue()) ?? ""}</td>`);
											});
											_push$2(`<!--]--></tr>`);
										});
										_push$2(`<!--]--></tbody></table></div></div><div class="flex justify-between items-center py-2" data-v-1d6dce10${_scopeId$1}><div class="text-xs text-muted-foreground" data-v-1d6dce10${_scopeId$1}> Showing ${ssrInterpolate(tableInstance.value.getState().pagination.pageIndex * tableInstance.value.getState().pagination.pageSize + 1)} to ${ssrInterpolate(Math.min((tableInstance.value.getState().pagination.pageIndex + 1) * tableInstance.value.getState().pagination.pageSize, sigma.value.search_results.value.matches.length))} of ${ssrInterpolate(sigma.value.search_results.value.matches.length)} matches </div><div class="flex items-center gap-2" data-v-1d6dce10${_scopeId$1}>`);
										_push$2(ssrRenderComponent(unref(Button_default), {
											disabled: !tableInstance.value.getCanPreviousPage(),
											size: "sm",
											variant: "outline",
											onClick: ($event) => tableInstance.value.previousPage()
										}, {
											default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
												if (_push$3) _push$3(` Previous `);
												else return [createTextVNode(" Previous ")];
											}),
											_: 1
										}, _parent$2, _scopeId$1));
										_push$2(ssrRenderComponent(unref(Button_default), {
											disabled: !tableInstance.value.getCanNextPage(),
											size: "sm",
											variant: "outline",
											onClick: ($event) => tableInstance.value.nextPage()
										}, {
											default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
												if (_push$3) _push$3(` Next `);
												else return [createTextVNode(" Next ")];
											}),
											_: 1
										}, _parent$2, _scopeId$1));
										_push$2(`</div></div></div></div>`);
									} else if (sigma.value?.is_data_loaded && !sigma.value?.is_searching) {
										_push$2(`<div class="flex flex-col items-center justify-center py-12" data-v-1d6dce10${_scopeId$1}>`);
										_push$2(ssrRenderComponent(unref(SearchIcon), { class: "h-12 w-12 text-muted-foreground/50 mb-4" }, null, _parent$2, _scopeId$1));
										_push$2(`<h3 class="text-lg font-medium" data-v-1d6dce10${_scopeId$1}>No Matches Found</h3><p class="text-sm text-muted-foreground mt-1" data-v-1d6dce10${_scopeId$1}> The current Sigma rule doesn&#39;t match any logs in your dataset. </p></div>`);
									} else if (sigma.value?.is_searching) {
										_push$2(`<div class="flex flex-col items-center justify-center py-12" data-v-1d6dce10${_scopeId$1}>`);
										_push$2(ssrRenderComponent(unref(LoaderIcon), { class: "h-12 w-12 text-muted-foreground/50 mb-4 animate-spin" }, null, _parent$2, _scopeId$1));
										_push$2(`<h3 class="text-lg font-medium" data-v-1d6dce10${_scopeId$1}>Searching...</h3><p class="text-sm text-muted-foreground mt-1" data-v-1d6dce10${_scopeId$1}> Looking for matches in your dataset. </p></div>`);
									} else {
										_push$2(`<div class="flex flex-col items-center justify-center py-12" data-v-1d6dce10${_scopeId$1}>`);
										_push$2(ssrRenderComponent(unref(AlertCircleIcon), { class: "h-12 w-12 text-muted-foreground/50 mb-4" }, null, _parent$2, _scopeId$1));
										_push$2(`<h3 class="text-lg font-medium" data-v-1d6dce10${_scopeId$1}>No Data Available</h3><p class="text-sm text-muted-foreground mt-1" data-v-1d6dce10${_scopeId$1}>${ssrInterpolate(sigma.value?.data_loading_error || "Please make sure you have a valid Sigma rule and data loaded.")}</p></div>`);
									}
									else return [sigma.value?.search_results.value?.matches?.length ? (openBlock(), createBlock("div", {
										key: 0,
										class: "flex-1 min-h-0 overflow-hidden"
									}, [createVNode("div", { class: "flex flex-col flex-1 min-h-0" }, [createVNode("div", { class: "border rounded-md overflow-hidden flex-1 min-h-0" }, [createVNode("div", { class: "overflow-x-auto" }, [createVNode("table", { class: "w-full text-sm" }, [createVNode("thead", { class: "bg-muted/50" }, [createVNode("tr", null, [(openBlock(true), createBlock(Fragment, null, renderList(tableInstance.value.getHeaderGroups()[0].headers, (header) => {
										return openBlock(), createBlock("th", {
											key: header.id,
											class: "px-4 py-2 text-left font-medium text-muted-foreground"
										}, toDisplayString(header.column.columnDef.header), 1);
									}), 128))])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(tableInstance.value.getRowModel().rows, (row) => {
										return openBlock(), createBlock("tr", {
											key: row.id,
											class: "border-t hover:bg-muted/30"
										}, [(openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
											return openBlock(), createBlock("td", {
												key: cell.id,
												class: "px-4 py-2 text-xs",
												innerHTML: cell.column.columnDef.cell ? cell.column.columnDef.cell(cell.getContext()) : cell.getValue()
											}, null, 8, ["innerHTML"]);
										}), 128))]);
									}), 128))])])])]), createVNode("div", { class: "flex justify-between items-center py-2" }, [createVNode("div", { class: "text-xs text-muted-foreground" }, " Showing " + toDisplayString(tableInstance.value.getState().pagination.pageIndex * tableInstance.value.getState().pagination.pageSize + 1) + " to " + toDisplayString(Math.min((tableInstance.value.getState().pagination.pageIndex + 1) * tableInstance.value.getState().pagination.pageSize, sigma.value.search_results.value.matches.length)) + " of " + toDisplayString(sigma.value.search_results.value.matches.length) + " matches ", 1), createVNode("div", { class: "flex items-center gap-2" }, [createVNode(unref(Button_default), {
										disabled: !tableInstance.value.getCanPreviousPage(),
										size: "sm",
										variant: "outline",
										onClick: ($event) => tableInstance.value.previousPage()
									}, {
										default: withCtx(() => [createTextVNode(" Previous ")]),
										_: 1
									}, 8, ["disabled", "onClick"]), createVNode(unref(Button_default), {
										disabled: !tableInstance.value.getCanNextPage(),
										size: "sm",
										variant: "outline",
										onClick: ($event) => tableInstance.value.nextPage()
									}, {
										default: withCtx(() => [createTextVNode(" Next ")]),
										_: 1
									}, 8, ["disabled", "onClick"])])])])])) : sigma.value?.is_data_loaded && !sigma.value?.is_searching ? (openBlock(), createBlock("div", {
										key: 1,
										class: "flex flex-col items-center justify-center py-12"
									}, [
										createVNode(unref(SearchIcon), { class: "h-12 w-12 text-muted-foreground/50 mb-4" }),
										createVNode("h3", { class: "text-lg font-medium" }, "No Matches Found"),
										createVNode("p", { class: "text-sm text-muted-foreground mt-1" }, " The current Sigma rule doesn't match any logs in your dataset. ")
									])) : sigma.value?.is_searching ? (openBlock(), createBlock("div", {
										key: 2,
										class: "flex flex-col items-center justify-center py-12"
									}, [
										createVNode(unref(LoaderIcon), { class: "h-12 w-12 text-muted-foreground/50 mb-4 animate-spin" }),
										createVNode("h3", { class: "text-lg font-medium" }, "Searching..."),
										createVNode("p", { class: "text-sm text-muted-foreground mt-1" }, " Looking for matches in your dataset. ")
									])) : (openBlock(), createBlock("div", {
										key: 3,
										class: "flex flex-col items-center justify-center py-12"
									}, [
										createVNode(unref(AlertCircleIcon), { class: "h-12 w-12 text-muted-foreground/50 mb-4" }),
										createVNode("h3", { class: "text-lg font-medium" }, "No Data Available"),
										createVNode("p", { class: "text-sm text-muted-foreground mt-1" }, toDisplayString(sigma.value?.data_loading_error || "Please make sure you have a valid Sigma rule and data loaded."), 1)
									]))];
								}),
								_: 1
							}, _parent$1, _scopeId));
							_push$1(ssrRenderComponent(unref(TabsContent_default), {
								class: "flex-1 min-h-0 data-[state=active]:flex data-[state=active]:flex-col",
								value: "raw"
							}, {
								default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
									if (_push$2) _push$2(ssrRenderComponent(unref(ScrollArea_default), { class: "flex-1 min-h-0 w-full" }, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) {
												_push$3(`<div class="text-xs text-slate-300 rounded-md text-wrap w-full" data-v-1d6dce10${_scopeId$2}><pre class="p-2" data-v-1d6dce10${_scopeId$2}><code data-v-1d6dce10${_scopeId$2}>${ssrInterpolate(data.value?.current_data_frame)}</code></pre></div>`);
												_push$3(ssrRenderComponent(unref(ScrollBar_default), { orientation: "horizontal" }, null, _parent$3, _scopeId$2));
											} else return [createVNode("div", { class: "text-xs text-slate-300 rounded-md text-wrap w-full" }, [createVNode("pre", { class: "p-2" }, [createVNode("code", null, toDisplayString(data.value?.current_data_frame), 1)])]), createVNode(unref(ScrollBar_default), { orientation: "horizontal" })];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									else return [createVNode(unref(ScrollArea_default), { class: "flex-1 min-h-0 w-full" }, {
										default: withCtx(() => [createVNode("div", { class: "text-xs text-slate-300 rounded-md text-wrap w-full" }, [createVNode("pre", { class: "p-2" }, [createVNode("code", null, toDisplayString(data.value?.current_data_frame), 1)])]), createVNode(unref(ScrollBar_default), { orientation: "horizontal" })]),
										_: 1
									})];
								}),
								_: 1
							}, _parent$1, _scopeId));
						} else return [
							createVNode(unref(TabsList_default), { class: "mb-2" }, {
								default: withCtx(() => [
									createVNode(unref(TabsTrigger_default), { value: "summary" }, {
										default: withCtx(() => [createTextVNode("Summary")]),
										_: 1
									}),
									createVNode(unref(TabsTrigger_default), { value: "matches" }, {
										default: withCtx(() => [createTextVNode(" Matches "), sigma.value?.search_results.value?.stats?.totalMatches ? (openBlock(), createBlock(unref(Badge_default), {
											key: 0,
											class: "ml-1"
										}, {
											default: withCtx(() => [createTextVNode(toDisplayString(sigma.value?.search_results.value?.stats?.totalMatches), 1)]),
											_: 1
										})) : createCommentVNode("", true)]),
										_: 1
									}),
									createVNode(unref(TabsTrigger_default), { value: "raw" }, {
										default: withCtx(() => [createTextVNode("Raw Data")]),
										_: 1
									})
								]),
								_: 1
							}),
							createVNode(unref(TabsContent_default), {
								class: "flex-1 min-h-0 data-[state=active]:flex data-[state=active]:flex-col",
								value: "summary"
							}, {
								default: withCtx(() => [createVNode(unref(Card_default), { class: "p-4" }, {
									default: withCtx(() => [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [createVNode("div", { class: "flex flex-col gap-2" }, [createVNode("h3", { class: "text-sm font-medium" }, "Data Summary"), createVNode("div", { class: "grid grid-cols-2 gap-2 text-xs" }, [createVNode("div", { class: "flex flex-col" }, [createVNode("span", { class: "text-muted-foreground" }, "Total Records"), createVNode("span", { class: "font-medium" }, toDisplayString(sigma.value?.search_results.value?.stats?.totalRecords || 0), 1)]), createVNode("div", { class: "flex flex-col" }, [createVNode("span", { class: "text-muted-foreground" }, "File Size"), createVNode("span", { class: "font-medium" }, toDisplayString(formatBytes(data.value?.current_data_frame?.length || 0)), 1)])])]), createVNode("div", { class: "flex flex-col gap-2" }, [createVNode("h3", { class: "text-sm font-medium" }, "Query Results"), createVNode("div", { class: "grid grid-cols-2 gap-2 text-xs" }, [createVNode("div", { class: "flex flex-col" }, [createVNode("span", { class: "text-muted-foreground" }, "Matches"), createVNode("span", { class: "font-medium" }, toDisplayString(sigma.value?.search_results.value?.stats?.totalMatches || 0), 1)]), createVNode("div", { class: "flex flex-col" }, [createVNode("span", { class: "text-muted-foreground" }, "Match Rate"), createVNode("span", { class: "font-medium" }, toDisplayString(sigma.value?.search_results.value?.stats?.totalRecords ? Math.round(sigma.value?.search_results.value?.stats?.totalMatches / sigma.value?.search_results.value?.stats?.totalRecords * 100) : 0) + "% ", 1)])])])])]),
									_: 1
								}), sigma.value?.search_error ? (openBlock(), createBlock("div", {
									key: 0,
									class: "mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-md"
								}, [createVNode("div", { class: "flex items-center gap-2 text-red-500" }, [createVNode(unref(AlertCircleIcon), { class: "h-4 w-4" }), createVNode("h3", { class: "text-sm font-medium" }, "Search Error")]), createVNode("p", { class: "text-xs mt-1" }, toDisplayString(sigma.value.search_error), 1)])) : sigma.value?.data_loading_error ? (openBlock(), createBlock("div", {
									key: 1,
									class: "mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-md"
								}, [createVNode("div", { class: "flex items-center gap-2 text-red-500" }, [createVNode(unref(AlertCircleIcon), { class: "h-4 w-4" }), createVNode("h3", { class: "text-sm font-medium" }, "Data Loading Error")]), createVNode("p", { class: "text-xs mt-1" }, toDisplayString(sigma.value.data_loading_error), 1)])) : sigma.value?.is_searching ? (openBlock(), createBlock("div", {
									key: 2,
									class: "mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-md"
								}, [createVNode("div", { class: "flex items-center gap-2 text-blue-500" }, [createVNode(unref(LoaderIcon), { class: "h-4 w-4 animate-spin" }), createVNode("h3", { class: "text-sm font-medium" }, "Searching...")])])) : createCommentVNode("", true)]),
								_: 1
							}),
							createVNode(unref(TabsContent_default), {
								class: "flex-1 min-h-0 data-[state=active]:flex data-[state=active]:flex-col",
								value: "matches"
							}, {
								default: withCtx(() => [sigma.value?.search_results.value?.matches?.length ? (openBlock(), createBlock("div", {
									key: 0,
									class: "flex-1 min-h-0 overflow-hidden"
								}, [createVNode("div", { class: "flex flex-col flex-1 min-h-0" }, [createVNode("div", { class: "border rounded-md overflow-hidden flex-1 min-h-0" }, [createVNode("div", { class: "overflow-x-auto" }, [createVNode("table", { class: "w-full text-sm" }, [createVNode("thead", { class: "bg-muted/50" }, [createVNode("tr", null, [(openBlock(true), createBlock(Fragment, null, renderList(tableInstance.value.getHeaderGroups()[0].headers, (header) => {
									return openBlock(), createBlock("th", {
										key: header.id,
										class: "px-4 py-2 text-left font-medium text-muted-foreground"
									}, toDisplayString(header.column.columnDef.header), 1);
								}), 128))])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(tableInstance.value.getRowModel().rows, (row) => {
									return openBlock(), createBlock("tr", {
										key: row.id,
										class: "border-t hover:bg-muted/30"
									}, [(openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
										return openBlock(), createBlock("td", {
											key: cell.id,
											class: "px-4 py-2 text-xs",
											innerHTML: cell.column.columnDef.cell ? cell.column.columnDef.cell(cell.getContext()) : cell.getValue()
										}, null, 8, ["innerHTML"]);
									}), 128))]);
								}), 128))])])])]), createVNode("div", { class: "flex justify-between items-center py-2" }, [createVNode("div", { class: "text-xs text-muted-foreground" }, " Showing " + toDisplayString(tableInstance.value.getState().pagination.pageIndex * tableInstance.value.getState().pagination.pageSize + 1) + " to " + toDisplayString(Math.min((tableInstance.value.getState().pagination.pageIndex + 1) * tableInstance.value.getState().pagination.pageSize, sigma.value.search_results.value.matches.length)) + " of " + toDisplayString(sigma.value.search_results.value.matches.length) + " matches ", 1), createVNode("div", { class: "flex items-center gap-2" }, [createVNode(unref(Button_default), {
									disabled: !tableInstance.value.getCanPreviousPage(),
									size: "sm",
									variant: "outline",
									onClick: ($event) => tableInstance.value.previousPage()
								}, {
									default: withCtx(() => [createTextVNode(" Previous ")]),
									_: 1
								}, 8, ["disabled", "onClick"]), createVNode(unref(Button_default), {
									disabled: !tableInstance.value.getCanNextPage(),
									size: "sm",
									variant: "outline",
									onClick: ($event) => tableInstance.value.nextPage()
								}, {
									default: withCtx(() => [createTextVNode(" Next ")]),
									_: 1
								}, 8, ["disabled", "onClick"])])])])])) : sigma.value?.is_data_loaded && !sigma.value?.is_searching ? (openBlock(), createBlock("div", {
									key: 1,
									class: "flex flex-col items-center justify-center py-12"
								}, [
									createVNode(unref(SearchIcon), { class: "h-12 w-12 text-muted-foreground/50 mb-4" }),
									createVNode("h3", { class: "text-lg font-medium" }, "No Matches Found"),
									createVNode("p", { class: "text-sm text-muted-foreground mt-1" }, " The current Sigma rule doesn't match any logs in your dataset. ")
								])) : sigma.value?.is_searching ? (openBlock(), createBlock("div", {
									key: 2,
									class: "flex flex-col items-center justify-center py-12"
								}, [
									createVNode(unref(LoaderIcon), { class: "h-12 w-12 text-muted-foreground/50 mb-4 animate-spin" }),
									createVNode("h3", { class: "text-lg font-medium" }, "Searching..."),
									createVNode("p", { class: "text-sm text-muted-foreground mt-1" }, " Looking for matches in your dataset. ")
								])) : (openBlock(), createBlock("div", {
									key: 3,
									class: "flex flex-col items-center justify-center py-12"
								}, [
									createVNode(unref(AlertCircleIcon), { class: "h-12 w-12 text-muted-foreground/50 mb-4" }),
									createVNode("h3", { class: "text-lg font-medium" }, "No Data Available"),
									createVNode("p", { class: "text-sm text-muted-foreground mt-1" }, toDisplayString(sigma.value?.data_loading_error || "Please make sure you have a valid Sigma rule and data loaded."), 1)
								]))]),
								_: 1
							}),
							createVNode(unref(TabsContent_default), {
								class: "flex-1 min-h-0 data-[state=active]:flex data-[state=active]:flex-col",
								value: "raw"
							}, {
								default: withCtx(() => [createVNode(unref(ScrollArea_default), { class: "flex-1 min-h-0 w-full" }, {
									default: withCtx(() => [createVNode("div", { class: "text-xs text-slate-300 rounded-md text-wrap w-full" }, [createVNode("pre", { class: "p-2" }, [createVNode("code", null, toDisplayString(data.value?.current_data_frame), 1)])]), createVNode(unref(ScrollBar_default), { orientation: "horizontal" })]),
									_: 1
								})]),
								_: 1
							})
						];
					}),
					_: 1
				}, _parent));
				_push(`<!--]-->`);
			}
			_push(`</div>`);
		};
	}
});
var _sfc_setup$9 = DataView_vue_vue_type_script_setup_true_lang_default.setup;
DataView_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/DataView.vue");
	return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
var Popover_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Popover",
	__ssrInlineRender: true,
	props: {
		defaultOpen: { type: Boolean },
		open: { type: Boolean },
		modal: { type: Boolean }
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(PopoverRoot), mergeProps(unref(forwarded), _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$8 = Popover_vue_vue_type_script_setup_true_lang_default.setup;
Popover_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/popover/Popover.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var Popover_default = Popover_vue_vue_type_script_setup_true_lang_default;
var PopoverContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "PopoverContent",
	__ssrInlineRender: true,
	props: {
		forceMount: { type: Boolean },
		side: {},
		sideOffset: { default: 4 },
		sideFlip: { type: Boolean },
		align: { default: "center" },
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
		disableOutsidePointerEvents: { type: Boolean },
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
			_push(ssrRenderComponent(unref(PopoverPortal), _attrs, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(ssrRenderComponent(unref(PopoverContent), mergeProps({
						...unref(forwarded),
						..._ctx.$attrs
					}, { class: unref(cn)("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", props.class) }), {
						default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
							if (_push$2) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$2, _parent$2, _scopeId$1);
							else return [renderSlot(_ctx.$slots, "default")];
						}),
						_: 3
					}, _parent$1, _scopeId));
					else return [createVNode(unref(PopoverContent), mergeProps({
						...unref(forwarded),
						..._ctx.$attrs
					}, { class: unref(cn)("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", props.class) }), {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
						_: 3
					}, 16, ["class"])];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$7 = PopoverContent_vue_vue_type_script_setup_true_lang_default.setup;
PopoverContent_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/popover/PopoverContent.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var PopoverContent_default = PopoverContent_vue_vue_type_script_setup_true_lang_default;
var PopoverTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverTrigger",
	__ssrInlineRender: true,
	props: {
		asChild: { type: Boolean },
		as: {}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(PopoverTrigger), mergeProps(props, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$6 = PopoverTrigger_vue_vue_type_script_setup_true_lang_default.setup;
PopoverTrigger_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/popover/PopoverTrigger.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var PopoverTrigger_default = PopoverTrigger_vue_vue_type_script_setup_true_lang_default;
var SIEMSelector_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SIEMSelector",
	__ssrInlineRender: true,
	setup(__props) {
		const workspace = useWorkspaceStore();
		const sigma = computed(() => workspace.currentWorkspace?.sigmaStore());
		const open = ref(false);
		const updateSelectedSiem = (value) => {
			if (sigma.value) sigma.value.selected_siem = value;
			open.value = false;
		};
		const selectedSiem = computed(() => {
			return supportedSiems.find((siem) => siem.id === sigma.value?.selected_siem);
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Popover_default), mergeProps({
				open: open.value,
				"onUpdate:open": ($event) => open.value = $event
			}, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(unref(PopoverTrigger_default), { "as-child": "" }, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) _push$2(ssrRenderComponent(unref(Button_default), {
									variant: "outline",
									role: "combobox",
									"aria-expanded": open.value,
									class: "w-50! h-8 border-primary justify-between bg-background px-3 font-normal hover:bg-background"
								}, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) {
											if (selectedSiem.value) {
												_push$3(`<span class="flex min-w-0 items-center gap-2"${_scopeId$2}>`);
												if (selectedSiem.value.icon) ssrRenderVNode(_push$3, createVNode(resolveDynamicComponent(selectedSiem.value.icon), { class: ["h-4 w-4", selectedSiem.value.colorClass] }, null), _parent$3, _scopeId$2);
												else _push$3(`<!---->`);
												_push$3(`<span class="truncate flex items-center"${_scopeId$2}>${ssrInterpolate(selectedSiem.value.name)} `);
												if (selectedSiem.value.correlation) _push$3(ssrRenderComponent(unref(Badge_default), {
													variant: "outline",
													class: "ml-2 text-[5pt] bg-cyan-500/10 text-cyan-500 border-cyan-600/40 px-1 py-0"
												}, {
													default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
														if (_push$4) _push$4(`Correlation`);
														else return [createTextVNode("Correlation")];
													}),
													_: 1
												}, _parent$3, _scopeId$2));
												else _push$3(`<!---->`);
												_push$3(`</span></span>`);
											} else _push$3(`<span class="text-muted-foreground"${_scopeId$2}>Select a SIEM</span>`);
											_push$3(ssrRenderComponent(unref(ChevronDown), {
												size: 16,
												"stroke-width": 2,
												class: "shrink-0 text-muted-foreground/80",
												"aria-hidden": "true"
											}, null, _parent$3, _scopeId$2));
										} else return [selectedSiem.value ? (openBlock(), createBlock("span", {
											key: 0,
											class: "flex min-w-0 items-center gap-2"
										}, [selectedSiem.value.icon ? (openBlock(), createBlock(resolveDynamicComponent(selectedSiem.value.icon), {
											key: 0,
											class: ["h-4 w-4", selectedSiem.value.colorClass]
										}, null, 8, ["class"])) : createCommentVNode("", true), createVNode("span", { class: "truncate flex items-center" }, [createTextVNode(toDisplayString(selectedSiem.value.name) + " ", 1), selectedSiem.value.correlation ? (openBlock(), createBlock(unref(Badge_default), {
											key: 0,
											variant: "outline",
											class: "ml-2 text-[5pt] bg-cyan-500/10 text-cyan-500 border-cyan-600/40 px-1 py-0"
										}, {
											default: withCtx(() => [createTextVNode("Correlation")]),
											_: 1
										})) : createCommentVNode("", true)])])) : (openBlock(), createBlock("span", {
											key: 1,
											class: "text-muted-foreground"
										}, "Select a SIEM")), createVNode(unref(ChevronDown), {
											size: 16,
											"stroke-width": 2,
											class: "shrink-0 text-muted-foreground/80",
											"aria-hidden": "true"
										})];
									}),
									_: 1
								}, _parent$2, _scopeId$1));
								else return [createVNode(unref(Button_default), {
									variant: "outline",
									role: "combobox",
									"aria-expanded": open.value,
									class: "w-50! h-8 border-primary justify-between bg-background px-3 font-normal hover:bg-background"
								}, {
									default: withCtx(() => [selectedSiem.value ? (openBlock(), createBlock("span", {
										key: 0,
										class: "flex min-w-0 items-center gap-2"
									}, [selectedSiem.value.icon ? (openBlock(), createBlock(resolveDynamicComponent(selectedSiem.value.icon), {
										key: 0,
										class: ["h-4 w-4", selectedSiem.value.colorClass]
									}, null, 8, ["class"])) : createCommentVNode("", true), createVNode("span", { class: "truncate flex items-center" }, [createTextVNode(toDisplayString(selectedSiem.value.name) + " ", 1), selectedSiem.value.correlation ? (openBlock(), createBlock(unref(Badge_default), {
										key: 0,
										variant: "outline",
										class: "ml-2 text-[5pt] bg-cyan-500/10 text-cyan-500 border-cyan-600/40 px-1 py-0"
									}, {
										default: withCtx(() => [createTextVNode("Correlation")]),
										_: 1
									})) : createCommentVNode("", true)])])) : (openBlock(), createBlock("span", {
										key: 1,
										class: "text-muted-foreground"
									}, "Select a SIEM")), createVNode(unref(ChevronDown), {
										size: 16,
										"stroke-width": 2,
										class: "shrink-0 text-muted-foreground/80",
										"aria-hidden": "true"
									})]),
									_: 1
								}, 8, ["aria-expanded"])];
							}),
							_: 1
						}, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(PopoverContent_default), {
							class: "w-full p-1 rounded-xl",
							align: "start"
						}, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) _push$2(ssrRenderComponent(unref(Combobox_default), {
									"model-value": sigma.value?.selected_siem,
									"onUpdate:modelValue": updateSelectedSiem
								}, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) {
											_push$3(`<div class="m-0 pt-2 pb-0 px-3 text-sm font-medium"${_scopeId$2}> SIEMs <span class="opacity-30 px-1"${_scopeId$2}>/</span> Log Engines </div><div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 p-2 pb-0"${_scopeId$2}><!--[-->`);
											ssrRenderList([
												"Splunk",
												"Elasticsearch",
												"Grafana"
											], (vendor) => {
												_push$3(ssrRenderComponent(unref(Card_default), { class: "p-1 px-3 mb-1 flex flex-col w-[220px]" }, {
													default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
														if (_push$4) {
															_push$4(`<div class="flex gap-3 items-center p-1"${_scopeId$3}>`);
															ssrRenderVNode(_push$4, createVNode(resolveDynamicComponent(vendor === "Splunk" ? unref(splunk_default) : vendor === "Elasticsearch" ? unref(elasticsearch_default) : unref(grafana_default)), { class: "h-4 w-4 opacity-30" }, null), _parent$4, _scopeId$3);
															_push$4(`<span${_scopeId$3}>${ssrInterpolate(vendor)}</span></div>`);
															_push$4(ssrRenderComponent(unref(ComboboxGroup_default), null, {
																default: withCtx((_$4, _push$5, _parent$5, _scopeId$4) => {
																	if (_push$5) {
																		_push$5(`<!--[-->`);
																		ssrRenderList(unref(supportedSiems), (siem) => {
																			_push$5(`<!--[-->`);
																			if (siem.company === vendor) _push$5(ssrRenderComponent(unref(ComboboxItem_default), {
																				value: siem.id,
																				class: ["justify-start transition-colors duration-75 hover:bg-secondary", [siem.id === sigma.value?.selected_siem ? "bg-primary/10" : ""]]
																			}, {
																				default: withCtx((_$5, _push$6, _parent$6, _scopeId$5) => {
																					if (_push$6) {
																						_push$6(`<span class="flex items-center gap-2 flex-1"${_scopeId$5}>`);
																						ssrRenderVNode(_push$6, createVNode(resolveDynamicComponent(siem.icon), { class: [[siem.colorClass], "h-4 w-4"] }, null), _parent$6, _scopeId$5);
																						_push$6(`<span class="flex items-center"${_scopeId$5}>${ssrInterpolate(siem.name)} `);
																						if (siem.correlation) _push$6(ssrRenderComponent(unref(Badge_default), {
																							variant: "outline",
																							class: "ml-1 text-[5pt] bg-cyan-500/10 text-cyan-500 border-cyan-600/40 px-1 py-0"
																						}, {
																							default: withCtx((_$6, _push$7, _parent$7, _scopeId$6) => {
																								if (_push$7) _push$7(`Correlation`);
																								else return [createTextVNode("Correlation")];
																							}),
																							_: 2
																						}, _parent$6, _scopeId$5));
																						else _push$6(`<!---->`);
																						_push$6(`</span></span>`);
																						if (siem.id === sigma.value?.selected_siem) _push$6(ssrRenderComponent(unref(Check), {
																							size: 16,
																							class: "text-primary"
																						}, null, _parent$6, _scopeId$5));
																						else _push$6(`<!---->`);
																					} else return [createVNode("span", { class: "flex items-center gap-2 flex-1" }, [(openBlock(), createBlock(resolveDynamicComponent(siem.icon), { class: [[siem.colorClass], "h-4 w-4"] }, null, 8, ["class"])), createVNode("span", { class: "flex items-center" }, [createTextVNode(toDisplayString(siem.name) + " ", 1), siem.correlation ? (openBlock(), createBlock(unref(Badge_default), {
																						key: 0,
																						variant: "outline",
																						class: "ml-1 text-[5pt] bg-cyan-500/10 text-cyan-500 border-cyan-600/40 px-1 py-0"
																					}, {
																						default: withCtx(() => [createTextVNode("Correlation")]),
																						_: 1
																					})) : createCommentVNode("", true)])]), siem.id === sigma.value?.selected_siem ? (openBlock(), createBlock(unref(Check), {
																						key: 0,
																						size: 16,
																						class: "text-primary"
																					})) : createCommentVNode("", true)];
																				}),
																				_: 2
																			}, _parent$5, _scopeId$4));
																			else _push$5(`<!---->`);
																			_push$5(`<!--]-->`);
																		});
																		_push$5(`<!--]-->`);
																	} else return [(openBlock(true), createBlock(Fragment, null, renderList(unref(supportedSiems), (siem) => {
																		return openBlock(), createBlock(Fragment, { key: siem.id }, [siem.company === vendor ? (openBlock(), createBlock(unref(ComboboxItem_default), {
																			key: 0,
																			value: siem.id,
																			class: ["justify-start transition-colors duration-75 hover:bg-secondary", [siem.id === sigma.value?.selected_siem ? "bg-primary/10" : ""]]
																		}, {
																			default: withCtx(() => [createVNode("span", { class: "flex items-center gap-2 flex-1" }, [(openBlock(), createBlock(resolveDynamicComponent(siem.icon), { class: [[siem.colorClass], "h-4 w-4"] }, null, 8, ["class"])), createVNode("span", { class: "flex items-center" }, [createTextVNode(toDisplayString(siem.name) + " ", 1), siem.correlation ? (openBlock(), createBlock(unref(Badge_default), {
																				key: 0,
																				variant: "outline",
																				class: "ml-1 text-[5pt] bg-cyan-500/10 text-cyan-500 border-cyan-600/40 px-1 py-0"
																			}, {
																				default: withCtx(() => [createTextVNode("Correlation")]),
																				_: 1
																			})) : createCommentVNode("", true)])]), siem.id === sigma.value?.selected_siem ? (openBlock(), createBlock(unref(Check), {
																				key: 0,
																				size: 16,
																				class: "text-primary"
																			})) : createCommentVNode("", true)]),
																			_: 2
																		}, 1032, ["value", "class"])) : createCommentVNode("", true)], 64);
																	}), 128))];
																}),
																_: 2
															}, _parent$4, _scopeId$3));
														} else return [createVNode("div", { class: "flex gap-3 items-center p-1" }, [(openBlock(), createBlock(resolveDynamicComponent(vendor === "Splunk" ? unref(splunk_default) : vendor === "Elasticsearch" ? unref(elasticsearch_default) : unref(grafana_default)), { class: "h-4 w-4 opacity-30" })), createVNode("span", null, toDisplayString(vendor), 1)]), createVNode(unref(ComboboxGroup_default), null, {
															default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(unref(supportedSiems), (siem) => {
																return openBlock(), createBlock(Fragment, { key: siem.id }, [siem.company === vendor ? (openBlock(), createBlock(unref(ComboboxItem_default), {
																	key: 0,
																	value: siem.id,
																	class: ["justify-start transition-colors duration-75 hover:bg-secondary", [siem.id === sigma.value?.selected_siem ? "bg-primary/10" : ""]]
																}, {
																	default: withCtx(() => [createVNode("span", { class: "flex items-center gap-2 flex-1" }, [(openBlock(), createBlock(resolveDynamicComponent(siem.icon), { class: [[siem.colorClass], "h-4 w-4"] }, null, 8, ["class"])), createVNode("span", { class: "flex items-center" }, [createTextVNode(toDisplayString(siem.name) + " ", 1), siem.correlation ? (openBlock(), createBlock(unref(Badge_default), {
																		key: 0,
																		variant: "outline",
																		class: "ml-1 text-[5pt] bg-cyan-500/10 text-cyan-500 border-cyan-600/40 px-1 py-0"
																	}, {
																		default: withCtx(() => [createTextVNode("Correlation")]),
																		_: 1
																	})) : createCommentVNode("", true)])]), siem.id === sigma.value?.selected_siem ? (openBlock(), createBlock(unref(Check), {
																		key: 0,
																		size: 16,
																		class: "text-primary"
																	})) : createCommentVNode("", true)]),
																	_: 2
																}, 1032, ["value", "class"])) : createCommentVNode("", true)], 64);
															}), 128))]),
															_: 2
														}, 1024)];
													}),
													_: 2
												}, _parent$3, _scopeId$2));
											});
											_push$3(`<!--]--></div>`);
											_push$3(ssrRenderComponent(unref(ComboboxGroup_default), { class: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1 p-2 pt-0" }, {
												default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
													if (_push$4) {
														_push$4(`<!--[-->`);
														ssrRenderList(unref(supportedSiems), (siem) => {
															_push$4(`<!--[-->`);
															if (!siem.company) _push$4(ssrRenderComponent(unref(ComboboxItem_default), {
																value: siem.id,
																class: ["justify-start transition-colors duration-75 hover:bg-secondary", [siem.id === sigma.value?.selected_siem ? "bg-primary/10" : ""]]
															}, {
																default: withCtx((_$4, _push$5, _parent$5, _scopeId$4) => {
																	if (_push$5) {
																		if (siem.icon) ssrRenderVNode(_push$5, createVNode(resolveDynamicComponent(siem.icon), { class: [[siem.colorClass], "h-4 w-4"] }, null), _parent$5, _scopeId$4);
																		else _push$5(`<!---->`);
																		_push$5(`<span class="flex-1"${_scopeId$4}>${ssrInterpolate(siem.name)}</span>`);
																		if (siem.id === sigma.value?.selected_siem) _push$5(ssrRenderComponent(unref(Check), {
																			size: 16,
																			class: "text-primary"
																		}, null, _parent$5, _scopeId$4));
																		else _push$5(`<!---->`);
																	} else return [
																		siem.icon ? (openBlock(), createBlock(resolveDynamicComponent(siem.icon), {
																			key: 0,
																			class: [[siem.colorClass], "h-4 w-4"]
																		}, null, 8, ["class"])) : createCommentVNode("", true),
																		createVNode("span", { class: "flex-1" }, toDisplayString(siem.name), 1),
																		siem.id === sigma.value?.selected_siem ? (openBlock(), createBlock(unref(Check), {
																			key: 1,
																			size: 16,
																			class: "text-primary"
																		})) : createCommentVNode("", true)
																	];
																}),
																_: 2
															}, _parent$4, _scopeId$3));
															else _push$4(`<!---->`);
															_push$4(`<!--]-->`);
														});
														_push$4(`<!--]-->`);
													} else return [(openBlock(true), createBlock(Fragment, null, renderList(unref(supportedSiems), (siem) => {
														return openBlock(), createBlock(Fragment, { key: siem.id }, [!siem.company ? (openBlock(), createBlock(unref(ComboboxItem_default), {
															key: 0,
															value: siem.id,
															class: ["justify-start transition-colors duration-75 hover:bg-secondary", [siem.id === sigma.value?.selected_siem ? "bg-primary/10" : ""]]
														}, {
															default: withCtx(() => [
																siem.icon ? (openBlock(), createBlock(resolveDynamicComponent(siem.icon), {
																	key: 0,
																	class: [[siem.colorClass], "h-4 w-4"]
																}, null, 8, ["class"])) : createCommentVNode("", true),
																createVNode("span", { class: "flex-1" }, toDisplayString(siem.name), 1),
																siem.id === sigma.value?.selected_siem ? (openBlock(), createBlock(unref(Check), {
																	key: 1,
																	size: 16,
																	class: "text-primary"
																})) : createCommentVNode("", true)
															]),
															_: 2
														}, 1032, ["value", "class"])) : createCommentVNode("", true)], 64);
													}), 128))];
												}),
												_: 1
											}, _parent$3, _scopeId$2));
										} else return [
											createVNode("div", { class: "m-0 pt-2 pb-0 px-3 text-sm font-medium" }, [
												createTextVNode(" SIEMs "),
												createVNode("span", { class: "opacity-30 px-1" }, "/"),
												createTextVNode(" Log Engines ")
											]),
											createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 p-2 pb-0" }, [(openBlock(), createBlock(Fragment, null, renderList([
												"Splunk",
												"Elasticsearch",
												"Grafana"
											], (vendor) => {
												return createVNode(unref(Card_default), {
													key: vendor,
													class: "p-1 px-3 mb-1 flex flex-col w-[220px]"
												}, {
													default: withCtx(() => [createVNode("div", { class: "flex gap-3 items-center p-1" }, [(openBlock(), createBlock(resolveDynamicComponent(vendor === "Splunk" ? unref(splunk_default) : vendor === "Elasticsearch" ? unref(elasticsearch_default) : unref(grafana_default)), { class: "h-4 w-4 opacity-30" })), createVNode("span", null, toDisplayString(vendor), 1)]), createVNode(unref(ComboboxGroup_default), null, {
														default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(unref(supportedSiems), (siem) => {
															return openBlock(), createBlock(Fragment, { key: siem.id }, [siem.company === vendor ? (openBlock(), createBlock(unref(ComboboxItem_default), {
																key: 0,
																value: siem.id,
																class: ["justify-start transition-colors duration-75 hover:bg-secondary", [siem.id === sigma.value?.selected_siem ? "bg-primary/10" : ""]]
															}, {
																default: withCtx(() => [createVNode("span", { class: "flex items-center gap-2 flex-1" }, [(openBlock(), createBlock(resolveDynamicComponent(siem.icon), { class: [[siem.colorClass], "h-4 w-4"] }, null, 8, ["class"])), createVNode("span", { class: "flex items-center" }, [createTextVNode(toDisplayString(siem.name) + " ", 1), siem.correlation ? (openBlock(), createBlock(unref(Badge_default), {
																	key: 0,
																	variant: "outline",
																	class: "ml-1 text-[5pt] bg-cyan-500/10 text-cyan-500 border-cyan-600/40 px-1 py-0"
																}, {
																	default: withCtx(() => [createTextVNode("Correlation")]),
																	_: 1
																})) : createCommentVNode("", true)])]), siem.id === sigma.value?.selected_siem ? (openBlock(), createBlock(unref(Check), {
																	key: 0,
																	size: 16,
																	class: "text-primary"
																})) : createCommentVNode("", true)]),
																_: 2
															}, 1032, ["value", "class"])) : createCommentVNode("", true)], 64);
														}), 128))]),
														_: 2
													}, 1024)]),
													_: 2
												}, 1024);
											}), 64))]),
											createVNode(unref(ComboboxGroup_default), { class: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1 p-2 pt-0" }, {
												default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(unref(supportedSiems), (siem) => {
													return openBlock(), createBlock(Fragment, { key: siem.id }, [!siem.company ? (openBlock(), createBlock(unref(ComboboxItem_default), {
														key: 0,
														value: siem.id,
														class: ["justify-start transition-colors duration-75 hover:bg-secondary", [siem.id === sigma.value?.selected_siem ? "bg-primary/10" : ""]]
													}, {
														default: withCtx(() => [
															siem.icon ? (openBlock(), createBlock(resolveDynamicComponent(siem.icon), {
																key: 0,
																class: [[siem.colorClass], "h-4 w-4"]
															}, null, 8, ["class"])) : createCommentVNode("", true),
															createVNode("span", { class: "flex-1" }, toDisplayString(siem.name), 1),
															siem.id === sigma.value?.selected_siem ? (openBlock(), createBlock(unref(Check), {
																key: 1,
																size: 16,
																class: "text-primary"
															})) : createCommentVNode("", true)
														]),
														_: 2
													}, 1032, ["value", "class"])) : createCommentVNode("", true)], 64);
												}), 128))]),
												_: 1
											})
										];
									}),
									_: 1
								}, _parent$2, _scopeId$1));
								else return [createVNode(unref(Combobox_default), {
									"model-value": sigma.value?.selected_siem,
									"onUpdate:modelValue": updateSelectedSiem
								}, {
									default: withCtx(() => [
										createVNode("div", { class: "m-0 pt-2 pb-0 px-3 text-sm font-medium" }, [
											createTextVNode(" SIEMs "),
											createVNode("span", { class: "opacity-30 px-1" }, "/"),
											createTextVNode(" Log Engines ")
										]),
										createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 p-2 pb-0" }, [(openBlock(), createBlock(Fragment, null, renderList([
											"Splunk",
											"Elasticsearch",
											"Grafana"
										], (vendor) => {
											return createVNode(unref(Card_default), {
												key: vendor,
												class: "p-1 px-3 mb-1 flex flex-col w-[220px]"
											}, {
												default: withCtx(() => [createVNode("div", { class: "flex gap-3 items-center p-1" }, [(openBlock(), createBlock(resolveDynamicComponent(vendor === "Splunk" ? unref(splunk_default) : vendor === "Elasticsearch" ? unref(elasticsearch_default) : unref(grafana_default)), { class: "h-4 w-4 opacity-30" })), createVNode("span", null, toDisplayString(vendor), 1)]), createVNode(unref(ComboboxGroup_default), null, {
													default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(unref(supportedSiems), (siem) => {
														return openBlock(), createBlock(Fragment, { key: siem.id }, [siem.company === vendor ? (openBlock(), createBlock(unref(ComboboxItem_default), {
															key: 0,
															value: siem.id,
															class: ["justify-start transition-colors duration-75 hover:bg-secondary", [siem.id === sigma.value?.selected_siem ? "bg-primary/10" : ""]]
														}, {
															default: withCtx(() => [createVNode("span", { class: "flex items-center gap-2 flex-1" }, [(openBlock(), createBlock(resolveDynamicComponent(siem.icon), { class: [[siem.colorClass], "h-4 w-4"] }, null, 8, ["class"])), createVNode("span", { class: "flex items-center" }, [createTextVNode(toDisplayString(siem.name) + " ", 1), siem.correlation ? (openBlock(), createBlock(unref(Badge_default), {
																key: 0,
																variant: "outline",
																class: "ml-1 text-[5pt] bg-cyan-500/10 text-cyan-500 border-cyan-600/40 px-1 py-0"
															}, {
																default: withCtx(() => [createTextVNode("Correlation")]),
																_: 1
															})) : createCommentVNode("", true)])]), siem.id === sigma.value?.selected_siem ? (openBlock(), createBlock(unref(Check), {
																key: 0,
																size: 16,
																class: "text-primary"
															})) : createCommentVNode("", true)]),
															_: 2
														}, 1032, ["value", "class"])) : createCommentVNode("", true)], 64);
													}), 128))]),
													_: 2
												}, 1024)]),
												_: 2
											}, 1024);
										}), 64))]),
										createVNode(unref(ComboboxGroup_default), { class: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1 p-2 pt-0" }, {
											default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(unref(supportedSiems), (siem) => {
												return openBlock(), createBlock(Fragment, { key: siem.id }, [!siem.company ? (openBlock(), createBlock(unref(ComboboxItem_default), {
													key: 0,
													value: siem.id,
													class: ["justify-start transition-colors duration-75 hover:bg-secondary", [siem.id === sigma.value?.selected_siem ? "bg-primary/10" : ""]]
												}, {
													default: withCtx(() => [
														siem.icon ? (openBlock(), createBlock(resolveDynamicComponent(siem.icon), {
															key: 0,
															class: [[siem.colorClass], "h-4 w-4"]
														}, null, 8, ["class"])) : createCommentVNode("", true),
														createVNode("span", { class: "flex-1" }, toDisplayString(siem.name), 1),
														siem.id === sigma.value?.selected_siem ? (openBlock(), createBlock(unref(Check), {
															key: 1,
															size: 16,
															class: "text-primary"
														})) : createCommentVNode("", true)
													]),
													_: 2
												}, 1032, ["value", "class"])) : createCommentVNode("", true)], 64);
											}), 128))]),
											_: 1
										})
									]),
									_: 1
								}, 8, ["model-value"])];
							}),
							_: 1
						}, _parent$1, _scopeId));
					} else return [createVNode(unref(PopoverTrigger_default), { "as-child": "" }, {
						default: withCtx(() => [createVNode(unref(Button_default), {
							variant: "outline",
							role: "combobox",
							"aria-expanded": open.value,
							class: "w-50! h-8 border-primary justify-between bg-background px-3 font-normal hover:bg-background"
						}, {
							default: withCtx(() => [selectedSiem.value ? (openBlock(), createBlock("span", {
								key: 0,
								class: "flex min-w-0 items-center gap-2"
							}, [selectedSiem.value.icon ? (openBlock(), createBlock(resolveDynamicComponent(selectedSiem.value.icon), {
								key: 0,
								class: ["h-4 w-4", selectedSiem.value.colorClass]
							}, null, 8, ["class"])) : createCommentVNode("", true), createVNode("span", { class: "truncate flex items-center" }, [createTextVNode(toDisplayString(selectedSiem.value.name) + " ", 1), selectedSiem.value.correlation ? (openBlock(), createBlock(unref(Badge_default), {
								key: 0,
								variant: "outline",
								class: "ml-2 text-[5pt] bg-cyan-500/10 text-cyan-500 border-cyan-600/40 px-1 py-0"
							}, {
								default: withCtx(() => [createTextVNode("Correlation")]),
								_: 1
							})) : createCommentVNode("", true)])])) : (openBlock(), createBlock("span", {
								key: 1,
								class: "text-muted-foreground"
							}, "Select a SIEM")), createVNode(unref(ChevronDown), {
								size: 16,
								"stroke-width": 2,
								class: "shrink-0 text-muted-foreground/80",
								"aria-hidden": "true"
							})]),
							_: 1
						}, 8, ["aria-expanded"])]),
						_: 1
					}), createVNode(unref(PopoverContent_default), {
						class: "w-full p-1 rounded-xl",
						align: "start"
					}, {
						default: withCtx(() => [createVNode(unref(Combobox_default), {
							"model-value": sigma.value?.selected_siem,
							"onUpdate:modelValue": updateSelectedSiem
						}, {
							default: withCtx(() => [
								createVNode("div", { class: "m-0 pt-2 pb-0 px-3 text-sm font-medium" }, [
									createTextVNode(" SIEMs "),
									createVNode("span", { class: "opacity-30 px-1" }, "/"),
									createTextVNode(" Log Engines ")
								]),
								createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 p-2 pb-0" }, [(openBlock(), createBlock(Fragment, null, renderList([
									"Splunk",
									"Elasticsearch",
									"Grafana"
								], (vendor) => {
									return createVNode(unref(Card_default), {
										key: vendor,
										class: "p-1 px-3 mb-1 flex flex-col w-[220px]"
									}, {
										default: withCtx(() => [createVNode("div", { class: "flex gap-3 items-center p-1" }, [(openBlock(), createBlock(resolveDynamicComponent(vendor === "Splunk" ? unref(splunk_default) : vendor === "Elasticsearch" ? unref(elasticsearch_default) : unref(grafana_default)), { class: "h-4 w-4 opacity-30" })), createVNode("span", null, toDisplayString(vendor), 1)]), createVNode(unref(ComboboxGroup_default), null, {
											default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(unref(supportedSiems), (siem) => {
												return openBlock(), createBlock(Fragment, { key: siem.id }, [siem.company === vendor ? (openBlock(), createBlock(unref(ComboboxItem_default), {
													key: 0,
													value: siem.id,
													class: ["justify-start transition-colors duration-75 hover:bg-secondary", [siem.id === sigma.value?.selected_siem ? "bg-primary/10" : ""]]
												}, {
													default: withCtx(() => [createVNode("span", { class: "flex items-center gap-2 flex-1" }, [(openBlock(), createBlock(resolveDynamicComponent(siem.icon), { class: [[siem.colorClass], "h-4 w-4"] }, null, 8, ["class"])), createVNode("span", { class: "flex items-center" }, [createTextVNode(toDisplayString(siem.name) + " ", 1), siem.correlation ? (openBlock(), createBlock(unref(Badge_default), {
														key: 0,
														variant: "outline",
														class: "ml-1 text-[5pt] bg-cyan-500/10 text-cyan-500 border-cyan-600/40 px-1 py-0"
													}, {
														default: withCtx(() => [createTextVNode("Correlation")]),
														_: 1
													})) : createCommentVNode("", true)])]), siem.id === sigma.value?.selected_siem ? (openBlock(), createBlock(unref(Check), {
														key: 0,
														size: 16,
														class: "text-primary"
													})) : createCommentVNode("", true)]),
													_: 2
												}, 1032, ["value", "class"])) : createCommentVNode("", true)], 64);
											}), 128))]),
											_: 2
										}, 1024)]),
										_: 2
									}, 1024);
								}), 64))]),
								createVNode(unref(ComboboxGroup_default), { class: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1 p-2 pt-0" }, {
									default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(unref(supportedSiems), (siem) => {
										return openBlock(), createBlock(Fragment, { key: siem.id }, [!siem.company ? (openBlock(), createBlock(unref(ComboboxItem_default), {
											key: 0,
											value: siem.id,
											class: ["justify-start transition-colors duration-75 hover:bg-secondary", [siem.id === sigma.value?.selected_siem ? "bg-primary/10" : ""]]
										}, {
											default: withCtx(() => [
												siem.icon ? (openBlock(), createBlock(resolveDynamicComponent(siem.icon), {
													key: 0,
													class: [[siem.colorClass], "h-4 w-4"]
												}, null, 8, ["class"])) : createCommentVNode("", true),
												createVNode("span", { class: "flex-1" }, toDisplayString(siem.name), 1),
												siem.id === sigma.value?.selected_siem ? (openBlock(), createBlock(unref(Check), {
													key: 1,
													size: 16,
													class: "text-primary"
												})) : createCommentVNode("", true)
											]),
											_: 2
										}, 1032, ["value", "class"])) : createCommentVNode("", true)], 64);
									}), 128))]),
									_: 1
								})
							]),
							_: 1
						}, 8, ["model-value"])]),
						_: 1
					})];
				}),
				_: 1
			}, _parent));
		};
	}
});
var _sfc_setup$5 = SIEMSelector_vue_vue_type_script_setup_true_lang_default.setup;
SIEMSelector_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/SIEMSelector.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var SIEMSelector_default = SIEMSelector_vue_vue_type_script_setup_true_lang_default;
var Checkbox_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Checkbox",
	__ssrInlineRender: true,
	props: {
		defaultValue: { type: [Boolean, String] },
		modelValue: { type: [
			Boolean,
			String,
			null
		] },
		disabled: { type: Boolean },
		value: {},
		id: {},
		asChild: { type: Boolean },
		as: {},
		name: {},
		required: { type: Boolean },
		class: {}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(CheckboxRoot), mergeProps(unref(forwarded), { class: unref(cn)("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(ssrRenderComponent(unref(CheckboxIndicator), { class: "grid place-content-center text-current" }, {
						default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
							if (_push$2) ssrRenderSlot(_ctx.$slots, "default", {}, () => {
								_push$2(ssrRenderComponent(unref(Check), { class: "h-4 w-4" }, null, _parent$2, _scopeId$1));
							}, _push$2, _parent$2, _scopeId$1);
							else return [renderSlot(_ctx.$slots, "default", {}, () => [createVNode(unref(Check), { class: "h-4 w-4" })])];
						}),
						_: 3
					}, _parent$1, _scopeId));
					else return [createVNode(unref(CheckboxIndicator), { class: "grid place-content-center text-current" }, {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [createVNode(unref(Check), { class: "h-4 w-4" })])]),
						_: 3
					})];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$4 = Checkbox_vue_vue_type_script_setup_true_lang_default.setup;
Checkbox_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/checkbox/Checkbox.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var Checkbox_default = Checkbox_vue_vue_type_script_setup_true_lang_default;
var PipelineSelector_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "PipelineSelector",
	__ssrInlineRender: true,
	setup(__props) {
		const workspace = useWorkspaceStore();
		const sigma = computed(() => workspace.currentWorkspace?.sigmaStore());
		const compatiblePipelines = ref([]);
		const isDropdownOpen = ref(false);
		const isLoading = ref(false);
		async function loadPipelines() {
			isLoading.value = true;
			try {
				const result = await getAvailablePipelines(sigma.value?.selected_siem || "");
				if (result.success && result.pipelines) compatiblePipelines.value = result.pipelines;
			} finally {
				isLoading.value = false;
			}
		}
		onMounted(() => {
			loadPipelines();
		});
		const selectedPipelines = computed(() => sigma.value?.selected_pipelines || []);
		const incompatiblePipelines = computed(() => {
			const selected = sigma.value?.selected_pipelines || [];
			const compatible = compatiblePipelines.value;
			return selected.filter((p) => !compatible.includes(p)).sort();
		});
		const availableCompatiblePipelines = computed(() => {
			return compatiblePipelines.value.sort();
		});
		function togglePipeline(pipeline, checked) {
			if (!sigma.value) return;
			const currentPipelines = sigma.value.selected_pipelines || [];
			if (checked) {
				if (!currentPipelines.includes(pipeline)) sigma.value.updateSelectedPipelines([...currentPipelines, pipeline]);
			} else sigma.value.updateSelectedPipelines(currentPipelines.filter((p) => p !== pipeline));
		}
		function clearAllPipelines() {
			if (!sigma.value) return;
			sigma.value.updateSelectedPipelines([]);
		}
		const buttonLabel = computed(() => {
			const count = selectedPipelines.value.length;
			if (count === 0) return "Select a pipeline";
			if (count === 1) return "1 Pipeline Active";
			return `${count} Pipelines Active`;
		});
		watch(() => sigma.value?.selected_siem, () => {
			loadPipelines();
		});
		function toTitleCase(str) {
			return str.toLowerCase().split(/[_\s]+/).map((word) => {
				if (word === "ecs") return "ECS";
				return word.charAt(0).toUpperCase() + word.slice(1);
			}).join(" ");
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Popover_default), mergeProps({
				open: isDropdownOpen.value,
				"onUpdate:open": ($event) => isDropdownOpen.value = $event
			}, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(unref(PopoverTrigger_default), { "as-child": "" }, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) _push$2(ssrRenderComponent(unref(Button_default), {
									variant: "outline",
									role: "combobox",
									"aria-expanded": isDropdownOpen.value,
									class: ["w-70! h-8 justify-between", selectedPipelines.value.length > 0 ? "border-primary bg-primary/10 hover:bg-primary/20" : "bg-background text-muted-foreground hover:bg-background"],
									onClick: loadPipelines
								}, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) {
											_push$3(`${ssrInterpolate(buttonLabel.value)} `);
											_push$3(ssrRenderComponent(unref(ChevronDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" }, null, _parent$3, _scopeId$2));
										} else return [createTextVNode(toDisplayString(buttonLabel.value) + " ", 1), createVNode(unref(ChevronDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" })];
									}),
									_: 1
								}, _parent$2, _scopeId$1));
								else return [createVNode(unref(Button_default), {
									variant: "outline",
									role: "combobox",
									"aria-expanded": isDropdownOpen.value,
									class: ["w-70! h-8 justify-between", selectedPipelines.value.length > 0 ? "border-primary bg-primary/10 hover:bg-primary/20" : "bg-background text-muted-foreground hover:bg-background"],
									onClick: loadPipelines
								}, {
									default: withCtx(() => [createTextVNode(toDisplayString(buttonLabel.value) + " ", 1), createVNode(unref(ChevronDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" })]),
									_: 1
								}, 8, ["aria-expanded", "class"])];
							}),
							_: 1
						}, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(PopoverContent_default), {
							class: "w-70 p-0",
							align: "start"
						}, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) {
									_push$2(`<div class="flex items-center justify-between border-b px-3 py-2"${_scopeId$1}><div class="flex flex-col"${_scopeId$1}><span class="text-sm font-medium"${_scopeId$1}>Pipelines</span><span class="text-xs text-muted-foreground"${_scopeId$1}> Compatible with ${ssrInterpolate(sigma.value?.selected_siem || "current backend")}</span></div>`);
									if (selectedPipelines.value.length > 0) _push$2(ssrRenderComponent(unref(Button_default), {
										variant: "ghost",
										size: "sm",
										class: "h-auto px-2 py-1 text-xs",
										onClick: clearAllPipelines
									}, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) _push$3(` Clear All `);
											else return [createTextVNode(" Clear All ")];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									else _push$2(`<!---->`);
									_push$2(`</div>`);
									_push$2(ssrRenderComponent(unref(ScrollArea_default), { class: "h-70" }, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) {
												if (isLoading.value) {
													_push$3(`<div class="p-2 space-y-2"${_scopeId$2}><!--[-->`);
													ssrRenderList(3, (i) => {
														_push$3(`<div class="flex items-center space-x-2 px-2 py-1.5"${_scopeId$2}>`);
														_push$3(ssrRenderComponent(unref(Skeleton_default), { class: "h-4 w-4 rounded" }, null, _parent$3, _scopeId$2));
														_push$3(ssrRenderComponent(unref(Skeleton_default), { class: "h-4 flex-1" }, null, _parent$3, _scopeId$2));
														_push$3(`</div>`);
													});
													_push$3(`<!--]--></div>`);
												} else if (availableCompatiblePipelines.value.length > 0) {
													_push$3(`<div class="p-2"${_scopeId$2}><!--[-->`);
													ssrRenderList(availableCompatiblePipelines.value, (pipeline) => {
														_push$3(`<div class="flex items-center space-x-2 rounded-sm px-2 py-1.5 hover:bg-accent cursor-pointer"${_scopeId$2}>`);
														_push$3(ssrRenderComponent(unref(Checkbox_default), {
															"model-value": selectedPipelines.value.includes(pipeline),
															class: "pointer-events-none"
														}, null, _parent$3, _scopeId$2));
														_push$3(`<span class="flex-1 text-sm"${_scopeId$2}>${ssrInterpolate(toTitleCase(pipeline))}</span></div>`);
													});
													_push$3(`<!--]--></div>`);
												} else _push$3(`<div class="px-2 py-6 text-center text-sm text-muted-foreground"${_scopeId$2}> No compatible pipelines available </div>`);
												if (incompatiblePipelines.value.length > 0) {
													_push$3(`<div${_scopeId$2}>`);
													_push$3(ssrRenderComponent(unref(Separator_default), null, null, _parent$3, _scopeId$2));
													_push$3(`<div class="px-3 py-2 text-xs font-medium text-muted-foreground"${_scopeId$2}> Incompatible (Selected but not compatible) </div><div class="p-2"${_scopeId$2}><!--[-->`);
													ssrRenderList(incompatiblePipelines.value, (pipeline) => {
														_push$3(`<div class="flex items-center space-x-2 rounded-sm px-2 py-1.5 hover:bg-accent cursor-pointer opacity-60"${_scopeId$2}>`);
														_push$3(ssrRenderComponent(unref(Checkbox_default), {
															"model-value": true,
															class: "pointer-events-none"
														}, null, _parent$3, _scopeId$2));
														_push$3(`<span class="flex-1 text-sm"${_scopeId$2}>${ssrInterpolate(toTitleCase(pipeline))}</span><span class="text-xs text-destructive"${_scopeId$2}>⚠</span></div>`);
													});
													_push$3(`<!--]--></div></div>`);
												} else _push$3(`<!---->`);
											} else return [isLoading.value ? (openBlock(), createBlock("div", {
												key: 0,
												class: "p-2 space-y-2"
											}, [(openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
												return createVNode("div", {
													key: i,
													class: "flex items-center space-x-2 px-2 py-1.5"
												}, [createVNode(unref(Skeleton_default), { class: "h-4 w-4 rounded" }), createVNode(unref(Skeleton_default), { class: "h-4 flex-1" })]);
											}), 64))])) : availableCompatiblePipelines.value.length > 0 ? (openBlock(), createBlock("div", {
												key: 1,
												class: "p-2"
											}, [(openBlock(true), createBlock(Fragment, null, renderList(availableCompatiblePipelines.value, (pipeline) => {
												return openBlock(), createBlock("div", {
													key: pipeline,
													class: "flex items-center space-x-2 rounded-sm px-2 py-1.5 hover:bg-accent cursor-pointer",
													onClick: ($event) => togglePipeline(pipeline, !selectedPipelines.value.includes(pipeline))
												}, [createVNode(unref(Checkbox_default), {
													"model-value": selectedPipelines.value.includes(pipeline),
													class: "pointer-events-none"
												}, null, 8, ["model-value"]), createVNode("span", { class: "flex-1 text-sm" }, toDisplayString(toTitleCase(pipeline)), 1)], 8, ["onClick"]);
											}), 128))])) : (openBlock(), createBlock("div", {
												key: 2,
												class: "px-2 py-6 text-center text-sm text-muted-foreground"
											}, " No compatible pipelines available ")), incompatiblePipelines.value.length > 0 ? (openBlock(), createBlock("div", { key: 3 }, [
												createVNode(unref(Separator_default)),
												createVNode("div", { class: "px-3 py-2 text-xs font-medium text-muted-foreground" }, " Incompatible (Selected but not compatible) "),
												createVNode("div", { class: "p-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(incompatiblePipelines.value, (pipeline) => {
													return openBlock(), createBlock("div", {
														key: pipeline,
														class: "flex items-center space-x-2 rounded-sm px-2 py-1.5 hover:bg-accent cursor-pointer opacity-60",
														onClick: ($event) => togglePipeline(pipeline, false)
													}, [
														createVNode(unref(Checkbox_default), {
															"model-value": true,
															class: "pointer-events-none"
														}),
														createVNode("span", { class: "flex-1 text-sm" }, toDisplayString(toTitleCase(pipeline)), 1),
														createVNode("span", { class: "text-xs text-destructive" }, "⚠")
													], 8, ["onClick"]);
												}), 128))])
											])) : createCommentVNode("", true)];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
								} else return [createVNode("div", { class: "flex items-center justify-between border-b px-3 py-2" }, [createVNode("div", { class: "flex flex-col" }, [createVNode("span", { class: "text-sm font-medium" }, "Pipelines"), createVNode("span", { class: "text-xs text-muted-foreground" }, " Compatible with " + toDisplayString(sigma.value?.selected_siem || "current backend"), 1)]), selectedPipelines.value.length > 0 ? (openBlock(), createBlock(unref(Button_default), {
									key: 0,
									variant: "ghost",
									size: "sm",
									class: "h-auto px-2 py-1 text-xs",
									onClick: clearAllPipelines
								}, {
									default: withCtx(() => [createTextVNode(" Clear All ")]),
									_: 1
								})) : createCommentVNode("", true)]), createVNode(unref(ScrollArea_default), { class: "h-70" }, {
									default: withCtx(() => [isLoading.value ? (openBlock(), createBlock("div", {
										key: 0,
										class: "p-2 space-y-2"
									}, [(openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
										return createVNode("div", {
											key: i,
											class: "flex items-center space-x-2 px-2 py-1.5"
										}, [createVNode(unref(Skeleton_default), { class: "h-4 w-4 rounded" }), createVNode(unref(Skeleton_default), { class: "h-4 flex-1" })]);
									}), 64))])) : availableCompatiblePipelines.value.length > 0 ? (openBlock(), createBlock("div", {
										key: 1,
										class: "p-2"
									}, [(openBlock(true), createBlock(Fragment, null, renderList(availableCompatiblePipelines.value, (pipeline) => {
										return openBlock(), createBlock("div", {
											key: pipeline,
											class: "flex items-center space-x-2 rounded-sm px-2 py-1.5 hover:bg-accent cursor-pointer",
											onClick: ($event) => togglePipeline(pipeline, !selectedPipelines.value.includes(pipeline))
										}, [createVNode(unref(Checkbox_default), {
											"model-value": selectedPipelines.value.includes(pipeline),
											class: "pointer-events-none"
										}, null, 8, ["model-value"]), createVNode("span", { class: "flex-1 text-sm" }, toDisplayString(toTitleCase(pipeline)), 1)], 8, ["onClick"]);
									}), 128))])) : (openBlock(), createBlock("div", {
										key: 2,
										class: "px-2 py-6 text-center text-sm text-muted-foreground"
									}, " No compatible pipelines available ")), incompatiblePipelines.value.length > 0 ? (openBlock(), createBlock("div", { key: 3 }, [
										createVNode(unref(Separator_default)),
										createVNode("div", { class: "px-3 py-2 text-xs font-medium text-muted-foreground" }, " Incompatible (Selected but not compatible) "),
										createVNode("div", { class: "p-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(incompatiblePipelines.value, (pipeline) => {
											return openBlock(), createBlock("div", {
												key: pipeline,
												class: "flex items-center space-x-2 rounded-sm px-2 py-1.5 hover:bg-accent cursor-pointer opacity-60",
												onClick: ($event) => togglePipeline(pipeline, false)
											}, [
												createVNode(unref(Checkbox_default), {
													"model-value": true,
													class: "pointer-events-none"
												}),
												createVNode("span", { class: "flex-1 text-sm" }, toDisplayString(toTitleCase(pipeline)), 1),
												createVNode("span", { class: "text-xs text-destructive" }, "⚠")
											], 8, ["onClick"]);
										}), 128))])
									])) : createCommentVNode("", true)]),
									_: 1
								})];
							}),
							_: 1
						}, _parent$1, _scopeId));
					} else return [createVNode(unref(PopoverTrigger_default), { "as-child": "" }, {
						default: withCtx(() => [createVNode(unref(Button_default), {
							variant: "outline",
							role: "combobox",
							"aria-expanded": isDropdownOpen.value,
							class: ["w-70! h-8 justify-between", selectedPipelines.value.length > 0 ? "border-primary bg-primary/10 hover:bg-primary/20" : "bg-background text-muted-foreground hover:bg-background"],
							onClick: loadPipelines
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(buttonLabel.value) + " ", 1), createVNode(unref(ChevronDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" })]),
							_: 1
						}, 8, ["aria-expanded", "class"])]),
						_: 1
					}), createVNode(unref(PopoverContent_default), {
						class: "w-70 p-0",
						align: "start"
					}, {
						default: withCtx(() => [createVNode("div", { class: "flex items-center justify-between border-b px-3 py-2" }, [createVNode("div", { class: "flex flex-col" }, [createVNode("span", { class: "text-sm font-medium" }, "Pipelines"), createVNode("span", { class: "text-xs text-muted-foreground" }, " Compatible with " + toDisplayString(sigma.value?.selected_siem || "current backend"), 1)]), selectedPipelines.value.length > 0 ? (openBlock(), createBlock(unref(Button_default), {
							key: 0,
							variant: "ghost",
							size: "sm",
							class: "h-auto px-2 py-1 text-xs",
							onClick: clearAllPipelines
						}, {
							default: withCtx(() => [createTextVNode(" Clear All ")]),
							_: 1
						})) : createCommentVNode("", true)]), createVNode(unref(ScrollArea_default), { class: "h-70" }, {
							default: withCtx(() => [isLoading.value ? (openBlock(), createBlock("div", {
								key: 0,
								class: "p-2 space-y-2"
							}, [(openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
								return createVNode("div", {
									key: i,
									class: "flex items-center space-x-2 px-2 py-1.5"
								}, [createVNode(unref(Skeleton_default), { class: "h-4 w-4 rounded" }), createVNode(unref(Skeleton_default), { class: "h-4 flex-1" })]);
							}), 64))])) : availableCompatiblePipelines.value.length > 0 ? (openBlock(), createBlock("div", {
								key: 1,
								class: "p-2"
							}, [(openBlock(true), createBlock(Fragment, null, renderList(availableCompatiblePipelines.value, (pipeline) => {
								return openBlock(), createBlock("div", {
									key: pipeline,
									class: "flex items-center space-x-2 rounded-sm px-2 py-1.5 hover:bg-accent cursor-pointer",
									onClick: ($event) => togglePipeline(pipeline, !selectedPipelines.value.includes(pipeline))
								}, [createVNode(unref(Checkbox_default), {
									"model-value": selectedPipelines.value.includes(pipeline),
									class: "pointer-events-none"
								}, null, 8, ["model-value"]), createVNode("span", { class: "flex-1 text-sm" }, toDisplayString(toTitleCase(pipeline)), 1)], 8, ["onClick"]);
							}), 128))])) : (openBlock(), createBlock("div", {
								key: 2,
								class: "px-2 py-6 text-center text-sm text-muted-foreground"
							}, " No compatible pipelines available ")), incompatiblePipelines.value.length > 0 ? (openBlock(), createBlock("div", { key: 3 }, [
								createVNode(unref(Separator_default)),
								createVNode("div", { class: "px-3 py-2 text-xs font-medium text-muted-foreground" }, " Incompatible (Selected but not compatible) "),
								createVNode("div", { class: "p-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(incompatiblePipelines.value, (pipeline) => {
									return openBlock(), createBlock("div", {
										key: pipeline,
										class: "flex items-center space-x-2 rounded-sm px-2 py-1.5 hover:bg-accent cursor-pointer opacity-60",
										onClick: ($event) => togglePipeline(pipeline, false)
									}, [
										createVNode(unref(Checkbox_default), {
											"model-value": true,
											class: "pointer-events-none"
										}),
										createVNode("span", { class: "flex-1 text-sm" }, toDisplayString(toTitleCase(pipeline)), 1),
										createVNode("span", { class: "text-xs text-destructive" }, "⚠")
									], 8, ["onClick"]);
								}), 128))])
							])) : createCommentVNode("", true)]),
							_: 1
						})]),
						_: 1
					})];
				}),
				_: 1
			}, _parent));
		};
	}
});
var _sfc_setup$3 = PipelineSelector_vue_vue_type_script_setup_true_lang_default.setup;
PipelineSelector_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/PipelineSelector.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var PipelineSelector_default = PipelineSelector_vue_vue_type_script_setup_true_lang_default;
var ExportButton_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ExportButton",
	__ssrInlineRender: true,
	setup(__props) {
		const workspace = useWorkspaceStore();
		const fs = computed(() => workspace.currentWorkspace?.fileStore());
		const sigma = computed(() => workspace.currentWorkspace?.sigmaStore());
		const exportFiles = () => {
			if (!fs.value || !fs.value.files.length) return;
			const zip = new JSZip();
			const rulesFolder = zip.folder("rules");
			const configFolder = zip.folder("config");
			const filtersFolder = zip.folder("filters");
			const fileNameCounts = {};
			fs.value.files.forEach((file) => {
				const extension = ".yaml";
				const baseFileName = file.name;
				fileNameCounts[baseFileName] = (fileNameCounts[baseFileName] || 0) + 1;
				const fileName = fileNameCounts[baseFileName] > 1 ? `${baseFileName}_${fileNameCounts[baseFileName] - 1}${extension}` : `${baseFileName}${extension}`;
				if (file.type === "sigma") rulesFolder.file(fileName, file.content);
				else if (file.type === "pipeline") configFolder.file(fileName, file.content);
				else if (file.type === "filter") filtersFolder.file(fileName, file.content);
				else zip.file(fileName, file.content);
			});
			const generateReadme = () => {
				const selectedSiemId = sigma.value?.selected_siem;
				const siemDetails = supportedSiems.find((siem) => siem.id === selectedSiemId);
				const backendPlugin = siemDetails?.backend || "<backend>";
				const targetName = siemDetails?.name || "<target>";
				const targetId = siemDetails?.id || "<target>";
				return `# Detection Studio Export

This archive contains Sigma rules and configurations exported from Detection Studio.

## Directory Structure

- \`rules/\`: Contains Sigma detection rules
- \`config/\`: Contains Sigma pipeline configurations
- \`filters/\`: Contains Sigma filter configurations

## Usage with Sigma CLI

To use these files with the Sigma CLI tool, you need to:

1. Install Sigma CLI:
   \`\`\`bash
   pip3 install sigma-cli
   \`\`\`

2. Install the appropriate backend plugin for your SIEM:
   \`\`\`bash
   sigma plugin install ${backendPlugin}
   \`\`\`

   You can view all available backends with \`sigma plugin list\`.

3. Convert the rules to your SIEM format:
   \`\`\`bash
   sigma convert \\
       --target ${targetId} \\
       --filter ./filters/ \\
       --pipeline ./config/ \\
       ./rules
   \`\`\`

## Specific Instructions for ${targetName}

${generateSiemSpecificInstructions(targetId)}

Visit https://sigmahq.io for more information about Sigma and its capabilities.
`;
			};
			const generateSiemSpecificInstructions = (siemId) => {
				switch (siemId) {
					case "splunk": return `### For Splunk
- The converted queries will be in Splunk Processing Language (SPL) format
- You can paste these directly into your Splunk search bar
- For best results, use the Splunk Enterprise Security Content Update (ESCU) field mappings`;
					case "esql":
					case "lucene":
					case "eql": return `### For Elasticsearch
- The converted queries will be in ${siemId.toUpperCase()} format
- You can use these queries in Kibana or directly with the Elasticsearch API
- Consider using Elastic Security for additional integration capabilities`;
					case "loki": return `### For Grafana Loki
- The converted queries will be in LogQL format
- You can use these in Grafana dashboards with Loki datasources
- For optimal performance, ensure your Loki deployment has appropriate index configurations`;
					default: return `### For ${siemId}
- The converted queries will be specific to your ${siemId} environment
- Refer to your SIEM's documentation for best practices when importing these queries
- Consider testing in a development environment before deploying to production`;
				}
			};
			zip.file("README.md", generateReadme());
			zip.generateAsync({ type: "blob" }).then((content) => {
				const link = document.createElement("a");
				link.href = URL.createObjectURL(content);
				link.download = "detection_studio_export.zip";
				link.click();
				URL.revokeObjectURL(link.href);
			});
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(TooltipProvider_default), _attrs, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(ssrRenderComponent(unref(Tooltip_default), null, {
						default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
							if (_push$2) {
								_push$2(ssrRenderComponent(unref(TooltipTrigger_default), null, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) _push$3(ssrRenderComponent(unref(Button_default), {
											disabled: !fs.value?.files.length,
											class: "hidden h-8 md:flex gap-1 md:gap-2",
											size: "sm",
											variant: "secondary",
											onClick: exportFiles
										}, {
											default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
												if (_push$4) {
													_push$4(ssrRenderComponent(unref(Download), { class: "h-3.5 w-3.5" }, null, _parent$4, _scopeId$3));
													_push$4(` Export `);
												} else return [createVNode(unref(Download), { class: "h-3.5 w-3.5" }), createTextVNode(" Export ")];
											}),
											_: 1
										}, _parent$3, _scopeId$2));
										else return [createVNode(unref(Button_default), {
											disabled: !fs.value?.files.length,
											class: "hidden h-8 md:flex gap-1 md:gap-2",
											size: "sm",
											variant: "secondary",
											onClick: exportFiles
										}, {
											default: withCtx(() => [createVNode(unref(Download), { class: "h-3.5 w-3.5" }), createTextVNode(" Export ")]),
											_: 1
										}, 8, ["disabled"])];
									}),
									_: 1
								}, _parent$2, _scopeId$1));
								_push$2(ssrRenderComponent(unref(TooltipContent_default), {
									align: "end",
									side: "bottom"
								}, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) _push$3(`<p${_scopeId$2}>Export files as ZIP archive</p>`);
										else return [createVNode("p", null, "Export files as ZIP archive")];
									}),
									_: 1
								}, _parent$2, _scopeId$1));
							} else return [createVNode(unref(TooltipTrigger_default), null, {
								default: withCtx(() => [createVNode(unref(Button_default), {
									disabled: !fs.value?.files.length,
									class: "hidden h-8 md:flex gap-1 md:gap-2",
									size: "sm",
									variant: "secondary",
									onClick: exportFiles
								}, {
									default: withCtx(() => [createVNode(unref(Download), { class: "h-3.5 w-3.5" }), createTextVNode(" Export ")]),
									_: 1
								}, 8, ["disabled"])]),
								_: 1
							}), createVNode(unref(TooltipContent_default), {
								align: "end",
								side: "bottom"
							}, {
								default: withCtx(() => [createVNode("p", null, "Export files as ZIP archive")]),
								_: 1
							})];
						}),
						_: 1
					}, _parent$1, _scopeId));
					else return [createVNode(unref(Tooltip_default), null, {
						default: withCtx(() => [createVNode(unref(TooltipTrigger_default), null, {
							default: withCtx(() => [createVNode(unref(Button_default), {
								disabled: !fs.value?.files.length,
								class: "hidden h-8 md:flex gap-1 md:gap-2",
								size: "sm",
								variant: "secondary",
								onClick: exportFiles
							}, {
								default: withCtx(() => [createVNode(unref(Download), { class: "h-3.5 w-3.5" }), createTextVNode(" Export ")]),
								_: 1
							}, 8, ["disabled"])]),
							_: 1
						}), createVNode(unref(TooltipContent_default), {
							align: "end",
							side: "bottom"
						}, {
							default: withCtx(() => [createVNode("p", null, "Export files as ZIP archive")]),
							_: 1
						})]),
						_: 1
					})];
				}),
				_: 1
			}, _parent));
		};
	}
});
var _sfc_setup$2 = ExportButton_vue_vue_type_script_setup_true_lang_default.setup;
ExportButton_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ExportButton.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var ExportButton_default = ExportButton_vue_vue_type_script_setup_true_lang_default;
var SiemOutputQuery_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SiemOutputQuery",
	__ssrInlineRender: true,
	setup(__props) {
		useHead({
			title: "Detection Studio – detection.studio",
			meta: [{
				name: "description",
				content: "Design, build and share detection rules for your security tools."
			}]
		});
		const workspace = useWorkspaceStore();
		const sigma = computed(() => workspace.currentWorkspace?.sigmaStore());
		const isReady = computed(() => {
			return sigma.value.isReady;
		});
		const loadingMessages = [
			"Crafting \"next-gen\" Sigma rules...",
			"Hunting APT groups...",
			"Correlating suspicious events...",
			"Decoding obfuscated PowerShell...",
			"Detecting lateral movement...",
			"Analyzing behavior patterns...",
			"Investigating suspicious DNS queries...",
			"Scanning memory for IOCs...",
			"Chasing false positives away...",
			"Finding the next APT group...",
			"Decoding the latest Cobalt Strike...",
			"Hunting for the elusive \"Red Team\"...",
			"Searching for the next \"big\" threat...",
			"Going through the Sigma rule PR backlog...",
			"Sending Florian Roth an angry tweet..."
		];
		const index = ref(Math.floor(Math.random() * loadingMessages.length));
		const currentLoadingMessage = computed(() => loadingMessages[index.value]);
		let messageInterval = null;
		onMounted(() => {
			messageInterval = window.setInterval(() => {
				index.value = (index.value + 1) % loadingMessages.length;
			}, 3e3);
		});
		onBeforeUnmount(() => {
			if (messageInterval !== null) clearInterval(messageInterval);
		});
		const siem_title = computed(() => {
			return useChangeCase(sigma.value.selected_siem, "sentenceCase");
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full w-full rounded-xl bg-muted relative overflow-hidden flex flex-col" }, _attrs))} data-v-8d493717><div class="flex items-center gap-2 bg-muted-foreground/10 px-3 py-1.5" data-v-8d493717><h3 class="text-xs font-medium" data-v-8d493717>SIEM Query Output</h3><p class="text-xs font-bold text-muted-foreground title" data-v-8d493717>${ssrInterpolate(siem_title.value)}</p></div>`);
			if (!isReady.value && !sigma.value.siem_conversion_error) _push(`<div class="absolute inset-0 flex items-center justify-center z-10 bg-secondary/70 backdrop-blur-sm" data-v-8d493717><div class="text-center px-4 py-8 gap-4 flex flex-col items-center" data-v-8d493717><div class="animate-spin h-8 w-8 border-4 border-secondary border-t-primary rounded-full mx-auto" data-v-8d493717></div><div class="animate-pulse text-secondary-foreground text-lg font-medium" data-v-8d493717>${ssrInterpolate(currentLoadingMessage.value)}</div></div></div>`);
			else _push(`<!---->`);
			if (sigma.value.siem_conversion_error) {
				_push(`<div class="absolute inset-0 flex z-10 bg-red-950/50 backdrop-blur-xs" data-v-8d493717>`);
				_push(ssrRenderComponent(unref(ScrollArea_default), { class: "h-full w-full" }, {
					default: withCtx((_, _push$1, _parent$1, _scopeId) => {
						if (_push$1) if (sigma.value.siem_conversion_error) _push$1(`<div class="text-red-300 p-10" data-v-8d493717${_scopeId}><pre data-v-8d493717${_scopeId}>${ssrInterpolate(sigma.value.siem_conversion_error)}</pre></div>`);
						else _push$1(`<!---->`);
						else return [sigma.value.siem_conversion_error ? (openBlock(), createBlock("div", {
							key: 0,
							class: "text-red-300 p-10"
						}, [createVNode("pre", null, toDisplayString(sigma.value.siem_conversion_error), 1)])) : createCommentVNode("", true)];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(ssrRenderComponent(PrismEditor_default, {
				id: "siem-query-editor",
				"model-value": sigma.value.siem_query,
				"onUpdate:modelValue": ($event) => sigma.value.siem_query = $event,
				"read-only": true,
				"word-wrap": true,
				class: "h-full w-full border-border text-xs md:text-sm overflow-y-auto overflow-x-hidden bg-[#0D1118]",
				language: "splunk-spl"
			}, null, _parent));
			_push(`</div>`);
		};
	}
});
var _sfc_setup$1 = SiemOutputQuery_vue_vue_type_script_setup_true_lang_default.setup;
SiemOutputQuery_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/SiemOutputQuery.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var SiemOutputQuery_default = /* @__PURE__ */ _plugin_vue_export_helper_default(SiemOutputQuery_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-8d493717"]]);
var Studio_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Studio",
	__ssrInlineRender: true,
	setup(__props) {
		useHead({
			title: "Detection Studio – detection.studio",
			meta: [{
				name: "description",
				content: "Design, build and share detection rules for your security tools."
			}]
		});
		const workspaceStore = useWorkspaceStore();
		const shareStore = useWorkspaceSharingStore();
		const { width, height } = useWindowSize();
		const isCompactView = computed(() => width.value < 768 || height.value < 600);
		const shareDialogOpen = ref(false);
		const shareUrl = computed(() => {
			return shareStore.generateShareableUrl(workspaceStore.currentWorkspace);
		});
		const { copy, isSupported } = useClipboard({ source: shareUrl });
		function openShareDialog() {
			shareDialogOpen.value = true;
		}
		function handleShare() {
			copy(shareUrl.value);
		}
		const fs = computed(() => workspaceStore.currentWorkspace?.fileStore());
		const sigma = computed(() => workspaceStore.currentWorkspace?.sigmaStore());
		function exportFiles() {
			if (!fs.value || !fs.value.files.length) return;
			const zip = new JSZip();
			const rulesFolder = zip.folder("rules");
			const configFolder = zip.folder("config");
			const filtersFolder = zip.folder("filters");
			const fileNameCounts = {};
			fs.value.files.forEach((file) => {
				const extension = ".yaml";
				const baseFileName = file.name;
				fileNameCounts[baseFileName] = (fileNameCounts[baseFileName] || 0) + 1;
				const fileName = fileNameCounts[baseFileName] > 1 ? `${baseFileName}_${fileNameCounts[baseFileName] - 1}${extension}` : `${baseFileName}${extension}`;
				if (file.type === "sigma") rulesFolder.file(fileName, file.content);
				else if (file.type === "pipeline") configFolder.file(fileName, file.content);
				else if (file.type === "filter") filtersFolder.file(fileName, file.content);
				else zip.file(fileName, file.content);
			});
			const generateReadme = () => {
				const selectedSiemId = sigma.value?.selected_siem;
				const siemDetails = supportedSiems.find((siem) => siem.id === selectedSiemId);
				const backendPlugin = siemDetails?.backend || "<backend>";
				siemDetails?.name;
				return `# Detection Studio Export

This archive contains Sigma rules and configurations exported from Detection Studio.

## Directory Structure

- \`rules/\`: Contains Sigma detection rules
- \`config/\`: Contains Sigma pipeline configurations
- \`filters/\`: Contains Sigma filter configurations

## Usage with Sigma CLI

To use these files with the Sigma CLI tool, you need to:

1. Install Sigma CLI:
   \`\`\`bash
   pip3 install sigma-cli
   \`\`\`

2. Install the appropriate backend plugin for your SIEM:
   \`\`\`bash
   sigma plugin install ${backendPlugin}
   \`\`\`

   You can view all available backends with \`sigma plugin list\`.

3. Convert the rules to your SIEM format:
   \`\`\`bash
   sigma convert \\
       --target ${siemDetails?.id || "<target>"} \\
       --filter ./filters/ \\
       --pipeline ./config/ \\
       ./rules
   \`\`\`

Visit https://sigmahq.io for more information about Sigma and its capabilities.
`;
			};
			zip.file("README.md", generateReadme());
			zip.generateAsync({ type: "blob" }).then((content) => {
				const link = document.createElement("a");
				link.href = URL.createObjectURL(content);
				link.download = "detection_studio_export.zip";
				link.click();
				URL.revokeObjectURL(link.href);
			});
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col h-screen w-full max-w-full overflow-hidden" }, _attrs))}><header class="flex h-14 shrink-0 items-center gap-1 md:gap-2"><div class="w-full flex items-center gap-1 md:gap-4 px-4">`);
			_push(ssrRenderComponent(unref(SidebarTrigger_default), null, null, _parent));
			_push(ssrRenderComponent(unref(Separator_default), {
				class: "h-4!",
				orientation: "vertical"
			}, null, _parent));
			_push(`<!---->`);
			_push(`<div class="flex items-center gap-3">`);
			_push(ssrRenderComponent(SIEMSelector_default, null, null, _parent));
			_push(`<div class="hidden md:block">`);
			_push(ssrRenderComponent(PipelineSelector_default, null, null, _parent));
			_push(`</div></div><div class="grow"></div><div class="flex items-center gap-1 md:gap-2"><a class="hidden md:inline" href="https://github.com/northsh/detection.studio/" target="_blank">`);
			_push(ssrRenderComponent(unref(Button_default), {
				size: "sm",
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
			_push(ssrRenderComponent(ShareWorkspaceButton_default, null, null, _parent));
			_push(ssrRenderComponent(ExportButton_default, null, null, _parent));
			_push(ssrRenderComponent(unref(DropdownMenu_default), null, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(unref(DropdownMenuTrigger_default), { "as-child": "" }, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) _push$2(ssrRenderComponent(unref(Button_default), {
									class: "md:hidden h-8 w-8 p-0",
									size: "sm",
									variant: "ghost"
								}, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) {
											_push$3(ssrRenderComponent(unref(MoreVertical), { class: "h-4 w-4" }, null, _parent$3, _scopeId$2));
											_push$3(`<span class="sr-only"${_scopeId$2}>More options</span>`);
										} else return [createVNode(unref(MoreVertical), { class: "h-4 w-4" }), createVNode("span", { class: "sr-only" }, "More options")];
									}),
									_: 1
								}, _parent$2, _scopeId$1));
								else return [createVNode(unref(Button_default), {
									class: "md:hidden h-8 w-8 p-0",
									size: "sm",
									variant: "ghost"
								}, {
									default: withCtx(() => [createVNode(unref(MoreVertical), { class: "h-4 w-4" }), createVNode("span", { class: "sr-only" }, "More options")]),
									_: 1
								})];
							}),
							_: 1
						}, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(DropdownMenuContent_default), { align: "end" }, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) {
									_push$2(ssrRenderComponent(unref(DropdownMenuItem_default), { "as-child": "" }, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) _push$3(ssrRenderComponent(PipelineSelector_default, null, null, _parent$3, _scopeId$2));
											else return [createVNode(PipelineSelector_default)];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(ssrRenderComponent(unref(DropdownMenuSeparator_default), null, null, _parent$2, _scopeId$1));
									_push$2(ssrRenderComponent(unref(DropdownMenuItem_default), { "as-child": "" }, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) {
												_push$3(`<a class="flex items-center gap-2 cursor-pointer" href="https://github.com/northsh/detection.studio/" target="_blank"${_scopeId$2}>`);
												_push$3(ssrRenderComponent(unref(Github), { class: "h-4 w-4" }, null, _parent$3, _scopeId$2));
												_push$3(` GitHub </a>`);
											} else return [createVNode("a", {
												class: "flex items-center gap-2 cursor-pointer",
												href: "https://github.com/northsh/detection.studio/",
												target: "_blank"
											}, [createVNode(unref(Github), { class: "h-4 w-4" }), createTextVNode(" GitHub ")])];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(ssrRenderComponent(unref(DropdownMenuItem_default), {
										class: "flex items-center gap-2 cursor-pointer",
										onClick: openShareDialog
									}, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) {
												_push$3(ssrRenderComponent(unref(Share), { class: "h-4 w-4" }, null, _parent$3, _scopeId$2));
												_push$3(` Share `);
											} else return [createVNode(unref(Share), { class: "h-4 w-4" }), createTextVNode(" Share ")];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(ssrRenderComponent(unref(DropdownMenuItem_default), {
										disabled: !fs.value?.files.length,
										class: "flex items-center gap-2 cursor-pointer",
										onClick: exportFiles
									}, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) {
												_push$3(ssrRenderComponent(unref(Download), { class: "h-4 w-4" }, null, _parent$3, _scopeId$2));
												_push$3(` Export `);
											} else return [createVNode(unref(Download), { class: "h-4 w-4" }), createTextVNode(" Export ")];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
								} else return [
									createVNode(unref(DropdownMenuItem_default), { "as-child": "" }, {
										default: withCtx(() => [createVNode(PipelineSelector_default)]),
										_: 1
									}),
									createVNode(unref(DropdownMenuSeparator_default)),
									createVNode(unref(DropdownMenuItem_default), { "as-child": "" }, {
										default: withCtx(() => [createVNode("a", {
											class: "flex items-center gap-2 cursor-pointer",
											href: "https://github.com/northsh/detection.studio/",
											target: "_blank"
										}, [createVNode(unref(Github), { class: "h-4 w-4" }), createTextVNode(" GitHub ")])]),
										_: 1
									}),
									createVNode(unref(DropdownMenuItem_default), {
										class: "flex items-center gap-2 cursor-pointer",
										onClick: openShareDialog
									}, {
										default: withCtx(() => [createVNode(unref(Share), { class: "h-4 w-4" }), createTextVNode(" Share ")]),
										_: 1
									}),
									createVNode(unref(DropdownMenuItem_default), {
										disabled: !fs.value?.files.length,
										class: "flex items-center gap-2 cursor-pointer",
										onClick: exportFiles
									}, {
										default: withCtx(() => [createVNode(unref(Download), { class: "h-4 w-4" }), createTextVNode(" Export ")]),
										_: 1
									}, 8, ["disabled"])
								];
							}),
							_: 1
						}, _parent$1, _scopeId));
					} else return [createVNode(unref(DropdownMenuTrigger_default), { "as-child": "" }, {
						default: withCtx(() => [createVNode(unref(Button_default), {
							class: "md:hidden h-8 w-8 p-0",
							size: "sm",
							variant: "ghost"
						}, {
							default: withCtx(() => [createVNode(unref(MoreVertical), { class: "h-4 w-4" }), createVNode("span", { class: "sr-only" }, "More options")]),
							_: 1
						})]),
						_: 1
					}), createVNode(unref(DropdownMenuContent_default), { align: "end" }, {
						default: withCtx(() => [
							createVNode(unref(DropdownMenuItem_default), { "as-child": "" }, {
								default: withCtx(() => [createVNode(PipelineSelector_default)]),
								_: 1
							}),
							createVNode(unref(DropdownMenuSeparator_default)),
							createVNode(unref(DropdownMenuItem_default), { "as-child": "" }, {
								default: withCtx(() => [createVNode("a", {
									class: "flex items-center gap-2 cursor-pointer",
									href: "https://github.com/northsh/detection.studio/",
									target: "_blank"
								}, [createVNode(unref(Github), { class: "h-4 w-4" }), createTextVNode(" GitHub ")])]),
								_: 1
							}),
							createVNode(unref(DropdownMenuItem_default), {
								class: "flex items-center gap-2 cursor-pointer",
								onClick: openShareDialog
							}, {
								default: withCtx(() => [createVNode(unref(Share), { class: "h-4 w-4" }), createTextVNode(" Share ")]),
								_: 1
							}),
							createVNode(unref(DropdownMenuItem_default), {
								disabled: !fs.value?.files.length,
								class: "flex items-center gap-2 cursor-pointer",
								onClick: exportFiles
							}, {
								default: withCtx(() => [createVNode(unref(Download), { class: "h-4 w-4" }), createTextVNode(" Export ")]),
								_: 1
							}, 8, ["disabled"])
						]),
						_: 1
					})];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></header><div class="flex flex-col flex-1 h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)] min-h-0 w-full overflow-hidden">`);
			_push(ssrRenderComponent(unref(ResizablePanelGroup_default), {
				class: "h-full min-h-0 w-full",
				direction: "vertical"
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(unref(ResizablePanel), {
							"default-size": 70,
							"min-size": 20,
							class: "p-1 min-h-0 flex flex-col"
						}, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) {
									_push$2(`<div class="h-full w-full overflow-hidden flex flex-col"${_scopeId$1}>`);
									_push$2(ssrRenderComponent(Editor_default, null, null, _parent$2, _scopeId$1));
									_push$2(`</div>`);
								} else return [createVNode("div", { class: "h-full w-full overflow-hidden flex flex-col" }, [createVNode(Editor_default)])];
							}),
							_: 1
						}, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(ResizableHandle_default), { "with-handle": "" }, null, _parent$1, _scopeId));
						_push$1(ssrRenderComponent(unref(ResizablePanel), {
							"default-size": 30,
							"min-size": 10,
							class: "p-1 min-h-0 flex flex-col"
						}, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) _push$2(ssrRenderComponent(unref(ResizablePanelGroup_default), {
									class: "h-full min-h-0 w-full",
									direction: "vertical"
								}, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) {
											_push$3(ssrRenderComponent(unref(ResizablePanel), {
												"default-size": 35,
												"max-size": 50,
												"min-size": 15,
												class: "min-h-0 flex flex-col"
											}, {
												default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
													if (_push$4) _push$4(ssrRenderComponent(SiemOutputQuery_default, null, null, _parent$4, _scopeId$3));
													else return [createVNode(SiemOutputQuery_default)];
												}),
												_: 1
											}, _parent$3, _scopeId$2));
											_push$3(`<!---->`);
											_push$3(`<!---->`);
										} else return [
											createVNode(unref(ResizablePanel), {
												"default-size": 35,
												"max-size": 50,
												"min-size": 15,
												class: "min-h-0 flex flex-col"
											}, {
												default: withCtx(() => [createVNode(SiemOutputQuery_default)]),
												_: 1
											}),
											createCommentVNode("", true),
											createCommentVNode("", true)
										];
									}),
									_: 1
								}, _parent$2, _scopeId$1));
								else return [createVNode(unref(ResizablePanelGroup_default), {
									class: "h-full min-h-0 w-full",
									direction: "vertical"
								}, {
									default: withCtx(() => [
										createVNode(unref(ResizablePanel), {
											"default-size": 35,
											"max-size": 50,
											"min-size": 15,
											class: "min-h-0 flex flex-col"
										}, {
											default: withCtx(() => [createVNode(SiemOutputQuery_default)]),
											_: 1
										}),
										createCommentVNode("", true),
										createCommentVNode("", true)
									]),
									_: 1
								})];
							}),
							_: 1
						}, _parent$1, _scopeId));
					} else return [
						createVNode(unref(ResizablePanel), {
							"default-size": 70,
							"min-size": 20,
							class: "p-1 min-h-0 flex flex-col"
						}, {
							default: withCtx(() => [createVNode("div", { class: "h-full w-full overflow-hidden flex flex-col" }, [createVNode(Editor_default)])]),
							_: 1
						}),
						createVNode(unref(ResizableHandle_default), { "with-handle": "" }),
						createVNode(unref(ResizablePanel), {
							"default-size": 30,
							"min-size": 10,
							class: "p-1 min-h-0 flex flex-col"
						}, {
							default: withCtx(() => [createVNode(unref(ResizablePanelGroup_default), {
								class: "h-full min-h-0 w-full",
								direction: "vertical"
							}, {
								default: withCtx(() => [
									createVNode(unref(ResizablePanel), {
										"default-size": 35,
										"max-size": 50,
										"min-size": 15,
										class: "min-h-0 flex flex-col"
									}, {
										default: withCtx(() => [createVNode(SiemOutputQuery_default)]),
										_: 1
									}),
									createCommentVNode("", true),
									createCommentVNode("", true)
								]),
								_: 1
							})]),
							_: 1
						})
					];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
			if (isCompactView.value && false);
			else _push(`<!---->`);
			_push(ssrRenderComponent(unref(Dialog_default), {
				open: shareDialogOpen.value,
				"onUpdate:open": ($event) => shareDialogOpen.value = $event
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(ssrRenderComponent(unref(DialogContent_default), { class: "sm:max-w-[425px]" }, {
						default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
							if (_push$2) {
								_push$2(ssrRenderComponent(unref(DialogHeader_default), null, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) {
											_push$3(ssrRenderComponent(unref(DialogTitle_default), null, {
												default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
													if (_push$4) _push$4(` Share workspace`);
													else return [createTextVNode(" Share workspace")];
												}),
												_: 1
											}, _parent$3, _scopeId$2));
											_push$3(ssrRenderComponent(unref(DialogDescription_default), null, {
												default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
													if (_push$4) _push$4(` Share your detection.studio workspace with others by sending them the link below. `);
													else return [createTextVNode(" Share your detection.studio workspace with others by sending them the link below. ")];
												}),
												_: 1
											}, _parent$3, _scopeId$2));
										} else return [createVNode(unref(DialogTitle_default), null, {
											default: withCtx(() => [createTextVNode(" Share workspace")]),
											_: 1
										}), createVNode(unref(DialogDescription_default), null, {
											default: withCtx(() => [createTextVNode(" Share your detection.studio workspace with others by sending them the link below. ")]),
											_: 1
										})];
									}),
									_: 1
								}, _parent$2, _scopeId$1));
								_push$2(`<div class="flex flex-col gap-2"${_scopeId$1}>`);
								_push$2(ssrRenderComponent(unref(Label_default), { for: "share-url" }, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) _push$3(` Shareable URL `);
										else return [createTextVNode(" Shareable URL ")];
									}),
									_: 1
								}, _parent$2, _scopeId$1));
								_push$2(ssrRenderComponent(unref(Input_default), {
									id: "share-url",
									"model-value": shareUrl.value,
									class: "col-span-3",
									disabled: ""
								}, null, _parent$2, _scopeId$1));
								if (unref(isSupported)) _push$2(ssrRenderComponent(unref(Button_default), {
									class: "w-full",
									type: "submit",
									variant: "outline",
									onClick: handleShare
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
									default: withCtx(() => [createTextVNode(" Share workspace")]),
									_: 1
								}), createVNode(unref(DialogDescription_default), null, {
									default: withCtx(() => [createTextVNode(" Share your detection.studio workspace with others by sending them the link below. ")]),
									_: 1
								})]),
								_: 1
							}), createVNode("div", { class: "flex flex-col gap-2" }, [
								createVNode(unref(Label_default), { for: "share-url" }, {
									default: withCtx(() => [createTextVNode(" Shareable URL ")]),
									_: 1
								}),
								createVNode(unref(Input_default), {
									id: "share-url",
									"model-value": shareUrl.value,
									class: "col-span-3",
									disabled: ""
								}, null, 8, ["model-value"]),
								unref(isSupported) ? (openBlock(), createBlock(unref(Button_default), {
									key: 0,
									class: "w-full",
									type: "submit",
									variant: "outline",
									onClick: handleShare
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
					else return [createVNode(unref(DialogContent_default), { class: "sm:max-w-[425px]" }, {
						default: withCtx(() => [createVNode(unref(DialogHeader_default), null, {
							default: withCtx(() => [createVNode(unref(DialogTitle_default), null, {
								default: withCtx(() => [createTextVNode(" Share workspace")]),
								_: 1
							}), createVNode(unref(DialogDescription_default), null, {
								default: withCtx(() => [createTextVNode(" Share your detection.studio workspace with others by sending them the link below. ")]),
								_: 1
							})]),
							_: 1
						}), createVNode("div", { class: "flex flex-col gap-2" }, [
							createVNode(unref(Label_default), { for: "share-url" }, {
								default: withCtx(() => [createTextVNode(" Shareable URL ")]),
								_: 1
							}),
							createVNode(unref(Input_default), {
								id: "share-url",
								"model-value": shareUrl.value,
								class: "col-span-3",
								disabled: ""
							}, null, 8, ["model-value"]),
							unref(isSupported) ? (openBlock(), createBlock(unref(Button_default), {
								key: 0,
								class: "w-full",
								type: "submit",
								variant: "outline",
								onClick: handleShare
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
			_push(`</div>`);
		};
	}
});
var _sfc_setup = Studio_vue_vue_type_script_setup_true_lang_default.setup;
Studio_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/Studio.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Studio_default = Studio_vue_vue_type_script_setup_true_lang_default;
export { Studio_default as default };

//# sourceMappingURL=Studio-C81JcG42.js.map