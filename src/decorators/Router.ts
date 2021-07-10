import Router from '../router'

export const Controller = (controllerRoute: string) => function (cls: Function) {
  for (const [methodRoute, methodName] of cls.prototype.routes) {
    Router.registerRoute(
      `/${controllerRoute}/${methodRoute}`,
      [cls, methodName]
    )
  }

  Reflect.deleteProperty(cls.prototype, 'routes')
}

export const RequestMapping = (methodRoute: string) => function (cls: Function, name: string, descriptor: PropertyDescriptor) {
  // @ts-ignore
  cls.routes = cls.routes || []
  // @ts-ignore
  cls.routes.push([methodRoute, name])
}
