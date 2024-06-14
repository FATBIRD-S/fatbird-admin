<template>
  <div>
    <div>SystemUser</div>
    <div>
      <PButton value="system_user_add"></PButton>
      <PButton value="system_user_edit"></PButton>
    </div>
    <div>
      <span> child router </span>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "SystemUser",
};
</script>

<style lang="scss" scoped></style>
