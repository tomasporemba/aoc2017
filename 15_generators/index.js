const A_FACTOR = 16807;
const B_FACTOR = 48271;
const A_INIT = 703;
const B_INIT = 516;
/* const A_INIT = 65;
const B_INIT = 8921; */

class Generator {
  constructor(init, factor, divBy) {
    this.factor = factor;
    this.lastVal = init;
    this.divBy = divBy;
  }

  get nextVal() {
    while (true) {
      const next = this.generateNextVal();
      if (next % this.divBy === 0) {
        return next;
      }
    }

  }

  generateNextVal() {
    const next = (this.lastVal * this.factor) % 2147483647;
    this.lastVal = next;
    return next;
  }
}

const compareGenerators = () => {
  const genA = new Generator(A_INIT, A_FACTOR, 4);
  const genB = new Generator(B_INIT, B_FACTOR, 8);

  let match = 0;
  for (let i = 0; i < 5000000; i++) {
    const a = genA.nextVal;
    const b = genB.nextVal;
    
    if (((a & 0xffff) ^ (b & 0xffff)) === 0) {
      match++;
    }
  }

  return match
}


module.exports = {
  compareGenerators
}