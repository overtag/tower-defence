import *as PIXI from 'pixi.js';
import { config } from '../config';

const WATER_KEY = 999;

const start = 2;
const finish = 3;
const free = 1;
const steps = [new PIXI.Point(0, 1), new PIXI.Point(1, 0), new PIXI.Point(-1, 0), new PIXI.Point(0, -1)];

export class PathFinder {
    constructor () {
    }

    getWay(mapArr) {
        this.startX = 0;
        this.startY = 0;
        this.startCell = this.searchCell(mapArr, start);
        this.finishCell = this.searchCell(mapArr, finish);
       
        return this.searchWay(mapArr, [this.startCell]);
    }

    searchCell(mapArr, valueCell) {
        for (let y = 0; y < mapArr.length; y++) {
            for (let x = 0; x < mapArr.length; x++) {
                if (mapArr[y][x] === valueCell) {
                    return new PIXI.Point(x, y);
                }
            }
        }

        return null;
    }

    searchWay(map, way) {
        const point =  way[way.length - 1];
        steps.forEach((step) => {
            const x = step.x + point.x;
            const y = step.y + point.y;

            if (!this.isOutPoint(x, y) && !this.isPointInWay(x, y, way)) {
                if (this.isFinish(x, y)) {
                    way.push(new PIXI.Point(x, y));
                    return way;
                }

                if (this.isFree(map, x, y)) {
                    way.push(new PIXI.Point(x, y));
                    return this.searchWay(map, way)    
                }
            }
        })

        return way;
    }

    isFree(map, x, y){
        return map[y][x] === free
    }

    isFinish(x, y) {
        return this.finishCell.x === x && this.finishCell.y ===y;
    }

    isPointInWay(x, y, way) {
        return way.some((point) => {
            return point.x === x && point.y === y
            
        })
    }

    isOutPoint(x, y) {
        const isOutX = x < 0 || x >= config.MAP_WIDTH_MAX;
        const isOutY = y < 0 || y >= config.MAP_HEIGHT_MAX;

        return isOutX || isOutY;
    }
}        