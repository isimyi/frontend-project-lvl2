import process from 'process';
import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import formatAstTree from './formatters/index.js';
import buildAstTree from './astTreeBuilder.js';

const getFileContent = (filepath) => {
  const currentDirectory = process.cwd();
  const absoluteFilePath = path.resolve(currentDirectory, filepath);
  const fileContent = fs.readFileSync(absoluteFilePath, { encoding: 'utf8' });
  const fileExtension = path.extname(filepath).slice(1);

  return parse(fileContent, fileExtension);
};

const genDiff = (filepath1, filepath2, formatterName) => {
  const file1 = getFileContent(filepath1);
  const file2 = getFileContent(filepath2);
  const astTree = buildAstTree(file1, file2);

  return formatAstTree(astTree, formatterName);
};

export default genDiff;
