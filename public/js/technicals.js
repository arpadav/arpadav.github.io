// reading json file, calls callback w parsed file
function readJSON(path, params, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', path, true);
  xhr.onload = function(e) {
    if (this.status == 200 && this.readyState == 4) callback(params, JSON.parse(xhr.responseText));
  }
  xhr.send(null);
}

// creates a list of links given the folder object
// as well as the location
function create_link_listing(loc, json_arr) {
  let link_listing = '<ul>';
  let folders = json_arr['folders'];
  for (let i = folders.length - 1; i >= 0; i--) { // backwards, for rough chronological
    link_listing = link_listing + '<p>' + folders[i]['name'] + '</p><ul>';
    for (let j = 0; j < folders[i]['files'].length; j++) {
      link_listing = link_listing + '<li><a href=\"../../resources/notes/' + loc + '/' + folders[i]['name'] + '/' + folders[i]['files'][j]['dir'] + '\"';
      link_listing = link_listing + ' target=\"_blank\">' + folders[i]['files'][j]['dir'] + '</a></li>';
    }
    link_listing = link_listing + '</ul>';
  }
  document.getElementById(loc).innerHTML = link_listing;
}

// creates an iframe
// as well as the location
function create_iframes(params, json_arr) {
  let loc = params[0];
  let iframe_list = '';
  let folders = json_arr['folders'];
  for (let i = folders.length - 1; i >= 0; i--) { // backwards, for rough chronological
    // add whitespace + some character to make headers same size on mobile
    // ~54 characters is sweet spot. if any still small, increase this
    let min_len = 54;
    let offset = 40;
    let appendage = '';
    if (folders[i]['title'].length < min_len) appendage = "&nbsp;".repeat(min_len + offset - folders[i]['title'].length);
    

    let dropdown = `\
    <div class="card">\
    <img style="width: 7px; height: 7px;" src="../../resources/images/tri.png" class="rotateimg90"/>\
    <h3 style="margin-left: 7px;"><i>${folders[i]['title']}${appendage}</i></h3></div>\
    <div class="body" id=\"${folders[i]['name']}"><p>${folders[i]['comments']}</p>\
    <a href="../../projects/${folders[i]['name']}" target="_parent">VIEW FULL PAGE</a><br>\
    <iframe id="subpage_${folders[i]['name']}" class="iframes_fh" src="subpages/${folders[i]['name']}.html" title="${folders[i]['name']}" style="margin-left: 10%" width=80% onload="init_iframes_fh()"></iframe>\
    <br><a href="../../projects/${folders[i]['name']}\" target="_parent">VIEW FULL PAGE</a>\
    </div>`;

    let just_link = `\
    <a href="../../projects/${folders[i]['name']}\" target="_parent" class="no-underline">\
      <div class="card">\
          <img style="width: 7px; height: 7px;" src="../../resources/images/tri.png"/>\
          <h3 style="margin-left: 7px;"><i>${folders[i]['title']}${appendage}</i></h3>\
        </div>
    </a>`;


    iframe_list = iframe_list + just_link;

    // iframe_list = iframe_list + '<div class=\"card\">';
    // iframe_list = iframe_list + '<img style=\"width: 7px; height: 7px;\" src=\"../../resources/images/tri.png\" class=\"rotateimg90\"/>';
    // iframe_list = iframe_list + '<h3 style=\"margin-left: 7px;\"><i>' + folders[i]['title'] + appendage + '</i></h3></div>';
    // iframe_list = iframe_list + '<div class=\"body\" id=\"' + folders[i]['name'] + '\"><p>' + folders[i]['comments'] + '</p>';
    // // iframe_list = iframe_list + '<a href=\"../../projects/' + folders[i]['name'] + '\" target=\"_parent\">VIEW FULL PAGE</a><br><p></p>';
    // iframe_list = iframe_list + '<a href=\"../../projects/' + folders[i]['name'] + '\" target=\"_parent\">VIEW FULL PAGE</a><br>';
    // iframe_list = iframe_list + '<iframe id=\"subpage_' + folders[i]['name'] + '\" class=\"iframes_fh\" src=\"subpages/' + folders[i]['name'] + '.html\" title=\"' + folders[i]['name'] + '\" style=\"margin-left: 10%\" width=80% onload=\"init_iframes_fh()\"></iframe>';
    // iframe_list = iframe_list + '<br><a href=\"../../projects/' + folders[i]['name'] + '\" target=\"_parent\">VIEW FULL PAGE</a>';
    // iframe_list = iframe_list + '</div>';
  }
  document.getElementById(loc).innerHTML = iframe_list;
  if (params[1]) params[1]();
}

// export
export {readJSON, create_link_listing, create_iframes};
