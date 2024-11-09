<script setup lang="ts">
import { title } from "process";
import { reactive, ref } from "vue";
import { LazyImg, Waterfall } from "vue-waterfall-plugin-next";
import "vue-waterfall-plugin-next/dist/style.css";

defineOptions({
  name: "Demo"
});
import { useRouter } from "vue-router";

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

const points = reactive([
  { title: "xx", time: "01:02" },
  { title: "xx", time: "01:02" },
  { title: "xx", time: "01:02" },
  { title: "xx", time: "01:02" }
  //   { title: "xx" },
  //   { title: "xx" },
  //   { title: "xx" },
  //   { title: "xx" }
]);

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
const toMap = () => {
  router.push({ name: "/map" });
};
</script>

<template>
  <div class="home">
    <img src="/images/video.png" />
    <div class="video-plane">
      <video controls class="video-player">
        <source
          src="https://www.w3schools.com/html/movie.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>

    <van-floating-panel
      v-model:height="height"
      :anchors="anchors"
      @height-change="watchHeight"
    >
      <template #header>
        <div class="custom-header">
          <div class="show-title">圣地巡礼</div>
        </div>
      </template>
      <div v-if="isShow" class="map-points">
        <div v-for="(item, index) in points" v-bind:key="index" class="map-box">
          <div map-box-left>
            <img class="map-box-left-img" src="/images/2233s.jpeg" />
          </div>
          <div class="map-box-content" @click="toMap">
            <p>城市</p>
            <p class="desc" style="color: rgb(142, 142, 141)">具体地址</p>
            <p class="desc" style="margin-top: 1rem">
              <van-icon name="location-o" />568人去过
            </p>
          </div>
          <div class="map-box-right">
            <van-icon name="like" />
          </div>
        </div>
      </div>
      <div v-if="!isShow" class="points">
        <!-- <div>proccessing</div> -->

        <div class="point-box">
          <div
            v-for="(item, index) in points"
            v-bind:key="index"
            class="point-item"
            @click="toMap"
          >
            <p>{{ item.time }}</p>
            <p>{{ item.title }}</p>
          </div>
        </div>
      </div>
    </van-floating-panel>

    <!-- <van-button class="my" type="primary" />
    <van-button class="detail" type="primary" /> -->
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

.video-plane {
  position: absolute;
  width: 100%;
  height: 15.5rem;
  top: 3.8rem;
  z-index: 99;
  background: white;
}
.video-player {
  width: 100%;
  height: 15rem;
}
.points {
  position: absolute;
  width: 100%;
  background: rgb(210, 209, 212);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.point-box {
  display: flex;
  flex-direction: row;
  overflow-y: auto;
  width: 100%;
  justify-content: flex-start; /* 左对齐 */
  width: 100%;
  max-height: 100px;
}

.show-title {
  height: 2rem;
  margin: 2px;
}

.point-item {
  width: 7rem;
  height: 5rem;
  background: white;
  border-radius: 3px;
  margin: 5px;
  flex-shrink: 0; /* 禁止压缩 */
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
.desc {
  font-size: 0.8rem;
}
.map-points {
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: center;
  background: white;
}
.map-box {
  width: 100%;
  height: 6rem;
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
}

.map-box-left {
  width: 45%;
}
.map-box-left-img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}

.map-box-content {
  width: 45%;
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
}

.map-box-right {
  width: 15%;
  font-size: 2rem;
  color: #f69;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
