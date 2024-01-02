import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getByEmail, create } from "../services/userService";
import { ERequest, EResponse } from "../types/global";
import { debug } from "../helpers/debugger";

export const signup = async (req: ERequest, res: EResponse) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await getByEmail(email);
    if (existUser) {
      return res.BadRequest({ message: "Email already exist!" });
    }

    const salt = bcrypt.genSaltSync(10);
    const securePassword = bcrypt.hashSync(password, salt);
    const user = await create({
      email,
      name,
      password: securePassword,
    });

    return res.Ok({ data: user });
  } catch (error) {
    debug(error);
    return res.ServerError();
  }
};

export const login = async (req: ERequest, res: EResponse) => {
  const { email, password } = req.body;
  const user = await getByEmail(email).select("+password");
  if (!user) {
    return res.NotFound();
  }

  const isAuthenticated = bcrypt.compareSync(password, user.password);
  if (isAuthenticated) {
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id,
      },
      process.env.JWT_KEY
    );
    return res.Ok({
      data: { user, token },
      message: "Logged in successfully!",
    });
  }

  return res.Unauthorized();
};
