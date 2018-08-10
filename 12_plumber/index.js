const utils = require('../utils')

class Group {
  constructor(row) {
    const parts = row.split(' <-> ');
    this.number = Number(parts[0]);
    this.connected = parts[1].split(',').map(e => Number(e));
  }
}

const getGroup = (groups, number, set) => {
  const group = groups.find(g => g.number === number);
  set.add(group.number);

  // add all children that are not in a set
  group.connected.forEach(c => {
    if (!set.has(c)) {
      getGroup(groups, c, set);
    }
  });
}

const getZeroGroup = (input) => {
  const groups = input.split('\n').map(line => new Group(line));
  let programSet = new Set();
  getGroup(groups, 0, programSet);
  return programSet;
}

const getNumberOfGroups = (input) => {
  let numberOfGroups = 0;
  let groups = input.split('\n').map(line => new Group(line));

  while (groups.length) {
    let programSet = new Set();
    getGroup(groups, groups[0].number, programSet);
    numberOfGroups++;
    groups = groups.filter(g => !programSet.has(g.number));
  }
  return numberOfGroups;
}

module.exports = {
  getZeroGroup,
  getNumberOfGroups
}