import request from "./request";

async function getUserInfo() {
  return await request.get("/api/Personal/GetPersonaldata");
}

async function GetGeetestcaptchaObj() {
  return await request.get("/api/OpenLogin/register-slide");
}

async function fakevalidateSlide({ params }) {
  return await request("/api/OpenLogin/validate-slide", {
    method: "POST",
    data: { ...params },
  });
}

async function addProject({ params }) {//保存作品
  console.log(params);
  return await request("/api/project/addProject", {
    method: "POST",
    data: { ...params},
  });
}

async function fakeSendSms(number) {
  return await request("/api/OpenLogin/sendSms", {
    method: "GET",
    params: { moblieNumber: number },
  });
}

async function moblieLogin({ params }) {
  return await request("/api/OpenLogin/moblieLogin", {
    method: "POST",
    data: { ...params },
  });
}

async function userLogout() {
  return await request.post("/api/account/logout");
}

async function UserAccountLogin({ params }) {
  return await request("/api/account/login", {
    method: "POST",
    data: { ...params },
  });
}

async function registrationAccount({ params }) {
  return await request("/api/OpenLogin/registrationAccount", {
    method: "POST",
    data: { ...params },
  });
}

async function getWeChatAuthorize(params) {
  return await request("/api/OpenLogin/getWeChatAuthorize", {
    method: "get",
    params: { ...params },
  });
}

async function wechatLogin({ params }) {
  return await request("/api/OpenLogin/wechatLogin", {
    method: "post",
    params: { ...params },
  });
}

async function getQQAuthorize(params) {
  return await request("/api/OpenLogin/getQQAuthorize", {
    method: "get",
    params: { ...params },
  });
}

async function qqLogin({ params }) {
  return await request("/api/OpenLogin/qqLogin", {
    method: "post",
    params: { ...params },
  });
}

async function getprojectlist(params) {
  return await request("/api/editproject/getprojectlist", {
    method: "get",
    params: { ...params },
  });
}

async function getprojectInfo(id) {
  return await request(`/api/editproject/${id}`, {
    method: "get"
  });
}

async function modifyProject({ params }) {
  return await request("/api/project/modifyProject", {
    method: "put",
    data: { ...params },
  });
}

async function getSchoolList() {
  return await request.get("/api/maker/GetSchoolList");
}

async function getGradeList() {
  return await request.get("/api/maker/GetGradeList");
}

async function getClassList() {
  return await request.get("/api/maker/GetClassList");
}

async function getTokem() {
  return await request.get("/api/BaiyunEdu/getToken");
}
export {
  getTokem,
  getSchoolList,
  getGradeList,
  getClassList,
  getUserInfo,
  GetGeetestcaptchaObj,
  fakevalidateSlide,
  fakeSendSms,
  moblieLogin,
  userLogout,
  addProject,
  modifyProject,
  UserAccountLogin,
  registrationAccount,
  getWeChatAuthorize,
  getQQAuthorize,
  wechatLogin,
  qqLogin,
  getprojectlist,
  getprojectInfo
};
