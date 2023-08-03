import express, { Application } from "express"
import "reflect-metadata"
import "express-async-errors"


const app:Application = express()

app.use(express.json())


export default app