import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from "../src";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedResult = fs.readFileSync(getFixturePath('expected_result.txt'), { encoding: 'utf8' });


test('genDiff', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(expectedResult);
});
