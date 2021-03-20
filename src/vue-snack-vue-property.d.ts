import Vue from "vue";

declare module "vue/types/vue" {
  interface Vue {
    $snack: any;
  }

  interface VueConstructor {
    $snack: any;
  }
}
