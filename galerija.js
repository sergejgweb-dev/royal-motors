const gallery = document.querySelector(".vehicle-gallery");
const photo = gallery.querySelector(".gallery-frame img");
const credit = gallery.querySelector(".photo-credit a");
const options = gallery.querySelectorAll(".gallery-options button");

for (const option of options) {
  option.addEventListener("click", () => {
    for (const button of options) {
      button.setAttribute("aria-pressed", String(button === option));
    }

    photo.src = option.querySelector("img").src;
    photo.alt = `${photo.dataset.model} – ${option.getAttribute("aria-label").toLowerCase()}`;
    credit.href = option.dataset.source;
  });
}

const viewer = document.querySelector(".gallery-viewer");
const viewerImage = viewer.querySelector(".viewer-image");
const viewerCount = viewer.querySelector(".viewer-count");
const photos = Array.from(options);
let active = 0;
let touchStart;

function showPhoto(index) {
  active = (index + photos.length) % photos.length;
  viewerImage.src = photos[active].querySelector("img").src;
  viewerImage.alt = `${photo.dataset.model} – fotografija ${active + 1}`;
  viewerCount.textContent = `${active + 1} / ${photos.length}`;
}

gallery.querySelector(".gallery-frame").addEventListener("click", () => {
  showPhoto(photos.findIndex((button) => button.getAttribute("aria-pressed") === "true"));
  viewer.showModal();
});
viewer.querySelector(".viewer-close").addEventListener("click", () => viewer.close());
viewer.querySelector(".viewer-prev").addEventListener("click", () => showPhoto(active - 1));
viewer.querySelector(".viewer-next").addEventListener("click", () => showPhoto(active + 1));
viewer.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") showPhoto(active - 1);
  if (event.key === "ArrowRight") showPhoto(active + 1);
});
viewerImage.addEventListener("touchstart", (event) => {
  touchStart = event.touches.length === 1 ? event.touches[0] : undefined;
}, { passive: true });
viewerImage.addEventListener("touchcancel", () => { touchStart = undefined; });
viewerImage.addEventListener("touchend", (event) => {
  if (!touchStart) return;
  const end = event.changedTouches[0];
  const horizontal = end.clientX - touchStart.clientX;
  const vertical = end.clientY - touchStart.clientY;
  touchStart = undefined;
  if (Math.abs(horizontal) > 45 && Math.abs(horizontal) > Math.abs(vertical)) {
    showPhoto(active + (horizontal < 0 ? 1 : -1));
  }
}, { passive: true });
