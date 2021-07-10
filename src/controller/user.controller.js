const { Controller, RequestMapping } = require('../utils/decorator')

@Controller('user')
class UserController {

  constructor(userService) {
    this.userService = userService
  }

  @RequestMapping('login')
  login(ctx) {
    ctx.response.statusCode = '200'
    ctx.response.setHeader('content-type', 'application/json')
    ctx.response.end(JSON.stringify({
      message: 'Login successfully!'
    }))
    ctx.request.body = ''
    ctx.request.on('data', (data) => {
      ctx.request.body += data
    })
  }
}

module.exports = UserController
