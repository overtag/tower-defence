import * as PIXI from 'pixi.js';
import { config } from '../config';
import { eventEmitter, EVENTS } from '../events/EventEmitter';
import { Amath } from '../utils/Amath';

const STATE_DISABLED = false;
const STATE_ENABLED = true;

export class Trap extends PIXI.Container {
  constructor() {
    super();

    this.state = STATE_DISABLED;

    this.damage = 1;
    this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage('Rake_mc0000'));
    this.sprite.anchor.set(0.5, 0.5);

    this.addChild(this.sprite);
    this.addChild(this.createRectangle());

    const name = 'RakeEffect_mc';
    const length = 13;

    const textureArray = this.initClip(name, length);
    console.log('textureArray', textureArray);
    this.effectSprite = new PIXI.extras.AnimatedSprite(textureArray);
    this.effectSprite.anchor.set(0.5, 0.5);
    this.effectSprite.position.set(-50, 50);
    this.effectSprite.loop = false;
    this.effectSprite.animationSpeed = 0.5;

    this.effectSprite.visible = false;
    this.effectSprite.onComplete = evt => {
      eventEmitter.emit(EVENTS.REMOVE_TRAP, this);
    };

    this.addChild(this.effectSprite);
    this.effectSprite.gotoAndStop(1);
  }

  init() {
    this.state = STATE_DISABLED;
    this.effectSprite.gotoAndStop(1);
    this.effectSprite.visible = false;
    this.sprite.visible = true;
  }

  initClip(name, length) {
    const listNames = [];
    const textureArray = [];
    for (let i = 0; i < length; i++) {
      listNames.push(`${name}${i < 10 ? '000' : '00'}${i}`);
      let texture = PIXI.Texture.from(listNames[i]);
      textureArray.push(texture);
    }

    return textureArray;
  }

  enableTrap() {
    this.state = STATE_ENABLED;
  }

  createRectangle() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xffcc00);
    graphics.drawRect(0, 0, 5, 5);
    graphics.endFill();

    return graphics;
  }

  update(enemies) {
    switch (this.state) {
      case STATE_DISABLED:
        break;

      case STATE_ENABLED:
        enemies.forEach(enemy => {
          this.collision(enemy);
        });
        break;
    }
  }

  collision(enemy) {
    if (Amath.hitTestRectangle(this, enemy)) {
      enemy.damage(this.damage);

      console.log('СТОЛКНУЛСЯ!!');
      this.effectSprite.gotoAndPlay(0);
      this.effectSprite.visible = true;
      this.sprite.visible = false;
    } else {
      // console.log('----');
    }
  }
}
