"use strict";
(function () {
    var canvas = SVG("drawing").size(400, 800);
    var not = new Gate({ canvas: canvas, gateType: "NOT", x: 100, y: 0, change: drawTruthTable }).draw();
    var or = new Gate({ canvas: canvas, gateType: "OR", x: 100, y: 100, change: drawTruthTable }).draw();
    var and = new Gate({ canvas: canvas, gateType: "AND", x: 100, y: 200, change: drawTruthTable }).draw();
    var xor = new Gate({ canvas: canvas, gateType: "XOR", x: 100, y: 300, change: drawTruthTable }).draw();
    var nor = new Gate({ canvas: canvas, gateType: "NOR", x: 100, y: 400, change: drawTruthTable }).draw();
    var nand = new Gate({ canvas: canvas, gateType: "NAND", x: 100, y: 500, change: drawTruthTable }).draw();
    var xnor = new Gate({ canvas: canvas, gateType: "XNOR", x: 100, y: 600, change: drawTruthTable }).draw();
    $(".truthtable").hide();
    function drawTruthTable(d) {
        $(".truthtable thead").empty();
        $(".truthtable tbody").empty();
        $(".truthtable").hide();
        var thead = $(".truthtable table thead");
        var tbody = $(".truthtable table tbody");
        if (d.gateType.toString() === "NOT") {
            var tr = $("<tr />");
            tr.append($("<th />").html("A"));
            tr.append($("<th />").html("Q"));
            thead.append(tr);
            tr = $("<tr />");
            tr.append($("<td />").html("1"));
            tr.append($("<td />").html("0"));
            tbody.append(tr);
            tr = $("<tr />");
            tr.append($("<td />").html("0"));
            tr.append($("<td />").html("1"));
            tbody.append(tr);
            if (d.a) {
                tbody.find("tr:nth-child(1)").addClass("select");
            }
            else {
                tbody.find("tr:nth-child(2)").addClass("select");
            }
            $(".truthtable").css("margin-top", 40);
        }
        else {
            var q = [];
            if (d.gateType.toString() === "OR") {
                q[0] = "0";
                q[1] = "1";
                q[2] = "1";
                q[3] = "1";
                $(".truthtable").css("margin-top", 110);
            }
            else if (d.gateType.toString() === "AND") {
                q[0] = "0";
                q[1] = "0";
                q[2] = "0";
                q[3] = "1";
                $(".truthtable").css("margin-top", 210);
            }
            else if (d.gateType.toString() === "XOR") {
                q[0] = "0";
                q[1] = "1";
                q[2] = "1";
                q[3] = "0";
                $(".truthtable").css("margin-top", 310);
            }
            else if (d.gateType.toString() === "NOR") {
                q[0] = "1";
                q[1] = "0";
                q[2] = "0";
                q[3] = "0";
                $(".truthtable").css("margin-top", 410);
            }
            else if (d.gateType.toString() === "NAND") {
                q[0] = "1";
                q[1] = "1";
                q[2] = "1";
                q[3] = "0";
                $(".truthtable").css("margin-top", 510);
            }
            else if (d.gateType.toString() === "XNOR") {
                q[0] = "1";
                q[1] = "0";
                q[2] = "0";
                q[3] = "1";
                $(".truthtable").css("margin-top", 610);
            }
            var tr = $("<tr />");
            tr.append($("<th />").html("A"));
            tr.append($("<th />").html("B"));
            tr.append($("<th />").html("Q"));
            thead.append(tr);
            tr = $("<tr />");
            tr.append($("<td />").html("0"));
            tr.append($("<td />").html("0"));
            tr.append($("<td />").html(q[0]));
            tbody.append(tr);
            tr = $("<tr />");
            tr.append($("<td />").html("0"));
            tr.append($("<td />").html("1"));
            tr.append($("<td />").html(q[1]));
            tbody.append(tr);
            tr = $("<tr />");
            tr.append($("<td />").html("1"));
            tr.append($("<td />").html("0"));
            tr.append($("<td />").html(q[2]));
            tbody.append(tr);
            tr = $("<tr />");
            tr.append($("<td />").html("1"));
            tr.append($("<td />").html("1"));
            tr.append($("<td />").html(q[3]));
            tbody.append(tr);
            if (!d.a && !d.b) {
                tbody.find("tr:nth-child(1)").addClass("select");
            }
            else if (!d.a && d.b) {
                tbody.find("tr:nth-child(2)").addClass("select");
            }
            else if (d.a && !d.b) {
                tbody.find("tr:nth-child(3)").addClass("select");
            }
            else if (d.a && d.b) {
                tbody.find("tr:nth-child(4)").addClass("select");
            }
        }
        $(".truthtable").show();
    }
})();
