import yaml from 'js-yaml';

const parse = (file, extension) => {
  let parsedContent;

  if (extension === 'json') {
    parsedContent = JSON.parse(file);
  } else if (extension === 'yml' || extension === 'yaml') {
    parsedContent = yaml.load(file);
  }

  return parsedContent;
};

export default parse;