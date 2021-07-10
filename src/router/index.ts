import { Ctx } from '../interface'

export default class Router {
  private static mimesMap = new Map([
    ['.png', 'image/png'],
    ['.jpg', 'image/jpg'],
    ['.gif', 'image/gif'],
    ['.jpeg', 'image/jpeg'],
    ['.html', 'html'],
  ])
  
  private static requestMapping = new Map<string, [Function, string]>()
  
  public static registerRoute(
    route: string,
    [Controller, methodName]: [Function, string]
  ) {
    this.requestMapping.set(
      route,
      [Controller, methodName]
    )
  }

  private static parseRequest(ctx: Ctx) {
    // @ts-ignore
    const { pathname } = new URL(ctx.request.url, `http://${ctx.request.headers.host}`)
    return { pathname }
  }

  public static dispatch(ctx: Ctx) {
    return this.handleAPIRequest(ctx)
  }

  private static async handleAPIRequest(ctx: Ctx) {
    const { pathname } = this.parseRequest(ctx)
    if (!this.requestMapping.has(pathname)) {
      ctx.response.setHeader('content-type', 'application/json')
      ctx.response.statusCode = 404
      ctx.response.end(JSON.stringify({
        message: 'unknown path'
      }))
      return 
    }
    
    const [Controller, methodName] = this.requestMapping.get(pathname) as [Function, string]
    return Reflect.construct(Controller, [])[methodName](ctx)
  }

  private static async handleStaticRequest (ctx: Ctx) {
    const fs = require('fs/promises')
    const path = require('path')

    const { pathname } = this.parseRequest(ctx)
    const data = await fs.readFile(path.join(__dirname, '../../static', pathname))

    // @ts-ignore
    ctx.response.setHeader('content-type', this.mimesMap.get(path.extname(pathname)))
    ctx.response.end(data)
  }
}
