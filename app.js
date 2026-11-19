/* Northline Coffee: tabs, Bean Grind Tool, Brew Guides.
   Plain script (no modules) so the site opens by double-clicking index.html. */
(function () {
  'use strict';

  /* ================= DATA =================
     One table for every method (PRD 6.3). The Grind Tool and the Brew Guides
     both read it, so they can never disagree. Rows are in the PRD table's order. */
  var METHODS = [
    {
      id: 'aeropress', name: 'AeroPress', lower: 'AeroPress',
      ratio: 15, grind: 'Fine', looks: 'fine sand', setting: 10, time: '2 minutes',
      need: ['AeroPress and a paper filter', 'A sturdy mug', 'A kettle', 'A scale'],
      steps: [
        'Rinse the filter in the cap with hot water and twist the cap on.',
        'Set the AeroPress on your mug and add the grounds.',
        'Pour in the water, stir three times, and set the plunger in the top to hold the heat.',
        'When the time is up, press down slowly. Stop when you hear a hiss.'
      ]
    },
    {
      id: 'pourover', name: 'Pour-over', lower: 'pour-over',
      ratio: 16, grind: 'Medium-fine', looks: 'table salt', setting: 15, time: '3 to 4 minutes',
      need: ['A dripper and a paper filter', 'A kettle, gooseneck if you have one', 'A scale', 'A mug or carafe'],
      steps: [
        'Rinse the filter with hot water and pour that water out.',
        'Add the grounds and give the dripper a shake to level them.',
        'Pour just enough water to wet all the grounds. Wait 30 seconds.',
        'Pour the rest slowly, in small circles, keeping the water off the paper.',
        'Let it drain. Drink it.'
      ]
    },
    {
      id: 'drip', name: 'Drip machine', lower: 'drip machine',
      ratio: 17, grind: 'Medium', looks: 'beach sand', setting: 18, time: "the machine's cycle, about 5 minutes",
      need: ['A drip machine and its filter', 'Fresh cold water', 'A scale'],
      steps: [
        'Fill the reservoir with the water amount from the Grind Tool.',
        'Put a filter in the basket, add the grounds, and shake them level.',
        'Start the machine and let it finish.',
        'Pour it soon. A hot plate keeps cooking it while it sits.'
      ]
    },
    {
      id: 'frenchpress', name: 'French press', lower: 'French press',
      ratio: 15, grind: 'Coarse', looks: 'coarse sea salt', setting: 28, time: '4 minutes',
      need: ['A French press', 'A kettle', 'A scale', 'A spoon and a timer'],
      steps: [
        'Warm the press with hot water and pour it out.',
        'Add the grounds, then all the water.',
        'Stir once, set the lid on with the plunger up, and start the timer.',
        'When the time is up, press down slowly.',
        'Pour it all out now, so it stops brewing.'
      ]
    },
    {
      id: 'coldbrew', name: 'Cold brew', lower: 'cold brew',
      ratio: 8, grind: 'Extra coarse', looks: 'cracked peppercorns', setting: 36, time: '12 to 18 hours in the fridge',
      need: ['A large jar or pitcher', 'A fine strainer', 'A paper filter', 'Room in the fridge'],
      steps: [
        'Add the grounds to the jar.',
        'Pour in cold or room-temperature water and stir until it is all wet.',
        'Cover it and put it in the fridge.',
        'Strain it twice: once through the strainer, once through the paper filter.',
        'Mix it 1:1 with water or milk.'
      ]
    }
  ];

  /* Guide photos (licensed from Unsplash and Pexels, stored locally). A method without a
     photo falls back to its line drawing. "pos" sets where the 4:3 crop sits. */
  var GUIDE_PHOTOS = {
    aeropress:   { src: 'images/guide-aeropress.jpg', w: 1600, h: 2134, alt: 'An AeroPress in low morning sun, with the spent puck of grounds on top' },
    pourover:    { src: 'images/guide-pourover.jpg', w: 1600, h: 2400, alt: 'A gooseneck kettle pouring into a cone dripper over a glass server' },
    drip:        { src: 'images/guide-drip.jpg', w: 1600, h: 1067, alt: 'A hand holding a glass carafe as a drip machine fills it' },
    frenchpress: { src: 'images/guide-frenchpress.jpg', w: 1600, h: 2401, alt: 'A French press steeping on a pale wooden counter' },
    coldbrew:    { src: 'images/guide-coldbrew.jpg', w: 1600, h: 2844, pos: '50% 58%', alt: 'Cold brew poured over ice in a cut-glass tumbler, surrounded by coffee beans on a wooden table' }
  };

  /* Order the visitor sees in the tool (PRD 6.1). */
  var INPUT_ORDER = ['pourover', 'drip', 'frenchpress', 'aeropress', 'coldbrew'];

  /* Roast adjustments (PRD 6.4). */
  var ROASTS = {
    light:  { delta: -2, wording: 'a touch finer for a light roast',   f: 205, c: 96 },
    medium: { delta: 0,  wording: '',                                  f: 200, c: 93 },
    dark:   { delta: 2,  wording: 'a touch coarser for a dark roast',  f: 195, c: 91 }
  };

  var ML_PER_OZ = 29.5735;
  var MIN_WATER_G = Math.round(4 * ML_PER_OZ);       // 118
  var MAX_WATER_G = Math.round(64 * ML_PER_OZ);      // 1,893
  var AEROPRESS_MAX_G = Math.round(10 * ML_PER_OZ);  // 296

  var MESSAGES = {
    empty: "Tell us how much you're brewing.",
    low: "That's not much coffee. Try at least 4 oz (118 ml).",
    high: "That's more than we'd brew at once. Try 64 oz (1,893 ml) or less.",
    aeropress: 'An AeroPress holds about 10 oz. Brew it in two rounds.',
    coldbrew: 'This makes a concentrate. Mix it 1:1 with water or milk.'
  };

  var DEFAULTS = { roast: 'medium', method: 'pourover', unit: 'oz', amount: '12' };
  var STORAGE_KEY = 'northline.usual.v1';

  var methodById = {};
  METHODS.forEach(function (m) { methodById[m.id] = m; });

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function el(tag, attrs, text) {
    var node = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    if (text != null) node.textContent = text;
    return node;
  }
  function icon(id, cls) {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    if (cls) svg.setAttribute('class', cls);
    var use = document.createElementNS(ns, 'use');
    use.setAttribute('href', '#icon-' + id);
    svg.appendChild(use);
    return svg;
  }
  function clamp(n, lo, hi) { return Math.min(hi, Math.max(lo, n)); }
  function fmt(n) { return n.toLocaleString('en-US'); }
  function ratioText(m) { return '1:' + m.ratio; }
  function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  /* ================= THE MATH ================= */

  /* Water in grams from what's typed. Returns null for blank or 0. */
  function waterFromInput(text, unit) {
    var trimmed = String(text).trim();
    if (trimmed === '') return null;
    var n = Number(trimmed);
    if (!isFinite(n) || n === 0) return null;
    return unit === 'oz' ? Math.round(n * ML_PER_OZ) : Math.round(n);
  }

  function computeRecipe(roastId, methodId, waterG) {
    if (waterG === null || waterG === undefined) return { kind: 'empty' };
    if (waterG < MIN_WATER_G) return { kind: 'low' };
    if (waterG > MAX_WATER_G) return { kind: 'high' };

    var m = methodById[methodId];
    var r = ROASTS[roastId];
    var isCold = m.id === 'coldbrew';
    var grindLine = m.grind + ', like ' + m.looks + (r.wording ? ', ' + r.wording : '');
    var notes = [];
    if (m.id === 'aeropress' && waterG > AEROPRESS_MAX_G) notes.push(MESSAGES.aeropress);
    if (isCold) notes.push(MESSAGES.coldbrew);

    return {
      kind: 'ok',
      beans: Math.round(waterG / m.ratio),
      water: waterG,
      grind: m.grind,
      grindLine: grindLine,
      setting: clamp(m.setting + r.delta, 1, 40),
      temp: isCold ? 'Cold or room-temperature water' : r.f + '°F / ' + r.c + '°C',
      tempShort: isCold ? 'cold water' : r.f + '°F',
      time: capitalize(m.time),
      notes: notes,
      method: m
    };
  }

  /* ================= GRIND TOOL ================= */

  var form = $('#grind-form');
  var amountInput = $('#amount');
  var state = {
    roast: DEFAULTS.roast,
    method: DEFAULTS.method,
    unit: DEFAULTS.unit,
    amount: DEFAULTS.amount,
    water: waterFromInput(DEFAULTS.amount, DEFAULTS.unit)
  };
  var lastRecipe = null;

  function buildMethodOptions() {
    var wrap = $('#method-options');
    INPUT_ORDER.forEach(function (id) {
      var m = methodById[id];
      var input = el('input', { type: 'radio', name: 'method', id: 'method-' + id, value: id });
      var label = el('label', { 'for': 'method-' + id });
      label.appendChild(icon(id));
      var text = el('span');
      text.appendChild(document.createTextNode(m.name));
      text.appendChild(el('span', { 'class': 'ratio' }, ratioText(m)));
      label.appendChild(text);
      wrap.appendChild(input);
      wrap.appendChild(label);
    });
  }

  function syncInputsFromState() {
    var r = $('#roast-' + state.roast); if (r) r.checked = true;
    var m = $('#method-' + state.method); if (m) m.checked = true;
    var u = $('#unit-' + state.unit); if (u) u.checked = true;
    amountInput.value = state.amount;
  }

  function formatOz(n) { return String(Math.round(n * 10) / 10); }

  /* Switching units converts the number already entered and keeps the
     water in grams as it was, so the result doesn't move (PRD 6.5.3). */
  function switchUnit(newUnit) {
    if (newUnit === state.unit) return;
    var typed = amountInput.value.trim();
    if (state.water !== null && typed !== '' && isFinite(Number(typed))) {
      var display = newUnit === 'ml' ? String(state.water) : formatOz(state.water / ML_PER_OZ);
      amountInput.value = display;
      state.amount = display;
    }
    state.unit = newUnit;
  }

  var out = {
    ok: $('#result-ok'), msgBox: $('#result-message'), msg: $('#out-message'),
    beans: $('#out-beans'), water: $('#out-water'), grind: $('#out-grind'),
    setting: $('#out-setting'), temp: $('#out-temp'), time: $('#out-time'),
    notes: $('#out-notes'), sr: $('#sr-summary'), copyStatus: $('#copy-status'),
    mini: $('#mini-result'), miniBeans: $('#mini-beans'), miniDetail: $('#mini-detail')
  };

  /* Phone: show the pinned summary only while the full result card is off screen. */
  var resultCard = $('#result');
  var resultInView = true;
  function updateMini() {
    var onGrind = parseHash().route === 'grind';
    out.mini.hidden = !(onGrind && !resultInView);
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      resultInView = entries[0].isIntersecting;
      updateMini();
    }, { threshold: 0.35 }).observe(resultCard);
  }
  $('#mini-btn').addEventListener('click', function () {
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  var srTimer = null;
  function announce(text) {
    // Wait for typing to settle so a screen reader hears one summary, not every keystroke.
    clearTimeout(srTimer);
    srTimer = setTimeout(function () { out.sr.textContent = text; }, 700);
  }

  function render() {
    var recipe = computeRecipe(state.roast, state.method, state.water);
    lastRecipe = recipe;
    out.copyStatus.textContent = '';

    if (recipe.kind !== 'ok') {
      out.ok.hidden = true;
      out.msgBox.hidden = false;
      out.msg.textContent = MESSAGES[recipe.kind];
      out.miniBeans.textContent = '';
      out.miniDetail.textContent = MESSAGES[recipe.kind];
      announce(MESSAGES[recipe.kind]);
      return;
    }
    out.miniBeans.textContent = fmt(recipe.beans) + ' g';
    out.miniDetail.textContent = recipe.grind + ' · setting ' + recipe.setting;

    out.ok.hidden = false;
    out.msgBox.hidden = true;
    out.beans.textContent = fmt(recipe.beans);
    out.water.textContent = fmt(recipe.water) + ' g';
    out.grind.textContent = recipe.grindLine;
    out.setting.textContent = recipe.setting;
    out.temp.textContent = recipe.temp;
    out.time.textContent = recipe.time;

    out.notes.textContent = '';
    recipe.notes.forEach(function (n) { out.notes.appendChild(el('p', { 'class': 'callout' }, n)); });

    announce(recipe.beans + ' grams of beans, ' + recipe.grind.toLowerCase() + ' grind, setting ' +
      recipe.setting + ', ' + fmt(recipe.water) + ' grams of water. ' + recipe.notes.join(' '));
  }

  /* ---- F8: remember my usual (local storage, optional) ---- */
  function loadUsual() {
    try {
      var saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null');
      if (!saved) return;
      if (ROASTS[saved.roast]) state.roast = saved.roast;
      if (methodById[saved.method]) state.method = saved.method;
      if (saved.unit === 'oz' || saved.unit === 'ml') state.unit = saved.unit;
      if (typeof saved.amount === 'string') {
        state.amount = saved.amount;
        state.water = (typeof saved.water === 'number' || saved.water === null)
          ? saved.water : waterFromInput(saved.amount, state.unit);
      }
    } catch (e) { /* Storage blocked or unreadable: use the defaults. */ }
  }
  function saveUsual() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
        roast: state.roast, method: state.method, unit: state.unit,
        amount: state.amount, water: state.water
      }));
    } catch (e) { /* Storage blocked: the tool still works, it just won't remember. */ }
  }

  /* ---- F9: copy recipe ---- */
  function recipeLine(r) {
    return r.beans + ' g ' + r.grind.toLowerCase() + ' (' + r.setting + ') for ' +
      state.amount + ' ' + state.unit + ' ' + r.method.lower + ', ' + r.tempShort + '.';
  }
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function () { return legacyCopy(text); });
    }
    return legacyCopy(text);
  }
  function legacyCopy(text) {
    return new Promise(function (resolve, reject) {
      var ta = el('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      ok ? resolve() : reject();
    });
  }
  var copyTimer = null;
  $('#copy-btn').addEventListener('click', function () {
    if (!lastRecipe || lastRecipe.kind !== 'ok') return;
    var line = recipeLine(lastRecipe);
    copyText(line).then(function () {
      out.copyStatus.textContent = 'Copied: ' + line;
    }, function () {
      out.copyStatus.textContent = "Couldn't copy. Here it is: " + line;
    });
    clearTimeout(copyTimer);
    copyTimer = setTimeout(function () { out.copyStatus.textContent = ''; }, 6000);
  });

  function onInputsChanged() { render(); saveUsual(); }

  form.addEventListener('submit', function (e) { e.preventDefault(); });
  form.addEventListener('change', function (e) {
    var t = e.target;
    if (t.name === 'roast') state.roast = t.value;
    else if (t.name === 'method') state.method = t.value;
    else if (t.name === 'unit') switchUnit(t.value);
    else return;
    onInputsChanged();
  });
  amountInput.addEventListener('input', function () {
    state.amount = amountInput.value;
    // A half-typed number ("1e", "-") reads as blank, which shows the friendly prompt.
    state.water = amountInput.validity.badInput ? null : waterFromInput(state.amount, state.unit);
    onInputsChanged();
  });

  /* ================= BREW GUIDES ================= */

  function buildGuides() {
    var list = $('#guide-list');
    METHODS.forEach(function (m) {
      var card = el('article', { 'class': 'card guide-card', 'aria-labelledby': 'guide-' + m.id });
      var photo = GUIDE_PHOTOS[m.id];
      if (photo) {
        var img = el('img', { 'class': 'card-photo', src: photo.src, width: photo.w, height: photo.h, alt: photo.alt, loading: 'lazy' });
        if (photo.pos) img.style.objectPosition = photo.pos;
        card.appendChild(img);
      } else {
        var fallback = el('div', { 'class': 'card-photo card-photo-fallback', 'aria-hidden': 'true' });
        fallback.appendChild(icon(m.id));
        card.appendChild(fallback);
      }
      var head = el('div', { 'class': 'guide-head' });
      head.appendChild(icon(m.id));
      head.appendChild(el('h3', { id: 'guide-' + m.id }, m.name));
      card.appendChild(head);

      var spec = el('dl', { 'class': 'spec' });
      [['Ratio', ratioText(m)], ['Grind', m.grind + ', like ' + m.looks], ['Time', capitalize(m.time)]]
        .forEach(function (pair) {
          spec.appendChild(el('dt', null, pair[0]));
          spec.appendChild(el('dd', null, pair[1]));
        });
      card.appendChild(spec);

      card.appendChild(el('h4', null, 'What you need'));
      var need = el('ul');
      m.need.forEach(function (n) { need.appendChild(el('li', null, n)); });
      card.appendChild(need);

      card.appendChild(el('h4', null, 'Steps'));
      var steps = el('ol');
      m.steps.forEach(function (s) { steps.appendChild(el('li', null, s)); });
      card.appendChild(steps);

      var link = el('a', { 'class': 'text-link', href: '#grind?method=' + m.id }, 'Grind for this');
      link.appendChild(el('span', { 'class': 'visually-hidden' }, ': ' + m.name));
      card.appendChild(link);
      list.appendChild(card);
    });
  }

  /* ================= TABS AND ADDRESSES ================= */

  var ROUTES = { home: 'Home', grind: 'Grind Tool', guides: 'Brew Guides', roasts: 'Our Roasts', beans: 'Bean Guide', about: 'About' };
  var views = $all('.view');
  var tabLinks = $all('.tabs a');

  function parseHash() {
    var raw = window.location.hash.replace(/^#/, '');
    var q = raw.indexOf('?');
    var route = q >= 0 ? raw.slice(0, q) : raw;
    var params = new URLSearchParams(q >= 0 ? raw.slice(q + 1) : '');
    if (!ROUTES.hasOwnProperty(route)) route = 'home';
    return { route: route, params: params };
  }

  function showView(route, moveFocus) {
    views.forEach(function (v) { v.hidden = v.getAttribute('data-route') !== route; });
    tabLinks.forEach(function (a) {
      if (a.getAttribute('data-tab') === route) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    document.title = route === 'home' ? 'Northline Coffee' : ROUTES[route] + ' · Northline Coffee';

    // On a phone the tab bar scrolls sideways: bring the current tab into view
    // by scrolling the bar only, never the page.
    var bar = $('.tabs');
    var active = $('.tabs a[aria-current="page"]');
    if (bar && active && bar.scrollWidth > bar.clientWidth) {
      var left = active.offsetLeft - bar.offsetLeft;
      if (left < bar.scrollLeft || left + active.offsetWidth > bar.scrollLeft + bar.clientWidth) {
        bar.scrollLeft = left - 16;
      }
    }

    if (moveFocus) {
      window.scrollTo(0, 0);
      var heading = $('.view[data-route="' + route + '"] .view-heading');
      if (heading) heading.focus({ preventScroll: true });
    }
  }

  /* F7: "#grind?method=frenchpress" or "#grind?roast=dark" opens the tool with that
     choice made, then tidies the address to "#grind" so back and forward stay clean. */
  function applyDeepLink(params) {
    var changed = false;
    var m = params.get('method'), r = params.get('roast');
    if (m && methodById[m]) { state.method = m; changed = true; }
    if (r && ROASTS[r]) { state.roast = r; changed = true; }
    if (changed) { syncInputsFromState(); onInputsChanged(); }
    try { history.replaceState(null, '', '#grind'); } catch (e) { /* Some file:// setups refuse; harmless. */ }
  }

  function handleRoute(moveFocus) {
    var parsed = parseHash();
    if (parsed.route === 'grind' && (parsed.params.has('method') || parsed.params.has('roast'))) {
      applyDeepLink(parsed.params);
    }
    showView(parsed.route, moveFocus);
    if (typeof updateMini === 'function') updateMini();
  }

  // Skip link: jump to the visible section's heading without changing the address.
  $('.skip-link').addEventListener('click', function (e) {
    e.preventDefault();
    var heading = $('.view:not([hidden]) .view-heading');
    if (heading) heading.focus();
  });

  /* ================= START ================= */

  buildMethodOptions();
  buildGuides();
  loadUsual();
  syncInputsFromState();
  render();
  out.sr.textContent = '';
  window.addEventListener('hashchange', function () { handleRoute(true); });
  handleRoute(false);

  // Exposed for testing in the browser console only.
  window.NorthlineTest = { computeRecipe: computeRecipe, waterFromInput: waterFromInput, METHODS: METHODS };
})();
