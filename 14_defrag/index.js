const hash = require('../10_knot');

class Memory {
  constructor(input) {
    this.memory = this.createMemory(input);
  }


  createMemory (input) {
    let memory = [];
    for (let i = 0; i < 128; i++) {
      let row = [];
      const denseHash = hash.hashParse(`${input}-${i}`);
      for (let j = 0; j < 32; j += 2) {
        const part = parseInt(denseHash.slice(j, j + 2), 16).toString(2).split('');
        while (part.length < 8) {
          part.unshift('0');
        }
        row = [
          ...row,
          ...part.map(b => {
              return {
                used: b === '1',
                group: 0
              }
            })
        ]
      }
      memory.push(row);
    }
    return memory;
  }

  getNeighbours (x, y, without) {
    const all = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]];
    const directions = ['left', 'right', 'top', 'bottom'];

    if (without) {
      all.splice(directions.indexOf(without), 1);
    }
    return all.filter(e => e[0] >= 0 && e[1] >= 0 && e[0] < 128 && e[1] < 128);
  }

  getCell(x, y) {
    return this.memory[x][y];
  }
}

const defragmentation = (input) => {
  let used = 0;
  for (let i = 0; i < 128; i++) {
    const denseHash = hash.hashParse(`${input}-${i}`);
    for (let j = 0; j < 32; j += 2) {
      used += parseInt(denseHash.slice(j, j + 2), 16)
        .toString(2).split('').filter(i => i === '1').length;
    }
  }
  return used;
}

const markCell = (x, y, memory, group) => {
  const cell = memory.getCell(x, y);
  if (cell.used && cell.group === 0) {
    cell.group = group;
    memory.getNeighbours(x, y).forEach(coords => {
      markCell(coords[0], coords[1], memory, cell.group);
    });
    return ++group;
  }
  return group;
}

const getRegions = input => {
  const memory = new Memory(input);
  let group = 1;
  for (let r = 0; r < 128; r++) {
    for (let c = 0; c < 128; c++) {
      group = markCell(r, c, memory, group);
    }
  }
  return group - 1;
}

module.exports = {
  defragmentation,
  getRegions
}