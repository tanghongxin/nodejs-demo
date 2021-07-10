import { Controller, RequestMapping, Singleton } from '../decorators'
import { Ctx } from '../interface'

@Singleton
@Controller('user')
export default class UserController {
  
  @RequestMapping('login')
  login({ request, response }: Ctx) {
    let body = ''
    request.on('data', data => body += data)

    response.statusCode = 200
    response.setHeader('content-type', 'application/json')
    response.end(JSON.stringify({
      message: 'Login successfully!',
      requestInfo: {
        body,
        url: request.url,
        headers: {
          host: request.headers.host,
          'user-agent': request.headers['user-agent'],
        }
      }
    }))
  }
}
