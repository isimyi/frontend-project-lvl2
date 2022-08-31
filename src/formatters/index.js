import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const formatter = (diff, formatterName) => {
  switch (formatterName) {
    case 'plain':
      return plain(diff);
    case 'stylish':
      return stylish(diff);
    case 'json':
      return json(diff);
    default:
      throw new Error('Formatter with such name does not exist');
  }
};

export default formatter;
