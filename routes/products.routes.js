const express = require("express")

const router = express.Router()

router.get("/products", (req, res, next) => {
    res.redirect("/customer/products/all-products")
})

module.exports = router

