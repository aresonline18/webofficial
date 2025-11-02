import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/StickyCTA.tsx");import * as RefreshRuntime from "/@react-refresh";
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/dev-server/src/components/StickyCTA.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}

import __vite__cjsImport2_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=31a0896c"; const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsxDEV"];
var _s = $RefreshSig$();
import { useUrlParams } from "/src/hooks/useUrlParams.ts";
export default function StickyCTA() {
    _s();
    const { hasParam, getParam } = useUrlParams();
    const utmCampaign = getParam('utm_campaign');
    const utmMedium = getParam('utm_medium');
    // Determine if this is the female version
    const isFemaleVersion = utmCampaign === 'playbook-f';
    // Set color based on version
    const buttonColor = isFemaleVersion ? 'linear-gradient(to bottom, #EC4899, #BE185D)' // Female version - pink gradient
     : '#385dc6'; // Normal version - blue
    const handleCallBooking = ()=>{
        // Check if we're on the home page
        const isHomePage = window.location.pathname === '/' || window.location.pathname === '/home';
        if (isHomePage) {
            // Home page - use home-page UTM source with resource tracking
            const trackedResources = JSON.parse(localStorage.getItem('trackedResources') || '[]');
            const lastResource = trackedResources.length > 0 ? trackedResources[trackedResources.length - 1] : 'no-resource-read';
            const resourceSlug = lastResource === 'no-resource-read' ? 'no-resource-read' : lastResource.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-').substring(0, 50);
            let url = `https://calendly.com/shadow-pages/booking-a?utm_source=home-page&utm_campaign=${resourceSlug}`;
            if (utmMedium) {
                url += `&utm_medium=${encodeURIComponent(utmMedium)}`;
            }
            window.open(url, '_blank');
        } else {
            // Other pages - use same Calendly URL as ResourceApplyNowButton
            let url = `https://calendly.com/shadow-pages/booking-a?utm_source=free-resource&utm_campaign=shadow-pages-playbook`;
            if (utmMedium) {
                url += `&utm_medium=${encodeURIComponent(utmMedium)}`;
            }
            window.open(url, '_blank');
        }
    };
    // Hide CTA if utm_campaign parameter exists (user came from marketing campaign)
    if (hasParam('utm_campaign')) {
        return null;
    }
    return /*#__PURE__*/ _jsxDEV("div", {
        className: "hidden md:fixed md:bottom-5 md:right-5 md:z-50",
        children: /*#__PURE__*/ _jsxDEV("button", {
            onClick: handleCallBooking,
            className: "text-white px-6 py-3 rounded-lg text-sm transition-colors duration-200 shadow-lg hover:shadow-xl hover:opacity-90",
            style: {
                background: buttonColor,
                fontWeight: 900
            },
            children: "Book Your 1-1 Call"
        }, void 0, false, {
            fileName: "/dev-server/src/components/StickyCTA.tsx",
            lineNumber: 53,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "/dev-server/src/components/StickyCTA.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_s(StickyCTA, "8uga7MUdrWjri2DL0Bxzagy9kvo=", false, function() {
    return [
        useUrlParams
    ];
});
_c = StickyCTA;
var _c;
$RefreshReg$(_c, "StickyCTA");


if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}


if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/dev-server/src/components/StickyCTA.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/dev-server/src/components/StickyCTA.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlN0aWNreUNUQS50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlVXJsUGFyYW1zIH0gZnJvbSAnQC9ob29rcy91c2VVcmxQYXJhbXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTdGlja3lDVEEoKSB7XG4gIGNvbnN0IHsgaGFzUGFyYW0sIGdldFBhcmFtIH0gPSB1c2VVcmxQYXJhbXMoKTtcbiAgY29uc3QgdXRtQ2FtcGFpZ24gPSBnZXRQYXJhbSgndXRtX2NhbXBhaWduJyk7XG4gIGNvbnN0IHV0bU1lZGl1bSA9IGdldFBhcmFtKCd1dG1fbWVkaXVtJyk7XG4gIFxuICAvLyBEZXRlcm1pbmUgaWYgdGhpcyBpcyB0aGUgZmVtYWxlIHZlcnNpb25cbiAgY29uc3QgaXNGZW1hbGVWZXJzaW9uID0gdXRtQ2FtcGFpZ24gPT09ICdwbGF5Ym9vay1mJztcbiAgXG4gIC8vIFNldCBjb2xvciBiYXNlZCBvbiB2ZXJzaW9uXG4gIGNvbnN0IGJ1dHRvbkNvbG9yID0gaXNGZW1hbGVWZXJzaW9uIFxuICAgID8gJ2xpbmVhci1ncmFkaWVudCh0byBib3R0b20sICNFQzQ4OTksICNCRTE4NUQpJyAvLyBGZW1hbGUgdmVyc2lvbiAtIHBpbmsgZ3JhZGllbnRcbiAgICA6ICcjMzg1ZGM2JzsgLy8gTm9ybWFsIHZlcnNpb24gLSBibHVlXG5cbiAgY29uc3QgaGFuZGxlQ2FsbEJvb2tpbmcgPSAoKSA9PiB7XG4gICAgLy8gQ2hlY2sgaWYgd2UncmUgb24gdGhlIGhvbWUgcGFnZVxuICAgIGNvbnN0IGlzSG9tZVBhZ2UgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvJyB8fCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvaG9tZSc7XG4gICAgXG4gICAgaWYgKGlzSG9tZVBhZ2UpIHtcbiAgICAgIC8vIEhvbWUgcGFnZSAtIHVzZSBob21lLXBhZ2UgVVRNIHNvdXJjZSB3aXRoIHJlc291cmNlIHRyYWNraW5nXG4gICAgICBjb25zdCB0cmFja2VkUmVzb3VyY2VzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndHJhY2tlZFJlc291cmNlcycpIHx8ICdbXScpO1xuICAgICAgY29uc3QgbGFzdFJlc291cmNlID0gdHJhY2tlZFJlc291cmNlcy5sZW5ndGggPiAwID8gdHJhY2tlZFJlc291cmNlc1t0cmFja2VkUmVzb3VyY2VzLmxlbmd0aCAtIDFdIDogJ25vLXJlc291cmNlLXJlYWQnO1xuICAgICAgXG4gICAgICBjb25zdCByZXNvdXJjZVNsdWcgPSBsYXN0UmVzb3VyY2UgPT09ICduby1yZXNvdXJjZS1yZWFkJyA/ICduby1yZXNvdXJjZS1yZWFkJyA6IGxhc3RSZXNvdXJjZVxuICAgICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgICAucmVwbGFjZSgvW15hLXowLTlcXHNdL2csICcnKVxuICAgICAgICAucmVwbGFjZSgvXFxzKy9nLCAnLScpXG4gICAgICAgIC5zdWJzdHJpbmcoMCwgNTApO1xuICAgICAgXG4gICAgICBsZXQgdXJsID0gYGh0dHBzOi8vY2FsZW5kbHkuY29tL3NoYWRvdy1wYWdlcy9ib29raW5nLWE/dXRtX3NvdXJjZT1ob21lLXBhZ2UmdXRtX2NhbXBhaWduPSR7cmVzb3VyY2VTbHVnfWA7XG4gICAgICBpZiAodXRtTWVkaXVtKSB7XG4gICAgICAgIHVybCArPSBgJnV0bV9tZWRpdW09JHtlbmNvZGVVUklDb21wb25lbnQodXRtTWVkaXVtKX1gO1xuICAgICAgfVxuICAgICAgd2luZG93Lm9wZW4odXJsLCAnX2JsYW5rJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE90aGVyIHBhZ2VzIC0gdXNlIHNhbWUgQ2FsZW5kbHkgVVJMIGFzIFJlc291cmNlQXBwbHlOb3dCdXR0b25cbiAgICAgIGxldCB1cmwgPSBgaHR0cHM6Ly9jYWxlbmRseS5jb20vc2hhZG93LXBhZ2VzL2Jvb2tpbmctYT91dG1fc291cmNlPWZyZWUtcmVzb3VyY2UmdXRtX2NhbXBhaWduPXNoYWRvdy1wYWdlcy1wbGF5Ym9va2A7XG4gICAgICBpZiAodXRtTWVkaXVtKSB7XG4gICAgICAgIHVybCArPSBgJnV0bV9tZWRpdW09JHtlbmNvZGVVUklDb21wb25lbnQodXRtTWVkaXVtKX1gO1xuICAgICAgfVxuICAgICAgd2luZG93Lm9wZW4odXJsLCAnX2JsYW5rJyk7XG4gICAgfVxuICB9O1xuXG4gIC8vIEhpZGUgQ1RBIGlmIHV0bV9jYW1wYWlnbiBwYXJhbWV0ZXIgZXhpc3RzICh1c2VyIGNhbWUgZnJvbSBtYXJrZXRpbmcgY2FtcGFpZ24pXG4gIGlmIChoYXNQYXJhbSgndXRtX2NhbXBhaWduJykpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJoaWRkZW4gbWQ6Zml4ZWQgbWQ6Ym90dG9tLTUgbWQ6cmlnaHQtNSBtZDp6LTUwXCI+XG4gICAgICA8YnV0dG9uIFxuICAgICAgICBvbkNsaWNrPXtoYW5kbGVDYWxsQm9va2luZ31cbiAgICAgICAgY2xhc3NOYW1lPVwidGV4dC13aGl0ZSBweC02IHB5LTMgcm91bmRlZC1sZyB0ZXh0LXNtIHRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTIwMCBzaGFkb3ctbGcgaG92ZXI6c2hhZG93LXhsIGhvdmVyOm9wYWNpdHktOTBcIlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIGJhY2tncm91bmQ6IGJ1dHRvbkNvbG9yLFxuICAgICAgICAgIGZvbnRXZWlnaHQ6IDkwMFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICBCb29rIFlvdXIgMS0xIENhbGxcbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sIm5hbWVzIjpbInVzZVVybFBhcmFtcyIsIlN0aW