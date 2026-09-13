/* Without JavaScript both independent forms remain available. No form data is read here. */
(() => {
  'use strict';
  const container = document.querySelector('[data-feedback-forms]');
  const panels = ['testfeedback', 'featurewunsch'].map(id => document.getElementById(id));
  const choices = [...document.querySelectorAll('[data-feedback-choice]')];
  if (!container || panels.some(panel => !panel) || choices.length !== 2) return;

  function selectFromAddress() {
    const id = location.hash.slice(1) || 'testfeedback';
    if (!panels.some(panel => panel.id === id)) return;
    panels.forEach(panel => { panel.hidden = panel.id !== id; });
    choices.forEach(link => {
      if (link.hash === '#' + id) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

  // Unknown entry anchors (for example privacy) start with the feedback form.
  panels[1].hidden = true;
  choices[0].setAttribute('aria-current', 'true');
  container.dataset.feedbackReady = 'true';
  selectFromAddress();
  window.addEventListener('hashchange', selectFromAddress);
})();
