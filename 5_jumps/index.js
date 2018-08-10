const jumps = (input) => {
  const list = input.split('\n').map(e => Number(e));
  let index = 0;
  let steps = 0;

  while (index >= 0 && index < list.length) {
    const moveBy = list[index];
    list[index]++;
    index += moveBy;
    steps++;
  }
  return steps;
}

const jumps2 = (input) => {
  const list = input.split('\n').map(e => Number(e));
  let index = 0;
  let steps = 0;

  while (index >= 0 && index < list.length) {
    const moveBy = list[index];
    list[index] += moveBy >= 3 ? -1 : 1;
    index += moveBy;
    steps++;
  }
  return steps;
}

module.exports = {
  jumps,
  jumps2
}