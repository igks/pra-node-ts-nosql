import { debug } from "../helpers/debugger";
import * as SERVICE from "../services/postService";
import { ERequest, EResponse } from "../types/global";

export const getAllPost = async (req: ERequest, res: EResponse) => {
  try {
    const posts = await SERVICE.getAll();
    return res.Ok({ data: posts });
  } catch (error) {
    debug(error);
    return res.ServerError();
  }
};

export const getPost = async (req: ERequest, res: EResponse) => {
  try {
    const { id } = req.params;
    const post = await SERVICE.getById(id);
    if (!post) {
      return res.NotFound();
    }

    return res.Ok({ data: post });
  } catch (error) {
    debug(error);
    return res.ServerError();
  }
};

export const createPost = async (req: ERequest, res: EResponse) => {
  try {
    const { title, content } = req.body;
    const post = await SERVICE.create({
      title,
      content,
      userId: req.userId,
    });

    return res.Ok({ data: post });
  } catch (error) {
    debug(error);
    return res.ServerError();
  }
};

export const updatePost = async (req: ERequest, res: EResponse) => {
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
    return res.Ok({ data: result });
  } catch (error) {
    debug(error);
    return res.ServerError();
  }
};

export const deletePost = async (req: ERequest, res: EResponse) => {
  try {
    const { id } = req.params;
    const deletedPost = await SERVICE.remove(id);

    return res.Ok({ data: deletedPost });
  } catch (error) {
    debug(error);
    return res.ServerError();
  }
};
