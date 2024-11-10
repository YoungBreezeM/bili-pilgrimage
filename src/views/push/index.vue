<script setup lang="ts">
import { reactive, ref, onMounted, watch } from "vue";

import "vue-waterfall-plugin-next/dist/style.css";
import { useRoute, useRouter } from "vue-router";
import data from "@/assets/data.json";
import AiMap from "@/components/Map/index.vue";
import { push, uploadFile } from "@/api/mock";
defineOptions({
  name: "Demo"
});

const router = useRouter();
const route = useRoute();
const activeIndex = ref("list");
const radio = ref("1");
const fileList = reactive([]);
const pos = ref("");

onMounted(() => {
  //
  activeIndex.value = route.query.tabName ? route.query.tabName : "list";
  const { id, up_img } = route.query;
  if (up_img) {
    fileList.push({ url: up_img });
    let p = data.points.find(i => i.id === id);
    pos.value = p.name;
    form.value.img_url = up_img;
  }
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
const pushDataToLocalStorage = (key, newData) => {
  // 1. 从 localStorage 获取现有数据
  let data = localStorage.getItem(key);

  // 如果 data 为空，则初始化为一个空数组
  if (!data) {
    data = [];
  } else {
    // 如果 data 存在，解析为数组
    data = JSON.parse(data);
  }

  // 2. 使用 push() 添加新数据
  data.push(newData);

  // 3. 将更新后的数组存回 localStorage
  localStorage.setItem(key, JSON.stringify(data));
};
const toPushList = async () => {
  let res = await push({
    "row[title]": form.value.title,
    "row[content]": form.value.desc,
    "row[main_photo_url]": form.value.img_url
  });
  router.push("/point/list");
};

const toMy = () => {
  router.push("/my");
};
const toBack = () => {
  router.back();
};

const showBottom = ref(false);
const toMapMark = () => {
  showBottom.value = true;
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
const afterRead = file => {
  fileList.push(file);
  let formData = new FormData();
  formData.append("file", file.file);
  formData.append("filename", `${Date.now()}`);
  uploadFile(formData).then(res => {
    form.value.img_url = res.fullurl;
  });
};
const deleteFa = a => {
  console.log(a);
};
const form = ref({
  title: "",
  desc: "",
  id: 0,
  name: "",
  img_url: ""
});
</script>

<template>
  <div class="map">
    <div class="map-title">
      <van-icon name="cross" style="margin-left: 0.7rem" @click="toBack" />
      <van-button
        type="primary"
        round
        style="width: 20%; margin-left: 70%"
        @click="toPushList"
        >发布</van-button
      >
    </div>
    <div class="diff-imgs">
      <van-uploader
        v-model="fileList"
        multiple
        :after-read="afterRead"
        :deletable="false"
      />
    </div>
    <div>
      <van-cell-group inset>
        <van-field
          v-model="form.title"
          label=""
          placeholder="标题(选填,20 字以内)"
        />
        <van-field
          v-model="form.desc"
          rows="10"
          autosize
          label=""
          type="textarea"
          maxlength="50"
          placeholder="分享我的哔哩哔哩动态"
          show-word-limit
        />
      </van-cell-group>
    </div>
    <div style="margin: 2rem; color: #ccc">
      <p @click="toMapMark">
        <van-icon name="location" />
        <span v-if="!pos" style="margin-left: 0.5rem">圣地坐标</span>
        <span v-if="pos" style="margin-left: 0.5rem">{{ pos }}</span>

        <van-icon name="arrow" style="float: right" />
      </p>
      <p>
        <van-icon name="live" /><span style="margin-left: 0.5rem"
          >剧集图钉</span
        >
        <van-icon name="arrow" style="float: right" />
      </p>
    </div>
    <van-popup
      v-model:show="showBottom"
      position="bottom"
      :style="{ height: '80%' }"
    >
      <AiMap />
    </van-popup>
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
  margin: 2rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: left;
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
