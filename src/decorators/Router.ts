import Router from '../router'

export function Controller(controllerRoute: string) {
  return function (cls: any) {
    for (const [method, methodRoute, methodName] of cls.prototype.routes) {
      Router.registerRoute(
        `/${controllerRoute}/${methodRoute}`,
        method,
        cls,
        methodName,
      )
    }
  
    Reflect.deleteProperty(cls.prototype, 'routes')
  }
}

function RequestMapping(method: string) {
  return function (methodRoute: string) {
    return function (cls: any, name: string, descriptor: PropertyDescriptor) {
      // @ts-ignore
      cls.routes = cls.routes || []
      // @ts-ignore
      cls.routes.push([method, methodRoute, name])
    }
  }
}

export const Get = RequestMapping('get')
export const Post = RequestMapping('post')
export const Put = RequestMapping('put')
export const Delete = RequestMapping('delete')
