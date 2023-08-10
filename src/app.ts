import express, { Application } from "express";
import "reflect-metadata";
import "express-async-errors";
import announcementRoutes from "./routes/announcements.routes";
import loginRoutes from "./routes/login.routes";
import userRoutes from "./routes/users.routes";
const cors = require('cors'); 

const app: Application = express();

app.use(cors());

app.use(express.json());
app.use("/login", loginRoutes);
app.use("/users", userRoutes);
export default app;
