(() => {
  var canvas = SVG("drawing").size(400, 800);
  let not = new Gate(canvas, "NOT", 100, 0, true, drawTruthTable).draw();
  let or = new Gate(canvas, "OR", 100, 100, true, drawTruthTable).draw();
  let and = new Gate(canvas, "AND", 100, 200, true, drawTruthTable).draw();
  let xor = new Gate(canvas, "XOR", 100, 300, true, drawTruthTable).draw();
  let nor = new Gate(canvas, "NOR", 100, 400, true, drawTruthTable).draw();
  let nand = new Gate(canvas, "NAND", 100, 500, true, drawTruthTable).draw();
  let xnor = new Gate(canvas, "XNOR", 100, 600, true, drawTruthTable).draw();
  $(".truthtable").hide();

  function drawTruthTable(d: any) {
    $(".truthtable thead").empty();
    $(".truthtable tbody").empty();
    $(".truthtable").hide();

    let thead = $(".truthtable table thead");
    let tbody = $(".truthtable table tbody");

    if (d.gateType.toString() === "NOT") {
      let tr = $("<tr />");
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
      } else {
        tbody.find("tr:nth-child(2)").addClass("select");
      }
      $(".truthtable").css("margin-top", 40);
    } else {
      let q = [];
      if (d.gateType.toString() === "OR") {
        q[0] = "0";
        q[1] = "1";
        q[2] = "1";
        q[3] = "1";
        $(".truthtable").css("margin-top", 110);
      } else if (d.gateType.toString() === "AND") {
        q[0] = "0";
        q[1] = "0";
        q[2] = "0";
        q[3] = "1";
        $(".truthtable").css("margin-top", 210);
      } else if (d.gateType.toString() === "XOR") {
        q[0] = "0";
        q[1] = "1";
        q[2] = "1";
        q[3] = "0";
        $(".truthtable").css("margin-top", 310);
      } else if (d.gateType.toString() === "NOR") {
        q[0] = "1";
        q[1] = "0";
        q[2] = "0";
        q[3] = "0";
        $(".truthtable").css("margin-top", 410);
      } else if (d.gateType.toString() === "NAND") {
        q[0] = "1";
        q[1] = "1";
        q[2] = "1";
        q[3] = "0";
        $(".truthtable").css("margin-top", 510);
      } else if (d.gateType.toString() === "XNOR") {
        q[0] = "1";
        q[1] = "0";
        q[2] = "0";
        q[3] = "1";
        $(".truthtable").css("margin-top", 610);
      }

      let tr = $("<tr />");
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
      } else if (!d.a && d.b) {
        tbody.find("tr:nth-child(2)").addClass("select");
      } else if (d.a && !d.b) {
        tbody.find("tr:nth-child(3)").addClass("select");
      } else if (d.a && d.b) {
        tbody.find("tr:nth-child(4)").addClass("select");
      }
    }

    $(".truthtable").show();
  }
})();
