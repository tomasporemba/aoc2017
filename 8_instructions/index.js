String.prototype.getVal = function (registers) {
  return registers[this];
}

class Instruction {
  constructor(register, action, valueStr, kw, regCond, condition, valCondStr) {
    this.register = register;
    this.action = action;
    this.value = Number(valueStr);
    this.regCond = regCond;
    this.condition = condition;
    this.valCond = valCondStr;
  }
}

const findMaxReg = (input) => {
  const registers = {};
  const instructions = input.split('\n').map(row => new Instruction(...row.split(' ')));
  instructions.forEach(i => registers[i.register] = 0);
  registers.maximum = 0;
  instructions.forEach(inst => {
    if (evalCondition(inst, registers)) {
      action(inst, registers);
    }
  })
  console.log(registers);
}

const evalCondition = (inst, regs) => {
  return eval(regs[inst.regCond] + inst.condition + inst.valCond);
}

const action = (inst, regs) => {
  regs[inst.register] =
    inst.action === 'inc'
      ? regs[inst.register] + inst.value
      : regs[inst.register] - inst.value;
  if (regs[inst.register] > regs.maximum) {
    regs.maximum = regs[inst.register];
  }
}

module.exports = {
  findMaxReg
}