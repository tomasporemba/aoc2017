const captcha = require('./1_captcha');
const checksum = require('./2_checksum');
const spiralMemory = require('./3_spiral-memory');
const passphrases = require('./4_passphrases');
const jumps = require('./5_jumps');
const reallocation = require('./6_reallocation');
const recursive = require('./7_recursive');
const inst = require('./8_instructions');
const stream = require('./9_stream');
const knot = require('./10_knot');
const hexGrid = require('./11_grid');
const plumber = require('./12_plumber');
const firewall = require('./13_firewall');
const defrag = require('./14_defrag');
const gen = require('./15_generators');
const dance = require('./16_dance');
const spinlock = require('./17_spinlock');
const assembler = require('./18_assembler');
const tubes = require('./19_tubes');
const fs = require('fs');

fs.readFile('./inputs/19.txt', 'utf8', (e, data) => {
  console.log(tubes.trace(data).stepCount);
});