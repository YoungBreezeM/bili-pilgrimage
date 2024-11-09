import Layout from "@/layout/index.vue";
import type { RouteRecordRaw } from "vue-router";
import Demo from "@/views/demo/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: { name: "Home" },
    children: [
      {
        path: "home",
        name: "Home",
        component: Demo,
        meta: {
          title: "首页"
        }
      },
      {
        path: "tools",
        name: "Tools",
        component: () => import("@/views/tools/index.vue"),
        meta: {
          title: "动态"
        }
      },
      {
        path: "about",
        name: "About",
        component: () => import("@/views/about/index.vue"),
        meta: {
          title: "会员购",
          noCache: true
        }
      },
      {
        path: "/video",
        name: "/video",
        component: () => import("@/views/video/index.vue"),
        meta: {
          title: "视频",
          noCache: true
        }
      },
      {
        path: "/video-detail",
        name: "/video-detail",
        component: () => import("@/views/video-detail/index.vue"),
        meta: {
          title: "视频详情",
          noCache: true
        }
      },
      {
        path: "/my",
        name: "/my",
        component: () => import("@/views/my/index.vue"),
        meta: {
          title: "我的",
          noCache: true
        }
      },
      {
        path: "/map",
        name: "/map",
        component: () => import("@/views/map/index.vue"),
        meta: {
          title: "地图",
          noCache: true
        }
      },
      {
        path: "/point/list",
        name: "/pointlist",
        component: () => import("@/views/pointList/index.vue"),
        meta: {
          title: "圣地",
          noCache: true
        }
      },
      {
        path: "/point/attention",
        name: "attention",
        component: () => import("@/views/pointList/index.vue"),
        meta: {
          title: "关注",
          noCache: true
        }
      },
      {
        path: "/map/mark",
        name: "mapMark",
        component: () => import("@/views/mapMark/index.vue"),
        meta: {
          title: "地图标记",
          noCache: true
        }
      },
      {
        path: "/hot",
        name: "hot",
        component: () => import("@/views/hot/index.vue"),
        meta: {
          title: "热度",
          noCache: true
        }
      },
      {
        path: "/d-my",
        name: "d-my",
        component: () => import("@/views/d-my/index.vue"),
        meta: {
          title: "我的",
          noCache: true
        }
      },
      {
        path: "/point/detail",
        name: "pointDetail",
        component: () => import("@/views/pointDetail/index.vue"),
        meta: {
          title: "动态详情",
          noCache: true
        }
      },
      {
        path: "/push/same",
        name: "pushSame",
        component: () => import("@/views/pushSame/index.vue"),
        meta: {
          title: "拍同款",
          noCache: true
        }
      },
      {
        path: "/push",
        name: "push",
        component: () => import("@/views/push/index.vue"),
        meta: {
          title: "发布",
          noCache: true
        }
      }
    ]
  }
];

export default routes;
