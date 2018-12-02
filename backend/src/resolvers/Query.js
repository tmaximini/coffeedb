const { forwardTo } = require('prisma-binding')

const Query = {
  coffees: forwardTo('db'),
  coffee: forwardTo('db')
}

module.exports = Query
