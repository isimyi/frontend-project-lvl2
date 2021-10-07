import _ from 'lodash';
import fs from 'fs';
import process from 'process';
import path from 'path';

const getFilesContent = (filepath1, filepath2) => {
  const currentDirectory = process.cwd();
  const absoluteFilepath1 = path.resolve(currentDirectory, filepath1);
  const absoluteFilepath2 = path.resolve(currentDirectory, filepath2);
  const fileContent1 = fs.readFileSync(absoluteFilepath1, { encoding: 'utf8' });
  const fileContent2 = fs.readFileSync(absoluteFilepath2, { encoding: 'utf8' });
  const parsedFileContent1 = JSON.parse(fileContent1);
  const parsedFileContent2 = JSON.parse(fileContent2);

  return [parsedFileContent1, parsedFileContent2];
};

const genDiff = (filepath1, filepath2) => {
  const [file1, file2] = getFilesContent(filepath1, filepath2);
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

  return result;
};

export default genDiff;
