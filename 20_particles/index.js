class Particle {
  constructor(row) {
    const [p, v, a] = row.split(', ');
    this.position = this.parseCoords(p);
    this.origPosition = this.parseCoords(p);
    this.velocity = this.parseCoords(v);
    this.acceleration = this.parseCoords(a);
  }

  parseCoords(coords) {
    const [x, y, z] = coords.substr(3, coords.length - 4).split(',').map(e => Number(e));
    return { x, y, z };
  }

  moveParticle() {
    ['x', 'y', 'z'].forEach(c => {
      this.velocity[c] += this.acceleration[c];
      this.position[c] += this.velocity[c];
    });
  }

  getChange() {
    return {
      acc: Math.abs(this.acceleration.x) + Math.abs(this.acceleration.y) + Math.abs(this.acceleration.z),
      pos: Math.abs(this.position.x) + Math.abs(this.position.y) + Math.abs(this.position.z),
      vel: Math.abs(this.velocity.x) + Math.abs(this.velocity.y) + Math.abs(this.velocity.z),
    };
  }

  get positionStr() {
    return `${this.position.x},${this.position.y},${this.position.z}`;
  }
}

class Swarm {
  constructor(input) {
    this.particles = input.split('\n').map(row => new Particle(row));
    this.removeColliding();
  }

  tick() {
    this.particles.forEach(p => {
      p.moveParticle()
    });
    if (this.checkColliding()) {
      this.removeColliding();
    }
  }

  getChanges() {
    return this.particles.map(p => p.getChange());
  }

  checkColliding() {
    const positions = new Set(this.particles.map(p => p.positionStr));
    return positions.size !== this.particles.length;
  }

  removeColliding() {
    const seen = [];
    const remove = [];

    this.particles.forEach(p => {
      if (seen.includes(p.positionStr)) {
        remove.push(p.positionStr);
      } else {
        seen.push(p.positionStr);
      }
    });

    this.particles = this.particles.filter(p => !remove.includes(p.positionStr));
  }
}

const simulate = (input) => {
  const swarm = new Swarm(input);
  let i = 0;
  while (true) {
    swarm.tick()
    console.log(swarm.particles.length);
  }
}

const findMin = (input) => {
  const swarm = new Swarm(input);
  
  const changes = swarm.getChanges();
  let indexOfAcc = changes.reduce((iMin, x, i, arr) => x.acc < arr[iMin].acc ? i : iMin, 0);
  let minsAcc = changes.filter(c => c.acc === changes[indexOfAcc].acc);
  let indexOfVel = minsAcc.reduce((iMin, x, i, arr) => x.vel < arr[iMin].vel ? i : iMin, 0);
  let minsVel = minsAcc.filter(c => c.vel === minsAcc[indexOfVel].vel);
  let indexOfPos = minsVel.reduce((iMin, x, i, arr) => x.pos < arr[iMin].pos ? i : iMin, 0);
  let minsPos = minsVel.filter(c => c.pos === minsVel[indexOfPos].pos)[0];
  
  return changes.findIndex(c => c.vel === minsPos.vel && c.pos === minsPos.pos && c.acc === minsPos.acc);
}
module.exports = {
  findMin,
  simulate
}