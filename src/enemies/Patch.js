import * as PIXI from 'pixi.js';
import { config } from '../config';
import { eventEmitter, EVENTS } from '../events/EventEmitter';
import { EnemyBase } from './EnemyBase';
import { Names } from './Names';

export class Patch extends EnemyBase {
  constructor(universe) {
    super();
    this.type = Names.Patch_mc.name;
  }
}
