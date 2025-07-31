import dotenv from "dotenv";

dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";

// Import API endpoints
import newItemRouter from "./routers/newItem";
import removeItemRouter from "./routers/removeItem";
import updateItemNameRouter from "./routers/updateItemName";
import updateItemAssignedToRouter from "./routers/updateItemAssignedTo";

const app = express();

// Add JSON parsing abilities to express
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Hello World!");
})

const PORT: number = Number(process.env.PORT) || 3001;

app.listen(PORT, '0.0.0.0', () => {
    console.log("Server running at PORT: ", PORT);
}).on("error", (error: Error) => {
    throw new Error(error.message);
})

app.use("/item/new", newItemRouter);
app.use("/item", removeItemRouter);
app.use("/item/update/name", updateItemNameRouter);
app.use("/item/update/assigned_to", updateItemAssignedToRouter);