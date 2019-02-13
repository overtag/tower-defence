import *as PIXI from 'pixi.js';

const WATER_KEY = 999;

export class PathFinder {
    constructor (mapArr) {
		this._mapMask = []; // Копия маски карты
	    this._mapDirs = []; // Направления
		this._mapWidth = 0; // Ширина карты
		this._mapHeight = 0; // Высота карты
		
		this._freeCell = 1; // Вид свободной ячейки
        this._maxIterations = 500; // Счетчик повторов
        
        var rowMask;
        var rowDirs;
        this._mapWidth = mapArr[0].length;
        this._mapHeight = mapArr.length;
        
        for (var y = 0; y < this._mapHeight; y++) {
            rowMask = []; 
            rowDirs = [];
            for (var x = 0; x < this._mapWidth; x++) {
                rowMask.push(mapArr[y][x]);
                rowDirs.push(new PIXI.Point());
            }
            this._mapMask.push(rowMask);
            this._mapDirs.push(rowDirs);
        }
    }

    findWay(start, end) {
        this._mapMask[end.y][end.x] = WATER_KEY;
        
        var counter = 0; 
        while (counter < this._maxIterations) {
            for (var y = 0; y < this._mapHeight; y++) {
                for (var x = 0; x < this._mapWidth; x++) {     
                    if (this._mapMask[y][x] === WATER_KEY) {      
                        this.goWater(x, y); 
                    }
                }
            }
            

            if (this._mapMask[start.y][start.x] === WATER_KEY) {
                console.log("getWay")
                return this.getWay(start, end);
            }
            
            counter++;
        }
        console.log(this._mapMask)

        return [];
    }

    goWater(ax, ay) {

        if (this.inMap(ax, ay - 1) && this._mapMask[ay - 1][ax] === this._freeCell) {

            this._mapMask[ay - 1][ax] = WATER_KEY;
            (this._mapDirs[ay - 1][ax]).x = ax;
            (this._mapDirs[ay - 1][ax]).y = ay;
        }
        
        if (this.inMap(ax + 1, ay) && this._mapMask[ay][ax + 1] === this._freeCell) { 
            console.log("goWater1")
            this._mapMask[ay][ax + 1] = WATER_KEY;
            (this._mapDirs[ay][ax + 1]).x = ax;
            (this._mapDirs[ay][ax + 1]).y = ay;
        }

        if (this.inMap(ax, ay + 1) && this._mapMask[ay + 1][ax] === this._freeCell) {
            console.log("goWater2")
            this._mapMask[ay + 1][ax] = WATER_KEY;
            (this._mapDirs[ay + 1][ax]).x = ax;
            (this._mapDirs[ay + 1][ax]).y = ay;
        }
            
        if (this.inMap(ax - 1, ay) && this._mapMask[ay][ax - 1] === this._freeCell) {
            console.log("goWater3")
            this._mapMask[ay][ax - 1] = WATER_KEY;
            (this._mapDirs[ay][ax - 1]).x = ax;
            (this._mapDirs[ay][ax - 1]).y = ay;
        }
    }

    inMap(ax, ay) {		
        if (ax >= 0 && ay < this._mapWidth && ay >= 0 && ay < this._mapHeight) {
            return true;
        } else {
            
            return false;
        }
    }

    getWay(start, end) { 
        var way = [];
        var p1 = new PIXI.Point(start.x, start.y);
        var p2 = new PIXI.Point();
        var errorCounter = 0;
        
        while (true) {
            p2.x = (this._mapDirs[p1.y][p1.x]).x; // Получаем новую точку из направления предыдущей
            p2.y = (this._mapDirs[p1.y][p1.x]).y;
            
            way.push(new PIXI.Point(p2.x, p2.y)); // Добавляем новую точку в маршрут
            p1.x = p2.x;
            p1.y = p2.y;
            
            // Проверяем не добрались ли до конца
            if (p1.x == end.x && p1.y == end.y) {
                break;
            }
            
            errorCounter++;
            if (errorCounter > 1000)
            {
                throw new Error("Can't build reverse of the path.");
            }
        }

        return way;
    }

    freeCell(value) {	
        this._freeCell = value;
    }

    maxIterations(value) {
        this._maxIterations = value;
    }
}