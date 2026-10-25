(() => {
  "use strict";

  const preloader = document.getElementById("preloader");
  const hidePreloader = () => preloader && preloader.classList.add("hide");
  window.addEventListener("load", hidePreloader);
  setTimeout(hidePreloader, 2500);

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Collapse mobile menu after a link is tapped
  const navMenu = document.getElementById("navMenu");
  if (navMenu) {
    navMenu.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => {
        if (navMenu.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
      })
    );
  }

  const backToTop = document.querySelector(".back-to-top");
  const onScroll = () => backToTop && backToTop.classList.toggle("show", window.scrollY > 500);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Reveal-on-scroll and animated counters
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10) || 0;
    const duration = 1600;
    const start = performance.now();
    const fmt = new Intl.NumberFormat("hi-IN");
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = fmt.format(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          if (el.classList.contains("counter")) animateCounter(el);
          else el.classList.add("visible");
          io.unobserve(el);
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal, .counter").forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
    document.querySelectorAll(".counter").forEach((el) => (el.textContent = el.dataset.target));
  }

  // Gallery filter
  const filterBtns = document.querySelectorAll(".btn-filter");
  const items = document.querySelectorAll(".gallery-item");
  filterBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      items.forEach((it) => it.classList.toggle("hidden", f !== "all" && it.dataset.cat !== f));
    })
  );

  // Lightbox
  const lightboxEl = document.getElementById("lightbox");
  if (lightboxEl) {
    const modal = bootstrap.Modal.getOrCreateInstance(lightboxEl);
    const img = document.getElementById("lightboxImg");
    const caption = document.getElementById("lightboxCaption");
    let visibleLinks = [];
    let index = 0;

    const show = (i) => {
      index = (i + visibleLinks.length) % visibleLinks.length;
      const link = visibleLinks[index];
      img.src = link.getAttribute("href");
      img.alt = link.dataset.caption || "";
      caption.textContent = link.dataset.caption || "";
    };

    document.querySelectorAll(".gallery-link").forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        visibleLinks = [...document.querySelectorAll(".gallery-item:not(.hidden) .gallery-link")];
        show(visibleLinks.indexOf(link));
        modal.show();
      })
    );
    lightboxEl.querySelector(".prev").addEventListener("click", () => show(index - 1));
    lightboxEl.querySelector(".next").addEventListener("click", () => show(index + 1));
    lightboxEl.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
    });
  }

  // Copy UPI ID
  const toastEl = document.getElementById("copyToast");
  document.querySelectorAll(".copy-btn").forEach((btn) =>
    btn.addEventListener("click", async () => {
      const input = document.querySelector(btn.dataset.copy);
      if (!input) return;
      try {
        await navigator.clipboard.writeText(input.value);
      } catch {
        input.select();
        document.execCommand("copy");
      }
      if (toastEl) bootstrap.Toast.getOrCreateInstance(toastEl).show();
    })
  );

  // Bootstrap form validation
  document.querySelectorAll(".needs-validation").forEach((form) =>
    form.addEventListener("submit", (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }
      form.classList.add("was-validated");
    })
  );
})();
