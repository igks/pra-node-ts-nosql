import http from "http";
import dotenv from "dotenv";
import app from "./app";
import { connectDatabase } from "./db";
import { debug } from "./helpers/debugger";

dotenv.config();

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST;

connectDatabase()
  .then(() => {
    server.listen(PORT, () => {
      debug(`Server running on ${HOST}:${PORT}`);
    });
  })
  .catch((error) => debug(error));
