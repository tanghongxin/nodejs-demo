import http from 'http'

class Response extends http.ServerResponse {
  private static map: Record<string, string> = {
    '.wasm': 'application/wasm',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.html': 'text/html',
    '.css': 'text/css',
    '.jar': 'application/java-archive',
    '.json': 'application/json',
    '.jpg': 'image/jpeg',
  }

  private _json(payload = {}) {
    this.setHeader('content-type', 'application/json')
    this.write(JSON.stringify(payload))
    return this
  }
  
  public json(payload = {}) {
    return this
      ._json(payload)
      .end()
  }

  public notFound(url: string = '', method: string = '') {
    this.statusCode = 404
    this.setHeader('content-type', 'application/json')
    this._json({ message: `${method}:${url} is not available` })
    this.end()
  }

  public static(data: any, ext: string) {
    this.setHeader('content-type', Response.map[ext] || 'text/plain')
    this.writeHead(200)
    this.write(data)
    this.end()
  }
}

export default Response
