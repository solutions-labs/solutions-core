import path from "path";
import fs from "fs";

export const projects: any = JSON.parse(
  fs
    .readFileSync(path.resolve(__dirname, "..", "..", "projects.json"))
    .toString()
);
