"use strict";
var HalfAdder = /** @class */ (function () {
    function HalfAdder(settings) {
        var _this = this;
        this.canvas = settings.canvas;
        this.x = settings.x;
        this.y = settings.y;
        this.and = new Gate({
            canvas: this.canvas,
            gateType: "AND",
            x: this.x + 50,
            y: this.y + 100,
            readOnly: true,
            aText: "",
            bText: "",
            qText: "C"
        });
        this.and.draw();
        this.xor = new Gate({
            canvas: this.canvas,
            gateType: "XOR",
            x: this.x + 50,
            y: this.y + 0,
            change: function (d) {
                _this.and.setAValue(d.a);
                _this.and.setBValue(d.b);
            }
        });
        this.xor.draw();
        this.canvas
            .line(this.x + 65, this.y + 80, this.x + 65, this.y + 180)
            .stroke({ width: 4 });
        this.canvas
            .line(this.x + 80, this.y + 120, this.x + 80, this.y + 220)
            .stroke({ width: 4 });
        this.canvas.circle(12).move(this.x + 59, this.y + 76);
        this.canvas.circle(12).move(this.x + 59, this.y + 176);
        this.canvas.circle(12).move(this.x + 74, this.y + 114);
        this.canvas.circle(12).move(this.x + 74, this.y + 214);
    }
    return HalfAdder;
}());
(function () {
    var canvas = SVG("drawing").size(800, 800);
    var halfAdder = new HalfAdder({ canvas: canvas, x: 0, y: 0 });
})();
