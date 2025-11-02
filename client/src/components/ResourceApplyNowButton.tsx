import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/ResourceApplyNowButton.tsx");import * as RefreshRuntime from "/@react-refresh";
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/dev-server/src/components/ResourceApplyNowButton.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}

import __vite__cjsImport2_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=05bfcbca"; const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsxDEV"];
var _s = $RefreshSig$();
import { useUrlParams } from "/src/hooks/useUrlParams.ts";
export default function ResourceApplyNowButton({ resourceName, className, children, style, onClick, utmTerm }) {
    _s();
    const { getParam } = useUrlParams();
    const utmMedium = getParam('utm_medium');
    const handleClick = ()=>{
        // Create resource-specific UTM campaign from resource name
        const resourceSlug = resourceName.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-').substring(0, 50);
        // Build URL with UTM parameters, including utm_term if provided
        let url = `https://calendly.com/shadow-pages/booking-a?utm_source=free-resource&utm_campaign=${resourceSlug}`;
        if (utmMedium) {
            url += `&utm_medium=${encodeURIComponent(utmMedium)}`;
        }
        if (utmTerm) {
            url += `&utm_term=${encodeURIComponent(utmTerm)}`;
        }
        // Open in new tab
        window.open(url, '_blank', 'noopener,noreferrer');
        // Call optional onClick callback
        if (onClick) {
            onClick();
        }
    };
    return /*#__PURE__*/ _jsxDEV("button", {
        onClick: handleClick,
        className: className,
        style: style,
        children: children || 'Apply Now'
    }, void 0, false, {
        fileName: "/dev-server/src/components/ResourceApplyNowButton.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_s(ResourceApplyNowButton, "aCuDZbNQL1plh3SjBPmA/EWgUsU=", false, function() {
    return [
        useUrlParams
    ];
});
_c = ResourceApplyNowButton;
var _c;
$RefreshReg$(_c, "ResourceApplyNowButton");


if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}


