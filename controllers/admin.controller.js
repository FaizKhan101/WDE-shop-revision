const Product = require("../models/product.model")

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll()
        res.render("admin/products/all-products", { products })
    } catch (error) {
        return next(error)
    }
}

exports.getNewProduct = (req, res, next) => {
    res.render("admin/products/new-product")
}

exports.createProduct = async (req, res, next) => {
    console.log(req.body);
    const product = new Product({
        ...req.body,
        image: req.file.filename
    })
    try {
        await product.save()
    } catch (error) {
        return next(error)
    }

    res.redirect("/admin/products")
}

exports.getUpdateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
        res.render("admin/products/update-product", { product })
    } catch (error) {
        next(error)
    }

}

exports.postUpdateProduct = async (req, res, next) => {
    const product = new Product({
        ...req.body,
        _id: req.params.id
    })

    if (req.file) {
     product.replaceImage(req.file.filename)
    }

    try {
        await product.save()
        res.redirect("/admin/products")
    } catch (error) {
        next(error)
    }
}

exports.deleteProduct = async (req, res, next) => {
    const prodId = req.params.id

    try {
        await Product.deleteProductById(prodId)
        res.redirect("/admin/products")
    } catch (error) {
        next(error)
    }
}