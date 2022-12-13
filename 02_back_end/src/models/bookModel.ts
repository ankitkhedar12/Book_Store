import mongoose from 'mongoose';

interface IBook{
    title: string,
    author: string,
    price: number,
    quantity: number
}

const bookSchema = new mongoose.Schema<IBook>({
    title: {
        type: String,
        required: true,
        maxlength: 32,
        unique: true
    },

    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }

}, 
    { timestamps: true }
);
export const BookModel = mongoose.model<IBook>("Book", bookSchema);
