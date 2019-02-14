import *as PIXI from 'pixi.js';
import {config} from '../../config';
import {EnemyBase} from './EnemyBase';
import { Avector } from '../../utils/Avector';
import { Amath  } from '../../utils/Amath';
import {Game} from '../Game'

export class EnemySolder extends EnemyBase {
    constructor(universe) {
        super(universe);

        this.isAttaked = false;
        this.calcDelay = 0;
        this.sprite = this.createRectangle();
    }

    createRectangle() {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF);
        graphics.drawCircle(0, 0, 15, 15);
        graphics.endFill();
    
        return graphics;
    }

    free() {
        if (!this.isFree) {
            // Вовращаем юнита в кэш
            this.universe.cacheEnemySoldier.set(this);
            super.free();
            this.isFree = true;
        }
    }

    init(posX, posY, targetX, targetY) {
        this.kind = EnemyBase.KIND_SOLDIER;
        this.defSpeed = 30;
        this.health = 0.6;
        this.isFree = false;

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