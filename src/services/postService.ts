import { PostModel } from '../models/postModel';

export const getAll = () => PostModel.find();

export const getById = (id: string) => PostModel.findById(id);

export const create = (values: Record<string, any>) => new PostModel(values).save().then((user) => user.toObject());

export const update = async (id: string, values: Record<string, any>) => {
  const doc = PostModel.findByIdAndUpdate(id, values, {new: true});
  return doc;
};

export const remove = (id: string) => PostModel.findOneAndDelete({ _id: id });
