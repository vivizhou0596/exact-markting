module.exports = function(app) {
  app.use('/build', require('./targets'))
}