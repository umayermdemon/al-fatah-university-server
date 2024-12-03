import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
// const port = 5000;

const port = config.port;

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
