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
  var carTrack = document.getElementById("carTrack"); // só existe na home (carrossel)

  if (carTrack) {
    // Home: os painéis são slides do carrossel — a cor global e o estado
    // ativo/translúcido são controlados pelo bloco do carrossel, abaixo.
  } else if ("IntersectionObserver" in window) {
    // Páginas com rolagem: painel que entra na viewport revela e assume a cor global
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

  /* ============ Carrossel de produtos (home) ============
     Rolagem nativa + scroll-snap (swipe de graça no celular); slide ativo
     centralizado com os vizinhos translúcidos de amostra. O JS cuida de:
     auto-avanço a cada AUTO_MS, setas ‹ ›, bolinhas, sincronizar cor global +
     .is-active com o slide ativo, e segurar RESUME_MS parado após interação. */
  if (carTrack) {
    var slides = Array.prototype.slice.call(carTrack.children);
    var carBox = document.getElementById("carousel");
    var dotsBox = document.getElementById("carDots");
    var prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var AUTO_MS = 2000;    // intervalo do auto-avanço
    var RESUME_MS = 30000; // fica estático X ms após a última interação
    var current = 0;
    var autoTimer = null;
    var resumeTimer = null;
    var holdUntil = 0;     // até quando o carrossel deve ficar parado

    slides.forEach(function (slide, i) {
      slide.setAttribute("role", "group");
      slide.setAttribute("aria-roledescription", "slide");
      slide.setAttribute("aria-label", (i + 1) + " de " + slides.length);
    });

    // Setas ‹ › (injetadas p/ não ficarem mortas sem JS)
    function makeArrow(dir, label, path) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "car-arrow car-" + dir;
      b.setAttribute("aria-label", label);
      b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="' + path + '"/></svg>';
      carBox.appendChild(b);
      return b;
    }
    var prevBtn = makeArrow("prev", "Produto anterior", "15 18 9 12 15 6");
    var nextBtn = makeArrow("next", "Próximo produto", "9 18 15 12 9 6");

    // Bolinhas
    var dots = slides.map(function (slide, i) {
      var d = document.createElement("button");
      d.type = "button";
      d.className = "car-dot";
      var title = slide.querySelector(".panel-title");
      d.setAttribute("aria-label", "Ir para: " + (title ? title.textContent.trim() : "produto " + (i + 1)));
      d.addEventListener("click", function () { goTo(i); interacted(); });
      dotsBox.appendChild(d);
      return d;
    });

    function setActive(i) {
      current = i;
      slides.forEach(function (s, j) { s.classList.toggle("is-active", j === i); });
      dots.forEach(function (d, j) { d.setAttribute("aria-current", j === i ? "true" : "false"); });
      setAccentFrom(slides[i]);
    }

    // Animação própria com requestAnimationFrame. Não dá para usar
    // scrollTo({behavior:"smooth"}) nem posições intermediárias com o snap
    // ligado: com "x mandatory" o Chrome rebate qualquer posição fora de um
    // ponto de snap. Então: snap OFF durante a animação, ON de volta no fim
    // (o swipe manual continua com o snap nativo).
    var animId = null;
    function cancelAnim() {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
        carTrack.style.scrollSnapType = "";
      }
    }
    function animateTo(left) {
      cancelAnim();
      var from = carTrack.scrollLeft;
      var delta = left - from;
      if (!delta) return;
      carTrack.style.scrollSnapType = "none";
      var DUR = 480;
      var t0 = performance.now();
      function step(now) {
        var p = Math.min(1, (now - t0) / DUR);
        var e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; // easeInOutQuad
        carTrack.scrollLeft = from + delta * e;
        if (p < 1) {
          animId = requestAnimationFrame(step);
        } else {
          animId = null;
          carTrack.style.scrollSnapType = "";
        }
      }
      animId = requestAnimationFrame(step);
    }

    function goTo(i, instant) {
      var n = slides.length;
      var target = ((i % n) + n) % n; // dá a volta nas pontas
      var left = slides[target].offsetLeft - slides[0].offsetLeft;
      if (instant || prefersReduce) {
        cancelAnim();
        carTrack.scrollLeft = left;
      } else {
        animateTo(left);
      }
      setActive(target);
    }

    // Swipe/rolagem manual: espera assentar e sincroniza bolinhas + cor.
    // stride = distância entre slides (largura do slide + gap do trilho)
    function syncToScroll() {
      var stride = slides.length > 1
        ? slides[1].offsetLeft - slides[0].offsetLeft
        : carTrack.clientWidth || 1;
      var i = Math.round(carTrack.scrollLeft / stride);
      i = Math.max(0, Math.min(slides.length - 1, i));
      if (i !== current) setActive(i);
    }
    var scrollDebounce = null;
    carTrack.addEventListener("scroll", function () {
      clearTimeout(scrollDebounce);
      scrollDebounce = setTimeout(syncToScroll, 90);
    }, { passive: true });
    if ("onscrollend" in window) {
      carTrack.addEventListener("scrollend", syncToScroll, { passive: true });
    }

    // Auto-avanço (não roda com prefers-reduced-motion; pula enquanto a aba está oculta)
    function play() {
      stop();
      if (prefersReduce) return;
      autoTimer = setInterval(function () {
        if (!document.hidden) goTo(current + 1);
      }, AUTO_MS);
    }
    function stop() {
      if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    }
    function interacted() {
      stop();
      holdUntil = Date.now() + RESUME_MS;
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(play, RESUME_MS);
    }

    prevBtn.addEventListener("click", function () { goTo(current - 1); interacted(); });
    nextBtn.addEventListener("click", function () { goTo(current + 1); interacted(); });

    // Pausa com mouse em cima / dedo arrastando / foco de teclado dentro do
    // carrossel (arrastar/rolar também cancela a animação em andamento).
    // Ao sair com o mouse, só retoma quando a janela de RESUME_MS acabar.
    carBox.addEventListener("pointerenter", function () { stop(); clearTimeout(resumeTimer); });
    carBox.addEventListener("pointerleave", function () {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(play, Math.max(0, holdUntil - Date.now()));
    });
    carTrack.addEventListener("pointerdown", function () { cancelAnim(); interacted(); }, { passive: true });
    carTrack.addEventListener("wheel", function () { cancelAnim(); interacted(); }, { passive: true });
    carBox.addEventListener("focusin", function () { stop(); clearTimeout(resumeTimer); });
    carBox.addEventListener("focusout", interacted);

    // Janela mudou de tamanho: reancora o slide ativo (sem animação)
    var resizeDebounce = null;
    window.addEventListener("resize", function () {
      clearTimeout(resizeDebounce);
      resizeDebounce = setTimeout(function () { goTo(current, true); }, 120);
    });

    setActive(0);
    play();
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
