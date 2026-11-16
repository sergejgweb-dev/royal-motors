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
