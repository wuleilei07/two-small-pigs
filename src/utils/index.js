import fetch from "isomorphic-fetch";
import Secure from "./secure";
const queryString = require("query-string");
const { WEBAPI_SERVER, MD5_KEY, IS_ENCRYPTED, DES_KEY, DES_IV } = process.env;

const opts = {
  md5Key: MD5_KEY || "",
  desKey: DES_KEY || "",
  desIv: DES_IV || "",
  isEncrypted: +(IS_ENCRYPTED || 0)
};
const secure = new Secure(opts);

const customedFetch = async (url: any, opts: any) => {
  // 处理options
  const options = {
    method: "GET",
    ...(opts || {})
  };
  const json = await fetch(url, options);
  return json;
};

// 请求webapi
export const fetchWebApi = async (api: any, opts: any) => {
  const { method = "GET", body = {} } = opts || {};

  // url处理
  const url = `//${WEBAPI_SERVER}${api}`;
  // 处理参数params
  const formData = secure.resolveParams(body);
  // 拼接后的opts
  const options = { ...opts, method, body: formData };
  if (!formData || method === "GET" || method === "HEAD") {
    delete options.body;
  }

  const res = await customedFetch(url, options);
  // 请求是否成功
  const json = await res.clone().json();
  // 请求失败也返回json，用于处理各类报错
  if (json.code !== 1) {
    throw json;
  }
  return res;
};
/**
 * 快捷方法，默认传参uId
 */
fetchWebApi.get = async (api: any, params: {}) => {
  let url = api;
  params = params;

  url +=
    (api.indexOf("?") > -1 ? "&" : "") +
    queryString.stringify(params, { arrayFormat: "bracket" });
  return fetchWebApi(url, { method: "GET" }).then(res => res.json());
};

export const fetchWebApiByPost = async (api: any, params: any) => {
  const opts = {
    body: {}
  };
  if (params) {
    opts.body = params;
  }

  return fetchWebApi(api, { ...opts, method: "POST" })
    .then(res => res.json())
    .catch(err => err);
};
