/* Kenzo Nakagawa — landing + link-in-bio (usado na home e nas páginas de produto) */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js"); // habilita as animações de entrada

  /* ============ Sistema de cores por produto ============
     Cada painel define --card/--card-soft/--card-contrast/--card-glow no CSS
     (via data-accent). Copiamos esses valores para as variáveis globais
     --accent*, e o CSS faz a transição (~400ms). */

  function setAccentFrom(el) {
    var cs = getComputedStyle(el);
    root.style.setProperty("--accent", cs.getPropertyValue("--card").trim());
    root.style.setProperty("--accent-soft", cs.getPropertyValue("--card-soft").trim());
    root.style.setProperty("--accent-contrast", cs.getPropertyValue("--card-contrast").trim());
    root.style.setProperty("--accent-glow", cs.getPropertyValue("--card-glow").trim());
  }

  var panels = Array.prototype.slice.call(document.querySelectorAll(".panel-row[data-accent]"));

  if ("IntersectionObserver" in window) {
    // Painel que entra na viewport: revela (slide) e assume a cor global
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            setAccentFrom(entry.target);
          }
        });
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0.01 }
    );
    panels.forEach(function (panel) { observer.observe(panel); });

    // Painel que já está dentro da tela no carregamento aparece sem precisar rolar
    // (a cor da página continua sendo definida só pela faixa central, acima)
    var vh = window.innerHeight;
    panels.forEach(function (panel) {
      if (panel.getBoundingClientRect().top < vh) panel.classList.add("in");
    });
  } else {
    // Sem IntersectionObserver: mostra tudo
    panels.forEach(function (panel) { panel.classList.add("in"); });
  }

  // Desktop: passar o mouse por um painel (ou por um bloco de link) também muda a cor da página
  var tiles = Array.prototype.slice.call(document.querySelectorAll(".tile[data-accent]"));
  if (window.matchMedia("(hover: hover)").matches) {
    panels.concat(tiles).forEach(function (el) {
      el.addEventListener("pointerenter", function () { setAccentFrom(el); });
    });
  }

  /* ============ Header: fundo translúcido com blur ao rolar ============ */
  var header = document.getElementById("header");

  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 8);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ============ FAQ: accordion (páginas de produto) ============ */
  document.querySelectorAll(".faq-question").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.parentElement;
      var answer = item.querySelector(".faq-answer");
      var isOpen = item.classList.contains("open");

      // Fecha os outros
      document.querySelectorAll(".faq-item.open").forEach(function (other) {
        if (other !== item) {
          other.classList.remove("open");
          other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
          other.querySelector(".faq-answer").style.maxHeight = "0";
        }
      });

      item.classList.toggle("open", !isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
      answer.style.maxHeight = isOpen ? "0" : answer.scrollHeight + "px";
    });
  });

  /* ============ Efeito de digitação do Tèknolōdiæ ============ */
  var typed = document.querySelector(".hero-bio .typed");
  if (typed) {
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var full = Array.from(typed.textContent); // Array.from lida bem com acentos
    if (!reduceMotion) {
      typed.textContent = "";
      var i = 0;
      (function typeNext() {
        typed.textContent = full.slice(0, i).join("");
        if (i <= full.length) {
          i++;
          setTimeout(typeNext, 130);
        }
      })();
    }
  }

  /* ============ Copiar chave Pix ============ */
  var copyBtn = document.getElementById("copyPix");
  var pixKey = document.getElementById("pixKey");

  if (copyBtn && pixKey) {
    copyBtn.addEventListener("click", function () {
      var chave = pixKey.textContent.trim();

      function feedback(ok) {
        var original = "Copiar";
        copyBtn.textContent = ok ? "Copiado!" : "Copie manualmente";
        setTimeout(function () { copyBtn.textContent = original; }, 2000);
      }

      // Fallback p/ navegadores sem Clipboard API (ou fora de HTTPS)
      function copiarFallback() {
        var ta = document.createElement("textarea");
        ta.value = chave;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        var ok = false;
        try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
        document.body.removeChild(ta);
        feedback(ok);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(chave).then(function () { feedback(true); }).catch(copiarFallback);
      } else {
        copiarFallback();
      }
    });
  }

  /* ============ Ano dinâmico ============ */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
