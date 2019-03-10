import *as PIXI from 'pixi.js';
import {config} from '../config';
import {eventEmitter, EVENTS} from '../events/EventEmitter';
import {EnemySolder} from './enemies/EnemySolder';
import { GunTower } from './towers/GunTower';
import Map from './map/Map';
import {PathFinder} from '../utils/PathFinder2';
import { WaveCreator } from './levels/WaveCreator';
import {map, waves} from './levels/Level';
import {TowerPanel} from './TowerPanel';

const listOfEnemies = [];
const listOfTowers = [];
const listOfBullets = [];
const speed = 1;

export class Game extends PIXI.Container {
  constructor() {
    super();

    this.isStartGame = false;
    this.visible = false;

    this.map = new Map(this)
    this.map.init(map);
    this.addChild(this.map.makeDebugGrid());

    this.towerPanel = new TowerPanel(this);
    this.towerPanel.position.set(1000, 100);
    this.addChild(this.towerPanel);
    

    this.delataTime = 0;
    this.lastTick = 0;

    this.tiker =  new PIXI.ticker.Ticker();
    this.tiker.add(this.enterFrame.bind(this));
    PIXI.ticker.Ticker.FPS = 60;
    this.tiker.start();

    eventEmitter.on(EVENTS.START_GAME, this.startGame, this); 

    this.pf = new PathFinder();
    this.way = this.pf.getWay(this.map.mapMask);
    this.waveCreator = new WaveCreator(this);
    
  }

  newEnemy() {
    const solder = new EnemySolder(this);
    solder.init(this.way);
  }

  startGame() {
    const tower = new GunTower(this);
    tower.init(3, 1);

    const tower1 = new GunTower(this);
    tower1.init(11, 6);

    this.waveCreator.init(waves, map);


    //---- START ----
    this.isStartGame = true;
    this.visible = true;
  }

  getEnemies() {
    return listOfEnemies;
  }

  getBullets() {
    return listOfBullets;
  }



  enterFrame(time) {  
    if (!this.isStartGame) return;

    this.waveCreator.update();

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


