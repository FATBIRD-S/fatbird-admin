<template>
  <div class="h-screen flex justify-center items-center">
    <div>
      <el-form ref="formRef" :model="formState" :rules="rules" class="w-96" @finish="onFinish">
        <el-form-item label="账号" prop="account">
          <el-input v-model="formState.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formState.password" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <div class="flex justify-center w-full">
            <el-button type="primary" @click="onFinish">登录</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { login } from "@/api/userApi.js";
import CryptoJS from "crypto-js";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store/index.js";
import { useRoute, useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const formState = reactive({
  account: "",
  password: "",
});
const rules = reactive({
  account: [
    {
      required: true,
      message: "请输入账号",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
});

const formRef = ref(null);
const onFinish = () => {
  formRef.value.validate((valid) => {
    console.log(valid);
    if (valid) {
      const form = {
        account: formState.account,
        password: CryptoJS.MD5(formState.password).toString().toLocaleUpperCase(),
      };
      login(form).then((res) => {
        if (res.code === 0) {
          userStore.setUser(res.data);
          ElMessage({
            message: "登录成功",
            type: "success",
          });
          const { redirect } = route.query;
          if (redirect) {
            router.replace(redirect);
          } else {
            router.replace("/");
          }
        }
      });
    } else {
      ElMessage({
        message: "请输入账号和密码",
        type: "warning",
      });
    }
  });
};
</script>
