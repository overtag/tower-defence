import *as PIXI from 'pixi.js';
import {config} from '../../config';
import {PathFinder} from '../../utils/PathFinder'
import {Avector} from '../../utils/Avector'
import {Amath} from '../../utils/Amath'
import {Game} from '../Game'

export class EnemyBase extends PIXI.Container {
  static KIND_NONE () {return -1;} 
  static KIND_SOLDIER () {return 0;} 
  static KIND_JEEP () {return 1;} 
  static KIND_TANK () {return 2;} 

  constructor(universe) {
    super();

    this.kind = EnemyBase.KIND_NONE;
    this.health = 0;
    this._defSpeed = 1;
    this._speed = new Avector(1, 1);
    this._targetPos = new Avector(1, 1);
    this.sprite = null;
    this.isFree = false;


    this.universe = universe;
    this.isDead = false;
  }

  createCircle() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xFFCC00);
    graphics.drawCircle(-2.5, -2.5, 5, 5);
    graphics.endFill();

    return graphics;
}

  setNextTarget() {
			if (this._wayIndex == this._way.length) {
				this._isWay = false;
			} else {
				// Новая цель
        this._wayTarget = this._way[this._wayIndex];
				this._targetPos.set(Game.toPix(this._wayTarget.x), Game.toPix(this._wayTarget.y));
				this._targetPos.x += Amath.random(-10, 10);
				this._targetPos.y += Amath.random(-10, 10);
				// Расчет угла между текущими координатами и следующей точкой
				var angle = Amath.getAngle(this.x, this.y, this._targetPos.x, this._targetPos.y);
				//this._newAngle = Amath.toDegrees(Amath.getAngle(x, y, this._targetPos.x, this._targetPos.y));
				
				// Установка новой скорости
				this._speed.asSpeed(this._defSpeed, angle);
				// Разворот спрайта
				this.sprite.rotation = Amath.toDegrees(angle);
			}
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
        this.setNextTarget();
			}
  }

  update(delta) {

  }

  kind() {
		return this.kind;
	}
}  