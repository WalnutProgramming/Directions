<template>
  <div>
    <header v-if="showNav">
      <nav>
        <ul>
          <router-link tag="li" to="/"><a>Home</a></router-link>
          <router-link tag="li" to="/myschedule">
            <a>My Schedule</a>
          </router-link>
        </ul>
      </nav>
    </header>

    <transition :name="transitionName">
      <router-view
        class="child-view"
        :id="showNav ? 'main-stuff' : ''"
      ></router-view>
    </transition>

    <datalist id="roomsList">
      <option v-for="roomName in roomsList" :key="roomName">
        {{ roomName }}
      </option>
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
  computed: {
    roomsList: () => walnut.roomsList,
    showNav(): boolean {
      return this.$route.path !== "/myschedule/edit";
    },
  },
});
</script>

<style scoped>
header {
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 7vh;
  display: flex;
  align-items: center;
  box-shadow: 0 0 0.5vh 0 black;
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
  color: lightskyblue;
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
