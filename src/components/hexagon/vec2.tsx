/* Vec2 Component */
export class Vec2 {
  x: number;

  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  scalarMultiple(k: number) {
    return new Vec2(k * this.x, k * this.y);
  }

  normalize() {
    return this.scalarMultiple(1 / this.magnitude());
  }

  add(v2: Vec2) {
    return new Vec2(this.x + v2.x, this.y + v2.y);
  }

  subtract(v2: Vec2) {
    return this.add(v2.scalarMultiple(-1));
  }
}
