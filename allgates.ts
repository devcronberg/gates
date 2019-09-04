(() => {
  var canvas = SVG("drawing").size(800, 800);
  let not = new Gate(canvas, "NOT", 100, 0, true).draw();
  let or = new Gate(canvas, "OR", 100, 100, true).draw();
  let and = new Gate(canvas, "AND", 100, 200, true).draw();
  let xor = new Gate(canvas, "XOR", 100, 300, true).draw();
  let nor = new Gate(canvas, "NOR", 100, 400, true).draw();
  let nand = new Gate(canvas, "NAND", 100, 500, true).draw();
  let xnor = new Gate(canvas, "XNOR", 100, 600, true).draw();
})();
