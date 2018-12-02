require('dotenv').config({ path: 'variables.env' })
const cookieParser = require('cookie-parser')
// const jwt = require('jsonwebtoken')

const createServer = require('./createServer')
const db = require('./db')

const server = createServer()

// middlewares
server.express.use(cookieParser())

// decode jwt to figute out current user
// server.express.use((req, res, next) => {
//   const { token } = req.cookies
//   if (token) {
//     const { userId } = jwt.verify(token, process.env.APP_SECRET)
//     // put user id on req
//     req.userId = userId
//   }
//   next()
// })

// // populate user object on each request
// server.express.use(async (req, res, next) => {
//   if (!req.userId) {
//     return next()
//   }

//   const user = await db.query.user(
//     {
//       where: {
//         id: req.userId
//       }
//     },
//     '{ id, email, permissions, name }'
//   )

//   req.user = user
//   next()
// })

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  deets => {
    console.log(`coffeedb server is running on http://localhost:${deets.port}`)
  }
)
