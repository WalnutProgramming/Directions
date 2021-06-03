/* eslint-disable no-shadow */
import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";

declare module "@vue/runtime-core" {
  // Declare your own store states.
  interface State {
    isDarkMode: boolean;
    isAccessibilityMode: boolean;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
