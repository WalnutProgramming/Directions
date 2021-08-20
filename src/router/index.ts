import { createRouter, createWebHistory } from "vue-router";
import Index from "@/views/IndexPage.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
  { path: "/", component: Index },
  {
    path: "/directions",
    component: () =>
      import(/* webpackChunkName: "directions" */ "@/views/DirectionsPage.vue"),
    props: ({ query }: { query: { fromRoom?: string; toRoom?: string } }) => ({
      fromRoom: query.fromRoom,
      toRoom: query.toRoom,
    }),
  },
  {
    path: "/myschedule",
    component: () =>
      import(/* webpackChunkName: "myschedule" */ "@/views/MySchedule.vue"),
  },
  {
    path: "/myschedule/edit",
    component: () =>
      import(
        /* webpackChunkName: "myscheduleedit" */ "@/views/MyScheduleEdit.vue"
      ),
  },
  {
    path: "/about",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/AboutPage.vue"),
  },
  {
    path: "/feedback",
    component: () =>
      import(/* webpackChunkName: "feedback" */ "@/views/FeedbackPage.vue"),
  },
  {
    path: "/settings",
    component: () =>
      import(/* webpackChunkName: "settings" */ "@/views/SettingsPage.vue"),
  },
  // fallback (client-side 404)
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
});

// Redirect hash URLs (old) to history mode URLs (new)
router.beforeEach((to, from, next) => {
  // Redirect if fullPath begins with a hash (ignore hashes later in path)
  if (to.fullPath.substr(0, 2) === "/#") {
    const path = to.fullPath.substr(2);
    next(path);
    return;
  }
  next();
});

export default router;
