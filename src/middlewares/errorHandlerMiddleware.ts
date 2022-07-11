import {Request, Response, NextFunction} from "express";

export default function errorHandler (error, req: Request, res: Response, next: NextFunction) {
    if (error.status) return res.sendStatus(error.status);
    res.sendStatus(500); 
}