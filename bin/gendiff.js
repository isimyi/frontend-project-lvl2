#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import genDiff from '../src/index.js';

const program = new Command();
const options = program.opts();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'Choose output format', 'stylish')
  .action((filepath1, filepath2) => console.log(genDiff(filepath1, filepath2, options.format)))
  .parse();
