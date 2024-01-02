import { UserModel } from "../models/userModel";

export const getAll = () => UserModel.find();

export const getByEmail = (email: string) => UserModel.findOne({ email });

export const getById = (id: string) => UserModel.findById(id);

export const create = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());

export const update = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);

export const remove = (id: string) => UserModel.findOneAndDelete({ _id: id });
