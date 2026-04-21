# HW 问题收集
### 已解决
1. 啥是”标量derived store“ 有啥作用？
   1. **上下文**：Coding Agent 说：”UI 的棋盘、输入、Undo/Redo、胜利判断、分享编码全部直接读取领域对象公开接口；允许保留少量标量 derived store，但不再生成板级 view model。“
   2. **解决手段**：直接询问CA + 查看网页资料

2. Svelte 中 derived store 如何正确订阅与更新？
   1. **上下文**：在实现棋盘状态同步时，store 数据变更后 UI 不自动刷新
   2. **解决手段**：查阅 Svelte 官方文档，理解自动订阅规则，修复 $ 语法使用错误

3. Undo/Redo 与领域模型状态如何对齐？
   1. **上下文**：撤销重做后棋盘显示与内部状态不一致
   2. **解决手段**：梳理状态流转逻辑，确保所有操作走领域对象接口

---

### 未解决
1. 这个 sameArea 有啥用啊？
   1. **上下文**：`src/components/Board/index.svelte`
      ```javascript
      sameArea={$settings.highlightCells && !isSelected($cursor, x, y) && isSameArea($cursor, x, y)}
      ```
   2. **尝试解决手段**：问CA未果

2. 高亮开启后棋盘单元格渲染卡顿
   1. **上下文**：highlightCells 打开后大量单元格重绘，界面掉帧
   2. **尝试解决手段**：尝试拆分渲染、减少循环计算，优化效果有限

3. 光标为空时 isSelected / isSameArea 逻辑报错
   1. **上下文**：无选中状态下区域判断函数抛出异常
   2. **尝试解决手段**：增加空值防护仍未定位根本原因

---