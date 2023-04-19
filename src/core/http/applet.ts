import { AbstractRequest, HttpConfig, Request, RequestFactory } from './request'
import { AppletResponse } from './response'

export class AppletRequestFactory implements RequestFactory {
  private cache = new Map<String, AppletRequest>()
  private static appletRequestFactoryInstance: AppletRequestFactory | undefined
  private constructor() {}
  getRequest(baseUrl: String): AbstractRequest {
    let request = this.cache.get(baseUrl)
    if (request) {
      return request
    }
    request = new AppletRequest(baseUrl)
    this.cache.set(baseUrl, request)
    return request
  }

  static getInstance(): AppletRequestFactory {
    if (!this.appletRequestFactoryInstance) {
      this.appletRequestFactoryInstance = new AppletRequestFactory()
    }
    return this.appletRequestFactoryInstance
  }
}

export class AppletRequest<P = AppletResponse> extends AbstractRequest {
  constructor(baseUrl: String) {
    super(baseUrl)
  }
  execute<T = P>(conf: HttpConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      const requestConf = this.requestConfig(conf);
      wx.request({
        url: requestConf.url,
        method: requestConf.method,
        success(res:any) {
          if (res.statusCode == 200) {
            resolve(res.data)
          } else {
            resolve({
              any: {
                message: `状态异常`,
                success: false,
                data: res.statusCode
              }
            } as any)
          }
        },
        fail() {
          reject('服务器异常,请稍后再试')
        }
      })
    })
  }
  get<T = P>(conf: HttpConfig): Promise<T> {
    conf.method = 'GET'
    return this.execute(conf)
  }
  post<T = P>(conf: HttpConfig): Promise<T> {
    conf.method = 'POST'
    return this.execute(conf)
  }
  put<T = P>(conf: HttpConfig): Promise<T> {
    conf.method = 'PUT'
    return this.execute(conf)
  }
  delete<T = P>(conf: HttpConfig): Promise<T> {
    conf.method = 'DELETE'
    return this.execute(conf)
  }
  connect<T = P>(conf: HttpConfig): Promise<T> {
    throw new Error('Method not implemented.')
  }
  head<T = P>(conf: HttpConfig): Promise<T> {
    throw new Error('Method not implemented.')
  }
  options<T = P>(conf: HttpConfig): Promise<T> {
    throw new Error('Method not implemented.')
  }
  trace<T = P>(conf: HttpConfig): Promise<T> {
    throw new Error('Method not implemented.')
  }
}
