<script setup>
const props = defineProps({
  routeItem: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <el-sub-menu v-if="routeItem.children?.length" :index="routeItem.key">
    <template #title>
      <i :class="routeItem.icon" class="mr-2"></i>
      <span>{{ routeItem.name }}</span>
    </template>
    <MenuItems v-for="item in routeItem.children" :key="item.key" :route-item="item" />
  </el-sub-menu>
  <el-menu-item v-else :index="routeItem.key">
    <i :class="routeItem.icon" class="mr-2"></i>
    <template #title>{{ routeItem.name }}</template>
  </el-menu-item>
</template>

<style lang="scss" scoped></style>
