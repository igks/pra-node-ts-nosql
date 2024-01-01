import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { U_Request } from '../types/global';

type DecodedToken = {
  email: string;
  userId: string;
}

export default function checkAuth(req: U_Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY) as DecodedToken;
    req.userId = decodedToken?.userId;
    
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Authentication failed!",
    });
  }
}