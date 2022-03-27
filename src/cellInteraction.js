export const cellInteraction = (cell1, cell2) => {
  const distance = Math.sqrt(
    Math.pow(cell1.pos.x - cell2.pos.x, 2) +
      Math.pow(cell1.pos.y - cell2.pos.y, 2)
  );
  if (distance < 150) {
    cell1.changeDest(cell2.pos);
  }
};
