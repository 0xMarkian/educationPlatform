const _ = require('lodash')

const base = require('./base')

const migrationsConfig = Object.assign({},base, {
  entry: './migrations/intializeDB',
  watch: false,
})

module.exports = migrationsConfig