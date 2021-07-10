const Router = require('../router')

function Controller (controllerRoute) {
  return function (cls) {
    for (const [methodRoute, methodName] of cls.prototype.routes) {
      Router.registerRoute(
        `/${controllerRoute}/${methodRoute}`,
        [cls, methodName]
      )
    }

    Reflect.deleteProperty(cls.prototype, 'routes')
  }
}

function RequestMapping(methodRoute) {
  return function (cls, name, descriptor) {
    cls.routes = cls.routes || []
    cls.routes.push([methodRoute, name])
  }
}

module.exports = {
  Controller,
  RequestMapping
}
