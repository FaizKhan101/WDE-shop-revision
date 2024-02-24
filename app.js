const express = require("express")

const authRoutes = require("./routes/auth.routes")

const app = express()

app.use(authRoutes)

app.listen(4000, () => {
    console.log("Server is running on port 4000")
})

