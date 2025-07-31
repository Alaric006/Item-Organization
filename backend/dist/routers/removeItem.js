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
const removeItemRouter = express_1.default.Router();
removeItemRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const removeId = req.params.id;
    if (!removeId || removeId.trim().length === 0) {
        return res.status(400).json({
            success: false,
            error: "Item ID is required"
        });
    }
    try {
        yield (0, database_1.removeItem)(removeId);
        return res.status(200).json({
            success: true,
            message: "Item deleted successfully"
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
}));
exports.default = removeItemRouter;
