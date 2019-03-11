import *as PIXI from 'pixi.js';
import {config} from '../config.js';
import {eventEmitter, EVENTS} from '../events/EventEmitter';
import {Button} from './Button.js';
import {Game} from './Game';
import { GunTower } from './towers/GunTower.js';

export class TowerPanel extends PIXI.Container {
	constructor(universe) {
		super();

        this.universe = universe;
        const normal = this.createRectangle(100, 40, '0x789a4c').generateCanvasTexture();
        const over = this.createRectangle(100, 40, '0x8aaa61').generateCanvasTexture();
        const down = this.createRectangle(100, 40, '0x364424').generateCanvasTexture();

        this.gameBtn = new Button(normal, over, down);
        this.gameBtn.position.set(0, 0);
        this.gameBtn.onclick = () => {
           
           
            eventEmitter.emit(EVENTS.SHOW_BUILD_GRID, {});
            this.startDrag()
        };


        this.addChild(this.gameBtn);

  }
  
  startDrag() {
    if ( this.isDrag ) return;
    this.targetSprite = new PIXI.Sprite(PIXI.Texture.fromImage("tower"));
    this.universe.addChild(this.targetSprite)
    this.targetSprite.click = this.endDrag.bind(this);
    this.targetSprite.mousemove = this.dragAndDrop.bind(this);
    this.targetSprite.mouseupoutside = this.endDrag.bind(this);
    this.targetSprite.touchmove = this.dragAndDrop.bind(this);
    this.targetSprite.touchend = this.endDrag.bind(this);
    this.targetSprite.touchcancel  = this.endDrag.bind(this);
    this.targetSprite.touchendoutside  = this.endDrag.bind(this);
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
    this.targetSprite.visible = false;
    eventEmitter.emit(EVENTS.SHOW_BUILD_GRID, {});

    const tower1 = new GunTower(this.universe);;
    tower1.init(Game.toTile(this.targetSprite.x), Game.toTile(this.targetSprite.y));
  }

	createRectangle(w, h, color = 0xffffff) {
		const graphics = new PIXI.Graphics();
		graphics.beginFill(color);
		graphics.drawRect(0, 0, w, h);
		graphics.endFill();
	
		return graphics;
	}
}	