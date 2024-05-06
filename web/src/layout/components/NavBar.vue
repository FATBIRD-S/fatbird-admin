<script setup>
import BreadCrumb from "@/layout/components/BreadCrumb.vue";
import { useUserStore } from "@/store/index.js";
import { useRouter } from "vue-router";
import ThemeSwitch from "@/layout/components/ThemeSwitch.vue";

const userStore = useUserStore();
const router = useRouter();
function logout() {
  userStore.resetUser();
  router.push("/login");
}
</script>

<template>
  <div class="px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
    <div>
      <BreadCrumb></BreadCrumb>
    </div>
    <div class="flex gap-4 items-center">
      <ThemeSwitch></ThemeSwitch>
      <span class="cursor-pointer text-gray-400 hover:text-gray-600" @click="logout">logout</span>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
