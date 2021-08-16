"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const app = express_1.default();
if (process.env.NODE_ENV === "development") {
    app.use(morgan_1.default("dev"));
}
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get("/", (req, res, next) => {
    return res.json({ data: "osas says hi" });
});
//handle Invalid routes change
app.use((req, res, next) => {
    const error = new Error("Route not found");
    const appError = Object.assign(Object.assign({}, error), { status: 404 });
    next(appError);
});
// error handler middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: error.message || "Internal Server Error",
    });
});
exports.default = app;
