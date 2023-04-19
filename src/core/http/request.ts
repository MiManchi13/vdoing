export type RequestMethods =
  | 'OPTIONS'
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'TRACE'
  | 'CONNECT'
  | undefined

type ContentType =
  | 'text/html'
  | 'text/plain'
  | 'multipart/form-data'
  | 'application/json'
  | 'application/x-www-form-urlencoded'
  | 'application/octet-stream'

type CommonRequestHeadersList =
  | 'Accept'
  | 'Content-Length'
  | 'User-Agent'
  | 'Content-Encoding'
  | 'Authorization'

export type RequestHeaders = {
  [Key in CommonRequestHeadersList]: string
} & {
  'Content-Type': ContentType
}

export interface HttpConfig {
  // 完整路径
  url: string
  //请求方法
  method?: RequestMethods
  //请求头
  header?: RequestHeaders
  //超时时间
  timeout?: number
  //请求体
  data?: any

  // dataType?: string;
  // //响应类型
  // responseType?: string;
}

type InterceptorsRequest = ((c: HttpConfig) => HttpConfig) | null
type InterceptorsResponse<T = any> = ((r: any) => T) | null

export interface Request<T = any> {
  //发送请求
  execute(conf: HttpConfig): Promise<T>
  //获取基础路径
  getBaseUrl(): String
  //获取请求类型
  get(conf: HttpConfig): Promise<T>
  post(conf: HttpConfig): Promise<T>
  put(conf: HttpConfig): Promise<T>
  delete(conf: HttpConfig): Promise<T>
  connect(conf: HttpConfig): Promise<T>
  head(conf: HttpConfig): Promise<T>
  options(conf: HttpConfig): Promise<T>
  trace(conf: HttpConfig): Promise<T>
}

export abstract class AbstractRequest<T = any> implements Request<T> {
  private baseUrl: String
  protected interceptorsRequest?: InterceptorsRequest = null
  protected interceptorsResponse?: InterceptorsResponse<T> = null
  abstract get(conf: HttpConfig): Promise<T>
  abstract post(conf: HttpConfig): Promise<T>
  abstract put(conf: HttpConfig): Promise<T>
  abstract delete(conf: HttpConfig): Promise<T>
  abstract connect(conf: HttpConfig): Promise<T>
  abstract head(conf: HttpConfig): Promise<T>
  abstract options(conf: HttpConfig): Promise<T>
  abstract trace(conf: HttpConfig): Promise<T>
  abstract execute(conf: HttpConfig): Promise<T>

  constructor(baseUrl: String) {
    this.baseUrl = baseUrl
  }

  getBaseUrl(): String {
    return this.baseUrl
  }

  setInterceptorsRequest(fn: InterceptorsRequest) {
    this.interceptorsRequest = fn
  }

  setInterceptorsResponse(fn: InterceptorsResponse<T>) {
    this.interceptorsResponse = fn
  }

  requestConfig(c: HttpConfig): HttpConfig {
    return {
      ...c,
      url: this.baseUrl + c.url
    }
  }
}

export interface RequestFactory {
  getRequest(baseUrl: String): AbstractRequest
}
