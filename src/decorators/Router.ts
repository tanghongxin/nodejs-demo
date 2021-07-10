import Router from '../router'

export function Controller(controllerRoute: string) {
  return function (cls: any) {
    for (const [methodRoute, methodName] of cls.prototype.routes) {
      Router.registerRoute(
        `/${controllerRoute}/${methodRoute}`,
        [cls, methodName]
      )
    }
  
    Reflect.deleteProperty(cls.prototype, 'routes')
  }
}

export function RequestMapping(methodRoute: string) {
  return function (cls: any, name: string, descriptor: PropertyDescriptor) {
    // @ts-ignore
    cls.routes = cls.routes || []
    // @ts-ignore
    cls.routes.push([methodRoute, name])
  }
}
