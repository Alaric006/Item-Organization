import express, {Request, Response, Router} from "express"
import {addItem} from "../services/database"

const newItemRouter = express.Router();

interface NewItemRequest {
    itemName: string;
    assignedToUserId: string;
    listId: string;
}

newItemRouter.post("/", async (req, res) => {
    const {itemName, assignedToUserId, listId}: NewItemRequest = req.body;

    try {
        if (!itemName || !assignedToUserId || !listId) {
                return res.status(400).json({
                    success: false,
                    error: "Missing required fields: itemName, assignedToUserId, listId"
                });
            }
            
            if (typeof itemName !== "string" || itemName.trim().length === 0) {
                return res.status(400).json({
                    success: false,
                    error: "itemName must be a non-empty string"
                });
            }
        
            const newItem = await addItem(itemName.trim(), assignedToUserId, listId);

            res.status(201).json({
                success: true,
                data: newItem
            })
    } catch (error) {
        console.error("Error creating new item:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        })
    }
});

newItemRouter.get("/", (req, res) => {
    res.status(200).send("Success!");
})

export default newItemRouter;