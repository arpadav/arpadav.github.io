import {readJSON} from '../../../public/js/technicals.js';

readJSON('../../../views/partials/header.json', null, create_header_html);

// var yes_alligator = ["projects", "notes"];

// read from header.json
function create_header_html(params, json_arr) {
  let header_html = '<ul>'

  // let page = window.location.href.split("/");
  // page = page[page.length - 1].split(".")[0];
  //
  // let alligator = false;
  // for (let i = 0; i < yes_alligator.length; i++) if (page == yes_alligator[i]) alligator = true;
  // if (alligator) header_html = header_html + '<li><img src="../../../resources/images/alligator.png"/></li>';

  let pages = json_arr['pages'];
  for (let i = 0; i < pages.length; i++) {
    header_html = header_html + '<li><a ';
    header_html = header_html + 'href=\"../../../' + pages[i]['dir'] + '\" target=\"_parent\">' + pages[i]['display'] + '</a></li>';
  }
  document.getElementById('header').innerHTML = header_html + '</ul>';
}
