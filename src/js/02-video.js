import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const CURRENT_TIME = 'videoplayer-current-time';

function currentVideoTimeCollect(data) {
  console.log(data);
  localStorage.setItem(CURRENT_TIME, JSON.stringify(data));
}

player.on('timeupdate', throttle(currentVideoTimeCollect, 1000));

setSavedTime();

function setSavedTime() {
  const savedCurrentTime = localStorage.getItem(CURRENT_TIME);

  if (savedCurrentTime) {
    try {
      const { seconds } = JSON.parse(savedCurrentTime);
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
    } catch (error) {
      console.log(error);
    }
  }
}
