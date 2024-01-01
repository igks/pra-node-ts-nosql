import express from 'express';
import bodyParser from 'body-parser';
import authRouter from './routes/auth-route';
import postRoute from './routes/post-route';


const app = express();
app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/posts", postRoute)

export default app;