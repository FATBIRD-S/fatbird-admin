<script setup></script>

<template>
  <div class="p-30">
    <el-row>
      <el-col :span="12">
        <el-card style="max-width: 480px">
          <template #header>
            <div class="card-header">
              <span>Card name</span>
            </div>
          </template>
          <p v-for="o in 4" :key="o" class="text item">
            {{ "List item " + o }}
          </p>
          <template #footer>Footer content</template>
        </el-card>
      </el-col>
      <el-col :span="12">
        <span>System Test</span>
        <PButton value="system_user_test_edit"></PButton>
        <PDropdown :config="['system_user_test_edit', 'system_user_test_add']" :data="{}"></PDropdown>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped></style>
