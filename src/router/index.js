class Router {
  static mimesMap = new Map([
    ['.png', 'image/png'],
    ['.jpg', 'image/jpg'],
    ['.gif', 'image/gif'],
    ['.jpeg', 'image/jpeg'],
    ['.html', 'html'],
  ])
  
  static requestMapping = new Map([])
  
  static registerRoute (route, [Controller, methodName]) {
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

  parseRequest (request) {
    const { pathname } = new URL(request.url, `http://${request.headers.host}`)
    return { pathname }
  }

  dispatch(ctx) {
    return this.handleAPIRequest(ctx)
  }

  async handleAPIRequest(ctx) {
    const { pathname } = this.parseRequest(ctx.request)
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

  async handleStaticRequest (ctx) {
    const fs = require('fs/promises')
    const path = require('path')

    const { pathname } = this.parseRequest(ctx.request)
    const data = await fs.readFile(path.join(__dirname, '../../static', pathname))

    ctx.response.setHeader('content-type', mimes.get(path.extname(pathname)))
    ctx.response.end(data)
  }
}

module.exports = Router
