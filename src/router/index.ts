import Vue from "vue";
import VueRouter from "vue-router";
import Index from "@/views/IndexPage.vue";
import Directions from "@/views/DirectionsPage.vue";
import MySchedule from "@/views/MySchedule.vue";
import MyScheduleEdit from "@/views/MyScheduleEdit.vue";
import About from "@/views/AboutPage.vue";
import Feedback from "@/views/FeedbackPage.vue";
import Settings from "@/views/SettingsPage.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Index },
  {
    path: "/directions",
    component: Directions,
    props: ({ query }: { query: { fromRoom?: string; toRoom?: string } }) => ({
      fromRoom: query.fromRoom,
      toRoom: query.toRoom,
    }),
  },
  {
    path: "/myschedule",
    component: MySchedule,
  },
  {
    path: "/myschedule/edit",
    component: MyScheduleEdit,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/feedback",
    component: Feedback,
  },
  {
    path: "/settings",
    component: Settings,
  },
  // fallback (client-side 404)
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
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
