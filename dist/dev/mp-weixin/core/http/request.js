"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class AbstractRequest {
  constructor(baseUrl) {
    __publicField(this, "baseUrl");
    __publicField(this, "interceptorsRequest", null);
    __publicField(this, "interceptorsResponse", null);
    this.baseUrl = baseUrl;
  }
  getBaseUrl() {
    return this.baseUrl;
  }
  setInterceptorsRequest(fn) {
    this.interceptorsRequest = fn;
  }
  setInterceptorsResponse(fn) {
    this.interceptorsResponse = fn;
  }
  requestConfig(c) {
    return {
      ...c,
      url: this.baseUrl + c.url
    };
  }
}
exports.AbstractRequest = AbstractRequest;
