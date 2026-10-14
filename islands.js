/* =========================================================================
   care-match · islands.js — 群島語彙的視覺元件
   每位照護夥伴＝一座島（形狀由姓名/ID 決定，永遠一致）
   同一類服務的島＝一座群島
   用法：
     Islands.shape('吳佩蓉')        -> 有機島形（border-radius 8 值）
     Islands.layout(n, 'homecare')  -> 群島內 n 座島的相對座標（0–1 含邊距）
     Islands.size(8)                -> 依服務年資換算島的大小（px）
   需先載入 styles.css（.isle / .archipelago 樣式）
   ========================================================================= */
(function () {
  'use strict';

  /* 決定性雜湊：同一筆資料永遠得到同一個島形與位置 */
  function hash(str) {
    var h = 2166136261;
    str = String(str);
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0) / 4294967295;
  }

  /* 有機島形：8 值 border-radius，產生不規則但平滑的輪廓 */
  function shape(seed) {
    var v = function (i) { return (34 + hash(seed + ':r' + i) * 32).toFixed(1); };
    return v(0) + '% ' + v(1) + '% ' + v(2) + '% ' + v(3) + '% / ' +
           v(4) + '% ' + v(5) + '% ' + v(6) + '% ' + v(7) + '%';
  }

  /* 群島佈局：主島置中 + 兩圈環繞，最後在「像素空間」做鬆弛，
     保證任兩座島的中心距離 >= minDist（預設 48px），
     因此 44px 的觸控區永不重疊。opts = {w, h, minDist, spread} */
  function layout(count, seedKey, opts) {
    var n = Math.max(1, count | 0);
    var o = opts || {};
    var W = o.w || 480;
    var H = o.h || 200;
    var min = o.minDist || 48;
    var spread = o.spread === undefined ? 0.44 : o.spread;

    /* 初始位置（原點在欄位中心，單位 px） */
    var pts = [{ x: 0, y: 0 }];
    if (n > 1) {
      var rest = n - 1;
      var ring1 = Math.min(rest, 6);
      for (var i = 0; i < ring1; i++) {
        var a1 = (i / ring1) * Math.PI * 2 + hash(seedKey + ':r1') * 1.1;
        pts.push({ x: Math.cos(a1) * W * 0.5 * spread, y: Math.sin(a1) * H * 0.5 * spread * 1.25 });
      }
      rest -= ring1;
      for (var k = 0; k < rest; k++) {
        var a2 = (k / Math.max(1, rest)) * Math.PI * 2 + hash(seedKey + ':r2') * 0.9;
        pts.push({
          x: Math.cos(a2) * W * 0.5 * spread * 1.55,
          y: Math.sin(a2) * H * 0.5 * spread * 1.35
        });
      }
    }

    /* 抖動：讓排列自然，但幅度受控 */
    for (var m = 0; m < pts.length; m++) {
      pts[m].x += (hash(seedKey + ':jx' + m) - 0.5) * Math.min(26, W * 0.07);
      pts[m].y += (hash(seedKey + ':jy' + m) - 0.5) * Math.min(16, H * 0.09);
    }

    /* 鬆弛：推開過近的島，並限制在欄位內 */
    var halfW = Math.max(24, W * 0.46 - 24);
    var halfH = Math.max(24, H * 0.46 - 24);
    for (var it = 0; it < 80; it++) {
      for (var a = 0; a < pts.length; a++) {
        for (var b = a + 1; b < pts.length; b++) {
          var dx = pts[b].x - pts[a].x;
          var dy = pts[b].y - pts[a].y;
          var d = Math.sqrt(dx * dx + dy * dy) || 0.001;
          if (d < min) {
            var push = (min - d) / 2 + 0.5;
            var ux = dx / d, uy = dy / d;
            pts[a].x -= ux * push; pts[a].y -= uy * push;
            pts[b].x += ux * push; pts[b].y += uy * push;
          }
        }
      }
      for (var c = 0; c < pts.length; c++) {
        pts[c].x = Math.max(-halfW, Math.min(halfW, pts[c].x));
        pts[c].y = Math.max(-halfH, Math.min(halfH, pts[c].y));
      }
    }

    /* 轉回 0–1 相對座標 */
    return pts.map(function (q) {
      return { x: 0.5 + q.x / W, y: 0.5 + q.y / H };
    });
  }

  /* 島的大小：服務年資越長，島越大（18–32px） */
  function size(years, min, max) {
    var lo = min || 18, hi = max || 36;
    var y = Math.max(0, Math.min(24, Number(years) || 3));
    return Math.round(lo + (y / 24) * (hi - lo));
  }

  window.Islands = { hash: hash, shape: shape, layout: layout, size: size };
})();
