(function () {
  "use strict";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- mobile menu ---------- */
  var menu = document.getElementById("mobileMenu");
  var openBtn = document.getElementById("menuOpenBtn");
  var closeBtn = document.getElementById("menuCloseBtn");
  if (menu && openBtn && closeBtn) {
    function openMenu() {
      menu.classList.add("is-open");
      openBtn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }
    function closeMenu() {
      menu.classList.remove("is-open");
      openBtn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
    openBtn.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);
    menu.querySelectorAll(".mobile-menu-item").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }

  /* ---------- hero terminal tabs ---------- */
  var tabs = document.querySelectorAll(".panel-tab");
  var cmdQuick = document.getElementById("cmd-quick");
  var cmdCli = document.getElementById("cmd-cli");
  var demoPanelEl = document.getElementById("demo-panel");
  var demoStatusEl = document.getElementById("demoStatus");
  var heroCopyBtnEl = document.getElementById("heroCopyBtn");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.remove("is-active"); });
      tab.classList.add("is-active");
      var which = tab.getAttribute("data-tab");
      if (demoPanelEl) demoPanelEl.classList.toggle("is-active", which === "demo");
      if (demoStatusEl) demoStatusEl.classList.toggle("is-active", which === "demo");
      if (heroCopyBtnEl) heroCopyBtnEl.classList.toggle("is-hidden", which === "demo");
      if (cmdQuick) cmdQuick.classList.toggle("is-hidden", which !== "quick");
      if (cmdCli) cmdCli.classList.toggle("is-hidden", which !== "cli");
    });
  });

  /* ---------- live typewriter dictation demo ---------- */
  (function () {
    var target = document.getElementById("demoTypingText");
    if (!target) return;
    var phrases = [
      "Following up on the proposal we sent last week —",
      "Let's move the kickoff to Thursday afternoon.",
      "Hey clide — jot this down for tomorrow's standup.",
      "Groceries: oat milk, coffee, the good sourdough."
    ];
    if (reduceMotion) { target.textContent = phrases[0]; return; }
    var pi = 0, ci = 0;
    function typeStep() {
      var phrase = phrases[pi];
      target.textContent = phrase.slice(0, ci);
      if (ci <= phrase.length) {
        ci++;
        setTimeout(typeStep, 26 + Math.random() * 58);
      } else {
        setTimeout(eraseStep, 1700);
      }
    }
    function eraseStep() {
      var phrase = phrases[pi];
      ci -= 3;
      if (ci < 0) ci = 0;
      target.textContent = phrase.slice(0, ci);
      if (ci > 0) {
        setTimeout(eraseStep, 12);
      } else {
        pi = (pi + 1) % phrases.length;
        setTimeout(typeStep, 450);
      }
    }
    typeStep();
  })();

  /* ---------- copy buttons ---------- */
  function flashLabel(label, original) {
    label.textContent = "Copied ✓";
    setTimeout(function () { label.textContent = original; }, 1400);
  }
  document.querySelectorAll("[data-copy-text]").forEach(function (btn) {
    var label = btn.querySelector(".copy-label") || btn;
    var original = label.textContent;
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy-text");
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { flashLabel(label, original); });
      } else {
        flashLabel(label, original);
      }
    });
  });
  function textOf(el) { return el.textContent.replace(/^\$\s*/, "$ "); }
  function wireCopy(btn, getTarget) {
    var label = btn.classList.contains("copy-btn") ? btn.querySelector(".copy-btn-label") : btn;
    var original = label.textContent;
    function flash(msg) {
      label.textContent = msg;
      setTimeout(function () { label.textContent = original; }, 1400);
    }
    btn.addEventListener("click", function () {
      var target = getTarget();
      if (!target) return;
      var text = textOf(target);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { flash("Copied"); }).catch(function () { flash("Copy"); });
      } else {
        flash("Copy");
      }
    });
  }
  if (heroCopyBtnEl) {
    wireCopy(heroCopyBtnEl, function () {
      return document.querySelector(".terminal-body .cmd-line:not(.is-hidden)");
    });
  }

  /* ---------- scroll reveal ---------- */
  // Tell the failsafe in <head> that the animations are handled, so it does
  // not reveal everything at once. If this line is never reached — script
  // blocked, error above — the page shows itself anyway rather than staying
  // blank.
  window.__clideRevealReady = true;
  var revealEls = document.querySelectorAll(".reveal, .reveal-3d");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- split-word 3D text reveal ---------- */
  function splitIntoWords(el) {
    var nodes = Array.prototype.slice.call(el.childNodes);
    el.innerHTML = "";
    var frag = document.createDocumentFragment();
    var wordIndex = 0;
    function wrapAsWord(makeInner) {
      var outer = document.createElement("span");
      outer.className = "split-word";
      var inner = document.createElement("span");
      inner.className = "split-word-inner";
      inner.style.transitionDelay = (wordIndex * 0.045) + "s";
      makeInner(inner);
      outer.appendChild(inner);
      frag.appendChild(outer);
      wordIndex++;
    }
    nodes.forEach(function (node) {
      if (node.nodeType === Node.TEXT_NODE) {
        var parts = node.textContent.split(/(\s+)/);
        parts.forEach(function (part) {
          if (part === "") return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          wrapAsWord(function (inner) { inner.textContent = part; });
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        wrapAsWord(function (inner) { inner.appendChild(node); });
      }
    });
    el.appendChild(frag);
  }

  var splitEls = document.querySelectorAll("[data-split]");
  if (reduceMotion) {
    splitEls.forEach(function (el) { el.classList.add("is-split-in"); });
  } else {
    splitEls.forEach(function (el) { splitIntoWords(el); });
    var loadSplits = document.querySelectorAll('[data-split="load"]');
    setTimeout(function () {
      loadSplits.forEach(function (el) { el.classList.add("is-split-in"); });
    }, 550);
    var scrollSplits = document.querySelectorAll('[data-split="scroll"]');
    if ("IntersectionObserver" in window) {
      var splitIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { entry.target.classList.add("is-split-in"); splitIO.unobserve(entry.target); }
        });
      }, { threshold: 0.3, rootMargin: "0px 0px -80px 0px" });
      scrollSplits.forEach(function (el) { splitIO.observe(el); });
    } else {
      scrollSplits.forEach(function (el) { el.classList.add("is-split-in"); });
    }
  }

  /* ---------- scroll progress bar + floating scroll pill ---------- */
  (function () {
    var bar = document.getElementById("scrollProgressBar");
    var pill = document.getElementById("scrollPill");
    var pillTrack = pill ? pill.parentElement : null;
    if (!bar) return;
    var ticking = false, scrollIdle = null;
    function update() {
      ticking = false;
      var doc = document.documentElement;
      var scrollable = doc.scrollHeight - doc.clientHeight;
      var pct = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      bar.style.transform = "scaleX(" + pct + ")";
      if (pill && pillTrack) {
        var trackH = pillTrack.clientHeight;
        var viewRatio = doc.clientHeight / Math.max(1, doc.scrollHeight);
        var pillH = Math.max(44, Math.round(trackH * viewRatio));
        pill.style.height = pillH + "px";
        pill.style.top = Math.round(pct * (trackH - pillH)) + "px";
        pillTrack.classList.add("is-scrolling");
        clearTimeout(scrollIdle);
        scrollIdle = setTimeout(function () { pillTrack.classList.remove("is-scrolling"); }, 700);
      }
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("resize", update);
    update();
  })();

  /* ---------- mouse-tilt + spotlight on cards ---------- */
  var isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!reduceMotion && isFinePointer) {
    document.querySelectorAll(".concept-card, .start-card").forEach(function (card) {
      var raf2 = null;
      card.addEventListener("mouseenter", function () {
        card.style.transition = "transform .12s ease-out, box-shadow .3s ease, border-color .3s ease, background .3s ease";
        card.classList.add("is-spotlit");
      });
      card.addEventListener("mousemove", function (e) {
        if (raf2) return;
        raf2 = requestAnimationFrame(function () {
          raf2 = null;
          var rect = card.getBoundingClientRect();
          var px = (e.clientX - rect.left) / rect.width - 0.5;
          var py = (e.clientY - rect.top) / rect.height - 0.5;
          var rotY = px * 9, rotX = -py * 9;
          card.style.transform = "perspective(900px) rotateX(" + rotX.toFixed(2) + "deg) rotateY(" + rotY.toFixed(2) + "deg) translateY(-4px) translateZ(0)";
          card.style.setProperty("--spot-x", ((px + 0.5) * 100).toFixed(1) + "%");
          card.style.setProperty("--spot-y", ((py + 0.5) * 100).toFixed(1) + "%");
        });
      });
      card.addEventListener("mouseleave", function () {
        card.style.transition = "transform .6s cubic-bezier(.16,1,.3,1), box-shadow .3s ease, border-color .3s ease, background .3s ease";
        card.style.transform = "";
        card.classList.remove("is-spotlit");
      });
    });
  }

  /* ---------- global cursor glow ---------- */
  if (!reduceMotion && isFinePointer) {
    var glowEl = document.getElementById("cursorGlow");
    if (glowEl) {
      var gx = window.innerWidth / 2, gy = window.innerHeight / 2, cx = gx, cy = gy;
      var glowActive = false;
      window.addEventListener("mousemove", function (e) {
        gx = e.clientX; gy = e.clientY;
        if (!glowActive) { glowActive = true; glowEl.classList.add("is-active"); }
      }, { passive: true });
      document.addEventListener("mouseleave", function () { glowEl.classList.remove("is-active"); glowActive = false; });
      (function glowLoop() {
        cx += (gx - cx) * 0.14;
        cy += (gy - cy) * 0.14;
        glowEl.style.transform = "translate3d(" + cx.toFixed(1) + "px," + cy.toFixed(1) + "px,0)";
        requestAnimationFrame(glowLoop);
      })();
    }
  }

  /* ---------- nav scroll shrink ---------- */
  (function () {
    var navWrap = document.querySelector(".nav-wrap");
    if (!navWrap) return;
    var ticking2 = false;
    function updateNav() {
      ticking2 = false;
      navWrap.classList.toggle("is-scrolled", window.scrollY > 40);
    }
    window.addEventListener("scroll", function () {
      if (!ticking2) { ticking2 = true; requestAnimationFrame(updateNav); }
    }, { passive: true });
    updateNav();
  })();

  /* ---------- design-approach scrollytelling ---------- */
  var rows = document.querySelectorAll(".approach-row");
  var mediaPanels = [
    document.getElementById("mockModules"),
    document.getElementById("mockLog"),
    document.getElementById("mockPicker")
  ];
  function setActive(idx) {
    rows.forEach(function (row, i) { row.classList.toggle("is-active", i === idx); });
    mediaPanels.forEach(function (panel, i) { if (panel) panel.classList.toggle("is-active", i === idx); });
  }
  if ("IntersectionObserver" in window && window.matchMedia("(min-width:900px)").matches) {
    var rowIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var idx = parseInt(entry.target.getAttribute("data-row"), 10);
          setActive(idx);
        }
      });
    }, { threshold: 0, rootMargin: "-45% 0px -45% 0px" });
    rows.forEach(function (row) { rowIO.observe(row); });
  }

  /* ---------- 3D tilt on the media frame ---------- */
  var mediaFrame = document.querySelector(".approach-media .media-frame");
  if (mediaFrame && !reduceMotion && isFinePointer) {
    var frameRaf = null;
    mediaFrame.addEventListener("mousemove", function (e) {
      if (frameRaf) return;
      frameRaf = requestAnimationFrame(function () {
        frameRaf = null;
        var rect = mediaFrame.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width - 0.5;
        var py = (e.clientY - rect.top) / rect.height - 0.5;
        mediaFrame.style.transform = "perspective(1200px) rotateX(" + (-py * 7).toFixed(2) + "deg) rotateY(" + (px * 9).toFixed(2) + "deg)";
      });
    });
    mediaFrame.addEventListener("mouseleave", function () {
      mediaFrame.style.transition = "transform .7s cubic-bezier(.16,1,.3,1)";
      mediaFrame.style.transform = "";
      setTimeout(function () { mediaFrame.style.transition = "transform .2s ease-out"; }, 700);
    });
  }

  /* ---------- mockup builders ---------- */
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function buildModules(container) {
    if (!container) return;
    var wrap = el("div", "mock-settings");
    var head = el("div", "mock-settings-head");
    head.appendChild(el("span", "mock-settings-title", "Models & modules"));
    head.appendChild(el("span", "mock-search", "Search modules"));
    wrap.appendChild(head);
    var rowsEl = el("div", "mock-rows");
    var data = [
      ["LW", "Local Whisper · 33 models", "GGML · Metal accelerated", true],
      ["PK", "Local Parakeet · 3 models", "TDT + CTC · ONNX", true],
      ["AS", "Apple Speech", "Built in · on-device", true],
      ["5C", "Five cloud providers", "BYOK · selected explicitly", true],
      ["AI", "Apple Intelligence Rewrite", "On-device refinement", true],
      ["AX", "Accessibility insertion", "Copied + targeted paste fallback", true]
    ];
    data.forEach(function (d) {
      var row = el("div", "mock-row" + (d[3] ? "" : " dim"));
      var sw = el("span", "mock-swatch", d[0]);
      sw.style.background = d[3] ? "hsla(196,80%,55%,.14)" : "hsla(0,0%,100%,.06)";
      sw.style.color = d[3] ? "var(--brand)" : "var(--text-placeholder)";
      row.appendChild(sw);
      var txt = el("span", "mock-row-text");
      txt.appendChild(el("span", "mock-row-name", d[1]));
      txt.appendChild(el("span", "mock-row-sub", d[2]));
      row.appendChild(txt);
      row.appendChild(el("span", "mock-toggle " + (d[3] ? "on" : "off")));
      rowsEl.appendChild(row);
    });
    wrap.appendChild(rowsEl);
    container.appendChild(wrap);
  }

  function buildLog(container) {
    if (!container) return;
    var wrap = el("div", "mock-log");
    var head = el("div", "mock-log-head");
    head.appendChild(el("span", "mock-log-title", "Session log"));
    head.appendChild(el("span", "mock-log-badge", "TEXT ONLY"));
    wrap.appendChild(head);
    var data = [
      ["09:41", "Mail", "Following up on the proposal we sent last week —"],
      ["09:38", "Notes", "Groceries: oat milk, coffee, the good sourdough"],
      ["09:35", "Slack", "Can you push the deploy to staging first?"],
      ["09:31", "Meet", "Action items from the quarterly review, shared with the team"],
      ["09:24", "Docs", "Let's move the kickoff to Thursday afternoon"]
    ];
    data.forEach(function (d, i) {
      var row = el("div", "log-row");
      row.appendChild(el("span", "log-time", d[0]));
      row.appendChild(el("span", "log-tag", d[1]));
      row.appendChild(el("span", "log-text", d[2]));
      var wave = el("span", "log-wave");
      for (var b = 0; b < 8; b++) {
        var bar = document.createElement("span");
        var h = 4 + Math.round(Math.abs(Math.sin((i + 1) * (b + 1))) * 10);
        bar.style.height = h + "px";
        bar.style.animationDelay = (b * 0.09 + i * 0.05) + "s";
        wave.appendChild(bar);
      }
      row.appendChild(wave);
      wrap.appendChild(row);
    });
    container.appendChild(wrap);
  }

  function buildPicker(container) {
    if (!container) return;
    var wrap = el("div", "mock-picker");
    var inner = el("div", "mock-picker-inner");

    var top = el("div", "picker-toprow");
    top.innerHTML =
      '<span class="picker-pill">' +
      '<svg viewBox="0 0 16 16" fill="none"><path d="M2 4.5C2 3.7 2.7 3 3.5 3H6.2L7.7 4.8H12.5C13.3 4.8 14 5.5 14 6.3V11.5C14 12.3 13.3 13 12.5 13H3.5C2.7 13 2 12.3 2 11.5V4.5Z" stroke="#0a2338" stroke-width="1.3" stroke-linejoin="round"/></svg>' +
      'clide-workspace' +
      '<svg class="picker-chev" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="#5a7385" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      '</span>' +
      '<span class="picker-pill on">' +
      '<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3.4" stroke="#0a2338" stroke-width="1.3"/><path d="M8 1.6v1.6M8 12.8v1.6M14.4 8h-1.6M3.2 8H1.6M12.3 3.7l-1.1 1.1M4.8 11.2l-1.1 1.1M12.3 12.3l-1.1-1.1M4.8 4.8L3.7 3.7" stroke="#0a2338" stroke-width="1.2" stroke-linecap="round"/></svg>' +
      'Processing mode' +
      '<svg class="picker-chev" style="transform:rotate(180deg)" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="#5a7385" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      '</span>';
    inner.appendChild(top);

    var bar = el("div", "cmdbar");
    bar.innerHTML =
      '<div class="cmdbar-hint">Say something, or start typing…</div>' +
      '<div class="cmdbar-foot">' +
      '<span class="cmdbar-mic"><svg width="40%" height="40%" viewBox="0 0 12 12" fill="none"><rect x="4.2" y="1.4" width="3.6" height="6" rx="1.8" stroke="#0a2338" stroke-width="1.1"/><path d="M2.6 6.4a3.4 3.4 0 0 0 6.8 0M6 9.8v1" stroke="#0a2338" stroke-width="1.1" stroke-linecap="round"/></svg></span>' +
      '<span class="cmdbar-send"><svg width="42%" height="42%" viewBox="0 0 12 12" fill="none"><path d="M6 10V2M2.5 5.5L6 2L9.5 5.5" stroke="#041722" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
      '</div>';
    inner.appendChild(bar);

    var list = el("div", "mode-list");
    var modes = [
      ["Verbatim", "Preserves the words you said with minimal normalization.", false],
      ["Polished", "Deterministic local cleanup for casing, spacing, fillers, and punctuation.", true],
      ["Rewrite", "Apple Intelligence turns spoken phrasing into written prose on-device.", false]
    ];
    modes.forEach(function (m) {
      var row = el("div", "mode-row" + (m[2] ? " selected" : ""));
      var txt = el("div");
      txt.appendChild(el("div", "mode-name", m[0]));
      txt.appendChild(el("div", "mode-desc", m[1]));
      row.appendChild(txt);
      if (m[2]) {
        row.style.flex = "1";
        row.style.justifyContent = "space-between";
        row.innerHTML += '<svg class="mode-check" viewBox="0 0 16 16" fill="none"><path d="M3 8.2L6.5 11.7L13 4.7" stroke="var(--brand)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      }
      list.appendChild(row);
    });
    inner.appendChild(list);

    wrap.appendChild(inner);
    container.appendChild(wrap);
  }

  buildModules(document.getElementById("mockModules0"));
  buildModules(document.getElementById("mockModules"));
  buildLog(document.getElementById("mockLog1"));
  buildLog(document.getElementById("mockLog"));
  buildPicker(document.getElementById("mockPicker2"));
  buildPicker(document.getElementById("mockPicker"));

  /* ---------- marquee: duplicate track for a seamless loop ---------- */
  var marqueeTrack = document.getElementById("marqueeTrack");
  if (marqueeTrack) {
    marqueeTrack.innerHTML += marqueeTrack.innerHTML;
  }

  /* ---------- stat count-up ---------- */
  var statEls = document.querySelectorAll(".stat-number");
  function animateCount(el) {
    var to = parseFloat(el.getAttribute("data-count-to"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduceMotion) { el.textContent = to.toFixed(decimals) + suffix; return; }
    var start = performance.now(), duration = 1500;
    function tick(now) {
      var p = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (to * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if (statEls.length) {
    if ("IntersectionObserver" in window) {
      var statIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { animateCount(entry.target); statIO.unobserve(entry.target); }
        });
      }, { threshold: 0.6 });
      statEls.forEach(function (el) { statIO.observe(el); });
    } else {
      statEls.forEach(animateCount);
    }
  }


  /* ---------- WebGL2 fluid aurora background (oceanic blue) ---------- */
  function hexToRgb01(hex) {
    var h = hex.replace("#", "");
    return [parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255];
  }

  var FLUID_VERT = "#version 300 es\nin vec4 a_position;\nout vec2 vUv;\nvoid main() {\n  vUv = a_position.xy * 0.5 + 0.5;\n  gl_Position = a_position;\n}\n";

  var FLOWMAP_FRAG = "#version 300 es\nprecision mediump float;\nin vec2 vUv;\nuniform sampler2D u_prev;\nuniform vec2 u_mouse;\nuniform vec2 u_velocity;\nuniform float u_brushRadius;\nuniform float u_brushStrength;\nuniform float u_decay;\nout vec4 fragColor;\n\nvoid main() {\n  vec4 prev = texture(u_prev, vUv);\n  prev.r *= u_decay;\n  prev.gb = mix(vec2(0.5), prev.gb, u_decay);\n  float dist = distance(vUv, u_mouse);\n  float influence = exp(-dist * dist / (u_brushRadius * u_brushRadius * 0.5));\n  influence = max(0.0, influence - 0.01);\n  float speed = length(u_velocity);\n  float presenceStrength = u_brushStrength * 0.3;\n  float velBonus = min(speed * 3.0, 0.7) * u_brushStrength;\n  float totalStrength = presenceStrength + velBonus;\n  prev.r = max(prev.r, influence * totalStrength);\n  float blendAmt = influence * min(totalStrength, 0.4) * 0.3;\n  prev.g = mix(prev.g, clamp(u_velocity.x * 2.0 + 0.5, 0.0, 1.0), blendAmt);\n  prev.b = mix(prev.b, clamp(u_velocity.y * 2.0 + 0.5, 0.0, 1.0), blendAmt);\n  fragColor = prev;\n}\n";

  var FLUID_FRAG = "#version 300 es\nprecision mediump float;\nin vec2 vUv;\nuniform float u_time;\nuniform vec2 u_resolution;\nuniform vec3 u_c1, u_c2, u_c3, u_c4, u_c5;\nuniform float u_scale;\nuniform vec2 u_offset;\nuniform float u_grain;\nuniform sampler2D u_flowmap;\nuniform float u_distortBoost;\nuniform float u_swirlBoost;\nuniform float u_glowIntensity;\nuniform vec3 u_glowColor1;\nuniform vec3 u_glowColor2;\nuniform vec3 u_glowColor3;\nuniform vec2 u_lightPos;\nuniform float u_lightCore;\nuniform float u_lightHalo;\nuniform float u_vignette;\nuniform float u_bloomThreshold;\nuniform float u_bloomRange;\nuniform float u_bloomStrength;\nout vec4 fragColor;\n\nvec3 mod289v3(vec3 x){return x-floor(x*(1./289.))*289.;}\nvec4 mod289v4(vec4 x){return x-floor(x*(1./289.))*289.;}\nvec4 permute(vec4 x){return mod289v4(((x*34.)+1.)*x);}\nvec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}\n\nfloat snoise(vec3 v){\n  const vec2 C=vec2(1./6.,1./3.);\n  const vec4 D=vec4(0.,.5,1.,2.);\n  vec3 i=floor(v+dot(v,C.yyy));\n  vec3 x0=v-i+dot(i,C.xxx);\n  vec3 g=step(x0.yzx,x0.xyz);\n  vec3 l=1.-g;\n  vec3 i1=min(g.xyz,l.zxy);\n  vec3 i2=max(g.xyz,l.zxy);\n  vec3 x1=x0-i1+C.xxx;\n  vec3 x2=x0-i2+C.yyy;\n  vec3 x3=x0-D.yyy;\n  i=mod289v3(i);\n  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));\n  float n_=.142857142857;\n  vec3 ns=n_*D.wyz-D.xzx;\n  vec4 j=p-49.*floor(p*ns.z*ns.z);\n  vec4 x_=floor(j*ns.z);\n  vec4 y_=floor(j-7.*x_);\n  vec4 x=x_*ns.x+ns.yyyy;\n  vec4 y=y_*ns.x+ns.yyyy;\n  vec4 h=1.-abs(x)-abs(y);\n  vec4 b0=vec4(x.xy,y.xy);\n  vec4 b1=vec4(x.zw,y.zw);\n  vec4 s0=floor(b0)*2.+1.;\n  vec4 s1=floor(b1)*2.+1.;\n  vec4 sh=-step(h,vec4(0.));\n  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;\n  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;\n  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);\n  vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);\n  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));\n  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;\n  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);\n  m=m*m;\n  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));\n}\n\nfloat hash(vec2 p){\n  vec3 p3=fract(vec3(p.xyx)*.1031);\n  p3+=dot(p3,p3.yzx+33.33);\n  return fract((p3.x+p3.y)*p3.z);\n}\n\nfloat fbm(vec3 p){\n  float v=0.,amp=.6;vec3 shift=vec3(100.);\n  for(int i=0;i<1;i++){v+=amp*snoise(p);p=p*2.+shift;amp*=.4;}\n  return v;\n}\n\nfloat fluidNoise(vec2 uv,float t){\n  float n1=fbm(vec3(uv*.6,t*.06));\n  float n2=fbm(vec3(uv*.6+5.2,t*.06+1.3));\n  vec2 w1=vec2(n1,n2)*.6;\n  float n3=fbm(vec3((uv+w1)*.7+1.7,t*.05+3.1));\n  float n4=fbm(vec3((uv+w1)*.7+9.2,t*.05+5.7));\n  vec2 w2=vec2(n3,n4)*.5;\n  return fbm(vec3((uv+w1+w2)*.5,t*.04));\n}\n\nvec2 curlish(vec2 uv,float t){\n  float eps=.02;\n  float n=snoise(vec3(uv*.8,t));\n  float nx=snoise(vec3((uv+vec2(eps,0.))*.8,t));\n  float ny=snoise(vec3((uv+vec2(0.,eps))*.8,t));\n  return vec2(-(ny-n)/eps,(nx-n)/eps)*.003;\n}\n\nvoid main(){\n  float aspect=u_resolution.x/u_resolution.y;\n  vec2 uv=gl_FragCoord.xy/u_resolution;\n  vec2 suv=vec2(uv.x*aspect, uv.y) * u_scale + u_offset;\n  float t=u_time;\n  vec4 flow = texture(u_flowmap, uv);\n  float influence = flow.r;\n  vec2 flowDir = (flow.gb - 0.5) * 2.0;\n  suv += flowDir * influence * u_distortBoost * 0.8;\n  float swirlAngle = influence * u_swirlBoost * 2.5;\n  float cs = cos(swirlAngle), sn = sin(swirlAngle);\n  vec2 delta = suv - vec2(uv.x * aspect, uv.y) * u_scale;\n  suv += (mat2(cs, sn, -sn, cs) * delta - delta) * influence;\n  vec2 curl=curlish(suv,t*.04);\n  vec2 uvD=suv+curl*12.;\n  float f=fluidNoise(uvD,t);\n  float swirl=snoise(vec3(uvD*.8+f*1.5,t*.035))*.5+.5;\n  float n=f*.5+.5;\n  vec3 col=mix(u_c1,u_c2,smoothstep(.2,.5,n));\n  col=mix(col,u_c3,smoothstep(.35,.65,n+swirl*.25));\n  col=mix(col,u_c4,smoothstep(.6,.85,swirl)*.55);\n  col=mix(col,u_c5,smoothstep(.5,.8,n*swirl)*.35);\n  float glow = smoothstep(0.0, 0.8, influence);\n  float glowNoise = snoise(vec3(uvD * 1.5, t * 0.08)) * 0.5 + 0.5;\n  float glowDist = smoothstep(0.0, 1.0, influence);\n  vec3 glowMix = mix(u_glowColor3, u_glowColor2, glowDist);\n  glowMix = mix(glowMix, u_glowColor1, glowDist * glowNoise);\n  col = mix(col, glowMix, glow * u_glowIntensity);\n  if(u_grain>0.0){\n    vec2 flowOffset = (uvD - suv) * u_resolution.y;\n    vec2 gp = floor((gl_FragCoord.xy + flowOffset) / 5.0);\n    float gr=hash(gp)*2.-1.;\n    col+=gr*u_grain;\n  }\n  float luma=dot(col,vec3(.299,.587,.114));\n  float bloom=smoothstep(u_bloomThreshold-u_bloomRange,u_bloomThreshold+u_bloomRange,luma);\n  col+=(col*.85+vec3(.15,.145,.13))*bloom*u_bloomStrength;\n  float ld=length((uv-u_lightPos)*vec2(aspect,1.));\n  float core=exp(-ld*ld*4.5);\n  float halo=exp(-ld*1.8);\n  col+=vec3(1.,.98,.95)*core*u_lightCore+vec3(.8,.95,1.)*halo*u_lightHalo;\n  float vig=1.-smoothstep(.35,.75,length(uv-.5));\n  col=mix(mix(col,vec3(1.0),u_vignette),col,vig);\n  fragColor=vec4(col,1.);\n}\n";

  function initFluidHero(canvas, params) {
    if (!canvas) return;
    var gl = canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: false, powerPreference: "low-power" });
    if (!gl) { canvas.style.display = "none"; return; }

    function compile(type, src) {
      var sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) { console.error("Shader:", gl.getShaderInfoLog(sh)); return null; }
      return sh;
    }
    function link(fragSrc) {
      var vs = compile(gl.VERTEX_SHADER, FLUID_VERT);
      var fs = compile(gl.FRAGMENT_SHADER, fragSrc);
      if (!vs || !fs) return null;
      var prog = gl.createProgram();
      gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { console.error("Link:", gl.getProgramInfoLog(prog)); return null; }
      return prog;
    }

    var flowProg = link(FLOWMAP_FRAG);
    var fluidProg = link(FLUID_FRAG);
    if (!flowProg || !fluidProg) { canvas.style.display = "none"; return; }
    var FLUID_PARAMS = params;

    var fU = {
      prev: gl.getUniformLocation(flowProg, "u_prev"), mouse: gl.getUniformLocation(flowProg, "u_mouse"),
      velocity: gl.getUniformLocation(flowProg, "u_velocity"), brushRadius: gl.getUniformLocation(flowProg, "u_brushRadius"),
      brushStrength: gl.getUniformLocation(flowProg, "u_brushStrength"), decay: gl.getUniformLocation(flowProg, "u_decay")
    };
    var pU = {
      time: gl.getUniformLocation(fluidProg, "u_time"), resolution: gl.getUniformLocation(fluidProg, "u_resolution"),
      scale: gl.getUniformLocation(fluidProg, "u_scale"), offset: gl.getUniformLocation(fluidProg, "u_offset"),
      grain: gl.getUniformLocation(fluidProg, "u_grain"), flowmap: gl.getUniformLocation(fluidProg, "u_flowmap"),
      distortBoost: gl.getUniformLocation(fluidProg, "u_distortBoost"), swirlBoost: gl.getUniformLocation(fluidProg, "u_swirlBoost"),
      glowIntensity: gl.getUniformLocation(fluidProg, "u_glowIntensity"),
      glowColor1: gl.getUniformLocation(fluidProg, "u_glowColor1"), glowColor2: gl.getUniformLocation(fluidProg, "u_glowColor2"),
      glowColor3: gl.getUniformLocation(fluidProg, "u_glowColor3"),
      c1: gl.getUniformLocation(fluidProg, "u_c1"), c2: gl.getUniformLocation(fluidProg, "u_c2"),
      c3: gl.getUniformLocation(fluidProg, "u_c3"), c4: gl.getUniformLocation(fluidProg, "u_c4"), c5: gl.getUniformLocation(fluidProg, "u_c5"),
      lightPos: gl.getUniformLocation(fluidProg, "u_lightPos"), lightCore: gl.getUniformLocation(fluidProg, "u_lightCore"),
      lightHalo: gl.getUniformLocation(fluidProg, "u_lightHalo"), vignette: gl.getUniformLocation(fluidProg, "u_vignette"),
      bloomThreshold: gl.getUniformLocation(fluidProg, "u_bloomThreshold"), bloomRange: gl.getUniformLocation(fluidProg, "u_bloomRange"),
      bloomStrength: gl.getUniformLocation(fluidProg, "u_bloomStrength")
    };

    var quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    function bindQuad(prog) {
      var loc = gl.getAttribLocation(prog, "a_position");
      gl.bindBuffer(gl.ARRAY_BUFFER, quad);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    }
    function makeTex(w, h, data) {
      var tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      if (data) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
      else gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      var fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      return { fbo: fbo, tex: tex };
    }

    var width = 0, height = 0, flowW = 0, flowH = 0, flip = false, flowA, flowB;
    var dprCap = 1.5;

    function allocate() {
      var dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      width = Math.round(canvas.clientWidth * dpr);
      height = Math.round(canvas.clientHeight * dpr);
      canvas.width = width; canvas.height = height;
      flowW = Math.max(1, Math.round(width / 4));
      flowH = Math.max(1, Math.round(height / 4));
      var neutral = new Uint8Array(flowW * flowH * 4);
      for (var i = 0; i < flowW * flowH; i++) { neutral[4 * i] = 0; neutral[4 * i + 1] = 128; neutral[4 * i + 2] = 128; neutral[4 * i + 3] = 255; }
      flowA = makeTex(flowW, flowH, neutral);
      flowB = makeTex(flowW, flowH, neutral);
    }
    allocate();

    var isCoarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    var interactive = !isCoarse;
    var mouse = { x: 0.5, y: 0.5, smoothX: 0.5, smoothY: 0.5, svx: 0, svy: 0 };
    function onMouseMove(e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = 1 - (e.clientY - rect.top) / rect.height;
    }
    if (interactive) window.addEventListener("mousemove", onMouseMove, { passive: true });

    var glowRgb = [hexToRgb01(FLUID_PARAMS.glowColors[0]), hexToRgb01(FLUID_PARAMS.glowColors[1]), hexToRgb01(FLUID_PARAMS.glowColors[2])];
    var colorRgb = FLUID_PARAMS.colors.map(hexToRgb01);
    var cLocs = [pU.c1, pU.c2, pU.c3, pU.c4, pU.c5];

    function renderFrame(elapsed) {
      var dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      var w = Math.round(canvas.clientWidth * dpr), h = Math.round(canvas.clientHeight * dpr);
      if (w !== width || h !== height) { width = w; height = h; canvas.width = width; canvas.height = height; allocate(); }

      mouse.smoothX += (mouse.x - mouse.smoothX) * FLUID_PARAMS.mouseSmoothing;
      mouse.smoothY += (mouse.y - mouse.smoothY) * FLUID_PARAMS.mouseSmoothing;
      mouse.svx += ((mouse.x - mouse.smoothX) * 0.5 - mouse.svx) * FLUID_PARAMS.mouseVelocity;
      mouse.svy += ((mouse.y - mouse.smoothY) * 0.5 - mouse.svy) * FLUID_PARAMS.mouseVelocity;

      var src = flip ? flowB : flowA, dst = flip ? flowA : flowB;
      flip = !flip;

      gl.bindFramebuffer(gl.FRAMEBUFFER, dst.fbo);
      gl.viewport(0, 0, flowW, flowH);
      gl.useProgram(flowProg); bindQuad(flowProg);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, src.tex);
      gl.uniform1i(fU.prev, 0);
      gl.uniform2f(fU.mouse, mouse.smoothX, mouse.smoothY);
      gl.uniform2f(fU.velocity, mouse.svx, mouse.svy);
      gl.uniform1f(fU.brushRadius, FLUID_PARAMS.mouseRadius);
      gl.uniform1f(fU.brushStrength, interactive ? FLUID_PARAMS.mouseStrength : 0);
      gl.uniform1f(fU.decay, FLUID_PARAMS.decay);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, width, height);

      var t = elapsed * 0.001 * (FLUID_PARAMS.speed / 100);
      gl.useProgram(fluidProg); bindQuad(fluidProg);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, dst.tex);
      gl.uniform1i(pU.flowmap, 0);
      gl.uniform1f(pU.time, t);
      gl.uniform2f(pU.resolution, width, height);
      gl.uniform1f(pU.scale, FLUID_PARAMS.scale);
      gl.uniform2f(pU.offset, FLUID_PARAMS.offsetX / 100, FLUID_PARAMS.offsetY / 100);
      gl.uniform1f(pU.grain, FLUID_PARAMS.grain);
      gl.uniform1f(pU.distortBoost, FLUID_PARAMS.distortBoost);
      gl.uniform1f(pU.swirlBoost, FLUID_PARAMS.swirlBoost);
      var lightFollow = interactive ? FLUID_PARAMS.lightFollow : 0;
      gl.uniform2f(pU.lightPos, FLUID_PARAMS.lightX + (mouse.smoothX - FLUID_PARAMS.lightX) * lightFollow, FLUID_PARAMS.lightY);
      gl.uniform1f(pU.lightCore, isCoarse ? 0 : FLUID_PARAMS.lightCore);
      gl.uniform1f(pU.lightHalo, isCoarse ? 0 : FLUID_PARAMS.lightHalo);
      gl.uniform1f(pU.vignette, FLUID_PARAMS.vignette);
      gl.uniform1f(pU.bloomThreshold, FLUID_PARAMS.bloomThreshold);
      gl.uniform1f(pU.bloomRange, FLUID_PARAMS.bloomRange);
      gl.uniform1f(pU.bloomStrength, FLUID_PARAMS.bloomStrength);
      gl.uniform1f(pU.glowIntensity, FLUID_PARAMS.glowIntensity);
      gl.uniform3f(pU.glowColor1, glowRgb[0][0], glowRgb[0][1], glowRgb[0][2]);
      gl.uniform3f(pU.glowColor2, glowRgb[1][0], glowRgb[1][1], glowRgb[1][2]);
      gl.uniform3f(pU.glowColor3, glowRgb[2][0], glowRgb[2][1], glowRgb[2][2]);
      for (var i = 0; i < 5; i++) { gl.uniform3f(cLocs[i], colorRgb[i][0], colorRgb[i][1], colorRgb[i][2]); }
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    var active = true;
    if ("IntersectionObserver" in window) {
      var io2 = new IntersectionObserver(function (entries) { active = entries[0].isIntersecting; }, { threshold: 0 });
      io2.observe(canvas);
    }

    var start = performance.now(), lastFrame = 0, frameInterval = 1000 / 30;
    (function loop(now) {
      requestAnimationFrame(loop);
      if (!active || now - lastFrame < frameInterval) return;
      lastFrame = now - (now - lastFrame) % frameInterval;
      renderFrame(now - start);
    })(performance.now());
  }
  initFluidHero(document.getElementById("heroField"), {
    mouseRadius: 0.12, mouseStrength: 2.4, mouseSmoothing: 0.12, mouseVelocity: 0.24, decay: 0.94,
    distortBoost: 2.7, swirlBoost: 1.05,
    glowIntensity: 0.22,
    glowColors: ["#ffffff", "#33c4e6", "#0c7fae"],
    speed: 34,
    scale: 1.77, offsetX: -124, offsetY: -48, grain: 0.006,
    colors: ["#ffffff", "#e4f3fb", "#8bd7f2", "#2f9cd4", "#ffffff"],
    lightX: 0.89, lightY: 0.46, lightCore: 0.09, lightHalo: 0.14, vignette: 0.16, lightFollow: 0.7,
    bloomThreshold: 0.82, bloomRange: 0.12, bloomStrength: 0.22
  });
  initFluidHero(document.getElementById("ctaField"), {
    mouseRadius: 0.16, mouseStrength: 2.0, mouseSmoothing: 0.1, mouseVelocity: 0.2, decay: 0.93,
    distortBoost: 2.2, swirlBoost: 0.8,
    glowIntensity: 0.16,
    glowColors: ["#ffffff", "#8bd7f2", "#2f9cd4"],
    speed: 22,
    scale: 2.1, offsetX: -100, offsetY: -60, grain: 0.005,
    colors: ["#ffffff", "#eef8fd", "#c4e9f8", "#7ccbee", "#ffffff"],
    lightX: 0.5, lightY: 0.2, lightCore: 0.05, lightHalo: 0.1, vignette: 0.1, lightFollow: 0.4,
    bloomThreshold: 0.85, bloomRange: 0.1, bloomStrength: 0.15
  });

  /* ---------- scroll-linked hero blur ---------- */
  (function () {
    var heroSection = document.getElementById("heroSection");
    var canvasWrap = document.getElementById("heroCanvasWrap");
    if (!heroSection || !canvasWrap) return;

    canvasWrap.style.opacity = "0";
    canvasWrap.style.filter = "blur(20px)";
    canvasWrap.style.transition = "opacity 1.4s cubic-bezier(.16,1,.3,1), filter 1.4s cubic-bezier(.16,1,.3,1)";

    var revealed = false;
    function revealNow() {
      if (revealed) return;
      revealed = true;
      requestAnimationFrame(function () {
        canvasWrap.style.opacity = "1";
        canvasWrap.style.filter = "blur(0px)";
      });
    }
    if (reduceMotion) {
      canvasWrap.style.transition = "none";
      canvasWrap.style.opacity = "1";
      canvasWrap.style.filter = "blur(0px)";
      revealed = true;
    } else {
      revealNow();
    }

    function onScroll() {
      if (!revealed) return;
      var rect = heroSection.getBoundingClientRect();
      var r = Math.min(1, Math.max(0, -rect.top / (0.6 * heroSection.offsetHeight)));
      canvasWrap.style.transition = "none";
      canvasWrap.style.filter = "blur(" + (20 * r) + "px)";
    }
    window.addEventListener("scroll", onScroll, { passive: true });
  })();

  /* ---------- Canvas2D elastic grid overlay ---------- */
  function initGridOverlay(canvas, opts) {
    if (!canvas) return;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    var ctx = canvas.getContext("2d");
    if (!ctx) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var SPACING = 90, RADIUS = 140;
    var w = 0, h = 0, cols = 0, rowsN = 0, points = [];

    function layout() {
      cols = Math.ceil(w / SPACING) + 1;
      rowsN = Math.ceil(h / SPACING) + 1;
      var ox = (w - (cols - 1) * SPACING) / 2, oy = (h - (rowsN - 1) * SPACING) / 2;
      points = [];
      for (var r = 0; r < rowsN; r++) {
        for (var c = 0; c < cols; c++) {
          var x = ox + SPACING * c, y = oy + SPACING * r;
          points.push({ restX: x, restY: y, x: x, y: y, vx: 0, vy: 0 });
        }
      }
    }
    function resize() {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layout();
    }
    resize();

    var mouse = { x: NaN, y: NaN };
    var sleeping = false, resizeTimer = null;
    function wake() { if (sleeping) { sleeping = false; requestAnimationFrame(loop); } }
    function onMove(e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top;
      wake();
    }
    window.addEventListener("mousemove", onMove, { passive: true });

    var lastT = 0, interval = 1000 / 30;
    function loop(now) {
      if (now - lastT < interval) { requestAnimationFrame(loop); return; }
      lastT = now - (now - lastT) % interval;

      var cw = canvas.clientWidth, ch = canvas.clientHeight;
      if (cw !== w || ch !== h) {
        w = cw; h = ch; canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        clearTimeout(resizeTimer); resizeTimer = setTimeout(layout, 150);
      }
      ctx.clearRect(0, 0, w, h);

      var mx = mouse.x, my = mouse.y, maxV = 0;
      for (var i = 0; i < points.length; i++) {
        var p = points[i], dx = p.x - mx, dy = p.y - my, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < RADIUS && dist > 0.1) {
          var f = (1 - dist / RADIUS) * 30, nx = dx / dist, ny = dy / dist;
          p.vx += nx * f * 0.1; p.vy += ny * f * 0.1;
        }
        p.vx += 0.05 * (p.restX - p.x); p.vy += 0.05 * (p.restY - p.y);
        p.vx *= 0.85; p.vy *= 0.85;
        p.x += p.vx; p.y += p.vy;
        var mag = Math.abs(p.vx) + Math.abs(p.vy);
        if (mag > maxV) maxV = mag;
      }

      ctx.globalAlpha = 1;
      ctx.strokeStyle = opts.lineColor + opts.lineOpacity + ")";
      ctx.lineWidth = 0.5;
      for (var r = 0; r < rowsN; r++) {
        for (var c = 0; c < cols - 1; c++) {
          var a = points[r * cols + c], b = points[r * cols + c + 1];
          var ldx = b.x - a.x, ldy = b.y - a.y, ldist = Math.sqrt(ldx * ldx + ldy * ldy);
          if (ldist < 20) continue;
          var lnx = ldx / ldist, lny = ldy / ldist;
          ctx.beginPath(); ctx.moveTo(a.x + 10 * lnx, a.y + 10 * lny); ctx.lineTo(b.x - 10 * lnx, b.y - 10 * lny); ctx.stroke();
        }
      }
      for (var c2 = 0; c2 < cols; c2++) {
        for (var r2 = 0; r2 < rowsN - 1; r2++) {
          var a2 = points[r2 * cols + c2], b2 = points[(r2 + 1) * cols + c2];
          var ldx2 = b2.x - a2.x, ldy2 = b2.y - a2.y, ldist2 = Math.sqrt(ldx2 * ldx2 + ldy2 * ldy2);
          if (ldist2 < 20) continue;
          var lnx2 = ldx2 / ldist2, lny2 = ldy2 / ldist2;
          ctx.beginPath(); ctx.moveTo(a2.x + 10 * lnx2, a2.y + 10 * lny2); ctx.lineTo(b2.x - 10 * lnx2, b2.y - 10 * lny2); ctx.stroke();
        }
      }

      ctx.fillStyle = opts.dotColor + opts.dotOpacity + ")";
      for (var j = 0; j < points.length; j++) {
        var dp = points[j], size = 1.8, alpha = opts.dotOpacity;
        if (!isNaN(mx) && !isNaN(my)) {
          var ddx = dp.x - mx, ddy = dp.y - my, ddist = Math.sqrt(ddx * ddx + ddy * ddy), l = Math.max(0, 1 - ddist / RADIUS);
          size = 1.8 + 2 * l; alpha = opts.dotOpacity + 0.4 * l;
        }
        ctx.globalAlpha = alpha;
        var s2 = 2 * size;
        ctx.fillRect(dp.x - size, dp.y - size, s2, s2);
      }
      ctx.globalAlpha = 1;

      if (maxV < 0.01) { sleeping = true; } else { requestAnimationFrame(loop); }
    }
    requestAnimationFrame(loop);

    if ("IntersectionObserver" in window) {
      var io3 = new IntersectionObserver(function (entries) { if (entries[0].isIntersecting) wake(); }, { threshold: 0 });
      io3.observe(canvas);
    }
  }
  initGridOverlay(document.getElementById("heroGrid"), { lineColor: "rgba(6, 34, 58,", dotColor: "rgba(6, 34, 58,", lineOpacity: 0.1, dotOpacity: 0.2 });

})();
