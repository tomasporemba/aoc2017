Array.prototype.indexOfMax = function () {
  return this.indexOf(Math.max(...this));
}

Array.prototype.realloc = function (value, start) {
  let index = start;
  while (value != 0) {
    if (index >= this.length) {
      index = 0;
    }
    this[index]++;
    value--;
    index++;
  }
}

const realloc = (input) => {
  const memory = input.split('\t').map(e => Number(e));
  const snapshots = [memory.join(',')];
  let steps = 0;
  while (true) {
    steps++;
    const indexOfMax = memory.indexOfMax();
    const value = memory[indexOfMax];
    memory[indexOfMax] = 0;
    memory.realloc(value, indexOfMax + 1);
    const snap = memory.join(',');
    if (snapshots.includes(snap)) {
      snapshots.push(snap);
      break;
    } else {
      snapshots.push(snap);
    }
  }
  return { steps, snapshots };
}

const getLoopSize = (input) => {
  const snapshots = realloc(input).snapshots;
  return snapshots.length - 1 - snapshots.indexOf(snapshots[snapshots.length - 1]);
}

module.exports = {
  realloc,
  getLoopSize
}