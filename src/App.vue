<template>
  <div>
    <header v-if="showNav">
      <nav>
        <ul>
          <router-link tag="li" to="/">
            <a>Home</a>
          </router-link>
          <router-link tag="li" to="/myschedule">
            <a>My Schedule</a>
          </router-link>
          <router-link tag="li" to="/about">
            <a>About Us</a>
          </router-link>
        </ul>
      </nav>
    </header>

    <transition :name="transitionName">
      <router-view
        :id="showNav ? 'main-stuff' : ''"
        class="child-view"
      ></router-view>
    </transition>

    <datalist id="roomsList">
      <option v-for="roomName in roomsList" :key="roomName">{{
        roomName
      }}</option>
    </datalist>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import walnut from "./walnut";
import router from "./router/index";

export default Vue.extend({
  router,
  data() {
    return {
      transitionName: "fade",
    };
  },
  computed: {
    roomsList: () => walnut.roomsList,
    showNav(): boolean {
      return this.$route.path !== "/myschedule/edit";
    },
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

<style src="./style.css"></style>

<style scoped>
header {
  background-color: #f9f9f9;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 7vh;
  display: flex;
  align-items: center;
  box-shadow: 0 0 1vh 0 #03a1fc;
  font-size: 0.8em;
  z-index: 100;
  overflow: auto;
  white-space: nowrap;
}

header * {
  display: inline;
}

header li {
  /* margin-left: 2vw; */
  margin-right: 4vw;
}

header li a {
  color: var(--main-text-color);
  text-decoration: none;
}

header li a:hover {
  color: #03a1fc;
}

#main-stuff {
  margin-top: 7vh;
}

/* transitions */
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
  width: 100vw;
  padding-top: 1vw;
  /*padding: 1vw;*/
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(30px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-30px, 0);
}
</style>
