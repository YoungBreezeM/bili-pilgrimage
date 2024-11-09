<script setup lang="ts">
import { reactive, ref, onMounted, watch } from "vue";
import { LazyImg, Waterfall } from "vue-waterfall-plugin-next";
import "vue-waterfall-plugin-next/dist/style.css";
import { useRoute, useRouter } from "vue-router";
import tabbar from "@/components/Tabbar/index.vue";
import data from "@/assets/data.json";
defineOptions({
  name: "Demo"
});
const checked = ref("1");
const router = useRouter();
const route = useRoute();
const activeIndex = ref("list");
const radio = ref("1");
const oldimgUrl = ref("");
onMounted(() => {
  //
  activeIndex.value = route.query.tabName ? route.query.tabName : "list";
  const { id } = route.query;
  let p = data.points.find(i => i.id == id);
  console.log(p.img_url);
  oldimgUrl.value = p.img_url;
});

watch(
  () => route.fullPath,
  (newPath, oldPath) => {
    if (newPath !== oldPath) {
      activeIndex.value = route.query.tabName ? route.query.tabName : "list";
      // 路由变化时触发的逻辑
    }
  }
);
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

const toVideo = () => {
  router.push("/video");
};

const toList = () => {
  router.push("/point/list");
};
const toBack = () => {
  router.back();
};
const toPointDetail = () => {
  router.push("/point/detail");
};
const imageUrl = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

// 触发文件选择框
const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

// 处理图片上传
const onImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files ? input.files[0] : null;

  if (file) {
    const reader = new FileReader();

    reader.onload = () => {
      imageUrl.value = reader.result as string;
    };

    reader.readAsDataURL(file);
  }
};
</script>

<template>
  <div class="map">
    <div class="map-title">
      <van-icon name="arrow-left" style="margin-left: 0.7rem" @click="toBack" />
    </div>
    <div class="diff-imgs">
      <img class="diff-img" :src="oldimgUrl" />
      <div class="diff-img up-img" @click="triggerFileInput">
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          style="display: none"
          @change="onImageUpload"
        />
        <img
          v-if="imageUrl"
          :src="imageUrl"
          style="width: 100%; height: 100%"
        />
        <van-icon v-if="!imageUrl" name="plus" />
      </div>
    </div>
    <div class="push">
      <p style="display: flex; justify-content: left; align-items: center">
        <span
          ><van-radio-group v-model="checked" bind:change="onChange">
            <van-radio name="1" checked-color="#f69" /> </van-radio-group
        ></span>
        <span style="font-size: 0.9rem; margin-left: 0.5rem"
          >我已阅读并接受</span
        >
        <span style="color: #f69; font-size: 0.9rem">《哔哩哔哩社区公约》</span>
      </p>
      <p
        style="
          display: flex;
          justify-content: left;
          align-items: center;
          margin-top: 1rem;
        "
      >
        <van-button round style="width: 30%">存本地</van-button>
        <van-button
          type="primary"
          round
          style="width: 65%; margin-left: 1rem"
          @click="toList"
          >发布</van-button
        >
      </p>
      <p style="color: #ccc; font-size: 0.8rem; margin-top: 2rem">
        若存在非官方商业合作，需要前往电脑网页端投稿并进行商业声...
      </p>
    </div>
  </div>
</template>

<style scoped>
.map {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #c8c5c5;
}

.map-content {
  width: 100%;
  height: 25rem;
  border: 1px solid #ccc;
}

.map-detail {
  padding: 0.5rem;
  border: 1px solid #c8c5c5;
  display: flex;
  align-items: center;
}
.push {
  width: 100%;
  height: 12rem;
  background: white;
  position: absolute;
  bottom: 0px;
  padding: 1rem;
}
.item {
  margin-bottom: 16px;
  overflow: hidden;
}

.diff-imgs {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.diff-img {
  width: 95%;
  height: 15rem;
  margin: 0.5rem;
  border-radius: 5px;
}

.map-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  height: 4rem;
  background-color: white;
}
.map-waterfall {
  height: 60rem;
  overflow-y: auto;
}
img {
  width: 100%;
  height: auto;
}
.up-img {
  border: 2px dashed #a0a0a0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  color: #a0a0a0;
  cursor: pointer;
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
