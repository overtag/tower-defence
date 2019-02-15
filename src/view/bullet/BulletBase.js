import *as PIXI from 'pixi.js';
import { Avector } from "../../utils/Avector";
import { Amath } from "../../utils/Amath";

export class BulletBase extends PIXI.Container {
    constructor(universe) {
        super();
    
        this.universe = universe;
        this.damage = 0.1;
        this._sprite = null;
        this._speed = new Avector(0, 0);
    }

    free() { 
        const bullets = this.universe.getBullets();
        bullets.forEach((bullet, index) => {
            if (bullet === this) {
                return bullets.splice(index, 1);
            }
        })
        this.removeChild(this._sprite);
        this.universe.removeChild(this);
    }

    init(ax, ay, speed, angle) {
        if (this._sprite) {
            this.addChild(this._sprite);
            this._sprite.rotation = angle;

        }

        this.x = ax;
        this.y = ay;

        this._speed.asSpeed(speed, (angle));

        (this.universe.getBullets()).push(this);
        this.universe.addChild(this);
    }

    update(delta) {
        this.x += this._speed.x * delta;
        this.y += this._speed.y * delta;

        const enemies = this.universe.getEnemies();
        enemies.forEach((enemy) => {
            const dist = Amath.distance(this.x, this.y, enemy.x, enemy.y);
            if (dist < this.width / 2 + this.height / 2) {
                enemy.addDamage(this.damage);
                console.log(enemy._health)
                this.free();
            }
        })
    }
}