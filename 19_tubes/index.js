const states = {
  down: 'down',
  up: 'up',
  left: 'left',
  right: 'right'
}

const opposites = {
  down: 'up',
  up: 'down',
  left: 'right',
  right: 'left'
}

String.prototype.isAlpha = function () {
  return this.length === 1
    && (
      (this.charCodeAt(0) >= 65 && this.charCodeAt(0) <= 90)
      || (this.charCodeAt(0) >= 97 && this.charCodeAt(0) <= 122)
    );
}

String.prototype.opposite = function () {
  if (states[this]) return opposites[this];
  
  return this;
}

class Tubes {
  constructor(input) {
    this.map = input.split('\n').map(row => row.split(''));
    this.position = {
      row: 0,
      col: this.map[0].indexOf('|')
    };
    this.letters = [];
    this.direction = states.down;
    this.stepCount = 0;
  }

  step() {
    const symbol = this.currentSymbol;

    switch (symbol) {
      case ' ':
        return true;
      case '|':
      case '-':
        this.getNextPosition(false);
        break;
      case '+':
        try {
          this.getNextPosition(true);
        } catch (e) {
          return true;
        }
        break;
      default:
        if (symbol.isAlpha()) {
          this.letters.push(symbol);
        }
        this.getNextPosition(false);
    }
    this.stepCount++;
    return false;
  }

  getNextPosition(changeDir) {
    if (changeDir) {
      const { row, col, direction } = this.findNeighbour(this.direction.opposite());
      this.position = { row, col };
      this.direction = direction;
    } else {
      switch (this.direction) {
        case states.down:
          this.position.row++;
          break;
        case states.up:
          this.position.row--;
          break;
        case states.left:
          this.position.col--;
          break;
        case states.right:
          this.position.col++;
          break;
      }
    }
  }

  findNeighbour(without) {
    let result;

    const posibilities = [
      { row: this.position.row + 1, col: this.position.col, direction: states.down },
      { row: this.position.row - 1, col: this.position.col, direction: states.up },
      { row: this.position.row, col: this.position.col - 1, direction: states.left },
      { row: this.position.row, col: this.position.col + 1, direction: states.right }
    ].filter(p => p.direction !== without);

    posibilities.some(p => {
      const symbol = this.getSymbol(p.row, p.col);
      if (symbol !== ' ') {
        result = p;
        return true;
      }
    });

    if (!result) {
      throw 'NO FURTHER WAY';
    }
    return result;
  }

  getSymbol(row, col) {
    if (row < 0 || col < 0 || row >= this.map.length || col >= this.map[0].length) {
      return ' ';
    }
    return this.map[row][col];
  }

  get currentSymbol() {
    return this.map[this.position.row][this.position.col];
  }
}

const trace = (input) => {
  const tubes = new Tubes(input);
  while (true) {
    if (tubes.step()) {
      break;
    }
  }
  return tubes;
}
module.exports = {
  trace
}