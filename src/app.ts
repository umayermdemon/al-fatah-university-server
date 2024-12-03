import express from "express";
const app = express();
// const port = 3000;

app.get("/", (req, res) => {
  // const a = 5;
  res.send("Hello Worlds!");
});

export default app;
