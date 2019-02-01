const url = require('url')
const querystring = require('querystring')
const { user } = require('../../service/user/user')

module.exports = {
  login(ctx) {
    ctx.request.body = ''
    ctx.request.on('data', (data) => {
      ctx.request.body += data
    })

    ctx.request.on('end', () => {
      const query = querystring.parse(ctx.request.body)
      user.login(query, (data) => {
        ctx.response.end(JSON.stringify(data))
      })
    })
  },

  reg(ctx) {
    ctx.request.body = ''
    ctx.request.on('data', (data) => {
      ctx.request.body += data
    })

    ctx.request.on('end', () => {
      const query = querystring.parse(ctx.request.body)
      user.reg(query, (data) => {
        ctx.response.end(JSON.stringify(data))
      })
    })
  }
}