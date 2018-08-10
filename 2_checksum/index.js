if (!Array.prototype.firstLast) {
  Array.prototype.minMaxDiff = function () {
    if (this.length) {
      this.sort((a, b) => a - b);
      return Math.abs(this[this.length - 1] - this[0]);
    }
    return 0;
  }
}

if (!Array.prototype.quotient) {
  Array.prototype.quotient = function () {
    if (this.length) {
      let q = 0;
      this.sort((a, b) => b - a)
        .some((v, i) => {
          for (let j = i + 1; j < this.length; j++) {
            if (v % this[j] === 0) {
              q = v / this[j];
              return true;
            }
          }
        });
      return q;
    }
    return 0;
  }
}

module.exports = {
  minMaxDiff: (input) => {
    return input
      .split('\n')
      .reduce((prev, curr) => prev + curr.split('\t').map(e => Number(e)).minMaxDiff(), 0);
  },
  quotient: (input) => {
    return input
      .split('\n')
      .reduce((prev, curr) => prev + curr.split('\t').map(e => Number(e)).quotient(), 0);
  },
}
