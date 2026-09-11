/* GitHub counts asset downloads, including repeats. No visitor IDs or click tracking.
 * API contract: https://docs.github.com/en/rest/releases/assets */
(async () => {
  'use strict';
  const link = document.querySelector('[data-alpha-download]');
  const count = document.querySelector('[data-download-count]');
  const stats = document.querySelector('[data-download-stats]');
  if (!link || !count || !stats) return;
  try {
    const url = new URL(link.href);
    const match = url.pathname.match(/^\/lutzkohl\/TrueArchive-website\/releases\/download\/(v[\d.]+-alpha)\/(TrueArchive-[\d.]+-alpha-macos-universal\.zip)$/);
    if (url.origin !== 'https://github.com' || !match) return;
    const response = await fetch(`https://api.github.com/repos/lutzkohl/TrueArchive-website/releases/tags/${match[1]}`, {
      credentials: 'omit', referrerPolicy: 'no-referrer',
      headers: {Accept: 'application/vnd.github+json'},
      signal: AbortSignal.timeout(5000)
    });
    if (!response.ok) return;
    const release = await response.json();
    if (release.draft !== false || release.tag_name !== match[1] || !Array.isArray(release.assets)) return;
    const asset = release.assets.find(item => item.name === match[2] && item.state === 'uploaded' && item.browser_download_url === link.href);
    if (!asset || !Number.isSafeInteger(asset.download_count) || asset.download_count < 0) return;
    count.textContent = new Intl.NumberFormat(document.documentElement.lang === 'de' ? 'de-DE' : 'en-US').format(asset.download_count);
    stats.hidden = false;
  } catch {
    // API failures leave the regular download link usable and the counter hidden.
  }
})();
