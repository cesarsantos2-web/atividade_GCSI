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
