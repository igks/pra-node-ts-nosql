import { NextFunction } from "express";
import { ERequest, EResponse, ResponsePayload } from "../types/global";

export default function composeResponse() {
  return function (req: ERequest, res: EResponse, next: NextFunction) {
    res.Ok = (payload: ResponsePayload) => {
      res.status(200).json({
        ...payload,
        success: true,
      });
    };

    res.BadRequest = (payload: ResponsePayload) => {
      res.status(400).json({
        success: false,
        message: "Data validation failed!",
        ...payload,
      });
    };

    res.Unauthorized = () => {
      res.status(401).json({
        success: false,
        message: "Unauthorized user!",
      });
    };

    res.NotFound = () => {
      res.status(404).json({
        success: false,
        massage: "Record not found!",
      });
    };

    res.ServerError = () => {
      res.status(500).json({
        success: false,
        massage: "Server error processing the request!",
      });
    };

    next();
  };
}
