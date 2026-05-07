
  const allSections = [
    'que-es-sec',
    'crear-agente-sec',
    'ejercicio1-sec',
    'ejercicio2-sec',
    'ejercicio3-sec',
    'reto-sec'
  ];

  function showSection(id) {
    allSections.forEach(s => {
      const el = document.getElementById(s);
      if (el) el.classList.remove('active');
    });
    const target = document.getElementById(id);
    if (target) target.classList.add('active');
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const activeNav = document.querySelector(`.nav-item[onclick*="${id}"]`);
    if (activeNav) activeNav.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function copiarTexto(idElemento, mensaje) {
    const el = document.getElementById(idElemento);
    if (!el) return;
    const texto = el.innerText ? el.innerText.trim() : el.textContent.trim();
    const toastEl = document.getElementById('toast');
    const success = () => {
      toastEl.textContent = mensaje || 'Copiado ✓';
      toastEl.classList.add('show');
      clearTimeout(copiarTexto._timer);
      copiarTexto._timer = setTimeout(() => toastEl.classList.remove('show'), 1800);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(texto).then(success).catch(() => fallback(texto, success));
    } else {
      fallback(texto, success);
    }
  }

  function fallback(text, cb) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly','');
    ta.style.cssText = 'position:fixed;top:-999px';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    cb();
  }

  // Botones .btn-copy con data-copy
  document.addEventListener('DOMContentLoaded', () => {
    showSection('que-es-sec');
    document.querySelectorAll('.btn-copy[data-copy]').forEach(btn => {
      btn.addEventListener('click', () => copiarTexto(btn.dataset.copy, 'Copiado ✓'));
    });
  });
