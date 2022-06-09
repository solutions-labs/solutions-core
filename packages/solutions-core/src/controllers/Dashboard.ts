import axios from "axios";
import { Request, Response } from "express";
import { projects } from "../model";

const FIVE_SECONDS = 5000;

class Dashboard {
  async index(_request: Request, response: Response) {
    const responsex = await axios.get("http://192.168.109.239:8081");

    const projectsPromise = (projects as { address: string }[]).map((project) =>
      axios.get(project.address, { timeout: FIVE_SECONDS })
    );

    const results = await Promise.allSettled(projectsPromise);

    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        projects[index].status = [200, 201].includes(result.value.status)
          ? "active"
          : "unactive";

        return;
      }

      projects[index].status = "unactive";
    });

    results;

    console.log(responsex.status);

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
