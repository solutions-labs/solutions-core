import { Probot } from "probot";
import { onDraft } from "./functions/draft";

export = (app: Probot) => {
  app.on(
    ["pull_request.edited", "pull_request.converted_to_draft"],
    async (context) => {
      const pullRequestTitle = context.payload.pull_request.title.toUpperCase();

      // if (pullRequestTitle.startsWith("WIP")) {
      onDraft(context, pullRequestTitle);
      // }
    }
  );
};
