import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedResultStylish = fs.readFileSync(getFixturePath('expected_result_stylish.txt'), { encoding: 'utf8' });
const expectedResultPlain = fs.readFileSync(getFixturePath('expected_result_plain.txt'), { encoding: 'utf8' });
const expectedResultJson = fs.readFileSync(getFixturePath('expected_result_json.json'), { encoding: 'utf8' });

test('genDiff', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(expectedResultStylish);
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual(expectedResultStylish);
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(expectedResultPlain);
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')).toEqual(expectedResultPlain);
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toEqual(expectedResultJson);
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json')).toEqual(expectedResultJson);
});
