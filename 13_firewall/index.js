
class Layer {
  constructor(depth, range) {
    this.depth = depth;
    this.range = range;
    this.scannerPos = 1;
    this.down = false;
    this.backIn = (range - 1) * 2;
  }

  moveScanner() {
    if (this.scannerPos === 1) {
      this.down = true;
    } else if (this.scannerPos === this.range) {
      this.down = false;
    }

    if (this.down) {
      this.scannerPos++;
    } else {
      this.scannerPos--;
    }
  }

  
}
class Firewall {
  constructor(input) {
    this.layers = input.split('\n').map(row => {
      const [depth, range] = row.split(': ').map(e => Number(e));
      return new Layer(depth, range);
    });
    this.severity = 0;
    this.position = 0;
  }

  moveTime() {
    if (this.position > Math.max(...this.layers.map(l => l.depth))) {
      return false;
    }
    const currLayer = this.layers.find(l => l.depth === this.position);

    if (currLayer && currLayer.scannerPos === 1) {
      //i am caught
      this.severity += this.position * currLayer.range;
    }
    this.layers.forEach(l => {
      if (l) {
        l.moveScanner();
      }
    });
    this.position++;
    return true;
  }
}

const trial = input => {
  let fw = new Firewall(input);
  while (fw.moveTime());
  return fw;
}

const getDelay = input => {
  const layers = input.split('\n').map(row => {
    const [depth, range] = row.split(': ').map(e => Number(e));
    return new Layer(depth, range);
  });

  let delay = 2;
  while (true) {
    const pass = layers
      .map(l => (delay + l.depth) % l.backIn !== 0)
      .reduce((a, b) => a && b, true);
    if (pass) {
      break;
    }
    delay += 4;
  }
  return delay;
}

module.exports = {
  trial,
  getDelay
}