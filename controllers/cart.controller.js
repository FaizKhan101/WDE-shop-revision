const Product = require("../models/product.model")

exports.getCart = (req, res, next) => {
    res.render("customer/cart/cart")
}

exports.addCartItem = async (req, res, next) => {
    let product; 
    try {
        product = await Product.findById(req.body.productId)
    } catch (error) {
        return next(error)
    }
    const cart = res.locals.cart;

    cart.addItem(product)
    req.session.cart = cart
    // await req.session.save()
    res.status(201).json({
        message: "Cart Updated!",
        newTotalItems: cart.totalQuantity
    })
}