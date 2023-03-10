/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, ComponentCustomOptions>;
  export default component;
}

declare function requirePlugin<T>(name:string):T;

declare module wx {
  const createSelectorQuery:(selector:string)=>any;
  export default {
    createSelectorQuery
  }
}