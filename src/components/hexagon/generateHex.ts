import { SVGCommands } from "./svgcommands";
import { Vec2 } from "./vec2";

export function generateHexSVG(sideLength: number, borderRadius: number) {
  // from geometry of a hexagon
  const width = Math.sqrt(3) * sideLength;
  const height = 2 * sideLength;

  // a, b, c, d, e and f represent the vertices
  const a: Vec2 = new Vec2(width / 2, 0);
  const b: Vec2 = new Vec2(width, height / 4);
  const c: Vec2 = new Vec2(width, (3 * height) / 4);
  const d: Vec2 = new Vec2(width / 2, height);
  const e: Vec2 = new Vec2(0, (3 * height) / 4);
  const f: Vec2 = new Vec2(0, height / 4);

  // start at the top point

  if (borderRadius === 0) {
    const pointyHexagon = new SVGCommands();
    return pointyHexagon.M(a).L(b).L(c).L(d).L(e).L(f).Z().toString();
  }

  /* for hexagons with curved corners, we use the quadratic curve command
	the vertex itself will be the control point
	the start point will be a point slightly to the left of the vertex along the perimeter of the hexagon
	and the end point will be a point slightly to the right of the vertex along the perimeter of the hexagon
	the distance that the start and end points are along the adjacent sides is given by the curve radius */
  const dl = f.subtract(a).normalize().scalarMultiple(borderRadius);
  const dr = b.subtract(a).normalize().scalarMultiple(borderRadius);
  const dd = new Vec2(0, borderRadius);

  const roundedHexagon = new SVGCommands();
  roundedHexagon
    .M(a.add(dl))
    .Q(a, a.add(dr))
    .L(b.subtract(dr))
    .Q(b, b.add(dd))
    .L(c.subtract(dd))
    .Q(c, c.add(dl))
    .L(d.subtract(dl))
    .Q(d, d.subtract(dr))
    .L(e.add(dr))
    .Q(e, e.subtract(dd))
    .L(f.add(dd))
    .Q(f, f.subtract(dl))
    .Z();

  return roundedHexagon.toString();
}
