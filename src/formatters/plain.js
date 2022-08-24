import _ from 'lodash';

const plain = (diff) => {
  
  const formatValue = (value) => {
    if (_.isObject(value)) {
      return '[complex value]';
    }
    
    if (typeof value === 'string') {
      return `${value}`
    }
    
    return value;
  }
  
  const iter = (tree, ancestry) => {
    const result = tree.flatMap((node) => {
      const newAncestry = [ancestry, node.key].join('.');
      
      switch (node.type) {
        case 'internal':
          return iter(node.children, newAncestry);
        case 'deleted':
          return `Property '${newAncestry.slice(1)}' was removed`;
        case 'added':
          return `Property '${newAncestry.slice(1)}' was added with value: ${formatValue(node.value)}`;
        case 'changed':
          return `Property '${newAncestry.slice(1)}' was updated. From '${formatValue(node.value)}' to '${formatValue(node.newValue)}'`;
        default:
          return [];
      }
    });
    
    return result;
  };
  
  return iter(diff);
};

export default plain;