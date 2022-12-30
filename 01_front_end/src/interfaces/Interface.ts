export interface IBook{
    _id: any,
    title: string,
    author: string,
    price: number,
    quantity: number
  }

export interface IRequest{
    _id:any,
    user_name: string,
    book_name: string,
    status: string,
    from_date: string,
    to_date:string
}

export interface IUser{
    _id: string,
    name: string,
    email: string,
    password: string,
    role: string,
    status: string
}
export interface FormValues  {
    email: string;
    password: string;
  };

export interface Inputs {
    name: string,
    email: string,
    password: string;
  };
  
export interface IFormInputs {
    title: string
    author: string
    price: number
    quantity: number
  }  