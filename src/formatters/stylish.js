import _ from 'lodash';

const stylish = (diff) => {
  const indent = ' ';
  const indentsCount = 4;

  const typesMap = {
    deleted: '-',
    added: '+',
    unchanged: ' ',
    changed: {
      old: '-',
      new: '+',
    },
  };

  const formatObject = (value, depth) => {
    const indentSize = indent.repeat(indentsCount * depth);
    const bracketIndentSize = indent.repeat(indentsCount * depth - indentsCount);

    if (!_.isObject(value)) {
      return `${value}`;
    }

    const entries = Object.entries(value);

    const formattedObject = entries.map((entry) => {
      const [key, objectValue] = entry;

      return `${indentSize}${key}: ${formatObject(objectValue, depth + 1)}`;
    });

    return ['{', ...formattedObject, `${bracketIndentSize}}`].join('\n');
  };

  const iter = (node, depth) => node.map((currentNode) => {
    const indentSize = indent.repeat(indentsCount * depth);
    const indentSizeForType = indent.repeat(indentsCount * depth - 2);

    const addLine = (type, value) => `${indentSizeForType}${type} ${currentNode.key}: ${formatObject(value, depth + 1)}`;

    if (currentNode.type === 'internal') {
      return `${indentSize}${currentNode.key}: ${['{', ...iter(currentNode.children, depth + 1), `${indentSize}}`].join('\n')}`;
    }

    if (currentNode.type === 'changed') {
      const changedValueReplacer = typesMap.changed.old;
      const newValueReplacer = typesMap.changed.new;

      return [addLine(changedValueReplacer, currentNode.value), addLine(newValueReplacer, currentNode.newValue)].join('\n');
    }

    return addLine(typesMap[currentNode.type], currentNode.value);
  });

  return ['{', ...iter(diff, 1), '}'].join('\n');
};

export default stylish;