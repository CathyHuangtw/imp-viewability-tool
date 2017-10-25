(function () {
  var MINI = require('minified');
  var $ = MINI.$, HTML = MINI.HTML, EE = MINI.EE;

  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0).toString();
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0).toString();

  var windowSizeInfo = '<p>Width: ' + w + ' , Height: ' + h + '</p>';

  var upperAdPos = $('#div-gpt-ad-1508454321758-0').offset();
  var upperAdH = $('#div-gpt-ad-1508454321758-0').get('clientHeight');
  var upperAdW = $('#div-gpt-ad-1508454321758-0').get('clientWidth');
  var verticalAdPos = $('#div-gpt-ad-1508567979563-0').offset();
  var bottomAdPos = $('#div-gpt-ad-1508803854110-0').offset();

  function checkViewable(adPos, adW, adH) {
    var locX = adPos.x + adW,
        locY = adPos.y + adH;
    if ((locX < w) && (locY < h)) return 'YES!';
    else return 'No.';
  }

  function addStyles() {
    var infoBlockRules = {
      'position' : 'fixed',
      'right' : '5px',
      'bottom' : '5px',
      'background' : 'rgba(224, 224, 224, 0.9)',
      'z-index': '1000',
      'width': '400px',
      'height': '400px',
      'padding': '15px',
    };

    var tableRules = {
      'width': '100%',
      border: '1px solid'
    };

    var rules = {
      '.info-block': infoBlockRules,
      'table, th, td': tableRules
    };

    cssobj(rules);
  }

  function addTableRow(name, inView, time, viewable) {
    $('table').add(EE('tr', [
      EE('td', name),
      EE('td', inView),
      EE('td', time),
      EE('td', viewable)
      ])
    );
  }

  function addInfoBlock() {
    var html =  '<div class="info-block">' +
          '<h4>Above The Fold Size</h4>' +
          windowSizeInfo +
          '<table><tr id="test"><th>Ad</th><th>In View</th><th>Time</th><th>Viewable</th></tr>'+
          '</table>'+
          '</div>';
    var adInfo = [ { name: 'A', inView: '20%', time: '30', viewable: 'YES' },
                   { name: 'B', inView: '20%', time: '30', viewable: 'YES' } ];

    $('body').add(HTML(html));
    adInfo.forEach(function(ad) {
      addTableRow(ad.name, ad.inView, ad.time, ad.viewable);
    });

  }

  addStyles();
  addInfoBlock();
  console.log(checkViewable(upperAdPos, upperAdW, upperAdH));

}) ();