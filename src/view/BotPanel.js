import * as PIXI from 'pixi.js';
import { config } from '../config';
import { eventEmitter, EVENTS } from '../events/EventEmitter';
import { Button } from './Button';

export class BotPanel extends PIXI.Container {
  constructor(universe) {
    super();

    this.universe = universe;
    this.isDrag = false;

    const bg = new PIXI.Graphics();
    bg.beginFill(0xffcc00);
    bg.drawRect(0, 0, 640, 100);
    bg.endFill();
    this.addChild(bg);

    const grT = this.createRectangle().generateCanvasTexture();
    this.trapBtnOne = new Button(grT, grT, grT);
    this.trapBtnOne.position.set(10, 10);
    this.addChild(this.trapBtnOne);

    this.trapBtnOne.onclick = () => {
      this.startDrag();
    };

    this.trapBtnTwo = new Button(grT, grT, grT);
    this.trapBtnTwo.position.set(110, 10);
    this.addChild(this.trapBtnTwo);

    this.trapBtnThree = new Button(grT, grT, grT);
    this.trapBtnThree.position.set(210, 10);
    this.addChild(this.trapBtnThree);
  }

  createRectangle() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xffffff);
    graphics.drawRect(0, 0, 80, 80);
    graphics.endFill();

    return graphics;
  }

  startDrag() {
    if (this.isDrag) return;
    console.log('startDrag');
    this.targetSprite = new PIXI.Sprite(PIXI.Texture.fromImage('tower'));
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
    //this.targetSprite.visible = false;
    eventEmitter.emit(EVENTS.SHOW_BUILD_GRID, {});
  }
}
