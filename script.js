/* Kenzo Nakagawa — landing + link-in-bio */
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
  } else {
    // Sem IntersectionObserver: mostra tudo
    panels.forEach(function (panel) { panel.classList.add("in"); });
  }

  // Desktop: passar o mouse por um painel também muda a cor da página
  if (window.matchMedia("(hover: hover)").matches) {
    panels.forEach(function (panel) {
      panel.addEventListener("pointerenter", function () { setAccentFrom(panel); });
    });
  }

  /* ============ Header: fundo translúcido com blur ao rolar ============ */
  var header = document.getElementById("header");

  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 8);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ============ FAQ: accordion ============ */
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

  /* ============ Pop-up de lojas ao chegar no meio da página ============ */
  var popup = document.getElementById("storesPopup");
  var closeBtn = document.getElementById("storesClose");

  if (popup && closeBtn) {
    var dismissed = false;
    try { dismissed = sessionStorage.getItem("storesPopupClosed") === "1"; } catch (e) {}

    function hidePopup() {
      popup.classList.remove("show");
      popup.setAttribute("aria-hidden", "true");
    }

    function showPopup() {
      if (dismissed) return;
      popup.classList.add("show");
      popup.setAttribute("aria-hidden", "false");
    }

    closeBtn.addEventListener("click", function () {
      dismissed = true;
      try { sessionStorage.setItem("storesPopupClosed", "1"); } catch (e) {}
      hidePopup();
    });

    // Fecha com ESC
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") hidePopup();
    });

    // Dispara quando o scroll passa da metade da página
    function checkMiddle() {
      if (dismissed) return;
      var scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0 || window.scrollY >= scrollable * 0.5) {
        showPopup();
        window.removeEventListener("scroll", checkMiddle);
      }
    }
    window.addEventListener("scroll", checkMiddle, { passive: true });
    checkMiddle();
  }

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

  /* ============ Ano dinâmico ============ */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
