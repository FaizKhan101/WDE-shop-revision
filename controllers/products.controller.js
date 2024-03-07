const Product = require("../models/product.model")

exports.getProducts = async (req, res, next) => {
    const products = await Product.findAll()
    res.render("customer/products/all-products", { products })
}