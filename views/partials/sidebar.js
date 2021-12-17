import {readJSON} from '../../../public/js/technicals.js';

readJSON('../../../views/partials/sidebar_exclude.json', null, get_nolink_pages);

// no main pages have sidebar
// SHOULD RENAME 'sidebar' to 'projects_sidebar'
var no_links = [];
function get_nolink_pages(params, json_arr) {
  let folders = json_arr['folders'];
  for (let i = 0; i < folders.length; i++) no_links.push(folders[i]['dir'].split('.')[0]);
  readJSON('../../../views/partials/sidebar.json', null, create_sidebar_html);
}

// read from header.json
function create_sidebar_html(params, json_arr) {
  let sidebar_html = '<li><img style=\"width: 268px;\" src="../../../resources/images/alligator.png"/></li>'

  let page = window.location.href.split("/");
  page = page[page.length - 1].split(".")[0];

  let links = true;
  for (let i = 0; i < no_links.length; i++) {
    if (page == no_links[i]) {
      links = false;
      break;
    }
  }
  if (links) {
    let parents = json_arr['parents'];
    for (let i = 0; i < parents.length; i++) {
      sidebar_html = sidebar_html + '<li><h3>' + parents[i]['name'] + '</h3></li>';
      let children = parents[i]['children'];
      for (let j = children.length - 1; j >= 0; j--) { // backwards, for rough chronological
        sidebar_html = sidebar_html + '<li><a ';
        sidebar_html = sidebar_html + 'href=\"../../../projects/' + children[j]['dir'] + '\" target=\"_parent\"><i>' + children[j]['title'] + '</i></a></li>';
      }
    }
  }
  document.getElementById('sidebar').innerHTML = sidebar_html;
}
