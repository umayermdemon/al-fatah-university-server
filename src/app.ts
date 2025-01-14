import express from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
import cookieParser from "cookie-parser";
const app = express();
// const port = 3000;

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// applications routes
app.use("/api/v1", router);

app.get("/", async (req, res) => {
  // Promise.reject();
  res.send("Hello Worlds!");
});
// not found
app.use(notFound);

// global error handler
app.use(globalErrorHandler);

export default app;
