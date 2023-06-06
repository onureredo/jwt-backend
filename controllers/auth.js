import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

// Register
export const signUp = asyncHandler(async (req, res, next) => {
  /* 

  Check if user exists (email)
    - If user exists, return an error
    - If user doesn't exist:
      - Secure password by hashing it
      - Store the user in the database
      - Sign a token
      - Return the JWT      
*/

  const { firstName, lastName, username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser)
    throw new ErrorResponse('An account with this Email already exists.');

  const hash = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    firstName,
    lastName,
    username,
    email,
    password: hash,
  });

  const token = jwt.sign({ uid: newUser._id }, process.env.JWT_SECRET);
  res.status(201).send({ token });
});

// Login
export const signIn = asyncHandler(async (req, res, next) => {
  /*   

  Check if user exists:
    - If user doesn't exist, return an error
    - If user exists:
      - Check if the user's password matches the request password
        - If there's no match, return an error
        - If there's a match, sign a token
      - Return the token
*/

  const { email, password } = req.body;
  const existingUser = await User.findOne({ email }).select('+password');

  if (!existingUser) throw new ErrorResponse('User does not exist.', 404);

  const matchPassword = await bcrypt.compare(password, existingUser.password);

  if (!matchPassword) throw new ErrorResponse('Password is incorrect', 401);

  const token = jwt.sign({ uid: existingUser._id }, process.env.JWT_SECRET);
  res.status(200).send({ token });
});

// Get User
export const getUser = asyncHandler(async (req, res, next) => {
  // Retrieve the user from the database based on the user ID provided in the request
  // Return the user as a JSON response

  const user = await User.findById(req.uid);
  res.json(user);
});
