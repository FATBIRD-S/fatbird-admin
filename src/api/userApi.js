import service from "../utils/http";

import CryptoJS from "crypto-js";
const loginAuthCode = "platform:0ef89127-d46c-4736-ac87-b0c1c97f5f1c";
const base64_authorization = CryptoJS.enc.Base64.stringify(
  CryptoJS.enc.Utf8.parse(loginAuthCode),
);
export function login(data) {
  return service({
    url: "/auth/account",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + base64_authorization,
    },
  });
}
