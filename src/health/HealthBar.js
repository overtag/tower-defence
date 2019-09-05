import * as PIXI from 'pixi.js';
import { config } from '../config';
import { eventEmitter, EVENTS } from '../events/EventEmitter';

export class HealthBar extends PIXI.Container {
  constructor() {
    super();

    this.cache = [];
  }

  init(health) {
    this.updateBar(health);
  }

  damage(health) {
    this.updateBar(health);
  }

  updateBar(health) {
    this.cache.forEach(sprite => {
      sprite.visible = false;
    });
    for (let i = 0; i < health; i++) {
      if (this.cache.length <= i) {
        const hearth = new PIXI.Sprite(PIXI.Texture.fromImage('Life_mc0000'));
        hearth.rotation = Math.PI / 2;
        hearth.anchor.set(0.5, 0.5);
        hearth.scale.set(10, 10);
        this.addChild(hearth);
        this.cache.push(hearth);
      } else {
        this.cache[i].visible = true;
      }
    }
  }

  createRectangle() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xffcc00);
    graphics.drawRect(0, 0, 5, 5);
    graphics.endFill();

    return graphics;
  }
}
