import { Router } from "express";
import { 
  fetchPosts,
  fetchPost,
  createPost,
  updatePost,
  deletePost
} from "../controllers/post.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { isPostOwner } from "../middlewares/post.middleware.js";

const router = Router();

router.get("/", fetchPosts);
router.get("/:id", fetchPost);

router.post("/", isAuthenticated, createPost);

router.patch("/:id", isAuthenticated, isPostOwner, updatePost);
router.delete("/:id", isAuthenticated, isPostOwner, deletePost);

export default router;
