// reading json file, calls callback w parsed file
function readJSON(path, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', path, true);
  xhr.onload = function(e) {
    if (this.status == 200 && this.readyState == 4) callback(JSON.parse(xhr.responseText));
  }
  xhr.send(null);
}

export default readJSON;
