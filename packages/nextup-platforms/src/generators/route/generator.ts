import { formatFiles, generateFiles, Tree } from '@nx/devkit';
import * as path from 'path';
import { RouteGeneratorSchema } from './schema';

export async function routeGenerator(
  tree: Tree,
  options: RouteGeneratorSchema
) {
  const p = options.path.split('/');

  if (options.dynamic) {
    const idx = p.findIndex(
      (x) => x.toLowerCase() == options.dynamic.toLowerCase()
    );
    p[idx] = `[${options.dynamic.toLowerCase()}]`;
  }

  const projectRoot = path.join('src', 'app', 'api', ...p);

  const routeType = options.dynamic ? 'dynamic' : 'src';

  if (tree.children(projectRoot).find((file) => file.includes('route'))) {
    return;
  }

  generateFiles(tree, path.join(__dirname, 'files', routeType), projectRoot, {
    tmpl: '',
  });

  await formatFiles(tree);
}

export default routeGenerator;
