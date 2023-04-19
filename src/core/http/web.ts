import { AbstractRequest, HttpConfig, Request, RequestFactory } from './request'
import axios from 'axios'
import { WebResponse } from './response'

export class WebRequestFactory implements RequestFactory {
  //缓存不同baseUrl的AppletRequest对象
  private cache = new Map<String, WebRequest>()
  //静态容器
  private static WebRequestFactoryInstance: WebRequestFactory | undefined
  //构造方法 不允许外界构造调用
  private constructor() {}

  getRequest(baseUrl: String): AbstractRequest {
    //从cache中拿出缓存
    let request = this.cache.get(baseUrl)
    //cache中存在
    if (request) {
      return request
    }
    //cache中不存在
    request = new WebRequest(baseUrl)
    this.cache.set(baseUrl, request)
    return request
  }

  static getInstance(): WebRequestFactory {
    //如果静态创建对象实例不存在  创建对象
    if (!this.WebRequestFactoryInstance) {
      this.WebRequestFactoryInstance = new WebRequestFactory()
    }
    return this.WebRequestFactoryInstance
  }
}

// type ResponseType

export class WebRequest<P = WebResponse> extends AbstractRequest<P> {
  constructor(baseUrl: String) {
    super(baseUrl)
  }
  /**
   * 核心方法
   * 1.处理请求参数 例如拼接url 根据请求类型 构造header
   */
  async execute(conf: HttpConfig): Promise<any> {
    const c = this.interceptorsRequest ? this.interceptorsRequest(conf) : conf
    const requestConf = this.requestConfig(c)
    const res = await axios.request({
      ...requestConf
    })
    return this.interceptorsResponse ? this.interceptorsResponse(res) : res
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
