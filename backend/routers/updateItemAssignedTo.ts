import express, {Request, Response, Router} from "express";
import { updateItemAssignedTo } from "../services/database";

interface UpdateItemAssignedToRequest {
    newAssignedToId: string,
}

const updateItemAssignedToRouter = express.Router();

updateItemAssignedToRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    const { newAssignedToId }: UpdateItemAssignedToRequest = req.body;

    try {
        if (!id || !newAssignedToId) {
            return res.status(400).json({
                success: false,
                error: "Missing required field: id, newAssignedToId"
            });
        }

        const updatedItem = await updateItemAssignedTo(id, newAssignedToId);

        return res.status(200).json({
            success: true,
            data: updatedItem
        })
    } catch (error) {
        console.error("Error updating item assigned to:", error)
        return res.status(500).json({
            success: false,
            error: "Internal server error"
        })
    }
})

export default updateItemAssignedToRouter;