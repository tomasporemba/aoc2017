class Insctruction {
  constructor(move) {
    const [type, ...operands] = move.split(' ');
    const [op1, op2] = operands;
    this.type = type;
    
    this.op1 = isNaN(Number(op1)) ? op1 : Number(op1);
    this.op2 = isNaN(Number(op2)) ? op2 : Number(op2);
  }
}

class MsgBus {
  constructor() {
    this.queues = {
      0: [],
      1: []
    }

    this.counts = {
      0: 0,
      1: 0
    }

    this.waiting = {
      0: false,
      1: false
    }
  }

  send(senderId, value) {
    this.counts[senderId]++;
    const recId = senderId === 0 ? 1 : 0;
    this.queues[recId].unshift(value);
  }

  receive(id) {
    if (this.queues[id].length === 0) {
      this.waiting[id] = true;
      return null;
    }
    this.waiting[id] = false;
    return this.queues[id].pop();
  }

  blocked(a, b) {
    if (!a && this.waiting[1]) {
      return true;
    }
    if (!b && this.waiting[0]) {
      return true;
    }
    return this.waiting[0] && this.waiting[1];
  }
}

class Interpret {
  constructor(input, id, bus) {
    this.bus = bus;
    this.id = id;
    this.registers = { p: id };
    this.instructions = input.split('\n').map(row => new Insctruction(row));
    this.ip = 0;
    this.frequency = null;
    this.terminated = false;
  }

  run() {
    while (true) {
      this.step();
    }
  }

  step() {
    const inst = this.instructions[this.ip];
    this.executeInst(inst);
    if (this.ip < 0 || this.ip >= this.instructions.length) {
      this.terminated = true;
    }
  }

  executeInst(inst) {
    switch (inst.type) {
      case 'snd':
        this.bus.send(this.id, this.eval(inst.op1));
        break;
      case 'set':
        this.registers[inst.op1] = this.eval(inst.op2);
        break;
      case 'add':
        this.registers[inst.op1] += this.eval(inst.op2);
        break;
      case 'mul':
        this.registers[inst.op1] *= this.eval(inst.op2);
        break;
      case 'mod':
        this.registers[inst.op1] %= this.eval(inst.op2);
        break;
      case 'rcv':
        const rcv = this.bus.receive(this.id);
        if (rcv === null) {
          // if no msg in queue, wait
          // do not increase ip so the instruction is repeated
          return;
        }
        this.registers[inst.op1] = rcv;
        break;
      case 'jgz':
        if (this.eval(inst.op1) > 0) {
          this.ip += this.eval(inst.op2);
          return;
        }
        break;
    }
    this.ip++;
  }
  
  eval(exp) {
    if (typeof exp === 'string') {
      if (this.registers[exp] === undefined) {
        this.registers[exp] = 0;
      }
      return this.registers[exp];
    }
    return exp;
  }

  get runnable() {
    return !this.terminated;
  }
}

const run = (input) => {
  const interpret = new Interpret(input);
  interpret.run();
}

const runParalel = (input) => {
  const bus = new MsgBus();
  const intA = new Interpret(input, 0, bus);
  const intB = new Interpret(input, 1, bus);
  
  while (true) {
    if (intA.runnable) {
      intA.step();
    }
    if (intB.runnable) {
      intB.step();
    }
    if (bus.blocked(intA.runnable, intB.runnable)) {
      console.log('deadlock');
      break;
    }
  }
  return bus;
}

module.exports = {
  run,
  runParalel
}