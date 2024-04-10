#!/usr/bin/env node

import { createWorkspace } from 'create-nx-workspace';
import { names } from '@nx/devkit';
import yargs from 'yargs';
import {capitalize} from "@nx/devkit/src/utils/string-utils";

async function main() {
  const parser = yargs(process.argv.slice(2))
    .command('<name>', 'The name for the workspace')
    .demandCommand(1, 'A name for the workspace is needed')
    .option('scope', {
      type: 'string',
      describe: 'Your organization scope',
    })
    .option('website', {
      type: 'string',
      describe: 'website to host app to',
      default: "dcat.tech"
    })
    .help();

  const argv = await parser.parse();
  const name = names(argv._[0] as string).name;
  const className = names(name).className;
  const propertyName = names(name).propertyName;
  const constantName = names(name).constantName;
  const scope = names(argv.scope ?? name).name;
  const website = names(argv.website).name;
  const fileName = names(name).fileName;
  const snakeCaseName = constantName.toLowerCase();
  const title = buildTitle(fileName);

  console.log(`Creating the workspace: ${name}`);

  // This assumes "nextup-platforms" and "create-nextup-platforms" are at the same version
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const presetVersion = require('../package.json').version;

  // TODO: update below to customize the workspace
  const { directory } = await createWorkspace(
    `nextup-platforms@${presetVersion}`,
    {
      name,
      title,
      scope,
      website,
      fileName,
      className,
      propertyName,
      constantName,
      snakeCaseName,
      nxCloud: 'skip',
      packageManager: 'pnpm',
    }
  );

  console.log(`Successfully created the workspace: ${directory}.`);
}

main();

function buildTitle(fileName: string) {
  return fileName.split("-")
    .map(capitalize)
    .join(" ")
}
