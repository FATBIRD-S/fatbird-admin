<script setup>
import { useRoute } from "vue-router";

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
});

const route = useRoute();
const buttons = route.matched.reduce((prev, curr) => {
  return prev.concat(curr.meta?.buttons ?? []);
}, []);
const btnInfo = buttons.find((btn) => btn.key === props.value);
</script>

<template>
  <el-button v-if="btnInfo" :type="btnInfo.type">
    <div class="flex gap-2">
      <i v-if="btnInfo.icon" :class="btnInfo.icon"></i>
      <span v-if="!btnInfo.hideName">{{ btnInfo.name }}</span>
    </div>
  </el-button>
</template>

<style lang="scss" scoped></style>
