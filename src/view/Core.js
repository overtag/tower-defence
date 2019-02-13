import *as PIXI from 'pixi.js';
import {config} from '../config.js';
import {Game} from './Game.js';

// import {Core} from './view/Core.js';
// import {Controller} from './Controller.js';

export class Core extends PIXI.Container {
	constructor() {
		super();

		const game = new Game();
		this.addChild(game);

		this.interactive = true;
		onclick = () => {
			game.newEnemy();
		};

		//this.addChild(this.createRectangle())
	}

	createRectangle() {
		const graphics = new PIXI.Graphics();
		graphics.beginFill(0xFFFFFF);
		graphics.drawRect(0, 0, 32, 32);
		graphics.endFill();
	
		return graphics;
	  }
}	