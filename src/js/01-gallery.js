// Add imports above this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';
// Change code below this line

// console.log(galleryItems);
const galleryRef = document.querySelector('.gallery');

/////////////////////      Old version with map       ///////////
// const template = ({
//   description,
//   original,
//   preview,
// }) => `<a class="gallery__item" href=${original}>
//   <img class="gallery__image" src=${preview} alt='${description}' />
// </a>`;
// const galleryTemplate = galleryItems
//   .map(galleryItem => template(galleryItem))
//   .join('');

// galleryRef.insertAdjacentHTML('beforeend', galleryTemplate);

////////////////////      Played around with Handlebars     ////////////

const Handlebars = require('handlebars');
const template = Handlebars.compile(`{{#each this}}
    <a class="gallery__item" href={{this.original}}>
     <img class="gallery__image" src={{this.preview}} alt='{{this.description}}' />
    </a>
      {{/each}}`);
console.log(template(galleryItems));

galleryRef.insertAdjacentHTML('beforeend', template(galleryItems));

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
