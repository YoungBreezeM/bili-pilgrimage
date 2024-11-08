<template>
  <van-tabbar
    v-model="active"
    :placeholder="true"
    :route="true"
    fixed
    class="tabbar"
  >
    <van-tabbar-item
      v-for="(item, index) in tabbarData"
      :key="index"
      :icon="item.icon"
      :to="item.to"
    >
      <div v-if="index === 2">
        <van-button class="center-btn" icon="plus" />
      </div>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

const active = ref(0);
const tabbarData = reactive([
  {
    icon: "wap-home-o",
    title: "首页",
    to: {
      name: "Demo"
    }
  },
  {
    icon: "fire-o",
    title: "动态",
    to: {
      name: "Tools"
    }
  },
  {
    icon: "",
    title: "添加",
    to: {
      name: "Tools"
    }
  },
  {
    icon: "gift-o",
    title: "会员购",
    to: {
      name: "About"
    }
  },
  {
    icon: "user-o",
    title: "我的",
    to: {
      name: "About"
    }
  }
]);
</script>
<style scoped>
/* 定义 Tabbar 的样式 */
.custom-tabbar-item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  margin-top: -20px; /* 使按钮稍微浮动到上面 */
}

.center-btn {
  color: white;
  background-color: #f69; /* 中间按钮的背景色 */
  position: relative;
  bottom: 10px;
  z-index: 999;
}
</style>
