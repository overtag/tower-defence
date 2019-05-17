import * as PIXI from 'pixi.js';
import { config } from '../config.js';
import { Game } from './Game.js';
import { Menu } from './Menu.js';
import { BotPanel } from './BotPanel.js';
import { eventEmitter, EVENTS } from '../events/EventEmitter';

export class Core extends PIXI.Container {
  constructor() {
    super();

    const bg = new PIXI.Graphics();
    bg.beginFill(0x235a3b);
    bg.drawRect(0, 0, config.defaultWidth, config.defaultHeight);
    bg.endFill();
    this.addChild(bg);

    this.game = new Game();
    this.game.visible = false;
    this.addChild(this.game);

    this.botPanel = new BotPanel(this.game);
    this.botPanel.visible = false;
    this.botPanel.position.set(0, config.defaultHeight - this.botPanel.height);
    this.addChild(this.botPanel);

    this.menu = new Menu();
    this.addChild(this.menu);
    eventEmitter.on(EVENTS.PLAY_GAME, this.playGame, this);
  }

  playGame() {
    this.botPanel.visible = true;
    this.botPanel.init();
    this.game.visible = true;
    this.game.play();

    this.menu.visible = false;
  }

  createRectangle() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xffffff);
    graphics.drawRect(0, 0, 32, 32);
    graphics.endFill();

    return graphics;
  }
}
