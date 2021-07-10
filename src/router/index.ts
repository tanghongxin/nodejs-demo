import { Ctx } from '../interface'
import { Singleton } from '../decorators/Singleton'

@Singleton
export default class Router {
  instance?: Router
  
  static mimesMap = new Map([
    ['.png', 'image/png'],
    ['.jpg', 'image/jpg'],
    ['.gif', 'image/gif'],
    ['.jpeg', 'image/jpeg'],
    ['.html', 'html'],
  ])
  
  static requestMapping = new Map<string, [Function, string]>([])
  
  static registerRoute(
    route: string,
    [Controller, methodName]: [Function, string]
  ) {
    Router.requestMapping.set(
      route,
      [Controller, methodName]
    )
  }

  constructor() {}

  parseRequest(ctx: Ctx) {
    // @ts-ignore
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
    
    const [Controller, methodName] = Router.requestMapping.get(pathname) as [Function, string]
    return Reflect.construct(Controller, [])[methodName](ctx)
  }

  async handleStaticRequest (ctx: Ctx) {
    const fs = require('fs/promises')
    const path = require('path')

    const { pathname } = this.parseRequest(ctx)
    const data = await fs.readFile(path.join(__dirname, '../../static', pathname))

    // @ts-ignore
    ctx.response.setHeader('content-type', Router.mimesMap.get(path.extname(pathname)))
    ctx.response.end(data)
  }
}
