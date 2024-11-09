<script setup lang="ts">
import { reactive, ref } from "vue";
import { LazyImg, Waterfall } from "vue-waterfall-plugin-next";
import "vue-waterfall-plugin-next/dist/style.css";
import { useRouter } from "vue-router";
defineOptions({
  name: "Demo"
});

const router = useRouter();

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
const toVideo = () => {
  router.push("/video");
};

const toPushSame = () => {
  router.push("/push/same");
};
</script>

<template>
  <div class="home">
    <img src="/images/point-detail.png" />
    <!-- <van-button class="my" type="primary" @click="toMy" /> -->
    <div class="detail" type="primary" @click="toVideo">
      <div class="desc">
        <div class="desc-left">
          <p>
            <van-icon name="location" color="#f69" /><span
              style="font-weight: 900"
              >北京 故宫博物院- 4.9 分</span
            >
          </p>
          <p style="color: #ccc; font-size: 0.9rem">博物馆东城区</p>
        </div>
        <div class="desc-right">
          <p style="font-size: 1.2rem">
            <van-icon name="star-o" /><span> 12.7 万</span>
          </p>
          <p>
            <van-button type="primary" @click="toPushSame">拍同款</van-button>
          </p>
        </div>
      </div>
    </div>
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

.my {
  position: absolute;
  width: 5rem;
  height: 5rem;
  bottom: 1rem;
  right: 0.5rem;
  z-index: 99;
  background-color: transparent !important;
}
.detail {
  position: absolute;
  width: 100%;
  height: 10rem;
  top: 35rem;
  background: white;
  padding: 0.5rem;
}
.desc {
  width: 100%;
  height: 100%;
  display: flex;
  border-radius: 5px;
  flex-direction: row;
  background: rgba(249, 246, 250, 0.887);
}
.desc-left {
  width: 70%;
  padding: 1rem;
}
.desc-right {
  width: 30%;
  padding: 1rem;
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
