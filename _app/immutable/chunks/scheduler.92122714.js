function x(){}function w(t,n){for(const e in n)t[e]=n[e];return t}function E(t){return t()}function M(){return Object.create(null)}function j(t){t.forEach(E)}function A(t){return typeof t=="function"}function B(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}let i;function C(t,n){return t===n?!0:(i||(i=document.createElement("a")),i.href=n,t===i.href)}function F(t){return Object.keys(t).length===0}function q(t,...n){if(t==null){for(const r of n)r(void 0);return x}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function P(t,n,e){t.$$.on_destroy.push(q(n,e))}function S(t,n,e,r){if(t){const c=m(t,n,e,r);return t[0](c)}}function m(t,n,e,r){return t[1]&&r?w(e.ctx.slice(),t[1](r(n))):e.ctx}function U(t,n,e,r){if(t[2]&&r){const c=t[2](r(e));if(n.dirty===void 0)return c;if(typeof c=="object"){const l=[],_=Math.max(n.dirty.length,c.length);for(let u=0;u<_;u+=1)l[u]=n.dirty[u]|c[u];return l}return n.dirty|c}return n.dirty}function G(t,n,e,r,c,l){if(c){const _=m(n,e,r,l);t.p(_,c)}}function H(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let r=0;r<e;r++)n[r]=-1;return n}return-1}function I(t){const n={};for(const e in t)e[0]!=="$"&&(n[e]=t[e]);return n}function J(t,n,e){return t.set(e),n}let f;function h(t){f=t}function g(){if(!f)throw new Error("Function called outside component initialization");return f}function K(t){g().$$.on_mount.push(t)}function L(t){g().$$.after_update.push(t)}function N(t){g().$$.on_destroy.push(t)}function Q(t,n){const e=t.$$.callbacks[n.type];e&&e.slice().forEach(r=>r.call(this,n))}const a=[],y=[];let s=[];const p=[],k=Promise.resolve();let b=!1;function v(){b||(b=!0,k.then(z))}function R(){return v(),k}function O(t){s.push(t)}function T(t){p.push(t)}const d=new Set;let o=0;function z(){if(o!==0)return;const t=f;do{try{for(;o<a.length;){const n=a[o];o++,h(n),D(n.$$)}}catch(n){throw a.length=0,o=0,n}for(h(null),a.length=0,o=0;y.length;)y.pop()();for(let n=0;n<s.length;n+=1){const e=s[n];d.has(e)||(d.add(e),e())}s.length=0}while(a.length);for(;p.length;)p.pop()();b=!1,d.clear(),h(t)}function D(t){if(t.fragment!==null){t.update(),j(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(O)}}function V(t){const n=[],e=[];s.forEach(r=>t.indexOf(r)===-1?n.push(r):e.push(r)),e.forEach(r=>r()),s=n}export{h as A,E as B,a as C,v as D,L as a,y as b,S as c,U as d,P as e,J as f,H as g,N as h,Q as i,f as j,w as k,I as l,T as m,x as n,K as o,C as p,O as q,j as r,B as s,R as t,G as u,M as v,z as w,A as x,F as y,V as z};
