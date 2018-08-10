const utils = require('../utils');

class KnotArray {
  constructor(arr) {
    this.array = arr;
    this.index = 0;
    this.skip = 0;
  }

  reverse(length) {
    if (length !== 0) {
      const last = this.getLastIndex(length);
      if (last === this.index) {
        
      } else if (last < this.index) {
        const rev = [...this.array.slice(this.index), ...this.array.slice(0, last + 1)].reverse();
        let revIndex = 0;
        let arrIndex = this.index;
        for (; arrIndex < this.array.length; revIndex++, arrIndex++) {
          this.array[arrIndex] = rev[revIndex];
        }
        arrIndex = 0;
        for (; revIndex < rev.length; arrIndex++ , revIndex++) {
          this.array[arrIndex] = rev[revIndex];
        }
      } else {
        const rev = this.array.slice(this.index, last + 1).reverse();
        for (let revIndex = 0, arrIndex = this.index;  revIndex < rev.length; arrIndex++, revIndex++) {
          this.array[arrIndex] = rev[revIndex];
        }
      }
    }    
    this.moveIndex(length);
  }

  moveIndex(length) {
    this.index += length + this.skip;
    while (this.index >= this.length) {
      this.index -= this.length;
    }
    this.skip++;
  }

  getLastIndex(length) {
    const last = this.index + length - 1;
    if (last >= this.length) {
      return last - this.length;
    }
    return last;
  }

  get length() {
    return this.array.length;
  }

  get sparseHash() {
    return this.array;
  }

  get denseHash() {
    let denseHash = [];
    for (let i = 0; i < 256; i += 16) {
      let part = this.array.slice(i, i + 16);
      let xor = part.reduce((a, b) => a ^ b, 0);
      denseHash.push(xor);
    }
    return denseHash.map(d => {
      let hex = d.toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    }).join('');
  }

}

const hash = (input) => {
  const list = Array.apply(null, { length: 256 }).map(Number.call, Number);
  const lengths = [...input, 17, 31, 73, 47, 23];

  const knot = new KnotArray(list);
  for (let i = 0; i < 64; i++) {
    lengths.forEach(l => {
      knot.reverse(l);
    });
  }
  
  return knot.denseHash;
}

const hashParse = (text) => {
  const ascii = text.split('').map(e => e.charCodeAt());
  return hash(ascii);
}


module.exports = {
  hash,
  hashParse
}