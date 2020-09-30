// agjustables
var anim_len = 0.7;

// bools
var rotated = 0;
var click_enable = 1;

init();

var name_div = document.getElementById('name');
name_div.addEventListener("click", function() {
  // console.log("here");
  if (click_enable) {
    click_enable = 0;
    if(rotated){
      name_div.style.animation = `rotate_horz ${anim_len}s forwards`;
      name_div.style.webkitAnimation  = `rotate_horz ${anim_len}s forwards`;
      rotated = 0;
    } else {
      name_div.style.animation = `rotate_side ${anim_len}s forwards`;
      name_div.style.webkitAnimation  = `rotate_side ${anim_len}s forwards`;
      rotated = 1;
    }
    setTimeout(function(){ click_enable = 1; }, anim_len * 1000);
  }
});

function init() {
  test_dom();
  // init_css_animation();
}

function init_css_animation() {}

function test_dom() {
  anim = "rotate_side";
  var keyframes = findKeyframesRule(anim);
  console.log(anim);
}

function findKeyframesRule(rule) {
  var ss = document.styleSheets;
  for (var i = 0; i < ss.length; ++i) {
    for (var j = 0; j < ss[i].cssRules.length; ++j) {
      if (ss[i].cssRules[j].type == window.CSSRule.WEBKIT_KEYFRAMES_RULE && ss[i].cssRules[j].name == rule) {
        return ss[i].cssRules[j];
      }
    }
  }
  return null;
}
