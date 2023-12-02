create_head();

function create_head() {
  let head_html_prepend = `\
  <title>Arpad Voros</title>\
  <link rel="apple-touch-icon" sizes="180x180" href="../../../../../../resources/images/apple-touch-icon.png">\
  <link rel="icon" type="image/png" sizes="32x32" href="../../../../../../resources/images/favicon-32x32.png">\
  <link rel="icon" type="image/png" sizes="16x16" href="../../../../../../resources/images/favicon-16x16.png">\
  <link rel="manifest" href="../../../../../../resources/images/site.webmanifest">\
  `;
  // let head_html = ''
  // head_html = head_html + '<title>Arpad Voros</title>';
  // head_html = head_html + '<link rel="apple-touch-icon" sizes="180x180" href="../../../../../../resources/images/apple-touch-icon.png">';
  // head_html = head_html + '<link rel="icon" type="image/png" sizes="32x32" href="../../../../../../resources/images/favicon-32x32.png">';
  // head_html = head_html + '<link rel="icon" type="image/png" sizes="16x16" href="../../../../../../resources/images/favicon-16x16.png">';
  // head_html = head_html + '<link rel="manifest" href="../../../../../../resources/images/site.webmanifest">';
  // console.log('smthng');
  document.getElementById('head').innerHTML = head_html_prepend + document.getElementById('head').innerHTML;
}
