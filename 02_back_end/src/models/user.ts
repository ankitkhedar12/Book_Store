import mongoose from 'mongoose';

interface IUser{
    name: string,
    email: string,
    password: string,
    role: string,
    status: string
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },

    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    
    password: {
        type: String,
        required: true
    },
    role: {
        type: String
    },
    status: {
        type: String
    }

}, 
    { timestamps: true }
);
export const User = mongoose.model<IUser>("User", userSchema);
