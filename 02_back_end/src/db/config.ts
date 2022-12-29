import mongoose, { ConnectOptions } from "mongoose";
import dotenv from 'dotenv';

dotenv.config({
  path: '.env'
});

/** Connect to database */
try {
    mongoose
    .connect(process.env.DB_CONNECTION as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    //   poolSize: parseInt(process.env.POOL_SIZE!),
    //   family: 4,
    } as ConnectOptions)
    .then((res) => {
      console.log(
        'Connected to Distribution API Database - Initial Connection'
      );
    })
    .catch((err) => {
      console.log(
        `Initial Distribution API Database connection error occured -`,
        err
      );
    });
  console.log("connected to db");
} catch (error) {
  console.log(error);
}


const con = mongoose.connection;

export { con };