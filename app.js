const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const resumeButton = document.querySelector('#resume');

const timer = new Timer(durationInput, startButton, pauseButton, {
  onStart() {
    console.log('Timer started');
  },
  onTick() {
    console.log('Tick');
  },
  onPause() {
    console.log('Paused');
  },
  onResume() {
    console.log('Resuming');
  },
  onComplete() {
    console.log('Timer complete');
  },
  onCancel() {
    console.log('Timer cancelled');
  },
});
