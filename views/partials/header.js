import readJSON from '../../public/js/technical.js';

readJSON('../partials/header.json', create_header_html);

function create_header_html(json_arr) {
  let header_html = '<ul>'
  let pages = json_arr['pages'];
  for (let i = 0; i < pages.length; i++) {
    header_html = header_html + '<li><a ';
    header_html = header_html + 'href=\"../../' + pages[i]['dir'] + '\" target=\"_parent\">' + pages[i]['display'] + '</a></li>';
  }
  document.getElementById('header').innerHTML = header_html + '</ul>';
}
