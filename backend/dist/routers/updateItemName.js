"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("../services/database");
const updateItemNameRouter = express_1.default.Router();
updateItemNameRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { newName } = req.body;
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
            });
        }
        const updatedItem = yield (0, database_1.updateItemName)(id, newName.trim());
        res.status(200).json({
            success: true,
            data: updatedItem
        });
    }
    catch (error) {
        console.error("Error updating item name:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
}));
exports.default = updateItemNameRouter;
