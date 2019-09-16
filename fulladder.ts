interface FullAdderSettings {
  x: number;
  y: number;
  canvas: any;
}

class FullAdder {
  private xor1: Gate;
  private xor2: Gate;
  private and1: Gate;
  private and2: Gate;
  private or1: Gate;
  private cin: LogicalInputOutput;

  private canvas: any;
  private x: number;
  private y: number;

  constructor(settings: FullAdderSettings) {
    this.canvas = settings.canvas;
    this.x = settings.x;
    this.y = settings.y;
    this.cin = new LogicalInputOutput({
      x: 30,
      y: 210,
      clickable: true,
      name: "C",
      showName: ShowName.left,
      canvas: settings.canvas,
      value: false
    });
    this.cin.draw();
    this.xor1 = new Gate({
      canvas: this.canvas,
      gateType: "XOR",
      x: this.x + 50,
      y: this.y,
      qText: ""
    });
    this.xor1.draw();

    this.xor2 = new Gate({
      canvas: this.canvas,
      gateType: "XOR",
      x: this.x + 200,
      y: this.y + 100,
      qText: "Q"
    });
    this.xor2.draw();

    this.and1 = new Gate({
      canvas: this.canvas,
      gateType: "AND",
      x: this.x + 200,
      y: this.y + 200,
      qText: ""
    });
    this.and1.draw();

    this.and2 = new Gate({
      canvas: this.canvas,
      gateType: "AND",
      x: this.x + 200,
      y: this.y + 300,
      qText: ""
    });
    this.and2.draw();

    this.or1 = new Gate({
      canvas: this.canvas,
      gateType: "OR",
      x: this.x + 380,
      y: this.y + 250,
      qText: "C",
      aText: "",
      bText: ""
    });
    this.or1.draw();

    // xor1
    this.vLine(80, 80, 300, true);
    this.hLine(78, 380, 70);

    this.vLine(70, 120, 300, true);
    this.hLine(68, 418, 80);

    this.vLine(215, 100, 80, true, true);

    this.vLine(230, 100, 180, true, true);

    // Cin
    this.hLine(60, 220, 90);
    this.vLine(100, 220, 100, true, false);
    this.hLine(100, 318, 50);

    // and1
    this.vLine(390, 300, 30, true, true);

    // and2
    this.vLine(390, 370, 30, true, true);

    this.xor1.setChange((e: GateChangeEventArgs) => {
      this.and2.setAValue(e.a);
      this.and2.setBValue(e.b);
      this.xor2.setAValue(e.q);
      this.and1.setAValue(e.q);
    });

    this.and2.setChange((v: GateChangeEventArgs) => {
      this.or1.setBValue(v.q);
    });

    this.and1.setChange((v: GateChangeEventArgs) => {
      this.or1.setAValue(v.q);
    });

    this.cin.setChange((e: LogicalInputOutputChangeEventArgs) => {
      this.xor2.setBValue(e.v);
      this.and1.setBValue(e.v);
    });
  }

  private vLine(
    x: number,
    y: number,
    l: number,
    cStart: boolean = false,
    cEnd: boolean = false
  ) {
    this.canvas
      .line(this.x + x, this.y + y, this.x + x, this.y + y + l)
      .stroke({ width: 4 });
    if (cStart) {
      this.canvas.circle(12).move(this.x + x - 6, this.y + y - 6);
    }
    if (cEnd) {
      this.canvas.circle(12).move(this.x + x - 6, this.y + y + l - 6);
    }
  }

  private hLine(
    x: number,
    y: number,
    l: number,
    cStart: boolean = false,
    cEnd: boolean = false
  ) {
    this.canvas
      .line(this.x + x, this.y + y, this.x + x + l, this.y + y)
      .stroke({ width: 4 });
  }
}

(() => {
  let canvas: any = SVG("drawing").size(800, 800);
  let fullAdder: FullAdder = new FullAdder({ canvas: canvas, x: 0, y: 0 });
})();
