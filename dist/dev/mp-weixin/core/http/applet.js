"use strict";
const core_http_request = require("./request.js");
class AppletRequest extends core_http_request.AbstractRequest {
  constructor(baseUrl) {
    super(baseUrl);
  }
  execute(conf) {
    return new Promise((resolve, reject) => {
      const requestConf = this.requestConfig(conf);
      wx.request({
        url: requestConf.url,
        method: requestConf.method,
        success(res) {
          if (res.statusCode == 200) {
            resolve(res.data);
          } else {
            resolve({
              any: {
                message: `\u72B6\u6001\u5F02\u5E38`,
                success: false,
                data: res.statusCode
              }
            });
          }
        },
        fail() {
          reject("\u670D\u52A1\u5668\u5F02\u5E38,\u8BF7\u7A0D\u540E\u518D\u8BD5");
        }
      });
    });
  }
  get(conf) {
    conf.method = "GET";
    return this.execute(conf);
  }
  post(conf) {
    conf.method = "POST";
    return this.execute(conf);
  }
  put(conf) {
    conf.method = "PUT";
    return this.execute(conf);
  }
  delete(conf) {
    conf.method = "DELETE";
    return this.execute(conf);
  }
  connect(conf) {
    throw new Error("Method not implemented.");
  }
  head(conf) {
    throw new Error("Method not implemented.");
  }
  options(conf) {
    throw new Error("Method not implemented.");
  }
  trace(conf) {
    throw new Error("Method not implemented.");
  }
}
exports.AppletRequest = AppletRequest;
