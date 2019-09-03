import * as PIXI from 'pixi.js';
import { config } from '../config';
import { eventEmitter, EVENTS } from '../events/EventEmitter';
import { Button } from './Button';
import { Trap } from '../traps/Trap';

export class BotPanel extends PIXI.Container {
  constructor(universe) {
    super();

    this.universe = universe;
    this.isDrag = false;

    const bg = new PIXI.Graphics();
    bg.beginFill(0xffcc00);
    bg.drawRect(0, 0, 640, 100);
    bg.endFill();
    this.addChild(bg); //

    const grT = this.createRectangle().generateCanvasTexture();
    this.trapBtnOne = new Button(grT, grT, grT);
    this.trapBtnOne.position.set(10, 10);
    this.addChild(this.trapBtnOne);

    this.trapBtnOne.onclick = () => {
      this.startDrag(1);
    };

    this.trapBtnTwo = new Button(grT, grT, grT);
    this.trapBtnTwo.position.set(110, 10);
    this.addChild(this.trapBtnTwo);

    this.trapBtnThree = new Button(grT, grT, grT);
    this.trapBtnThree.position.set(210, 10);
    this.addChild(this.trapBtnThree);

    this.healtTf = new PIXI.Text('1', config.panel_text);
    this.healtTf.position.set(500, 20);
    this.addChild(this.healtTf);

    this.coinsTf = new PIXI.Text('120', config.panel_text);
    this.coinsTf.position.set(500, 60);
    this.addChild(this.coinsTf);

    eventEmitter.on(EVENTS.COME_ENEMY, this.updateHealth, this);
  }

  init() {
    this.healtTf.text = 3;
    this.coinsTf.text = 100;
  }

  updateHealth() {
    this.healtTf.text = +this.healtTf.text - 1;
    if (+this.healtTf.text <= 0) {
      console.log('Game Over');
    }
  }

  createRectangle() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xffffff);
    graphics.drawRect(0, 0, 80, 80);
    graphics.endFill();

    return graphics;
  }

  startDrag(type) {
    if (type === 1 && ++this.coinsTf.text - 3 >= 0) {
      this.coinsTf.text = ++this.coinsTf.text - 3;
    }

    if (this.isDrag) return;

    this.targetSprite = this.universe.createTrap(); // new PIXI.Sprite(PIXI.Texture.fromImage('Rake_mc0000'));
    this.targetSprite.scale.set(2);
    this.universe.addChild(this.targetSprite);
    this.targetSprite.click = this.endDrag.bind(this);
    this.targetSprite.mousemove = this.dragAndDrop.bind(this);
    this.targetSprite.mouseupoutside = this.endDrag.bind(this);
    this.targetSprite.touchmove = this.dragAndDrop.bind(this);
    this.targetSprite.touchend = this.endDrag.bind(this);
    this.targetSprite.touchcancel = this.endDrag.bind(this);
    this.targetSprite.touchendoutside = this.endDrag.bind(this);
    this.targetSprite.interactive = true;
    this.isDrag = true;
  }

  dragAndDrop(evt) {
    if (!this.isDrag) return;
    const point = this.universe.toLocal(evt.data.global);
    //--console.log("point", point);
    this.targetSprite.x = point.x;
    this.targetSprite.y = point.y;
  }

  endDrag() {
    this.isDrag = false;
    this.targetSprite.enableTrap();
    //this.targetSprite.visible = false;
    eventEmitter.emit(EVENTS.SHOW_BUILD_GRID, {});
  }
}
