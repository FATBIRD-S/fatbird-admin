<script setup>
import { devMode, devRouteModeChange } from "@/composables/devRouteModeChange";
</script>

<template>
  <div v-if="devMode" class="fixed bottom-5 right-5 cursor-pointer" @click="devRouteModeChange">
    <i class="i-mdi-cog p-7 color-gray"></i>
    <span class="dev-text color-red-500">DEV</span>
  </div>
</template>

<style scoped>
.dev-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bolder;
}
</style>
