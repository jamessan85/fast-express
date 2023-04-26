const {get: RequestGet} = require("./request")
const fs = require("fs")
const path = require("path")
const jwt = require("jsonwebtoken")

const user = {
    name: "bob",
    id: "1"
}

const loadHtml = async (route) => {
    
    return fs.readFileSync(`./views${route}`, "utf-8")
}

const checkTokenValid = (req, res, next) => {

    const accessToken = req.headers.authorization
    jwt.verify(accessToken, "its a secret", {}, async (err, data) => {
        console.log({err, data})
        if (err) {
            await jwt.verify(req.cookies.refreshToken, "it's different")
            // create a new access token
            const accessToken = await jwt.sign(user, "its a secret", {expiresIn: "15s"} )
            res.send({accessToken})
        } else {
            console.log("Access token OK")
            res.send({accessToken})
        }
    })
}

const routes = (app) => {
    app.get("/", (req, res) => {
        res.send("hello")
    })

    app.put("/", (req, res) => {
        res.send("I putted")
    })

    app.post("/checkToken", checkTokenValid)

    app.get("/login", async (req, res, next) => {
        const html = await loadHtml("/login.html")
        res.send(html)
    })

    app.post("/login", (req, res, next) => {
        const accessToken = jwt.sign(user, "its a secret", {expiresIn: "15s"} )
        const refreshToken = jwt.sign(user, "it's different")
        req.session.refreshToken = refreshToken
        res.cookie("refreshToken", refreshToken, {httpOnly: true})
        res.send({accessToken, refreshToken})
    })

    app.post("/secret", async (req, res, next) => {
        try {
            res.send("Shhhhh")
        } catch (error) {
            res.send(JSON.stringify(error))
        }
    })

    app.get("/request", RequestGet)

    app.post("/data", (req, res, next) => {
        console.log(req.body)
        res.send(500)
    })
}



module.exports = routes