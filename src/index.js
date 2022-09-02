import formatAstTree from './formatters/index.js';
import buildAstTree from './astTreeBuilder.js';

const genDiff = (filepath1, filepath2, formatterName) => {
  const astTree = buildAstTree(filepath1, filepath2);

  return formatAstTree(astTree, formatterName);
};

export default genDiff;
