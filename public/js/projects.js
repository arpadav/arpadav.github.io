function init(){
  // card clicking listener
  let card_title = document.getElementsByClassName('card');
  for (let i = 0; i < card_title.length; i++) {
    card_title[i].style.cursor = "pointer";
    card_title[i].addEventListener("click", toggle_collapse);
  }
}

// collapse bodies upon clicking title or name
function toggle_collapse() {
  let bodies = document.getElementsByClassName('body');
  // "this" refers to click event
  this.classList.toggle("active");
  let content = this.nextElementSibling;
  if (content.style.maxHeight) content.style.maxHeight = null;
  else content.style.maxHeight = content.scrollHeight + "px";
}

export default init;
