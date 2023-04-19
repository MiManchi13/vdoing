import { AppletRequestFactory, AppletRequest } from './applet'
import { AbstractRequest, RequestFactory } from './request'
import { WebRequestFactory, WebRequest } from './web'

enum Type {
  Web,
  Applet
}

const cache: Map<Type, RequestFactory> = new Map()
const getRequest = (baseUrl: string, type: Type): AbstractRequest => {
  if (cache.has(type)) {
    return cache.get(type)!.getRequest(baseUrl)
  } else {
    let instance: RequestFactory | null = null
    switch (type) {
      case Type.Applet:
        instance = AppletRequestFactory.getInstance()
        break
      case Type.Web:
        instance = WebRequestFactory.getInstance()
        break
    }
    cache.set(type, instance)
    return instance.getRequest(baseUrl)
  }
}

export const getWebRequest = (baseUrl: string): WebRequest => {
  return getRequest(baseUrl, Type.Web)
}

export const getAppletRequest = (baseUrl: string): AppletRequest => {
  return getRequest(baseUrl, Type.Applet)
}
