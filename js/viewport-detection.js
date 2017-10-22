(function () {
  var MINI = require('minified');
  var $ = MINI.$, HTML = MINI.HTML;

  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0).toString();
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0).toString();

  var windowSizeInfo = '<p>Width: ' + w + ' , Height: ' + h + '</p>';

  var upperAdPos = $('#div-gpt-ad-1508454321758-0').offset();
  var verticalAdPos = $('#div-gpt-ad-1508567979563-0').offset();
  var upperAdInfo = '<p>X: ' + upperAdPos.x + ' , Y: ' + upperAdPos.y + '</p>';
  var verticalAdInfo = '<p>X: ' + verticalAdPos.x + ' , Y: ' + verticalAdPos.y + '</p>';
  console.log(upperAdPos);
  console.log(verticalAdPos);

  function addStyles() {
    var infoBlockRules = {
      'position' : 'fixed',
      'right' : '5px',
      'bottom' : '5px',
      'background' : '#E0E0E0',
      'z-index': '1000',
      'width': '300px',
      'height': '200px',
      'padding': '6px'
    };

    var rules = {
      '.info-block': infoBlockRules,
    };

    cssobj(rules);
  }

  function addInfoBlock() {

    var html =  '<div class="info-block">' +
          '<h4>Above The Fold Size</h4>' +
          windowSizeInfo +
          '<h4>Upper Ad Position</h4>' +
          upperAdInfo +
          '<h4>Vertical Ad Position</h4>' +
          verticalAdInfo +
          '</div>';

      $('body').add(HTML(html));
  }

  addStyles();
  addInfoBlock();
}) ();