import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET } = process.env;

// Authenticate user using HTTP-only cookie
export const isAuthenticated = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "you are not logged in, please log in"
      });
    }

    // Verify token
    const user = jwt.verify(token, JWT_SECRET);

    // Attach decoded user info to req
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "you are not logged in, login first"
    });
  }
};

// Authorize user for protected routes
export const isAuthorized = (req, res, next) => {
  // Guard clause: block if user ID does not match route param
  if (req.user._id !== req.params.id) {
    return res.status(403).json({
      message: "not authorized"
    });
  }

  next();
};

