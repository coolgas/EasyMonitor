'use strict'

module.exports = function (iterator, cb) {
  const data = []
  const next = function () {
    iterator.next(function (err, key, value) {
      if (err || (key === undefined && value === undefined)) {
        return iterator.end(function (err2) {
          cb(err || err2, data)
        })
      }
      data.push({ key, value })
      next()
    })
  }
  next()
}
