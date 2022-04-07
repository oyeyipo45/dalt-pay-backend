import express from "express"
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from 'express-session';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import MongoStore from 'connect-mongo';
import errorHandler from 'errorhandler';


dotenv.config({ path: "variable.env" });


const app = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/", function(req: express.Request, res: express.Response) {
    return res.status(200).json({
        message: "Dalt pay home",
        statius: 200
    });
});



if (app.get('env') === 'development') {
  app.use(errorHandler());
  app.locals.pretty = true;
}

export default app;
