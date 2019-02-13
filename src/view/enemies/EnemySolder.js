import *as PIXI from 'pixi.js';
import {config} from '../../config';
import {EnemyBase} from './EnemyBase';

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
        this.speedX = 1;
        this.speedY = 1;

        super.init(posX, posY, targetX, targetY);
    }

    update(delta) {
        if  (this._isWay) {
            this.x = this._wayTarget.x * config.MAP_CELL_SIZE + config.MAP_CELL_HALF;
            this.y = this._wayTarget.y * config.MAP_CELL_SIZE + config.MAP_CELL_HALF;

            this._position.x = Math.floor(this.x / config.MAP_CELL_SIZE) + config.MAP_CELL_HALF;
            this._position.y = Math.floor(this.x / config.MAP_CELL_SIZE) + config.MAP_CELL_HALF;;
            this._wayIndex++;
            if ( this._wayIndex === this._way.length) {
                this._isWay = false;
            } else {
                this._wayTarget = this._way[this._wayIndex];
            }

        }
    }
}  