const createUserSession = require("../util/authentication");
const User = require("../models/user.model");
const userDetailsAreValid = require("../util/validation");
const sessionFlash = require("../util/session-flash");

exports.getSignup = async (req, res, next) => {
  let sessionData = await sessionFlash.getSessionData(req)

  if (!sessionData) {
    sessionData = {
      email: '',
      confirmEmail: '',
      password: '',
      fullname: '',
      street: '',
      postalCode: '',
      city: ''
    }
  }
  res.render("customer/auth/signup", { inputData: sessionData });
};

exports.postSignup = async (req, res, next) => {
  const email = req.body.email;
  const confirmEmail = req.body.confirmEmail;
  const password = req.body.password;
  const fullname = req.body.fullname;
  const street = req.body.street;
  const postalCode = req.body.postalCode;
  const city = req.body.city;

  if (
    !userDetailsAreValid(
      email,
      confirmEmail,
      password,
      fullname,
      street,
      postalCode,
      city
    )
  ) {
    console.log("user details");
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage:
          "Please check your inputs. Password must be 6 character long, postal code must be 5 character long.",
        email: email,
        confirmEmail: confirmEmail,
        password: password,
        fullname: fullname,
        street: street,
        postalCode: postalCode,
        city: city,
      },
      () => {
        res.redirect("/signup");
      }
    );
    return;
  }

  const userExist = await User.userWithSameEmail(email);

  if (userExist) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage:
          "User with this email already exist, Try to login instead.",
        email: email,
        confirmEmail: confirmEmail,
        password: password,
        fullname: fullname,
        street: street,
        postalCode: postalCode,
        city: city,
      },
      () => {
        res.redirect("/signup");
      }
    );
    return;
  }

  const user = new User(email, password, fullname, street, postalCode, city);

  try {
    await user.signup();
  } catch (error) {
    return next(error);
  }
  res.redirect("/login");
};

exports.getLogin = async (req, res, next) => {
  let sessionData = await sessionFlash.getSessionData(req)

  if (!sessionData) {
    sessionData = {
      email: '',
      password: ''
    }
  }
  res.render("customer/auth/login", { inputData: sessionData});
};

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let existingUser;

  try {
    existingUser = await User.userWithSameEmail(email);
  } catch (error) {
    return next(error);
  }

  if (!existingUser) {
    sessionFlash.flashDataToSession(req, {
      errorMessage: "Invalid credentials. Please check your email and password",
      email: email, 
      password: password
    }, () => {
      res.redirect("/login");
    });
    return;
  }

  const passwordIsCorrect = await User.hasMatchingPassword(
    password,
    existingUser.password
  );

  if (!passwordIsCorrect) {
    sessionFlash.flashDataToSession(req, {
      errorMessage: "Invalid credentials. Please check your email and password",
      email: email, 
      password: password
    }, () => {
      res.redirect("/login");
    });
    return;
  }

  createUserSession(req, existingUser, () => {
    res.redirect("/");
  });
};

exports.postLogout = async (req, res, next) => {
  await req.session.destroy();
  res.redirect("/");
};
