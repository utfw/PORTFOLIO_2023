(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[929],{3991:function(e,t){"use strict";var n,r;Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{PrefetchKind:function(){return n},ACTION_REFRESH:function(){return o},ACTION_NAVIGATE:function(){return u},ACTION_RESTORE:function(){return l},ACTION_SERVER_PATCH:function(){return f},ACTION_PREFETCH:function(){return c},ACTION_FAST_REFRESH:function(){return a}});let o="refresh",u="navigate",l="restore",f="server-patch",c="prefetch",a="fast-refresh";(r=n||(n={})).AUTO="auto",r.FULL="full",r.TEMPORARY="temporary",("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1516:function(e,t){"use strict";function n(e,t,n,r){return!1}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getDomainLocale",{enumerable:!0,get:function(){return n}}),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5569:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return O}});let r=n(8754),o=r._(n(7294)),u=n(4532),l=n(3353),f=n(1410),c=n(9064),a=n(370),i=n(9955),s=n(4224),d=n(508),p=n(1516),y=n(4266),b=n(3991),v=new Set;function h(e,t,n,r,o,u){if(!u&&!(0,l.isLocalURL)(t))return;if(!r.bypassPrefetchedCheck){let o=void 0!==r.locale?r.locale:"locale"in e?e.locale:void 0,u=t+"%"+n+"%"+o;if(v.has(u))return;v.add(u)}let f=u?e.prefetch(t,o):e.prefetch(t,n,r);Promise.resolve(f).catch(e=>{})}function _(e){return"string"==typeof e?e:(0,f.formatUrl)(e)}let g=o.default.forwardRef(function(e,t){let n,r;let{href:f,as:v,children:g,prefetch:O=null,passHref:C,replace:E,shallow:m,scroll:M,locale:P,onClick:j,onMouseEnter:T,onTouchStart:R,legacyBehavior:k=!1,...L}=e;n=g,k&&("string"==typeof n||"number"==typeof n)&&(n=o.default.createElement("a",null,n));let A=!1!==O,I=null===O?b.PrefetchKind.AUTO:b.PrefetchKind.FULL,x=o.default.useContext(i.RouterContext),N=o.default.useContext(s.AppRouterContext),S=null!=x?x:N,H=!x,{href:U,as:w}=o.default.useMemo(()=>{if(!x){let e=_(f);return{href:e,as:v?_(v):e}}let[e,t]=(0,u.resolveHref)(x,f,!0);return{href:e,as:v?(0,u.resolveHref)(x,v):t||e}},[x,f,v]),F=o.default.useRef(U),K=o.default.useRef(w);k&&(r=o.default.Children.only(n));let V=k?r&&"object"==typeof r&&r.ref:t,[z,D,q]=(0,d.useIntersection)({rootMargin:"200px"}),B=o.default.useCallback(e=>{(K.current!==w||F.current!==U)&&(q(),K.current=w,F.current=U),z(e),V&&("function"==typeof V?V(e):"object"==typeof V&&(V.current=e))},[w,V,U,q,z]);o.default.useEffect(()=>{S&&D&&A&&h(S,U,w,{locale:P},{kind:I},H)},[w,U,D,P,A,null==x?void 0:x.locale,S,H,I]);let G={ref:B,onClick(e){k||"function"!=typeof j||j(e),k&&r.props&&"function"==typeof r.props.onClick&&r.props.onClick(e),S&&!e.defaultPrevented&&function(e,t,n,r,u,f,c,a,i,s){let{nodeName:d}=e.currentTarget,p="A"===d.toUpperCase();if(p&&(function(e){let t=e.currentTarget,n=t.getAttribute("target");return n&&"_self"!==n||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||!i&&!(0,l.isLocalURL)(n)))return;e.preventDefault();let y=()=>{"beforePopState"in t?t[u?"replace":"push"](n,r,{shallow:f,locale:a,scroll:c}):t[u?"replace":"push"](r||n,{forceOptimisticNavigation:!s})};i?o.default.startTransition(y):y()}(e,S,U,w,E,m,M,P,H,A)},onMouseEnter(e){k||"function"!=typeof T||T(e),k&&r.props&&"function"==typeof r.props.onMouseEnter&&r.props.onMouseEnter(e),S&&(A||!H)&&h(S,U,w,{locale:P,priority:!0,bypassPrefetchedCheck:!0},{kind:I},H)},onTouchStart(e){k||"function"!=typeof R||R(e),k&&r.props&&"function"==typeof r.props.onTouchStart&&r.props.onTouchStart(e),S&&(A||!H)&&h(S,U,w,{locale:P,priority:!0,bypassPrefetchedCheck:!0},{kind:I},H)}};if((0,c.isAbsoluteUrl)(w))G.href=w;else if(!k||C||"a"===r.type&&!("href"in r.props)){let e=void 0!==P?P:null==x?void 0:x.locale,t=(null==x?void 0:x.isLocaleDomain)&&(0,p.getDomainLocale)(w,e,null==x?void 0:x.locales,null==x?void 0:x.domainLocales);G.href=t||(0,y.addBasePath)((0,a.addLocale)(w,e,null==x?void 0:x.defaultLocale))}return k?o.default.cloneElement(r,G):o.default.createElement("a",{...L,...G},n)}),O=g;("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},508:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useIntersection",{enumerable:!0,get:function(){return c}});let r=n(7294),o=n(29),u="function"==typeof IntersectionObserver,l=new Map,f=[];function c(e){let{rootRef:t,rootMargin:n,disabled:c}=e,a=c||!u,[i,s]=(0,r.useState)(!1),d=(0,r.useRef)(null),p=(0,r.useCallback)(e=>{d.current=e},[]);(0,r.useEffect)(()=>{if(u){if(a||i)return;let e=d.current;if(e&&e.tagName){let r=function(e,t,n){let{id:r,observer:o,elements:u}=function(e){let t;let n={root:e.root||null,margin:e.rootMargin||""},r=f.find(e=>e.root===n.root&&e.margin===n.margin);if(r&&(t=l.get(r)))return t;let o=new Map,u=new IntersectionObserver(e=>{e.forEach(e=>{let t=o.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)})},e);return t={id:n,observer:u,elements:o},f.push(n),l.set(n,t),t}(n);return u.set(e,t),o.observe(e),function(){if(u.delete(e),o.unobserve(e),0===u.size){o.disconnect(),l.delete(r);let e=f.findIndex(e=>e.root===r.root&&e.margin===r.margin);e>-1&&f.splice(e,1)}}}(e,e=>e&&s(e),{root:null==t?void 0:t.current,rootMargin:n});return r}}else if(!i){let e=(0,o.requestIdleCallback)(()=>s(!0));return()=>(0,o.cancelIdleCallback)(e)}},[a,n,t,i,d.current]);let y=(0,r.useCallback)(()=>{s(!1)},[]);return[p,i,y]}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9008:function(e,t,n){e.exports=n(2636)},1664:function(e,t,n){e.exports=n(5569)},4288:function(e,t,n){"use strict";n.d(t,{FU$:function(){return r}});var r={prefix:"far",iconName:"envelope",icon:[512,512,[128386,9993,61443],"f0e0","M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"]}}}]);