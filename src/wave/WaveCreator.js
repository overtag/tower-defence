import * as PIXI from 'pixi.js';

const level = [
  {
<<<<<<< HEAD
=======
    types: ['ZJester_mc', 'Patch_mc'],
    count: 6,
    interval: 120,
  },
  {
>>>>>>> 9d587e11573b03d343068160cd3dc761acffa0b0
    types: ['Patch_mc'],
    count: 6,
    interval: 120,
  },
];

export class WaveCreator {
  constructor(universe) {
    this.universe = universe;
    this.wave = null;

    this.isPlay = false;
    this.ticks = 0;
  }

  play() {
    this.isPlay = true;
    this.newWave(level);
  }

  stop() {
    this.isPlay = false;
  }

  newWave(currLevel) {
    if (currLevel.length >= 0) {
      this.wave = currLevel.shift();
    } else {
      // end level
    }
  }

  update() {
    if (!this.isPlay || !this.wave) return;
    this.ticks++;

    if (this.ticks >= this.wave.interval) {
      this.universe.createEnemy(this.wave.types);
      this.ticks = 0;
      this.wave.count -= 1;
    }

    if (this.wave.count <= 0) {
      this.newWave(level);
    }
  }
}
