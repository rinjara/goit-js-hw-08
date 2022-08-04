// HTML містить <iframe> з відео для Vimeo плеєра.
// Напиши скрипт, який буде зберігати поточний
// час відтворення відео у локальне сховище і,
// після перезавантаження сторінки, продовжувати
// відтворювати відео з цього часу.
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');

console.log(iframe);
const player = new Player(iframe);

console.log(player);

function currentVideoTimeCollect(data) {
  console.log(data);
  localStorage.setItem('videoplayer-current-time', JSON.stringify(data));
}

player.on('timeupdate', throttle(currentVideoTimeCollect, 1000));

const savedCurrentTime = localStorage.getItem('videoplayer-current-time');
const { duration, percent, seconds } = JSON.parse(savedCurrentTime);
console.log(seconds);

player
  .setCurrentTime(seconds)
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;

      default:
        break;
    }
  });
