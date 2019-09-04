"use strict";
(function () {
    var canvas = SVG("drawing").size(800, 800);
    var not = new Gate(canvas, "NOT", 100, 0, true).draw();
    var or = new Gate(canvas, "OR", 100, 100, true).draw();
    var and = new Gate(canvas, "AND", 100, 200, true).draw();
    var xor = new Gate(canvas, "XOR", 100, 300, true).draw();
    var nor = new Gate(canvas, "NOR", 100, 400, true).draw();
    var nand = new Gate(canvas, "NAND", 100, 500, true).draw();
    var xnor = new Gate(canvas, "XNOR", 100, 600, true).draw();
    $.getJSON("./data/data.json", {}, function (d) {
        console.log(d);
    });
})();
