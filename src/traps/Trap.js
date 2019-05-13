import * as PIXI from 'pixi.js';
import { config } from '../config';
import { eventEmitter, EVENTS } from '../events/EventEmitter';
import { Amath } from '../utils/Amath';

const STATE_DISABLED = false;
const STATE_ENABLED = true;

export class Trap extends PIXI.Container {
  constructor() {
    super();

    this.state = STATE_DISABLED;

    this.damage = 1;
    this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage('Rake_mc0000'));
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.rotation = Math.PI / 2;
    this.addChild(this.sprite);
    this.addChild(this.createRectangle());
  }

  init() {
    this.state = STATE_DISABLED;
  }

  enableTrap() {
    this.state = STATE_ENABLED;
  }

  createRectangle() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xffcc00);
    graphics.drawRect(0, 0, 5, 5);
    graphics.endFill();

    return graphics;
  }

  update(enemies) {
    switch (this.state) {
      case STATE_DISABLED:
        break;

      case STATE_ENABLED:
        enemies.forEach(enemy => {
          this.collision(enemy);
        });
        break;
    }
  }

  collision(enemy) {
    if (Amath.hitTestRectangle(this, enemy)) {
      enemy.damage(this.damage);
      eventEmitter.emit(EVENTS.REMOVE_TRAP, this);
      console.log('СТОЛКНУЛСЯ!!');
    } else {
      // console.log('----');
    }
  }
}
