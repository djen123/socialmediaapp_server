import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.route.js"
import commentRoutes from "./routes/comment.route.js"

dotenv.config();

const { PORT, MONGODB_URL } = process.env;

const app = express();

// CORS — allow frontend (5173) to access backend (3000)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/comments",commentRoutes)


// Root route
app.get("/", (req, res) => {
  res.json({
    app: "full stack app",
    date: new Date().toLocaleString()
  });
});

// Database connection
await mongoose.connect(MONGODB_URL);
console.log("Database connected");

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});

/**
 Token storage strategies:
    localstorage : store the token in the browser's local storage.simple but vulnerable to xss attacks
    Cookies : store the token in an HTTP-only cookie. Secure against XSS attacks but can be vulnerable to CSRF.Javascript 
    cannot steal the token from HTTP_only cookie
        - npm cookie-parser // package to add cookie to req.cookies
        - setup ways to 
credentials to true to cors will accept cookie as header by browser


cookies setup to send and receive cookies from server to client and vice versa
server 
    - start with res.cookie('token',token) to set the token ,
    - res.clearCookie('token'):clear the token
    - add credentials true to cors configuration

client
    - add withCredentials true to the axios request
    - withCredentials to true ensures that request that is sent carries the token

To set /clear cookies 
    - res.cookies('token',token) - set the cookies
    - res.clearCookie("token") - clear the cookie

To read cookies
    use cookie-parser middleware in the server
    app.use(cookieParser())
    req.cookies.token - read the token from the request cookies


 */