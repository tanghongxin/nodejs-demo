import { Router } from '../router'

export function Controller(controllerRoute: string) {
  return function (cls: any) {
    for (const [method, requestRoute, fnName] of cls.prototype.routes) {
      Router.registerRoute(
        `/${controllerRoute}/${requestRoute}`,
        method,
        cls,
        fnName,
      )
    }
  
    Reflect.deleteProperty(cls.prototype, 'routes')
  }
}

function RequestMapping(method: string) {
  return function (requestRoute: string) {
    return function (cls: any, fnName: string, descriptor: PropertyDescriptor) {
      // @ts-ignore
      cls.routes = cls.routes || []
      // @ts-ignore
      cls.routes.push([method, requestRoute, fnName])
    }
  }
}

export const Get = RequestMapping('get')
export const Post = RequestMapping('post')
export const Put = RequestMapping('put')
export const Delete = RequestMapping('delete')
