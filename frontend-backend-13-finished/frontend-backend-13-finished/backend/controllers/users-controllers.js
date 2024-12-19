const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Max Schwarz',
    email: 'test@test.com',
    password: 'testers'
  }
];

const User = require('../models/user');

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({ users: users.map(user => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      'User exists already, please login instead.',
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      'Could not create user, please try again.',
      500
    );
    return next(error);
  }

  // const createdUser = new User({
  //   name,
  //   email,
  //   image: 'https://live.staticflickr.com/7631/26849088292_36fc52ee90_b.jpg',
  //   password,
  //   places: []
  // });
  const createdUser = new User({
    name,
    email,
    image: req.file.path,
    password: hashedPassword,
    places: []
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  // res.status(201).json({ user: createdUser.toObject({ getters: true }) });

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      'Could not log you in, please check your credentials and try again.',
      500
    );
    return next(error);
  }

  // if (!existingUser || existingUser.password !== password) {
  //   const error = new HttpError(
  //     'Invalid credentials, could not log you in.',
  //     401
  //   );
  //   return next(error);
  // }

  if (!isValidPassword) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  // res.json({
  //   message: 'Logged in!',
  //   user: existingUser.toObject({ getters: true })
  // });

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token
  });
};

// const getUsers = (req, res, next) => {
//   res.json({ users: DUMMY_USERS });
// };


// const signup = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     throw new HttpError('Invalid inputs passed, please check your data.', 422);
//   }
//   const { name, email, password } = req.body;

//   const hasUser = DUMMY_USERS.find(u => u.email === email);
//   if (hasUser) {
//     throw new HttpError('Could not create user, email already exists.', 422);
//   }

//   const createdUser = {
//     id: uuid(),
//     name, // name: name
//     email,
//     password
//   };

//   DUMMY_USERS.push(createdUser);

//   res.status(201).json({user: createdUser});
// };

// const login = (req, res, next) => {
//   const { email, password } = req.body;

//   const identifiedUser = DUMMY_USERS.find(u => u.email === email);
//   if (!identifiedUser || identifiedUser.password !== password) {
//     throw new HttpError('Could not identify user, credentials seem to be wrong.', 401);
//   }

//   res.json({message: 'Logged in!'});
// };

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
