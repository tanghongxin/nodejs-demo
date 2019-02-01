// lazyLoad
const user = () => require('../../src/controller/user/user')

// to map the routes to Controllers' method
const routes = {
  'POST': {
    '/user': (ctx) => { user().login(ctx) }
  },

  'GET': {
    
  },

  'PUT': {

  },

  'DELETE': {

  }
}

exports.routes = routes