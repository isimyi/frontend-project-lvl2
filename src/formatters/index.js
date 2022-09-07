import formatToPlain from './plain.js';
import formatToStylish from './stylish.js';
import formatToJson from './json.js';

const formatAstTree = (diff, formatterName = 'stylish') => {
  switch (formatterName) {
    case 'plain':
      return formatToPlain(diff);
    case 'stylish':
      return formatToStylish(diff);
    case 'json':
      return formatToJson(diff);
    default:
      throw new Error(`Unknown formatter name: '${formatterName}'`);
  }
};

export default formatAstTree;
