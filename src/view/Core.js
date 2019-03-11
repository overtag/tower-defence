import *as PIXI from 'pixi.js';
import {config} from '../config.js';
import {Game} from './Game.js';
import { Menu } from './Menu.js';

export class Core extends PIXI.Container {
	constructor() {
		super();

		this.game = new Game();
		this.addChild(this.game);

		this.interactive = true;
	
		const menu = new Menu();
		this.addChild(menu);
		//this.addChild(this.createRectangle())
		//this.onclick = this.addEnemy.bind(this);
		//this.touchend = this.addEnemy.bind(this);
	}

	addEnemy() {
		//console.log("addEnemy")
		if(!this.game.isStartGame) return;
		this.game.newEnemy();
	}

	createRectangle() {
		const graphics = new PIXI.Graphics();
		graphics.beginFill(0xFFFFFF);
		graphics.drawRect(0, 0, 32, 32);
		graphics.endFill();
	
		return graphics;
	  }
}	