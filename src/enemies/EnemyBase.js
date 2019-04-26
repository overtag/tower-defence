import * as PIXI from 'pixi.js';
import { config } from '../config';
import { eventEmitter, EVENTS } from '../events/EventEmitter';

export class EnemyBase extends PIXI.Container {
  constructor() {
    super();

    this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage('enemy'));
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.rotation = Math.PI / 2;
    this.addChild(this.sprite);
  }

  update() {
    this.y += 0.1;
  }

  createRectangle() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xffffff);
    graphics.drawRect(0, 0, 32, 32);
    graphics.endFill();

    return graphics;
  }
}
