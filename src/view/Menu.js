import *as PIXI from 'pixi.js';
import {config} from '../config.js';
import {eventEmitter, EVENTS} from '../events/EventEmitter';
import {Button} from './Button.js';

export class Menu extends PIXI.Container {
	constructor() {
		super();

        this.bg =  this.createRectangle(1136, 640, '0xffcc00');
        this.addChild(this.bg)

        const normal = this.createRectangle(100, 40, '0x789a4c').generateCanvasTexture();
        const over = this.createRectangle(100, 40, '0x8aaa61').generateCanvasTexture();
        const down = this.createRectangle(100, 40, '0x364424').generateCanvasTexture();

        this.gameBtn = new Button(normal, over, down);
        this.gameBtn.position.set(1000, 50);
        this.gameBtn.onclick = () => {
            console.log("On CLICK")
            this.visible = false;
            eventEmitter.emit(EVENTS.START_GAME, {});
        };


        this.addChild(this.gameBtn);
        this.exitBtn = new Button(normal, over, down);
        this.exitBtn.position.set(1000, 100)
        this.addChild(this.exitBtn);
        this.menuBtn = new Button(normal, over, down);
        this.menuBtn.position.set(1000, 150)
        this.addChild(this.menuBtn);
	}

	createRectangle(w, h, color = 0xffffff) {
		const graphics = new PIXI.Graphics();
		graphics.beginFill(color);
		graphics.drawRect(0, 0, w, h);
		graphics.endFill();
	
		return graphics;
	  }
}	