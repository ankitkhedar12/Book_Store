import { User } from '../../models/user';

export  const usersList = async ()=> {    
    try {
        const users = await User.find({});

        /** If users data is available in database */         
        if(users)
        {
            /** Return response with user */
            return users;
        }
        else
        return {err: "No Users Found", status: 400};
    } catch (error) {
        console.log("Error in UsersList API: ", error);
    }
}