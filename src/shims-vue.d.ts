// declare module "*.vue" {
//   import { defineComponent } from "vue";

//   export default Vue;
// }

// shims-vue.d.ts
// declare module "*.vue" {
//   import type { DefineComponent } from "vue";

//   const component: DefineComponent<{}, {}, any>;
//   export default component;
// }

/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
