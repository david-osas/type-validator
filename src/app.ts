import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import helmet from "helmet";
import { AppError } from "./types/error";
import detectRoutes from "./routes/detect";

const app = express();

app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/detect", detectRoutes);

//handle Invalid routes change
app.use("*", (req, res, next) => {
  const error: AppError = new Error("Route not found");
  error.status = 404;
  next(error);
});

// error handler middleware
app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).json({
    error: error.message || "Internal Server Error",
  });
});

export default app;
