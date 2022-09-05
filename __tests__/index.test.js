import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const extensions = ['json', 'yml'];
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedResultStylish = fs.readFileSync(getFixturePath('expected_result_stylish.txt'), { encoding: 'utf8' });
const expectedResultPlain = fs.readFileSync(getFixturePath('expected_result_plain.txt'), { encoding: 'utf8' });
const expectedResultJson = fs.readFileSync(getFixturePath('expected_result_json.json'), { encoding: 'utf8' });

test.each(extensions)('genDiff', (extension) => {
  const beforeFullPath = getFixturePath(`fileBefore.${extension}`);
  const afterFullPath = getFixturePath(`fileAfter.${extension}`);
  const jsonResult =  genDiff(beforeFullPath, afterFullPath, 'json');
  
  expect(genDiff(beforeFullPath, afterFullPath)).toEqual(expectedResultStylish);
  expect(genDiff(beforeFullPath, afterFullPath, 'stylish')).toEqual(expectedResultStylish);
  expect(genDiff(beforeFullPath, afterFullPath, 'plain')).toEqual(expectedResultPlain);
  expect(jsonResult).toEqual(expectedResultJson);
  expect(() => JSON.parse(jsonResult)).not.toThrow();
});
