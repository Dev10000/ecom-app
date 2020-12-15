import { Request, Response } from 'express';

const logout = async (req: Request, res: Response): Promise<Response> => {
    req.logout();
    return res.status(200).json({ status: 'error', data: 'Successfully logged out!' });
};

export default logout;
