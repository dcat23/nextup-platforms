import {
  formatFiles,
  generateFiles,
  names,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { FeatureGeneratorSchema } from './schema';

export async function featureGenerator(
  tree: Tree,
  options: FeatureGeneratorSchema
) {
  const resolvedOptions = {
    ...options,
    name: names(options.name).name,
  }

  const projectRoot = `src/features/${resolvedOptions.name}`;

  const { api, hooks, stores, components, types, utils } = resolvedOptions;

  api && addFilesFromNames(tree, projectRoot, resolvedOptions.name, "", "api", ...api)
  hooks && addFilesFromNames(tree, projectRoot, resolvedOptions.name, "use","hooks", ...hooks)
  stores && addFilesFromNames(tree, projectRoot, resolvedOptions.name, "use","stores", ...stores)
  components && addFilesFromNames(tree, projectRoot, resolvedOptions.name, "","components", ...components)
  utils && addFilesFromNames(tree, projectRoot, resolvedOptions.name, "","utils", ...utils)

  types && addTypes(tree, projectRoot, ...types)

  await formatFiles(tree);
}

function addTypes(tree: Tree, projectRoot: string, ...types: string[]) {
  for (const name of types) {
    const typesFile = path.join(projectRoot, "types", "index.ts")
    const text = `export interface ${names(name).className} {}`
    if (!tree.exists(typesFile)) {
      tree.write(typesFile, text)
      addToIndex(tree, projectRoot, "types", "")
      continue;
    }

    const contents = tree.read(typesFile).toString()
    if (!contents.includes(`interface ${names(name).className}`)) {
      const updatedContent = contents + "\n" + text;
      tree.write(typesFile, updatedContent)
    }

  }

}

function addToIndex(tree: Tree, projectRoot: string, filePath: string, fileName: string) {
  const indexFile = path.join(projectRoot, "index.ts")
  const text = `export * from "./${path.join(filePath, fileName).toString()}"`

  if (!tree.exists(indexFile)) {
    tree.write(indexFile, text)
    return
  }

  const contents = tree.read(indexFile).toString()
  if (!contents.includes(text)) {
    const updatedContent = contents + "\n" + text;
    tree.write(indexFile, updatedContent)
  }
}

function addFile(tree: Tree, projectRoot: string, featureName: string, prefix: string, directory: string, name: string) {
  if (!name) return;
  const fileName = names(prefix ? `${prefix}-${name}` : name).fileName
  const filePath = path.join(projectRoot, directory);

  if (tree.children(filePath).find(file => file.includes(fileName))) {
    return;
  }

  generateFiles(
    tree,
    path.join(__dirname, "files", directory),
    path.join(projectRoot, directory),
    {
      tmpl: "",
      propertyName: names(name).propertyName,
      className: names(name).className,
      fileName,
      featureName,
    }
  )

  addToIndex(tree, projectRoot, directory, fileName)
}

function addFilesFromNames(tree: Tree, projectRoot: string, featureName: string, prefix: string, directory: string, ...names: string[]) {
  names.forEach(name => addFile(tree, projectRoot, featureName, prefix, directory, name))
}
export default featureGenerator;
