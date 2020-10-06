// static & technicals
// --------------------------------------------
// bools
var rotated = 0;
var click_enable = 1;

// transforms, do not edit
var transforms = ['-moz-transform', '-webkit-transform', '-o-transform', '-ms-transform', 'transform'];

// resize timeout
var resize_timeout;

// current and new font-sizes for main name
var fs_cur;
var fs_new;
// --------------------------------------------

// agjustables
// --------------------------------------------
// animation length
var anim_len = 0.8;

// scale before/after click
var name_scale_in = [1];
var name_scale_out = [1];
var tabs_scale_in = [1];
var tabs_scale_out = [1];

// name rotation specifications
var name_anim_begin_rot = ["0deg"];
var name_anim_end_rot = ["-90deg"];
var name_anim_begin_pos = ["0%", "0%"];
var name_anim_end_pos = ["-105%", "0%"];
var name_pivot = ["center"];

// tabs rotation specifications
var tabs_anim_begin_rot = ["90deg"];
var tabs_anim_end_rot = ["0deg"];
var tabs_anim_begin_pos = ["50%", "0%"];
var tabs_anim_end_pos = ["10%", "0%"];
var tabs_pivot = ["left center"];
// --------------------------------------------

init();

function init() {
  // resize on load
  resize_divs();

  // name clicking listener
  let name_div = document.getElementById('name');
  name_div.style.cursor = "pointer";
  name_div.addEventListener("click", name_click);

  // tabs head clicking listener
  let tabs_title = document.getElementsByClassName('head');
  for (i = 0; i < tabs_title.length; i++) {
    tabs_title[i].style.cursor = "pointer";
  }


  // add listener for resizing the window
  window.addEventListener("resize", function(){
    clearTimeout(resize_timeout);
    resize_timeout = setTimeout(resize_divs, 100);
  });

  // testing ---------------------------------------------
  // var rect = name_div.getBoundingClientRect();
  // console.log(rect);
  // name_anim_begin_pos[1] = `${rect.top - name_div.style.height.match(/(.+?)(?=px)/g)}px`;
  // console.log(name_anim_begin_pos);
  // testing ---------------------------------------------
}

// initialize css animations with transforms and rules
function update_css_anim() {

  // console.log(create_css_transform_rule(0,
  //   "translate", true, name_anim_begin_pos,
  //   "rotate", true, name_anim_begin_rot,
  //   "transform-origin", false, name_rot_crux,
  //   "scale", true, name_scale_out));

  // NAME INITIAL ROTATION
  let keyframes = find_keyframes_rule("name_rotate_side");
  keyframes.deleteRule("0%");
  keyframes.deleteRule("100%");
  keyframes.appendRule(create_css_transform_rule(0,
    "translate", true, name_anim_begin_pos,
    "rotate", true, name_anim_begin_rot,
    "transform-origin", false, name_pivot,
    "scale", true, name_scale_out));
  keyframes.appendRule(create_css_transform_rule(100,
    "translate", true, name_anim_end_pos,
    "rotate", true, name_anim_end_rot,
    "transform-origin", false, name_pivot,
    "scale", true, name_scale_in));

  // NAME SECOND ROTATION
  keyframes = find_keyframes_rule("name_rotate_horz");
  keyframes.deleteRule("0%");
  keyframes.deleteRule("100%");
  keyframes.appendRule(create_css_transform_rule(0,
    "translate", true, name_anim_end_pos,
    "rotate", true, name_anim_end_rot,
    "transform-origin", false, name_pivot,
    "scale", true, name_scale_in));
  keyframes.appendRule(create_css_transform_rule(100,
    "translate", true, name_anim_begin_pos,
    "rotate", true, name_anim_begin_rot,
    "transform-origin", false, name_pivot,
    "scale", true, name_scale_out));

    // TABS INITIAL ROTATION
    keyframes = find_keyframes_rule("tabs_rotate_side");
    keyframes.deleteRule("0%");
    keyframes.deleteRule("100%");
    keyframes.appendRule(create_css_transform_rule(0,
      "translate", true, tabs_anim_begin_pos,
      "rotate", true, tabs_anim_begin_rot,
      "transform-origin", false, tabs_pivot,
      "scale", true, tabs_scale_out));
    keyframes.appendRule(create_css_transform_rule(100,
      "translate", true, tabs_anim_end_pos,
      "rotate", true, tabs_anim_end_rot,
      "transform-origin", false, tabs_pivot,
      "scale", true, tabs_scale_in));

    // TABS SECOND ROTATION
    keyframes = find_keyframes_rule("tabs_rotate_horz");
    keyframes.deleteRule("0%");
    keyframes.deleteRule("100%");
    keyframes.appendRule(create_css_transform_rule(0,
      "translate", true, tabs_anim_end_pos,
      "rotate", true, tabs_anim_end_rot,
      "transform-origin", false, tabs_pivot,
      "scale", true, tabs_scale_in));
    keyframes.appendRule(create_css_transform_rule(100,
      "translate", true, tabs_anim_begin_pos,
      "rotate", true, tabs_anim_begin_rot,
      "transform-origin", false, tabs_pivot,
      "scale", true, tabs_scale_out));
}

