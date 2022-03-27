import { Circle } from "konva/lib/shapes/Circle";

export default function Cell(pos, radius, color, aggression, velocity, dest) {
  this.color = color;
  this.radius = radius;
  this.pos = pos;
  this.aggression = aggression;
  this.velocity = velocity;
  let destination = dest;

  // biggest number value from this.collor will be circles color.
  let circle = new Circle({
    x: this.pos.x,
    y: this.pos.y,
    radius: this.radius,
    fillLinearGradientStartPoint: { x: this.pos.x, y: this.pos.y },
    fillLinearGradientEndPoint: { x: this.radius, y: this.radius },
    fillLinearGradientColorStops: [
      this.color[0],
      "Red",
      this.color[1],
      "blue",
      this.color[2],
      "green",
      this.color[3],
      "yellow",
      this.color[4],
      "purple",
      this.color[5],
      "white",
    ],
    stroke: "black",
    strokeWidth: 1,
  });
  this.cell = circle;

  let v = {
    x: this.pos.x - destination.x,
    y: this.pos.y - destination.y,
  };
  let mag = Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2));
  let normalize = { x: v.x / mag, y: v.y / mag };

  this.changeDest = (cords) => {
    destination = cords;
    v = {
      x: this.pos.x - destination.x,
      y: this.pos.y - destination.y,
    };
    mag = Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2));
    normalize = { x: v.x / mag, y: v.y / mag };
  };

  this.move = () => {
    if (this.pos.x >= window.innerWidth - this.radius) {
      this.pos.x = window.innerWidth - this.radius;
      normalize.x *= -1;
    }
    if (this.pos.x <= 0 + this.radius) {
      this.pos.x = 0 + this.radius;
      normalize.x *= -1;
    }
    if (this.pos.y >= window.innerHeight - this.radius) {
      this.pos.y = window.innerHeight - this.radius;
      normalize.y *= -1;
    }
    if (this.pos.y <= 0 + this.radius) {
      this.pos.y = 0 + this.radius;
      normalize.y *= -1;
    }
    this.pos.x -= normalize.x;
    this.pos.y -= normalize.y;
    this.cell.x(this.pos.x);
    this.cell.y(this.pos.y);
  };
}
