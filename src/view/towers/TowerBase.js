import { Avector } from "../../utils/Avector";
import {Game} from '../Game';
import { Amath } from "../../utils/Amath";

const STATE_IDLE = 1;
const STATE_ATTACK = 2;

export class TowerBase extends PIXI.Container {
    constructor(universe) {
        super();

        this._body = null;
        this._head = null;
        this._tilePos = new Avector();
        this._state = STATE_IDLE;
        this.idleDelay = 0;
        this._attackRadius = 100;
        this._attackInterval = 8;
        this._attackDamage = 0.2;
        this._bulletSpeed = 100;
        this._enemyTarget = null;
        this.universe = universe;
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

    update(delta) {
        switch(this._state) {
            case STATE_IDLE :
                if (_idleDelay >= 60) {
                    _idleDelay =0;
                   
                    const enemies = this.universe.getEnemies();
                    enemies.forEach(enemy => {
                        console.log(Amath.distance(enemy.x, enemy.y) , this._attackRadius)
                        if (Amath.distance(enemy.x, enemy.y, this.x, this.y) <= this._attackRadius) {
                            this._enemyTarget = enemy;
                            this._state = STATE_ATTACK;
                        }
                    })
                }
                _idleDelay++;
            break;
            case STATE_ATTACK :
                if (this._enemyTarget != null) {
                    this._head.rotation =Amath.toRadians( Amath.getAngleDeg(this.x, this.y, this._enemyTarget.x, this._enemyTarget.y));
                }
                if (Amath.distance(this._enemyTarget.x, this._enemyTarget.y, this.x, this.y) >= this._attackRadius) {
                    this._enemyTarget = null;
                    this._state = STATE_IDLE;
                }
            break;    
        }
    }
}

let _idleDelay = 0;