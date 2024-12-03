import express from "express";
import cors from "cors";
import { studentRouter } from "./app/modules/student/student.route";
const app = express();
// const port = 3000;

// parsers
app.use(express.json());
app.use(cors());

// applications routes
app.use("/api/v1/students", studentRouter);

app.get("/", (req, res) => {
  // const a = 5;
  res.send("Hello Worlds!");
});

export default app;
