import Axios from "axios";
import { useUserStore } from "@/store";

const service = Axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // url = base url + request url
  timeout: 30000, // request timeout
});

service.interceptors.request.use(
  (config) => {
    const user = useUserStore();
    if (user.token) {
      config.headers["Authorization"] = "bearer " + user.token;
    } else {
      // 获取亚验证码、注册不用携带请求头，暂不处理，后期再处理
      // delete config.headers['Authorization']
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const user = useUserStore();
    const res = response;
    // 定义各种相应的状态码的解释说明
    const authErrCodeArray = [
      10000000, // "安全认证异常"
      10000001, // "认证信息不足"
      10000002, // "jwt签发失败"
      10000101, // "Token认证失败"
      10000102, // "Token过期/已注销"
      10000103, // "Token未提供"
      10000104, // "Token格式错误"
      10000105, // "Token签名错误"
      10000106, // "Token签名/验证器错误"
      10000201, // "未授权"
      10000301, // "非法客户端"
      10000302, // "客户端密钥错误"
      10000303, // "客户端禁用"
      10000304, // "账号不存在"
      10000305, // "密码错误"
      10000306, // "账号锁定,请稍候重试"
    ];
    if (res.data.code !== 0) {
      if (!response.config.hideMessage) {
        if (authErrCodeArray.includes(res.data.code)) {
          // message.warning({ content: `${res.data.desc}，请重新登录` });
          // 清除token
          user.$reset();
        } else {
          // message.error({
          //   content: `${res.data.desc}`,
          // });
        }
      }
      // return Promise.reject(new Error(res || 'Error'));
      return Promise.reject(res);
    } else {
      return res.data;
    }
  },
);

export default service;
