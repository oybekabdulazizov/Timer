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
      this.onCancel = callbacks.onCancel;
    }

    this.startButton.addEventListener('click', this.start);
    this.pauseButton.addEventListener('click', this.pause);
  }

  start = () => {
    if (this.startButton.innerText === 'Start') {
      if (this.onStart) {
        this.onStart();
      }
      this.tick();
      this.interval = setInterval(this.tick, 1000);
      this.startButton.id = 'cancel';
      this.startButton.innerText = 'Cancel';
    } else {
      this.cancel();
    }
  };

  cancel = () => {
    if (this.onCancel) {
      this.onCancel();
    }
    this.stopInterval();
    this.durationInput.value = 0;
    this.startButton.setAttribute('id', 'start');
    this.startButton.innerText = 'Start';
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
