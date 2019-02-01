const http = require('http')

const { Router } = require('./router/router')
const { fetchResource } = require('./resource/resource')

const server = http.createServer((request, response) => {
  const ctx = {request, response}

  // Fetch the static resources
  try {
    fetchResource(ctx)
  }
  // Reach the controller
  catch {
    const router = new Router(ctx)
    router.dispatch()
  }
})

server.listen(8000, () => {
  console.log('Port 8000 is listening.\n')
})