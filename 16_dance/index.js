const NUMBER_OF_CYCLES = 1000000000;
class DanceMove {
  constructor(move) {
    const [type, ...operands] = move
    const [op1, op2] = operands.join('').split('/');
    this.type = type;
    this.op1 = op1;
    this.op2 = op2;
  }
}
class Programs {
  constructor() {
    this.programs = Array.apply(null, { length: 16 }).map(Number.call, Number).map(e => String.fromCharCode(e + 97));
  }

  makeMove(move) {
    if (move.type === 's') {
      this.spin(move.op1);
    } else if (move.type === 'x') {
      this.exchange(move.op1, move.op2);
    } else {
      this.partner(move.op1, move.op2);
    }
  }

  spin(n) {
    for (; n > 0; n--) {
      const last = this.programs.pop();
      this.programs.unshift(last);
    }
  }

  exchange(p1, p2) {
    const tmp = this.programs[p1];
    this.programs[p1] = this.programs[p2];
    this.programs[p2] = tmp;
  }

  partner(a, b) {
    const p1 = this.programs.indexOf(a);
    const p2 = this.programs.indexOf(b);

    this.exchange(p1, p2);
  }
}

const followDance = input => {
  const party = new Programs();
  input.split(',').map(row => new DanceMove(row)).forEach(move => party.makeMove(move));
  return party;
}

const billionDance = input => {
  const party = new Programs();
  const moves = input.split(',').map(row => new DanceMove(row));
  const snapshots = [];
  let i = 0;
  let cycleLength = 0;
  for (; i < NUMBER_OF_CYCLES; i++) {
    moves.forEach(move => party.makeMove(move));
    const order = party.programs.join('');
    const indexOfPrev = snapshots.indexOf(order);

    if (indexOfPrev > -1) {
      //we have a cycle
      cycleLength = i - indexOfPrev;
      break;
    }
    snapshots.push(order);
  }
  
  //how many times do i have to run till 1 bil?

  let remainingCycles = (NUMBER_OF_CYCLES % cycleLength) - 1;
  for (i = 0; i < remainingCycles; i++) {
    moves.forEach(move => party.makeMove(move));
  }

  return party;
}

module.exports = {
  followDance,
  billionDance
}