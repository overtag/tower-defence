import { Avector } from "../../utils/Avector";
import { config } from "../../Config";
import {Game} from '../Game';
import { Amath } from "../../utils/Amath";

export class TowerBase extends PIXI.Container {
    constructor(universe) {
        super();

        this._body = null;
        this._head = null;
        this._tilePos = new Avector();
        this._state = config.STATE_IDLE;
        this.idleDelay = 0;
        this._attackRadius = 100;
        this._attackInterval = 8;
        this._attackDamage = 0.2;
        this._bulletSpeed = 1;
        this._enemyTarget = null;
        this.universe = universe;

        this._idleDelay = 0;
        
        this._shootDelay = this._attackInterval;
    }

    free() {
        this.universe.removeChild(this);
    }

    init(tileX, tileY) {
        if (this._body != null && this._head != null) {
            this.addChild(this._body);
            this.addChild(this._head);
        }

        this._tilePos.set(tileX, tileY);

        this.x = Game.toPix(tileX);
        this.y = Game.toPix(tileY);

        this.universe.addTower(this);
    }

    stateIdle() {
        if (this._idleDelay >= 60) {
            this._idleDelay =0;
           
            const enemies = this.universe.getEnemies();
            enemies.forEach(enemy => {
                console.log("STATE_IDLE", Amath.distance(enemy.x, enemy.y, this.x, this.y) , this._attackRadius)
                if (Amath.distance(enemy.x, enemy.y, this.x, this.y) <= this._attackRadius) {
                    this._enemyTarget = enemy;
                    this._state = config.STATE_ATTACK;
                }
            })
        }
        this._idleDelay++;
    }

    stateAttack() {
        if (this._enemyTarget != null) {
            this._head.rotation = Amath.toRadians( Amath.getAngleDeg(this.x, this.y, this._enemyTarget.x, this._enemyTarget.y));
        }

        this._shootDelay -= 1;
        if (this._shootDelay <= 0) {
            this.shoot();
        }

        if (this._enemyTarget.isDead || Amath.distance(this._enemyTarget.x, this._enemyTarget.y, this.x, this.y) >= this._attackRadius) {
            this._enemyTarget = null;
            this._state = config.STATE_IDLE;
        }
    }

    update(delta) {
        const {STATE_IDLE, STATE_ATTACK} = config;
        
        switch(this._state) {
            case STATE_IDLE :
                this.stateIdle()    
            break;
            case STATE_ATTACK :
                this.stateAttack()
            break;    
        }
    }

    shoot() {

    }
}