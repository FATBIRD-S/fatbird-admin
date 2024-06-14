<script setup>
import Menu from "@/layout/components/Menu.vue";
import NavBar from "@/layout/components/NavBar.vue";
import Content from "@/layout/components/Content.vue";
import RouteTabs from "@/layout/components/RouteTabs.vue";
import DevModeSetting from "@/layout/components/DevModeSetting.vue";
</script>

<template>
  <div class="flex h-screen">
    <section class="flex flex-col">
      <Menu class="flex-1"></Menu>
    </section>
    <section class="flex-1 flex flex-col">
      <NavBar></NavBar>
      <RouteTabs></RouteTabs>
      <Content></Content>
    </section>
    <DevModeSetting></DevModeSetting>
  </div>
</template>

<style scoped lang="scss"></style>
