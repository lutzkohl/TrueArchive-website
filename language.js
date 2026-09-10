/* Static pages remain readable and language links usable without this script. */
(() => {
  'use strict';
  const choices = ['system', 'de', 'en'];
  const pages = ['index.html', 'anleitung.html', 'feedback.html', 'release-notes.html', 'warum-truearchive.html'];
  const current = new URL(location.href);
  const parts = current.pathname.split('/');
  const page = parts.pop() || 'index.html';
  if (!pages.includes(page)) return;
  const isEnglish = parts[parts.length - 1] === 'en';
  if (isEnglish) parts.pop();
  const base = parts.join('/') + '/';
  const valid = value => choices.includes(value) ? value : null;
  const requested = valid(current.searchParams.get('lang'));
  let saved = null;
  try { saved = valid(localStorage.getItem('truearchive.language')); } catch { /* Private browsing can deny storage. */ }
  if (requested) {
    try { localStorage.setItem('truearchive.language', requested); } catch { /* URL selection still works. */ }
  }
  const preference = requested || saved || 'system';
  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language || 'en'];
  const system = browserLanguages.map(value => String(value).toLowerCase().split(/[-_]/)[0])
    .find(value => value === 'de' || value === 'en') || 'en';
  // A direct English URL is an intentional entry point when no preference exists.
  const language = preference === 'system' ? (!requested && !saved && isEnglish ? 'en' : system) : preference;
  function localizedURL(targetLanguage, selection) {
    const url = new URL(location.href);
    url.pathname = base + (targetLanguage === 'en' ? 'en/' : '') + page;
    if (selection) url.searchParams.set('lang', selection);
    return url;
  }
  const target = localizedURL(language);
  if (language !== (isEnglish ? 'en' : 'de')) {
    location.replace(target.href);
    return;
  }
  function refreshLanguageLinks() {
    document.querySelectorAll('[data-language]').forEach(link => {
      const choice = link.dataset.language;
      if (!valid(choice)) return;
      link.href = localizedURL(choice === 'system' ? system : choice, choice).href;
      if (choice === language || (choice === 'system' && preference === 'system')) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }
  refreshLanguageLinks();
  window.addEventListener('hashchange', refreshLanguageLinks);
  // Carry an explicit URL choice through local navigation if storage is unavailable.
  // This also preserves a chosen system mode without a redirect loop.
  if (requested) document.querySelectorAll('a[href]:not([data-language])').forEach(link => {
    const url = new URL(link.href, current.href);
    const relative = url.pathname.slice(base.length);
    if (url.origin !== current.origin || !url.pathname.startsWith(base) ||
        !pages.includes(relative.replace(/^en\//, '') || 'index.html')) return;
    url.searchParams.set('lang', requested);
    link.href = url.href;
  });
})();
