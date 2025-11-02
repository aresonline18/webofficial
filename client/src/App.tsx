import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/App.tsx");import * as RefreshRuntime from "/@react-refresh";
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/dev-server/src/App.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}

import __vite__cjsImport2_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=7cbad96a"; const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsxDEV"];
import { Toaster } from "/src/components/ui/toaster.tsx";
import { Toaster as Sonner } from "/src/components/ui/sonner.tsx";
import { TooltipProvider } from "/src/components/ui/tooltip.tsx";
import { QueryClient, QueryClientProvider } from "/node_modules/.vite/deps/@tanstack_react-query.js?v=7cbad96a";
import { BrowserRouter, Routes, Route } from "/node_modules/.vite/deps/react-router-dom.js?v=7cbad96a";
import Index from "/src/pages/Index.tsx?t=1762102646243";
import PlaybookV2 from "/src/pages/PlaybookV2.tsx?t=1762102646244";
import NotFound from "/src/pages/NotFound.tsx";
import GitHubSync from "/src/pages/GitHubSync.tsx?t=1762103270265";
const queryClient = new QueryClient();
const App = ()=>/*#__PURE__*/ _jsxDEV(QueryClientProvider, {
        client: queryClient,
        children: /*#__PURE__*/ _jsxDEV(TooltipProvider, {
            children: [
                /*#__PURE__*/ _jsxDEV(Toaster, {}, void 0, false, {
                    fileName: "/dev-server/src/App.tsx",
                    lineNumber: 16,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ _jsxDEV(Sonner, {}, void 0, false, {
                    fileName: "/dev-server/src/App.tsx",
                    lineNumber: 17,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ _jsxDEV(BrowserRouter, {
                    children: /*#__PURE__*/ _jsxDEV(Routes, {
                        children: [
                            /*#__PURE__*/ _jsxDEV(Route, {
                                path: "/",
                                element: /*#__PURE__*/ _jsxDEV(Index, {}, void 0, false, {
                                    fileName: "/dev-server/src/App.tsx",
                                    lineNumber: 20,
                                    columnNumber: 36
                                }, void 0)
                            }, void 0, false, {
                                fileName: "/dev-server/src/App.tsx",
                                lineNumber: 20,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ _jsxDEV(Route, {
                                path: "/free-resources/shadow-pages-playbook-v2",
                                element: /*#__PURE__*/ _jsxDEV(PlaybookV2, {}, void 0, false, {
                                    fileName: "/dev-server/src/App.tsx",
                                    lineNumber: 21,
                                    columnNumber: 75
                                }, void 0)
                            }, void 0, false, {
                                fileName: "/dev-server/src/App.tsx",
                                lineNumber: 21,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ _jsxDEV(Route, {
                                path: "/admin/github-sync",
                                element: /*#__PURE__*/ _jsxDEV(GitHubSync, {}, void 0, false, {
                                    fileName: "/dev-server/src/App.tsx",
                                    lineNumber: 22,
                                    columnNumber: 53
                                }, void 0)
                            }, void 0, false, {
                                fileName: "/dev-server/src/App.tsx",
                                lineNumber: 22,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ _jsxDEV(Route, {
                                path: "*",
                                element: /*#__PURE__*/ _jsxDEV(NotFound, {}, void 0, false, {
                                    fileName: "/dev-server/src/App.tsx",
                                    lineNumber: 24,
                                    columnNumber: 36
                                }, void 0)
                            }, void 0, false, {
                                fileName: "/dev-server/src/App.tsx",
                                lineNumber: 24,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "/dev-server/src/App.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "/dev-server/src/App.tsx",
                    lineNumber: 18,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "/dev-server/src/App.tsx",
            lineNumber: 15,
            columnNumber: 5
        }, this)
    }, void 0, false, {
        fileName: "/dev-server/src/App.tsx",
        lineNumber: 14,
        columnNumber: 3
    }, this);
_c = App;
export default App;
var _c;
$RefreshReg$(_c, "App");


if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}


if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/dev-server/src/App.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/dev-server/src/App.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFwcC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVG9hc3RlciB9IGZyb20gXCJAL2NvbXBvbmVudHMvdWkvdG9hc3RlclwiO1xuaW1wb3J0IHsgVG9hc3RlciBhcyBTb25uZXIgfSBmcm9tIFwiQC9jb21wb25lbnRzL3VpL3Nvbm5lclwiO1xuaW1wb3J0IHsgVG9vbHRpcFByb3ZpZGVyIH0gZnJvbSBcIkAvY29tcG9uZW50cy91aS90b29sdGlwXCI7XG5pbXBvcnQgeyBRdWVyeUNsaWVudCwgUXVlcnlDbGllbnRQcm92aWRlciB9IGZyb20gXCJAdGFuc3RhY2svcmVhY3QtcXVlcnlcIjtcbmltcG9ydCB7IEJyb3dzZXJSb3V0ZXIsIFJvdXRlcywgUm91dGUgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xuaW1wb3J0IEluZGV4IGZyb20gXCIuL3BhZ2VzL0luZGV4XCI7XG5pbXBvcnQgUGxheWJvb2tWMiBmcm9tIFwiLi9wYWdlcy9QbGF5Ym9va1YyXCI7XG5pbXBvcnQgTm90Rm91bmQgZnJvbSBcIi4vcGFnZXMvTm90Rm91bmRcIjtcbmltcG9ydCBHaXRIdWJTeW5jIGZyb20gXCIuL3BhZ2VzL0dpdEh1YlN5bmNcIjtcblxuY29uc3QgcXVlcnlDbGllbnQgPSBuZXcgUXVlcnlDbGllbnQoKTtcblxuY29uc3QgQXBwID0gKCkgPT4gKFxuICA8UXVlcnlDbGllbnRQcm92aWRlciBjbGllbnQ9e3F1ZXJ5Q2xpZW50fT5cbiAgICA8VG9vbHRpcFByb3ZpZGVyPlxuICAgICAgPFRvYXN0ZXIgLz5cbiAgICAgIDxTb25uZXIgLz5cbiAgICAgIDxCcm93c2VyUm91dGVyPlxuICAgICAgICA8Um91dGVzPlxuICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL1wiIGVsZW1lbnQ9ezxJbmRleCAvPn0gLz5cbiAgICAgICAgICA8Um91dGUgcGF0aD1cIi9mcmVlLXJlc291cmNlcy9zaGFkb3ctcGFnZXMtcGxheWJvb2stdjJcIiBlbGVtZW50PXs8UGxheWJvb2tWMiAvPn0gLz5cbiAgICAgICAgICA8Um91dGUgcGF0aD1cIi9hZG1pbi9naXRodWItc3luY1wiIGVsZW1lbnQ9ezxHaXRIdWJTeW5jIC8+fSAvPlxuICAgICAgICAgIHsvKiBBREQgQUxMIENVU1RPTSBST1VURVMgQUJPVkUgVEhFIENBVENILUFMTCBcIipcIiBST1VURSAqL31cbiAgICAgICAgICA8Um91dGUgcGF0aD1cIipcIiBlbGVtZW50PXs8Tm90Rm91bmQgLz59IC8+XG4gICAgICAgIDwvUm91dGVzPlxuICAgICAgPC9Ccm93c2VyUm91dGVyPlxuICAgIDwvVG9vbHRpcFByb3ZpZGVyPlxuICA8L1F1ZXJ5Q2xpZW50UHJvdmlkZXI+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBBcHA7XG4iXSwibmFtZXMiOlsiVG9hc3RlciIsIlNvbm5lciIsIlRvb2x0aXBQcm92aWRlciIsIlF1ZXJ5Q2xpZW50IiwiUXVlcnlDbGllbnRQcm92aWRlciIsIkJyb3dzZXJSb3V0ZXIiLCJSb3V0ZXMiLCJSb3V0ZSIsIkluZGV4IiwiUGxheWJvb2tWMiIsIk5vdEZvdW5kIiwiR2l0SHViU3luYyIsInF1ZXJ5Q2xpZW50IiwiQXBwIiwiY2xpZW50IiwicGF0aCIsImVsZW1lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBU0EsT0FBTyxRQUFRLDBCQUEwQjtBQUNsRCxTQUFTQSxXQUFXQyxNQUFNLFFBQVEseUJBQXlCO0FBQzNELFNBQVNDLGVBQWUsUUFBUSwwQkFBMEI7QUFDMUQsU0FBU0MsV0FBVyxFQUFFQyxtQkFBbUIsUUFBUSx3QkFBd0I7QUFDekUsU0FBU0MsYUFBYSxFQUFFQyxNQUFNLEVBQUVDLEtBQUssUUFBUSxtQkFBbUI7QUFDaEUsT0FBT0MsV0FBVyxnQkFBZ0I7QUFDbEMsT0FBT0MsZ0JBQWdCLHFCQUFxQjtBQUM1QyxPQUFPQyxjQUFjLG1CQUFtQjtBQUN4QyxPQUFPQyxnQkFBZ0IscUJBQXFCO0FBRTVDLE1BQU1DLGNBQWMsSUFBSVQ7QUFFeEIsTUFBTVUsTUFBTSxrQkFDVixRQUFDVDtRQUFvQlUsUUFBUUY7a0JBQzNCLGNBQUEsUUFBQ1Y7OzhCQUNDLFFBQUNGOzs7Ozs4QkFDRCxRQUFDQzs7Ozs7OEJBQ0QsUUFBQ0k7OEJBQ0MsY0FBQSxRQUFDQzs7MENBQ0MsUUFBQ0M7Z0NBQU1RLE1BQUs7Z0NBQUlDLHVCQUFTLFFBQUNSOzs7Ozs7Ozs7OzBDQUMxQixRQUFDRDtnQ0FBTVEsTUFBSztnQ0FBMkNDLHVCQUFTLFFBQUNQOzs7Ozs7Ozs7OzBDQUNqRSxRQUFDRjtnQ0FBTVEsTUFBSztnQ0FBcUJDLHVCQUFTLFFBQUNMOzs7Ozs7Ozs7OzBDQUUzQyxRQUFDSjtnQ0FBTVEsTUFBSztnQ0FBSUMsdUJBQVMsUUFBQ047Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBWDlCRztBQWtCTixlQUFlQSxJQUFJIn0=