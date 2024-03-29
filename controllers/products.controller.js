const Product = require("../models/product.model")

exports.getProducts = async (req, res, next) => {
    const products = await Product.findAll()
    res.render("customer/products/all-products", { products })
}

exports.getProductDetails = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
        res.render("customer/products/product-details", { product })
    } catch (error) {
        next(error)
    }
}