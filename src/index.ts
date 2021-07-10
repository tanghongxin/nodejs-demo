import http from 'http'
import router from './bootstrap'

const server = http.createServer((request, response) => {
  router.dispatch({ request, response })
})

server.listen(8000, () => {
  console.log('Port 8000 is listening.\n')
})
