import jwt from 'jsonwebtoken';

export interface ISigninData{
    email: string;
    password: string;
}

export interface ISignupData{
    email: string,
    name: string,
    password: string,
    role: string,
    status: string
  }

export interface IAddBookData{
    title: string,
    author: string,
    price: number,
    quantity: number
}

export interface IDeleteBook{
    bookId: string
}

export interface IRequest{
    _id:any,
    user_id: string,
    book_id: string,
    status: string,
    from_date: string,
    to_date:string
}

export interface IEditStatus{
    status: string,
    bookId: string
}

export interface IUserReqList{
    id: string
}
export interface IEditUserStatus{
    id: string,
    status: string
}

export interface ISearchValue{
    searchValue: string
}

export interface IJwtPayload{
    id: string | jwt.JwtPayload
}