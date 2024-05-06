<script setup>
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

function back() {
  const { from } = route.query;
  if (from) {
    router.replace(from);
  } else {
    router.replace("/");
  }
}
</script>

<template>
  <div class="error-page">
    <div class="error-code">4<span class="error-code-gradient">0</span>3</div>
    <div class="error-desc">抱歉，你无权访问该页面</div>
    <div class="error-img">
      <i class="i-mdi:shield-alert"></i>
    </div>
    <div class="error-handle">
      <router-link to="/">
        <el-button type="primary" size="large" @click="back">返回</el-button>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
