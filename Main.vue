<template>
  <transition :name="transitionName">
    <router-view class="child-view"></router-view>
  </transition>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";
import Index from "./IndexV.vue";
import Directions from "./DirectionsV.vue";

const routes = [
  { path: "/", component: Index },
  {
    path: "/directions",
    component: Directions,
    props: route => ({
      fromRoom: route.query.fromRoom,
      toRoom: route.query.toRoom,
    }),
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

export default Vue.extend({
  router,
  data() {
    return {
      transitionName: "fade",
    };
  },
  watch: {
    $route(to, from) {
      if (from.path === "/" && to.path === "/directions") {
        this.transitionName = "slide-left";
      } else if (from.path === "/directions" && to.path === "/") {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "fade";
      }
    },
  },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.child-view {
  position: absolute;
  /* margin-left: 25%; */
  width: 98vw;
  padding: 1vw;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>
