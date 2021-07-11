import http from 'http'
import { URL } from 'url'

export class Request extends http.IncomingMessage {
  public parse() {
    const {
      hash, host, hostname, href, password, pathname,
      protocol, search, searchParams,
    } = new URL(this.url || '', `http://${this.headers.host}`)
    
    return {
      hash, host, hostname, href, password, pathname,
      protocol, search, searchParams, method: this.getMethod()
    }
  }

  public getMethod() {
    const { method = 'get' } = this
    return method.toLowerCase()
  }
}
