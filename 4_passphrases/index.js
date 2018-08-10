const validateSimple = (input) => {
  return input.split('\n').map(row => isRowValid(row) ? 1 : 0).reduce((p, c) => p + c, 0);
};

const isRowValid = (row) => {
  const arr = row.split(' ');
  return arr.length === (new Set(arr)).size;
}

const validateAnagrams = (input) => {
  return input.split('\n').map(row => isRowValidAnagram(row) ? 1 : 0).reduce((p, c) => p + c, 0);
}

const isRowValidAnagram = (row) => {
  const arr = row.split(' ').map(word => word.split('').sort().join(''));
  return arr.length === (new Set(arr)).size;
}

module.exports = {
  validateSimple,
  validateAnagrams
}