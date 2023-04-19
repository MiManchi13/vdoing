export interface WebResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: RawCommonResponseHeaders
}
export interface AppletResponse<T = any> {
  data:string|Object|ArrayBuffer,
  statusCode:number,
  header:T,
  cookies:string[]
}
type CommonResponseHeadersList =
  | 'Server'
  | 'Content-Type'
  | 'Content-Length'
  | 'Cache-Control'
  | 'Content-Encoding'

type RawCommonResponseHeaders = {
  [Key in CommonResponseHeadersList]: string
} & {
  'set-cookie': string[]
}