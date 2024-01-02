import express from 'express';
import bodyParser from 'body-parser';
import authRouter from './routes/authRoute';
import postRoute from './routes/postRoute';
import composeResponse from './middlewares/composeResponse';


const app = express();
app.use(bodyParser.json());
app.use(composeResponse());

app.use("/auth", authRouter);
app.use("/posts", postRoute)

export default app;