import http from 'http'

export interface Ctx {
  request: http.IncomingMessage
  response: http.ServerResponse
}
