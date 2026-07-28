(() => {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const navigation = document.querySelector("[data-navigation]");
  const navLinks = [...document.querySelectorAll(".primary-nav a[href^='#']")];
  const year = document.querySelector("[data-current-year]");

  if (year) {
    year.textContent = new Date().getFullYear().toString();
  }

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const closeNavigation = () => {
    if (!toggle || !navigation) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.querySelector(".sr-only").textContent = "Open navigation";
    navigation.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  };

  toggle?.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.querySelector(".sr-only").textContent = isOpen ? "Open navigation" : "Close navigation";
    navigation?.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("nav-open", !isOpen);
  });

  navigation?.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeNavigation();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();
  });

  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          for (const link of navLinks) {
            const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
            if (isCurrent) {
              link.setAttribute("aria-current", "true");
            } else {
              link.removeAttribute("aria-current");
            }
          }
        }
      },
      { rootMargin: "-25% 0px -65%", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  const carousel = document.querySelector("[data-project-carousel]");
  const slides = [...document.querySelectorAll("[data-project-slide]")];
  const previous = document.querySelector("[data-project-previous]");
  const next = document.querySelector("[data-project-next]");
  const current = document.querySelector("[data-project-current]");
  const progress = document.querySelector("[data-project-progress]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let activeIndex = 0;
  let rotationTimer;

  const showProject = (requestedIndex, shouldFocus = false) => {
    if (!slides.length) return;
    activeIndex = (requestedIndex + slides.length) % slides.length;

    slides.forEach((slide, index) => {
      const isActive = index === activeIndex;
      slide.hidden = !isActive;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    if (current) {
      const activeSlide = slides[activeIndex];
      const start = String(activeSlide.dataset.projectStart).padStart(2, "0");
      const end = String(activeSlide.dataset.projectEnd).padStart(2, "0");
      current.textContent = start === end ? start : `${start}–${end}`;
    }

    if (progress) {
      progress.style.setProperty(
        "--project-progress",
        `${((activeIndex + 1) / slides.length) * 100}%`
      );
    }

    if (shouldFocus) {
      slides[activeIndex].querySelector("a")?.focus({ preventScroll: true });
    }
  };

  const stopRotation = () => {
    window.clearInterval(rotationTimer);
  };

  const startRotation = () => {
    stopRotation();
    if (!carousel || reduceMotion.matches || document.hidden) return;
    rotationTimer = window.setInterval(() => showProject(activeIndex + 1), 9000);
  };

  if (carousel && slides.length > 1) {
    previous?.addEventListener("click", () => {
      showProject(activeIndex - 1);
      startRotation();
    });

    next?.addEventListener("click", () => {
      showProject(activeIndex + 1);
      startRotation();
    });

    carousel.addEventListener("pointerenter", stopRotation);
    carousel.addEventListener("pointerleave", startRotation);
    carousel.addEventListener("focusin", stopRotation);
    carousel.addEventListener("focusout", (event) => {
      if (!carousel.contains(event.relatedTarget)) startRotation();
    });
    document.addEventListener("visibilitychange", startRotation);
    reduceMotion.addEventListener("change", startRotation);

    showProject(0);
    startRotation();
  }
})();
