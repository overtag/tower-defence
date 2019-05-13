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
    super();
    this.universe = universe;
    this.curr = null;

    this.ticks = 0;
  }

  newWave(currLevel) {
    if (currLevel.length >= 0) {
      this.wave = currLevel.unshift();
    } else {
      // end level
    }
  }

  update() {
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
