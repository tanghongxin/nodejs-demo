import http from 'http'
import { Router } from './bootstrap'

const server = http.createServer((request, response) => {
  new Router().dispatch({ request, response })
})

server.listen(8000, () => {
  console.log('Port 8000 is listening.\n')
})
