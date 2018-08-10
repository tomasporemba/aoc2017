class Buffer extends Array{
  constructor(step) {
    super();
    // this.push(0);
    this.index = 0;
    this.step = step;
    this.bufLength = 1;
  }

  insert(value) {
    this.getNextIndex();
    // this.splice(this.index, 0, value);
    this.bufLength++;
    if (this.index === 0) {
      console.log('WE FUCKED');
    }
    if (this.index === 1) {
      console.log(this.index, this.bufLength, value);
    }
  }

  getNextIndex() {
    this.index += this.step;
    while (this.index >= this.bufLength) {
      this.index -= this.bufLength;
    }
    this.index++;
  }
}

const runSpinLock = (step) => {
  const buffer = new Buffer(step);

  for (let i = 1; i < 50000000; i++) {
    buffer.insert(i);
  }

  return buffer;
}

module.exports = {
  runSpinLock
}