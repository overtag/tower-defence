import * as PIXI from 'pixi.js';
import { config } from '../config';
import { eventEmitter, EVENTS } from '../events/EventEmitter';
import { Jester } from '../enemies/Jester';
import { Trap } from '../traps/Trap';
import { WaveCreator } from '../wave/WaveCreator';
import { Names } from '../enemies/Names'; 
import { EnemyBase } from '../enemies/EnemyBase';

const traps = [];
const enemies = [];
const cacheEnemies = [];
const cacheTraps = [];

let tick = 0;

export class Game extends PIXI.Container {
  constructor() {
    super();

    this.tiker = new PIXI.ticker.Ticker();
    this.tiker.add(this.enterFrame.bind(this));
    PIXI.ticker.Ticker.FPS = 60;
    this.tiker.stop();

    this.waveCreator = new WaveCreator(this);

    eventEmitter.on(EVENTS.DEAD_ENEMY, this.removeEnemy, this);
    eventEmitter.on(EVENTS.REMOVE_TRAP, this.removeTrap, this);
  }

  createEnemy(type) {
    let enemt = null;
    switch (type) {
      case Names.Patch_mc.name:
        enemy = new EnemyBase()
        break;
      case Names.ZJester_mc.name: 
        enemy = new Jester(this); 
      break;
    }
    const enemy = new Jester(this);
    enemy.position.set(Math.random() * (config.defaultWidth - enemy.width), 0);
    enemy.init();
    enemies.push(enemy);
    this.addChildAt(enemy, 0);
  }

  play() {
    this.tiker.start();
    this.waveCreator.play();
  }

  removeTrap(trap) {
    this.removeChild(trap);
    traps.splice(traps.findIndex(_trap => _trap === trap), 1);
    cacheTraps.push(trap);
  }

  removeEnemy(enemy) {
    this.removeChild(enemy);
    enemies.splice(enemies.findIndex(_enemy => _enemy === enemy), 1);
    cacheEnemies.push(enemy);
  }

  createTrap() {
    const trap = new Trap(enemies);
    trap.init();
    this.addChild(trap);
    traps.push(trap);

    return trap;
  }

  enterFrame() {
    this.waveCreator.update();

    traps.forEach(function(trap) {
      trap.update(enemies);
    });

    enemies.forEach(function(enemy) {
      enemy.update();
    });
  }
}
