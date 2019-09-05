"use strict";
var ShowName;
(function (ShowName) {
    ShowName[ShowName["hidden"] = 0] = "hidden";
    ShowName[ShowName["left"] = 1] = "left";
    ShowName[ShowName["right"] = 2] = "right";
    ShowName[ShowName["top"] = 3] = "top";
    ShowName[ShowName["bottom"] = 4] = "bottom";
})(ShowName || (ShowName = {}));
var LogicalInputOutput = /** @class */ (function () {
    function LogicalInputOutput(settings) {
        if (!settings.change)
            settings.change = function () { };
        if (!settings.clickable)
            settings.clickable = false;
        if (!settings.name)
            settings.name = "";
        if (!settings.showName)
            settings.showName = ShowName.hidden;
        this.x = settings.x;
        this.y = settings.y;
        this.value = settings.value;
        this.change = settings.change;
        this.clickable = settings.clickable;
        this.name = settings.name;
        this.showName = settings.showName;
        this.canvas = settings.canvas;
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
        if (this.showName) {
            if (this.showName === ShowName.left) {
                this.canvas
                    .text(this.name)
                    .font({ size: 14, weight: "bold" })
                    .move(this.x - 20, this.y + 2);
            }
            if (this.showName === ShowName.right) {
                this.canvas
                    .text(this.name)
                    .font({ size: 14, weight: "bold" })
                    .move(this.x + 30, this.y + 2);
            }
        }
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
    function Gate(settings) {
        var _this = this;
        if (!settings.showText)
            settings.showText = true;
        if (!settings.change)
            settings.change = function () { };
        if (!settings.readOnly)
            settings.readOnly = false;
        if (!settings.aText && settings.aText !== "")
            settings.aText = "A";
        if (!settings.bText && settings.bText !== "")
            settings.bText = "B";
        if (!settings.qText && settings.qText !== "")
            settings.qText = "Q";
        this.canvas = settings.canvas;
        this.gateType = settings.gateType;
        this.x = settings.x;
        this.y = settings.y;
        this.showText = settings.showText;
        this.change = settings.change;
        this.readOnly = settings.readOnly;
        this.aText = settings.aText;
        this.bText = settings.bText;
        this.qText = settings.qText;
        this.change = settings.change;
        var settingsL = {
            canvas: this.canvas,
            x: this.x - 20,
            y: this.y + 69,
            clickable: !this.readOnly,
            value: false,
            change: function () { return _this.calc(); },
            name: this.aText,
            showName: ShowName.left
        };
        this.l1 = new LogicalInputOutput(settingsL);
        if (this.gateType === "NOT") {
            settingsL.y = this.y + 90;
            this.l1 = new LogicalInputOutput(settingsL);
        }
        settingsL = { canvas: this.canvas, x: this.x - 20, y: this.y + 109, clickable: !this.readOnly, value: false, change: function () { return _this.calc(); }, name: this.bText, showName: ShowName.left };
        this.l2 = new LogicalInputOutput(settingsL);
        settingsL = { canvas: this.canvas, x: this.x + 200, y: this.y + 90, clickable: false, value: false, change: function () { return _this.calc(); }, name: this.qText, showName: ShowName.right };
        this.l3 = new LogicalInputOutput(settingsL);
        this.self = this;
        this.change = settings.change;
    }
    Gate.prototype.setAValue = function (value) {
        this.l1.setValue(value);
        this.calc();
    };
    Gate.prototype.setBValue = function (value) {
        this.l2.setValue(value);
        this.calc();
    };
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
        this.change({ gateType: this.gateType, a: this.l1.getValue(), b: this.l2.getValue() });
    };
    Gate.prototype.myXOR = function (a, b) {
        return (a || b) && !(a && b);
    };
    return Gate;
}());
