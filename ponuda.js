const form = document.querySelector("#filter");
const brand = document.querySelector("#marka");
const type = document.querySelector("#tip");
const cars = document.querySelectorAll(".cards article");
const status = document.querySelector("#rezultati");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let count = 0;

  for (const car of cars) {
    const matchesBrand = !brand.value || car.dataset.marka === brand.value;
    const matchesType = !type.value || car.dataset.tip === type.value;
    car.hidden = !(matchesBrand && matchesType);
    count += Number(!car.hidden);
  }

  status.textContent = count
    ? `Pronađeno vozila: ${count}`
    : "Nema vozila koja odgovaraju odabranim filterima.";
});

const stats = document.querySelector(".stats-list");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (stats && "IntersectionObserver" in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    observer.disconnect();

    const counters = Array.from(stats.querySelectorAll("[data-count]"), (element) => ({
      element,
      target: Number(element.dataset.count),
    }));
    const start = performance.now();
    const duration = 1100;

    function updateCounts(now) {
      const progress = reducedMotion.matches ? 1 : Math.min((now - start) / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;

      for (const { element, target } of counters) {
        element.textContent = Math.floor(target * easedProgress);
      }

      if (progress < 1) requestAnimationFrame(updateCounts);
    }

    requestAnimationFrame(updateCounts);
  }, { threshold: 0.3 });

  observer.observe(stats);
}
