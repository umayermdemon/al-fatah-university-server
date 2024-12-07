import express from "express";
import cors from "cors";
import { studentRouter } from "./app/modules/student/student.route";
import { userRouter } from "./app/modules/user/user.route";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
const app = express();
// const port = 3000;

// parsers
app.use(express.json());
app.use(cors());

// applications routes
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello Worlds!");
});

// global error handler
app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
