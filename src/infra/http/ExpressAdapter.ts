import IHttp, { TMethods } from "./http.interface";
import ICache from "../cache/cache.interface";
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import IJWT from "../jwt/jwt.interface";

class ExpressAdapter implements IHttp {
  public app;
  private route;

  constructor(cache: ICache, private jwt: IJWT){
    this.app = express()
      .use(cors())
      .use(express.json())
      .use(helmet())
      .use(express.urlencoded({ extended: true }))
      .use(this.middleware.bind(this));

    this.route = express.Router();
  }

  private async middleware(req: Request, res: Response, next: NextFunction){
    if(/login/i.test(req.url)) return next();
    try{
      const token = req.headers.authorization?.split(' ') || [];
      if(!token?.[1]) throw new Error();
      const tokenVerified = this.jwt.verify(token[1]);
      return next();
    }catch(err: any){
      return res.status(401).json({ status: false, msg: err.message || 'invalid token' });
    }
  }

  addRoute(method: TMethods, url: string, callback: Function): void {
    this.route[method](url, async (req, res) => {
      try{
        const { statusCode, result } = await callback(req, res);
        return res.status(statusCode).json({ result });
      }catch(err: any){
        return res.status(400).json({ status: false, msg: err?.message });
      }
    });
  }

  init(): void {
    this.app.use('/api/v1', this.route);
  }

  listen(): void {
    const port = process.env.PORT || 4568;
    this.app.listen(port);
    console.log(`server running on ${port}`)
  }
}

export default ExpressAdapter;

