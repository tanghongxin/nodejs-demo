const path = require('path')
const Controller = path.join(__dirname, '../../src/controller')

// import the controller.
const user = require(Controller + '/user/user')

const routes = {
  'POST': {
    // Push the route you want and the controller's handler you need here.
    // @param ctx contains the HttpRequest and the HttpResponse.
    '/user/login': (ctx) => user.login(ctx),
    '/user/reg': (ctx) => user.reg(ctx)
  },

  'GET': {

  },

  'PUT': {

  },

  'DELETE': {

  }
}

exports.routes = routes