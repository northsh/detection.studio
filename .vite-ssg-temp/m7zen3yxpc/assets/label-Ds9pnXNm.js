(function() {
	try {
		var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {};
		e.SENTRY_RELEASE = { id: "a2373c7004d0269c74d9ea84d69f613722a72468" };
	} catch (e) {}
})();
try {
	(function() {
		var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
		n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "4ad2cacd-fd98-4f8c-8df4-e4ac3b1db9a2", e._sentryDebugIdIdentifier = "sentry-dbid-4ad2cacd-fd98-4f8c-8df4-e4ac3b1db9a2");
	})();
} catch (e) {}
import { G as cn } from "../main.mjs";
import { defineComponent, mergeProps, renderSlot, unref, useSSRContext, withCtx } from "vue";
import { ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { Label } from "reka-ui";
import { reactiveOmit } from "@vueuse/core";
var Label_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Label",
	__ssrInlineRender: true,
	props: {
		for: {},
		asChild: { type: Boolean },
		as: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		const delegatedProps = reactiveOmit(props, "class");
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Label), mergeProps(unref(delegatedProps), { class: unref(cn)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", props.class) }, _attrs), {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup = Label_vue_vue_type_script_setup_true_lang_default.setup;
Label_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/label/Label.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Label_default = Label_vue_vue_type_script_setup_true_lang_default;
export { Label_default as t };

//# sourceMappingURL=label-Ds9pnXNm.js.map