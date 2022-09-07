import _ from 'lodash';

const buildAstTree = (filepath1, filepath2) => {
  const iter = (tree1, tree2) => {
    const uniqueKeys = _.union(Object.keys(tree1), Object.keys(tree2));
    const result = uniqueKeys.map((key) => {
      if (!_.has(tree1, key)) {
        return { key, value: tree2[key], type: 'added' };
      }

      if (!_.has(tree2, key)) {
        return { key, value: tree1[key], type: 'deleted' };
      }

      if (_.isObject(tree1[key]) && _.isObject(tree2[key])) {
        return { key, type: 'internal', children: iter(tree1[key], tree2[key]) };
      }

      if (tree1[key] !== tree2[key]) {
        return {
          key,
          value: tree1[key],
          newValue: tree2[key],
          type: 'changed',
        };
      }

      return { key, value: tree1[key], type: 'unchanged' };
    });

    return _.orderBy(result, [(entry) => entry.key], ['asc']);
  };

  return iter(filepath1, filepath2, 1);
};

export default buildAstTree;
