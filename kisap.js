/* KISAP — shared page script: filters, header, glow text, ladder, small interactions */
(function () {
  "use strict";

  /* ---------- site config (edit here) ---------- */
  var NAV = [
    { href: "about.html",    label: "학회 소개",       key: "about" },
    { href: "bylaws.html",   label: "회칙",            key: "bylaws" },
    { href: "archive.html",  label: "자료 아카이빙",    key: "archive" },
    { href: "gallery.html",  label: "학술행사 갤러리",  key: "gallery" },
    { href: "links.html",    label: "링크 모아보기",    key: "links" }
  ];
  var JOIN = { href: "join.html", label: "가입 안내", key: "join" };
  var EMAIL = "kisap@sample.mail";

  var page = document.body.getAttribute("data-page") || "";

  /* ---------- SVG filters (halo spray, alpha boost) ---------- */
  var defs =
    '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">' +
    '<filter id="spray" x="-100%" y="-100%" width="300%" height="300%" color-interpolation-filters="sRGB">' +
    '<feTurbulence type="fractalNoise" baseFrequency="0.42" numOctaves="1" seed="3" result="n1"/>' +
    '<feColorMatrix in="n1" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0" result="a1"/>' +
    '<feComposite in="SourceAlpha" in2="a1" operator="arithmetic" k2="1.5" k3="-1.6" k4="0.42" result="c1"/>' +
    '<feComponentTransfer in="c1" result="m1"><feFuncA type="discrete" tableValues="0 1"/></feComponentTransfer>' +
    '<feTurbulence type="fractalNoise" baseFrequency="1.15" numOctaves="1" seed="11" result="n2"/>' +
    '<feColorMatrix in="n2" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0" result="a2"/>' +
    '<feComposite in="SourceAlpha" in2="a2" operator="arithmetic" k2="1.8" k3="-1.3" k4="0.3" result="c2"/>' +
    '<feComponentTransfer in="c2" result="m2"><feFuncA type="discrete" tableValues="0 1"/></feComponentTransfer>' +
    '<feComposite in="m1" in2="m2" operator="over" result="m"/>' +
    '<feComposite in="SourceGraphic" in2="m" operator="in"/></filter>' +
    '<filter id="boost" x="-100%" y="-100%" width="300%" height="300%" color-interpolation-filters="sRGB"><feComponentTransfer><feFuncA type="linear" slope="2"/></feComponentTransfer></filter>' +
    '<filter id="boost2" x="-100%" y="-100%" width="300%" height="300%" color-interpolation-filters="sRGB"><feComponentTransfer><feFuncA type="linear" slope="3.2"/></feComponentTransfer></filter>' +
    "</svg>";
  document.body.insertAdjacentHTML("afterbegin", defs + '<div class="grain" aria-hidden="true"></div>');

  /* ---------- logo mark (leaning ladder, as in the KISAP logo) ---------- */
  function rungs(n, x, w, h, y0, step) {
    var s = "";
    for (var i = 0; i < n; i++) s += '<rect x="' + x + '" y="' + (y0 + i * step) + '" width="' + w + '" height="' + h + '" rx="' + h / 2 + '"/>';
    return s;
  }
  var MARK =
    '<svg width="13" height="20" viewBox="0 0 228 760" aria-hidden="true" style="transform:rotate(-17deg);filter:drop-shadow(0 0 3px rgba(245,154,192,.9)) drop-shadow(0 0 8px rgba(185,167,242,.6))">' +
    '<defs><linearGradient id="mg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#C9D3FF"/><stop offset=".5" stop-color="#F3D9FF"/><stop offset="1" stop-color="#FFD9CC"/></linearGradient></defs>' +
    '<g fill="url(#mg)"><rect x="0" y="0" width="40" height="760" rx="20"/><rect x="188" y="0" width="40" height="760" rx="20"/>' +
    rungs(6, 10, 208, 34, 92, 118) + "</g></svg>";

  /* ---------- header + mobile menu ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var links = NAV.map(function (n) {
      return '<a href="' + n.href + '"' + (n.key === page ? ' class="active" aria-current="page"' : "") + ">" + n.label + "</a>";
    }).join("");
    header.innerHTML =
      '<a class="logo" href="index.html" aria-label="KISAP 홈">' + MARK + "<span>KISAP</span></a>" +
      '<nav class="nav-links" aria-label="주 메뉴">' + links + "</nav>" +
      '<a class="btn kr" href="' + JOIN.href + '"' + (page === "join" ? ' aria-current="page"' : "") + '><span class="bloom"></span>' + JOIN.label + "</a>" +
      '<button class="menu-btn" aria-label="메뉴 열기" aria-expanded="false"><span></span><span></span></button>';

    var colors = ["--peach", "--pink", "--lilac", "--cyan", "--mint", "--butter"];
    var mm = document.createElement("div");
    mm.className = "mobile-menu";
    mm.innerHTML = NAV.concat([JOIN]).map(function (n, i) {
      return '<a href="' + n.href + '"><span class="dot" style="--c:var(' + colors[i % colors.length] + ')"></span>' + n.label + "</a>";
    }).join("");
    document.body.appendChild(mm);

    var btn = header.querySelector(".menu-btn");
    btn.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    });

    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 24); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- footer ---------- */
  var footer = document.querySelector(".site-footer");
  if (footer) {
    footer.innerHTML =
      '<span class="mono">© KISAP · <span class="kr">한국분석철학대학생연합학회</span></span>' +
      '<span class="mono">' + EMAIL + "</span>";
  }

  /* ---------- glow text: <span class="glow">Text</span> ---------- */
  document.querySelectorAll(".glow").forEach(function (el) {
    var t = el.textContent;
    var esc = t.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    el.setAttribute("aria-label", t);
    el.innerHTML =
      '<i class="g wide" aria-hidden="true">' + esc + "</i>" +
      '<i class="g mid" aria-hidden="true">' + esc + "</i>" +
      '<i class="g near" aria-hidden="true">' + esc + "</i>" +
      '<i class="wb" aria-hidden="true">' + esc + "</i>" +
      '<i class="face" aria-hidden="true">' + esc + "</i>" +
      '<span class="txt">' + esc + "</span>";
  });

  /* ---------- aura blobs: <div class="aura" style="background:..."> ---------- */
  document.querySelectorAll(".aura").forEach(function (el) {
    if (!el.querySelector(".s")) el.innerHTML = '<div class="s"></div><div class="d"></div>';
  });

  /* ---------- the ladder ---------- */
  var STOPS = '<stop offset="0" stop-color="#8EA4EC"/><stop offset=".3" stop-color="#B9A7F2"/><stop offset=".65" stop-color="#F59AC0"/><stop offset="1" stop-color="#FFB49A"/>';
  var T = { rail: 21, rung: 22, gap: 116, inset: 14 }; // viewBox units; width = 228
  function ladderSVG(cls, uid, H) {
    var r = "";
    for (var y = 40; y < H - 20; y += T.gap)
      r += '<rect x="' + (T.inset + 6) + '" y="' + y + '" width="' + (216 - 2 * T.inset) + '" height="' + T.rung + '" rx="' + T.rung / 2 + '"/>';
    return '<svg class="' + cls + '" viewBox="0 0 228 ' + H + '" preserveAspectRatio="none" aria-hidden="true">' +
      '<defs><linearGradient id="' + uid + '" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="228" y2="0">' + STOPS + "</linearGradient></defs>" +
      '<g fill="url(#' + uid + ')">' +
      '<rect x="' + T.inset + '" y="0" width="' + T.rail + '" height="' + H + '" rx="' + T.rail / 2 + '"/>' +
      '<rect x="' + (228 - T.rail - T.inset) + '" y="0" width="' + T.rail + '" height="' + H + '" rx="' + T.rail / 2 + '"/>' +
      r + "</g></svg>";
  }
  function drawLadders() {
    document.querySelectorAll(".ladder").forEach(function (el, k) {
      var w = el.offsetWidth, h = el.offsetHeight;
      if (!w || !h) return;
      var H = Math.round(228 * h / w);
      el.style.setProperty("--ls", (w / 290).toFixed(3));
      el.innerHTML = ["l-wide", "l-mid", "l-br2", "l-br1", "l-body"].map(function (c, i) {
        return ladderSVG(c, "lg" + k + "_" + i, H);
      }).join("");
    });
  }
  drawLadders();
  var rt;
  window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(drawLadders, 150); });

  /* ---------- filter chips (archive / gallery) ---------- */
  document.querySelectorAll("[data-filter-group]").forEach(function (group) {
    var target = document.querySelector(group.getAttribute("data-filter-group"));
    if (!target) return;
    group.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip) return;
      group.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("on"); c.setAttribute("aria-pressed", "false"); });
      chip.classList.add("on");
      chip.setAttribute("aria-pressed", "true");
      var f = chip.getAttribute("data-filter");
      target.querySelectorAll("[data-tag]").forEach(function (item) {
        item.hidden = !(f === "all" || item.getAttribute("data-tag") === f);
      });
    });
  });

  /* ---------- scroll reveal ---------- */
  var rv = document.querySelectorAll(".reveal");
  if (rv.length) {
    if ("IntersectionObserver" in window) {
      var ro = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); ro.unobserve(en.target); } });
      }, { threshold: 0.15 });
      rv.forEach(function (el) { ro.observe(el); });
    } else rv.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- bylaws table of contents highlight ---------- */
  var toc = document.querySelector(".toc");
  if (toc && "IntersectionObserver" in window) {
    var map = {};
    toc.querySelectorAll("a").forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          toc.querySelectorAll("a").forEach(function (a) { a.classList.remove("on"); });
          map[en.target.id].classList.add("on");
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    document.querySelectorAll(".chapter[id]").forEach(function (c) { io.observe(c); });
  }
})();
