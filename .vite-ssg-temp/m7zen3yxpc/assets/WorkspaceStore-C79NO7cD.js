(function() {
	try {
		var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {};
		e.SENTRY_RELEASE = { id: "a2373c7004d0269c74d9ea84d69f613722a72468" };
	} catch (e) {}
})();
try {
	(function() {
		var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
		n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "397914c7-1285-42f2-93c2-d995b69bb97f", e._sentryDebugIdIdentifier = "sentry-dbid-397914c7-1285-42f2-93c2-d995b69bb97f");
	})();
} catch (e) {}
import { T as useWorkspaceStore } from "../main.mjs";
export { useWorkspaceStore };
