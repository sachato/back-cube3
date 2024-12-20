import express, { Express, Request, Response } from "express";
const { createProxyMiddleware } = require('http-proxy-middleware');
import dotenv from "dotenv";

dotenv.config();

const createExpressServer = (): Express => {
  const app: Express = express();

  app.get("/", (req: Request, res: Response) => {
    res.send("OK");
  });

  app.use('/users', createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true
}));

  return app;
};
export default createExpressServer;
