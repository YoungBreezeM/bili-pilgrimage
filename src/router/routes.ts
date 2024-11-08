import Layout from "@/layout/index.vue";
import type { RouteRecordRaw } from "vue-router";
import Demo from "@/views/demo/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: { name: "Demo" },
    children: [
      {
        path: "demo",
        name: "Demo",
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
        path: "my",
        name: "my",
        component: () => import("@/views/about/index.vue"),
        meta: {
          title: "我的",
          noCache: true
        }
      }
    ]
  }
];

export default routes;
