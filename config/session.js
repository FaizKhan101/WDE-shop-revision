const expressSession = require("express-session")
const mongoDbStore = require("connect-mongodb-session")

const createSessionStore = () => {
    const MongoDbStore = mongoDbStore(expressSession)
    const store = new MongoDbStore({
        uri: "mongodb://localhost:27017",
        databaseName: "WDE-shop-R",
        collection: "sessions"
    })

    return store
}

const sessionConfig = () => {
    return {
        secret: "supersecret",
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        cookie: {
            maxAge: 2 * 24 * 60 * 60 * 1000
        }
    }
}

module.exports = sessionConfig
