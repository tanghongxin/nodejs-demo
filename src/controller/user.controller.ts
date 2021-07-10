import { Controller, RequestMapping } from '../utils/decorator'
import { Ctx } from '../interface'

@Controller('user')
export default class UserController {
  
  @RequestMapping('login')
  login(ctx: Ctx) {
    ctx.response.statusCode = 200
    ctx.response.setHeader('content-type', 'application/json')
    ctx.response.end(JSON.stringify({
      message: 'Login successfully!'
    }))

    let body = ''
    ctx.request.on('data', data => body += data)
  }
}
