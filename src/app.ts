import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import { AppError } from "./types/error";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  return res.json({ data: "osas says hi" });
});

//handle Invalid routes change
app.use((req, res, next) => {
  const error = new Error("Route not found");
  const appError: AppError = { ...error, status: 404 };
  next(appError);
});

// error handler middleware
app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).json({
    error: error.message || "Internal Server Error",
  });
});

export default app;
