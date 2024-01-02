import { debug } from "../helpers/debugger";
import { getAll, getById, update, remove } from "../services/userService";
import { ERequest, EResponse } from "../types/global";

export const getAllUsers = async (req: ERequest, res: EResponse) => {
  try {
    const users = await getAll();
    return res.Ok({ data: users });
  } catch (error) {
    debug(error);
    return res.ServerError();
  }
};

export const getUser = async (req: ERequest, res: EResponse) => {
  try {
    const { id } = req.params;
    const user = await getById(id);
    if (!user) {
      return res.NotFound();
    }
    return res.Ok({ data: user });
  } catch (error) {
    debug(error);
    return res.ServerError();
  }
};

export const updateUser = async (req: ERequest, res: EResponse) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.BadRequest({});
    }

    const user = await getById(id);
    user.name = name;

    await update(id, user);
    return res.Ok({ data: user });
  } catch (error) {
    debug(error);
    return res.ServerError();
  }
};

export const deleteUser = async (req: ERequest, res: EResponse) => {
  try {
    const { id } = req.params;
    const deletedUser = await remove(id);
    return res.Ok({ data: deletedUser });
  } catch (error) {
    debug(error);
    return res.ServerError();
  }
};
