<script setup></script>

<template>
  <div class="flex-1 overflow-auto px-4">
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition || 'slide-right'" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped></style>
