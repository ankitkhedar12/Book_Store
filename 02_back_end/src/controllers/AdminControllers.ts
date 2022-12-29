import { Request, RequestHandler, Response, NextFunction } from 'express';
import addbooks from '../services/adminServices/addbooks';
import deletebooks from '../services/adminServices/deletebooks';
import editBookRequestStatus from '../services/adminServices/editBookRequestStatus';
import editUserStatus from '../services/adminServices/editUserStatus';
import { reqList } from '../services/adminServices/reqList';
import { usersList } from '../services/adminServices/usersList';

export  const AddBooks: RequestHandler = async (req: Request, res: Response)=> {
    res.send(await addbooks(req.body));
}

export  const DeleteBooks: RequestHandler = async (req: Request, res: Response)=> {
    res.send(await deletebooks(req.body))
}

export  const EditStatus: RequestHandler = async (req: Request, res: Response)=> {
    res.status(200).send(await editBookRequestStatus(req.body));
}

export  const ReqList: RequestHandler = async (req: Request, res: Response, next: NextFunction)=> {
    const response = await reqList(req,res, next);
    res.send(response);
}

export  const UsersList: RequestHandler = async (req: Request, res: Response)=> {
    const response = await usersList();
    res.status(200).send(response);
}
export  const EditUserStatus: RequestHandler = async (req: Request, res: Response)=> {
    const response = await editUserStatus(req.body);
    res.status(200).send(response);
}