import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/IndexV.vue";
import Directions from "../views/DirectionsV.vue";
import MySchedule from "../views/MySchedule.vue";
import MyScheduleEdit from "../views/MyScheduleEdit.vue";
import About from "../views/About.vue";

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
];

export default new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});
