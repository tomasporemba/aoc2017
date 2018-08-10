const utils = require('../utils');

String.prototype.opposite = function () {
  const opposites = {
    s: 'n',
    n: 's',
    nw: 'se',
    se: 'nw',
    sw: 'ne',
    ne: 'sw'
  }

  return opposites[this];
}

class HexSteps extends Array {
  constructor(items) {
    if (items) {
      super(items);
    } else {
      super();
    }
    this.max = 0;
  }

  step(direction) {
    let indexOfOpp = this.indexOf(direction.opposite());
    if (indexOfOpp < 0) {
      this.push(direction);
    } else {
      this.splice(indexOfOpp, 1);
    }

    this.normalize();
    if (this.length > this.max) {
      this.max = this.length;
    }
  }

  normalize() {
    this.replace('sw', 'se', 's');
    this.replace('nw', 'ne', 'n');
    this.replace('se', 'n', 'ne');
    this.replace('sw', 'n', 'nw');
    this.replace('nw', 's', 'sw');
    this.replace('ne', 's', 'se');
  }

  replace(d1, d2, what) {
    const num1 = this.filter(d => d === d1).length;
    const num2 = this.filter(d => d === d2).length;

    for (let i = 0; i < num1 && i < num2; i++) {
      this.removeDir(d1);
      this.removeDir(d2);
      if (what) {
        this.step(what);
      }
    }
  }

  removeDir(dir) {
    let index = this.indexOf(dir);
    if (index > -1) {
      this.splice(index, 1);
    }
  }
}

const steps = (input) => {
  if (typeof input === 'string') {
    input = utils.splitRow(input);
  } 

  if (!Array.isArray(input)) {
    throw `Wrong parameter - input. Is ${typeof input}, should be array or string.`;
  }

  let steps = new HexSteps();
  input.forEach(s => {
    steps.step(s);
  });

  return steps;
}
  

module.exports = {
  steps
}