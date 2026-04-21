import { writable } from 'svelte/store';
import { Game } from './Game.js';

const startGrid = [
  [5, 3, null, null, 7, null, null, null, null],
  [6, null, null, 1, 9, 5, null, null, null],
  [null, 9, 8, null, null, null, null, 6, null],
  [8, null, null, null, 6, null, null, null, 3],
  [4, null, null, 8, null, 3, null, null, 1],
  [7, null, null, null, 2, null, null, null, 6],
  [null, 6, null, null, null, null, 2, 8, null],
  [null, null, null, 4, 1, 9, null, null, 5],
  [null, null, null, null, 8, null, null, 7, 9]
];

export function createGameStore() {
  const game = new Game(startGrid);
  const { subscribe, set } = writable(getState());

  function getState() {
    return {
      grid: game.grid,
      originalGrid: game.originalGrid,
      isWon: game.isWon,
      canUndo: game.canUndo,
      canRedo: game.canRedo
    };
  }

  function sync() {
    set(getState());
  }

  return {
    subscribe,
    guess: (r, c, v) => {
      game.guess(r, c, v);
      sync();
    },
    undo: () => {
      game.undo();
      sync();
    },
    redo: () => {
      game.redo();
      sync();
    }
  };
}

export const gameStore = createGameStore();
