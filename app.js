const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const resumeButton = document.querySelector('#resume');
const circle = document.querySelector('#circle');
const audio = document.querySelector('audio');

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);

let duration;
const timer = new Timer(durationInput, startButton, pauseButton, {
  onStart(totalDuration) {
    duration = totalDuration;
  },
  onTick(timeRemaining) {
    let strokeDashOffset = (perimeter * timeRemaining) / duration - perimeter;
    circle.setAttribute('stroke-dashoffset', strokeDashOffset);
    // console.log('timeRemaining: ', timeRemaining);

    if (timeRemaining <= 5 && timeRemaining > 0) {
      circle.setAttribute('stroke-width', '10');
      circle.setAttribute('stroke', '#EA3C53');
    } else if (timeRemaining == 0) {
      circle.setAttribute('stroke-width', '2');
      circle.setAttribute('stroke', 'lightgray');
    } else {
      circle.setAttribute('stroke-width', '10');
      circle.setAttribute('stroke', '#8785fd');
    }
  },
  onPause() {},
  onResume() {},
  onComplete() {
    audio.play();
    //audio.loop = 'false';
    alert('Time is up!');
  },
  onCancel() {
    circle.setAttribute('stroke-dashoffset', 0);
  },
});
