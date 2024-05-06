<script setup>
import { computed } from "vue";
import { useRouterStore } from "@/store/index.js";
const routerStore = useRouterStore();

const keepAliveIncludes = computed(() => {
  return [];
});
</script>

<template>
  <div class="flex-1 overflow-auto px-4">
    <router-view v-slot="{ Component, route }">
      <!--{{ console.log(Component) || "Component" }}-->
      <!--{{ console.log(route) || "route" }}-->
      <transition :name="route.meta.transition || 'slide-right'" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped></style>
