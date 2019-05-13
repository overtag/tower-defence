import * as PIXI from 'pixi.js';
import { config } from '../config';
import { eventEmitter, EVENTS } from '../events/EventEmitter';
import { Amath } from '../utils/Amath';

export class Trap extends PIXI.Container {
  constructor() {
    super();

    this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage('Rake_mc0000'));
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.rotation = Math.PI / 2;
    this.addChild(this.sprite);
    this.addChild(this.createRectangle());
  }

  createRectangle() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xffcc00);
    graphics.drawRect(0, 0, 5, 5);
    graphics.endFill();

    return graphics;
  }

  update(enemies) {
    enemies.forEach(enemy => {
      this.collision(enemy);
    });
  }

  collision(enemy) {
    //console.log(enemy.y, this.y);
    if (Amath.hitTestRectangle(this, enemy)) {
      console.log('СТОЛКНУЛСЯ!!');
    } else {
      //console.log('----');
    }
  }
}
