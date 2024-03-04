const Product = require("../models/product.model")

exports.getProducts = (req, res, next) => {
    res.render("admin/products/all-products")
}

exports.getNewProduct = (req, res, next) => {
    res.render("admin/products/new-product")
}

exports.createProduct = async (req, res, next) => {
    const product = new Product({
        ...req.body,
        image: req.file.filename
    })

    await product.save()

    res.redirect("/admin/products")
}