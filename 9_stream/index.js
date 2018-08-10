class Stack {
  constructor() {
    this.stack = [];
    this.depth = 0;
  }

  push(a) {
    this.stack.push(a);
  }

  pop() {
    return this.stack.pop();
  }

  top() {
    return this.stack.length
      ? this.stack[this.stack.length - 1]
      : null;
  }

  incDepth() {
    this.depth++;
  }

  decDepth() {
    this.depth--;
  }
}

const handleLeftChevron = (letter, stack) => {
  switch (letter) {
    case '>':
      stack.pop();
      return false;
    case '!':
      stack.push(letter);
      return false;
    default:
      return true;
  }
}

const handleLeftBracket = (letter, stack) => {
  switch (letter) {
    case '{':
      stack.incDepth();
    case '!':
    case '<':
      stack.push(letter);
      break;
    case '}':
      let depth = stack.depth;
      stack.decDepth();
      stack.pop();
      return depth;
    default:
      break;
  }
  return false;
}

const automat = (input) => {
  const stack = new Stack();
  const stream = input.split('');
  let groups = 0;
  let garbageCount = 0;

  stream.forEach(letter => {
    switch (stack.top()) {
      case null:
        if (letter === '{') {
          stack.incDepth();
        }
        stack.push(letter)
        break;
      case '{':
        let depth = handleLeftBracket(letter, stack);
        if (depth) {
          groups += depth;
        }
        break;
      case '<':
        if (handleLeftChevron(letter, stack)) {
          garbageCount++;
        }
        break;
      case '!':
        stack.pop();
        break;
    }
  });
  return {groups, garbageCount};
}

module.exports = {
  automat
}