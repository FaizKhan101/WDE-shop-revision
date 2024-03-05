const express = require("express")

const adminController = require("../controllers/admin.controller")
const configuredMulterMiddleware = require("../middlewares/image-upload")

const router = express.Router()

router.get("/products", adminController.getProducts)

router.get("/products/new", adminController.getNewProduct)

router.post("/products",configuredMulterMiddleware, adminController.createProduct)

router.get("/products/:id", adminController.getUpdateProduct)

router.post("/products/:id", adminController.postUpdateProduct)

module.exports = router

