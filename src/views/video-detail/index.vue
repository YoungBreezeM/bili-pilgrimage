<script setup lang="ts">
import { title } from "process";
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

const options = reactive({
  width: "800px", //播放器高度
  height: "450px", //播放器高度
  color: "#409eff", //主题色
  muted: false, //静音
  webFullScreen: false,
  speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
  autoPlay: false, //自动播放
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: false, //关灯模式
  volume: 0.3, //默认音量大小
  control: true, //是否显示控制器
  title: "", //视频名称
  src: "http://vjs.zencdn.net/v/oceans.mp4", //视频源
  poster: "" //封面
});
const onPlay = ev => {
  console.log("播放");
};
const onPause = ev => {
  console.log(ev, "暂停");
};

const onTimeupdate = ev => {
  console.log(ev, "时间更新");
};
const onCanplay = ev => {
  console.log(ev, "可以播放");
};
</script>

<template>
  <div class="home">
    <img src="/images/video-detail.png" />
    <div class="video-plane">
      <video controls class="video-player">
        <source
          src="https://www.w3schools.com/html/movie.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
    <div class="map-points">
      <div v-for="(item, index) in points" v-bind:key="index" class="map-box">
        1
      </div>
    </div>

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
.map-points {
  position: absolute;
  width: 100%;
  height: 40rem;
  top: 23rem;
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: center;
  background: white;
}

.map-box {
  width: 100%;
  border: 1px solid rebeccapurple;
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
</style>
