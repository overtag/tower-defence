import *as PIXI from 'pixi.js';

export class Button extends PIXI.Container {
  constructor(normal, over, down) {
    super();
    /*this.textures = {
      normal : PIXI.Texture.fromImage(normal),
      over : PIXI.Texture.fromImage(over),
      down : PIXI.Texture.fromImage(down),
    };*/

    this.textures = {
      normal : normal,
      over : over,
      down : down
    };

    this.sprite = new PIXI.Sprite(this.textures.normal);
    this.interactive = true;
    this.sprite.interactive = true;
    this.addChild(this.sprite);

    this.click = this.defaultClick.bind(this);
    this.mousedown = this.mousedown.bind(this);
    this.mouseover = this.mouseover.bind(this);
    this.mouseup = this.mouseup.bind(this);
    this.mouseupoutside = this.mouseupoutside.bind(this);
    this.mouseout = this.mouseout.bind(this);
    this.touchend = this.defaultClick.bind(this);
  }
 
  onclick() {
    console.log("KLICK");
  }

  defaultClick() {
    this.onclick();
  }

  mousedown() {
    this.sprite.texture = this.textures.down;
  }

  mouseover() {
    this.sprite.texture = this.textures.over;
  }

  mouseup() {
    this.sprite.texture = this.textures.over;
  }

  mouseupoutside() {
    this.sprite.texture = this.textures.normal;
  }

  mouseout() {
    this.sprite.texture = this.textures.normal;
  }
};