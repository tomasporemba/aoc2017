module.exports = (input) => {
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    let next;
    if (i === input.length - 1) {
      next = input[0];
    } else {
      next = input[i + 1];
    }

    sum += input[i] === next ? Number(input[i]) : 0;
  }
  return sum;
};
