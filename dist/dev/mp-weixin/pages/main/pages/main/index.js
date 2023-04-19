"use strict";
const common_vendor = require("../../../../common/vendor.js");
const core_hooks_useNameSpace = require("../../../../core/hooks/useNameSpace.js");
const core_http_applet = require("../../../../core/http/applet.js");
require("../../../../core/http/request.js");
const request = new core_http_applet.AppletRequest("https://www.fastmock.site/mock/a18ab7dc672d1956641266f46a6e2f61/api");
const getData = async () => {
  const res = await request.get({ url: "/api/rows" });
  return res.rows;
};
const postLogin = async () => {
  const res = await request.put({ url: "/api/login" });
  return res.data;
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const ns = core_hooks_useNameSpace.useNamespace("home");
    getData();
    postLogin();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n(common_vendor.unref(ns).b())
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-86693c75"], ["__file", "F:/desktop/notes/vdoing/src/pages/main/pages/main/index.vue"]]);
wx.createPage(MiniProgramPage);
