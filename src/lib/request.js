/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import request, { extend } from "umi-request";
window.remoteStorage = new MimadoRemoteStorage(
  "https://token.mimadao.com",
  "/session-proxy.html"
);
const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户无授权或授权信息已过期。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};
/**
* 异常处理程序
*/
const RefreshTokenUrl = "/api/account/refreshtoken";

const errorHandler = async (error) => {console.log(error);
  const { response, request } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    // console.error(errorText, `message: 请求错误 ${status}: ${url}`);
  } else if (!response) {
    console.error(`您的网络发生异常，无法连接服务器`);
  }
  return response;
};
/**
 * 配置request请求时的默认参数
 */

const headers = { Authorization: "" };
const extendRequest = extend({
  errorHandler,
  // 默认错误处理
  //headers,
});

request.interceptors.request.use(async (url, options) => {
  return new Promise((resolve, reject) =>
    remoteStorage.getValue("access_token", (key, value) => {
      resolve(value);
    })
  ).then((data) => {
    if (data) {
      headers.Authorization = `Bearer ${data || null}`;
    }
    return {
      url: `${process.env.baseUrl}${url}`,
      options: { ...options, headers: headers },
    };
  });
});

request.interceptors.response.use(async (response, options) => {
  const hostname = window.location.protocol + "//" + window.location.host + "/";
  const logout = "/api/account/logout";
  if (
    response.status === 401 &&
    response.headers.get("act") === "expired" &&
    response.url !== hostname + RefreshTokenUrl &&
    response.url !== hostname + logout
  ) {
    const { data, status } = await refreshToken();
    if (data && status === "ok") {
      remoteStorage.setValue("access_token", data.access_token, () => {});
      remoteStorage.setValue("fingerId", data.user.fingerId, () => {});
      remoteStorage.setValue("userId", data.user.userid, () => {});
      return await extendRequest(response.url, {
        ...options,
      });
    } else {
      remoteStorage.clearValue(() => {});
      // localStorage.removeItem("access_token");
      // localStorage.removeItem("fingerId");
      // localStorage.removeItem("userId");
    }
  }

  return response;
});

/**
 * 刷新 token 的请求 service
 * @param {*} token refresh_token
 */
const refreshToken = async () => {
  return new Promise((resolve, reject) =>
    remoteStorage.getValue("access_token", (key, value) => {
      resolve(value);
    })
  ).then((data) => {
    return extendRequest(RefreshTokenUrl, {
      method: "POST",
      data: { token: data || null },
    });
  });
  // return await extendRequest(RefreshTokenUrl, {
  //   method: "POST",
  //   data: { token: localStorage.getItem("access_token") || null },
  // });
};

export default extendRequest;
