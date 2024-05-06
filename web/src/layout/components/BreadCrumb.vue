<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const router = useRouter();
const breadcrumb = computed(() => {
  const matched = route.matched;
  return matched
    .filter((item) => item.meta && item.meta.pageTitle)
    .map((item) => {
      return {
        title: item.meta.pageTitle,
        path: item.path,
        name: item.name,
      };
    });
});
</script>

<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item v-for="item in breadcrumb" :key="item.name">
        <span :class="{ active: item.path === route.path }" @click="router.push({ path: item.path })">{{
          item.title
        }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style lang="scss" scoped></style>
