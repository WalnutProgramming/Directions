import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/IndexPage.vue";
import Directions from "../views/DirectionsPage.vue";
import MySchedule from "../views/MySchedule.vue";
import MyScheduleEdit from "../views/MyScheduleEdit.vue";
import About from "../views/AboutPage.vue";
import Feedback from "../views/FeedbackPage.vue";

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
];

export default new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});
