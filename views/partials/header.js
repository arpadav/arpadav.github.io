readJSON('../partials/header.json', create_header_html);

function create_header_html(json_arr) {
  let header_html = '<ul>'
  pages = json_arr['pages'];
  for (i = 0; i < pages.length; i++) {
    header_html = header_html + '<li><a ';
    header_html = header_html + 'href=\"../../' + pages[i]['dir'] + '\" target=\"_parent\">' + pages[i]['display'] + '</a></li>';
  }
  document.getElementById('header').innerHTML = header_html + '</ul>';
}

function readJSON(path, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', path, true);
  xhr.onload = function(e) {
    if (this.status == 200 && this.readyState == 4) callback(JSON.parse(xhr.responseText));
  }
  xhr.send(null);
}
