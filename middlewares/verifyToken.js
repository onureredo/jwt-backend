import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const verifyToken = asyncHandler(async (req, res, next) => {
  /*
    Check if token is present in the request:
      - If not present, return an error
      - If present:
        - Verify the token
          - If the token is invalid, return an error
          - If the token is valid:
            - Create a `uid` property in the request object and set it to the decoded user ID
            - Call the `next` function to pass control to the next middleware
  */

  const { authorization } = req.headers;
  if (!authorization) throw new ErrorResponse('Please login', 401);

  const decoded = jwt.verify(authorization, process.env.JWT_SECRET);
  req.uid = decoded.uid;
  next();
});

export default verifyToken;
