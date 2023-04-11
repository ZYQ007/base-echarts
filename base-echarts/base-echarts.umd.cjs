(function(h,o){typeof exports=="object"&&typeof module<"u"?o(exports,require("vue"),require("echarts")):typeof define=="function"&&define.amd?define(["exports","vue","echarts"],o):(h=typeof globalThis<"u"?globalThis:h||self,o(h["base-echarts"]={},h.Vue,h.echarts))})(this,function(h,o,M){"use strict";function j(t){if(t&&t.__esModule)return t;const a=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const e in t)if(e!=="default"){const l=Object.getOwnPropertyDescriptor(t,e);Object.defineProperty(a,e,l.get?l:{enumerable:!0,get:()=>t[e]})}}return a.default=t,Object.freeze(a)}const L=j(M);function R(t,a,e){let l={interval:2e3,loopSeries:!1,seriesIndex:0,updateData:null};if(!t||!a)return;let n=0,i=0,d=0,s=a.series.length,u=0,r,m=!0,x=0,I=0;if(s===0)return;e?(e.interval=e.interval||l.interval,e.loopSeries=e.loopSeries||l.loopSeries,e.seriesIndex=e.seriesIndex||l.seriesIndex,e.updateData=e.updateData||l.updateData):e=l,e.seriesIndex<0||e.seriesIndex>=s?i=0:i=e.seriesIndex;function v(){d&&(clearInterval(d),d=0),t.off("mousemove",w),y.off("mousemove",_),y.off("globalout",O)}function D(){let c=n===0&&e.loopSeries?i===0?s-1:i-1:i,f=a.series[c].type;(f==="pie"||f==="radar"||f==="map")&&t.dispatchAction({type:"downplay",seriesIndex:x,dataIndex:I})}function k(){let c=0,f=0;function S(){let E=t.getDom();if(document!==E&&!document.documentElement.contains(E)){v();return}n===0&&!m&&typeof e.updateData=="function"&&(e.updateData(),t.setOption(a));let b=a.series,p=b[i];if(!b||b.length===0||!p||!p.type||!p.data||!p.data.length)return;r=p.type,u=p.data.length;let g={seriesIndex:i};switch(r){case"pie":if(!p.data[n].name||p.data[n].name==="\u7A7A"||!p.data[n].value){f+=1,n=(n+1)%u,e.loopSeries&&n===0?(f===u&&(c+=1),f=0,i=(i+1)%s,i===e.seriesIndex?s!==c?(c=0,S()):(c=0,v()):S()):!e.loopSeries&&n===0?u!==f?(f=0,S()):(f=0,v()):S();return}case"map":case"chord":g.name=p.data[n].name;break;case"radar":g.seriesIndex=i;break;case"lines":n=0,i=(i+1)%s,c++,s!==c?S():v();return;default:g.dataIndex=n;break}(r==="pie"||r==="radar"||r==="map")&&(m||D(),t.dispatchAction({type:"highlight",seriesIndex:i,dataIndex:n})),g.type="showTip",t.dispatchAction(g),x=i,I=n,n=(n+1)%u,e.loopSeries&&n===0&&(f=0,i=(i+1)%s,i===e.seriesIndex&&(c=0)),m=!1}S(),d=setInterval(S,e.interval)}function w(){d&&(clearInterval(d),d=0,(r==="pie"||r==="radar"||r==="map")&&D())}let y=t.getZr();function _(c){c.event,w()}function O(){d||k()}return t.on("mousemove",w),y.on("mousemove",_),y.on("globalout",O),k(),{clearLoop:v}}const B={loopShowTooltip:R};function z(t){const a=L.init(t),e=s=>{a.setOption(s)},l=()=>{a.resize()};window.addEventListener("resize",()=>{a.resize()});const n=(s,u,r,m,x,I=null)=>{u&&(I&&I.clearLoop(),I=null,B.loopShowTooltip(a,s,{interval:r,loopSeries:m,seriesIndex:x}))},i=function(s,u){let r=null;return function(){const m=this,x=arguments;r||(r=setTimeout(function(){s.apply(m,x),r=null},u))}},d=new ResizeObserver(s=>{for(const u of s)u.target&&i(a.resize(),200)});return{echartInstance:a,ob:d,setOptions:e,updateSize:l,setTooltip:n}}const T=o.defineComponent({__name:"index",props:{options:null,istool:{type:Boolean,default:!1},interval:{default:2e3},loopSeries:{type:Boolean,default:!0},index:null,width:{default:"100%"},height:{default:"100%"}},emits:["echartsClick","updateSize"],setup(t,{emit:a}){const e=t,l=o.ref();return o.onMounted(()=>{const{setOptions:n,setTooltip:i,updateSize:d,echartInstance:s,ob:u}=z(l.value);u.observe(l.value),o.watchEffect(()=>{i(e.options,e.istool,e.interval,e.loopSeries,e.seriesIndex)}),o.watch([()=>e.width,()=>e.height],()=>{setTimeout(d,0)},{deep:!0}),o.watch([()=>e.options],()=>{n(e.options)},{deep:!0,immediate:!0}),s.on("click",function(r){a("echartsClick",r)}),a("updateSize",d)}),o.onUnmounted(()=>{const{ob:n}=z(l.value);n.unobserve(l.value)}),(n,i)=>(o.openBlock(),o.createElementBlock("div",{ref_key:"echartDivRef",ref:l,style:o.normalizeStyle({width:t.width,height:t.height})},null,4))}}),A=[T],P=function(t){A.forEach(a=>{t.component(a.name,a)})};h.BaseEcharts=T,h.install=P,Object.defineProperties(h,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
