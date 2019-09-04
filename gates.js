"use strict";
var LogicalInputOutput = /** @class */ (function () {
    function LogicalInputOutput(canvas, x, y, value, clickable, change) {
        if (change === void 0) { change = function () { }; }
        this.canvas = canvas;
        this.clickable = false;
        this.x = x;
        this.y = y;
        this.value = value;
        this.clickable = clickable;
        this.change = change;
    }
    LogicalInputOutput.prototype.draw = function () {
        this.box = this.canvas
            .rect(20, 20)
            .move(this.x, this.y)
            .stroke({ width: 4 });
        var t = this.value ? "1" : "0";
        this.box.fill({ color: this.value ? "green" : "red" });
        this.text = this.canvas
            .text(t)
            .font({ size: 14, weight: "bold" })
            .fill("white")
            .move(this.x + 6, this.y + 2);
        $("text tspan").addClass("svgText");
        var self = this;
        if (this.clickable) {
            this.box.on("click", function () {
                self.value = !self.value;
                self.updateText();
                self.change();
            });
        }
    };
    LogicalInputOutput.prototype.updateText = function () {
        this.text.text(this.value ? "1" : "0");
        this.box.fill(this.value ? "green" : "red");
        $("text tspan").addClass("svgText");
    };
    LogicalInputOutput.prototype.getValue = function () {
        return this.value;
    };
    LogicalInputOutput.prototype.setValue = function (value) {
        this.value = value;
        this.updateText();
    };
    return LogicalInputOutput;
}());
var Gate = /** @class */ (function () {
    function Gate(canvas, gateType, x, y, showText) {
        var _this = this;
        this.canvas = canvas;
        this.gateType = gateType;
        this.x = x;
        this.y = y;
        this.showText = showText;
        this.l1 = new LogicalInputOutput(this.canvas, this.x - 20, this.y + 69, false, true, function () { return _this.calc(); });
        if (this.gateType === "NOT") {
            this.l1 = new LogicalInputOutput(this.canvas, this.x - 20, this.y + 90, false, true, function () { return _this.calc(); });
        }
        this.l2 = new LogicalInputOutput(this.canvas, this.x - 20, this.y + 109, false, true, function () { return _this.calc(); });
        this.l3 = new LogicalInputOutput(this.canvas, this.x + 200, this.y + 90, false, false);
        this.self = this;
    }
    Gate.prototype.draw = function () {
        if (this.gateType === "NOT")
            this.image = this.canvas.image("images/1920px-NOT_ANSI.svg.png", 200, 200).move(this.x, this.y);
        if (this.gateType === "XOR")
            this.image = this.canvas.image("images/1920px-XOR_ANSI.svg.png", 200, 200).move(this.x, this.y);
        if (this.gateType === "AND")
            this.image = this.canvas.image("images/1920px-AND_ANSI.svg.png", 200, 200).move(this.x, this.y);
        if (this.gateType === "OR")
            this.image = this.canvas.image("images/1920px-OR_ANSI.svg.png", 200, 200).move(this.x, this.y);
        if (this.gateType === "NAND")
            this.image = this.canvas.image("images/1920px-NAND_ANSI.svg.png", 200, 200).move(this.x, this.y);
        if (this.gateType === "NOR")
            this.image = this.canvas.image("images/1920px-NOR_ANSI.svg.png", 200, 200).move(this.x, this.y);
        if (this.gateType === "XNOR")
            this.image = this.canvas.image("images/1920px-XNOR_ANSI.svg.png", 200, 200).move(this.x, this.y);
        this.l1.draw();
        if (this.gateType !== "NOT")
            this.l2.draw();
        this.l3.draw();
        if (this.gateType === "NOT") {
            this.l1Line = this.canvas.line(this.x + 10, this.y + 100, this.x + 58, this.y + 100).stroke({ width: 4, color: "black" });
            this.l3Line = this.canvas.line(this.x + 161, this.y + 100, this.x + 190, this.y + 100).stroke({ width: 4, color: "black" });
        }
        else {
            this.l1Line = this.canvas.line(this.x + 10, this.y + 80, this.x + 59, this.y + 80).stroke({ width: 4, color: "black" });
        }
        if (this.gateType !== "NOT") {
            this.l2Line = this.canvas.line(this.x + 10, this.y + 120, this.x + 59, this.y + 120).stroke({ width: 4, color: "black" });
        }
        if (this.gateType === "OR" || this.gateType === "XOR") {
            this.l3Line = this.canvas.line(this.x + 145, this.y + 100, this.x + 190, this.y + 100).stroke({ width: 4, color: "black" });
        }
        else if (this.gateType === "AND") {
            this.l3Line = this.canvas.line(this.x + 141, this.y + 100, this.x + 190, this.y + 100).stroke({ width: 4, color: "black" });
        }
        else if (this.gateType === "NOR" || this.gateType === "NAND" || this.gateType === "XNOR") {
            this.l3Line = this.canvas.line(this.x + 161, this.y + 100, this.x + 190, this.y + 100).stroke({ width: 4, color: "black" });
        }
        if (this.showText) {
            var t = this.gateType;
            this.canvas
                .text(t)
                .font({ size: 14, weight: "bold" })
                .move(this.x + 80, this.y + 90);
        }
        this.calc();
    };
    Gate.prototype.calc = function () {
        var v = true;
        if (this.gateType === "XOR")
            v = this.myXOR(this.l1.getValue(), this.l2.getValue());
        if (this.gateType === "XNOR")
            v = !this.myXOR(this.l1.getValue(), this.l2.getValue());
        if (this.gateType === "AND")
            v = this.l1.getValue() && this.l2.getValue();
        if (this.gateType === "NAND")
            v = !(this.l1.getValue() && this.l2.getValue());
        if (this.gateType === "OR")
            v = this.l1.getValue() || this.l2.getValue();
        if (this.gateType === "NOR")
            v = !(this.l1.getValue() || this.l2.getValue());
        if (this.gateType === "NOT")
            v = !this.l1.getValue();
        this.l3.setValue(v);
        this.l1Line.stroke({ color: this.l1.getValue() ? "green" : "red" });
        if (this.l2Line)
            this.l2Line.stroke({ color: this.l2.getValue() ? "green" : "red" });
        this.l3Line.stroke({ color: this.l3.getValue() ? "green" : "red" });
    };
    Gate.prototype.myXOR = function (a, b) {
        return (a || b) && !(a && b);
    };
    return Gate;
}());
