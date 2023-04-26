const get = async (req, res, next) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    res.send("bob")
}

module.exports = {get}