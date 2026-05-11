import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const revealSelectors = [
  ".section-title",
  ".premium-card",
  ".inner-hero",
  ".lead-form-visual",
  ".premium-form",
  ".hero-visual",
  ".hero-trust-row span",
  ".hero-floating-card",
  ".about-metrics div",
  ".contact-card",
  ".contact-map-card",
  ".dashboard-header",
  ".stat-card",
  ".dashboard-table-section",
  ".activity-panel",
  ".sidebar-feature",
];

function ScrollAnimations() {
  const location = useLocation();
  const progressRef = useRef(null);

  useEffect(() => {
    const progress = progressRef.current;

    const updateProgress = () => {
      if (!progress) return;

      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const width = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

      progress.style.transform = `scaleX(${width / 100})`;
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const elements = Array.from(
      document.querySelectorAll(revealSelectors.join(","))
    );

    elements.forEach((element, index) => {
      element.classList.remove("is-visible");
      element.classList.add("scroll-reveal");
      element.style.setProperty("--reveal-delay", `${Math.min(index % 8, 7) * 70}ms`);
    });

    if (prefersReducedMotion) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.14,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [location.pathname]);

  return <div className="scroll-progress" ref={progressRef} aria-hidden="true" />;
}

export default ScrollAnimations;
