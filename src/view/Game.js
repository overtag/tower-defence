import *as PIXI from 'pixi.js';
import {config} from '../config';
import {eventEmitter, EVENTS} from '../events/EventEmitter';
import {EnemySolder} from './enemies/EnemySolder';
import { GunTower } from './towers/GunTower';
import Map from './map/Map';
import {PathFinder} from '../utils/PathFinder2';

const listOfEnemies = [];
const listOfTowers = [];
const listOfBullets = [];
const speed = 1;

export class Game extends PIXI.Container {
  constructor() {
    super();

    this.isStartGame = false;
    this.visible = false;

    this.map = new Map()
    this.addChild(this.map.makeDebugGrid());

    this.delataTime = 0;
    this.lastTick = 0;

    this.tiker =  new PIXI.ticker.Ticker();
    this.tiker.add(this.enterFrame.bind(this));
    PIXI.ticker.Ticker.FPS = 60;
    this.tiker.start();

    eventEmitter.on(EVENTS.START_GAME, this.startGame, this); 

    this.pf = new PathFinder();
    this.way = this.pf.getWay(this.map.mapMask)
    
  }

  startGame() {
    this.isStartGame = true;
    this.visible = true;

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
    solder.init(this.way);
  }

  enterFrame(time) {  
    if (!this.isStartGame) return;
    console.log("EF")
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


