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
const newItemRouter = express_1.default.Router();
newItemRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { itemName, assignedToUserId, listId } = req.body;
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
        const newItem = yield (0, database_1.addItem)(itemName.trim(), assignedToUserId, listId);
        res.status(201).json({
            success: true,
            data: newItem
        });
    }
    catch (error) {
        console.error("Error creating new item:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
}));
newItemRouter.get("/", (req, res) => {
    res.status(200).send("Success!");
});
exports.default = newItemRouter;
