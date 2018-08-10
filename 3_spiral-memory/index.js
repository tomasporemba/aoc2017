const getSteps = (index) => {
  steps = 0;
  let nextVertex = 1;
  for (let i = 1; ; i++) {
    nextVertex += i;
    if (index <= nextVertex) {
      const mid = nextVertex - Math.ceil(i / 2);
      steps = Math.abs(mid - index) + Math.ceil((i - 1) / 2);
      break;
    }
    // console.log(nextVertex);
    nextVertex += i;
    if (index <= nextVertex) {
      const mid = nextVertex - Math.ceil(i / 2);
      steps += Math.abs(mid - index) + Math.ceil(i / 2);
      break;
    }
    // console.log(nextVertex);
  }
  return steps;
};

const generateSpiral = (value) => {
  const spiral = new Spiral();
  for (; ;) {
    const nextNum = spiral.getNextNumber();
    if (nextNum > 312051) {
      console.log(nextNum);
      break;
    }
  }
};

class Spiral {
  constructor() {
    this.vals = [1, 1, 2, 4, 5, 10, 11, 23];
                //[first, second. third]
    this.indeces = [0, 1, 2];
    this.increaseLength = false;
    this.nextVertex = 10;
    this.prevVertex = 7;
    this.armLength = 3;
  }

  getNextVertex() {
    if (this.increaseLength) {
      this.armLength++;
    }
    this.increaseLength = !this.increaseLength;
    this.prevVertex = this.nextVertex;
    this.nextVertex += this.armLength;
  }

  moveIndeces() {
    this.indeces = this.indeces.map(i => i + 1);
  }

  getNextNumber() {
    let sum = this.vals[this.vals.length - 1];
    const position = this.vals.length + 1;
    
    // if vertex
    if (position === this.nextVertex) {
      sum += this.vals[this.indeces[1]];
      this.getNextVertex();
    } else if (position === this.prevVertex + 1) {
      sum += this.vals[this.indeces[1]] + this.vals[this.indeces[2]] + this.vals[this.vals.length - 2];
      this.moveIndeces();
    } else if (position === this.nextVertex - 1) {
      sum += this.vals[this.indeces[0]] + this.vals[this.indeces[1]];
    } else {
      sum += this.indeces.map(i => this.vals[i]).reduce((p, c) => p + c, 0);
      this.moveIndeces();
    }
    this.vals.push(sum);
    return sum;
  }
}

module.exports = {
  getSteps,
  generateSpiral
}