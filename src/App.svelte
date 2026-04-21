<script>
  import { gameStore } from './gameStore.js';
  let selectedRow = 0;
  let selectedCol = 0;

  function selectCell(r, c) {
    selectedRow = r;
    selectedCol = c;
  }

  function inputNumber(num) {
    gameStore.guess(selectedRow, selectedCol, num);
  }

  function clearCell() {
    gameStore.guess(selectedRow, selectedCol, null);
  }
</script>

<main>
  <h1>数独游戏</h1>

  <div class="board">
    {#each $gameStore.grid as row, r}
      <div class="row">
        {#each row as cell, c}
          <div 
            class="cell { $gameStore.originalGrid[r][c] !== null ? 'fixed' : '' } { selectedRow === r && selectedCol === c ? 'selected' : '' }"
            on:click={() => selectCell(r, c)}
          >
            {cell ?? ''}
          </div>
        {/each}
      </div>
    {/each}
  </div>

  <div class="controls">
    <button on:click={gameStore.undo} disabled={!$gameStore.canUndo}>撤销</button>
    <button on:click={gameStore.redo} disabled={!$gameStore.canRedo}>重做</button>
    <button on:click={clearCell}>清空</button>
  </div>

  <div class="keypad">
    {#each [1,2,3,4,5,6,7,8,9] as num}
      <button on:click={() => inputNumber(num)}>{num}</button>
    {/each}
  </div>

  {#if $gameStore.isWon}
    <div class="win">🎉 恭喜通关！</div>
  {/if}
</main>

<style>
  main {
    max-width: 500px;
    margin: 0 auto;
    text-align: center;
  }
  .board {
    display: inline-block;
    border: 2px solid #333;
  }
  .row {
    display: flex;
  }
  .cell {
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }
  .cell.fixed {
    background: #eee;
    font-weight: bold;
  }
  .cell.selected {
    background: #e0f0ff;
  }
  .controls, .keypad {
    margin: 15px 0;
    display: flex;
    gap: 8px;
    justify-content: center;
  }
  button {
    padding: 8px 16px;
    cursor: pointer;
  }
  .win {
    font-size: 24px;
    color: green;
    margin-top: 20px;
  }
</style>
