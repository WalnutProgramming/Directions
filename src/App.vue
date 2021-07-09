<template>
  <div>
    <header>
      <nav>
        <ul>
          <router-link v-slot="{ navigate, href, isActive }" to="/" custom>
            <li :class="isActive && 'router-link-active'">
              <a :href="href" @click="navigate"> Home </a>
            </li>
          </router-link>
          <router-link
            v-slot="{ navigate, href, isActive }"
            to="/myschedule"
            custom
          >
            <li :class="isActive && 'router-link-active'">
              <a :href="href" @click="navigate"> My Schedule </a>
            </li>
          </router-link>
          <li>
            <a
              href="https://sites.google.com/view/walnuthillshs-video-tours/home"
              >Virtual Tour</a
            >
          </li>
          <li>
            <a
              href="http://www.walnuthillseagles.com/news-pdfs/2013/WHHS_Floor_Maps.pdf"
              >Floor Map</a
            >
          </li>
          <router-link
            v-slot="{ navigate, href, isActive }"
            to="/settings"
            custom
          >
            <li :class="isActive && 'router-link-active'">
              <a :href="href" @click="navigate"> Settings </a>
            </li>
          </router-link>
          <router-link v-slot="{ navigate, href, isActive }" to="/about" custom>
            <li :class="isActive && 'router-link-active'">
              <a :href="href" @click="navigate"> About </a>
            </li>
          </router-link>
          <router-link
            v-slot="{ navigate, href, isActive }"
            to="/feedback"
            custom
          >
            <li :class="isActive && 'router-link-active'">
              <a :href="href" @click="navigate"> Feedback </a>
            </li>
          </router-link>
        </ul>
      </nav>
    </header>

    <router-view v-slot="{ Component }">
      <transition :name="transitionName">
        <component :is="Component" id="main-stuff" class="child-view" />
      </transition>
    </router-view>

    <TheRoomsDataList />
  </div>

  <teleport to="head"> </teleport>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";

import router from "@/router/index";

export default defineComponent({
  router,
  components: {
    TheRoomsDataList: defineAsyncComponent(
      () => import("@/components/TheRoomsDataList.vue")
    ),
  },
  data() {
    return {
      transitionName: "",
    };
  },
  watch: {
    $route: {
      handler(to, from) {
        if (from?.matched?.length === 0) {
          // Don't do transition on initial render
          this.transitionName = "";
        } else if (
          "media" in window &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
          this.transitionName = "fade";
        } else if (from.path === "/" && to.path === "/directions") {
          this.transitionName = "slide-left";
        } else if (from.path === "/directions" && to.path === "/") {
          this.transitionName = "slide-right";
        } else {
          this.transitionName = "fade";
        }
      },
      deep: true,
    },
  },
  async mounted() {
    // TODO: very hacky. Wait 20 milliseconds before scrolling to the
    // active link because for some reason, it isn't marked as active
    // for a while.
    await new Promise((resolve) => setTimeout(resolve, 20));
    const currentRouteNavItem = document.querySelector(
      "header li.router-link-active a"
    );
    if (currentRouteNavItem != null) {
      currentRouteNavItem.scrollIntoView({ inline: "center" });
    }
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

header li {
  /* margin-left: 2vw; */
  margin-right: 4vw;
}

ul {
  padding-left: 5vw;
}

header li a {
  color: var(--header-bar-text-color);
  text-decoration: none;
}

header li a:hover {
  color: var(--header-bar-hover-text-color);
}

#main-stuff {
  margin-top: 7vh;
}

header li.router-link-active a {
  color: var(--header-bar-selected-text-color);
}

/* transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
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
.slide-left-enter-from,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(30px, 0);
}
.slide-left-leave-active,
.slide-right-enter-from {
  opacity: 0;
  transform: translate(-30px, 0);
}
</style>
