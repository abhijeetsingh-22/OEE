export const capitalize = (str) => {
  if (str.length > 0) return str[0].toUpperCase() + str.slice(1);
  else return '';
};
