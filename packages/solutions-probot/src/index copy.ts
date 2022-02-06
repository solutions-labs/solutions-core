import { Probot } from "probot";
import { setStatusFree } from "./functions/check";

export = (app: Probot) => {
  app.on("issues.labeled", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for putting a label!",
    });

    await context.octokit.issues.createComment(issueComment);
  });

  app.on("pull_request.edited", async (context) => {
    // const issueComment = context.issue({
    //   body: "Pull edited!",
    // });

    const title = context.payload.pull_request.title;

    const status = {
      wip: true,
      location: "title",
      text: title,
      match: "🚧",
    };

    await setStatusFree(status, context);

    // await context.octokit.issues.createComment(issueComment);
  });

  return;

  // app.on("*", async (context) => {
  //   if (context.payload.action === "converted_to_draft") {
  //     const params = context.pullRequest({
  //       reviewers: ["jairmedeiros"],
  //       team_reviewers: [],
  //     });

  //     console.log({ params });

  //     const owner = context.payload.pull_request.user.login;

  //     const result = await context.octokit.pulls.requestReviewers(params);
  //     console.log({ result });
  //   }
  // const issueComment = context.issue({
  //   body: "You are ready for review!",
  // });

  // await context.octokit.issues.createComment(issueComment);
  // });

  // app.on("issues.edited", async (context) => {
  //   const issueComment = context.issue({
  //     body: "Thanks for opening this issue!",
  //   });

  //   await context.octokit.issues.createComment(issueComment);
  // });

  // app.onAny(async (context) => {
  //   app.log.info({ event: context.name, action: context.payload.action });
  // });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
