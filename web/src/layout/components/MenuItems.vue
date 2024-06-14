<script setup>
const props = defineProps({
  routeItem: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <el-sub-menu v-if="props.routeItem.children?.length" :index="props.routeItem.pathName">
    <template #title>
      <i :class="props.routeItem.icon" class="mr-2"></i>
      <span>{{ props.routeItem.name }}</span>
    </template>
    <MenuItems v-for="item in props.routeItem.children" :key="item.key" :route-item="item" />
  </el-sub-menu>
  <el-menu-item v-else :index="props.routeItem.pathName">
    <i :class="props.routeItem.icon" class="mr-2"></i>
    <template #title>{{ props.routeItem.name }}</template>
  </el-menu-item>
</template>

<style lang="scss" scoped></style>
