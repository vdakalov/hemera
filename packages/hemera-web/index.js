'use strict'

const Web = require('./lib')
const Hp = require('hemera-plugin')

exports.plugin = Hp(function hemeraWeb (options, next) {
  const hemera = this
  const web = new Web(hemera, options)
  web.listen(() => {
    hemera.log.info(`HTTP Server listening on: ${options.host}:${options.port}`)
    next()
  })

  hemera.on('close', () => {
    web._server.close()
    hemera.log.warn('Http server closed!')
  })
})

exports.options = {
  port: 3000,
  host: '127.0.0.1',
  errors: { propBlacklist: ['stack'] },
  pattern: {}
}

exports.attributes = {
  pkg: require('./package.json')
}
