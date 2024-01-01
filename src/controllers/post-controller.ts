import { Request, Response } from 'express';
import * as SERVICE from '../services/post-service';
import { U_Request } from '../types/global';

export const getAllPost = async (req: Request, res: Response) => {
  try {
    const posts = await SERVICE.getAll();

    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await SERVICE.getById(id);
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}


export const createPost = async (req: U_Request, res: Response) => {
  try {
  const {title, content} = req.body;
  const post = await SERVICE.create({
    title,
    content,
    userId: req.userId
  });

  return res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      user: null,
      error: null,
    });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.sendStatus(400);
    }

    const post = await SERVICE.getById(id);
    post.title = title;
    post.content = content;

    const result = await SERVICE.update(id, post);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedPost = await SERVICE.remove(id);

    return res.json(deletedPost);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}
