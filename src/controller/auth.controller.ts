import { Controller, Delete, Post, Singleton } from '../decorators'
import { Ctx } from '../utils'

@Singleton
@Controller('auth')
export default class AuthController {
  
  @Post('token')
  public login(ctx: Ctx) {
    return ctx
      .response
      .json({ message: 'Login successfully!' })
  }

  @Delete('token')
  public logout(ctx: Ctx) {
    return ctx
      .response
      .json({ message: 'Logout successfully!' })
  }
}
