import * as PIXI from 'pixi.js';
import { config } from '../config';
import { Names } from './Names';
import { eventEmitter, EVENTS } from '../events/EventEmitter';
import { HealthBar } from '../health/HealthBar';

export class EnemyBase extends PIXI.Container {
  constructor(universe) {
    super();

    this.universe = universe;
    this.health = 1;
    this.sprite = null;
    this.healthBar = new HealthBar();
    this.type = Names.Patch_mc.name;

    this.addChild(this.healthBar);
  }

  initClip() {
    const listNames = [];
    const { length, name } = Names[this.type];
    const textureArray = [];
    for (let i = 0; i < length; i++) {
      listNames.push(`${name}${i < 10 ? '000' : '00'}${i}`);
      let texture = PIXI.Texture.from(listNames[i]);
      textureArray.push(texture);
    }

    return textureArray;
  }

  initSprite() {
    const textureArray = this.initClip();
    this.sprite = new PIXI.extras.AnimatedSprite(textureArray);

    this.sprite.anchor.set(0.5, 0.5);
    this.addChild(this.sprite);
    this.sprite.rotation = Math.PI / 2;
    this.sprite.position.set(0, 0);
    this.sprite.scale.set(2);
    this.sprite.gotoAndPlay(4);
    this.sprite.animationSpeed = 0.5;

    this.addChild(this.createRectangle());
  }

  init(x, y) {
    this.initSprite();
    this.health = 1;
    this.healthBar.init(this.health);
    this.sprite.gotoAndPlay(Math.floor(Math.random() * 20));
    this.sprite.alpha = 0;
    this.healthBar.y = this.sprite.height * 0.5 - 5 - this.healthBar.height;
  }

  createRectangle() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xffcc00);
    graphics.drawRect(0, 0, 5, 5);
    graphics.endFill();

    return graphics;
  }

  update() {
    this.y += 0.2;
    if (this.y > config.defaultHeight - 100) {
      this.dead();
      eventEmitter.emit(EVENTS.COME_ENEMY, this);
    }
  }

  damage(damage) {
    this.health -= damage;
    this.healthBar.damage(this.health);
    if (this.health <= 0) {
      this.dead();
      eventEmitter.emit(EVENTS.DEAD_ENEMY, this);
    }
  }

  dead() {
    this.sprite.gotoAndStop(0);
    eventEmitter.emit(EVENTS.DEAD_ENEMY, this);
  }
}
