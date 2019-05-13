import * as PIXI from 'pixi.js';
import { config } from '../config';
import { eventEmitter, EVENTS } from '../events/EventEmitter';
import { EnemyBase } from '../enemies/EnemyBase';
import { Trap } from '../traps/Trap';

const enemies = [];
const traps = [];

let tick = 0;

export class Game extends PIXI.Container {
  constructor() {
    super();

    this.tiker = new PIXI.ticker.Ticker();
    this.tiker.add(this.enterFrame.bind(this));
    PIXI.ticker.Ticker.FPS = 60;
    this.tiker.start();
  }

  createTrap() {
    const trap = new Trap(enemies);
    this.addChild(trap);
    traps.push(trap);

    return trap;
  }

  enterFrame() {
    tick++;
    if (tick === 120) {
      const enemy = new EnemyBase();
      enemy.x = Math.random() * (config.defaultWidth - enemy.width);
      enemies.push(enemy);
      this.addChildAt(enemy, 0);
      console.log('enemy', enemy.x, enemy.y);
      // tick = 0;
    }

    traps.forEach(function(trap) {
      trap.update(enemies);
    });

    enemies.forEach(function(enemy) {
      enemy.update();
    });
  }
}
