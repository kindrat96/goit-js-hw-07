import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryList = document.querySelector(".gallery");

function createMarkupItems(arr) {
  return arr
    .map(
      ({ preview, original, description }) => `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}">
  </a>
</li>`
    )
    .join("");
}
galleryList.insertAdjacentHTML("beforeend", createMarkupItems(galleryItems));

galleryList.addEventListener("click", onClickGallery);

function onClickGallery(event) {
  event.preventDefault();

  if (!event.target.classList.contains("gallery__image")) return;

  const instance = basicLightbox.create(
    `<img src="${event.target.dataset.source}">`,
    {
      onShow: () => document.addEventListener("keydown", handlerEscModal),
      onClose: () => document.removeEventListener("keydown", handlerEscModal),
    }
  );
  instance.show();

  function handlerEscModal(event) {
    if (event.key === "Escape") {
      instance.close();
    }
  }
}
