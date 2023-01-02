import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import routes from './src/routers/userRoutes'
import { connection } from './src/db/config';

/** load the environment variables from the .env file */
dotenv.config({
  path: '.env'
});

/**
 * Express server application class.
 * @description Will later contain the routing system.
 */
class Server {
  public app = express();
}

/** Initialize server server.app */
const server = new Server();

/** Mongodb connecion response */
connection.on('connected', function(){
  console.log("Database is connected successfully");
})
connection.on('disconnected', ()=> {
  console.log("Database is disconnected successfully");
})
connection.on('error', console.error.bind(console, 'connection error: '));

/**  Middlewares  */
server.app.use(cors())

/** Parse requests of content-type - application/json */ 
server.app.use(express.json());
server.app.use(express.urlencoded({
  extended: true
}));

/** Routes middleware */
server.app.use('/api/', routes);

/** Make server listen on some port */
const port = process.env.APP_PORT;
server.app.listen(port, () => console.log(`> Listening on port ${port}`));