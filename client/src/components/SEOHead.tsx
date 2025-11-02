import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/SEOHead.tsx");import * as RefreshRuntime from "/@react-refresh";
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/dev-server/src/components/SEOHead.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}

var _s = $RefreshSig$();
import __vite__cjsImport2_react from "/node_modules/.vite/deps/react.js?v=7cbad96a"; const useEffect = __vite__cjsImport2_react["useEffect"];
export default function SEOHead({ title, description, keywords, ogTitle, ogDescription, canonical, structuredData }) {
    _s();
    useEffect(()=>{
        // Update title
        document.title = title;
        // Update meta tags
        const updateMetaTag = (name, content)=>{
            let element = document.querySelector(`meta[name="${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('name', name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };
        const updatePropertyTag = (property, content)=>{
            let element = document.querySelector(`meta[property="${property}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('property', property);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };
        updateMetaTag('description', description);
        if (keywords) updateMetaTag('keywords', keywords);
        updatePropertyTag('og:title', ogTitle || title);
        updatePropertyTag('og:description', ogDescription || description);
        // Add canonical link
        if (canonical) {
            let linkElement = document.querySelector('link[rel="canonical"]');
            if (!linkElement) {
                linkElement = document.createElement('link');
                linkElement.setAttribute('rel', 'canonical');
                document.head.appendChild(linkElement);
            }
            linkElement.href = canonical;
        }
        // Add structured data
        if (structuredData) {
            let scriptElement = document.querySelector('script[type="application/ld+json"]');
            if (!scriptElement) {
                scriptElement = document.createElement('script');
                scriptElement.setAttribute('type', 'application/ld+json');
                document.head.appendChild(scriptElement);
            }
            scriptElement.textContent = JSON.stringify(structuredData);
        }
    }, [
        title,
        description,
        keywords,
        ogTitle,
        ogDescription,
        canonical,
        structuredData
    ]);
    return null;
}
_s(SEOHead, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = SEOHead;
var _c;
$RefreshReg$(_c, "SEOHead");


if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}


if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/dev-server/src/components/SEOHead.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/dev-server/src/components/SEOHead.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNFT0hlYWQudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcblxuaW50ZXJmYWNlIFNFT0hlYWRQcm9wcyB7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGtleXdvcmRzPzogc3RyaW5nO1xuICBvZ1RpdGxlPzogc3RyaW5nO1xuICBvZ0Rlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBjYW5vbmljYWw/OiBzdHJpbmc7XG4gIGNvbnRlbnRUeXBlPzogc3RyaW5nO1xuICBzdHJ1Y3R1cmVkRGF0YT86IGFueTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU0VPSGVhZCh7XG4gIHRpdGxlLFxuICBkZXNjcmlwdGlvbixcbiAga2V5d29yZHMsXG4gIG9nVGl0bGUsXG4gIG9nRGVzY3JpcHRpb24sXG4gIGNhbm9uaWNhbCxcbiAgc3RydWN0dXJlZERhdGFcbn06IFNFT0hlYWRQcm9wcykge1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIC8vIFVwZGF0ZSB0aXRsZVxuICAgIGRvY3VtZW50LnRpdGxlID0gdGl0bGU7XG5cbiAgICAvLyBVcGRhdGUgbWV0YSB0YWdzXG4gICAgY29uc3QgdXBkYXRlTWV0YVRhZyA9IChuYW1lOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZykgPT4ge1xuICAgICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBtZXRhW25hbWU9XCIke25hbWV9XCJdYCk7XG4gICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21ldGEnKTtcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBuYW1lKTtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgIH1cbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdjb250ZW50JywgY29udGVudCk7XG4gICAgfTtcblxuICAgIGNvbnN0IHVwZGF0ZVByb3BlcnR5VGFnID0gKHByb3BlcnR5OiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZykgPT4ge1xuICAgICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBtZXRhW3Byb3BlcnR5PVwiJHtwcm9wZXJ0eX1cIl1gKTtcbiAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbWV0YScpO1xuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgncHJvcGVydHknLCBwcm9wZXJ0eSk7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICB9XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnY29udGVudCcsIGNvbnRlbnQpO1xuICAgIH07XG5cbiAgICB1cGRhdGVNZXRhVGFnKCdkZXNjcmlwdGlvbicsIGRlc2NyaXB0aW9uKTtcbiAgICBpZiAoa2V5d29yZHMpIHVwZGF0ZU1ldGFUYWcoJ2tleXdvcmRzJywga2V5d29yZHMpO1xuICAgIFxuICAgIHVwZGF0ZVByb3BlcnR5VGFnKCdvZzp0aXRsZScsIG9nVGl0bGUgfHwgdGl0bGUpO1xuICAgIHVwZGF0ZVByb3BlcnR5VGFnKCdvZzpkZXNjcmlwdGlvbicsIG9nRGVzY3JpcHRpb24gfHwgZGVzY3JpcHRpb24pO1xuXG4gICAgLy8gQWRkIGNhbm9uaWNhbCBsaW5rXG4gICAgaWYgKGNhbm9uaWNhbCkge1xuICAgICAgbGV0IGxpbmtFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbGlua1tyZWw9XCJjYW5vbmljYWxcIl0nKSBhcyBIVE1MTGlua0VsZW1lbnQ7XG4gICAgICBpZiAoIWxpbmtFbGVtZW50KSB7XG4gICAgICAgIGxpbmtFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgICAgICBsaW5rRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JlbCcsICdjYW5vbmljYWwnKTtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChsaW5rRWxlbWVudCk7XG4gICAgICB9XG4gICAgICBsaW5rRWxlbWVudC5ocmVmID0gY2Fub25pY2FsO1xuICAgIH1cblxuICAgIC8vIEFkZCBzdHJ1Y3R1cmVkIGRhdGFcbiAgICBpZiAoc3RydWN0dXJlZERhdGEpIHtcbiAgICAgIGxldCBzY3JpcHRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc2NyaXB0W3R5cGU9XCJhcHBsaWNhdGlvbi9sZCtqc29uXCJdJyk7XG4gICAgICBpZiAoIXNjcmlwdEVsZW1lbnQpIHtcbiAgICAgICAgc2NyaXB0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBzY3JpcHRFbGVtZW50LnNldEF0dHJpYnV0ZSgndHlwZScsICdhcHBsaWNhdGlvbi9sZCtqc29uJyk7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0RWxlbWVudCk7XG4gICAgICB9XG4gICAgICBzY3JpcHRFbGVtZW50LnRleHRDb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoc3RydWN0dXJlZERhdGEpO1xuICAgIH1cbiAgfSwgW3RpdGxlLCBkZXNjcmlwdGlvbiwga2V5d29yZHMsIG9nVGl0bGUsIG9nRGVzY3JpcHRpb24sIGNhbm9uaWNhbCwgc3RydWN0dXJlZERhdGFdKTtcblxuICByZXR1cm4gbnVsbDtcbn1cbiJdLCJuYW1lcyI6WyJ1c2VFZmZlY3QiLCJTRU9IZWFkIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsImtleXdvcmRzIiwib2dUaXRsZSIsIm9nRGVzY3JpcHRpb24iLCJjYW5vbmljYWwiLCJzdHJ1Y3R1cmVkRGF0YSIsImRvY3VtZW50IiwidXBkYXRlTWV0YVRhZyIsIm5hbWUiLCJjb250ZW50IiwiZWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiaGVhZCIsImFwcGVuZENoaWxkIiwidXBkYXRlUHJvcGVydHlUYWciLCJwcm9wZXJ0eSIsImxpbmtFbGVtZW50IiwiaHJlZiIsInNjcmlwdEVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsIkpTT04iLCJzdHJpbmdpZnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBU0EsU0FBUyxRQUFRLFFBQVE7QUFhbEMsZUFBZSxTQUFTQyxRQUFRLEVBQzlCQyxLQUFLLEVBQ0xDLFdBQVcsRUFDWEMsUUFBUSxFQUNSQyxPQUFPLEVBQ1BDLGFBQWEsRUFDYkMsU0FBUyxFQUNUQyxjQUFjLEVBQ0Q7O0lBQ2JSLFVBQVU7UUFDUixlQUFlO1FBQ2ZTLFNBQVNQLEtBQUssR0FBR0E7UUFFakIsbUJBQW1CO1FBQ25CLE1BQU1RLGdCQUFnQixDQUFDQyxNQUFjQztZQUNuQyxJQUFJQyxVQUFVSixTQUFTSyxhQUFhLENBQUMsQ0FBQyxXQUFXLEVBQUVILEtBQUssRUFBRSxDQUFDO1lBQzNELElBQUksQ0FBQ0UsU0FBUztnQkFDWkEsVUFBVUosU0FBU00sYUFBYSxDQUFDO2dCQUNqQ0YsUUFBUUcsWUFBWSxDQUFDLFFBQVFMO2dCQUM3QkYsU0FBU1EsSUFBSSxDQUFDQyxXQUFXLENBQUNMO1lBQzVCO1lBQ0FBLFFBQVFHLFlBQVksQ0FBQyxXQUFXSjtRQUNsQztRQUVBLE1BQU1PLG9CQUFvQixDQUFDQyxVQUFrQlI7WUFDM0MsSUFBSUMsVUFBVUosU0FBU0ssYUFBYSxDQUFDLENBQUMsZUFBZSxFQUFFTSxTQUFTLEVBQUUsQ0FBQztZQUNuRSxJQUFJLENBQUNQLFNBQVM7Z0JBQ1pBLFVBQVVKLFNBQVNNLGFBQWEsQ0FBQztnQkFDakNGLFFBQVFHLFlBQVksQ0FBQyxZQUFZSTtnQkFDakNYLFNBQVNRLElBQUksQ0FBQ0MsV0FBVyxDQUFDTDtZQUM1QjtZQUNBQSxRQUFRRyxZQUFZLENBQUMsV0FBV0o7UUFDbEM7UUFFQUYsY0FBYyxlQUFlUDtRQUM3QixJQUFJQyxVQUFVTSxjQUFjLFlBQVlOO1FBRXhDZSxrQkFBa0IsWUFBWWQsV0FBV0g7UUFDekNpQixrQkFBa0Isa0JBQWtCYixpQkFBaUJIO1FBRXJELHFCQUFxQjtRQUNyQixJQUFJSSxXQUFXO1lBQ2IsSUFBSWMsY0FBY1osU0FBU0ssYUFBYSxDQUFDO1lBQ3pDLElBQUksQ0FBQ08sYUFBYTtnQkFDaEJBLGNBQWNaLFNBQVNNLGFBQWEsQ0FBQztnQkFDckNNLFlBQVlMLFlBQVksQ0FBQyxPQUFPO2dCQUNoQ1AsU0FBU1EsSUFBSSxDQUFDQyxXQUFXLENBQUNHO1lBQzVCO1lBQ0FBLFlBQVlDLElBQUksR0FBR2Y7UUFDckI7UUFFQSxzQkFBc0I7UUFDdEIsSUFBSUMsZ0JBQWdCO1lBQ2xCLElBQUllLGdCQUFnQmQsU0FBU0ssYUFBYSxDQUFDO1lBQzNDLElBQUksQ0FBQ1MsZUFBZTtnQkFDbEJBLGdCQUFnQmQsU0FBU00sYUFBYSxDQUFDO2dCQUN2Q1EsY0FBY1AsWUFBWSxDQUFDLFFBQVE7Z0JBQ25DUCxTQUFTUSxJQUFJLENBQUNDLFdBQVcsQ0FBQ0s7WUFDNUI7WUFDQUEsY0FBY0MsV0FBVyxHQUFHQyxLQUFLQyxTQUFTLENBQUNsQjtRQUM3QztJQUNGLEdBQUc7UUFBQ047UUFBT0M7UUFBYUM7UUFBVUM7UUFBU0M7UUFBZUM7UUFBV0M7S0FBZTtJQUVwRixPQUFPO0FBQ1Q7R0FoRXdCUDtLQUFBQSJ9