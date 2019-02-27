import {config} from '../../config';
import *as PIXI from 'pixi.js';

export default class Map {
    constructor() {
        this.mapCell = [];
    }

    init(mapMask) {
        this.mapMask = mapMask;
    }

    makeDebugGrid() {
        let posX = 0;
        let posY = 0;
        const container = new PIXI.Container();
        for (var ay = 0; ay < this.mapMask.length; ay++) {
          this.mapCell.push([]);
            for (var ax = 0; ax < this.mapMask[ay].length; ax++) {
                const sprite = new this.createRectangle(this.mapMask[ay][ax]);
                sprite.x = posX;
                sprite.y = posY;
                container.addChild(sprite);
                posX += config.MAP_CELL_SIZE;
                this.mapCell[ay].push(sprite);
            }
            posY += config.MAP_CELL_SIZE;
            posX = 0;
        }

        return container;
    }
    
    createRectangle(type) {
        const color = ['0x808080', '0x554646'];
        const graphics = new PIXI.Graphics();
        graphics.beginFill(color[type]);
        graphics.drawRect(0,0, config.MAP_CELL_SIZE, config.MAP_CELL_SIZE);
        graphics.endFill();

        return graphics;
    }

    clearMapMask() {
        this.mapMask = [];
        for (let i = 0; i < config.MAP_HEIGHT_MAX; i++) {
          this.mapMask.push([]);
    
          for (let j = 0; j < config.MAP_WIDTH_MAX; j++) {
            this.mapMask[i][j] = config.STATE_CELL_FREE;
          }
        }
    }

    getCellState(ax, ay) {
        return this.mapMask[ay][ax];
    }

    setCellState(ax, ay, state) {
        this.mapMask[ay][ax] = state;
    }
}