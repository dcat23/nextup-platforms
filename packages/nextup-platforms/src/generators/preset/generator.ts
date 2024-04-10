import {
  addDependenciesToPackageJson,
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree
} from '@nx/devkit';
import * as path from 'path';
import { PresetGeneratorSchema } from './schema';

export async function presetGenerator(
  tree: Tree,
  options: PresetGeneratorSchema
) {
  const projectRoot = '.';
  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: 'application',
    targets: {
      dev: {
        command: 'prisma generate & next dev',
      },
      build: {
        command: 'prisma generate && prisma db push && next build',
      },
    },
  });
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);
  return addDependenciesToPackageJson(
    tree,
    {
      '@next-auth/prisma-adapter': '^1.0.7',
      '@prisma/client': '^5.5.2',
      '@tanstack/react-query': '^5.29.0',
      '@tremor/react': '^3.11.1',
      '@upstash/ratelimit': '^0.4.4',
      '@vercel/analytics': '^1.1.1',
      '@vercel/blob': '^0.15.0',
      '@vercel/kv': '^1.0.0',
      '@vercel/postgres': '^0.5.1',
      ai: '^2.2.22',
      axios: '^1.6.8',
      clsx: '^2.0.0',
      'date-fns': '^2.30.0',
      'focus-trap-react': '^10.2.3',
      'framer-motion': '^10.16.4',
      'gray-matter': '^4.0.3',
      'js-cookie': '^3.0.5',
      'lucide-react': '^0.292.0',
      nanoid: '^4.0.2',
      next: '14.0.2',
      'next-auth': '4.24.5',
      'next-mdx-remote': '^4.4.1',
      'next-themes': '^0.2.1',
      novel: '^0.1.22',
      'openai-edge': '^1.2.2',
      react: '^18.2.0',
      'react-dom': '^18.2.0',
      'react-textarea-autosize': '^8.5.3',
      'react-tweet': '^3.1.1',
      remark: '^14.0.3',
      sharp: '^0.32.6',
      sonner: '^1.2.0',
      swr: '^2.2.4',
      'tailwind-merge': '^2.0.0',
      'unist-util-visit': '^5.0.0',
      'use-debounce': '^10.0.0',
      zod: '^3.22.4',
      zustand: '^4.5.2',
    },
    {
      '@tailwindcss/forms': '^0.5.7',
      '@tailwindcss/typography': '^0.5.10',
      '@types/js-cookie': '^3.0.6',
      '@types/node': '^20.9.0',
      '@types/react': '^18.2.37',
      '@types/react-dom': '^18.2.15',
      autoprefixer: '^10.4.16',
      eslint: '8.53.0',
      'eslint-config-next': '^14.0.2',
      postcss: '^8.4.31',
      prettier: '^3.1.0',
      'prettier-plugin-tailwindcss': '^0.5.7',
      prisma: '^5.5.2',
      tailwindcss: '^3.3.5',
      'tailwindcss-animate': '^1.0.7',
      typescript: '^5.2.2',
    }
  );
}

export default presetGenerator;
