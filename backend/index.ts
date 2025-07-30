import dotenv from "dotenv";

dotenv.config();

import express, { Request, Response } from "express";
import newItemRouter from "./routers/newItem";
const app = express();

// Add JSON parsing abilities to express
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Hello World!");
})

const PORT: number = Number(process.env.PORT) || 3001;

app.listen(PORT, '0.0.0.0', () => {
    console.log("Server running at PORT: ", PORT);
}).on("error", (error: Error) => {
    throw new Error(error.message);
})

app.use("/new/item", newItemRouter);
