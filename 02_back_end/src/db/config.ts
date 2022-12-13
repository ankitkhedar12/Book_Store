import mongoose, { ConnectOptions } from "mongoose";

// mongoose.connect('mongodb://localhost:27017/myDB');
//Connect to database
try {
    mongoose
    .connect('mongodb://127.0.0.1:27017/myDB', {
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

// con.on('connected', function(){
//     console.log("Database is connected successfully");
// })
// con.on('disconnected', ()=> {
//     console.log("Database is disconnected successfully");
// })
// con.on('error', console.error.bind(console, 'connection error: '));


export { con };

