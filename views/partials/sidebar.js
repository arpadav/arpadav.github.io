import {readJSON} from '../../../public/js/technicals.js';

readJSON('../../../views/partials/sidebar.json', null, create_sidebar_html);

var no_links = ["projects", "notes"];

// read from header.json
function create_sidebar_html(params, json_arr) {
  let sidebar_html = '<li><img style=\"width: 268px;\" src="../../../resources/images/alligator.png"/></li>'

  let page = window.location.href.split("/");
  page = page[page.length - 1].split(".")[0];

  let links = true;
  for (let i = 0; i < no_links.length; i++) if (page == no_links[i]) links = false;
  if (links) {
    let parents = json_arr['parents'];
    for (let i = 0; i < parents.length; i++) {
      sidebar_html = sidebar_html + '<li><h3>' + parents[i]['name'] + '</h3></li>';
      let children = parents[i]['children'];
      for (let j = 0; j < children.length; j++) {
        sidebar_html = sidebar_html + '<li><a ';
        sidebar_html = sidebar_html + 'href=\"../../../projects/' + children[j]['dir'] + '\" target=\"_parent\"><i>' + children[j]['title'] + '</i></a></li>';
      }
    }
  }
  document.getElementById('sidebar').innerHTML = sidebar_html;
}
