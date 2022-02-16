import { Request, Response } from "express";
import { projects } from "../model";

class Dashboard {
  async index(_request: Request, response: Response) {
    response.render("index", {
      title: "Solutions Dashboard",
      projects,
    });
  }

  project(request: Request, response: Response) {
    const { slug } = request.params;

    response.render("project", {
      slug,
      project: projects.find((project) => project.slug === slug) || projects[0],
    });
  }
}

export default Dashboard;
