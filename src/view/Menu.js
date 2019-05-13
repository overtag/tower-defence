import * as PIXI from 'pixi.js';
import { config } from '../config.js';
import { Button } from './Button';
import { eventEmitter, EVENTS } from '../events/EventEmitter';

export class Menu extends PIXI.Container {
  constructor() {
    super();

    const bg = new PIXI.Graphics();
    bg.beginFill(0x3333cc);
    bg.drawRect(0, 0, config.defaultWidth, config.defaultHeight);
    bg.endFill();
    this.addChild(bg);

    const grT = this.createRectangleButton().generateCanvasTexture();
    this.playBtn = new Button(grT, grT, grT);
    this.playBtn.position.set(10, 10);
    this.addChild(this.playBtn);

    this.playBtn.onclick = () => {
      eventEmitter.emit(EVENTS.PLAY_GAME, null);
    };
  }

  createRectangle() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xffffff);
    graphics.drawRect(0, 0, 32, 32);
    graphics.endFill();

    return graphics;
  }

  createRectangleButton() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xffffff);
    graphics.drawRect(0, 0, 240, 80);
    graphics.endFill();

    return graphics;
  }
}
