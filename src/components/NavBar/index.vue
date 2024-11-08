<script setup lang="ts">
import { useDarkMode, useToggleDarkMode } from "@/hooks/useToggleDarkMode";

const onClickRight = (event: TouchEvent | MouseEvent) => {
  useToggleDarkMode(event);
};
</script>

<template>
  <van-nav-bar
    fixed
    placeholder
    style="height: 65px"
    @click-right="onClickRight"
  >
    <template #left>
      <div class="header">
        <van-image
          round
          width="2rem"
          height="2rem"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
        <van-search placeholder="请输入搜索关键词" shape="round" />
        <div class="features">
          <van-icon class="feature-item" name="goods-collect-o" size="2rem" />
          <van-icon name="envelop-o" size="2rem" />
        </div>
      </div>
    </template>
  </van-nav-bar>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
}
.features {
  display: flex;
  align-items: center;
  justify-content: center;
}
.feature-item {
  margin: 8px;
}
</style>
