var resize_timeout;
var initialized = false;

function init_iframes_fh() {
  if (!initialized) {
    initialized = true;
    // add listener for resizing the window
    window.addEventListener("resize", function(){
      clearTimeout(resize_timeout);
      resize_timeout = setTimeout(loop_iframes, 200);
    });
  }
  // loop through all available iframes to extend height
  loop_iframes();
}

function loop_iframes() {
  let iframes_fh = document.getElementsByClassName('iframes_fh');
  for (let i = 0; i < iframes_fh.length; i++) set_iframe_height(iframes_fh[i].id);
}

// from https://www.dyn-web.com/tutorials/iframes/height/
function set_iframe_height(id) {
	let ifrm = document.getElementById(id);
  let doc = ifrm.contentDocument ? ifrm.contentDocument : ifrm.contentWindow.document;

  ifrm.style.visibility = 'hidden';
  ifrm.style.height = "10px";
  ifrm.style.height = get_doc_height(doc) + 30 + "px";
  ifrm.style.visibility = 'visible';
}

function get_doc_height(doc) {
	doc = doc || document;
	let body = doc.body, html = doc.documentElement;
	let height = Math.max( html.clientHeight, html.scrollHeight, html.offsetHeight, body.scrollHeight, body.offsetHeight );
	return height;
}
