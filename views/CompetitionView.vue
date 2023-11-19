<template>
  <div class="split-container">
    <div class="left-panel" :style="{ width: leftWidth + 'px' }">
      <!-- 左侧页面内容 -->
    </div>
    <div
      class="separator"
      @mousedown="startDrag"
      @mouseup="stopDrag"
      @mousemove="doDrag"
    >
      <button class="drag-handle"></button>
    </div>
    <div class="right-panel" :style="{ width: rightWidth + 'px' }">
      <!-- 右侧页面内容 -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isDragging = ref(false);
const startX = ref(0);
// 在 setup 函数中设置初始的 leftWidth 和 rightWidth
const leftWidth = ref(window.innerWidth * 0.45); // 左侧宽度占45%
const rightWidth = ref(window.innerWidth * 0.55); // 右侧宽度占55%

const startDrag = (e: MouseEvent) => {
  isDragging.value = true;
  startX.value = e.clientX;
};

const stopDrag = () => {
  isDragging.value = false;
};

const doDrag = (e: MouseEvent) => {
  if (isDragging.value) {
    const offset = e.clientX - startX.value;
    leftWidth.value += offset;
    rightWidth.value -= offset;
    startX.value = e.clientX;
  }
};
</script>

<style scoped>
.split-container {
  display: flex;
}

.left-panel,
.right-panel {
  height: 100vh;
  overflow: auto;
  border: 1px solid #ebeef5;
  background-color: #f7f7f7;
}

.separator {
  position: relative;
  height: 100%;
  user-select: none; /* 防止选中文本 */
  touch-action: none; /* 禁止触摸事件的默认行为 */
  will-change: width; /* 告诉浏览器该元素的 width 属性将会发生改变 */
  transition: width 0.2s ease; /* 添加过渡效果 */
}
.drag-handle {
  position: absolute;
  top: 50%;
  left: -5px; /* 将按钮左移一半长度，使其居中 */
  width: 10px;
  height: 30px;
  margin-top: -15px; /* 上移按钮一半高度，使其居中 */
  cursor: col-resize;
  background-color: #ddd;
  border: none;
}
</style>
