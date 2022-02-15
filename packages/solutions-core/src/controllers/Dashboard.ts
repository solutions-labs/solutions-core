import { Request, Response } from "express";

const projects = [
  {
    address: "http://localhost:8080",
    description: "Raylife",
    slug: "raylife",
    image: "raylife.png",
    name: "Liferay Raylife 7.4x",
    status: "unactive",
  },
  {
    address: "http://localhost:8080",
    description: "New Testray Running on Liferay Portal 7.4x",
    image: "customer-portal.png",
    slug: "customer-portal",
    name: "Solutions Customer Portal 7.4x",
    status: "active",
  },
  {
    address: "http://localhost:8080",
    description: "New Testray Running on Liferay Portal 7.4x",
    image: "testray.png",
    slug: "testray74x",
    name: "Solutions Testray 7.4x",
    status: "disable",
  },
  {
    address: "http://localhost:8080",
    description: "New Testray Running on Liferay Portal 7.4x",
    image: "testray.png",
    slug: "testray70x",
    name: "Liferay Testray 7.0x",
    status: "active",
  },
];

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
