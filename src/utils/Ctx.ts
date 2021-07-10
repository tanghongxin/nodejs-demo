import http from 'http'
import Request from './Request'
import Response from './Response'

class Ctx {
  public request: Request
  public response: Response
  
  public constructor(
    request: http.IncomingMessage,
    response: http.ServerResponse
  ) {
    Object.setPrototypeOf(request, Request.prototype)
    Object.setPrototypeOf(response, Response.prototype)
    this.request = request as Request
    this.response = response as Response
  }
}

export default Ctx
