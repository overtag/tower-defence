import * as PIXI from 'pixi.js';

const level = [
  {
    types: ['zombie'],
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
    console.log(currLevel.length);
    if (currLevel.length >= 0) {
      this.wave = currLevel.shift();
    } else {
      // end level
    }
    console.log('WAVE', this.wave);
  }

  update() {
    if (!this.isPlay || !this.wave) return;
    this.ticks++;
    console.log(this.ticks, this.wave.interval);
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
