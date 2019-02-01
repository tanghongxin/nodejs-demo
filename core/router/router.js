const { routes } = require('../../config/route/route')

const Router = class Router {
  constructor(ctx) {
    this.ctx = ctx
  }

  dispatch() {
    // FIXME: protocol
    const { headers, url, method} = this.ctx.request
    const { pathname } = new URL(url, 'https://' + headers.host)

    try {
      // TODO: Regex
      routes[method.toUpperCase()][pathname](this.ctx)
    }
    catch {
      this.ctx.response.statusCode = 404
      this.ctx.response.end(JSON.stringify({
        message: 'unavaliable path'
      }))
    }
  }
}

exports.Router = Router