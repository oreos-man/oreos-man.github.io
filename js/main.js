// Tabs: show one section at a time, driven by the URL hash (#about, #resume, ...).
// Without JavaScript all sections are simply shown one after another.
(function () {
  document.documentElement.classList.add('js');

  var tabs = Array.prototype.slice.call(document.querySelectorAll('[data-tab]'));
  var panels = tabs.map(function (t) { return document.getElementById(t.dataset.tab); });

  function show(id, focus) {
    if (!document.getElementById(id)) id = 'about';
    tabs.forEach(function (t, i) {
      var on = t.dataset.tab === id;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.setAttribute('tabindex', on ? '0' : '-1');
      panels[i].hidden = !on;
    });
    if (focus) document.getElementById(id).querySelector('h2').focus({ preventScroll: true });
  }

  panels.forEach(function (p) { p.querySelector('h2').setAttribute('tabindex', '-1'); });

  tabs.forEach(function (t, i) {
    t.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      var next = tabs[(i + d + tabs.length) % tabs.length];
      next.focus();
      next.click();
    });
  });

  window.addEventListener('hashchange', function () {
    show(location.hash.slice(1), true);
  });
  show(location.hash.slice(1), false);

  // Theme toggle (remembered in this browser)
  var root = document.documentElement;
  var btn = document.querySelector('.theme-toggle');
  function label() {
    btn.setAttribute('aria-label', root.dataset.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }
  label();
  btn.addEventListener('click', function () {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
    label();
  });
})();
