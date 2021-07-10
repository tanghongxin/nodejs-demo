import http from 'http'
import { Router } from './bootstrap'
import { Ctx } from './utils'

const server = http.createServer((request, response) => {
  Router.dispatch(new Ctx(request, response))
})

server.listen(8000, () => {
  console.log('Port 8000 is listening.\n')
})
