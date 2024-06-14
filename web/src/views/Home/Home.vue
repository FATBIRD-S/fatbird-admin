<script setup>
import BarChar from "@/components/Charts/BarChart.vue";
import { routerJump } from "@/composables/routerJump.js";
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();

const inputText = ref("");

const jump = () => {
  routerJump(router, "system_user_test", { params: { aaa: 2333 } }, { newWindow: false });
};
</script>

<template>
  <div class="flex flex-col items-center justify-center py-10 bg-gray-100">
    <div>
      <el-input v-model="inputText"></el-input>
      <el-button @click="jump">jump to sys user</el-button>
    </div>
    <BarChar></BarChar>
  </div>
</template>

<style lang="scss" scoped></style>
