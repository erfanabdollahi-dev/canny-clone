import app from "./app.js";
import connectDatabase from "@/database/connection.js";
import env from "@/config/env.js";

const bootstrap = async () => {
  try {
    await connectDatabase();


    app.listen(Number(env.PORT), () => {
      console.log(`Server Started : http://127.0.0.1:${Number(env.PORT)}`);
    });


  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

bootstrap();
