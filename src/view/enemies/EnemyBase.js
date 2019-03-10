import *as PIXI from 'pixi.js';
import {config} from '../../config';
import {PathFinder} from '../../utils/PathFinder2'
import {Avector} from '../../utils/Avector'
import {Amath} from '../../utils/Amath'
import {Game} from '../Game'
import {TweenLite, Linear} from "gsap/TweenMax";



export class EnemyBase extends PIXI.Container {
  static KIND_NONE () {return -1;} 
  static KIND_SOLDIER () {return 0;} 
  static KIND_JEEP () {return 1;} 
  static KIND_TANK () {return 2;} 

  constructor(universe) {
    super();

    this.kind = EnemyBase.KIND_NONE;
    this.pathFinder = new PathFinder();
    this._speed = new Avector(1, 1);
    this._targetPos = new Avector(1, 1);
    this._defSpeed = 1;
    this.sprite = null;
    this.isFree = false;
    this._health = 1;   
    this.isDead = false;
    this._wayIndex = 1;
    this._wayTarget = null;
    this.universe = universe;
  }

  init(way) {
    this.isDead = false;  
    this.universe.addEnemy(this);

    this._way = way;
    this._position = way[0];
    this._wayIndex = 1;
    this._isWay = true;
    this.setNextTarget();
  }

  setNextTarget() {
			if (this._wayIndex == this._way.length) {
				this._isWay = false;
			} else {
        // Новая цель
      
        this._wayTarget = this._way[this._wayIndex];
        console.log("123",this._way, this._wayIndex)
				this._targetPos.set(Game.toPix(this._wayTarget.x), Game.toPix(this._wayTarget.y));
				this._targetPos.x += Amath.random(-10, 10);
				this._targetPos.y += Amath.random(-10, 10);
				// Расчет угла между текущими координатами и следующей точкой
				var angle = Amath.getAngle(this.x, this.y, this._targetPos.x, this._targetPos.y);
				//this._newAngle = Amath.toDegrees(Amath.getAngle(x, y, this._targetPos.x, this._targetPos.y));
				
				// Установка новой скорости
				this._speed.asSpeed(this._defSpeed, angle);
        // Разворот спрайта
        TweenLite.to(this.sprite, 1, {rotation: angle})
				//this.sprite.rotation = Amath.toDegrees(angle);
			}
		}

  free() {
    if (this.sprite != null) {
      const enemies = this.universe.getEnemies();
      enemies.forEach((enemy, index) => {
        if (enemy === this) {
            return enemies.splice(index, 1);
        }
      })
      this.universe.removeChild(this);
      console.log(enemies)
    }
    
  }

  update(delta) {
    // you code
  }

  addDamage(damage) {
    // you code
  }

  kind() {
		return this.kind;
  }
  
  createRectangle() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xFFFFFF);
    graphics.drawCircle(0, 0, 15, 15);
    graphics.endFill();

    return graphics;
  }

  createCircle() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xFFCC00);
    graphics.drawCircle(-2.5, -2.5, 5, 5);
    graphics.endFill();

    return graphics;
  }
}  