if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/dev-server/src/components/ResourceApplyNowButton.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/dev-server/src/components/ResourceApplyNowButton.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlc291cmNlQXBwbHlOb3dCdXR0b24udHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVVybFBhcmFtcyB9IGZyb20gJ0AvaG9va3MvdXNlVXJsUGFyYW1zJztcblxuaW50ZXJmYWNlIFJlc291cmNlQXBwbHlOb3dCdXR0b25Qcm9wcyB7XG4gIHJlc291cmNlTmFtZTogc3RyaW5nO1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIGNoaWxkcmVuPzogUmVhY3QuUmVhY3ROb2RlO1xuICBzdHlsZT86IFJlYWN0LkNTU1Byb3BlcnRpZXM7XG4gIG9uQ2xpY2s/OiAoKSA9PiB2b2lkO1xuICB1dG1UZXJtPzogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZXNvdXJjZUFwcGx5Tm93QnV0dG9uKHsgXG4gIHJlc291cmNlTmFtZSwgXG4gIGNsYXNzTmFtZSwgXG4gIGNoaWxkcmVuLCBcbiAgc3R5bGUsXG4gIG9uQ2xpY2ssXG4gIHV0bVRlcm0gXG59OiBSZXNvdXJjZUFwcGx5Tm93QnV0dG9uUHJvcHMpIHtcbiAgY29uc3QgeyBnZXRQYXJhbSB9ID0gdXNlVXJsUGFyYW1zKCk7XG4gIGNvbnN0IHV0bU1lZGl1bSA9IGdldFBhcmFtKCd1dG1fbWVkaXVtJyk7XG4gIFxuICBjb25zdCBoYW5kbGVDbGljayA9ICgpID0+IHtcbiAgICAvLyBDcmVhdGUgcmVzb3VyY2Utc3BlY2lmaWMgVVRNIGNhbXBhaWduIGZyb20gcmVzb3VyY2UgbmFtZVxuICAgIGNvbnN0IHJlc291cmNlU2x1ZyA9IHJlc291cmNlTmFtZVxuICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgIC5yZXBsYWNlKC9bXmEtejAtOVxcc10vZywgJycpXG4gICAgICAucmVwbGFjZSgvXFxzKy9nLCAnLScpXG4gICAgICAuc3Vic3RyaW5nKDAsIDUwKTtcbiAgICBcbiAgICAvLyBCdWlsZCBVUkwgd2l0aCBVVE0gcGFyYW1ldGVycywgaW5jbHVkaW5nIHV0bV90ZXJtIGlmIHByb3ZpZGVkXG4gICAgbGV0IHVybCA9IGBodHRwczovL2NhbGVuZGx5LmNvbS9zaGFkb3ctcGFnZXMvYm9va2luZy1hP3V0bV9zb3VyY2U9ZnJlZS1yZXNvdXJjZSZ1dG1fY2FtcGFpZ249JHtyZXNvdXJjZVNsdWd9YDtcbiAgICBpZiAodXRtTWVkaXVtKSB7XG4gICAgICB1cmwgKz0gYCZ1dG1fbWVkaXVtPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHV0bU1lZGl1bSl9YDtcbiAgICB9XG4gICAgaWYgKHV0bVRlcm0pIHtcbiAgICAgIHVybCArPSBgJnV0bV90ZXJtPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHV0bVRlcm0pfWA7XG4gICAgfVxuICAgIFxuICAgIC8vIE9wZW4gaW4gbmV3IHRhYlxuICAgIHdpbmRvdy5vcGVuKHVybCwgJ19ibGFuaycsICdub29wZW5lcixub3JlZmVycmVyJyk7XG4gICAgXG4gICAgLy8gQ2FsbCBvcHRpb25hbCBvbkNsaWNrIGNhbGxiYWNrXG4gICAgaWYgKG9uQ2xpY2spIHtcbiAgICAgIG9uQ2xpY2soKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8YnV0dG9uIFxuICAgICAgb25DbGljaz17aGFuZGxlQ2xpY2t9XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICA+XG4gICAgICB7Y2hpbGRyZW4gfHwgJ0FwcGx5IE5vdyd9XG4gICAgPC9idXR0b24+XG4gICk7XG59XG4iXSwibmFtZXMiOlsidXNlVXJsUGFyYW1zIiwiUmVzb3VyY2VBcHBseU5vd0J1dHRvbiIsInJlc291cmNlTmFtZSIsImNsYXNzTmFtZSIsImNoaWxkcmVuIiwic3R5bGUiLCJvbkNsaWNrIiwidXRtVGVybSIsImdldFBhcmFtIiwidXRtTWVkaXVtIiwiaGFuZGxlQ2xpY2siLCJyZXNvdXJjZVNsdWciLCJ0b0xvd2VyQ2FzZSIsInJlcGxhY2UiLCJzdWJzdHJpbmciLCJ1cmwiLCJlbmNvZGVVUklDb21wb25lbnQiLCJ3aW5kb3ciLCJvcGVuIiwiYnV0dG9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxTQUFTQSxZQUFZLFFBQVEsdUJBQXVCO0FBV3BELGVBQWUsU0FBU0MsdUJBQXVCLEVBQzdDQyxZQUFZLEVBQ1pDLFNBQVMsRUFDVEMsUUFBUSxFQUNSQyxLQUFLLEVBQ0xDLE9BQU8sRUFDUEMsT0FBTyxFQUNxQjs7SUFDNUIsTUFBTSxFQUFFQyxRQUFRLEVBQUUsR0FBR1I7SUFDckIsTUFBTVMsWUFBWUQsU0FBUztJQUUzQixNQUFNRSxjQUFjO1FBQ2xCLDJEQUEyRDtRQUMzRCxNQUFNQyxlQUFlVCxhQUNsQlUsV0FBVyxHQUNYQyxPQUFPLENBQUMsZ0JBQWdCLElBQ3hCQSxPQUFPLENBQUMsUUFBUSxLQUNoQkMsU0FBUyxDQUFDLEdBQUc7UUFFaEIsZ0VBQWdFO1FBQ2hFLElBQUlDLE1BQU0sQ0FBQyxrRkFBa0YsRUFBRUosY0FBYztRQUM3RyxJQUFJRixXQUFXO1lBQ2JNLE9BQU8sQ0FBQyxZQUFZLEVBQUVDLG1CQUFtQlAsWUFBWTtRQUN2RDtRQUNBLElBQUlGLFNBQVM7WUFDWFEsT0FBTyxDQUFDLFVBQVUsRUFBRUMsbUJBQW1CVCxVQUFVO1FBQ25EO1FBRUEsa0JBQWtCO1FBQ2xCVSxPQUFPQyxJQUFJLENBQUNILEtBQUssVUFBVTtRQUUzQixpQ0FBaUM7UUFDakMsSUFBSVQsU0FBUztZQUNYQTtRQUNGO0lBQ0Y7SUFFQSxxQkFDRSxRQUFDYTtRQUNDYixTQUFTSTtRQUNUUCxXQUFXQTtRQUNYRSxPQUFPQTtrQkFFTkQsWUFBWTs7Ozs7O0FBR25CO0dBOUN3Qkg7O1FBUUREOzs7S0FSQ0MifQ==