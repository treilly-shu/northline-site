/* Northline Coffee: the coffee map on the Bean Guide tab.
   A dot map drawn from simplified coastlines (no map files, no network), with a pin for each
   growing country. Regions zoom the map; pins open a panel; variety cards can light up the
   countries they grow in. Plain script so it opens from index.html directly. */
(function () {
  'use strict';

  var B = window.NorthlineBeans;
  var frame = document.getElementById('map-frame');
  if (!B || !frame) return;

  var NS = 'http://www.w3.org/2000/svg';
  var BELT = 23.44;

  /* ================= LAND =================
     Very simplified coastlines as [longitude, latitude] rings. Coarse on purpose: the map
     is drawn as dots, so it only needs to read as the world, not to survey it. */
  var LAND = [
    // North and Central America
    [[-168,66],[-150,71],[-125,70],[-95,72],[-80,68],[-78,62],[-70,60],[-64,60],[-56,52],[-60,47],[-66,44],[-70,42],[-74,40],[-76,35],[-81,31],[-80,26],[-81,25],[-83,29],[-90,30],[-94,29],[-97,26],[-97,22],[-95,19],[-91,19],[-90,21],[-87,21],[-88,16],[-84,15],[-83,11],[-81,9],[-78,9],[-77,8],[-80,7],[-82,8],[-86,11],[-88,13],[-92,14],[-95,16],[-100,17],[-105,20],[-106,23],[-109,26],[-112,29],[-114,30],[-117,32],[-120,34],[-123,38],[-124,42],[-124,47],[-127,50],[-131,54],[-135,58],[-140,60],[-147,61],[-152,59],[-158,57],[-163,55],[-158,58],[-162,60],[-165,62]],
    // Greenland
    [[-55,60],[-43,60],[-35,66],[-20,70],[-20,80],[-60,80],[-70,77],[-58,70],[-52,66]],
    // Caribbean
    [[-85,22],[-80,23],[-74,20],[-78,20],[-82,22]],
    [[-74,18],[-69,18],[-68,19.5],[-72,20]],
    // South America
    [[-80,9],[-77,8],[-72,12],[-64,11],[-60,9],[-52,5],[-50,1],[-44,-2],[-35,-5],[-35,-9],[-39,-13],[-39,-18],[-41,-22],[-45,-23],[-48,-26],[-49,-29],[-53,-34],[-57,-36],[-57,-39],[-62,-39],[-65,-42],[-65,-46],[-68,-50],[-69,-53],[-72,-54],[-74,-50],[-75,-45],[-73,-38],[-71,-30],[-70,-18],[-76,-14],[-80,-6],[-81,-3],[-80,0],[-78,3],[-77,7]],
    // Europe and Asia
    [[-10,36],[-9,43],[-1,44],[-2,47],[-5,48],[2,51],[6,53],[8,55],[5,58],[5,62],[15,70],[30,71],[60,70],[80,73],[110,74],[140,72],[170,70],[180,66],[178,62],[163,60],[156,51],[155,57],[143,59],[135,55],[141,52],[140,48],[133,43],[129,41],[129,35],[126,35],[126,38],[122,40],[121,37],[119,35],[121,31],[122,28],[119,25],[114,22],[109,21],[108,17],[109,12],[106,10],[105,9],[103,10],[101,13],[100,8],[103,4],[104,1],[101,3],[98,8],[98,12],[97,16],[94,17],[94,20],[92,22],[90,22],[87,21],[85,19],[80,15],[80,10],[78,8],[76,9],[74,14],[73,18],[72,21],[69,22],[67,25],[62,25],[57,26],[56,24],[59,22],[57,19],[55,17],[52,16],[45,13],[43,13],[43,16],[39,22],[35,28],[34,28],[32,30],[35,33],[36,36],[30,36],[27,37],[26,40],[24,40],[22,37],[21,39],[19,42],[16,43],[13,45],[12,44],[16,41],[18,40],[16,38],[15,40],[12,42],[10,44],[7,44],[3,43],[3,42],[0,40],[-1,37],[-5,36]],
    // Britain and Ireland
    [[-5,50],[1,51],[1,53],[-2,56],[-5,58],[-6,56],[-3,54],[-5,52]],
    [[-10,52],[-6,52],[-6,55],[-8,55]],
    // Africa and Madagascar
    [[-17,21],[-16,24],[-13,28],[-10,30],[-9,33],[-6,36],[0,36],[10,37],[11,34],[20,31],[25,32],[32,31],[34,28],[37,22],[39,16],[43,12],[51,12],[51,10],[47,5],[42,-1],[40,-5],[39,-10],[41,-15],[35,-22],[35,-25],[33,-28],[28,-33],[20,-35],[18,-33],[17,-29],[15,-26],[12,-17],[12,-6],[9,-1],[9,4],[6,4],[2,6],[-4,5],[-8,4],[-12,7],[-15,11],[-17,15]],
    [[44,-25],[44,-17],[47,-14],[50,-15],[50,-17],[47,-25]],
    // Islands of Southeast Asia and the Pacific
    [[95,5],[98,4],[104,-2],[106,-6],[102,-4],[96,2]],
    [[109,1],[110,-3],[116,-4],[119,1],[117,7],[114,4]],
    [[105,-6],[114,-7],[114,-8.5],[106,-7.5]],
    [[119,-5],[120,1],[124,1],[121,-1],[123,-5]],
    [[131,-1],[141,-2],[150,-6],[147,-10],[141,-9],[137,-5]],
    [[120,18],[122,18],[124,13],[126,8],[125,6],[122,8],[121,14]],
    [[130,31],[133,34],[140,36],[142,40],[141,45],[144,44],[140,41],[136,35],[131,33]],
    [[80,10],[82,7],[81,6],[80,7]],
    // Australia and New Zealand
    [[114,-22],[114,-34],[118,-35],[124,-34],[131,-31],[136,-35],[139,-37],[144,-38],[147,-39],[150,-37],[153,-31],[153,-25],[146,-19],[142,-11],[136,-12],[132,-11],[127,-14],[122,-18]],
    [[172,-34],[178,-38],[176,-41],[171,-46],[167,-46],[172,-41]]
  ];

  /* ================= COUNTRIES =================
     Pins sit roughly in each country's coffee-growing area, not its center. */
  var COUNTRIES = [
    { name: 'Ethiopia', region: 'africa', lat: 7.5, lon: 38.5, note: 'Where arabica comes from. Washed and natural coffees from Yirgacheffe, Sidama, and Guji: floral, citrus, berry.' },
    { name: 'Kenya', region: 'africa', lat: -0.5, lon: 37.0, note: 'Washed SL28 and SL34 from high farms around Mount Kenya. Juicy, sharp, blackcurrant.' },
    { name: 'Rwanda', region: 'africa', lat: -1.9, lon: 29.6, note: 'Washed bourbon from hilly smallholder farms. Sweet and bright, with red fruit.' },
    { name: 'Burundi', region: 'africa', lat: -3.6, lon: 30.0, note: 'Bourbon from smallholders, processed at shared washing stations. Bright and clean.' },
    { name: 'Uganda', region: 'africa', lat: 1.2, lon: 32.4, note: 'Mostly robusta, which grows wild here, plus arabica from the slopes of Mount Elgon.' },
    { name: 'Tanzania', region: 'africa', lat: -3.6, lon: 36.6, note: 'Arabica from around Kilimanjaro and the southern highlands. Often sold as peaberry.' },
    { name: 'Malawi', region: 'africa', lat: -11.0, lon: 33.9, note: 'A small producer in the northern highlands, growing SL28 among others.' },
    { name: 'Zimbabwe', region: 'africa', lat: -19.3, lon: 32.6, note: 'A small producer in the Eastern Highlands, growing SL28 among others.' },
    { name: 'Cameroon', region: 'africa', lat: 5.6, lon: 10.4, note: 'Arabica in the western highlands, including the Java variety, and robusta in the lowlands.' },
    { name: 'Yemen', region: 'africa', lat: 15.0, lon: 44.0, note: 'Where coffee first became a crop. Natural coffees from terraced mountain farms: wild and winey.' },

    { name: 'Mexico', region: 'central', lat: 16.6, lon: -94.0, note: 'Mostly washed coffee from Chiapas, Oaxaca, and Veracruz. Mild, nutty, chocolatey.' },
    { name: 'Guatemala', region: 'central', lat: 15.2, lon: -91.0, note: 'Volcanic highlands and old bourbon farms. Chocolate with bright acidity.' },
    { name: 'Honduras', region: 'central', lat: 14.8, lon: -87.5, note: 'The largest producer in Central America. Catuaí, caturra, pacamara, and catimor.' },
    { name: 'El Salvador', region: 'central', lat: 13.7, lon: -89.4, note: 'Home of pacamara and of old bourbon farms. Sweet and round.' },
    { name: 'Nicaragua', region: 'central', lat: 12.9, lon: -85.8, note: 'Washed coffee from Jinotega and Matagalpa. Balanced, sweet, nutty.' },
    { name: 'Costa Rica', region: 'central', lat: 9.7, lon: -84.0, note: 'Known for honey processing and small micro-mills. Clean and sweet.' },
    { name: 'Panama', region: 'central', lat: 8.8, lon: -82.4, note: 'Where gesha became famous, on the misty slopes around Boquete.' },
    { name: 'Jamaica', region: 'central', lat: 18.1, lon: -76.6, note: 'Typica from the Blue Mountains. Mild and clean.' },

    { name: 'Colombia', region: 'south', lat: 4.5, lon: -75.7, note: 'Washed coffee from the Andes, with harvests at different times across the country. Castillo, caturra, and newer specialty types.' },
    { name: 'Ecuador', region: 'south', lat: -1.8, lon: -79.0, note: 'Small production, mostly high in the Andes. Where the sidra story starts.' },
    { name: 'Peru', region: 'south', lat: -6.0, lon: -78.0, note: 'Washed coffee from small farms in the north. Mild and sweet.' },
    { name: 'Bolivia', region: 'south', lat: -16.2, lon: -67.7, note: 'Small, high farms in the Yungas. Delicate and sweet.' },
    { name: 'Brazil', region: 'south', lat: -20.0, lon: -45.0, note: 'The largest producer in the world. Natural and pulped natural coffees: nutty, chocolatey, low acidity.' },

    { name: 'India', region: 'asia', lat: 12.8, lon: 75.8, note: 'Shade-grown arabica and robusta in the south, and monsooned coffee from the Malabar coast.' },
    { name: 'Vietnam', region: 'asia', lat: 12.7, lon: 108.2, note: 'The largest robusta producer, plus catimor arabica from the highlands.' },
    { name: 'Laos', region: 'asia', lat: 15.1, lon: 106.4, note: 'Robusta and catimor arabica on the Bolaven Plateau.' },
    { name: 'Yunnan', region: 'asia', lat: 23.0, lon: 100.5, note: 'China’s coffee province. Mostly catimor, with more specialty lots each year.' },
    { name: 'Indonesia', region: 'asia', lat: 2.6, lon: 98.6, note: 'Wet-hulled coffee from Sumatra and Sulawesi: earthy, herbal, heavy. Typica and catimor types.' },
    { name: 'Papua New Guinea', region: 'asia', lat: -6.0, lon: 145.0, note: 'Coffee from smallholder gardens in the highlands, much of it typica.' },
    { name: 'Philippines', region: 'asia', lat: 13.9, lon: 121.1, note: 'Known for barako, a liberica coffee from Batangas. Smoky and heavy.' },
    { name: 'Malaysia', region: 'asia', lat: 1.9, lon: 103.3, note: 'Grows liberica and robusta, mostly in the south.' },
    { name: 'Hawaii', region: 'asia', lat: 19.6, lon: -155.9, note: 'Typica on the slopes of the Kona coast. Mild and smooth.' }
  ];

  /* What each region frame shows, as [west, north, east, south] in degrees. */
  var VIEWS = {
    all:     [-165, 48, 162, -42],
    africa:  [-14, 24, 58, -26],
    central: [-112, 25, -70, 5],
    south:   [-88, 13, -33, -26],
    asia:    [66, 31, 152, -12]
  };

  /* ================= SETUP ================= */

  var svg = document.getElementById('map-svg');
  var pinLayer = document.getElementById('map-pins');
  var panel = document.getElementById('map-panel');
  var regionBar = document.getElementById('map-regions');
  var select = document.getElementById('map-country-select');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var byName = {};
  COUNTRIES.forEach(function (c) { c.varieties = []; byName[c.name] = c; });
  B.VARIETIES.forEach(function (v) {
    v.countries.forEach(function (n) { if (byName[n]) byName[n].varieties.push(v); });
  });

  var state = { region: 'all', country: null, variety: null };
  var view = null;      // current viewBox [x, y, w, h], with y = -latitude
  var target = 'all';   // what the view should fit, for resizes

  function el(tag, attrs, text) {
    var node = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    if (text != null) node.textContent = text;
    return node;
  }
  function svgEl(tag, attrs) {
    var node = document.createElementNS(NS, tag);
    Object.keys(attrs).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    return node;
  }

  /* Point in polygon, even-odd rule. */
  function inside(lon, lat, ring) {
    var hit = false;
    for (var i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      var xi = ring[i][0], yi = ring[i][1], xj = ring[j][0], yj = ring[j][1];
      if (((yi > lat) !== (yj > lat)) && (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi)) hit = !hit;
    }
    return hit;
  }

  /* Bounding boxes make the land test cheap enough to run a fine grid. */
  var BOXES = LAND.map(function (ring) {
    var b = [Infinity, -Infinity, Infinity, -Infinity];
    ring.forEach(function (p) { b[0] = Math.min(b[0], p[0]); b[1] = Math.max(b[1], p[0]); b[2] = Math.min(b[2], p[1]); b[3] = Math.max(b[3], p[1]); });
    return b;
  });
  function isLand(lon, lat) {
    for (var k = 0; k < LAND.length; k++) {
      var b = BOXES[k];
      if (lon < b[0] || lon > b[1] || lat < b[2] || lat > b[3]) continue;
      if (inside(lon, lat, LAND[k])) return true;
    }
    return false;
  }

  /* Dots as one path per color: far lighter than thousands of circles. */
  function dots(step, r, latTop, latBottom) {
    var belt = [], other = [];
    for (var lat = latTop; lat >= latBottom; lat -= step) {
      for (var lon = -180 + step / 2; lon < 180; lon += step) {
        if (!isLand(lon, lat)) continue;
        var d = 'M' + (lon - r).toFixed(2) + ' ' + (-lat).toFixed(2) + 'a' + r + ' ' + r + ' 0 1 0 ' + (2 * r) + ' 0a' + r + ' ' + r + ' 0 1 0 ' + (-2 * r) + ' 0';
        (Math.abs(lat) <= BELT ? belt : other).push(d);
      }
    }
    return { belt: belt.join(''), other: other.join('') };
  }

  var coarse, fine = null;
  function drawLand() {
    svg.appendChild(svgEl('rect', { x: -180, y: -BELT, width: 360, height: BELT * 2, 'class': 'map-belt' }));
    var c = dots(1.5, 0.52, 70, -56);
    coarse = svgEl('g', { 'class': 'map-layer' });
    coarse.appendChild(svgEl('path', { d: c.other, 'class': 'map-land' }));
    coarse.appendChild(svgEl('path', { d: c.belt, 'class': 'map-land map-land-belt' }));
    svg.appendChild(coarse);
    [BELT, -BELT].forEach(function (t) {
      svg.appendChild(svgEl('line', { x1: -180, x2: 180, y1: -t, y2: -t, 'class': 'map-tropic', 'vector-effect': 'non-scaling-stroke' }));
    });
    svg.appendChild(svgEl('line', { x1: -180, x2: 180, y1: 0, y2: 0, 'class': 'map-equator', 'vector-effect': 'non-scaling-stroke' }));
  }

  /* ================= VIEW AND ZOOM ================= */

  function frameAspect() {
    var w = frame.clientWidth || 1000, h = frame.clientHeight || 400;
    return w / h;
  }

  /* Fit [west, north, east, south] into the frame's shape, with a little padding. */
  function fit(b) {
    var w = (b[2] - b[0]) * 1.08, h = (b[1] - b[3]) * 1.12;
    var a = frameAspect();
    if (w / h > a) h = w / a; else w = h * a;
    var cx = (b[0] + b[2]) / 2, cy = -(b[1] + b[3]) / 2;
    return [cx - w / 2, cy - h / 2, w, h];
  }

  function boundsFor(t) {
    if (typeof t === 'string') return VIEWS[t];
    return t; // already bounds
  }

  /* When zoomed in, swap to a finer grid so the land doesn't turn into big blocks.
     It's built the first time it's needed, between about 40N and 40S. */
  function useFine(on) {
    if (on && !fine) {
      var f = dots(0.6, 0.21, 40, -40);
      fine = svgEl('g', { 'class': 'map-layer' });
      fine.appendChild(svgEl('path', { d: f.other, 'class': 'map-land' }));
      fine.appendChild(svgEl('path', { d: f.belt, 'class': 'map-land map-land-belt' }));
      svg.insertBefore(fine, coarse.nextSibling);
    }
    if (fine) fine.style.display = on ? '' : 'none';
    coarse.style.display = on ? 'none' : '';
  }

  function applyView(v) {
    view = v;
    svg.setAttribute('viewBox', v.map(function (n) { return n.toFixed(3); }).join(' '));
    useFine(v[2] < 200);
    placePins();
  }

  var anim = null;
  function zoomTo(t) {
    target = t;
    var to = fit(boundsFor(t));
    if (!view || reduceMotion) { applyView(to); return; }
    var from = view.slice(), start = null, dur = 700;
    if (anim) cancelAnimationFrame(anim);
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / dur);
      var e = p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      applyView(from.map(function (f, i) { return f + (to[i] - f) * e; }));
      if (p < 1) anim = requestAnimationFrame(step); else anim = null;
    }
    anim = requestAnimationFrame(step);
  }

  /* Bounds around a set of countries, never tighter than a comfortable minimum. */
  function boundsAround(list, minW, minH) {
    var w = Infinity, n = -Infinity, e = -Infinity, s = Infinity;
    list.forEach(function (c) { w = Math.min(w, c.lon); e = Math.max(e, c.lon); n = Math.max(n, c.lat); s = Math.min(s, c.lat); });
    var cx = (w + e) / 2, cy = (n + s) / 2;
    var bw = Math.max(e - w + 16, minW), bh = Math.max(n - s + 12, minH);
    return [cx - bw / 2, cy + bh / 2, cx + bw / 2, cy - bh / 2];
  }

  /* ================= PINS ================= */

  var pins = {};
  function buildPins() {
    COUNTRIES.forEach(function (c, i) {
      var count = c.varieties.length;
      var btn = el('button', {
        type: 'button', 'class': 'map-pin', 'data-region': c.region, 'aria-pressed': 'false',
        'aria-label': c.name + ', ' + B.REGIONS[c.region].label + '. ' +
          (count ? count + (count === 1 ? ' variety' : ' varieties') + ' in this guide.' : 'Notes on what grows here.')
      });
      btn.style.setProperty('--i', i);
      btn.appendChild(el('span', { 'class': 'pin-dot', 'aria-hidden': 'true' }));
      btn.appendChild(el('span', { 'class': 'pin-label', 'aria-hidden': 'true' }, c.name));
      btn.addEventListener('click', function () { selectCountry(c.name, true); });
      pinLayer.appendChild(btn);
      pins[c.name] = btn;
    });
  }

  function placePins() {
    COUNTRIES.forEach(function (c) {
      var btn = pins[c.name];
      var x = (c.lon - view[0]) / view[2] * 100;
      var y = (-c.lat - view[1]) / view[3] * 100;
      btn.style.left = x + '%';
      btn.style.top = y + '%';
      var off = x < -2 || x > 102 || y < -4 || y > 104;
      btn.classList.toggle('offscreen', off);
      btn.tabIndex = off ? -1 : 0;
      btn.classList.toggle('label-left', x > 82);
    });
  }

  function paintPins() {
    var lit = null;
    if (state.variety) lit = state.variety.countries;
    COUNTRIES.forEach(function (c) {
      var btn = pins[c.name];
      var inRegion = state.region === 'all' || c.region === state.region;
      var isLit = lit ? lit.indexOf(c.name) >= 0 : false;
      btn.classList.toggle('dim', lit ? !isLit : !inRegion);
      btn.classList.toggle('lit', isLit);
      btn.classList.toggle('selected', state.country === c.name);
      btn.setAttribute('aria-pressed', state.country === c.name ? 'true' : 'false');
    });
  }

  /* ================= PANEL ================= */

  function chip(label, onClick, cls) {
    var b = el('button', { type: 'button', 'class': 'chip chip-small' + (cls ? ' ' + cls : '') }, label);
    b.addEventListener('click', onClick);
    return b;
  }

  function varietyChips(list) {
    var wrap = el('div', { 'class': 'panel-chips' });
    list.forEach(function (v) {
      wrap.appendChild(chip(v.name, function () {
        document.dispatchEvent(new CustomEvent('northline:focus-variety', { detail: { name: v.name } }));
      }));
    });
    return wrap;
  }

  function renderPanel() {
    panel.textContent = '';
    if (state.variety) {
      var v = state.variety;
      panel.appendChild(el('p', { 'class': 'panel-eyebrow' }, B.FAMILIES[v.family]));
      panel.appendChild(el('h4', { 'class': 'panel-title' }, v.name));
      panel.appendChild(el('p', null, v.taste));
      panel.appendChild(el('p', { 'class': 'panel-label' }, 'Grows in'));
      var wrap = el('div', { 'class': 'panel-chips' });
      v.countries.forEach(function (n) { wrap.appendChild(chip(n, function () { selectCountry(n, true); })); });
      panel.appendChild(wrap);
      var row = el('div', { 'class': 'panel-actions' });
      row.appendChild(chip('Read the ' + v.name + ' card', function () {
        document.dispatchEvent(new CustomEvent('northline:focus-variety', { detail: { name: v.name } }));
      }, 'chip-dark'));
      row.appendChild(chip('Clear', function () { setRegion('all', true); }));
      panel.appendChild(row);
      return;
    }
    if (state.country) {
      var c = byName[state.country];
      panel.appendChild(el('p', { 'class': 'panel-eyebrow' }, B.REGIONS[c.region].label));
      panel.appendChild(el('h4', { 'class': 'panel-title' }, c.name));
      panel.appendChild(el('p', null, c.note));
      if (c.varieties.length) {
        panel.appendChild(el('p', { 'class': 'panel-label' }, 'Varieties from this guide grown here'));
        panel.appendChild(varietyChips(c.varieties));
      } else {
        panel.appendChild(el('p', { 'class': 'panel-label' }, 'None of the varieties in this guide, but worth knowing about.'));
      }
      var row2 = el('div', { 'class': 'panel-actions' });
      row2.appendChild(chip('See all of ' + B.REGIONS[c.region].label, function () { setRegion(c.region, true); }, 'chip-dark'));
      panel.appendChild(row2);
      return;
    }
    if (state.region !== 'all') {
      var r = B.REGIONS[state.region];
      panel.appendChild(el('p', { 'class': 'panel-eyebrow' }, 'Region'));
      panel.appendChild(el('h4', { 'class': 'panel-title' }, r.label));
      panel.appendChild(el('p', null, r.note));
      var inRegion = B.VARIETIES.filter(function (v) { return v.regions.indexOf(state.region) >= 0; });
      panel.appendChild(el('p', { 'class': 'panel-label' }, inRegion.length + ' varieties from this guide grow here'));
      panel.appendChild(varietyChips(inRegion));
      return;
    }
    panel.appendChild(el('p', { 'class': 'panel-eyebrow' }, 'The coffee map'));
    panel.appendChild(el('h4', { 'class': 'panel-title' }, COUNTRIES.length + ' countries, ' + B.VARIETIES.length + ' varieties'));
    panel.appendChild(el('p', null, 'Every pin is a country that grows coffee. Pick one to see what it’s known for and which varieties from this guide grow there. On the Varieties tab, each variety has a Show on map button that lights up where it grows.'));
  }

  /* ================= ACTIONS ================= */

  function syncControls() {
    Array.prototype.forEach.call(regionBar.querySelectorAll('button'), function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-region') === state.region ? 'true' : 'false');
    });
    select.value = state.country || '';
  }

  function setRegion(key, announce) {
    state.region = key; state.country = null; state.variety = null;
    zoomTo(key);
    paintPins(); renderPanel(); syncControls();
    if (announce) document.dispatchEvent(new CustomEvent('northline:region', { detail: { region: key, source: 'map' } }));
  }

  function selectCountry(name, announce) {
    var c = byName[name];
    if (!c) return;
    var changedRegion = state.region !== c.region;
    state.region = c.region; state.country = name; state.variety = null;
    var vb = VIEWS[c.region];
    var insideRegion = c.lon >= vb[0] && c.lon <= vb[2] && c.lat <= vb[1] && c.lat >= vb[3];
    zoomTo(insideRegion ? c.region : boundsAround([c], 50, 24));
    paintPins(); renderPanel(); syncControls();
    if (announce && changedRegion) document.dispatchEvent(new CustomEvent('northline:region', { detail: { region: c.region, source: 'map' } }));
  }

  function showVariety(name) {
    var v = B.VARIETIES.filter(function (x) { return x.name === name; })[0];
    if (!v) return;
    state.variety = v; state.country = null; state.region = 'all';
    var list = v.countries.map(function (n) { return byName[n]; }).filter(Boolean);
    var spansPacific = list.some(function (c) { return c.lon < -150; }) && list.some(function (c) { return c.lon > 60; });
    zoomTo(spansPacific ? 'all' : boundsAround(list, 46, 24));
    paintPins(); renderPanel(); syncControls();
    document.dispatchEvent(new CustomEvent('northline:region', { detail: { region: 'all', source: 'map' } }));
    var wrap = document.getElementById('coffee-map');
    wrap.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    panel.querySelector('.panel-title').setAttribute('tabindex', '-1');
    panel.querySelector('.panel-title').focus({ preventScroll: true });
  }

  function buildControls() {
    ['all'].concat(Object.keys(B.REGIONS)).forEach(function (key) {
      var b = el('button', { type: 'button', 'class': 'chip', 'data-region': key, 'aria-pressed': key === 'all' ? 'true' : 'false' },
        key === 'all' ? 'Whole world' : B.REGIONS[key].label);
      regionBar.appendChild(b);
    });
    regionBar.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-region]');
      if (b) setRegion(b.getAttribute('data-region'), true);
    });

    select.appendChild(el('option', { value: '' }, 'Choose a country'));
    Object.keys(B.REGIONS).forEach(function (key) {
      var group = el('optgroup', { label: B.REGIONS[key].label });
      COUNTRIES.filter(function (c) { return c.region === key; })
        .sort(function (a, b) { return a.name.localeCompare(b.name); })
        .forEach(function (c) { group.appendChild(el('option', { value: c.name }, c.name)); });
      select.appendChild(group);
    });
    select.addEventListener('change', function () {
      if (select.value) selectCountry(select.value, true); else setRegion('all', true);
    });

    document.addEventListener('northline:region', function (e) {
      if (e.detail.source === 'map') return;
      state.region = e.detail.region; state.country = null; state.variety = null;
      zoomTo(e.detail.region); paintPins(); renderPanel(); syncControls();
    });
    document.addEventListener('northline:show-variety', function (e) { showVariety(e.detail.name); });
  }

  /* ================= START ================= */

  drawLand();
  buildPins();
  buildControls();
  renderPanel();
  paintPins();

  // The map lives on a tab that may be hidden at load, so size it once it can be measured.
  function layout() {
    if (!frame.clientWidth) return;
    var t = target;
    view = null; // jump, don't animate, on resize
    var keep = reduceMotion; reduceMotion = true; zoomTo(t); reduceMotion = keep;
  }
  if ('ResizeObserver' in window) new ResizeObserver(layout).observe(frame);
  else window.addEventListener('resize', layout);
  layout();

  window.NorthlineMap = { selectCountry: selectCountry, setRegion: setRegion, showVariety: showVariety, COUNTRIES: COUNTRIES };
})();
