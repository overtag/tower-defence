import * as PIXI from 'pixi.js';
import { config } from '../config';
import { eventEmitter, EVENTS } from '../events/EventEmitter';
import { EnemyBase } from '../enemies/EnemyBase';

const enemies = [];
let tick = 0;

export class Game extends PIXI.Container {
  constructor() {
    super();

    this.tiker = new PIXI.ticker.Ticker();
    this.tiker.add(this.enterFrame.bind(this));
    PIXI.ticker.Ticker.FPS = 60;
    this.tiker.start();
  }

  enterFrame() {
    tick++;
    if (tick === 120) {
      const enemy = new EnemyBase();
      enemy.x = Math.random() * (config.defaultWidth - enemy.width);
      enemies.push(enemy);
      this.addChildAt(enemy, 0);
      tick = 0;
    }

    enemies.forEach(function(enemy) {
      enemy.update();
    });
  }
}
