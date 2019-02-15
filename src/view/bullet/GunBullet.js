import { Avector } from "../../utils/Avector";
import { Amath } from "../../utils/Amath";
import { BulletBase } from "./BulletBase";

export class GunBullet extends BulletBase {
    constructor(universe) {
        super(universe);
    }

    init(ax, ay, speed, angle) {
        this._sprite = this.createRect();
        super.init(ax, ay, speed, angle);
    }

    createRect() {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xCCCCCC);
        graphics.drawRect(-1, -2, 2, 4);
        graphics.endFill();
    
        return graphics;
    }


}    