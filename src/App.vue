<template>
  <div>
    <header>
      <nav>
        <ul>
          <router-link tag="li" to="/" exact>
            <a> Home </a>
          </router-link>
          <router-link tag="li" to="/myschedule">
            <a> My Schedule </a>
          </router-link>
          <router-link tag="li" to="/settings">
            <a> Settings </a>
          </router-link>
          <router-link tag="li" to="/about">
            <a> About Us </a>
          </router-link>
          <router-link tag="li" to="/feedback">
            <a> Feedback </a>
          </router-link>
        </ul>
      </nav>
    </header>

    <transition :name="transitionName">
      <router-view id="main-stuff" class="child-view"></router-view>
    </transition>

    <TheRoomsDataList />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import TheRoomsDataList from "@/components/TheRoomsDataList.vue";
import router from "@/router/index";

export default Vue.extend({
  router,
  components: { TheRoomsDataList },
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
  mounted() {
    const currentRouteNavItem = document.querySelector(
      "header li.router-link-active a"
    );
    if (currentRouteNavItem != null) {
      currentRouteNavItem.scrollIntoView({ inline: "center" });
    }
  },
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Walnut Hills Directions",
    // all titles will be injected into this template
    titleTemplate: `Walnut.Direct - %s`,

    meta: [
      {
        vmid: "description",
        name: "description",
        content:
          "Straightforward directions between rooms in Walnut Hills High School. Created by the Walnut Hills Programming Club.",
      },
    ],
  },
});
</script>

<style src="@/style.css"></style>

<style scoped>
header {
  background-color: var(--background-color);
  transition: background-color var(--fast-middle-ease),
    color var(--fast-middle-ease);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 7vh;
  display: flex;
  align-items: center;
  box-shadow: 0 0 1vh 0 var(--header-bar-shadow-color);
  font-size: 0.8em;
  z-index: 100;
  overflow: auto;
  white-space: nowrap;
}

header * {
  display: inline;
}

nav {
  overflow: auto;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: scroll;
  display: flex;
}

li {
  float: left;
}

li a {
  color: var(--header-bar-text-color);
  text-decoration: none;
  display: block;
  text-align: center;
  padding: 14px 2vw;
  text-decoration: none;
}

li a:hover {
  color: var(--header-bar-hover-text-color);
  background-color: var(--header-bar-hover-background-color);
}

#main-stuff {
  margin-top: 7vh;
}

header li.router-link-active a {
  color: var(--header-bar-selected-text-color);
  background-color: var(--header-bar-selected-background-color);
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
