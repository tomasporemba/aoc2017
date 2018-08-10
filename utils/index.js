const splitRow = (line, separator = ',') => {
  return line.split(',')
}

const parseLines = input => {
  return input.split('\n');
}

module.exports = {
  splitRow,
  parseLines
}