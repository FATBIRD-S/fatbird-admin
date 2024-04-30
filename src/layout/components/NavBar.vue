<script setup>
import { isDark, toggleDark } from "@/composables/theme.js";

</script>

<template>
  <div class="p-3">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">daisyUI</a>
    </div>
    <div class="flex-none">
      <el-switch
        v-model="isDark"
        active-action-icon="i-sw-edit"
        inactive-action-icon="i-sw-edit"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="Dark"
        inactive-text="Light"
        @change="toggleDark"
      ></el-switch>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
