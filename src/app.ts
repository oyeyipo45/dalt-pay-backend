import express from "express"
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from 'express-session';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import MongoStore from 'connect-mongo';
import errorHandler from 'errorhandler';
import authRouter from './routes/auth';


dotenv.config({ path: "variable.env" });

// const MongoStore = mongo(session);

const app = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
  session({
    name: process.env.SESSION_NAME,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
      store: MongoStore.create({
       mongoUrl :  process.env.DEV_MONGODB
    }),
  })
);

app.use('/auth', authRouter);

app.get("/", function(req: express.Request, res: express.Response) {
    return res.status(200).json({
        message: "Dalt pay home",
        status: 200
    });
});


if (app.get('env') === 'development') {
  app.use(errorHandler());
  app.locals.pretty = true;
}

export default app;
