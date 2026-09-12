import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const fetchPosts = async (req, res) => {
  try {
    const { userId } = req.query;
    const query = {};

    if (userId) {
      query.author = userId;
    }

    const posts = await Post.find(query).populate("author", "name email avatar");

    return res.json({ posts });
  } catch (e) {
    return res.status(500).json({ status: "something wrong" });
  }
};

export const fetchPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author");
    return res.json({ post });
  } catch (e) {
    return res.status(500).json({ status: "something wrong" });
  }
};

export const createPost = async (req, res) => {
  try {
    const { content ,image} = req.body;
    const { user } = req;

    const newPost = await Post.create({
      content,
      image,
      author: user._id
    });

    return res.status(201).json({
      message: "post created",
      post: newPost
    });
  } catch (error) {
    return res.status(500).json({ status: "something wrong" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { content: req.body.content },
      {image:req.body.image},
      { new: true }
    );

    return res.json({ message: "post updated", post: updatedPost });
  } catch (e) {
    return res.status(500).json({ status: "something wrong" });
  }
};

export const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    return res.json({ message: "post deleted" });
  } catch (e) {
    return res.status(500).json({ status: "something wrong" });
  }
};
