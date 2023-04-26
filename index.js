const express = require('express')
const app = express()
const port = 3000
const routes = require("./routes")
const bodyParser = require("body-parser")
const session = require("express-session")
const cookieParser = require('cookie-parser');
const RedisStore = require("connect-redis").default
const redis = require('redis');
const config = require("./config")

let redisClient = redis.createClient({
    url: config.REDIS_URL
})

redisClient.connect().catch(console.error)

let redisStore = new RedisStore({
    client: redisClient,
    prefix: "myapp:",
  })

const helpers = (app) => {
    app.use(bodyParser.json())
    app.use(session({
            store: redisStore,
            secret: 'my secret', // a secret key used for signing the session ID cookie
            resave: false, // do not save session if unmodified
            saveUninitialized: true // save new session even if not modified
    }))
    app.use(cookieParser());
    app.use(express.static("public"))
    app.use((req,res, next) => {
        if (req.method === "GET") {
            req.method = "PUT"
        }
        next()
    })
}

const listen = (app, port) => {
    helpers(app)
    routes(app)
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
}

listen(app, 3010)


