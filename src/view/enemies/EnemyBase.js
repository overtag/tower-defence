import *as PIXI from 'pixi.js';
import {config} from '../../config';
import {PathFinder} from '../../utils/PathFinder'

export class EnemyBase extends PIXI.Container {
  static KIND_NONE () {return -1;} 
  static KIND_SOLDIER () {return 0;} 
  static KIND_JEEP () {return 1;} 
  static KIND_TANK () {return 2;} 

  constructor(universe) {
    super();

    this.kind = EnemyBase.KIND_NONE;
    this.health = 0;
    this.speadX = 0;
    this.speadY = 0;
    this.sprite = null;
    this.isFree = false;


    this.universe = universe;
    this.isDead = false;
  }


  free() {
    if (this.sprite != null) {
      this.universe.removeChild(this.sprite);
    }
  }

  init(posX, posY, targetX, targetY) {
    if (this.sprite != null) {
      this.addChild(this.sprite);
    }  
    this.universe.addEnemy(this)
    this._position = new PIXI.Point(posX, posY);
    this._target = new PIXI.Point(targetX, targetY);
    
    const pathFinder = new PathFinder(this.universe.mapMask);
    this._way = pathFinder.findWay(this._position, this._target);

    if (this._way.length == 0) {	
      console.log("EnemyBase::init() - Путь не найден!");
    } else	{
				this._isWay = true;
				this._wayIndex = 0; // Текущий шаг
				this._wayTarget = this._way[this._wayIndex];
			}
  }

  update(delta) {
    this.x += _speedX * delta;
    this.y += _speedY * delta;
  }

  kind() {
		return this.kind;
	}
}  