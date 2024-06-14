#!/usr/bin/env node

import { existsSync } from 'fs';
import { Command } from 'commander';
import { resolve } from 'path';
import { transformDirectory } from './utils/transformDirectory';

const program = new Command();

program
  .version('1.0.0')
  .description('CLI to configure all about the easy-tspaths')
  .option('-c, --config <path>', 'path to your tsconfig.json', 'tsconfig.json');

program.parse(process.argv);

const options = program.opts();
const tsConfigPath = resolve(process.cwd(), options.config);

const start = async () => {
  if (existsSync(tsConfigPath)) {
    console.log(`\n> [easy-tspaths] tsconfig.json found in path: ${tsConfigPath}`);
    const tsConfig = await import(tsConfigPath) as {
      compilerOptions: {
        outDir: string;
        baseUrl: string;
        paths: {[key: string]: string[]}; 
      }
    };
    if (['outDir', 'baseUrl', 'paths'].some(field => !(field in tsConfig.compilerOptions))) {
      console.log('\n> [easy-tspaths] It is necessary to provide a tsconfig that contains the following fields: "outDir", "baseUrl", "paths"')
      process.exit(1);
    }
    console.log('> [easy-tspaths] Starting to change paths.')
    transformDirectory({ tsConfig })
    console.log('> [easy-tspaths] All paths changed with success!')
    process.exit(0)
  } else {
    console.error(`\ntsconfig.json not found in path: ${tsConfigPath}`);
    process.exit(1);
  }
}
start()