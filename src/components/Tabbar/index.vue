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
        <van-button
          class="center-btn"
          icon="photograph"
          round
          @click="toPush"
        />
      </div>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const active = ref(0);
const tabbarData = reactive([
  {
    icon: "wap-home-o",
    title: "推荐",
    to: {
      name: "/pointlist"
    }
  },
  {
    icon: "fire-o",
    title: "热门",
    to: {
      name: "hot"
    }
  },
  {
    icon: "",
    title: "发布",
    to: {
      name: ""
    }
  },
  {
    icon: "bookmark-o",
    title: "关注",
    to: {
      name: "attention",
      query: {
        tabName: "attention"
      }
    }
  },
  {
    icon: "user-o",
    title: "我的",
    to: {
      name: "d-my"
    }
  }
]);
onMounted(() => {
  const route = useRoute();
  console.log(route.query);
});
const toPush = () => {
  router.push("/push");
};
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
  bottom: 0.5rem;
  z-index: 999;
}
</style>
