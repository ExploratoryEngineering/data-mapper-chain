// tslint:disable-next-line:no-var-requires
const { cd, exec, echo, touch } = require("shelljs");
// tslint:disable-next-line:no-var-requires
const { readFileSync } = require("fs");
// tslint:disable-next-line:no-var-requires
const url = require("url");

let repoUrl;
// tslint:disable-next-line:no-var-requires
const pkg = require("../package.json");
if (typeof pkg.repository === "object") {
  if (!pkg.repository.hasOwnProperty("url")) {
    throw new Error("URL does not exist in repository section");
  }
  repoUrl = pkg.repository.url;
} else {
  repoUrl = pkg.repository;
}

let parsedUrl = url.parse(repoUrl);
let repository = (parsedUrl.host || "") + (parsedUrl.path || "");
let ghToken = process.env.GH_TOKEN;

echo("Deploying docs");
cd("docs");
touch(".nojekyll");
exec("git init");
exec("git add .");
exec('git config user.name "Per Kristian Kummermo"');
exec('git config user.email "per.kristian@telenordigital.com"');
exec('git commit -m "docs(docs): update gh-pages"');

exec(
  `git push --force --quiet "https://${ghToken}@${repository}" master:gh-pages`,
);

echo("Docs deployed");
