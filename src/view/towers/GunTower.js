import { Avector } from "../../utils/Avector";
import { TowerBase } from "./TowerBase";
import { GunBullet } from "../bullet/GunBullet";

export class GunTower extends TowerBase {
    constructor(universe) {
        super(universe);
    }

    init(tileX, tileY) {
        this._body = this.createCircle();
        this._head = this.createRect();

        super.init(tileX, tileY);
    }

    createRect() {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xCCCCCC);
        graphics.drawRect(-7.5, -7.5, 15, 15);
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
        const bullet = new GunBullet(this.universe);
        bullet.damage = this._attackDamage;
        bullet.init(this.x, this.y, this._bulletSpeed, this._head.rotation )
    }
}    

