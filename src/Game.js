import { Sudoku } from './Sudoku.js';

export class Game {
  constructor(initialGrid) {
    this.sudoku = new Sudoku(initialGrid);
    this.history = [this.sudoku.snapshot()];
    this.currentStep = 0;
  }

  guess(row, col, value) {
    const ok = this.sudoku.guess(row, col, value);
    if (!ok) return false;

    this.history = this.history.slice(0, this.currentStep + 1);
    this.history.push(this.sudoku.snapshot());
    this.currentStep++;
    return true;
  }

  undo() {
    if (this.currentStep <= 0) return false;
    this.currentStep--;
    this.sudoku.restore(this.history[this.currentStep]);
    return true;
  }

  redo() {
    if (this.currentStep >= this.history.length - 1) return false;
    this.currentStep++;
    this.sudoku.restore(this.history[this.currentStep]);
    return true;
  }

  get grid() { return this.sudoku.grid; }
  get originalGrid() { return this.sudoku.originalGrid; }
  get isWon() { return this.sudoku.isWon(); }
  get canUndo() { return this.currentStep > 0; }
  get canRedo() { return this.currentStep < this.history.length - 1; }
}
