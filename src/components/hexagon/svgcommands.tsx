import { Vec2 } from "./vec2";

export class SVGCommands {
  commands: string[];

  constructor() {
    this.commands = [];
  }

  toString() {
    return this.commands.join(" ");
  }

  // svg move to command
  M(vec2: Vec2) {
    this.commands.push(`M${vec2.x} ${vec2.y}`);
    return this;
  }

  // svg draw line to point from current position command
  L(vec2: Vec2) {
    this.commands.push(`L${vec2.x} ${vec2.y}`);
    return this;
  }

  // svg bezier quadratic curve command
  Q(controlVec2: Vec2, endVec2: Vec2) {
    this.commands.push(
      `Q${controlVec2.x} ${controlVec2.y} ${endVec2.x} ${endVec2.y}`
    );
    return this;
  }

  // svg shortcut close path command
  Z() {
    this.commands.push("Z");
    return this;
  }
}
