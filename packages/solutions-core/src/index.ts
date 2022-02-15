/**
 * SPDX-FileCopyrightText: © 2021 Keven Leone. <https://github.com/kevenleone>
 * SPDX-License-Identifier: MIT
 */

import Express from "express";
import dotenv from "dotenv";
import path from "path";
import hbs from "express-hbs";
import router from "./router";

dotenv.config();

class App {
  public express: Express.Application;

  constructor() {
    this.express = Express();
    this.initializeMiddlewares();
    this.initializeRouter();
  }

  private initializeMiddlewares(): void {
    this.express.use(Express.json());

    this.express.use(Express.static(path.resolve(__dirname, "public")));

    this.express.engine(
      "hbs",
      hbs.express4({
        defaultLayout: __dirname + "/views/layout/default.hbs",
        layoutsDir: __dirname + "/views/layout",
      })
    );

    this.express.set("view engine", "hbs");
    this.express.set("views", __dirname + "/views");
  }

  private initializeRouter(): void {
    this.express.use(router);
  }

  public listen(): void {
    const { PORT = 3333 } = process.env;

    console.log(`Starting Solutions Labs API`);

    this.express.listen(PORT, () => {
      console.log(`App listening on the port ${PORT}`);
    });
  }
}

const app = new App();

app.listen();
