// =========================================
// THEME MANAGER: Managing unique game scripts
// =========================================
import { initConstellationCanvas, stopConstellationCanvas, initDixitParallax, stopDixitParallax } from '../dixit/dixit.js';
import { initRummikubTiles, stopRummikubTiles } from '../rummikub/rummikub.js';

let currentGameId = null;

export function initGameThemeInteractions(gameId) {
    currentGameId = gameId;

    if (gameId === 'dixit') {
        initConstellationCanvas('game-canvas-bg');
        initDixitParallax();
    } 
    else if (gameId === 'rummikub') {
        initRummikubTiles();
    }
    
}

export function cleanupGameThemeInteractions() {
    if (currentGameId === 'dixit') {
        stopConstellationCanvas();
        stopDixitParallax();
    } 
    else if (currentGameId === 'rummikub') {
        stopRummikubTiles();
    }
    
    currentGameId = null;
}