import * as PIXI from 'pixi.js';
import { config } from '../config.js';
import { Game } from './Game.js';
import { BotPanel } from './BotPanel.js';

export class Core extends PIXI.Container {
  constructor() {
    super();

    const bg = new PIXI.Graphics();
    bg.beginFill(0x235a3b);
    bg.drawRect(0, 0, config.defaultWidth, config.defaultHeight);
    bg.endFill();
    this.addChild(bg);

    const game = new Game();
    this.addChild(game);

    const botPanel = new BotPanel(game);
    botPanel.position.set(0, config.defaultHeight - botPanel.height);
    this.addChild(botPanel);
  }

  createRectangle() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xffffff);
    graphics.drawRect(0, 0, 32, 32);
    graphics.endFill();

    return graphics;
  }
}
