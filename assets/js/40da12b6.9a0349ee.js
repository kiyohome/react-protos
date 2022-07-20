"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[9],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>m});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var p=n.createContext({}),u=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=u(e.components);return n.createElement(p.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=u(r),m=o,f=d["".concat(p,".").concat(m)]||d[m]||s[m]||a;return r?n.createElement(f,i(i({ref:t},c),{},{components:r})):n.createElement(f,i({ref:t},c))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=d;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var u=2;u<a;u++)i[u]=r[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},3538:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>s,frontMatter:()=>a,metadata:()=>l,toc:()=>u});var n=r(7462),o=(r(7294),r(3905));const a={sidebar_position:1,description:"\u30a2\u30d7\u30ea\u958b\u767a\u306b\u4f7f\u3046\u30c4\u30fc\u30eb\u3092\u6848\u5185\u3057\u307e\u3059\u3002"},i="\u30c4\u30fc\u30eb",l={unversionedId:"guide/tool",id:"guide/tool",title:"\u30c4\u30fc\u30eb",description:"\u30a2\u30d7\u30ea\u958b\u767a\u306b\u4f7f\u3046\u30c4\u30fc\u30eb\u3092\u6848\u5185\u3057\u307e\u3059\u3002",source:"@site/docs/guide/tool.md",sourceDirName:"guide",slug:"/guide/tool",permalink:"/react-protos/guide/tool",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,description:"\u30a2\u30d7\u30ea\u958b\u767a\u306b\u4f7f\u3046\u30c4\u30fc\u30eb\u3092\u6848\u5185\u3057\u307e\u3059\u3002"},sidebar:"tutorialSidebar",previous:{title:"\u30ac\u30a4\u30c9",permalink:"/react-protos/category/\u30ac\u30a4\u30c9"},next:{title:"\u30b3\u30de\u30f3\u30c9",permalink:"/react-protos/guide/command"}},p={},u=[{value:"IDE",id:"ide",level:2},{value:"GraphQL\u30af\u30e9\u30a4\u30a2\u30f3\u30c8",id:"graphql\u30af\u30e9\u30a4\u30a2\u30f3\u30c8",level:2}],c={toc:u};function s(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"\u30c4\u30fc\u30eb"},"\u30c4\u30fc\u30eb"),(0,o.kt)("h2",{id:"ide"},"IDE"),(0,o.kt)("p",null,"\u6b21\u306e\u3088\u3046\u306a\u3053\u3068\u304c\u3067\u304d\u308c\u3070\u597d\u307f\u306e\u30c4\u30fc\u30eb\u3092\u4f7f\u3063\u3066\u5927\u4e08\u592b\u3067\u3059\u3002"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"\u30b3\u30fc\u30c9\u88dc\u5b8c"),(0,o.kt)("li",{parentName:"ul"},"\u9759\u7684\u89e3\u6790"),(0,o.kt)("li",{parentName:"ul"},"\u30b3\u30fc\u30c9\u30d5\u30a9\u30fc\u30de\u30c3\u30c8"),(0,o.kt)("li",{parentName:"ul"},"Git\u64cd\u4f5c")),(0,o.kt)("p",null,"\u3053\u3060\u308f\u308a\u304c\u306a\u3051\u308c\u3070",(0,o.kt)("a",{parentName:"p",href:"https://azure.microsoft.com/ja-jp/products/visual-studio-code/"},"Visual Studio Code"),"\u304c\u30aa\u30b9\u30b9\u30e1\u3067\u3059\u3002"),(0,o.kt)("p",null,"VSCode\u306e\u8a2d\u5b9a\u3068\u63a8\u5968\u3059\u308b\u62e1\u5f35\u6a5f\u80fd\u3092\u5b9a\u7fa9\u3057\u305f\u30d5\u30a1\u30a4\u30eb\u3092\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u306b\u542b\u3081\u3066\u3044\u307e\u3059\u3002\nVSCode\u3067\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u3092\u958b\u304f\u3068\u8a2d\u5b9a\u306f\u81ea\u52d5\u3067\u9069\u7528\u3055\u308c\u307e\u3059\u3002\n\u63a8\u5968\u3059\u308b\u62e1\u5f35\u6a5f\u80fd\u304c\u51fa\u3066\u304d\u305f\u5834\u5408\u306f\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\u3057\u3066\u304f\u3060\u3055\u3044\u3002"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/kiyohome/react-protos/blob/main/.vscode/settings.json"},"settings.json")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/kiyohome/react-protos/blob/main/.vscode/extensions.json"},"extensions.json"))),(0,o.kt)("h2",{id:"graphql\u30af\u30e9\u30a4\u30a2\u30f3\u30c8"},"GraphQL\u30af\u30e9\u30a4\u30a2\u30f3\u30c8"),(0,o.kt)("p",null,"\u6b21\u306e\u3088\u3046\u306a\u3053\u3068\u304c\u3067\u304d\u308c\u3070\u3053\u3061\u3089\u3082\u597d\u307f\u306e\u30c4\u30fc\u30eb\u3092\u4f7f\u3063\u3066\u5927\u4e08\u592b\u3067\u3059\u3002"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"GraphQL\u30b9\u30ad\u30fc\u30de\u306e\u8aad\u307f\u8fbc\u307f"),(0,o.kt)("li",{parentName:"ul"},"\u30b3\u30fc\u30c9\u88dc\u5b8c"),(0,o.kt)("li",{parentName:"ul"},"\u30d8\u30c3\u30c0\u30fc\u8a2d\u5b9a"),(0,o.kt)("li",{parentName:"ul"},"GraphQL\u306e\u30ea\u30af\u30a8\u30b9\u30c8/\u30ec\u30b9\u30dd\u30f3\u30b9")),(0,o.kt)("p",null,"\u3053\u3060\u308f\u308a\u304c\u306a\u3051\u308c\u3070",(0,o.kt)("a",{parentName:"p",href:"https://altair.sirmuel.design/"},"Altair GraphQL Client"),"\u304c\u30aa\u30b9\u30b9\u30e1\u3067\u3059\u3002"))}s.isMDXComponent=!0}}]);