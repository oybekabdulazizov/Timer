const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const resumeButton = document.querySelector('#resume');
const circle = document.querySelector('#circle');

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
    console.log('timeRemaining: ', timeRemaining);

    if (timeRemaining <= 5) {
      circle.setAttribute('stroke', '#EA3C53');
    } else {
      circle.setAttribute('stroke', '#8785fd');
    }
  },
  onPause() {},
  onResume() {},
  onComplete() {},
  onCancel() {
    circle.setAttribute('stroke-dashoffset', 0);
  },
});
