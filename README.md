# Nextup Platforms

## Features

* [create-nextup-platforms](./packages/create-nextup-platforms/README.md)
* [nextup plugin](./packages/nextup/README.md)

## Using this Repo

1. Start local registry in root

```bash
nx local-registry
```

2. Build and publish to local registry

```bash
nx run-many --targets build
nx run-many --targets nx-release-publish
```

3. Create temporary project

```bash
cd tmp
rm -rf ./nextup*
npx create-nextup-platforms@latest nextupPlatformApp --scope dcat23
```

## Generating Plugins

```bash
npx nx g @nx/plugin:generator feature --project=nextup_platforms
```

## Helpful commands

Remove test packages

```bash
rm -rf ./tmp/nextup* 
```

Reset npx cache

```bash
rm -rf ~/.npm/_npx
```

Remove node modules

```bash
rm -rf node_modules
```

Reset pnpm store

```bash
pnpm store prune
```

Add Yargs

```bash
pnpm add -D @types/yargs yargs 
```

Postfix files with `.template`

```javascript
const fs = require('fs');
const path = require('path');

const ignored = [];

function postfixFiles(startingDirectory, postfix) {
  fs.readdirSync(startingDirectory).forEach(file => {
    const oldPath = path.join(startingDirectory, file);
    if (fs.statSync(oldPath).isDirectory()) {
      postfixFiles(oldPath, postfix); // Recursively process directories
    } else {
      if (!file.endsWith(postfix)) {
        const newFilename = file + postfix;
        const newPath = path.join(startingDirectory, newFilename);
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed: ${oldPath} -> ${newPath}`);
      }
    }
  });
}

// Example usage:
const currentDirectory = './files/src';
const postfix = '.template';
postfixFiles(currentDirectory, postfix);

```

## Nx plugins and code generators

Add Nx plugins to leverage their code generators and automated, inferred tasks.

```
# Add plugin
npx nx add @nx/react

# Use code generator
npx nx generate @nx/react:app demo

# Run development server
npx nx serve demo

# View project details
npx nx show project demo --web
```

Run `npx nx list` to get a list of available plugins and whether they have generators. Then run `npx nx list <plugin-name>` to see what generators are available.

Learn more about [code generators](https://nx.dev/features/generate-code) and [inferred tasks](https://nx.dev/concepts/inferred-tasks) in the docs.

## Running tasks

To execute tasks with Nx use the following syntax:

```
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```
npx nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).

## Resources

- [Create Your Own create-react-app CLI](https://blog.nrwl.io/create-your-own-create-react-app-cli-d1bf13904e35)

