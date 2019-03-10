import {config} from '../../config';
import *as PIXI from 'pixi.js';
import {eventEmitter, EVENTS} from '../../events/EventEmitter';

export default class Map {
    constructor(universe) {
        this.mapCell = [];
        this.universe = universe;

        eventEmitter.on(EVENTS.SHOW_BUILD_GRID, this.showBuildGrid, this); 
        eventEmitter.on(EVENTS.HIDE_BUILD_GRID, this.hideBuildGrid, this);  
        this.graphics = new PIXI.Graphics();
        
    }

    showBuildGrid() {
        this.graphics.visible = true;
        this.universe.addChild(this.graphics);
        this.makeBuildGrid();
    }

    hideBuildGrid() {
        this.graphics.visible = false;
    }

    init(mapMask) {
        this.mapMask = mapMask;
    }

    makeBuildGrid() {
        let posX = 0;
        let posY = 0;
        const color = ['0xffcc00', '0x000000'];
        this.graphics.clear();
        const graphics = this.graphics;

        for (var ay = 0; ay < this.mapMask.length; ay++) {
            for (var ax = 0; ax < this.mapMask[ay].length; ax++) {
                graphics.lineStyle(1, color[this.mapMask[ay][ax]]);
                graphics.drawRect(posX, posY, config.MAP_CELL_SIZE, config.MAP_CELL_SIZE);
              
                posX += config.MAP_CELL_SIZE;
            }
            posY += config.MAP_CELL_SIZE;
            posX = 0;
        }
        graphics.endFill();
 
    }

    makeDebugGrid() {
        let posX = 0;
        let posY = 0;
        const color = ['0x808080', '0x554646'];
        const graphics = new PIXI.Graphics();
        for (var ay = 0; ay < this.mapMask.length; ay++) {
          this.mapCell.push([]);
            for (var ax = 0; ax < this.mapMask[ay].length; ax++) {
                graphics.beginFill(color[this.mapMask[ay][ax]]);
                graphics.drawRect(posX, posY, config.MAP_CELL_SIZE, config.MAP_CELL_SIZE);
                posX += config.MAP_CELL_SIZE;
            }
            posY += config.MAP_CELL_SIZE;
            posX = 0;
        }
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