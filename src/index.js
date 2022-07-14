import _ from 'lodash';
import fs from 'fs';
import process from 'process';
import path from 'path';
import parse from './parsers.js'

const getFileContent = (filepath) => {
  const currentDirectory = process.cwd();
  const absoluteFilePath = path.resolve(currentDirectory, filepath);
  const fileContent = fs.readFileSync(absoluteFilePath, { encoding: 'utf8' });
  const fileExtension = path.extname(filepath).slice(1);

  return parse(fileContent, fileExtension);
};

const typesMap = {
  deleted: '-',
  added: '+',
  unchanged: ' ',
  changed: {
    previous: '-',
    new: '+',
  },
};

const formatDiff = (diffArray, spacesCount = '  ') => {
  const lines = diffArray.map((item) => {
    const entry = `${item.key}: ${item.value}`;
    const changedValueReplacer = typesMap.changed.previous;
    const newValueReplacer = typesMap.changed.new;

    if (item.type === 'changed') {
      return [`${spacesCount}${changedValueReplacer} ${entry}`, `${spacesCount}${newValueReplacer} ${item.key}: ${item.newValue}`];
    }

    return `${spacesCount}${typesMap[item.type]} ${entry}`;
  });

  return ['{', ...lines.flat(), '}'].join('\n');
};

const genDiff = (filepath1, filepath2) => {
  const file1 = getFileContent(filepath1);
  const file2 = getFileContent(filepath2);

  const uniqueKeys = _.union(Object.keys(file1), Object.keys(file2));

  const result = uniqueKeys.map((key) => {
    if (!_.has(file1, key)) {
      return { key, value: file2[key], type: 'added' };
    }

    if (!_.has(file2, key)) {
      return { key, value: file1[key], type: 'deleted' };
    }

    if (file1[key] !== file2[key]) {
      return {
        key,
        value: file1[key],
        newValue: file2[key],
        type: 'changed',
      };
    }

    return { key, value: file1[key], type: 'unchanged' };
  });

  result.sort((value1, value2) => value1.key.localeCompare(value2.key));

  return formatDiff(result);
};

export default genDiff;
