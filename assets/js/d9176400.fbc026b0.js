"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[981],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>f});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),u=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},s=function(e){var t=u(e.components);return n.createElement(c.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),d=u(r),f=o,m=d["".concat(c,".").concat(f)]||d[f]||l[f]||a;return r?n.createElement(m,i(i({ref:t},s),{},{components:r})):n.createElement(m,i({ref:t},s))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=d;var p={};for(var c in t)hasOwnProperty.call(t,c)&&(p[c]=t[c]);p.originalType=e,p.mdxType="string"==typeof e?e:o,i[1]=p;for(var u=2;u<a;u++)i[u]=r[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},5690:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>l,frontMatter:()=>a,metadata:()=>p,toc:()=>u});var n=r(7462),o=(r(7294),r(3905));const a={sidebar_position:4,description:"\u30a2\u30d7\u30ea\u306eUI\u3092\u6848\u5185\u3057\u307e\u3059\u3002"},i="UI",p={unversionedId:"guide/ui",id:"guide/ui",title:"UI",description:"\u30a2\u30d7\u30ea\u306eUI\u3092\u6848\u5185\u3057\u307e\u3059\u3002",source:"@site/docs/guide/ui.md",sourceDirName:"guide",slug:"/guide/ui",permalink:"/react-protos/guide/ui",draft:!1,tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4,description:"\u30a2\u30d7\u30ea\u306eUI\u3092\u6848\u5185\u3057\u307e\u3059\u3002"},sidebar:"tutorialSidebar",previous:{title:"\u30c7\u30a3\u30ec\u30af\u30c8\u30ea\u69cb\u6210",permalink:"/react-protos/guide/directory"},next:{title:"\u30eb\u30fc\u30c6\u30a3\u30f3\u30b0",permalink:"/react-protos/guide/routing"}},c={},u=[],s={toc:u};function l(e){let{components:t,...a}=e;return(0,o.kt)("wrapper",(0,n.Z)({},s,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"ui"},"UI"),(0,o.kt)("p",null,"\u30ec\u30a4\u30a2\u30a6\u30c8\u306f\u30d8\u30c3\u30c0\u30fc\u3001\u30ca\u30d3\u30b2\u30fc\u30b7\u30e7\u30f3\u3001\u30b3\u30f3\u30c6\u30f3\u30c4\u3001\u30d5\u30c3\u30bf\u30fc\u3067\u3059\u3002\n\u30ca\u30d3\u30b2\u30fc\u30b7\u30e7\u30f3\u306b\u30a2\u30d7\u30ea\u3067\u6271\u3046\u5bfe\u8c61\u304c\u4e26\u3073\u3001\u305d\u306e\u5bfe\u8c61\u3092\u9078\u629e\u3057\u3066\u30b3\u30f3\u30c6\u30f3\u30c4\u3092\u5207\u308a\u66ff\u3048\u307e\u3059\u3002\n\u30b3\u30f3\u30c6\u30f3\u30c4\u3067\u306f\u4e00\u89a7\u30da\u30fc\u30b8\u304b\u3089\u5bfe\u8c61\u3092\u9078\u3093\u3067\u8a73\u7d30\u30da\u30fc\u30b8\u3092\u8868\u793a\u3057\u3066\u64cd\u4f5c\u3092\u884c\u3044\u307e\u3059\u3002\n\u64cd\u4f5c\u5bfe\u8c61\u304c\u5358\u7d14\u306a\u5834\u5408\u306f\u8a73\u7d30\u30da\u30fc\u30b8\u3092\u4f5c\u3089\u305a\u4e00\u89a7\u30da\u30fc\u30b8\u304b\u3089\u64cd\u4f5c\u3092\u884c\u3044\u307e\u3059\u3002\n\u57fa\u672c\u7684\u306a\u64cd\u4f5c\u306f\u30e2\u30fc\u30c0\u30eb\u3067\u884c\u3044\u307e\u3059\u3002\n\u30da\u30fc\u30b8\u3084\u30e2\u30fc\u30c0\u30eb\u306f",(0,o.kt)("a",{parentName:"p",href:"https://mantine.dev/"},"Mantine"),"\u3067\u4f5c\u6210\u3057\u307e\u3059\u3002"),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"ui",src:r(9217).Z,width:"1122",height:"703"})),(0,o.kt)("p",null,"\u30ec\u30a4\u30a2\u30a6\u30c8\u306f",(0,o.kt)("a",{parentName:"p",href:"https://github.com/kiyohome/react-protos/blob/main/src/pages/AppLayout.tsx"},"AppLayout"),"\u3067\u5b9a\u7fa9\u3057\u3066\u3044\u307e\u3059\u3002\n\u30d8\u30c3\u30c0\u30fc\u3001\u30ca\u30d3\u30b2\u30fc\u30b7\u30e7\u30f3\u3001\u30d5\u30c3\u30bf\u30fc\u306e\u5185\u5bb9\u3082AppLayout\u306b\u5b9f\u88c5\u3057\u3066\u3044\u307e\u3059\u3002\n\u30ca\u30d3\u30b2\u30fc\u30b7\u30e7\u30f3\u306e\u5185\u5bb9\u3092\u5909\u3048\u305f\u3044\u5834\u5408\u306fAppLayout\u5185\u306e\u6b21\u306e\u914d\u5217\u3092\u5909\u66f4\u3057\u307e\u3059\u3002"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"const links = [\n  { label: t('groups'), path: '/groups' },\n  { label: t('events'), path: '/events' },\n];\n")))}l.isMDXComponent=!0},9217:(e,t,r)=>{r.d(t,{Z:()=>n});const n=r.p+"assets/images/ui-b2816e0fa25b1bf12a0757f5b07dc75b.png"}}]);