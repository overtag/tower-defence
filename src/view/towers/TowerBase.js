import { Avector } from "../../utils/Avector";
import { config } from "../../Config";
import {Game} from '../Game';


export class TowerBase extends PIXI.Container {
    constructor(universe) {
        super();

        this._body = null;
        this._head = null;
        this._enemyTarget = null;
        this._tilePos = new Avector();
        this._state = config.STATE_IDLE;
        this._attackRadius = 100;
        this._attackInterval = 8;
        this._attackDamage = 2;
        this._bulletSpeed = 2;
        
        this._idleDelay = 0;  
        this.universe = universe;
        this._shootDelay = this._attackInterval;
    }

    init(tileX, tileY) {
        this._shootDelay = this._attackInterval;
        
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
        // you code
    }

    stateAttack() {
        // you code
    }

    shoot() {

    }

    update() {
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

    free() {
        this.universe.removeChild(this);
    }
}