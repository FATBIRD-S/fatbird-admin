<script setup>
import { useRoute } from "vue-router";

const props = defineProps({
  config: {
    type: Array,
    default: () => [],
  },
  data: {
    type: [Object, Array, String],
    default: () => {},
  },
});
const emits = defineEmits(["command"]);

const route = useRoute();

function menuConfigInit() {
  if (props.config.length === 0) return [];
  const menuMap = new Map();

  route.matched.forEach((item) => {
    if (item.meta?.buttons) {
      item.meta.buttons.forEach((btn) => {
        menuMap.set(btn.key, btn);
      });
    }
  });

  const permissionBtn = [];
  props.config.forEach((item) => {
    const target = {
      key: "",
      config: null,
    };
    if (typeof item === "string") {
      target.key = item;
    } else {
      if (!item.key) {
        throw new Error("Dropdown item must have a key");
      }
      Object.assign(target, item);
    }
    if (menuMap.has(target.key)) {
      target.config = menuMap.get(target.key);
      permissionBtn.push(target);
    }
  });

  return permissionBtn;
}

function commandHandler(command) {
  emits("command", { key: command, data: props.data });
}

const availableButtons = menuConfigInit();
</script>

<template>
  <el-dropdown @command="commandHandler">
    <span class="p-dropdown-name">
      <slot>
        Dropdown List
        <i class="i-mdi-chevron-down"></i>
      </slot>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="btn in availableButtons"
          :key="btn.key"
          :command="btn.key"
          :disabled="btn.disabled ? btn.disabled(props.data) : false"
        >
          <el-link :underline="false" :type="btn.type || btn.config.type">
            <template v-if="btn.config.icon">
              <i :class="btn.config.icon" class="mr-2"></i>
            </template>
            <span>{{ btn.config.name }}</span>
          </el-link>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
.p-dropdown-name {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
