/* =============================================================
   Método DMDP — comportamento da landing page
   Sem dependências externas.
   ============================================================= */
(function () {
  'use strict';

  var header     = document.querySelector('.site-header');
  var navToggle  = document.getElementById('navToggle');
  var navMenu    = document.getElementById('navMenu');
  var backdrop   = document.getElementById('navBackdrop');
  var whatsFloat = document.getElementById('whatsFloat');
  var navLinks   = navMenu ? navMenu.querySelectorAll('.nav-list a') : [];

  var reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Menu mobile ---------- */
  function abrirMenu() {
    navMenu.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Fechar menu de navegação');
    backdrop.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function fecharMenu() {
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menu de navegação');
    backdrop.hidden = true;
    document.body.style.overflow = '';
  }

  function menuAberto() {
    return navToggle.getAttribute('aria-expanded') === 'true';
  }

  if (navToggle && navMenu && backdrop) {
    navToggle.addEventListener('click', function () {
      menuAberto() ? fecharMenu() : abrirMenu();
    });

    backdrop.addEventListener('click', fecharMenu);

    navMenu.addEventListener('click', function (e) {
      if (e.target.closest('a') && menuAberto()) fecharMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuAberto()) {
        fecharMenu();
        navToggle.focus();
      }
    });

    // Fecha o menu ao voltar para o layout desktop
    var mqDesktop = window.matchMedia('(min-width: 961px)');
    var aoMudarLargura = function (e) { if (e.matches && menuAberto()) fecharMenu(); };
    if (mqDesktop.addEventListener) mqDesktop.addEventListener('change', aoMudarLargura);
    else if (mqDesktop.addListener) mqDesktop.addListener(aoMudarLargura);
  }

  /* ---------- Cabeçalho em rolagem + WhatsApp flutuante ---------- */
  var ticking = false;

  function aoRolar() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('is-scrolled', y > 12);
    if (whatsFloat) whatsFloat.classList.toggle('is-visible', y > 520);
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(aoRolar);
      ticking = true;
    }
  }, { passive: true });

  aoRolar();

  /* ---------- Animação de entrada das seções ---------- */
  var elementosReveal = document.querySelectorAll('.reveal');

  if (reduzirMovimento || !('IntersectionObserver' in window)) {
    elementosReveal.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        var el = entrada.target;
        // Pequeno escalonamento entre irmãos do mesmo grupo
        var irmaos = el.parentElement ? Array.prototype.filter.call(
          el.parentElement.children, function (c) { return c.classList.contains('reveal'); }
        ) : [];
        var indice = Math.max(0, irmaos.indexOf(el));
        el.style.transitionDelay = Math.min(indice, 3) * 90 + 'ms';
        el.classList.add('is-visible');
        observador.unobserve(el);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    elementosReveal.forEach(function (el) { observador.observe(el); });

    // Rede de segurança: se o observador não disparar (aba iniciada em segundo
    // plano, por exemplo), garante que o conteúdo já visível não fique oculto.
    window.addEventListener('load', function () {
      window.setTimeout(function () {
        elementosReveal.forEach(function (el) {
          if (el.classList.contains('is-visible')) return;
          var r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-visible');
        });
      }, 1200);
    });
  }

  /* ---------- Destaque do item de menu da seção visível ---------- */
  var secoes = [];
  navLinks.forEach(function (link) {
    var id = link.getAttribute('href');
    if (id && id.charAt(0) === '#' && id.length > 1) {
      var alvo = document.querySelector(id);
      if (alvo) secoes.push({ link: link, alvo: alvo });
    }
  });

  if (secoes.length && 'IntersectionObserver' in window) {
    var espiao = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        var item = secoes.find(function (s) { return s.alvo === entrada.target; });
        if (!item) return;
        if (entrada.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove('is-active'); });
          item.link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    secoes.forEach(function (s) { espiao.observe(s.alvo); });
  }
})();
