/**
 * SPDX-FileCopyrightText: © 2021 Keven Leone. <https://github.com/kevenleone>
 * SPDX-License-Identifier: MIT
 */

import Express from "express";
import dotenv from "dotenv";

dotenv.config();

class App {
  public express: Express.Application;

  constructor() {
    this.express = Express();
    this.initializeMiddlewares();
  }

  private initializeMiddlewares(): void {
    this.express.use(Express.json());
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
