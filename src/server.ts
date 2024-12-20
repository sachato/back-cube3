import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const createExpressServer = (): Express => {
  const app: Express = express();

  app.get("/", (req: Request, res: Response) => {
    res.send("OK");
  });
  return app;
};
export default createExpressServer;
