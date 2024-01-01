import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getByEmail, create } from '../services/user-service';

export const signup = async (req: Request, res: Response) => {
  try {
  const {name, email, password} = req.body;
  const existUser = await getByEmail(email);
  if (existUser) {
    return res.status(400).json({
      message: "Email already exist!",
    });
  }

  const salt = bcrypt.genSaltSync(10);
  const securePassword = bcrypt.hashSync(password, salt);
  const user = await create({
    email,
    name,
    password: securePassword
  });

  return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      user: null,
      error: null,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await getByEmail(email).select('+password');
  if (!user) {
    return res.status(404).json({
      message: "User not found!",
    });
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

    return res.status(200).json({
      message: "Logged in successfully!",
      user,
      token,
    });
  }

  res.status(401).json({
    message: "Invalid credential!",
  });
}
