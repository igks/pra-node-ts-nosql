import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ERequest, EResponse } from "../types/global";
import { debug } from "../helpers/debugger";

type DecodedToken = {
  email: string;
  userId: string;
};

export default function checkAuth(
  req: ERequest,
  res: EResponse,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY) as DecodedToken;
    req.userId = decodedToken?.userId;

    next();
  } catch (error) {
    debug(error);
    return res.Unauthorized();
  }
}
