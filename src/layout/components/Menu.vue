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
    <el-menu
      class="w-60 flex-1"
      :collapse="systemStore.isCollapse"
      :default-active="route.name"
      @select="selectMenu"
    >
      <MenuItems
        v-for="item in routerStore.pageConfig"
        :key="item.key"
        :route-item="item"
      ></MenuItems>
    </el-menu>
    <div
      class="flex items-center justify-center h-12 border-r border-t boder-solid border-[#4c4d4f] transition-all"
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
