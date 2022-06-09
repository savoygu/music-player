import{z as A,j as d,_ as T,d as S,b as _,A as w,k as D,q as E,v as H,f as k,t as g,T as $,B as G,C as P,i as O,D as B,c as h,E as R,e as I,u as n,l as Z,S as m,h as z,F as N,p as M,s as q,x as U,r as J,G as K,H as Q}from"./index.7fb72238.js";var X={size:"1em",strokeWidth:4,strokeLinecap:"round",strokeLinejoin:"round",rtl:!1,theme:"outline",colors:{outline:{fill:"#333",background:"transparent"},filled:{fill:"#333",background:"#FFF"},twoTone:{fill:"#333",twoTone:"#2F88FF"},multiColor:{outStrokeColor:"#333",outFillColor:"#2F88FF",innerStrokeColor:"#FFF",innerFillColor:"#43CCF8"}},prefix:"i"};function Y(){return"icon-"+((1+Math.random())*4294967296|0).toString(16).substring(1)}function ee(e,i,o){var t=typeof i.fill=="string"?[i.fill]:i.fill||[],s=[],r=i.theme||o.theme;switch(r){case"outline":s.push(typeof t[0]=="string"?t[0]:"currentColor"),s.push("none"),s.push(typeof t[0]=="string"?t[0]:"currentColor"),s.push("none");break;case"filled":s.push(typeof t[0]=="string"?t[0]:"currentColor"),s.push(typeof t[0]=="string"?t[0]:"currentColor"),s.push("#FFF"),s.push("#FFF");break;case"two-tone":s.push(typeof t[0]=="string"?t[0]:"currentColor"),s.push(typeof t[1]=="string"?t[1]:o.colors.twoTone.twoTone),s.push(typeof t[0]=="string"?t[0]:"currentColor"),s.push(typeof t[1]=="string"?t[1]:o.colors.twoTone.twoTone);break;case"multi-color":s.push(typeof t[0]=="string"?t[0]:"currentColor"),s.push(typeof t[1]=="string"?t[1]:o.colors.multiColor.outFillColor),s.push(typeof t[2]=="string"?t[2]:o.colors.multiColor.innerStrokeColor),s.push(typeof t[3]=="string"?t[3]:o.colors.multiColor.innerFillColor);break}return{size:i.size||o.size,strokeWidth:i.strokeWidth||o.strokeWidth,strokeLinecap:i.strokeLinecap||o.strokeLinecap,strokeLinejoin:i.strokeLinejoin||o.strokeLinejoin,colors:s,id:e}}var te=Symbol("icon-context");function V(e,i,o){var t={name:"icon-"+e,props:["size","strokeWidth","strokeLinecap","strokeLinejoin","theme","fill","spin"],setup:function(r){var c=Y(),u=A(te,X);return function(){var f=r.size,L=r.strokeWidth,C=r.strokeLinecap,v=r.strokeLinejoin,l=r.theme,a=r.fill,p=r.spin,b=ee(c,{size:f,strokeWidth:L,strokeLinecap:C,strokeLinejoin:v,theme:l,fill:a},u),F=[u.prefix+"-icon"];return F.push(u.prefix+"-icon-"+e),i&&u.rtl&&F.push(u.prefix+"-icon-rtl"),p&&F.push(u.prefix+"-icon-spin"),d("span",{class:F.join(" ")},[o(b)])}}};return t}var oe=V("folder-download",!0,function(e){return d("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[d("path",{d:"M5 8C5 6.89543 5.89543 6 7 6H19L24 12H41C42.1046 12 43 12.8954 43 14V40C43 41.1046 42.1046 42 41 42H7C5.89543 42 5 41.1046 5 40V8Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),d("path",{d:"M30 28L23.9933 34L18 28.0134",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),d("path",{d:"M24 20V34",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),se=V("delete",!1,function(e){return d("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[d("path",{d:"M9 10V44H39V10H9Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),d("path",{d:"M20 20V33",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),d("path",{d:"M28 20V33",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),d("path",{d:"M4 10H44",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),d("path",{d:"M16 10L19.289 4H28.7771L32 10H16Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null)])});const ie={class:"mt-toast"},ne={class:"mt-toast__text"},re=S({name:"Toast",props:{text:null,show:{type:Boolean}},setup(e){return(i,o)=>(_(),w($,{name:"mt-toast"},{default:D(()=>[E(k("div",ie,[k("div",ne,g(e.text),1)],512),[[H,e.show]])]),_:1}))}});var le=T(re,[["__scopeId","data-v-063c418e"]]);let x,j,y;function W({text:e,duration:i=2e3,appendTo:o=document.body}){x&&(clearTimeout(x),t()),j=G(le,{text:e,show:!0}),y=document.createElement("div"),o.appendChild(y),j.mount(y),x=setTimeout(()=>{t(),x=void 0},i);function t(){j.unmount(),o.removeChild(y)}}const ae=e=>(q("data-v-016508fa"),e=e(),U(),e),ce={class:"flex items-center"},ue=["alt"],de={class:"ml-2.5 text-sm text-gray-800"},ke={class:"text-xs text-gray-500"},he=ae(()=>k("i",{class:"mx-1.5"},"-",-1)),ve=S({name:"MusicItem",props:{musicItem:null,currentTab:null},setup(e){const i=e,{musicItem:o,currentTab:t}=P(i),s=O(),r=B(),c=h(()=>s.currentSong),u=h(()=>r.localMusics),f=h(()=>{var l,a;return o.value.title===((l=c.value)==null?void 0:l.title)&&o.value.artist===((a=c.value)==null?void 0:a.artist)}),L=h(()=>!!u.value.find(l=>l.title===o.value.title&&l.artist===o.value.artist)),C=()=>{r.addToLocal(o.value),W({text:"\u5DF2\u6DFB\u52A0\u5230\u672C\u5730"})},v=()=>{r.removeFromLocal(o.value),W({text:"\u79FB\u9664\u6210\u529F"})};return(l,a)=>{const p=R("lazy");return _(),I("li",{class:M(["music-item",{"is-active":n(f)}])},[k("div",ce,[E(k("img",{class:"w-10 h-10",alt:n(o).title},null,8,ue),[[p,n(o).cover]]),k("span",de,g(n(o).title),1),k("span",ke,[he,Z(g(n(o).artist),1)])]),n(m).ONLINE===n(t)&&!n(L)?(_(),w(n(oe),{key:0,class:"p-2",theme:"outline",size:"16",fill:"#333",onClick:z(C,["stop"])},null,8,["onClick"])):N("",!0),n(m).LOCALE===n(t)?(_(),w(n(se),{key:1,class:"p-2",theme:"outline",size:"16",fill:"#333",onClick:z(v,["stop"])},null,8,["onClick"])):N("",!0)],2)}}});var me=T(ve,[["__scopeId","data-v-016508fa"]]);const _e={class:"musiclist mt-8"},fe={class:"music-tabs"},Le=S({name:"MusicList",setup(e){const i=O(),o=B(),t=h(()=>o.currentTab),s=h(()=>o.onlineMusics),r=h(()=>o.localMusics),c=J(t.value),u=h(()=>c.value===m.ONLINE?s.value:r.value),f=v=>{c.value=v},L=(v,l)=>{o.setCurrentTab(c.value),i.selectPlay({sequenceList:u.value,currentIndex:l})};C();function C(){o.fetchMusics()}return(v,l)=>(_(),I("div",_e,[k("div",fe,[k("span",{class:M({"is-active":c.value===n(m).LOCALE}),onClick:l[0]||(l[0]=a=>f(n(m).LOCALE))},"\u672C\u5730",2),k("span",{class:M(["ml-2.5",{"is-active":c.value===n(m).ONLINE}]),onClick:l[1]||(l[1]=a=>f(n(m).ONLINE))},"\u5728\u7EBF",2)]),(_(!0),I(K,null,Q(n(u),(a,p)=>(_(),w(me,{key:a.title+a.artist,"music-item":a,"current-tab":c.value,onClick:b=>L(a,p)},null,8,["music-item","current-tab","onClick"]))),128))]))}});var pe=T(Le,[["__scopeId","data-v-d64aa762"]]);export{pe as default};