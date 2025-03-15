(function() {
	try {
		var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {};
		e.SENTRY_RELEASE = { id: "a2373c7004d0269c74d9ea84d69f613722a72468" };
	} catch (e) {}
})();
try {
	(function() {
		var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
		n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "abee8fdf-38cb-408a-9827-2462b278f407", e._sentryDebugIdIdentifier = "sentry-dbid-abee8fdf-38cb-408a-9827-2462b278f407");
	})();
} catch (e) {}
import { G as cn } from "../main.mjs";
import { createBlock, createCommentVNode, createTextVNode, createVNode, defineComponent, mergeProps, onMounted, openBlock, renderSlot, toDisplayString, unref, useSSRContext, useTemplateRef, watch, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { ComboboxAnchor, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxLabel, ComboboxPortal, ComboboxRoot, ComboboxSeparator, ComboboxViewport, useForwardProps, useForwardPropsEmits } from "reka-ui";
import { reactiveOmit } from "@vueuse/core";
import { highlightSelectionMatches, searchWidget } from "prism-code-editor/search";
import { defaultCommands } from "prism-code-editor/commands";
import { cursorPosition } from "prism-code-editor/cursor";
import { copyButton } from "prism-code-editor/copy-button";
import { matchTags } from "prism-code-editor/match-tags";
import { highlightBracketPairs } from "prism-code-editor/highlight-brackets";
import { createEditor } from "prism-code-editor";
import { autoComplete, fuzzyFilter, registerCompletions } from "prism-code-editor/autocomplete";
import "js-yaml";
import "prism-code-editor/languages/html";
import "prism-code-editor/languages/clike";
import "prism-code-editor/languages/css";
import "prism-code-editor/prism/languages/markup";
import "prism-code-editor/prism/languages/css-extras";
import "prism-code-editor/prism/languages/javascript";
import "prism-code-editor/prism/languages/yaml";
import "prism-code-editor/prism/languages/splunk-spl";
var Combobox_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Combobox",
	__ssrInlineRender: true,
	props: {
		open: { type: Boolean },
		defaultOpen: { type: Boolean },
		resetSearchTermOnBlur: { type: Boolean },
		resetSearchTermOnSelect: { type: Boolean },
		openOnFocus: { type: Boolean },
		openOnClick: { type: Boolean },
		ignoreFilter: { type: Boolean },
		resetModelValueOnClear: { type: Boolean },
		modelValue: {},
		defaultValue: {},
		multiple: { type: Boolean },
		dir: {},
		disabled: { type: Boolean },
		highlightOnHover: { type: Boolean },
		by: { type: [String, Function] },
		asChild: { type: Boolean },
		as: {},
		name: {},
		required: { type: Boolean }
	},
	emits: [
		"update:modelValue",
		"highlight",
		"update:open"
	],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(ComboboxRoot), mergeProps(unref(forwarded), _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$8 = Combobox_vue_vue_type_script_setup_true_lang_default.setup;
Combobox_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/combobox/Combobox.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var Combobox_default = Combobox_vue_vue_type_script_setup_true_lang_default;
var ComboboxAnchor_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxAnchor",
	__ssrInlineRender: true,
	props: {
		reference: {},
		asChild: { type: Boolean },
		as: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		const forwarded = useForwardProps(reactiveOmit(props, "class"));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(ComboboxAnchor), mergeProps(unref(forwarded), { class: unref(cn)("w-[200px]", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$7 = ComboboxAnchor_vue_vue_type_script_setup_true_lang_default.setup;
ComboboxAnchor_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/combobox/ComboboxAnchor.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var ComboboxAnchor_default = ComboboxAnchor_vue_vue_type_script_setup_true_lang_default;
var ComboboxEmpty_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxEmpty",
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
			_push(ssrRenderComponent(unref(ComboboxEmpty), mergeProps(unref(delegatedProps), { class: unref(cn)("py-6 text-center text-sm", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$6 = ComboboxEmpty_vue_vue_type_script_setup_true_lang_default.setup;
ComboboxEmpty_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/combobox/ComboboxEmpty.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var ComboboxEmpty_default = ComboboxEmpty_vue_vue_type_script_setup_true_lang_default;
var ComboboxGroup_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxGroup",
	__ssrInlineRender: true,
	props: {
		asChild: { type: Boolean },
		as: {},
		class: {},
		heading: {}
	},
	setup(__props) {
		const props = __props;
		const delegatedProps = reactiveOmit(props, "class");
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(ComboboxGroup), mergeProps(unref(delegatedProps), { class: unref(cn)("overflow-hidden p-1 text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						if (__props.heading) _push$1(ssrRenderComponent(unref(ComboboxLabel), { class: "px-2 py-1.5 text-xs font-medium text-muted-foreground" }, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) _push$2(`${ssrInterpolate(__props.heading)}`);
								else return [createTextVNode(toDisplayString(__props.heading), 1)];
							}),
							_: 1
						}, _parent$1, _scopeId));
						else _push$1(`<!---->`);
						ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					} else return [__props.heading ? (openBlock(), createBlock(unref(ComboboxLabel), {
						key: 0,
						class: "px-2 py-1.5 text-xs font-medium text-muted-foreground"
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(__props.heading), 1)]),
						_: 1
					})) : createCommentVNode("", true), renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$5 = ComboboxGroup_vue_vue_type_script_setup_true_lang_default.setup;
ComboboxGroup_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/combobox/ComboboxGroup.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var ComboboxGroup_default = ComboboxGroup_vue_vue_type_script_setup_true_lang_default;
var ComboboxInput_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxInput",
	__ssrInlineRender: true,
	props: {
		displayValue: { type: Function },
		modelValue: {},
		autoFocus: { type: Boolean },
		disabled: { type: Boolean },
		asChild: { type: Boolean },
		as: {},
		class: {}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(ComboboxInput), mergeProps(unref(forwarded), { class: unref(cn)("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$4 = ComboboxInput_vue_vue_type_script_setup_true_lang_default.setup;
ComboboxInput_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/combobox/ComboboxInput.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var ComboboxInput_default = ComboboxInput_vue_vue_type_script_setup_true_lang_default;
var ComboboxItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxItem",
	__ssrInlineRender: true,
	props: {
		textValue: {},
		value: {},
		disabled: { type: Boolean },
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
			_push(ssrRenderComponent(unref(ComboboxItem), mergeProps(unref(forwarded), { class: unref(cn)("relative flex cursor-default gap-2 select-none justify-between items-center rounded-sm px-2 py-1.5 text-sm outline-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$3 = ComboboxItem_vue_vue_type_script_setup_true_lang_default.setup;
ComboboxItem_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/combobox/ComboboxItem.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var ComboboxItem_default = ComboboxItem_vue_vue_type_script_setup_true_lang_default;
var ComboboxList_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxList",
	__ssrInlineRender: true,
	props: {
		forceMount: { type: Boolean },
		position: { default: "popper" },
		bodyLock: { type: Boolean },
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
		"interactOutside"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(ComboboxPortal), _attrs, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(ssrRenderComponent(unref(ComboboxContent), mergeProps(unref(forwarded), { class: unref(cn)("z-50 w-[200px] rounded-md border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", props.class) }), {
						default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
							if (_push$2) _push$2(ssrRenderComponent(unref(ComboboxViewport), null, {
								default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
									if (_push$3) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$3, _parent$3, _scopeId$2);
									else return [renderSlot(_ctx.$slots, "default")];
								}),
								_: 3
							}, _parent$2, _scopeId$1));
							else return [createVNode(unref(ComboboxViewport), null, {
								default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
								_: 3
							})];
						}),
						_: 3
					}, _parent$1, _scopeId));
					else return [createVNode(unref(ComboboxContent), mergeProps(unref(forwarded), { class: unref(cn)("z-50 w-[200px] rounded-md border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", props.class) }), {
						default: withCtx(() => [createVNode(unref(ComboboxViewport), null, {
							default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
							_: 3
						})]),
						_: 3
					}, 16, ["class"])];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$2 = ComboboxList_vue_vue_type_script_setup_true_lang_default.setup;
ComboboxList_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/combobox/ComboboxList.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var ComboboxList_default = ComboboxList_vue_vue_type_script_setup_true_lang_default;
var ComboboxSeparator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxSeparator",
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
			_push(ssrRenderComponent(unref(ComboboxSeparator), mergeProps(unref(delegatedProps), { class: unref(cn)("-mx-1 h-px bg-border", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$1 = ComboboxSeparator_vue_vue_type_script_setup_true_lang_default.setup;
ComboboxSeparator_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/combobox/ComboboxSeparator.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var optionsFromKeys = (obj, icon) => Object.keys(obj).map((tag) => ({
	label: tag,
	icon
}));
const sigmaModifiers = [
	"contains",
	"endswith",
	"startswith",
	"all",
	"base64",
	"base64offset",
	"cidr",
	"contains",
	"endswith",
	"eq",
	"exists",
	"gt",
	"gte",
	"lt",
	"lte",
	"expand",
	"re",
	"windash",
	"utf16le",
	"utf16be",
	"utf16",
	"wide"
];
const levelValues = [
	"informational",
	"low",
	"medium",
	"high",
	"critical"
];
const statusValues = [
	"stable",
	"test",
	"experimental",
	"deprecated",
	"unsupported"
];
const categoryValues = [
	"process_creation",
	"file_event",
	"network_connection",
	"registry_event",
	"registry_add",
	"registry_delete",
	"registry_set",
	"image_load",
	"driver_load",
	"wmi_event",
	"dns_query",
	"firewall",
	"web",
	"antivirus",
	"authentication",
	"create_remote_thread",
	"create_stream_hash",
	"pipe_created"
];
const productValues = [
	"windows",
	"linux",
	"macos",
	"azure",
	"aws",
	"gcp",
	"android",
	"ios",
	"apache",
	"nginx",
	"office365",
	"firewalls"
];
const serviceValues = [
	"sysmon",
	"security",
	"system",
	"application",
	"applocker",
	"powershell",
	"defender",
	"sshd",
	"firewall-as",
	"auditd",
	"clamav",
	"apache",
	"nginx",
	"winevent",
	"windefend"
];
const conditionPatterns = [
	"selection",
	"selection and not filter",
	"1 of selection*",
	"all of selection*",
	"selection1 or selection2",
	"selection1 and selection2",
	"selection1 and not selection2",
	"1 of them",
	"all of them"
];
const sigmaFields = {
	title: null,
	id: null,
	name: null,
	related: null,
	taxonomy: ["sigma"],
	status: statusValues,
	description: null,
	license: null,
	references: null,
	author: null,
	date: null,
	modified: null,
	logsource: null,
	detection: null,
	fields: null,
	falsepositives: null,
	level: levelValues,
	tags: null,
	scope: null
};
const logsourceFields = {
	category: categoryValues,
	product: productValues,
	service: serviceValues,
	definition: null
};
const detectionFields = {
	selection: null,
	condition: conditionPatterns
};
const mitreTactics = [
	"attack.reconnaissance",
	"attack.resource_development",
	"attack.initial_access",
	"attack.execution",
	"attack.persistence",
	"attack.privilege_escalation",
	"attack.defense_evasion",
	"attack.credential_access",
	"attack.discovery",
	"attack.lateral_movement",
	"attack.collection",
	"attack.command_and_control",
	"attack.exfiltration",
	"attack.impact"
];
const windowsEventIds = [
	"1",
	"3",
	"4624",
	"4625",
	"4634",
	"4688",
	"4698",
	"4699",
	"4700",
	"4701",
	"4702",
	"4720",
	"4724",
	"4728",
	"4732",
	"5156",
	"7045"
];
var fieldModifierPattern = /([a-zA-Z0-9_]+)(\|[a-zA-Z0-9_]+)*:?\s*$/;
var indentationPattern = /^(\s*)/;
function isInSection(before, sectionName) {
	const lines = before.split("\n");
	let inSection = false;
	let indentation = -1;
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		if (line.match(/* @__PURE__ */ new RegExp(`^\\s*${sectionName}\\s*:`))) {
			inSection = true;
			indentation = (line.match(/^\s*/) || [""])[0].length;
			continue;
		}
		if (inSection) {
			const currentIndent = (line.match(/^\s*/) || [""])[0].length;
			if (line.trim() === "" || currentIndent > indentation) continue;
			else inSection = false;
		}
	}
	return inSection;
}
function getIndentation(before) {
	const match = (before.split("\n").pop() || "").match(indentationPattern);
	return match ? match[1] : "";
}
function getSelectionNames(before) {
	if (!isInSection(before, "detection")) return [];
	const lines = before.split("\n");
	const selectionNames = [];
	let inDetection = false;
	let detectionIndent = -1;
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		if (line.match(/^\s*detection\s*:/)) {
			inDetection = true;
			detectionIndent = (line.match(/^\s*/) || [""])[0].length;
			continue;
		}
		if (inDetection) {
			const currentIndent = (line.match(/^\s*/) || [""])[0].length;
			if (line.trim() === "") continue;
			if (currentIndent <= detectionIndent) {
				inDetection = false;
				continue;
			}
			if (!line.match(/^\s*condition\s*:/) && line.includes(":")) {
				const selectionName = line.trim().split(":")[0].trim();
				if (selectionName && !selectionNames.includes(selectionName)) selectionNames.push(selectionName);
			}
		}
	}
	return selectionNames;
}
var sigmaContext = (context, _) => {
	const { before } = context;
	return {
		inLogsource: isInSection(before, "logsource"),
		inDetection: isInSection(before, "detection"),
		fieldModifier: (before.match(fieldModifierPattern) || [])[1] || null,
		selectionNames: getSelectionNames(before)
	};
};
const sigmaCompletion = {
	context: sigmaContext,
	sources: [
		(context, _) => {
			const { before, lineBefore } = context;
			const indent = getIndentation(before);
			if (lineBefore.trim() === "" || lineBefore.trim().endsWith(":")) {
				if (indent.length === 0 || lineBefore.trim() === "" && before.trim() === "") return {
					from: context.pos - lineBefore.trim().length,
					options: optionsFromKeys(sigmaFields, "property")
				};
			}
			return null;
		},
		(context, _) => {
			const { lineBefore, inLogsource } = context;
			if (inLogsource && (lineBefore.trim() === "" || lineBefore.trim().endsWith(":"))) return {
				from: context.pos - lineBefore.trim().length,
				options: optionsFromKeys(logsourceFields, "property")
			};
			return null;
		},
		(context, _) => {
			const { lineBefore, inLogsource } = context;
			if (inLogsource && lineBefore.trim().match(/^\s*category\s*:\s*$/)) return {
				from: context.pos,
				options: categoryValues.map((value) => ({
					label: value,
					icon: "constant"
				}))
			};
			return null;
		},
		(context, _) => {
			const { lineBefore, inLogsource } = context;
			if (inLogsource && lineBefore.trim().match(/^\s*product\s*:\s*$/)) return {
				from: context.pos,
				options: productValues.map((value) => ({
					label: value,
					icon: "constant"
				}))
			};
			return null;
		},
		(context, _) => {
			const { lineBefore, inLogsource } = context;
			if (inLogsource && lineBefore.trim().match(/^\s*service\s*:\s*$/)) return {
				from: context.pos,
				options: serviceValues.map((value) => ({
					label: value,
					icon: "constant"
				}))
			};
			return n;
		},
		(context, _) => {
			const { lineBefore } = context;
			if (lineBefore.trim().match(/^\s*level\s*:\s*$/)) return {
				from: context.pos,
				options: levelValues.map((value) => ({
					label: value,
					icon: "enum"
				}))
			};
			return null;
		},
		(context, _) => {
			const { lineBefore } = context;
			if (lineBefore.trim().match(/^\s*status\s*:\s*$/)) return {
				from: context.pos,
				options: statusValues.map((value) => ({
					label: value,
					icon: "enum"
				}))
			};
			return null;
		},
		(context, editor) => {
			const { lineBefore } = context;
			if (lineBefore.trim().match(/^\s*-\s*$/)) {
				const previousLine = editor.value.split("\n").slice(0, editor.posFromOffset(context.pos).line).pop() || "";
				if (previousLine && previousLine.trim().match(/^\s*tags\s*:/)) return {
					from: context.pos,
					options: mitreTactics.map((value) => ({
						label: value,
						icon: "constant"
					}))
				};
			}
			return null;
		},
		(context, _) => {
			const { before, lineBefore, inDetection } = context;
			if (inDetection && (lineBefore.trim() === "" || lineBefore.trim().endsWith(":"))) {
				const hasCondition = before.includes("condition:");
				const options = optionsFromKeys(detectionFields, "property");
				if (hasCondition) return {
					from: context.pos - lineBefore.trim().length,
					options: options.filter((o) => o.label !== "condition")
				};
				return {
					from: context.pos - lineBefore.trim().length,
					options
				};
			}
			return null;
		},
		(context, _) => {
			const { lineBefore } = context;
			if (lineBefore.match(/([a-zA-Z0-9_]+)(\|[a-zA-Z0-9_]+)*\|$/)) return {
				from: context.pos,
				options: sigmaModifiers.map((value) => ({
					label: value,
					icon: "function"
				}))
			};
			return null;
		},
		(context, _) => {
			const { lineBefore, inDetection, selectionNames } = context;
			if (inDetection && lineBefore.trim().match(/^\s*condition\s*:\s*$/)) {
				const options = conditionPatterns.map((pattern) => ({
					label: pattern,
					icon: "keyword"
				}));
				if (selectionNames.length > 0) selectionNames.forEach((name) => {
					options.push({
						label: name,
						icon: "keyword"
					});
					if (selectionNames.length > 1) selectionNames.filter((n$1) => n$1 !== name).forEach((otherName) => {
						options.push({
							label: `${name} and ${otherName}`,
							icon: "keyword"
						});
						options.push({
							label: `${name} or ${otherName}`,
							icon: "keyword"
						});
						options.push({
							label: `${name} and not ${otherName}`,
							icon: "keyword"
						});
					});
				});
				return {
					from: context.pos,
					options
				};
			}
			return null;
		},
		(context, _) => {
			const { lineBefore, inDetection } = context;
			if (inDetection && lineBefore.trim().match(/^\s*EventID\s*:\s*$/)) return {
				from: context.pos,
				options: windowsEventIds.map((id) => ({
					label: id,
					icon: "constant"
				}))
			};
			return null;
		}
	]
};
registerCompletions(["yaml"], sigmaCompletion);
var PrismEditor_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "PrismEditor",
	__ssrInlineRender: true,
	props: {
		modelValue: { default: "" },
		language: { default: "javascript" },
		theme: { default: "github-dark" },
		tabSize: { default: "2" },
		insertSpaces: {
			type: Boolean,
			default: false
		},
		lineNumbers: {
			type: Boolean,
			default: false
		},
		readOnly: {
			type: Boolean,
			default: false
		},
		wordWrap: {
			type: Boolean,
			default: false
		},
		class: { default: "" },
		enableAutocompletion: {
			type: Boolean,
			default: true
		}
	},
	emits: [
		"update:modelValue",
		"selectionChange",
		"ready"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const editorRef = useTemplateRef("prism-editor-ref");
		let editor;
		onMounted(() => {
			if (!editorRef.value) return;
			const extensions = [
				highlightSelectionMatches(),
				searchWidget(),
				defaultCommands(),
				copyButton(),
				matchTags(),
				highlightBracketPairs(),
				cursorPosition()
			];
			if (props.enableAutocompletion) if (props.language === "yaml") extensions.push(autoComplete({
				filter: fuzzyFilter,
				closeOnBlur: true,
				explicitOnly: false,
				preferAbove: false
			}, sigmaCompletion));
			else extensions.push(autoComplete({
				filter: fuzzyFilter,
				closeOnBlur: true,
				explicitOnly: false,
				preferAbove: false
			}));
			editor = createEditor(editorRef.value, {
				value: props.modelValue,
				language: props.language,
				theme: props.theme,
				tabSize: props.tabSize,
				insertSpaces: props.insertSpaces,
				lineNumbers: props.lineNumbers,
				readOnly: props.readOnly,
				wordWrap: props.wordWrap
			}, ...extensions);
			editor.textarea?.addEventListener("beforeinput", () => {}, true);
			editor.on("update", (e) => {
				emit("update:modelValue", e);
			});
			editor.on("selectionChange", (e) => {
				emit("selectionChange", e);
			});
			emit("ready", editor);
		});
		watch(() => props.modelValue, () => {
			if (!editor) return;
			editor.setOptions({ value: props.modelValue });
		});
		watch(() => props.language, (newLanguage) => {
			if (!editor) return;
			editor.setOptions({ language: newLanguage });
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				ref: "prism-editor-ref",
				class: [props.class, "prism-editor-ref"]
			}, _attrs))}></div>`);
		};
	}
});
var _sfc_setup = PrismEditor_vue_vue_type_script_setup_true_lang_default.setup;
PrismEditor_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/PrismEditor.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var PrismEditor_default = PrismEditor_vue_vue_type_script_setup_true_lang_default;
export { ComboboxInput_default as a, ComboboxAnchor_default as c, ComboboxItem_default as i, Combobox_default as l, ComboboxItemIndicator as n, ComboboxGroup_default as o, ComboboxList_default as r, ComboboxEmpty_default as s, PrismEditor_default as t };

//# sourceMappingURL=PrismEditor-TnP7lcFX.js.map