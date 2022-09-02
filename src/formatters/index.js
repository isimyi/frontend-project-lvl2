import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const formatAstTree = (diff, formatterName = 'stylish') => {
  switch (formatterName) {
    case 'plain':
      return plain(diff);
    case 'stylish':
      return stylish(diff);
    case 'json':
      return json(diff);
    default:
      throw new Error(`Unknown formatter name: '${formatterName}'`);
  }
};

export default formatAstTree;
