<script setup>
import { useRouterStore } from "@/store/index.js";

const routeStore = useRouterStore();
function show() {
  console.log(routeStore.fullRouteMap);
  console.log(routeStore.fullButtonMap);
}
</script>

<template>
  <div>
    <div>home</div>
    <div>
      <el-button @click="show">click</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
