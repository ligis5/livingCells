import Konva from "konva";
import "./style.css";

import Cell from "./cell";
import { cellInteraction } from "./cellInteraction";

// first we need to create a stage
const stage = new Konva.Stage({
  container: "container", // id of container <div>
  width: window.innerWidth - 1,
  height: window.innerHeight - 1,
});

// then create layer
const layer = new Konva.Layer();

//Create Cells

let cells = [];
for (let i = 1; i <= 2; i++) {
  let color = [
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
  ];
  // position, radius, color, aggression - if aggresion >= 0.5 then its predator, velocity, destination
  let cell = new Cell(
    { x: stage.width() / i, y: stage.height() / i },
    i + Math.random() * 5,
    color,
    Math.random(),
    { x: (Math.random() - 0.5) * 5, y: (Math.random() - 0.5) * 5 },
    {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }
  );
  cells.push(cell);
}
console.log(cells);
//loop
const anim = new Konva.Animation(function (frame) {
  for (let i = 0; i < cells.length; i++) {
    cells[i].move();
    for (let j = 0; j < cells.length - 1; j++) {
      if (j != i) {
        cellInteraction(cells[i], cells[j]);
      }
    }
    layer.add(cells[i].cell);
  }
}, layer);
anim.start();
// add the layer to the stage
stage.add(layer);

// draw the image
layer.draw();
