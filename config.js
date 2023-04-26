require('dotenv').config()

module.exports = {
    REDIS_URL: process.env.REDIS_URL,
    PORT: process.env.PORT || 3010
}