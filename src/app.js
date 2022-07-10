import express from 'express'
const app = express();
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import "dotenv/config";
import compression from 'compression';
import { connect } from '../src/configs/db.js'
import {userRoutes} from "./routes/user.route.js";
import { postRoutes } from "./routes/post.route.js";
import { tagRoutes } from "./routes/tag.route.js";
import { categoryRoutes } from "./routes/category.route.js"
import { commentRoutes } from "./routes/comment.route.js"
import { notifyRoutes } from './routes/notify.route.js';
//import { authJwt } from "./utils/jwt.js";
//import { errorHandler } from "./utils/error-handler.js"
import fileUpload from 'express-fileupload';
import { uploadRoutes } from './routes/upload.js';
import { SocketServer } from "./socketServer.js";
import http from "http";
import {Server} from "socket.io";
import { healthCheckRoutes } from './routes/healthCheck.route.js';

app.use(cors());
app.options("*", cors());
app.use(helmet());
app.use(fileUpload({
    useTempFiles: true
}))

//middleware
app.use(express.json());
app.use(morgan("common"));
app.use(express.urlencoded({
    extended: true
}));
//app.use(authJwt());
//app.use(errorHandler);

//#region //!socket
const server = http.createServer(app);
const io = new Server(server);


io.on('connection', socket => {
    SocketServer(socket);
})

//Routes
const api = process.env.API_URL;

app.use(`${api}/user`, userRoutes);
app.use(`${api}/post`, postRoutes);
app.use(`${api}/tag`, tagRoutes);
app.use(`${api}/category`, categoryRoutes);
app.use(`${api}/comment`, commentRoutes);
app.use(`${api}/notify`, notifyRoutes);
app.use(`${api}/upload`, uploadRoutes);
app.use(`${api}/healthCheck`, healthCheckRoutes);

//DB connect
connect();

//compression
app.use(
    compression({
        level: 6,
        threshold: 10 * 1000,
        filter: (req, res) => {
            if (req.headers["x-no-compression"]) {
                return false;
            }
            return compression.filter(req, res);
        },
    })
);


app.get("/", (req, res) => {
    res.send("Server is running!");
});

//Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
