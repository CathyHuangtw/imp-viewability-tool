(function () {
  var MINI = require('minified');
  var $ = MINI.$, HTML = MINI.HTML, EE = MINI.EE;
  var w, h, windowSizeInfo;

  function getWindowSize () {
    w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  }

  function getAdSize (ad) {
    var adHeight, adWidth;
    adHeight = $(ad).get('clientHeight');
    adWidth = $(ad).get('clientWidth');
    return { h: adHeight,
             w: adWidth } ;
  }

  var upperAdPos = $('#div-gpt-ad-1508454321758-0').offset();
  var upperAdSize = getAdSize('#div-gpt-ad-1508454321758-0');
  var verticalAdPos = $('#div-gpt-ad-1508567979563-0').offset();
  var verticalAdSize = getAdSize('#div-gpt-ad-1508567979563-0');
  var bottomAdPos = $('#div-gpt-ad-1508803854110-0').offset();
  var bottomAdSize = getAdSize('#div-gpt-ad-1508803854110-0');

  function checkViewable(adPos, adW, adH, scrollY) {
    var locX = adPos.x + adW,
        locY = adPos.y + adH,
        pageBottom = scrollY + h;
    // console.log(locX + ', ' +locY);
    if ((locX < w) && (scrollY < locY && locY < pageBottom)) return 'YES!';
    else return 'No.';
  }

  function checkInView(adPos, adW, adH, scrollX, scrollY) {
    var BRcornerAdPosX = adPos.x + adW, //bottom right corner of adPos
        BRcornerAdPosY = adPos.y + adH,
        vpRight = scrollX + w,
        vpBottom = scrollY + h;
    var adViewArea = 0;
    var viewPercentage = '0%'
    // part of ad is in the viewport
    if(BRcornerAdPosY > vpBottom && adPos.y < vpBottom) {
      adViewArea = adW * (vpBottom - adPos.y);
      viewPercentage = Math.round(adViewArea / (adW * adH) * 100) + '%';
    }
    // ad is out of the viewport
    if(BRcornerAdPosY < vpBottom && BRcornerAdPosY < scrollY) {
      viewPercentage = '0%';
    }
    // ad is totally in the viewport
    if(scrollY < adPos.y && BRcornerAdPosY < vpBottom) {
      viewPercentage = '100%';
    }
    return viewPercentage;
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
      width: '100%',
      border: '1px solid',
      'table-layout': 'auto'
    };

    var tableHeaderRules = {
      border: '1px solid',
      width: '25%',
      'text-align': 'center',
    };

    var columnRules = {
      border: '1px solid',
      width: '25%'
    };

    var rules = {
      '.info-block': infoBlockRules,
      'table': tableRules,
      'th': tableHeaderRules,
      'td': columnRules
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
    var html, adInfo;

    getWindowSize();
    windowSizeInfo = '<p class="win-size">Width: ' + w + ' , Height: ' + h + '</p>';
    html =  '<div class="info-block">' +
          '<h4>Above The Fold Size</h4>' +
          windowSizeInfo +
          '<table><tr id="test"><th>Ad</th><th>In View</th><th>Time</th><th>Viewable</th></tr>'+
          '</table>'+
          '</div>';
    adInfo = [ { name: 'A', inView: '-%', time: '30', viewable: '-' },
                   { name: 'B', inView: '20%', time: '30', viewable: '-' } ];


    $('body').add(HTML(html));
    adInfo.forEach(function(ad) {
      addTableRow(ad.name, ad.inView, ad.time, ad.viewable);
    });

    window.addEventListener('scroll', function(e) {
      last_known_scroll_y = window.pageYOffset;
      last_known_scroll_x = window.pageXOffset;
      console.log(last_known_scroll_x);

      // check viewable for each ad
      adInfo[0].viewable = checkViewable(upperAdPos, upperAdSize.w, upperAdSize.h, last_known_scroll_y);
      adInfo[0].inView = checkInView(upperAdPos, upperAdSize.w, upperAdSize.h, last_known_scroll_x, last_known_scroll_y);
      adInfo[1].viewable = checkViewable(verticalAdPos, verticalAdSize.w, verticalAdSize.h, last_known_scroll_y);
      adInfo[1].inView = checkInView(verticalAdPos, verticalAdSize.w, verticalAdSize.h, last_known_scroll_x, last_known_scroll_y);
      $('table tr').sub(1).fill(); // clear everything in the table except the header row
      adInfo.forEach(function(ad) {
        addTableRow(ad.name, ad.inView, ad.time, ad.viewable);
      });
    });

    window.addEventListener('resize', function(){
      getWindowSize();
      windowSizeInfo = '<p class="win-size">Width: ' + w + ' , Height: ' + h + '</p>';
      $('.win-size').replace(HTML(windowSizeInfo));
    });

  }

  addStyles();
  addInfoBlock();

}) ();