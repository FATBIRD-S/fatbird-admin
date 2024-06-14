<template>
  <div class="h-screen relative">
    <div
      class="fixed right-10 top-10 flex items-center gap-6 py-2 px-3 border border-cyan shadow-2xl shadow-cyan-500/50 rounded-full"
    >
      <ThemeSwitch></ThemeSwitch>
      <div v-if="canBack" class="hover:bg-gray-200/50 rounded-full p-2 hover:color-sky-600" @click="pageBack">
        <i class="i-mdi-arrow-left p-3 cursor-pointer"></i>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import ThemeSwitch from "@/layout/components/ThemeSwitch.vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const canBack = !route.meta.newWindow;

console.log(route);

const pageBack = () => {
  router.back();
};
</script>

<style lang="scss" scoped></style>
