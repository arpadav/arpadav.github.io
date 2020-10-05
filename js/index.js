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

console.log(document.getElementsByClassName('tab'));

init();

var name_div = document.getElementById('name');
name_div.addEventListener("click", function() {
  if (click_enable) {
    click_enable = 0;
    if (rotated) {
      name_div.style.animation = `rotate_horz ${anim_len}s forwards`;
      name_div.style.webkitAnimation  = `rotate_horz ${anim_len}s forwards`;
      rotated = 0;
    } else {
      name_div.style.animation = `rotate_side ${anim_len}s forwards`;
      name_div.style.webkitAnimation  = `rotate_side ${anim_len}s forwards`;
      rotated = 1;
    }
    set_tab_visibility(rotated);
    setTimeout(function(){ click_enable = 1; }, anim_len * 1000);
  }
});

function init() {
  // console.log(document.getElementsByClassName('tabs'));
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

  // console.log(create_css_transform_rule(0,
  //   "translate", true, name_anim_begin_pos,
  //   "rotate", true, name_anim_begin_rot,
  //   "transform-origin", false, name_rot_crux,
  //   "scale", true, name_scale_out));

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

function set_tab_visibility(visible) {
  let tabs = document.getElementsByClassName("tab");
  let len = tabs.length;

  if (visible) for (i = 0; i < len; i++) tabs[i].style.visibility = "visible";
  else for (i = 0; i < len; i++) tabs[i].style.visibility = "hidden";
}

// find any CSS property from text
// STRING:
// TYPE.cssText.match(/(?<=PROP:)(\s*?)(.*?)(?=\"\s*?\;)/g)[0].match(/(?<=\")(.*?)$/g)[0];
// TYPE.cssText.match(RegExp(`(?<=${PROP}:)(\\s*?)(.*?)(?=\\"\\s*?\\;)`, 'g'))[0].match(/(?<=\")(.*?)$/g)[0];
// RAW:
// TYPE.cssText.match(/(?<=PROP:)(\s*?)(.*?)(?=\s*?\;)/g)[0].trim();
// TYPE.cssText.match(RegExp(`(?<=${PROP}:)(\\s*?)(.*?)(?=\\s*?\\;)`, 'g'))[0].trim();
function get_css_property(type, prop, str) {
  if (str) {
    try { return type.cssText.match(RegExp(`(?<=${prop}:)(\\s*?)(.*?)(?=\\"\\s*?\\;)`, 'g'))[0].match(/(?<=\")(.*?)$/g)[0]; }
    catch(err) { return null; }
  } else {
    try { return type.cssText.match(RegExp(`(?<=${prop}:)(\\s*?)(.*?)(?=\\s*?\\;)`, 'g'))[0].trim(); }
    catch(err) { return null; }
  }
}

// used in adding a rule for transformations
// used in initialization, and (somewhat) beyond
// returns a string (rule) to be added to the CSS rules
// input format: (0-100 percent, string func1, bool trans_dep1, array params1, string func2, ...
function create_css_transform_rule () {
  // save args
  let this_args = arguments;

  // get percent, begin 'rule' string to return
  let percent = this_args[0];
  let rule = percent + "% { ";

  // initialize arrays for transform dependent and independent functions
  trans_dep_idx = [];
  trans_indep_idx = [];

  // populate said arrays
  for (var i = 2; i < this_args.length; i += 3) {
    if (this_args[i]) trans_dep_idx.push(i - 1); else trans_indep_idx.push(i - 1);
  }

  // append 'rule' string with transform functions first
  transforms.forEach(function(t_item) {
    let more_trans_dep = 0;
    trans_dep_idx.forEach(function(idx) {
      let function_name = this_args[idx];
      let args = this_args[idx + 2];

      rule = (!more_trans_dep) ? rule + t_item + ": " : rule + " ";
      more_trans_dep = 1;
      rule = rule + function_name + "(";

      args.forEach(function(item, idx) {
        rule = (idx != args.length - 1) ? rule + item + ", " : rule + item + ")";
      });
    });
    rule = rule + "; ";
  });

  // then, append independent functions/properties
  trans_indep_idx.forEach(function(idx) {
    let function_name = this_args[idx];
    let args = this_args[idx + 2];

    rule = rule + function_name + ": ";
    args.forEach(function(item, idx) {
      rule = (idx != args.length - 1) ? rule + item + ", " : rule + item;
    });
    rule = rule + "; ";
  });

  return rule + " }";
}

// uses CSS DOM to look through CSS rules
// used in initialization of keyframe animations
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

// uses CSS DOM to look through CSS rules
// used in finding CSS styles
function find_selectortext_rule(rule) {
  let ss = document.styleSheets;
  for (var i = 0; i < ss.length; ++i) {
    for (var j = 0; j < ss[i].cssRules.length; ++j) {
      if (ss[i].cssRules[j].selectorText == rule) {
        return ss[i].cssRules[j];
      }
    }
  }
  return null;
}
