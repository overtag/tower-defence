import *as PIXI from 'pixi.js';
import {config} from '../config';
import {PathFinder} from '../utils/PathFinder'
import {EnemySolder} from './enemies/EnemySolder';

const STATE_CELL_FREE = 0;
const STATE_CELL_BUSY = 1;

const listOfEnemies = [];
const listOfTowers = [];
const listOfBullets = [];

let tick = 0;

export class Game extends PIXI.Container {
  constructor() {
    super();
    
    this.delataTime = 0;
    this.lastTick = 0;

    this.mapCell = [];
    this.mapMask = [
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1]
    ];

    this.tiker =  new PIXI.ticker.Ticker();
    this.tiker.add(this.enterFrame.bind(this));
    PIXI.ticker.Ticker.FPS = 60;
    this.tiker.start();

    //const solder = new EnemySolder(this);
    //solder.init();
    this.makeDebugGrid();
    //this.addChild(this.createRectangle());

    this.pf = new PathFinder(this.mapMask);
  }

  newEnemy() {
    const solder = new EnemySolder(this);
    solder.init(0, 0, this.mapMask[0].length-1, this.mapMask.length-1);
  }

  enterFrame(time) {  
    tick++
    listOfEnemies.forEach((_enemy, index) => {
      console.log("ef", tick);
      if (tick >= 20) {
        _enemy.update(1);
        tick = 0;
        
      }
      

    });  
  }

  addEnemy(enemy) {
    this.addChild(enemy);
    listOfEnemies.push(enemy);
  }

  removeEnemy(enemy) {
    this.removeChild(enemy);
    listOfEnemies.forEach((_enemy, index) => {
      if (enemy === _enemy) {
        listOfBullets.splice(index, 1);
        return;
      }
    });
  }

  makeDebugGrid() {
    let posX = 0;
    let posY = 0;

    console.log(this.mapMask.length, this.mapMask[0].length)
    for (var ay = 0; ay < this.mapMask.length; ay++) {
      this.mapCell.push([]);
      for (var ax = 0; ax < this.mapMask[ay].length; ax++) {
        const sprite = new this.createRectangle(this.mapMask[ay][ax]);
        sprite.x = posX;
        sprite.y = posY;
        this.addChild(sprite);
        posX += config.MAP_CELL_SIZE;
      }
      posY += config.MAP_CELL_SIZE;
      posX = 0;
    }
  }

  clearMapMask() {
    this.mapMask = [];
    for (let i = 0; i < config.MAP_HEIGHT_MAX; i++) {
      this.mapMask.push([]);

      for (let j = 0; j < config.MAP_WIDTH_MAX; j++) {
        this.mapMask[i][j] = STATE_CELL_FREE;
      }
    }
  }

  createRectangle(type) {
    console.log('TYPE', type)
    const color = ['0x808080', '0x008000'];
    const graphics = new PIXI.Graphics();
    graphics.beginFill(color[type]);
    graphics.drawRect(0,0, config.MAP_CELL_SIZE, config.MAP_CELL_SIZE);
    graphics.endFill();

    return graphics;
  }

  getCellState(ax, ay) {
    return this.mapMask[ay][ax];
  }

  setCellState(ax, ay, state) {
    this.mapMask[ay][ax] = state;
  }
}  