// resize elements (divs) based on load and window resize
function resize_divs() {
  let main_div = document.getElementsByClassName('main');
  fs_cur = Number(main_div[0].style.fontSize.match(/(.+?)(?=px)/g));
  fs_new = Math.round(window.innerWidth / 32);
  resize_name();
}

// recursive resizing of name
function resize_name() {
  let container_div = document.getElementById('home');
  let main_div = document.getElementsByClassName('main');
  let timeout = 5;

  if (fs_new != fs_cur) {
    if (fs_new > fs_cur) main_div[0].style.fontSize = `${++fs_cur}px`;
    else main_div[0].style.fontSize = `${--fs_cur}px`;
    container_div.style.width = `${14 * fs_cur}px`;
    setTimeout(resize_name, timeout);
  } else {
    // change scale of transform, depending on window height
    name_scale_in[0] = window.innerHeight / Number(container_div.style.width.match(/(.+?)(?=px)/g));
    // update the css animation specs
    update_css_anim();
  }
}

// rotate name on click, disable clicking for animation length
// change visibility of other elements depending on status
function name_click() {
  let name_div = document.getElementById('name');
  let tabs = document.getElementsByClassName('tab');
  if (click_enable) {
    click_enable = 0;
    if (rotated) {
      name_div.style.animation = `name_rotate_horz ${anim_len}s forwards`;
      name_div.style.webkitAnimation  = `name_rotate_horz ${anim_len}s forwards`;
      for (i = 0; i < tabs.length; i++) {
        tabs[i].style.animation = `tabs_rotate_horz ${anim_len}s forwards fade_out ease ${anim_len}s forwards`;
        tabs[i].style.webkitAnimation  = `tabs_rotate_horz ${anim_len}s forwards, fade_out ease ${anim_len}s forwards`;
      }
      rotated = 0;
    } else {
      set_tab_visibility(true);
      name_div.style.animation = `name_rotate_side ${anim_len}s forwards`;
      name_div.style.webkitAnimation  = `name_rotate_side ${anim_len}s forwards`;
      for (i = 0; i < tabs.length; i++) {
        tabs[i].style.animation = `tabs_rotate_side ${anim_len}s forwards, fade_in ease ${anim_len}s forwards`;
        tabs[i].style.webkitAnimation  = `tabs_rotate_side ${anim_len}s forwards, fade_in ease ${anim_len}s forwards`;
      }
      rotated = 1;
    }
    // set_tab_visibility(rotated);
    setTimeout(function(){ click_enable = 1; }, anim_len * 1000);
  }
}

// toggles visibility of 'tabs'
function set_tab_visibility(visible) {
  let tabs = document.getElementsByClassName("tab");
  if (visible) for (i = 0; i < tabs.length; i++) tabs[i].style.visibility = "visible";
  else for (i = 0; i < tabs.length; i++) tabs[i].style.visibility = "hidden";
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
  // save arguments
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

// sleep function: from https://www.sitepoint.com/delay-sleep-pause-wait/
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
