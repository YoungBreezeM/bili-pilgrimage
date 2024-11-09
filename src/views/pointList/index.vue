<script setup lang="ts">
import { reactive, ref, onMounted, watch } from "vue";
import { LazyImg, Waterfall } from "vue-waterfall-plugin-next";
import "vue-waterfall-plugin-next/dist/style.css";
import { useRoute, useRouter } from "vue-router";
import tabbar from "@/components/Tabbar/index.vue";
defineOptions({
  name: "Demo"
});

const router = useRouter();
const route = useRoute();
const activeIndex = ref("list");
onMounted(() => {
  //
  activeIndex.value = route.query.tabName ? route.query.tabName : "list";
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

const toMy = () => {
  router.push("/my");
};
const toBack = () => {
  router.back();
};
const toPointDetail = () => {
  router.push("/point/detail");
};
</script>

<template>
  <div class="map">
    <div class="map-title">
      <van-icon name="arrow-left" @click="toBack" />
      <van-search placeholder="搜索圣地" shape="round" style="width: 90%" />
    </div>
    <div v-if="activeIndex == 'list'" class="map-waterfall">
      <Waterfall
        :list="contentList"
        :breakpoints="breakpoints"
        backgroundColor="rgb(211, 211, 211)"
      >
        <template #default="{ item, url, index }">
          <div class="card" @click="toPointDetail">
            <LazyImg :url="item.url" />
            <div class="carf-desc">
              <p style="margin-left: 0.5rem">圣地巡礼</p>
              <p style="margin-left: 0.5rem">
                up xxx
                <span style="float: right; margin-right: 0.5rem">...</span>
              </p>
            </div>
          </div>
        </template>
      </Waterfall>
    </div>
    <div v-if="activeIndex == 'attention'" class="map-waterfall">地图</div>
    <tabbar />
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
  height: 25rem;
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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.map-waterfall {
  height: 60rem;
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
