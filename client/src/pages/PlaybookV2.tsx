import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/PlaybookV2.tsx");import * as RefreshRuntime from "/@react-refresh";
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/dev-server/src/pages/PlaybookV2.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}

import __vite__cjsImport2_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=05bfcbca"; const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsxDEV"];
var _s = $RefreshSig$();
import StickyCTA from "/src/components/StickyCTA.tsx";
import SEOHead from "/src/components/SEOHead.tsx";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "/src/components/ui/accordion.tsx";
import { useUrlParams } from "/src/hooks/useUrlParams.ts";
import forbesImage from "/src/assets/forbes.png?import";
import daquanImage from "/src/assets/daquan.png?import";
import goldmanImage from "/src/assets/goldman-sachs.png?import";
import shadowPagesExamplesImage from "/src/assets/shadow-page-examples.png?import";
import ericRevenueImage from "/src/assets/eric-revenue-chart.png?import";
import glowupAcademyProfile from "/src/assets/glowup-academy-profile.png?import";
import boysGlowupProfile from "/src/assets/boys-glowup-profile.png?import";
import amelieProfileImage from "/src/assets/amelie-profile-new.png?import";
import jeppeNewImage from "/src/assets/jeppe-new.svg?import";
export default function PlaybookV2() {
    _s();
    const { hasParam } = useUrlParams();
    const showCTAButtons = hasParam('utm_campaign');
    return /*#__PURE__*/ _jsxDEV("div", {
        className: "bg-white min-h-screen",
        children: [
            /*#__PURE__*/ _jsxDEV(SEOHead, {
                title: "Shadow Pages Playbook - Complete Guide to Start, Run and Profit from Shadow Pages",
                description: "Complete step-by-step guide to start, run and profit from Shadow Pages. Learn Instagram business strategies, faceless marketing, and social media monetization.",
                keywords: "Shadow Pages Playbook, shadow pages guide, instagram business, faceless marketing, social media monetization, Shadow Pages strategy, instagram growth, digital marketing guide",
                ogTitle: "Shadow Pages Playbook - Complete Guide",
                ogDescription: "Complete step-by-step guide to start, run and profit from Shadow Pages. Learn Instagram business strategies, faceless marketing, and social media monetization.",
                canonical: `${window.location.origin}/free-resources/shadow-pages-playbook-v2`,
                contentType: "faq",
                structuredData: {
                    "@context": "https://schema.org",
                    "@type": [
                        "WebPage",
                        "FAQPage",
                        "Guide"
                    ],
                    "name": "Shadow Pages Playbook - Complete Guide",
                    "description": "Complete step-by-step guide to start, run and profit from Shadow Pages",
                    "url": `${window.location.origin}/free-resources/shadow-pages-playbook-v2`,
                    "author": {
                        "@type": "Person",
                        "name": "Eric Cole",
                        "description": "Entrepreneur & Social Media Mastermind"
                    }
                }
            }, void 0, false, {
                fileName: "/dev-server/src/pages/PlaybookV2.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ _jsxDEV(StickyCTA, {}, void 0, false, {
                fileName: "/dev-server/src/pages/PlaybookV2.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ _jsxDEV("div", {
                style: {
                    height: '5px',
                    backgroundColor: '#385dc7'
                }
            }, void 0, false, {
                fileName: "/dev-server/src/pages/PlaybookV2.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ _jsxDEV("div", {
                children: [
                    /*#__PURE__*/ _jsxDEV("div", {
                        className: "container mx-auto px-4",
                        style: {
                            paddingTop: '-2px',
                            marginBottom: '0px'
                        },
                        children: /*#__PURE__*/ _jsxDEV("div", {
                            className: "text-center",
                            children: /*#__PURE__*/ _jsxDEV("img", {
                                src: "https://www.shadowpages.io/hosted/images/90/f5c60bcb03444b83789f63decc55f4/Shadow-Pages-White-Logo.png",
                                alt: "The Shadow Pages Playbook",
                                className: "max-h-[90px] max-w-[90px] md:h-32 md:max-h-32 md:w-auto mx-auto object-contain"
                            }, void 0, false, {
                                fileName: "/dev-server/src/pages/PlaybookV2.tsx",
                                lineNumber: 55,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "/dev-server/src/pages/PlaybookV2.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "/dev-server/src/pages/PlaybookV2.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ _jsxDEV("div", {
                        className: "container mx-auto px-4",
                        children: [
                            /*#__PURE__*/ _jsxDEV("h1", {
                                className: "text-4xl md:text-6xl font-black text-center mb-6 md:mb-8 leading-tight",
                                children: [
                                    "The Shadow Pages ",
                                    /*#__PURE__*/ _jsxDEV("span", {
                                        className: "font-ivypresto italic text-[52px] md:text-[76px] block -mt-[13px]",
                                        style: {
                                            color: '#385dc7',
                                            fontWeight: '500'
                                        },
                                        children: [
                                            "Playbook",
                                            /*#__PURE__*/ _jsxDEV("sup", {
                                                className: "text-[12px] md:text-[16px] -top-6 md:-top-9",
                                                children: "™"
                                            }, void 0, false, {
                                                fileName: "/dev-server/src/pages/PlaybookV2.tsx",
                                                lineNumber: 66,
                                                columnNumber: 170
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "/dev-server/src/pages/PlaybookV2.tsx",
                                        lineNumber: 66,
                                        columnNumber: 30
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "/dev-server/