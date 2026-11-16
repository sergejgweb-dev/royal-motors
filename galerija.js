const gallery = document.querySelector(".vehicle-gallery");
const frame = gallery.querySelector(".gallery-frame");
const photo = frame.querySelector("img");
const views = gallery.querySelectorAll("[data-view]");

for (const view of views) {
  view.addEventListener("click", () => {
    for (const option of views) {
      option.setAttribute("aria-pressed", String(option === view));
    }

    frame.dataset.view = view.dataset.view;
    photo.alt = `${photo.dataset.model} – ${view.textContent.trim().toLowerCase()}`;
  });
}
