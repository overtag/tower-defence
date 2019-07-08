import * as PIXI from 'pixi.js';
import { config } from '../config';
import { eventEmitter, EVENTS } from '../events/EventEmitter';
import { EnemyBase } from './EnemyBase';
import { Names } from './Names'; 

export class Jester extends EnemyBase {
  constructor(universe) {
    super();
    this.type = Names.ZJester_mc.name;
  }
}
