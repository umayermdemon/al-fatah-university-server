import express from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
const app = express();
// const port = 3000;

// parsers
app.use(express.json());
app.use(cors());

// applications routes
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Hello Worlds!");
});

// global error handler
app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
