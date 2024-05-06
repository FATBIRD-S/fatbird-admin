<script setup>
import { useRouterStore } from "@/store/index.js";
import MenuItems from "@/layout/components/MenuItems.vue";
import { useSystemStore } from "@/store/modules/system.js";
import { useRoute, useRouter } from "vue-router";

const routerStore = useRouterStore();
const systemStore = useSystemStore();
const router = useRouter();
const route = useRoute();

function selectMenu(key) {
  router.push({ name: key });
}
</script>

<template>
  <div class="flex flex-col">
    <el-menu class="w-60 flex-1" :collapse="systemStore.isCollapse" :default-active="route.name" @select="selectMenu">
      <div class="flex items-center justify-center py-4">
        <!--<span v-show="systemStore.isCollapse" class="text-xl font-bold p-2 border">FA</span>-->
        <img class="w-60 h-auto object-contain" src="@/assets/images/system/logo.png" alt="logo fat-bird-admin" />
      </div>
      <MenuItems v-for="item in routerStore.pageConfig" :key="item.key" :route-item="item"></MenuItems>
    </el-menu>
    <div
      class="flex items-center justify-center h-12 border-r border-t boder-solid border-gray-200 dark:border-gray-700"
    >
      <i
        class="text-xl cursor-pointer"
        :class="systemStore.isCollapse ? 'i-mdi-menu-close' : 'i-mdi-menu-open'"
        @click="systemStore.toggleCollapse"
      ></i>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
