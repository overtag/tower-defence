import *as PIXI from 'pixi.js';
import {config} from '../config';

const width = 10;
const height = 3;

export default class HealthPoint extends PIXI.Container{
    constructor() {
        super();

        const back = this.createRectangle('0x961c1c');
        back.x = -width * (0.5);
        this.addChild(back)

        this.hp = this.createRectangle('0x28df28');
        this.hp.x = -width * (0.5);
        this.addChild(this.hp)
    }

    init() {
        this.hp.width = width;
    }

    update(maxHp, currentHp) {
        const newWidth = Math.floor(width * (currentHp /maxHp));
        this.hp.width = newWidth < 0 ? 0 : newWidth;
       // console.log("newWidth",maxHp, currentHp, newWidth)
    }

    createRectangle(color) {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(color);
        graphics.drawRect(0,0, width, height);
        graphics.endFill();

        return graphics;
    }
}