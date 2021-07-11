import { Ctx } from '../utils'
import fs from 'fs'
import path from 'path'

export class Router {
  private static routeMap = new Map<string, Map<string, [Function, string]>>()
  
  public static registerRoute(
    route: string,
    method: string,
    Controller: Function,
    fnName: string,
  ) {
    const map = this.routeMap.get(route) || new Map()
    map.set(method, [Controller, fnName])
    this.routeMap.set(route, map)
  }

  public static async dispatch(ctx: Ctx) {
    const { pathname, method } = ctx.request.parse()
    if (method === 'get') {
      try {
        await this.handleStaticRequest(ctx)
        return
      } catch {}
    }

    try {
      await this.handleAPIRequest(ctx)
      return
    } catch {}
    
    return ctx.response.notFound(pathname, method)
  }

  private static async handleAPIRequest(ctx: Ctx) {
    const { pathname, method } = ctx.request.parse()
    const map = this.routeMap.get(pathname)
    // @ts-ignore
    const [Controller, fnName] = map.get(method) as [Function, string]
    return Reflect.construct(Controller, [])[fnName](ctx)
  }

  private static async handleStaticRequest(ctx: Ctx) {
    return new Promise((resolve, reject) => {
      const { pathname } = ctx.request.parse()
      fs.readFile(
        path.join(__dirname, '../../static', pathname),
        (err, data) => {
          if (err) return reject(err)
          return resolve(
            ctx.response.static(data, path.extname(pathname))
          )
        }
      )
    })
  }
}
