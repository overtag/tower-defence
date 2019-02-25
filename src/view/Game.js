import *as PIXI from 'pixi.js';
import {config} from '../config';
import {EnemySolder} from './enemies/EnemySolder';
import { GunTower } from './towers/GunTower';
import Map from './map/Map';


const listOfEnemies = [];
const listOfTowers = [];
const listOfBullets = [];

let tick = 0;
const speed = 1;

export class Game extends PIXI.Container {
  constructor() {
    super();
    
    this.map = new Map()
    this.addChild(this.map.makeDebugGrid());

    this.delataTime = 0;
    this.lastTick = 0;

    this.tiker =  new PIXI.ticker.Ticker();
    this.tiker.add(this.enterFrame.bind(this));
    PIXI.ticker.Ticker.FPS = 60;
    this.tiker.start();

    const tower = new GunTower(this);
    tower.init(3, 1);

    const tower1 = new GunTower(this);
    tower1.init(11, 6);
  }

  getEnemies() {
    return listOfEnemies;
  }

  getBullets() {
    return listOfBullets;
  }

  newEnemy() {
    const solder = new EnemySolder(this);
    solder.init(0, 0, this.map.mapMask[0].length - 1, this.map.mapMask.length - 1);
  }

  enterFrame(time) {  
    tick++
    listOfEnemies.forEach((_enemy, index) => {
        _enemy.update(speed);
    });  

    listOfTowers.forEach((_enemy, index) => {
      _enemy.update(speed);
    });  

    listOfBullets.forEach((_enemy, index) => {
      _enemy.update(speed);
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
        listOfEnemies.splice(index, 1);
        return;
      }
    });
  }

  addTower(enemy) {
    this.addChild(enemy);
    listOfTowers.push(enemy);
  }

  removeTower(enemy) {
    this.removeChild(enemy);
    listOfTowers.forEach((_enemy, index) => {
      if (enemy === _enemy) {
        listOfTowers.splice(index, 1);
        return;
      }
    });
  }

  getCellState(ax, ay) {
    return this.mapMask[ay][ax];
  }

  setCellState(ax, ay, state) {
    this.mapMask[ay][ax] = state;
  }

  /**
   * Переводит значение из пикселей в тайлы.
   */
  static toTile(value) {
    return Math.floor(value / config.MAP_CELL_SIZE);
  }
  
  /**
   * Переводит значение из тайлов в пиксели.
   */
  static toPix(value) {
    return config.MAP_CELL_HALF + value * config.MAP_CELL_SIZE;
  }
}  


