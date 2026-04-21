# Homework 1.1 设计文档

## 一、领域对象如何被消费
1.  View 层直接消费 `gameStore`（Svelte Writable Store），而非直接使用 `Sudoku` / `Game`。
2.  View 层获取的数据：
    - `grid`：当前棋盘状态
    - `originalGrid`：初始棋盘（标记固定数字）
    - `isWon`：是否通关
    - `canUndo` / `canRedo`：撤销/重做按钮状态
3.  用户操作流程：
    - 点击格子 → 选中坐标
    - 输入数字/清空 → 调用 `gameStore.guess()`
    - 撤销/重做 → 调用 `gameStore.undo()` / `gameStore.redo()`
    所有核心逻辑都在领域对象中完成，UI仅负责调用方法和渲染。
4.  界面自动更新原理：
    每次操作后，store会调用 `set()` 推送新状态；Svelte通过 `$gameStore` 语法自动订阅状态变化，触发界面重新渲染。

---

## 二、响应式机制说明
1.  依赖的Svelte机制：`writable store` + `$` 订阅语法。
2.  暴露给UI的响应式数据：`grid`、`originalGrid`、`isWon`、`canUndo`、`canRedo`。
3.  内部隐藏状态：`Sudoku` 的私有 `grid`、`Game` 的 `history` 和 `currentStep`，完全封装，UI不可直接修改。
4.  直接修改对象内部的问题：
    如果跳过store直接修改 `Sudoku` 或 `Game` 的内部状态，Svelte无法检测到对象内部属性的变化，界面不会刷新。必须通过store的 `set()` 方法替换整个状态对象，才能触发响应式更新。

---

## 三、相比HW1的改进
1.  职责边界更清晰：
    - `Sudoku`：仅负责棋盘数据管理、规则校验和状态快照
    - `Game`：负责游戏流程、历史记录和Undo/Redo
    - `gameStore`：作为适配层，将领域对象转为Svelte可消费的响应式状态
2.  解决了HW1中领域对象与UI隔离的问题，通过store实现了真正的双向联动
3.  改进了历史状态的存储方式，使用深拷贝快照避免了引用污染，Undo/Redo逻辑更稳定
4.  增加了原始棋盘保护，禁止用户修改题目自带的数字，更符合数独规则
