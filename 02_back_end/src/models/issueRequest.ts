import mongoose, { Date, Schema } from 'mongoose';

interface IBookRequest{
    user_id: Schema.Types.ObjectId,
    book_id: Schema.Types.ObjectId,
    status: string,
    from_date: Date | string,
    to_date: Date | string
}

const issueRequest = new mongoose.Schema<IBookRequest>({
    user_id: {
        type: Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: "users"
    },
    
    book_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "books"
    },
    status: {
        type: String,
        required: true
    },
    from_date: {
        type: String,
        required: true
    },
    to_date: {
        type: String,
        required: true
    },

}, 
    { timestamps: true }
);
export const IssueBookRequest = mongoose.model<IBookRequest>("IssueRequest", issueRequest);
