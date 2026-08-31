/* ============================================
   Scroll spy — highlights the nav link that
   matches the section currently in view
   ============================================ */
(function () {
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.site-nav a'));
  if (!navLinks.length) return;

  var sections = navLinks
    .map(function (link) {
      var target = document.querySelector(link.getAttribute('href'));
      return target ? { link: link, section: target } : null;
    })
    .filter(Boolean);

  if (!sections.length) return;

  var header = document.querySelector('.site-header');
  var headerHeight = header ? header.offsetHeight : 0;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        var match = sections.find(function (item) {
          return item.section === entry.target;
        });
        if (!match) return;

        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            link.classList.remove('active');
          });
          match.link.classList.add('active');
        }
      });
    },
    {
      rootMargin: '-' + (headerHeight + 20) + 'px 0px -60% 0px',
      threshold: 0,
    }
  );

  sections.forEach(function (item) {
    observer.observe(item.section);
  });
})();

/* ============================================
   Contact form — sends submissions to a Google
   Apps Script Web App, which appends each one
   as a row in a Google Sheet. No server of our
   own required.

   SETUP: replace SCRIPT_URL below with the URL
   you get after deploying the Apps Script (see
   the instructions provided alongside this file).
   ============================================ */
(function () {
  var SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw1d91tK-_9GPjJlWT37ylkquPyYOKY5aA3QbEZh6fM74bcgp2rbMl4qzNpISGxirJGgg/exec";

  var form = document.getElementById('contact-form');
  if (!form) return;

  var status = document.getElementById('form-status');
  var submitBtn = form.querySelector('button[type="submit"]');

  function setStatus(state, message) {
    if (!status) return;
    status.textContent = message;
    status.setAttribute('data-state', state);
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (SCRIPT_URL.indexOf('COLE_AQUI') !== -1) {
      setStatus('error', 'Formulário ainda não configurado — defina SCRIPT_URL em script.js.');
      return;
    }

    var formData = new FormData(form);

    if (submitBtn) submitBtn.disabled = true;
    setStatus('sending', 'Transmitindo…');

    fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Apps Script não retorna cabeçalhos CORS legíveis
      body: formData,
    })
      .then(function () {
        // Com mode "no-cors" não é possível ler a resposta real,
        // então assumimos sucesso se o fetch não rejeitar.
        setStatus('success', 'Sinal recebido — entraremos em contato em breve.');
        form.reset();
      })
      .catch(function () {
        setStatus('error', 'Não foi possível enviar agora. Tente novamente ou use o e-mail direto.');
      })
      .finally(function () {
        if (submitBtn) submitBtn.disabled = false;
      });
  });
})();
