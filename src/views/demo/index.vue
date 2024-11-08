<script setup lang="ts">
import { reactive, ref } from "vue";
import { LazyImg, Waterfall } from "vue-waterfall-plugin-next";
import "vue-waterfall-plugin-next/dist/style.css";

defineOptions({
  name: "Demo"
});

const contentList = reactive([
  { id: 1, url: "/images/2233.jpg", width: 100, height: 150 },
  { id: 2, url: "/images/2233.jpg", width: 120, height: 200 },
  { id: 3, url: "/images/2233.jpg", width: 150, height: 180 },
  { id: 4, url: "/images/2233.jpg", width: 140, height: 160 },
  { id: 4, url: "/images/2233.jpg", width: 140, height: 160 },
  { id: 1, url: "/images/2233.jpg", width: 100, height: 150 },
  { id: 2, url: "/images/2233.jpg", width: 120, height: 200 },
  { id: 3, url: "/images/2233.jpg", width: 150, height: 180 },
  { id: 4, url: "/images/2233.jpg", width: 140, height: 160 },
  { id: 4, url: "/images/2233.jpg", width: 140, height: 160 }
  // 更多数据...
]);

const breakpoints = reactive({
  1200: {
    // when wrapper width < 1200
    rowPerView: 3
  },
  800: {
    // when wrapper width < 800
    rowPerView: 2
  },
  500: {
    // when wrapper width < 500
    rowPerView: 2
  }
});
//
const active = ref(0);
</script>

<template>
  <div class="home">
    <van-tabs v-model:active="active">
      <van-tab v-for="index in 8" v-bind:key="index" :title="'标签 ' + index">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item> <img src="/images/2233s.jpeg" /> </van-swipe-item>
          <van-swipe-item><img src="/images/2233s.jpeg" /></van-swipe-item>
          <van-swipe-item><img src="/images/2233s.jpeg" /></van-swipe-item>
          <van-swipe-item><img src="/images/2233s.jpeg" /></van-swipe-item>
        </van-swipe>
        <Waterfall
          :list="contentList"
          :breakpoints="breakpoints"
          backgroundColor="rgb(211, 211, 211)"
        >
          <template #default="{ item, url, index }">
            <div class="card">
              <LazyImg :url="item.url" />
              <p class="text">这是具体内容</p>
            </div>
          </template>
        </Waterfall>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  height: 100vh;
}

.item {
  margin-bottom: 16px;
  overflow: hidden;
}

img {
  width: 100%;
  height: auto;
}
.card {
  background: white;

  color: black;
}
.waterfall-item {
  border-radius: 5px;
}

.my-swipe {
}
/* .lazy__img[lazy="loading"] {
  padding: 5em 0;
  width: 48px;
}

.lazy__img[lazy="loaded"] {
  width: 100%;
}

.lazy__img[lazy="error"] {
  padding: 5em 0;
  width: 48px;
} */
</style>
