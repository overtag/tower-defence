import * as PIXI from 'pixi.js';
import { config } from '../config';
import { eventEmitter, EVENTS } from '../events/EventEmitter';

export class EnemyBase extends PIXI.Container {
  constructor() {
    super();

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
    let textureArray = [];

    for (let i = 0; i < 20; i++) {
      let texture = PIXI.Texture.from(alienImages[i]);
      textureArray.push(texture);
    }

    this.sprite = new PIXI.extras.AnimatedSprite(textureArray);
    this.sprite.rotation = Math.PI / 2;
    this.sprite.anchor.set(0.5, 0.5);
    this.addChild(this.sprite);

    this.sprite.position.set(100, 100);
    this.sprite.scale.set(2);
    this.sprite.gotoAndPlay(4);
    this.sprite.animationSpeed = 0.5;
  }

  update() {
    this.y += 0.2;
  }

  createRectangle() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xffffff);
    graphics.drawRect(0, 0, 32, 32);
    graphics.endFill();

    return graphics;
  }
}
