import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/NotFound.tsx");import * as RefreshRuntime from "/@react-refresh";
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/dev-server/src/pages/NotFound.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}

import __vite__cjsImport2_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=7cbad96a"; const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsxDEV"];
var _s = $RefreshSig$();
import { useLocation } from "/node_modules/.vite/deps/react-router-dom.js?v=7cbad96a";
import __vite__cjsImport4_react from "/node_modules/.vite/deps/react.js?v=7cbad96a"; const useEffect = __vite__cjsImport4_react["useEffect"];
const NotFound = ()=>{
    _s();
    const location = useLocation();
    useEffect(()=>{
        console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }, [
        location.pathname
    ]);
    return /*#__PURE__*/ _jsxDEV("div", {
        className: "flex min-h-screen items-center justify-center bg-gray-100",
        children: /*#__PURE__*/ _jsxDEV("div", {
            className: "text-center",
            children: [
                /*#__PURE__*/ _jsxDEV("h1", {
                    className: "mb-4 text-4xl font-bold",
                    children: "404"
                }, void 0, false, {
                    fileName: "/dev-server/src/pages/NotFound.tsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ _jsxDEV("p", {
                    className: "mb-4 text-xl text-gray-600",
                    children: "Oops! Page not found"
                }, void 0, false, {
                    fileName: "/dev-server/src/pages/NotFound.tsx",
                    lineNumber: 15,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ _jsxDEV("a", {
                    href: "/",
                    className: "text-blue-500 underline hover:text-blue-700",
                    children: "Return to Home"
                }, void 0, false, {
                    fileName: "/dev-server/src/pages/NotFound.tsx",
                    lineNumber: 16,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "/dev-server/src/pages/NotFound.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "/dev-server/src/pages/NotFound.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
};
_s(NotFound, "BXcZrDMM76mmm4zA8/QV5UbMNXE=", false, function() {
    return [
        useLocation
    ];
});
_c = NotFound;
export default NotFound;
var _c;
$RefreshReg$(_c, "NotFound");


if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}


if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/dev-server/src/pages/NotFound.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/dev-server/src/pages/NotFound.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk5vdEZvdW5kLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VMb2NhdGlvbiB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcblxuY29uc3QgTm90Rm91bmQgPSAoKSA9PiB7XG4gIGNvbnN0IGxvY2F0aW9uID0gdXNlTG9jYXRpb24oKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnNvbGUuZXJyb3IoXCI0MDQgRXJyb3I6IFVzZXIgYXR0ZW1wdGVkIHRvIGFjY2VzcyBub24tZXhpc3RlbnQgcm91dGU6XCIsIGxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgfSwgW2xvY2F0aW9uLnBhdGhuYW1lXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggbWluLWgtc2NyZWVuIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1ncmF5LTEwMFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICA8aDEgY2xhc3NOYW1lPVwibWItNCB0ZXh0LTR4bCBmb250LWJvbGRcIj40MDQ8L2gxPlxuICAgICAgICA8cCBjbGFzc05hbWU9XCJtYi00IHRleHQteGwgdGV4dC1ncmF5LTYwMFwiPk9vcHMhIFBhZ2Ugbm90IGZvdW5kPC9wPlxuICAgICAgICA8YSBocmVmPVwiL1wiIGNsYXNzTmFtZT1cInRleHQtYmx1ZS01MDAgdW5kZXJsaW5lIGhvdmVyOnRleHQtYmx1ZS03MDBcIj5cbiAgICAgICAgICBSZXR1cm4gdG8gSG9tZVxuICAgICAgICA8L2E+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE5vdEZvdW5kO1xuIl0sIm5hbWVzIjpbInVzZUxvY2F0aW9uIiwidXNlRWZmZWN0IiwiTm90Rm91bmQiLCJsb2NhdGlvbiIsImNvbnNvbGUiLCJlcnJvciIsInBhdGhuYW1lIiwiZGl2IiwiY2xhc3NOYW1lIiwiaDEiLCJwIiwiYSIsImhyZWYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLFdBQVcsUUFBUSxtQkFBbUI7QUFDL0MsU0FBU0MsU0FBUyxRQUFRLFFBQVE7QUFFbEMsTUFBTUMsV0FBVzs7SUFDZixNQUFNQyxXQUFXSDtJQUVqQkMsVUFBVTtRQUNSRyxRQUFRQyxLQUFLLENBQUMsMkRBQTJERixTQUFTRyxRQUFRO0lBQzVGLEdBQUc7UUFBQ0gsU0FBU0csUUFBUTtLQUFDO0lBRXRCLHFCQUNFLFFBQUNDO1FBQUlDLFdBQVU7a0JBQ2IsY0FBQSxRQUFDRDtZQUFJQyxXQUFVOzs4QkFDYixRQUFDQztvQkFBR0QsV0FBVTs4QkFBMEI7Ozs7Ozs4QkFDeEMsUUFBQ0U7b0JBQUVGLFdBQVU7OEJBQTZCOzs7Ozs7OEJBQzFDLFFBQUNHO29CQUFFQyxNQUFLO29CQUFJSixXQUFVOzhCQUE4Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNNUU7R0FsQk1OOztRQUNhRjs7O0tBRGJFO0FBb0JOLGVBQWVBLFNBQVMifQ==