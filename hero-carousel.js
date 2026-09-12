/* Progressive enhancement of the existing hero image; no tracking or storage. */
(() => {
  'use strict';
  const root = document.querySelector('[data-hero-carousel]');
  if (!root) return;
  const language = document.documentElement.lang === 'en' ? 'en' : 'de';
  const get = name => root.querySelector(`[data-hero-${name}]`);
  const image = get('image'), caption = get('caption'), disclosure = get('disclosure');
  const caveat = get('caveat'), controls = get('controls'), pause = get('pause');
  const announcement = get('announcement');
  if (![image, caption, disclosure, caveat, controls, pause, get('previous'), get('next'), announcement].every(Boolean)) return;
  const original = {src:image.getAttribute('src'), alt:image.getAttribute('alt'), caption:caption.textContent, disclosure:disclosure.textContent};
  const scenes = [
    {
      "id": "P1-B1",
      "caption": {
        "de": "Ich weiß, was auf dem Foto passiert ist. Bei der Festplatte muss ich nachsehen.",
        "en": "I know what happened in the photo. I’ll have to check the hard drive."
      },
      "alt": {
        "de": "Fiktiver Martin schaut zuhause Fotoabzüge und alte Festplatten durch.",
        "en": "Fictional Martin looking through old photo prints and hard drives at home."
      }
    },
    {
      "id": "P2-B1",
      "caption": {
        "de": "Ich hätte meine alten Bergfotos gern neben den neuen. Es gäbe einiges zu vergleichen.",
        "en": "I’d like my old mountain photos next to the new ones. There would be plenty to compare."
      },
      "alt": {
        "de": "Fiktiver Karl hält ein Dia gegen das Licht.",
        "en": "Fictional Karl holding a slide up to the light."
      }
    },
    {
      "id": "P3-B1",
      "caption": {
        "de": "Meine Fotos sind jedes Mal anders. Meine Ablage ist jetzt immer gleich.",
        "en": "My photos are different every time. My filing system is always the same now."
      },
      "alt": {
        "de": "Fiktive Lea fotografiert draußen.",
        "en": "Fictional Lea taking photographs outdoors."
      }
    },
    {
      "id": "P4-B1",
      "caption": {
        "de": "Wir haben dasselbe Baby. Aber offenbar zwei völlig verschiedene Fotoalben.",
        "en": "We have the same baby. But apparently two completely different photo albums."
      },
      "alt": {
        "de": "Fiktive Jule und Ben vergleichen Handyfotos neben ihrem Baby.",
        "en": "Fictional Jule and Ben comparing photos on their phones beside their baby."
      }
    },
    {
      "id": "P1-B2",
      "caption": {
        "de": "Das rote Zelt finde ich im Kopf. Nur auf welcher Platte ist das Foto?",
        "en": "I can picture the red tent. But which hard drive has the photo?"
      },
      "alt": {
        "de": "Fiktiver Martin fotografiert neben einem roten Zelt.",
        "en": "Fictional Martin taking a photo beside a red tent."
      }
    },
    {
      "id": "P3-B2",
      "caption": {
        "de": "Ich hab gern die neuesten Geräte und Technologien. Meine Ablage soll stabil bleiben.",
        "en": "I like having the latest devices and technology. I want my filing system to stay reliable."
      },
      "alt": {
        "de": "Fiktive Lea arbeitet am Schreibtisch mit Tablet und Kamera.",
        "en": "Fictional Lea working with a tablet and camera at her desk."
      }
    },
    {
      "id": "P4-B2",
      "caption": {
        "de": "Ich möchte auch die ganz normalen Nachmittage aufheben. So einen wie diesen, egal wie viel Platz ich noch in der Cloud habe.",
        "en": "I want to keep the ordinary afternoons too. One like this, however much space I have left in the cloud."
      },
      "alt": {
        "de": "Fiktive Jule und Ben fotografieren einen Alltagsmoment mit ihrem Baby im Kinderwagen.",
        "en": "Fictional Jule and Ben photographing an everyday moment with their baby in a pram."
      }
    },
    {
      "id": "P2-B3",
      "caption": {
        "de": "Ich hab jetzt immer Platz auf der Karte. Weil ich alles periodisch und sicher im Archiv ablege.",
        "en": "I always have room on the card now. Because I regularly archive everything safely."
      },
      "alt": {
        "de": "Fiktiver Karl ist mit seiner Kamera unterwegs.",
        "en": "Fictional Karl outdoors with his camera."
      }
    },
    {
      "id": "P1-B3",
      "caption": {
        "de": "Ich möchte die Bilder beisammenhaben. Auch die von der anderen Platte.",
        "en": "I want the pictures together. Including the ones on the other hard drive."
      },
      "alt": {
        "de": "Fiktiver Martin verbindet eine Festplatte mit seinem Laptop.",
        "en": "Fictional Martin connecting a hard drive to his laptop."
      }
    },
    {
      "id": "P3-B3",
      "caption": {
        "de": "Ich bin mit dem Export fertig. Mit dem Bild vielleicht noch lange nicht.",
        "en": "I’m finished with the export. But I may be far from finished with the picture."
      },
      "alt": {
        "de": "Fiktive Lea vergleicht ihre Aufnahmen neben Laptop und Festplatte.",
        "en": "Fictional Lea comparing her photographs beside a laptop and drive."
      }
    },
    {
      "id": "P4-B3",
      "caption": {
        "de": "Wir wollen beide wissen, wo die Bilder liegen. Auch mit wenig Schlaf.",
        "en": "We both want to know where the pictures are. Even with very little sleep."
      },
      "alt": {
        "de": "Fiktive Jule und Ben sitzen am Laptop neben einer externen Festplatte.",
        "en": "Fictional Jule and Ben at their laptop with an external drive."
      }
    },
    {
      "id": "P1-B4",
      "caption": {
        "de": "Wir teilen die Erinnerungen. Den Weg zu den Bildern sollten wir auch beide kennen.",
        "en": "We share the memories. We should both know how to find the pictures too."
      },
      "alt": {
        "de": "Fiktiver Martin und seine Partnerin schauen gemeinsam Fotoabzüge an.",
        "en": "Fictional Martin and his partner looking at photo prints together."
      }
    },
    {
      "id": "P3-B4",
      "caption": {
        "de": "Ich möchte später noch anders abbiegen können. Deshalb behalte ich das Original. Das macht aber nur Sinn, wenn ich es auch finde.",
        "en": "I want to take a different direction later. That’s why I keep the original. But that only makes sense if I can find it."
      },
      "alt": {
        "de": "Fiktive Lea wählt in ihrem Atelier zwischen zwei Fotoabzügen.",
        "en": "Fictional Lea choosing between two photo prints in her studio."
      }
    }
  ];
  const words = language === 'en' ? {
    previous:'Previous picture', next:'Next picture', pause:'Pause picture changes', play:'Resume picture changes',
    disclosure:'AI-generated scenes · fictional statements',
    card:'Memory cards are not cleared automatically.',
    error:'This picture could not be loaded. You can continue with the arrows.'
  } : {
    previous:'Vorheriges Bild', next:'Nächstes Bild', pause:'Bildwechsel pausieren', play:'Bildwechsel fortsetzen',
    disclosure:'KI-Beispielszenen · fiktive Aussagen',
    card:'Speicherkarten werden nicht automatisch geleert.',
    error:'Dieses Bild konnte nicht geladen werden. Du kannst mit den Pfeilen weiterblättern.'
  };
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = media.matches, hovered = false, focused = root.contains(document.activeElement);
  let inView = false, pageActive = true, shown = 0, cursor = 0, revision = 0;
  let pending = false, pendingManual = false, timer = null;

  function mayRotate() {
    return !paused && !hovered && !focused && !document.hidden && inView && pageActive;
  }
  function updateClock() {
    window.clearTimeout(timer);
    timer = null;
    if (!mayRotate() && pending && !pendingManual) {
      ++revision;
      pending = false;
      cursor = shown;
    }
    pause.textContent = paused ? '▶' : 'Ⅱ';
    pause.setAttribute('aria-label', paused ? words.play : words.pause);
    pause.setAttribute('title', paused ? words.play : words.pause);
    pause.setAttribute('aria-pressed', String(paused));
    if (!pending && mayRotate()) {
      const readingText = caption.textContent + ' ' + caveat.textContent;
      const readingTime = Math.max(8000, 2500 + readingText.trim().split(/\s+/).length * 350);
      timer = window.setTimeout(() => { timer = null; show(cursor + 1, false); }, readingTime);
    }
  }
  function display(index, manual, failed = false) {
    shown = index;
    const scene = index ? scenes[index - 1] : null;
    image.setAttribute('src', scene ? root.dataset.heroAssets + scene.id.toLowerCase() + '.webp' : original.src);
    image.setAttribute('alt', scene ? scene.alt[language] : original.alt);
    caption.textContent = scene ? scene.caption[language] : original.caption;
    disclosure.textContent = scene ? words.disclosure : original.disclosure;
    caveat.textContent = failed ? words.error : (scene?.id === 'P2-B3' ? words.card : '');
    caveat.hidden = !caveat.textContent;
    if (manual) announcement.textContent = caption.textContent + (caveat.textContent ? ' ' + caveat.textContent : '');
  }
  function show(index, manual = true) {
    cursor = (index + scenes.length + 1) % (scenes.length + 1);
    const target = cursor, request = ++revision;
    pending = false;
    window.clearTimeout(timer);
    timer = null;
    if (!target) {
      display(0, manual);
      updateClock();
      return;
    }
    pending = true;
    pendingManual = manual;
    const preload = new Image();
    preload.decoding = 'async';
    preload.onload = () => {
      if (request !== revision) return;
      pending = false;
      display(target, manual);
      updateClock();
    };
    preload.onerror = () => {
      if (request !== revision) return;
      pending = false;
      paused = true;
      // Keep the cursor so the next button can move past the unavailable image.
      display(0, manual, true);
      updateClock();
    };
    preload.src = root.dataset.heroAssets + scenes[target - 1].id.toLowerCase() + '.webp';
  }

  get('previous').addEventListener('click', () => show(cursor - 1));
  get('next').addEventListener('click', () => show(cursor + 1));
  pause.addEventListener('click', () => { paused = !paused; updateClock(); });
  root.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch') { hovered = true; updateClock(); } });
  root.addEventListener('pointerleave', event => { if (event.pointerType !== 'touch') { hovered = false; updateClock(); } });
  root.addEventListener('focusin', () => { focused = true; updateClock(); });
  root.addEventListener('focusout', () => window.queueMicrotask(() => { focused = root.contains(document.activeElement); updateClock(); }));
  root.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(cursor + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  document.addEventListener('visibilitychange', updateClock);
  media.addEventListener('change', event => { if (event.matches) paused = true; updateClock(); });
  window.addEventListener('pagehide', () => { pageActive = false; updateClock(); });
  window.addEventListener('pageshow', () => { pageActive = true; updateClock(); });
  if (window.IntersectionObserver) {
    const observer = new window.IntersectionObserver(entries => {
      inView = entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= 0.35);
      updateClock();
    }, {threshold:[0, 0.35]});
    observer.observe(root);
  }
  controls.hidden = false;
  root.dataset.heroReady = 'true';
  updateClock();
})();
