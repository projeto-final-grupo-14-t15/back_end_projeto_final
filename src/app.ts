import express, { Application } from "express";
import "reflect-metadata";
import "express-async-errors";
import announcementRoutes from "./routes/announcements.routes";
import loginRoutes from "./routes/login.routes";
import userRoutes from "./routes/users.routes";
import { handleErros } from "./error/error";

const app: Application = express();

app.use(express.json());
app.use("/login", loginRoutes);
app.use("/announcements", announcementRoutes);
app.use("/users", userRoutes);


app.use(handleErros)
export default app;
