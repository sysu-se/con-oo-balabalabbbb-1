export class Sudoku {
  constructor(initialGrid) {
    this.originalGrid = JSON.parse(JSON.stringify(initialGrid));
    this.grid = JSON.parse(JSON.stringify(initialGrid));
  }

  guess(row, col, value) {
    if (this.originalGrid[row][col] !== null) return false;
    if (value !== null && (value < 1 || value > 9)) return false;
    this.grid[row][col] = value;
    return true;
  }

  isWon() {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const v = this.grid[r][c];
        if (v === null || !this.isValid(r, c, v)) return false;
      }
    }
    return true;
  }

  isValid(row, col, value) {
    for (let c = 0; c < 9; c++) {
      if (c !== col && this.grid[row][c] === value) return false;
    }
    for (let r = 0; r < 9; r++) {
      if (r !== row && this.grid[r][col] === value) return false;
    }
    const br = Math.floor(row / 3) * 3;
    const bc = Math.floor(col / 3) * 3;
    for (let r = br; r < br + 3; r++) {
      for (let c = bc; c < bc + 3; c++) {
        if ((r !== row || c !== col) && this.grid[r][c] === value) return false;
      }
    }
    return true;
  }

  snapshot() {
    return JSON.parse(JSON.stringify(this.grid));
  }

  restore(state) {
    this.grid = JSON.parse(JSON.stringify(state));
  }
}
