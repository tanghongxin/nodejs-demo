import { Ctx } from '../interface'

export default class Router {
  instance?: Router
  
  static mimesMap = new Map([
    ['.png', 'image/png'],
    ['.jpg', 'image/jpg'],
    ['.gif', 'image/gif'],
    ['.jpeg', 'image/jpeg'],
    ['.html', 'html'],
  ])
  
  static requestMapping = new Map<string, [any, string]>([])
  
  static registerRoute(
    route: string,
    [Controller, methodName]: [any, string]
  ) {
    Router.requestMapping.set(
      route,
      [Controller, methodName]
    )
  }

  constructor () {
    if (!Router.prototype.instance) {
      Router.prototype.instance = this
    }
    return Router.prototype.instance
  }

  parseRequest (ctx: Ctx) {
    const { pathname } = new URL(ctx.request.url, `http://${ctx.request.headers.host}`)
    return { pathname }
  }

  dispatch(ctx: Ctx) {
    return this.handleAPIRequest(ctx)
  }

  async handleAPIRequest(ctx: Ctx) {
    const { pathname } = this.parseRequest(ctx)
    if (!Router.requestMapping.has(pathname)) {
      ctx.response.setHeader('content-type', 'application/json')
      ctx.response.statusCode = 404
      ctx.response.end(JSON.stringify({
        message: 'unknown path'
      }))
      return 
    }
    
    const [Controller, methodName] = Router.requestMapping.get(pathname)
    return Reflect.construct(Controller, [])[methodName](ctx)
  }

  async handleStaticRequest (ctx: Ctx) {
    const fs = require('fs/promises')
    const path = require('path')

    const { pathname } = this.parseRequest(ctx)
    const data = await fs.readFile(path.join(__dirname, '../../static', pathname))

    ctx.response.setHeader('content-type', Router.mimesMap.get(path.extname(pathname)))
    ctx.response.end(data)
  }
}
