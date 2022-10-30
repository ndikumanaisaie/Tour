/* eslint-disable no-param-reassign */
export default (str, count) => {
  if (str.length > count) {
    str = `${str.substring(0, count)}...`;
  }
  return str;
};

export const firstCharacter = (word) => {
  const data = word.split(' ');
  let output = '';

  for (let i = 0; i < data.length; i += 1) {
    output += data[i].substring(0, 1);
  }
  return output;
};
