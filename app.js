class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onPause = callbacks.onPause;
      this.onResume = callbacks.onResume;
      this.onComplete = callbacks.onComplete;
    }

    this.startButton.addEventListener('click', this.start);
    this.pauseButton.addEventListener('click', this.pause);
  }

  start = () => {
    if (this.onStart) {
      this.onStart();
    }
    this.tick();
    this.interval = setInterval(this.tick, 1000);
  };

  pause = () => {
    if (this.pauseButton.innerText === 'Pause') {
      this.stopInterval();
      if (this.onPause) {
        this.onPause();
      }
      this.pauseButton.setAttribute('id', 'resume');
      this.pauseButton.innerText = 'Resume';
    } else {
      this.resume();
    }
  };

  resume = () => {
    if (this.onResume) {
      this.onResume();
    }
    this.pauseButton.setAttribute('id', 'pause');
    this.pauseButton.innerText = 'Pause';
    this.interval = setInterval(this.tick, 1000);
  };

  stopInterval = () => {
    clearInterval(this.interval);
  };

  tick = () => {
    if (this.timeRemaining <= 0) {
      this.stopInterval();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      this.timeRemaining = this.timeRemaining - 1;
      if (this.onTick) {
        this.onTick();
      }
    }
  };

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {
    this.durationInput.value = time;
  }
}

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
});
