var B=Object.defineProperty;var P=(e,t,n)=>t in e?B(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var _=(e,t,n)=>(P(e,typeof t!="symbol"?t+"":t,n),n);import{r as $,n as g,v as N,w as j,x as S,y as I,q as A,z as O,j as q,A as E,B as G,C as R,D as z}from"./scheduler.92122714.js";let y=!1;function F(){y=!0}function J(){y=!1}function K(e,t,n,i){for(;e<t;){const s=e+(t-e>>1);n(s)<=i?e=s+1:t=s}return e}function U(e){if(e.hydrate_init)return;e.hydrate_init=!0;let t=e.childNodes;if(e.nodeName==="HEAD"){const r=[];for(let c=0;c<t.length;c++){const u=t[c];u.claim_order!==void 0&&r.push(u)}t=r}const n=new Int32Array(t.length+1),i=new Int32Array(t.length);n[0]=-1;let s=0;for(let r=0;r<t.length;r++){const c=t[r].claim_order,u=(s>0&&t[n[s]].claim_order<=c?s+1:K(1,s,h=>t[n[h]].claim_order,c))-1;i[r]=n[u]+1;const f=u+1;n[f]=r,s=Math.max(f,s)}const a=[],l=[];let o=t.length-1;for(let r=n[s]+1;r!=0;r=i[r-1]){for(a.push(t[r-1]);o>=r;o--)l.push(t[o]);o--}for(;o>=0;o--)l.push(t[o]);a.reverse(),l.sort((r,c)=>r.claim_order-c.claim_order);for(let r=0,c=0;r<l.length;r++){for(;c<a.length&&l[r].claim_order>=a[c].claim_order;)c++;const u=c<a.length?a[c]:null;e.insertBefore(l[r],u)}}function V(e,t){if(y){for(U(e),(e.actual_end_child===void 0||e.actual_end_child!==null&&e.actual_end_child.parentNode!==e)&&(e.actual_end_child=e.firstChild);e.actual_end_child!==null&&e.actual_end_child.claim_order===void 0;)e.actual_end_child=e.actual_end_child.nextSibling;t!==e.actual_end_child?(t.claim_order!==void 0||t.parentNode!==e)&&e.insertBefore(t,e.actual_end_child):e.actual_end_child=t.nextSibling}else(t.parentNode!==e||t.nextSibling!==null)&&e.appendChild(t)}function W(e,t,n){e.insertBefore(t,n||null)}function Q(e,t,n){y&&!n?V(e,t):(t.parentNode!==e||t.nextSibling!=n)&&e.insertBefore(t,n||null)}function p(e){e.parentNode&&e.parentNode.removeChild(e)}function ae(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function H(e){return document.createElement(e)}function L(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function v(e){return document.createTextNode(e)}function oe(){return v(" ")}function fe(){return v("")}function ue(e,t,n,i){return e.addEventListener(t,n,i),()=>e.removeEventListener(t,n,i)}function X(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}const Y=["width","height"];function _e(e,t){const n=Object.getOwnPropertyDescriptors(e.__proto__);for(const i in t)t[i]==null?e.removeAttribute(i):i==="style"?e.style.cssText=t[i]:i==="__value"?e.value=e[i]=t[i]:n[i]&&n[i].set&&Y.indexOf(i)===-1?e[i]=t[i]:X(e,i,t[i])}function de(e){return e.dataset.svelteH}function Z(e){return Array.from(e.childNodes)}function C(e){e.claim_info===void 0&&(e.claim_info={last_index:0,total_claimed:0})}function D(e,t,n,i,s=!1){C(e);const a=(()=>{for(let l=e.claim_info.last_index;l<e.length;l++){const o=e[l];if(t(o)){const r=n(o);return r===void 0?e.splice(l,1):e[l]=r,s||(e.claim_info.last_index=l),o}}for(let l=e.claim_info.last_index-1;l>=0;l--){const o=e[l];if(t(o)){const r=n(o);return r===void 0?e.splice(l,1):e[l]=r,s?r===void 0&&e.claim_info.last_index--:e.claim_info.last_index=l,o}}return i()})();return a.claim_order=e.claim_info.total_claimed,e.claim_info.total_claimed+=1,a}function M(e,t,n,i){return D(e,s=>s.nodeName===t,s=>{const a=[];for(let l=0;l<s.attributes.length;l++){const o=s.attributes[l];n[o.name]||a.push(o.name)}a.forEach(l=>s.removeAttribute(l))},()=>i(t))}function he(e,t,n){return M(e,t,n,H)}function me(e,t,n){return M(e,t,n,L)}function k(e,t){return D(e,n=>n.nodeType===3,n=>{const i=""+t;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>v(t),!0)}function pe(e){return k(e," ")}function b(e,t,n){for(let i=n;i<e.length;i+=1){const s=e[i];if(s.nodeType===8&&s.textContent.trim()===t)return i}return-1}function $e(e,t){const n=b(e,"HTML_TAG_START",0),i=b(e,"HTML_TAG_END",n+1);if(n===-1||i===-1)return new x(t);C(e);const s=e.splice(n,i-n+1);p(s[0]),p(s[s.length-1]);const a=s.slice(1,s.length-1);if(a.length===0)return new x(t);for(const l of a)l.claim_order=e.claim_info.total_claimed,e.claim_info.total_claimed+=1;return new x(t,a)}function ye(e,t){t=""+t,e.data!==t&&(e.data=t)}function xe(e,t){e.value=t??""}function ge(e,t,n,i){n==null?e.style.removeProperty(t):e.style.setProperty(t,n,i?"important":"")}function ve(e,t,n){for(let i=0;i<e.options.length;i+=1){const s=e.options[i];if(s.__value===t){s.selected=!0;return}}(!n||t!==void 0)&&(e.selectedIndex=-1)}function we(e){const t=e.querySelector(":checked");return t&&t.__value}function Te(e,t,n){e.classList.toggle(t,!!n)}function Ne(e,t){const n=[];let i=0;for(const s of t.childNodes)if(s.nodeType===8){const a=s.textContent.trim();a===`HEAD_${e}_END`?(i-=1,n.push(s)):a===`HEAD_${e}_START`&&(i+=1,n.push(s))}else i>0&&n.push(s);return n}class ee{constructor(t=!1){_(this,"is_svg",!1);_(this,"e");_(this,"n");_(this,"t");_(this,"a");this.is_svg=t,this.e=this.n=null}c(t){this.h(t)}m(t,n,i=null){this.e||(this.is_svg?this.e=L(n.nodeName):this.e=H(n.nodeType===11?"TEMPLATE":n.nodeName),this.t=n.tagName!=="TEMPLATE"?n:n.content,this.c(t)),this.i(i)}h(t){this.e.innerHTML=t,this.n=Array.from(this.e.nodeName==="TEMPLATE"?this.e.content.childNodes:this.e.childNodes)}i(t){for(let n=0;n<this.n.length;n+=1)W(this.t,this.n[n],t)}p(t){this.d(),this.h(t),this.i(this.a)}d(){this.n.forEach(p)}}class x extends ee{constructor(n=!1,i){super(n);_(this,"l");this.e=this.n=null,this.l=i}c(n){this.l?this.n=this.l:super.c(n)}i(n){for(let i=0;i<this.n.length;i+=1)Q(this.t,this.n[i],n)}}function Ae(e,t){return new e(t)}const m=new Set;let d;function Ee(){d={r:0,c:[],p:d}}function be(){d.r||$(d.c),d=d.p}function te(e,t){e&&e.i&&(m.delete(e),e.i(t))}function Se(e,t,n,i){if(e&&e.o){if(m.has(e))return;m.add(e),d.c.push(()=>{m.delete(e),i&&(n&&e.d(1),i())}),e.o(t)}else i&&i()}function He(e,t,n){const i=e.$$.props[t];i!==void 0&&(e.$$.bound[i]=n,n(e.$$.ctx[i]))}function Le(e){e&&e.c()}function Ce(e,t){e&&e.l(t)}function ne(e,t,n){const{fragment:i,after_update:s}=e.$$;i&&i.m(t,n),A(()=>{const a=e.$$.on_mount.map(G).filter(S);e.$$.on_destroy?e.$$.on_destroy.push(...a):$(a),e.$$.on_mount=[]}),s.forEach(A)}function ie(e,t){const n=e.$$;n.fragment!==null&&(O(n.after_update),$(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function se(e,t){e.$$.dirty[0]===-1&&(R.push(e),z(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function De(e,t,n,i,s,a,l=null,o=[-1]){const r=q;E(e);const c=e.$$={fragment:null,ctx:[],props:a,update:g,not_equal:s,bound:N(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(r?r.$$.context:[])),callbacks:N(),dirty:o,skip_bound:!1,root:t.target||r.$$.root};l&&l(c.root);let u=!1;if(c.ctx=n?n(e,t.props||{},(f,h,...w)=>{const T=w.length?w[0]:h;return c.ctx&&s(c.ctx[f],c.ctx[f]=T)&&(!c.skip_bound&&c.bound[f]&&c.bound[f](T),u&&se(e,f)),h}):[],c.update(),u=!0,$(c.before_update),c.fragment=i?i(c.ctx):!1,t.target){if(t.hydrate){F();const f=Z(t.target);c.fragment&&c.fragment.l(f),f.forEach(p)}else c.fragment&&c.fragment.c();t.intro&&te(e.$$.fragment),ne(e,t.target,t.anchor),J(),j()}E(r)}class Me{constructor(){_(this,"$$");_(this,"$$set")}$destroy(){ie(this,1),this.$destroy=g}$on(t,n){if(!S(n))return g;const i=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(t){this.$$set&&!I(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const re="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(re);export{ue as A,ae as B,L as C,me as D,_e as E,He as F,ve as G,Te as H,we as I,Ne as J,x as K,$e as L,Me as S,Q as a,be as b,pe as c,te as d,fe as e,p as f,H as g,he as h,De as i,Z as j,X as k,ge as l,v as m,k as n,ye as o,Ee as p,Ae as q,Le as r,oe as s,Se as t,Ce as u,ne as v,ie as w,V as x,de as y,xe as z};