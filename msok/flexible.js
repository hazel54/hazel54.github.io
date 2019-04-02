//判断是否是ie9 以下浏览器
function isNavigator(){
  var theUA = window.navigator.userAgent.toLowerCase();
  if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
      var ieVersion = theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] || theUA.match(/trident\s?\d+/)[0];
      if (ieVersion < 9){
        return false;
      }else{
        return true;
      }
  }else{
    return true;
  };
};
!(function(a, b) {
  //判断是否是ie9 以下浏览器
  if(!isNavigator()){
    return false;
  };
  var d,
  e = a.document,
  f = e.documentElement,
  g = e.querySelector('meta[name="viewport"]'),
  h = e.querySelector('meta[name="flexible"]'),
  i = 0,
  j = 0,
  k = b.flexible || (b.flexible = {})
  function c() {
    var b = f.getBoundingClientRect().width
    b / i > 540 && (b = 540 * i)
    var c = b / 10
    ;(f.style.fontSize = c + 'px'), (k.rem = a.rem = c)
  }
  if (g) {
    // console.warn('将根据已有的meta标签来设置缩放比例')
    var l = g.getAttribute('content').match(/initial\-scale=([\d\.]+)/)
    l && ((j = parseFloat(l[1])), (i = parseInt(1 / j,10)))
  } else if (h) {
    var m = h.getAttribute('content')
    if (m) {
      var n = m.match(/initial\-dpr=([\d\.]+)/),
        o = m.match(/maximum\-dpr=([\d\.]+)/)
      n && ((i = parseFloat(n[1])), (j = parseFloat((1 / i).toFixed(2)))),
        o && ((i = parseFloat(o[1])), (j = parseFloat((1 / i).toFixed(2))))
    }
  }
  if (!i && !j) {
    var p = (a.navigator.appVersion.match(/android/gi),
      a.navigator.appVersion.match(/iphone/gi)),
      q = a.devicePixelRatio
    ;(i = p
      ? q >= 3 && (!i || i >= 3) ? 3 : q >= 2 && (!i || i >= 2) ? 2 : 1
      : 1),
      (j = 1 / i)
  }
  if ((f.setAttribute('data-dpr', i), !g))
    if (
      ((g = e.createElement('meta')),
      g.setAttribute('name', 'viewport'),
      g.setAttribute(
        'content',
        'initial-scale=' +
          j +
          ', maximum-scale=' +
          j +
          ', minimum-scale=' +
          j +
          ', user-scalable=no'
      ),
      f.firstElementChild)
    )
      f.firstElementChild.appendChild(g)
    else {
      var r = e.createElement('div')
      r.appendChild(g), e.write(r.innerHTML)
    }
    //事件监听兼容ie
    if(document.addEventListener){
      a.addEventListener(
        'resize',
        function() {
          // clearTimeout(d), (d = setTimeout(c, 300))
          c();
        },
        !1
      )
    }else{
      a.attachEvent(
        'onresize',
        function() {
          // clearTimeout(d), (d = setTimeout(c, 300))
          c();
        }
      )
    }
    if(document.addEventListener){
      a.addEventListener(
        'pageshow',
        function(a) {
          a.persisted && (clearTimeout(d), (d = setTimeout(c, 300)))
        },
        !1
      )
    }else{
      a.attachEvent(
        'onpageshow',
        function(a) {
          a.persisted && (clearTimeout(d), (d = setTimeout(c, 300)))
        }
      )
    }
    if(document.addEventListener){
      'complete' === e.readyState
      ? (e.body.style.fontSize = 12 * i + 'px')
      : e.addEventListener(
          'DOMContentLoaded',
          function() {
            e.body.style.fontSize = 12 * i + 'px'
          },
          !1
        )
    }else{
      'complete' === e.readyState
      ? (e.body.style.fontSize = 12 * i + 'px')
      : e.attachEvent(
          'onDOMContentLoaded',
          function() {
            e.body.style.fontSize = 12 * i + 'px'
          }
        )
    }
    c(),
    (k.dpr = a.dpr = i),
    (k.refreshRem = c),
    (k.rem2px = function(a) {
      var b = parseFloat(a) * this.rem
      return 'string' === typeof a && a.match(/rem$/) && (b += 'px'), b
    }),
    (k.px2rem = function(a) {
      var b = parseFloat(a) / this.rem
      return 'string' === typeof a && a.match(/px$/) && (b += 'rem'), b
    })
})(window, window.lib || (window.lib = {}))
