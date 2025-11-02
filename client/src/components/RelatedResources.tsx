import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/RelatedResources.tsx");import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;

let prevRefreshReg;
let prevRefreshSig;

if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react-swc can't detect preamble. Something is wrong."
    );
  }

  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/dev-server/src/components/RelatedResources.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}

import __vite__cjsImport2_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=7cbad96a"; const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsxDEV"];
export default function RelatedResources({ currentResourceSlug, colorScheme = "purple", title = "More Resources ↓" }) {
    return /*#__PURE__*/ _jsxDEV("div", {
        className: "container mx-auto px-4 py-12",
        children: [
            /*#__PURE__*/ _jsxDEV("h3", {
                className: "text-2xl font-bold text-center mb-8",
                children: title
            }, void 0, false, {
                fileName: "/dev-server/src/components/RelatedResources.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ _jsxDEV("div", {
                className: "text-center text-gray-600",
                children: /*#__PURE__*/ _jsxDEV("p", {
                    children: "Explore more free resources to grow your Shadow Pages business"
                }, void 0, false, {
                    fileName: "/dev-server/src/components/RelatedResources.tsx",
                    lineNumber: 16,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "/dev-server/src/components/RelatedResources.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "/dev-server/src/components/RelatedResources.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = RelatedResources;
var _c;
$RefreshReg$(_c, "RelatedResources");


if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}


if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/dev-server/src/components/RelatedResources.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/dev-server/src/components/RelatedResources.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlbGF0ZWRSZXNvdXJjZXMudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImludGVyZmFjZSBSZWxhdGVkUmVzb3VyY2VzUHJvcHMge1xuICBjdXJyZW50UmVzb3VyY2VTbHVnOiBzdHJpbmc7XG4gIGNvbG9yU2NoZW1lPzogc3RyaW5nO1xuICB0aXRsZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUmVsYXRlZFJlc291cmNlcyh7XG4gIGN1cnJlbnRSZXNvdXJjZVNsdWcsXG4gIGNvbG9yU2NoZW1lID0gXCJwdXJwbGVcIixcbiAgdGl0bGUgPSBcIk1vcmUgUmVzb3VyY2VzIOKGk1wiXG59OiBSZWxhdGVkUmVzb3VyY2VzUHJvcHMpIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBteC1hdXRvIHB4LTQgcHktMTJcIj5cbiAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC1jZW50ZXIgbWItOFwiPnt0aXRsZX08L2gzPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciB0ZXh0LWdyYXktNjAwXCI+XG4gICAgICAgIDxwPkV4cGxvcmUgbW9yZSBmcmVlIHJlc291cmNlcyB0byBncm93IHlvdXIgU2hhZG93IFBhZ2VzIGJ1c2luZXNzPC9wPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwibmFtZXMiOlsiUmVsYXRlZFJlc291cmNlcyIsImN1cnJlbnRSZXNvdXJjZVNsdWciLCJjb2xvclNjaGVtZSIsInRpdGxlIiwiZGl2IiwiY2xhc3NOYW1lIiwiaDMiLCJwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1BLGVBQWUsU0FBU0EsaUJBQWlCLEVBQ3ZDQyxtQkFBbUIsRUFDbkJDLGNBQWMsUUFBUSxFQUN0QkMsUUFBUSxrQkFBa0IsRUFDSjtJQUN0QixxQkFDRSxRQUFDQztRQUFJQyxXQUFVOzswQkFDYixRQUFDQztnQkFBR0QsV0FBVTswQkFBdUNGOzs7Ozs7MEJBQ3JELFFBQUNDO2dCQUFJQyxXQUFVOzBCQUNiLGNBQUEsUUFBQ0U7OEJBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSVg7S0Fid0JQIn0=