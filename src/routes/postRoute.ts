import express from 'express';
import { createPost, deletePost, getAllPost, getPost, updatePost } from '../controllers/postController';
import checkAuth from '../middlewares/checkAuth';

const postRoute = express.Router();

postRoute.get("/", getAllPost);
postRoute.get("/:id", getPost);
postRoute.post("/", checkAuth, createPost);
postRoute.put("/:id", updatePost);
postRoute.delete("/:id", deletePost);

export default postRoute;