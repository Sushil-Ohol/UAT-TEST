/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
export class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  scalarMultiple(k) {
    return new Vec2(k * this.x, k * this.y);
  }

  normalize() {
    return this.scalarMultiple(1 / this.magnitude());
  }

  add(v2) {
    return new Vec2(this.x + v2.x, this.y + v2.y);
  }

  subtract(v2) {
    return this.add(v2.scalarMultiple(-1));
  }
}
