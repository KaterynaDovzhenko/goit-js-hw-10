import"./assets/styles-CB_RmJAn.js";import{i as s}from"./assets/vendor-A92OCY9B.js";const i=document.querySelector("[name=delay]"),c=document.querySelector("[type=submit]"),n=document.querySelector("[value=fulfilled]"),m=t=>{t.preventDefault(),new Promise((e,l)=>{const o=i.value;setTimeout(()=>{n.checked?e(s.show({message:`✅ Fulfilled promise in ${o}ms`})):l(s.show({message:`❌ Rejected promise in ${o}ms`}))},o)}).then(e=>{console.log(e)}).catch(e=>{console.log(e)})};c.addEventListener("click",m);
//# sourceMappingURL=2-snackbar.js.map