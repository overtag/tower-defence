import * as PIXI from 'pixi.js';
import { config } from '../config';
import { eventEmitter, EVENTS } from '../events/EventEmitter';
import { EnemyBase } from './EnemyBase';

export class zJester extends EnemyBase {
  constructor(universe) {
    super();

    this.universe = universe;
    this.health = 1;

    let alienImages = [
      'Patch_mc0000',
      'Patch_mc0001',
      'Patch_mc0002',
      'Patch_mc0003',
      'Patch_mc0004',
      'Patch_mc0005',
      'Patch_mc0006',
      'Patch_mc0007',
      'Patch_mc0008',
      'Patch_mc0009',
      'Patch_mc0010',
      'Patch_mc0011',
      'Patch_mc0012',
      'Patch_mc0013',
      'Patch_mc0014',
      'Patch_mc0015',
      'Patch_mc0016',
      'Patch_mc0017',
      'Patch_mc0018',
      'Patch_mc0019',
    ];

    const zJester = []
    for (let i = 0; i < 80; i++) {
      if (i< 10) {
        zJester.push(`ZJester_mc000${i}`)
      } else {
        zJester.push(`ZJester_mc00${i}`)
      }
    }

    let textureArray = [];

    for (let i = 0; i < zJester.length; i++) {
      let texture = PIXI.Texture.from(zJester[i]);
      textureArray.push(texture);
    }

    this.sprite = new PIXI.extras.AnimatedSprite(textureArray);
    
    this.sprite.anchor.set(0.5, 0.5);
    this.addChild(this.sprite);

    this.sprite.position.set(0, 0);
    this.sprite.scale.set(2);
    this.sprite.gotoAndPlay(4);
    this.sprite.animationSpeed = 0.5;

    this.addChild(this.createRectangle());
  }

  init(x, y) {
    this.health = 1;
    this.sprite.gotoAndPlay(Math.floor(Math.random() * 20));
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
    if (this.y >  config.defaultHeight - 100) {
      this.dead();
      eventEmitter.emit(EVENTS.COME_ENEMY, this);
    }
  }

  damage(damage) {
    this.health -= damage;
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
