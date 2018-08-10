Array.prototype.diff = function (a) {
  return this.filter(i => a.indexOf(i) < 0);
};

const towers = (input) => {
  const rows = input.split('\n');
  const programs = [];
  let children = [];

  rows.forEach(row => {
    const [program, progNum, ...rest] = row.split(' ');
    programs.push(program);
    children = [
      ...children,
      ...rest
        .filter(part => part !== '->')
        .map(name => name.includes(',') ? name.substr(0, name.length - 1) : name)
    ];
  });
  const diff = programs.diff(children);
  return diff;
}

const towersBalance = (input) => {
  const rows = input.split('\n');

  let programs = rows.map(row => {
    const [program, num, ...rest] = row.split(' ');
    return {
      program,
      weight: Number(num.substr(1, num.length - 2)),
      children: rest.filter(p => p !== '->').map(name => name.includes(',') ? name.substr(0, name.length - 1) : name)
    }
  });

  try {
    getChildrenWeight('uownj', programs);
  } catch (e) {
    return e;
  }
}

const getChildrenWeight = (name, programs) => {
  const program = programs.find(p => p.program === name);
  if (!program) {
    throw 'NOT FOUND ' + name;
  }

  program.children.forEach(child => {
    console.log(`${program.program} - ${child}`);
    program.weight += getChildrenWeight(child, programs);
  });
  console.log(`${program.program} - all children done`)

  // my children
  programs.filter(p => program.children.includes(p.program))
    .forEach((child, index, arr) => {
      // if my value is not in the other children throw my name cause i am different
      const others = arr.filter(c => c.program !== child.program);
      if (others.map(o => o.weight).indexOf(child.weight) < 0) {
        console.log(`${child.weight} ${others[0].weight}`)
        throw { name: child.program, myWeight: child.weight, weight: others[0].weight };
      }
    });
  
  return program.weight;

}

module.exports = {
  towers,
  towersBalance
}