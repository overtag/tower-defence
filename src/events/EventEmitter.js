import *as PIXI from 'pixi.js';

export const eventEmitter = new PIXI.utils.EventEmitter(); 
export const EVENTS = {
    START_GAME: 'START_GAME',
    SHOW_BUILD_GRID: 'SHOW_BUILD_GRID',
    HIDE_BUILD_GRID: 'HIDE_BUILD_GRID'
}