<script setup>
import { isDark, toggleDark } from "@/composables/theme.js";
import { nextTick } from "vue";

let resolveFn;
const switchTheme = (event) => {
  const isAppearanceTransition =
    document.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!isAppearanceTransition || !event) {
    resolveFn(true);
    return;
  }
  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

  const transition = document.startViewTransition(async () => {
    resolveFn(true);
    await nextTick();
  });
  transition.ready.then(() => {
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];
    document.documentElement.animate(
      {
        opacity: isDark.value ? [1, 0.7] : [0.6, 1],
        clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 400,
        easing: "ease-in",
        pseudoElement: isDark.value ? "::view-transition-old(root)" : "::view-transition-new(root)",
      },
    );
  });
};
const beforeChange = () => {
  return new Promise((resolve) => {
    resolveFn = resolve;
  });
};
</script>

<template>
  <div class="flex gap-2 items-center">
    <span>
      <i class="i-mdi-weather-night?mask font-bold text-xl" :class="{ 'text-blue': !isDark }"></i>
    </span>
    <div @click.stop="switchTheme">
      <el-switch v-model="isDark" size="large" :before-change="beforeChange" @change="toggleDark"></el-switch>
    </div>
    <span>
      <i class="i-mdi-weather-sunny?mask font-bold text-xl" :class="{ 'text-blue': isDark }"></i>
    </span>
  </div>
</template>

<style lang="scss" scoped></style>
