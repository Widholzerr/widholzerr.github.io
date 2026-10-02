// JS do cliente: tema, menu, reveal, linha do tempo, serviços, FAQ e copiar email.
// Tudo é aprimoramento progressivo: sem JS o conteúdo continua legível.

const root = document.documentElement;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---- tema ---- */
const themeBtn = document.querySelector("[data-theme-toggle]");
themeBtn?.addEventListener("click", () => {
  const dark = root.dataset.theme
    ? root.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  const next = dark ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch {}
});

/* ---- menu mobile ---- */
const menuBtn = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");
function setMenu(open) {
  if (!menuBtn || !menu) return;
  menuBtn.setAttribute("aria-expanded", String(open));
  menu.hidden = !open;
}
menuBtn?.addEventListener("click", () => setMenu(menu.hidden));
menu?.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu && !menu.hidden) { setMenu(false); menuBtn.focus(); }
});

/* ---- reveal ao rolar ---- */
const reveals = document.querySelectorAll("[data-reveal]");
if (reduce || !("IntersectionObserver" in window)) {
  reveals.forEach((el) => el.classList.add("in"));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      io.unobserve(e.target);
    });
  }, { threshold: 0.1 });
  reveals.forEach((el) => {
    const d = el.dataset.delay;
    if (d) el.style.setProperty("--d", d + "ms");
    io.observe(el);
  });
}

/* ---- linha do tempo preenchendo no scroll ---- */
const tl = document.querySelector("[data-timeline]");
const fill = tl?.querySelector("[data-fill]");
if (tl && fill && !reduce) {
  let on = false;
  const tick = () => {
    const r = tl.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / Math.max(1, r.height)));
    fill.style.transform = `scaleY(${p})`;
    if (on) requestAnimationFrame(tick);
  };
  new IntersectionObserver(([e]) => {
    const was = on;
    on = e.isIntersecting;
    if (on && !was) tick();
  }).observe(tl);
}

/* ---- serviços: cards + painel ---- */
const cards = [...document.querySelectorAll("[data-svc]")];
const panels = [...document.querySelectorAll("[data-panel]")];
function selectService(i, animate = true) {
  cards.forEach((c, j) => {
    const on = i === j;
    c.setAttribute("aria-expanded", String(on));
    c.querySelector("[data-cue]").textContent = on ? c.dataset.cueOpen : c.dataset.cueClosed;
  });
  panels.forEach((p, j) => {
    p.hidden = i !== j;
    if (i === j && animate && !reduce) {
      p.animate(
        [{ opacity: 0, transform: "translateY(16px)" }, { opacity: 1, transform: "none" }],
        { duration: 500, easing: "cubic-bezier(.2,.7,.2,1)" }
      );
    }
  });
}
cards.forEach((c, i) => c.addEventListener("click", () => selectService(i)));
document.querySelectorAll("[data-select]").forEach((a) =>
  a.addEventListener("click", () => selectService(Number(a.dataset.select)))
);

/* ---- FAQ ---- */
document.querySelectorAll("[data-faq]").forEach((btn) =>
  btn.addEventListener("click", () =>
    btn.setAttribute("aria-expanded", String(btn.getAttribute("aria-expanded") !== "true"))
  )
);

/* ---- copiar email ---- */
const copyBtn = document.querySelector("[data-copy]");
if (copyBtn) {
  let t;
  copyBtn.addEventListener("click", () => {
    navigator.clipboard?.writeText(copyBtn.dataset.copy).catch(() => {});
    const label = copyBtn.querySelector("[data-copy-label]");
    label.textContent = copyBtn.dataset.done;
    clearTimeout(t);
    t = setTimeout(() => (label.textContent = copyBtn.dataset.idle), 1800);
  });
}
