<script setup>
import { useRoute, useRouter } from "vue-router";
import { useRouterStore } from "@/store/index.js";
import { computed } from "vue";

const route = useRoute();
const router = useRouter();
const routerStore = useRouterStore();

const activeName = computed(() => {
  return route.name;
});

const tabClick = (tab) => {
  router.push({ name: tab.paneName });
};
const tabRemove = (tab) => {
  const nextTab = routerStore.removeRouteTab(tab);
  console.log("nextTab", nextTab);
  router.push({ name: nextTab });
};
console.log("route", route);
console.log("router", router);
</script>

<template>
  <div class="px-6">
    <el-tabs v-model="activeName" type="card" @tab-click="tabClick" @tab-remove="tabRemove">
      <el-tab-pane
        v-for="tab in routerStore.routeTabs"
        :key="tab[0]"
        :name="tab[0]"
        :closable="tab[1].closable && routerStore.routeTabs.size > 1"
      >
        <template #label>
          <i class="el-icon-document" />
          <span>{{ tab[1].name }}</span>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped></style>
