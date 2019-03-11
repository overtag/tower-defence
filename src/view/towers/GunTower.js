import { Avector } from "../../utils/Avector";
import { Amath } from "../../utils/Amath";
import { config } from "../../Config";
import { TowerBase } from "./TowerBase";
import { GunBullet } from "../bullet/GunBullet";

export class GunTower extends TowerBase {
    constructor(universe) {
        super(universe);
    }

    init(tileX, tileY) {
        this._attackDamage = 2;
        this._bulletSpeed = 3;

        this._body = new PIXI.Sprite(PIXI.Texture.fromImage("tower"));
        this._body.anchor.set(0.5, 0.5);
        this._head = this.createRect();

        super.init(tileX, tileY);
    }

    createRect() {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xCCCCCC);
        graphics.drawRect(-2.5, -7.5, 5, 15);
        graphics.endFill();
    
        return graphics;
    }

    createCircle() {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFCC00);
        graphics.drawCircle(0, 0, 15);
        graphics.endFill();
    
        return graphics;
    }

    shoot() {
        const bullet = new GunBullet(this.universe, this._attackDamage);
        bullet.init(this.x, this.y, this._bulletSpeed, this._head.rotation);
    }

    stateIdle() {
        if (this._idleDelay >= 60) {
            this._idleDelay = 0;
           
            const enemies = this.universe.getEnemies();
            enemies.forEach(enemy => {
                if (Amath.distance(enemy.x, enemy.y, this.x, this.y) <= this._attackRadius) {
                    this._enemyTarget = enemy;
                    this._state = config.STATE_ATTACK;
                }
            });
        }

        this._idleDelay++;
    }

    stateAttack() {
        this._shootDelay -= 1;

        if (this._enemyTarget != null) {
            this._head.rotation = Amath.toRadians( Amath.getAngleDeg(this.x, this.y, this._enemyTarget.x, this._enemyTarget.y));
        }
       
        if (this._shootDelay <= 0) {
            this._shootDelay = 60;
            this.shoot();
        }

        if (this._enemyTarget.isDead || Amath.distance(this._enemyTarget.x, this._enemyTarget.y, this.x, this.y) >= this._attackRadius) {
            this._state = config.STATE_IDLE;
            this._enemyTarget = null;    
        }
    }
}    

