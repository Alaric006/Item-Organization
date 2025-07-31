"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Import API endpoints
const newItem_1 = __importDefault(require("./routers/newItem"));
const removeItem_1 = __importDefault(require("./routers/removeItem"));
const updateItemName_1 = __importDefault(require("./routers/updateItemName"));
const updateItemAssignedTo_1 = __importDefault(require("./routers/updateItemAssignedTo"));
const app = (0, express_1.default)();
// Add JSON parsing abilities to express
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
});
const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
    throw new Error(error.message);
});
app.use("/item/new", newItem_1.default);
app.use("/item", removeItem_1.default);
app.use("/item/update/name", updateItemName_1.default);
app.use("/item/update/assigned_to", updateItemAssignedTo_1.default);
