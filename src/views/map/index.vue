<script setup lang="ts">
import { reactive, ref } from "vue";
import { LazyImg, Waterfall } from "vue-waterfall-plugin-next";
import "vue-waterfall-plugin-next/dist/style.css";
import { useRouter, useRoute } from "vue-router";
import Map from "@/components/Map/index.vue";
import data from "@/assets/data.json";
defineOptions({
  name: "Demo"
});

const router = useRouter();
const route = useRoute();

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
  router.push({ path: "/push/same", query: route.query });
};
const anchors = [
  245,
  Math.round(0.4 * window.innerHeight),
  Math.round(0.68 * window.innerHeight)
];
const height = ref(anchors[0]);
const isShow = ref(false);
const watchHeight = data => {
  console.log(data);
  if (data.height >= Math.round(0.68 * window.innerHeight)) {
    console.log("进入");
    isShow.value = true;
  } else {
    isShow.value = false;
  }
};
const toBack = () => {
  router.back();
};
</script>

<template>
  <div class="map">
    <van-icon name="arrow-left" style="font-size: 2rem" @click="toBack" />
    <div class="map-title">
      <p style="font-size: 1.5rem">
        上海市<span
          style="
            font-size: 0.8rem;
            background: #ccc;
            padding: 0.2rem;
            margin-left: 0.5rem;
          "
          >动漫场景</span
        >
      </p>
      <p style="font-size: 0.8rem; color: #c8c5c5">Shanghai</p>
      <p>开放时间 周一至周日 12:00-18:00</p>
    </div>
    <div class="map-content">
      <Map />
    </div>
    <van-floating-panel
      v-model:height="height"
      :anchors="anchors"
      @height-change="watchHeight"
    >
      <template #header>
        <div class="custom-header">
          <div class="map-detail">
            <span><van-icon name="location" />人数66.6万人去过</span>
            <van-button
              style="margin-left: 10rem; color: white"
              type="primary"
              size="small"
              @click="toPushSame"
              >拍同款</van-button
            >
          </div>
        </div>
      </template>
      <div class="map-waterfall">
        <Waterfall
          :list="data.points"
          :breakpoints="breakpoints"
          backgroundColor="rgb(211, 211, 211)"
        >
          <template #default="{ item, url, index }">
            <div class="card">
              <LazyImg :url="item.img_url" />
              <div class="carf-desc">
                <p style="margin-left: 0.5rem">{{ item.name }}</p>
                <p style="margin-left: 0.5rem">
                  [up] {{ item.username }}
                  <span style="float: right; margin-right: 0.5rem">...</span>
                </p>
              </div>
            </div>
          </template>
        </Waterfall>
      </div>
    </van-floating-panel>
  </div>
</template>

<style scoped>
.map {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.map-content {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
}

.map-detail {
  padding: 0.5rem;
  border: 1px solid #c8c5c5;
  display: flex;
  align-items: center;
}

.item {
  margin-bottom: 16px;
  overflow: hidden;
}
.map-title {
  margin: 1rem;
}
.map-waterfall {
  height: 50rem;
  overflow-y: auto;
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
  height: 13rem;
  top: 24rem;
  background-color: transparent !important;
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
