// agjustables
var anim_len = 0.8;

// bools
var rotated = 0;
var click_enable = 1;

var transforms = ['-moz-transform', '-webkit-transform', '-o-transform', '-ms-transform', 'transform'];

var name_anim_begin_rot = ["0deg"];
var name_anim_end_rot = ["-90deg"];
var name_anim_begin_pos = ["0px", "0px"];
var name_anim_end_pos = ["200px", "650px"];
var name_rot_crux = ["left center"];

// var name_scale = 2;
var name_scale_in = [1.15];
var name_scale_out = [1];

init();

var name_div = document.getElementById('name');
name_div.addEventListener("click", function() {
  if (click_enable) {
    click_enable = 0;
    if(rotated){
      name_div.style.animation = `rotate_horz ${anim_len}s forwards`;
      // name_div.style.webkitAnimation  = `rotate_horz ${anim_len}s forwards`;
      rotated = 0;
    } else {
      name_div.style.animation = `rotate_side ${anim_len}s forwards`;
      // name_div.style.webkitAnimation  = `rotate_side ${anim_len}s forwards`;
      rotated = 1;
    }
    setTimeout(function(){ click_enable = 1; }, anim_len * 1000);
  }
});

function init() {
  init_css_animation();

  console.log("screen width: " + screen.width);
  console.log("screen height: " + screen.height);

  let name_div = document.getElementById('name');
  // name_div.style.fontSize = 60;
  // console.log(name_div.style.fontSize);
  console.log("name width: " + (name_div.clientWidth)  + "px");
  console.log("name height: " + (name_div.clientHeight) + "px");
}

function init_css_animation() {
  let keyframes = find_keyframes_rule("rotate_side");

  keyframes.deleteRule("0%");
  keyframes.appendRule(create_css_transform_rule(0,
    "translate", true, name_anim_begin_pos,
    "rotate", true, name_anim_begin_rot,
    "transform-origin", false, name_rot_crux,
    "scale", true, name_scale_out));

  keyframes.deleteRule("100%");
  keyframes.appendRule(create_css_transform_rule(100,
    "translate", true, name_anim_end_pos,
    "rotate", true, name_anim_end_rot,
    "transform-origin", false, name_rot_crux,
    "scale", true, name_scale_in));


  keyframes = find_keyframes_rule("rotate_horz");

  keyframes.deleteRule("0%");
  keyframes.appendRule(create_css_transform_rule(0,
    "translate", true, name_anim_end_pos,
    "rotate", true, name_anim_end_rot,
    "transform-origin", false, name_rot_crux,
    "scale", true, name_scale_in));

  keyframes.deleteRule("100%");
  keyframes.appendRule(create_css_transform_rule(100,
    "translate", true, name_anim_begin_pos,
    "rotate", true, name_anim_begin_rot,
    "transform-origin", false, name_rot_crux,
    "scale", true, name_scale_out));
}

// returns string for CSS rule adding
function create_css_transform_rule () {
  let this_args = arguments;

  let percent = this_args[0];
  let rule = percent + "% { ";

  let first_transform_dependence_idx = 0;
  for (var i = 2; i < this_args.length; i += 3) {
    if (arguments[i]) {
      first_transform_dependence_idx = i;
      break;
    }
  }

  if (first_transform_dependence_idx) {
    transforms.forEach(function(item, idx) {
      for (var i = first_transform_dependence_idx - 1; i < this_args.length; i += 3) {
        if (this_args[i + 1]) {
          let function_name = this_args[i];
          let args = this_args[i + 2];
          rule = (i == first_transform_dependence_idx - 1) ? rule + item + ": " : rule + " ";
          rule = rule + function_name + "(";
          args.forEach(function(item, idx) {
            rule = (idx != args.length - 1) ? rule + item + ", " : rule + item + ")";
          });
        }
      }
      rule = rule + "; ";
    });
  }
  for (var i = 1; i < this_args.length; i += 3){
    if (!this_args[i + 1]) {
      let function_name = this_args[i];
      let args = this_args[i + 2];
      rule = rule + function_name + ": ";
      args.forEach(function(item, idx) {
        rule = (idx != args.length - 1) ? rule + item + ", " : rule + item;
      });
      rule = rule + "; ";
    }
  }
  return rule + " }";
}

// uses CSS DOM to change CSS rules
// used in initialization
function find_keyframes_rule(rule) {
  let ss = document.styleSheets;
  for (var i = 0; i < ss.length; ++i) {
    for (var j = 0; j < ss[i].cssRules.length; ++j) {
      if (ss[i].cssRules[j].type == window.CSSRule.KEYFRAMES_RULE && ss[i].cssRules[j].name == rule) {
        return ss[i].cssRules[j];
      }
    }
  }
  return null;
}
