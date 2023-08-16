import express, { Application } from "express";
import "reflect-metadata";
import "express-async-errors";
import loginRoutes from "./routes/login.routes";
import userRoutes from "./routes/users.routes";
import { handleErros } from "./error/error";
import cors from "cors";
import announcementRoutes from "./routes/announcements.routes";

const app: Application = express();

app.use(cors());

app.use(express.json());
app.use("/login", loginRoutes);
app.use("/announcements", announcementRoutes);
app.use("/users", userRoutes);

app.use(handleErros);
export default app;
