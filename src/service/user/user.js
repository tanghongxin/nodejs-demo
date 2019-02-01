const db = require('../../../config/environment/development/database')
const { sign, verify} = require('../../../config/common/function/jwt')
const { makeResponse } = require('./response')
const md5 = require("blueimp-md5")

const user = {
  login(data, cb) {
    const sql = `select * from user where username = ${db.escape(data.username)}`
    db.query(sql, (err, results) => {
      if (err) {
        return cb(makeResponse(400))
      }

      if (results.length && results[0].password === md5(data.password)) {
        delete results[0].password
        return cb(makeResponse(200, {
          id: results[0].id,
          jwt: sign(results[0])
        }))
      }

      return cb(makeResponse(401))
    })
  },

  reg(data, cb) {
    let sql = `select * from user where username = ${db.escape(data.username)}`
    db.query(sql, (err, results) => {
      if (err) {
        return cb(makeResponse(400))
      } 

      if (results.length) {
        return cb(makeResponse(402))
      }

      sql = 'insert into `user` set ?'
      data.password = md5(data.password)
      db.query(sql, data, (err) => {
        return err ? cb(makeResponse(403)) : cb(makeResponse(201))
      })
    })
  },

  info(token) {
    return verify(token)
  }
}

module.exports.user = user