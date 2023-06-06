import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import asyncHandler from '../utils/asyncHandler';
import ErrorResponse from '../utils/ErrorResponse';

// Register
export const signUp = asyncHandler(async (req, res, next) => {
  /* 

   Check if user exists (email) =>  have access to body of request [x]
    if exists return error [x]
    if not exists [x]
      secure password => hashing password [x]
      storing user [x]
      signing token [x]
      Return JWT [x]
*/

  const { firstName, lastName, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser)
    throw new ErrorResponse('An account with this Email already exists.');
  const hash = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password: hash,
  });
  const token = jwt.sign({ uid: newUser._id }, process.env.JWT_SECRET);
  res.status(201).send({ token });
});

// Login
export const signIn = asyncHandler(async (req, res, next) => {
  /* 

    Check if user exists [x]
      if not exists => return error [x]
      if exists [x]
        check if user password  === request password [x]
          if no match => return error [x]
          if match => sign token [x]
          return token [x]
 */

  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (!user) throw new ErrorResponse('User does not exist.', 404);
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) throw new ErrorResponse('Password is incorrect', 401);
  const token = jwt.sign({ uid: existingUser._id }, process.env.JWT_SECRET);
  res.status(200).send({ token });
});

export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.uid);
  res.json(user);
});
