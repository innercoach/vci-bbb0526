const REGISTER_URL = "https://vcicoach.jp.larksuite.com/share/base/form/shrjp3VuWrksurWubYfX1TTDVSb";

document.querySelectorAll("[data-register]").forEach((el) => {
  el.href = REGISTER_URL;
  if (REGISTER_URL !== "#") {
    el.target = "_blank";
    el.rel = "noreferrer";
  }
});

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
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

const stickyCta = document.getElementById("sticky-cta");
const heroSection = document.getElementById("hero");
const finalCtaSection = document.getElementById("final-cta");

if (stickyCta && heroSection && "IntersectionObserver" in window) {
  const stickyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target === heroSection) {
          stickyCta.classList.toggle("is-visible", !entry.isIntersecting);
        }

        if (entry.target === finalCtaSection && entry.isIntersecting) {
          stickyCta.classList.remove("is-visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  stickyObserver.observe(heroSection);
  if (finalCtaSection) stickyObserver.observe(finalCtaSection);
}
