import {PathFinder} from '../../utils/PathFinder2'

export class WaveCreator {
    constructor(universe, way) {
        this.pf = new PathFinder();
        this.universe = universe;
        this.isStart = false;
    }

    init(waves, map) {
        this.isStart = true;
        this.currInterval = 0;
        this.currentWave = 0;
        this.waves = {...waves};
        this.way = this.pf.getWay(map);
    }

    addEnemy(className) {
        const solder = new className(this.universe);
        solder.init(this.way);
    }

    update() {
        if (!this.isStart) return;
        const config = this.waves[this.currentWave];

        if (this.currInterval === config.interval && config.count > 0) {
            config.count--;
            this.currInterval = 0;
            this.addEnemy(config.type); 
        } else if (config.count < 0 && config.delay > 0) {
            config.delay--;
        } else if(config.delay < 0) { // NEW WAVE
            this.currentWave++;
            this.currInterval = 0;
        } else if (this.currentWay === this.way.length) { // LEVEL COMPLETE
            //console.log("LEVEL COMPLETE");
            this.isStart = false;
        } else {
            this.currInterval++
        }  
    }
}  