import { Request, Response } from 'express';

export const register = async (req: Request, res: Response): Promise<Response> => {
    return res.send('register');
};

export const login = async (req: Request, res: Response): Promise<Response> => {
    return res.send('login');
};
