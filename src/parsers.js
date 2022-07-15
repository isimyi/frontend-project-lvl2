import yaml from 'js-yaml';

const parse = (data, extension) => {
  let parsedContent;

  if (extension === 'json') {
    parsedContent = JSON.parse(data);
  } else if (extension === 'yml' || extension === 'yaml') {
    parsedContent = yaml.load(data);
  }

  return parsedContent;
};

export default parse;
