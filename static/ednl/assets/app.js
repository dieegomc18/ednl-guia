(function () {
  const panel = document.getElementById('tocPanel');
  const btn = document.getElementById('tocButton');
  const close = document.getElementById('tocClose');

  function openPanel() {
    if (!panel) return;
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
  }

  function closePanel() {
    if (!panel) return;
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
  }

  btn?.addEventListener('click', () => {
    if (!panel) return;
    if (panel.classList.contains('open')) closePanel();
    else openPanel();
  });

  close?.addEventListener('click', closePanel);

  // Close panel when clicking a TOC link.
  panel?.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (a) closePanel();
  });

  // Copy buttons for code.
  document.querySelectorAll('button[data-copy]').forEach((b) => {
    b.addEventListener('click', async () => {
      const pre = b.parentElement?.querySelector('pre code');
      const text = pre?.innerText ?? '';
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
        const prev = b.textContent;
        b.textContent = 'Copiado';
        setTimeout(() => (b.textContent = prev), 900);
      } catch {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
    });
  });
})();
