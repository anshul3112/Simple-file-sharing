import express from 'express'
import cors from 'cors' 
import cookieParser from 'cookie-parser'; 
import userRouter from './routes/user.routes.js';
import fileRouter from './routes/file.routes.js';

const app = express(); 

app.use(cors({
  origin: [process.env.CORS_ORIGIN,"http://localhost:3000"], 
  credentials: true,
}));

app.use(express.json({
    limit : "16kb"
}))
app.use(express.urlencoded({
    extended : true, // object inside object
    limit : '16kb'
}))

app.use(cookieParser());

//route middlewares :
app.use('/api/v1/users' ,userRouter );
app.use('/api/v1/files' ,fileRouter );

export {
    app 
}