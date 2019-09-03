import * as PIXI from "pixi.js";
import { config } from "../config";
import { eventEmitter, EVENTS } from "../events/EventEmitter";

export class HealthBar extends PIXI.Container {
  constructor() {
    super();

    this.health = 1;

    this.cache = [];
  }

  init(health) {
    this.health = health;
  }

  damage(damage) {
    this.health -= damage;
  }

  updateBar() {
    for (let i = 0; i < this.health; i++) {
      if (this.cache.length <= i) {
        const hearth = new PIXI.Sprite("Life_mc0000");
        this.addChild(hearth);
        this.cache.push(hearth);
      } else {
        this.cache[i].visible = true;
      }
    }
  }

  createRectangle() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xffcc00);
    graphics.drawRect(0, 0, 5, 5);
    graphics.endFill();

    return graphics;
  }
}
