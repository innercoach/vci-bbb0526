/* ============================================
   CONFIGURATION
============================================ */
const REGISTER_URL = "#";

/* ============================================
   REGISTER LINKS
============================================ */
document.querySelectorAll("[data-register]").forEach((el) => {
  el.href = REGISTER_URL;
  if (REGISTER_URL !== "#") {
    el.target = "_blank";
    el.rel = "noreferrer";
  }
});

/* ============================================
   SCROLL REVEAL (IntersectionObserver)
============================================ */
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  // Fallback for older browsers
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

/* ============================================
   STICKY CTA – show after scrolling past hero
============================================ */
const stickyCta = document.getElementById("sticky-cta");
const heroSection = document.getElementById("hero");
const ctaSection = document.getElementById("cta");

if (stickyCta && heroSection) {
  const stickyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target === heroSection) {
          // Hero leaves view → show sticky
          stickyCta.classList.toggle("is-visible", !entry.isIntersecting);
        }
        if (entry.target === ctaSection && entry.isIntersecting) {
          // CTA section visible → hide sticky
          stickyCta.classList.remove("is-visible");
        }
      });
    },
    { threshold: 0.1 }
  );
  stickyObserver.observe(heroSection);
  if (ctaSection) stickyObserver.observe(ctaSection);
}

/* ============================================
   TAB SWITCHER (Lead Products section)
============================================ */
function initTabs() {
  const tabContainer = document.querySelector(".tabs");
  if (!tabContainer) return;

  const tabBtns = tabContainer.querySelectorAll("[data-tab]");
  const tabPanels = tabContainer.querySelectorAll("[data-panel]");

  function activateTab(targetId) {
    tabBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === targetId);
      btn.setAttribute("aria-selected", btn.dataset.tab === targetId);
    });
    tabPanels.forEach((panel) => {
      const isActive = panel.dataset.panel === targetId;
      panel.classList.toggle("active", isActive);
      panel.setAttribute("hidden", !isActive);
    });
  }

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => activateTab(btn.dataset.tab));
  });

  // Default: activate first tab
  if (tabBtns.length) activateTab(tabBtns[0].dataset.tab);
}

initTabs();

/* ============================================
   COUNTER ANIMATION
============================================ */
function animateCounter(el, target, suffix = "", duration = 1400) {
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out quart
    const eased = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.counter, 10);
          const suffix = el.dataset.suffix || "";
          animateCounter(el, target, suffix);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((el) => counterObserver.observe(el));
}

initCounters();

/* ============================================
   PHOTO DIVIDERS – apply background image via CSS var
============================================ */
document.querySelectorAll(".photo-divider[data-img]").forEach((el) => {
  el.style.setProperty("--_img", `url("${el.dataset.img}")`);
  // Remove filter on wrapper, apply only to bg pseudo-element via CSS
  el.style.filter = "none";
});
