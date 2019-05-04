import * as PIXI from 'pixi.js';
import { config } from '../config';
import { eventEmitter, EVENTS } from '../events/EventEmitter';

export class Trap extends PIXI.Container {
  constructor() {
    super();

    this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage('Rake_mc0000'));
    this.sprite.anchor.set(0.5, 0.5);
    //tthis.sprite.rotation = Math.PI / 2;
    this.addChild(this.sprite);
  }

  createRectangle() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xffffff);
    graphics.drawRect(0, 0, 32, 32);
    graphics.endFill();

    return graphics;
  }
}
