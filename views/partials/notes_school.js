import readJSON from '../../public/js/technical.js';

// read from notes_school.json
// must manually update bc pure js is dumb, but whatever
readJSON('../partials/notes_school.json', create_link_listing);

// might add this to technical, as others might use it in the future
function create_link_listing(json_arr) {
  let link_listing = '<ul>'
  let folders = json_arr['folders'];
  for (let i = 0; i < folders.length; i++) {
    link_listing = link_listing + '<p>' + folders[i]['name'] + '</p><ul>';
    for (let j = 0; j < folders[i]['files'].length; j++) {
      link_listing = link_listing + '<li><a ';
      link_listing = link_listing + 'href=\"../../resources/notes/school/' + folders[i]['name'] + '/' + folders[i]['files'][j]['dir'] + '\" target=\"_blank\">' + folders[i]['files'][j]['dir'] + '</a></li>';
    }
    link_listing = link_listing + '</ul>';
  }
  document.getElementById('school').innerHTML = link_listing;
}
