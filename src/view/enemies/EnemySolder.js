import *as PIXI from 'pixi.js';
import {config} from '../../config';
import { Avector } from '../../utils/Avector';
import { Amath  } from '../../utils/Amath';
import {Game} from '../Game'
import {EnemyBase} from './EnemyBase';
import HealthPoint from '../HealthPoint';

const MAX_HEALTH = 10;

export class EnemySolder extends EnemyBase {
    constructor(universe) {
        super(universe);

        this.isAttaked = false;
        this.calcDelay = 0;
        this.sprite = this.createRectangle();
        this.addChild(this.sprite);

        this.hpBar = new HealthPoint();
        this.addChild(this.hpBar);
        this.hpBar.y = -this.sprite.height / 2 - 2

    }

    addDamage(damage) {
        console.log("addDamage", this._health, damage)
        this._health -= damage;
        this.hpBar.update(MAX_HEALTH, this._health)
        if (this._health <= 0) {
            this.isDead = true;
            setTimeout(()=> {this.free()}, 600);   
        }
    }

    init(posX, posY, targetX, targetY) {
        this.kind = EnemyBase.KIND_SOLDIER;
        this._defSpeed = 0.4;
        this._health = MAX_HEALTH;
        this.isFree = false;
        this.hpBar.init();
        super.init(posX, posY, targetX, targetY);
    }

    update(delta) {
        if  (this._isWay) {
            
            _calcDelay++;  
            this.x += this._speed.x * delta;
            this.y += this._speed.y * delta;

            const cp = new Avector(this.x, this.y);
            const _ax = Game.toPix(this._wayTarget.x);
            const _ay = Game.toPix(this._wayTarget.y);
            const tp = new Avector(_ax, _ay); 
           
            if (cp.equal(tp, 15)) {
                this._position.x = Game.toTile(this.x);
                this._position.y = Game.toTile(this.y);
                this._wayIndex++;
                this.setNextTarget();
            }
        }
    }
}  

let _calcDelay = 0;