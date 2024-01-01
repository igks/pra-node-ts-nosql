import {Request} from 'express';

export interface U_Request extends Request
{
    userId: string;
}