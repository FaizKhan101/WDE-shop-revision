const createUserSession = require("../util/authentication")
const User = require("../models/user.model")

exports.getSignup = (req, res, next) => {
    res.render("customer/auth/signup")
}

exports.postSignup = async (req, res, next) => {
    const email = req.body.email;
    const confirmEmail = req.body.confirmEmail;
    const password = req.body.password;
    const fullname = req.body.fullname;
    const street = req.body.street;
    const postalCode = req.body.postalCode;
    const city = req.body.city;

    const user = new User(email, password, fullname, street, postalCode, city)

    await user.signup()
    res.redirect("/login")
}

exports.getLogin = (req, res, next) => {
    res.render("customer/auth/login")
}

exports.postLogin = async (req, res, next) => {
 const email = req.body.email;
 const password = req.body.password   

 const existingUser = await User.userWithSameEmail(email)

 if (!existingUser) {
    return res.redirect("/login")
 }

 const passwordIsCorrect = User.hasMatchingPassword(password, existingUser.password)

 if (!passwordIsCorrect) {
    return res.redirect("/login")
 }

 createUserSession(req, existingUser, () => {
     res.redirect("/")
 })
}

