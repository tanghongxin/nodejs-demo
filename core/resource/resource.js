const extMap = (fileName) => {
  const { extname } = require('path')
  const mimes = {
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.jpeg': 'iamge/jpeg',
    '.html': 'html'
  }
  return mimes[extname(fileName)]
}

const fetchResource = (ctx) => {
  const fs = require('fs')
  const { join } = require('path')
  // FIXME: protocol
  const { headers, url} = this.ctx.request
  const { pathname } = new URL(url, 'http://' + headers.host)

  fs.readFileSync(join(`.`, `public`, pathname), (err, data) => {
    if (err) {
      throw new Error()
    } else {
      response.setHeader('content-type', extMap(pathname))
      response.end(data)
    }
  })
}

exports.fetchResource = fetchResource