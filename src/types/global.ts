import { Request, Response } from "express";

export type ResponsePayload = {
  message?: string;
  data?: any;
  error?: any;
};

export interface ERequest extends Request {
  userId: string;
}

export interface EResponse extends Response {
  Ok: (payload: ResponsePayload) => void;
  Unauthorized: () => void;
  BadRequest: (payload: ResponsePayload) => void;
  NotFound: () => void;
  ServerError: () => void;
}
