import { enc, mode, pad } from "crypto-js/core";
import md5 from "crypto-js/md5";
import tripledes from "crypto-js/tripledes";

// 通用加密处理类
export default class Secure {
  opts: any;

  constructor(opts: any) {
    this.opts = {
      ...opts,
      desKey: enc.Utf8.parse(opts.desKey),
      desIv: enc.Utf8.parse(opts.desIv)
    };
  }

  /**
   * 通用加密
   * @param str 待加密字符串
   * @param key des加密key
   * @param iv des加密iv
   */
  encrypt = (str: any, key = this.opts.desKey, iv = this.opts.desIv) => {
    const result = tripledes.encrypt(str || "", key, {
      iv,
      mode: mode.CBC,
      padding: pad.Pkcs7
    });
    return encodeURIComponent(result.toString());
  };

  /**
   * 通用解密
   * @param str 待解密字符串
   * @param key des加密key
   * @param iv des加密iv
   */
  decrypt = (str: any, key = this.opts.desKey, iv = this.opts.desIv) => {
    const encryptedMessage = enc.Base64.parse(decodeURIComponent(str || ""));
    const result = tripledes.decrypt(encryptedMessage, key, {
      iv,
      mode: mode.CBC,
      padding: pad.Pkcs7
    });
    return result.toString(enc.Utf8);
  };

  /**
   * 密码加密
   * @param pwd 密码字符串
   */
  encodePassword = (pwd: any) => decodeURIComponent(this.encrypt(pwd));

  /**
   * 参数处理
   * @param params 参数对象
   */
  resolveParams = (params: any) => {
    const normalizedParams = this.normalizeParams(params);
    return this.converParamsToFormData(normalizedParams);
  };

  /**
   * 参数生成加密的sign
   */
  signEncode = (form: any) => {
    const { md5Key, isEncrypted } = this.opts;
    const { params, timeStamp, randomNum } = form;
    return md5(
      params + isEncrypted + timeStamp + randomNum + md5(md5Key)
    ).toString();
  };

  /**
   * 参数加密
   * @param params 加密参数对象
   */
  paramsEncode = (params: any) => {
    const { isEncrypted } = this.opts;
    const paramsString = JSON.stringify(params);
    return isEncrypted ? this.encrypt(paramsString) : paramsString;
  };

  /**
   * 参数格式化，生成约定的额外属性
   * @param params 参数对象
   */
  normalizeParams = (params: any) => {
    const { isEncrypted } = this.opts;
    interface FormData {
      timeStamp: any;
      randomNum: any;
      isEncrypted: any;
      params?: any;
      file?: any;
      sign?: any;
      lang?: any;
    }
    const formData: FormData = {
      timeStamp: Math.floor(new Date().getTime() / 1000),
      randomNum: Math.floor(Math.random() * 1000000),
      isEncrypted: isEncrypted
    };
    if (!params) {
      formData.params = "";
    } else {
      if (params.file) {
        formData.file = params.file;
        delete params.file;
      }
      formData.params = this.paramsEncode(params);
    }
    formData.sign = this.signEncode(formData);
    formData.lang = "zh";
    return formData;
  };

  /**
   * 参数对象转formdata
   * @param params 参数对象
   */
  converParamsToFormData = (params: any) => {
    const myFormData = new FormData();
    Object.keys(params).forEach(key => {
      myFormData.append(key, params[key]);
    });
    return myFormData;
    // return params; // 小程序不支持formdata，这里使用原始对象
  };
}
