export function setStatusFree(newStatus: any, context: any) {
  const pullRequest = context.payload.pull_request;

  const checkOptions: any = {
    name: "WIP",
    head_branch: "", // workaround for https://github.com/octokit/rest.js/issues/874
    head_sha: pullRequest.head.sha,
    status: "in_progress",
    started_at: new Date().toISOString(),
    output: {
      title: `Title contains ${
        newStatus.match === "🚧"
          ? "a construction emoji"
          : `"${newStatus.match}"`
      }`,
      summary: `The title "${pullRequest.title}" contains "${newStatus.match}".`,
      text: `By default, WIP only checks the pull request title for the terms "WIP", "Work in progress" and "🚧".
You can configure both the terms and the location that the WIP app will look for by signing up for the pro plan: https://github.com/marketplace/wip. All revenue will be donated to [Processing | p5.js](https://donorbox.org/supportpf2019-fundraising-campaign) – one of the most diverse and impactful Open Source community there is.`,
    },
    // workaround random "Bad Credentials" errors
    // https://github.community/t5/GitHub-API-Development-and/Random-401-errors-after-using-freshly-generated-installation/m-p/22905/highlight/true#M1596
    request: {
      retries: 3,
      retryAfter: 3,
    },
  };

  if (!newStatus.wip) {
    checkOptions.status = "completed";
    checkOptions.conclusion = "success";
    checkOptions.completed_at = new Date().toISOString();
    checkOptions.output.title = "Ready for review";
    checkOptions.output.summary = "No match found based on configuration";
  }

  return context.octokit.checks.create(context.repo(checkOptions));
}
