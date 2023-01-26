#!/usr/bin/env zx

import "zx/globals";
import prompts from "prompts";
// `LIFERAY_FEATURE_PERIOD_FLAG_PERIOD__UPPERCASEL__UPPERCASEP__UPPERCASES__MINUS__NUMBER1__NUMBER3__NUMBER5__NUMBER4__NUMBER3__NUMBER0_=true`;

class Ci {
  async stopContainer() {
    const container = `${containerName}_${containerPort}`;

    await $`docker stop ${container} && docker rm ${container}`;
  }

  async dropDatabase({ containerName, containerPort }) {
    const container = `${containerName}_${containerPort}`;

    await $`docker exec -it mysql && docker rm ${container}`;
  }

  async parseFeatureFlags(featureFlags = []) {
    return featureFlags.map((featureFlag) => {
      const [prefix, number] = featureFlag.split("-");
      let FEATURE_FLAG = "";

      FEATURE_FLAG += prefix
        .split("")
        .map((word) => `_UPPERCASE${word.toUpperCase()}_`)
        .join("");

      FEATURE_FLAG += "_MINUS_";

      FEATURE_FLAG += number.split("").map((num) => `_NUMBER${num}_`);

      return `LIFERAY_FEATURE_PERIOD_FLAG_PERIOD_${FEATURE_FLAG}=true`;
    });
  }

  async pullDockerImage(dxpVersion) {
    await $`docker pull ${dxpVersion}`;
  }

  async createDockerContainer({
    containerName,
    dxpVersion = "liferay/dxp:latest",
    containerPort = 8091,
  }) {
    await $`docker run \
            --link mysql \
            --name ${containerName}_${containerPort} \
            -e LIFERAY_COMPANY_SECURITY_STRANGERS_VERIFY="false" \
            -e LIFERAY_DEFAULT_ADMIN_PASSWORD=test \
            -e LIFERAY_JDBC_PERIOD_DEFAULT_PERIOD_DRIVER_UPPERCASEC_LASS_UPPERCASEN_AME="com.mysql.cj.jdbc.Driver" \
            -e LIFERAY_JDBC_PERIOD_DEFAULT_PERIOD_PASSWORD="root" \
            -e LIFERAY_JDBC_PERIOD_DEFAULT_PERIOD_URL="jdbc:mysql://mysql/partner_portal?characterEncoding=UTF-8&useFastDateParsing=false&useUnicode=true" \
            -e LIFERAY_JDBC_PERIOD_DEFAULT_PERIOD_USERNAME="root" \
            -e LIFERAY_MINIFIER_PERIOD_ENABLE="false" \
            -e LIFERAY_PASSWORDS_DEFAULT_POLICY_CHANGEABLE="false" \
            -e LIFERAY_PASSWORDS_PERIOD_DEFAULT_PERIOD_POLICY_PERIOD_CHANGEABLE="false" \
            -e LIFERAY_FEATURE_PERIOD_FLAG_PERIOD__UPPERCASEL__UPPERCASEP__UPPERCASES__MINUS__NUMBER1__NUMBER3__NUMBER5__NUMBER4__NUMBER3__NUMBER0_=true \
            -e LIFERAY_FEATURE_PERIOD_FLAG_PERIOD__UPPERCASEL__UPPERCASEP__UPPERCASES__MINUS__NUMBER1__NUMBER6__NUMBER4__NUMBER5__NUMBER2__NUMBER8_=true \
            -e LIFERAY_FEATURE_PERIOD_FLAG_PERIOD__UPPERCASEL__UPPERCASEP__UPPERCASES__MINUS__NUMBER1__NUMBER6__NUMBER5__NUMBER4__NUMBER8__NUMBER2_=true \
            -e LIFERAY_REDIRECT_PERIOD_URL_PERIOD_IPS_PERIOD_ALLOWED= \
            -p ${containerPort}:8080 \
            ${dxpVersion}
    `;
  }

  async displayIntro() {
    $.verbose = false;
    const intro = await $`cat intro.txt`;

    $.verbose = true;

    console.log(`${chalk.cyan(intro.stdout)} \n`);
  }

  async runAntAll() {
    within(async () => {
      cd(`~/dev/projects/docker`);

      await $`gsync`;
      await $`ant all`;
    });
  }

  async promptProject(files) {
    return prompts([
      {
        instructions: false,
        type: "select",
        name: "project",
        message: "Pick your Project",
        choices: files.map(({ label }) => ({ label, value: label })),
      },
      {
        instructions: false,
        type: "select",
        name: "project",
        message: "Choose the Liferay Version",
        choices: [
          { title: "I prefer ant all", value: "ant-all" },
          { title: "liferay/dxp:latest", value: "liferay/dxp:latest" },
        ],
      },
    ]);
  }

  async getProjectConfig() {
    const configs = [];

    const fileNames = fs.readdirSync("projects");

    for (const fileName of fileNames) {
      const file = fs.readFileSync(`projects/${fileName}`).toString();

      configs.push(JSON.parse(file));
    }

    return configs;
  }

  async init() {
    await this.displayIntro();

    const files = await this.getProjectConfig();

    await this.getProjectConfig();

    const { project } = await this.promptProject(files);

    await this.runAntAll();
  }
}

const ci = new Ci();

ci.init();
