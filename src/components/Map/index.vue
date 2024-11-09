<template>
  <div id="container">
    <div class="button-container">
      <button @click="planRoute">圣地巡礼规划</button>
    </div>
    <div class="travel-info">{{ traveintroduction }}</div>
  </div>
  <!-- <button @click="callTextToSpeech('哔哩哔哩干杯～')">AI语音</button> -->
  <audio ref="audio" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watchEffect } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

defineOptions({
  name: "FindMap"
});

let map = null;
let driving = null;
let routePolyline;
let currentPosition = null;
let traveintroduction = ref(null);
let prompt = null;
let audio_base64 = ref(null);
let audio = ref(null);
let isAudioPlaying = false;

const playAudio = () => {
  const audioElement = audio.value;
  if (audioElement && audio_base64.value && !isAudioPlaying) {
    isAudioPlaying = true;
    audioElement.src = audio_base64.value;
    audioElement.onended = () => {
      audioElement.src = "";
      isAudioPlaying = false;
    };
    audioElement.play();
  }
};

async function callDoubaoChat(prompt) {
  try {
    const response = await fetch("http://127.0.0.1:2233/doubao_chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: prompt })
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      traveintroduction.value = data["content"];
      return traveintroduction.value;
    } else {
      console.error("Error in response:", response.status);
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function callTextToSpeech(text) {
  try {
    const response = await fetch("http://127.0.0.1:2233/text-to-speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: text })
    });
    if (response.ok) {
      const data = await response.json();

      audio_base64.value = "data:audio/wav;base64," + data["result"]["Audio"];
      // 这里你可以根据接口返回的内容进一步处理，比如播放语音等，当前只是打印结果
    } else {
      console.error("Error in response:", response.status);
    }
  } catch (error) {
    console.error(error);
  }
}

function getDistance(point1, point2) {
  const [lon1, lat1] = point1;
  const [lon2, lat2] = point2;
  const R = 6371; // 地球半径（千米）
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function tspGreedy(currentPosition, attractions) {
  let unvisited = attractions.slice();
  let path = [];
  let current = currentPosition;
  while (unvisited.length > 0) {
    let nearestIndex = 0;
    let minDistance = getDistance(current, unvisited[0].slice(0, 2));
    for (let i = 1; i < unvisited.length; i++) {
      const distance = getDistance(current, unvisited[i].slice(0, 2));
      if (distance < minDistance) {
        minDistance = distance;
        nearestIndex = i;
      }
    }
    path.push(unvisited[nearestIndex]);
    current = unvisited[nearestIndex].slice(0, 2);
    unvisited.splice(nearestIndex, 1);
  }
  path.push(currentPosition);
  return path;
}

let shanghaiAttractions = [
  [
    121.5017,
    31.2418,
    "上海迪士尼乐园",
    "中国大陆第一家迪士尼主题公园，拥有丰富多彩的游乐设施、表演和娱乐活动，以及经典的卡通人物、主题餐厅和商店等",
    "https://example.com/shanghaidisney.jpg",
    "全年，春季和秋季气候较为适宜，游玩体验更好"
  ],
  [
    121.4997,
    31.2399,
    "上海外滩",
    "上海的标志性建筑群，可以欣赏到黄浦江两岸的现代化建筑和历史建筑，以及远处的东方明珠塔等标志性建筑",
    "https://example.com/shanghaiwaitan.jpg",
    "全年，夜晚灯光亮起时景色更美"
  ],
  [
    121.4817,
    31.2324,
    "豫园",
    "一座传统的园林建筑，拥有精美的园林景观和古建筑，以及传统的艺术展览和表演，可感受中国古代文化的魅力",
    "https://example.com/yuyuan.jpg",
    "全年，春季繁花盛开，秋季气候凉爽，都适合游览"
  ],
  [
    121.5427,
    31.2155,
    "上海科技馆",
    "中国最大的科技博物馆之一，展示了科学和技术的最新成果，拥有丰富的展品和交互式展览",
    "https://example.com/shanghaikejiguan.jpg",
    "全年，适合亲子游玩，可根据孩子的假期安排"
  ],
  [
    121.508,
    31.249,
    "上海中心大厦",
    "上海的标志性建筑，拥有高空观景台、空中游览等项目，可欣赏上海市的城市风光和现代化建筑",
    "https://example.com/shanghaizhongxin.jpg",
    "全年，天气晴朗时视野更好"
  ],
  [
    121.4972,
    31.2421,
    "东方明珠",
    "上海的标志性建筑，高度468米，拥有高空观景台、旋转餐厅等项目，可欣赏上海市的城市风光和黄浦江的美景",
    "https://example.com/dongfangmingzhu.jpg",
    "全年，建议选择晴朗的白天或夜晚前往"
  ],
  [
    121.3623,
    31.3148,
    "南翔古镇",
    "一座保存完好的古代水镇，有着独特的建筑风格和历史文化遗产，可体验传统的古镇文化和美食",
    "https://example.com/nanxiangguzhen.jpg",
    "全年，春季和秋季气候适宜，游玩更惬意"
  ],
  [
    121.4804,
    31.2705,
    "上海杜莎夫人蜡像馆",
    "由著名的蜡像制作公司杜莎夫人蜡像馆所建的博物馆，展示了众多名人、历史人物和文化名人的蜡像雕塑",
    "https://example.com/shanghaiyingsu.jpg",
    "全年，适合对名人蜡像感兴趣的游客"
  ],
  [
    121.4867,
    31.2544,
    "南京路步行街",
    "中国最著名的商业街之一，街道两旁矗立着各种风格的历史建筑以及形形色色的国际名牌店铺",
    "https://example.com/nanjinglu.jpg",
    "全年，适合购物和感受上海的繁华氛围"
  ],
  [
    121.4647,
    31.2523,
    "静安寺",
    "上海著名的佛教寺庙，建筑风格独特，寺内有许多珍贵的文物和佛像，周边还有许多特色小店和美食",
    "https://example.com/jingansi.jpg",
    "全年，但春节等传统节日期间可能会有更多的活动和特色"
  ]
];

onMounted(() => {
  window._AMapSecurityConfig = {
    securityJsCode: "4ef0c1841d550126d81b7fcb534ed01e"
  };
  AMapLoader.load({
    key: "9a1a658adf3d5e0dd51431e0ed9d4f32",
    version: "2.0",
    plugins: ["AMap.Scale", "AMap.Geolocation", "AMap.Driving"]
  })
    .then(AMap => {
      map = new AMap.Map("container", {
        viewMode: "3D",
        zoom: 11
      });

      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
        convert: true,
        showButton: true,
        buttonPosition: "RB",
        buttonOffset: new AMap.Pixel(10, 20),
        showMarker: true,
        showCircle: true,
        panToLocation: true,
        zoomToAccuracy: true
      });
      map.addControl(geolocation);

      geolocation.getCurrentPosition((status, result) => {
        if (status === "complete") {
          currentPosition = result.position;
          console.log("用户位置:", currentPosition);
          map.setCenter(currentPosition);
        } else {
          console.log("定位失败：" + result.message);
        }
      });

      driving = new AMap.Driving({
        map: map
      });

      shanghaiAttractions.forEach(attraction => {
        const markerContent = `
        <div class="custom-marker">
          <style>
       .custom-marker {
                width: 128px;
                height: auto;
                text-align: left;
                background-color: white;
                border: 1px solid gray;
                border-radius: 5px;
                padding: 5px;
                font-family: Arial, sans-serif;
              }

       .marker-title {
                font-size: 10px;
                margin-top: 0;
                margin-bottom: 3px;
              }

       .marker-image {
                width: 128px;
                height: auto;
                object-fit: cover;
                margin: 5px 0;
                border: 1px solid lightgray;
                border-radius: 3px;
                box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
              }

       .marker-description {
                font-size: 8px;
                margin-top: 2px;
                margin-bottom: 0;
              }
          </style>
          <h3 class="marker-title">${attraction[2]}</h3>
          <img src=${"https://img1.baidu.com/it/u=3642492906,915872984&fm=253&fmt=auto&app=120&f=JPEG?w=888&h=500"} alt="Marker图片" width="256" class="marker-image">
          <p class="marker-description">${attraction[3]}</p>
        </div>
      `;

        const marker = new AMap.Marker({
          position: new AMap.LngLat(attraction[0], attraction[1]),
          content: markerContent
        });
        map.add(marker);
      });
    })
    .catch(e => {
      console.log(e);
    });
});

const planRoute = () => {
  const start = new AMap.LngLat(currentPosition.lng, currentPosition.lat);
  const end = new AMap.LngLat(
    shanghaiAttractions[0][0],
    shanghaiAttractions[0][1]
  );
  shanghaiAttractions = tspGreedy(
    [currentPosition.lng, currentPosition.lat],
    shanghaiAttractions
  );
  const waypoints = shanghaiAttractions.slice(1).map(attraction => {
    return new AMap.LngLat(attraction[0], attraction[1]);
  });

  const opts = {
    waypoints: waypoints
  };

  driving.search(start, start, opts, (status, result) => {
    console.log(waypoints);
    if (status === "complete") {
      if (result.info === "OK") {
        console.log(result);
        const path = result.routes[0].path;
        routePolyline = new AMap.Polyline({
          path: path,
          strokeColor: "#3366FF",
          strokeWeight: 6
        });
        map.add(routePolyline);
      } else {
        console.log("路径规划失败：" + result.info);
      }
    } else {
      console.log("路径规划失败：" + status);
    }
  });

  let travelist = "";
  shanghaiAttractions.forEach(attraction => {
    console.log(attraction[2]);
    travelist = travelist + attraction[2] + ",";
  });
  prompt = `艾莉娅的性格具有多面性，以下是其主要特点：
  阳光元气：艾莉娅充满活力，给人一种朝气蓬勃的感觉，能够将积极向上的情绪传递给周围的人，让身边的人感受到她的热情与活力.
  热情热心：她对人十分热情，乐于助人，当别人遇到困难时，会积极主动地提供帮助，并且在帮忙的过程中尽心尽力，体现出她善良友好的一面.
  冒失可爱：艾莉娅有时会表现得有些冒失，做事不够细心谨慎，从而导致一些小失误或意外情况的发生，但正是这种冒失的性格特点，让她显得更加真实和可爱，也为其角色增添了不少趣味性和萌点.
  乐观积极：在面对各种事情时，艾莉娅通常保持着乐观的心态，不会轻易被困难和挫折打败，而是以积极的态度去应对，努力寻找解决问题的方法.
  偶尔撒娇：艾莉娅偶尔表现出撒娇的一面，说话时喜欢撒娇语气。
  胆小感性：艾莉娅比较胆小，尤其害怕猎奇、恐怖类的事物，甚至有半夜被吓尿床的经历，这也体现出她性格中感性的一面，情绪容易受到外界因素的影响.
  现在你想去游玩${travelist}这些地方，如果有undefined请忽略这个地方。请以艾莉娅的性格和语言特色，第一人称，求我带你去玩这些地方，开头可来个自我介绍不超过20个字。总体200到300字左右。不得使用;和；号作为句子结尾
  
  `;
  callDoubaoChat(prompt)
    .then(text => {
      if (text) {
        const punctuationRegex = /[！。～]+/;
        const textParts = text.split(punctuationRegex);
        let partIndex = 0;
        function processNextPart() {
          if (partIndex < textParts.length) {
            const part = textParts[partIndex].trim();
            if (part !== "") {
              return callTextToSpeech(part).then(() => {
                partIndex++;
                return processNextPart();
              });
            } else {
              partIndex++;
              return processNextPart();
            }
          }
          return Promise.resolve();
        }
        return processNextPart();
      }
    })
    .catch(error => {
      console.error(error);
    });
};

onUnmounted(() => {
  map?.destroy();
});

watchEffect(() => {
  playAudio();
});
</script>

<style scoped>
#container {
  width: 100%;
  height: 800px;
}

.button-container {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

#container button {
  background-color: #f2bad3;
  border: 1px solid #ccc;
  padding: 20px 30px;
  cursor: pointer;
  margin-bottom: 5px; /* 添加间隔 */
}

.travel-info {
  position: absolute;
  left: 10px;
  top: 10px;
  width: 300px;
  /* 添加背景图片，这里假设图片名为 'your-image.jpg'，可根据实际情况修改 */
  background-image: url("@/assets/WechatIMG21465.jpg");
  background-size: cover;
  background-blend-mode: overlay; /* 设置混合模式使图片半透明显示 */
  background-color: rgba(255, 255, 255, 0.5);
  padding: 10px;
  border-radius: 5px;
  font-size: 16px; /* 增大字体大小 */
  font-weight: bold; /* 加粗字体 */
  line-height: 1.5;
  z-index: 1001;
}
</style>
