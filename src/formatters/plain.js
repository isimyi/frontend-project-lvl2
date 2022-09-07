import _ from 'lodash';

const formatToPlain = (diff) => {
  const formatValue = (value) => {
    if (_.isObject(value)) {
      return '[complex value]';
    }

    if (typeof value === 'string') {
      return `'${value}'`;
    }

    return value;
  };

  const iter = (tree, ancestry) => {
    const plainEntries = tree.flatMap((node) => {
      const newAncestry = typeof ancestry === 'undefined' ? [node.key] : [ancestry, node.key].join('.');

      switch (node.type) {
        case 'internal':
          return iter(node.children, newAncestry);
        case 'deleted':
          return `Property '${newAncestry}' was removed`;
        case 'added':
          return `Property '${newAncestry}' was added with value: ${formatValue(node.value)}`;
        case 'changed':
          return `Property '${newAncestry}' was updated. From ${formatValue(node.value)} to ${formatValue(node.newValue)}`;
        case 'unchanged':
        default:
          return [];
      }
    });

    return plainEntries.join('\n');
  };

  return iter(diff);
};

export default formatToPlain;
