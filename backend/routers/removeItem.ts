import express, {Request, Response, Router} from "express";
import { removeItem } from "../services/database";

const removeItemRouter = express.Router();

removeItemRouter.delete("/:id", async (req, res) => {
    const removeId = req.params.id;

    if (!removeId || removeId.trim().length === 0) {
        return res.status(400).json({
            success: false,
            error: "Item ID is required"
        });
    }

    try {
        await removeItem(removeId);
        return res.status(200).json({
            success: true,
            message: "Item deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
});

export default removeItemRouter;