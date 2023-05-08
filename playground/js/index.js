const wrap = document.querySelector("#wrap");
const container = document.querySelector("#container");
console.log(wrap.offsetHeight)
let Scroll;

window.addEventListener("wheel", e=>{
  Scroll = window.pageYOffset; 
  let containerHeight = Scroll/wrap.offsetHeight;
  console.log(Scroll/wrap.offsetHeight)
  container.style.height = `calc(2000px * ${containerHeight})`
  
})