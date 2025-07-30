import express, {Request, Response, Router} from "express";
import { updateItemName } from "../services/database";
import { DatabaseItem } from "../types";

interface UpdateItemNameRequest {
    newName: string
}

const updateItemNameRouter = express.Router();

updateItemNameRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    const {newName}: UpdateItemNameRequest = req.body;

    try {
        if (!id || !newName) {
            return res.status(400).json({
                success: false,
                error: "Missing required fields: id, newName"
            });
        }

        if (typeof newName !== "string" || newName.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: "newName must be a non-empty string"
            })
        }

        const updatedItem = await updateItemName(id, newName.trim());

        res.status(200).json({
            success: true,
            data: updatedItem
        })
    } catch (error) {
        console.error("Error updating item name:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        })
    }
})

export default updateItemNameRouter;