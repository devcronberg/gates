interface HalfAdderSettings {
  x: number;
  y: number;
  canvas: any;
}

class HalfAdder {
  private xor: Gate;
  private and: Gate;
  private canvas: any;
  private x: number;
  private y: number;

  constructor(settings: HalfAdderSettings) {
    this.canvas = settings.canvas;
    this.x = settings.x;
    this.y = settings.y;

    this.and = new Gate({
      canvas: this.canvas,
      gateType: "AND",
      x: this.x + 50,
      y: this.y + 150,
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
      y: this.y + 50,
      change: (d: any) => {
        this.and.setAValue(d.a);
        this.and.setBValue(d.b);
      }
    });
    this.xor.draw();

    this.canvas.line(this.x + 65, this.y + 130, this.x + 65, this.y + 230).stroke({ width: 4 });
    this.canvas.line(this.x + 80, this.y + 170, this.x + 80, this.y + 270).stroke({ width: 4 });
    this.canvas.circle(12).move(this.x + 59, this.y + 124);
    this.canvas.circle(12).move(this.x + 59, this.y + 224);
    this.canvas.circle(12).move(this.x + 74, this.y + 164);
    this.canvas.circle(12).move(this.x + 74, this.y + 264);
  }
}

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

  private canvas: any;
  private x: number;
  private y: number;

  constructor(settings: FullAdderSettings) {
    this.canvas = settings.canvas;
    this.x = settings.x;
    this.y = settings.y;

    this.xor1 = new Gate({
      canvas: this.canvas,
      gateType: "XOR",
      x: this.x + 50,
      y: this.y + 50,
      qText: ""
    });
    this.xor1.draw();

    this.xor2 = new Gate({
      canvas: this.canvas,
      gateType: "XOR",
      x: this.x + 200,
      y: this.y + 150,
      qText: "Q"
    });
    this.xor2.draw();

    this.and1 = new Gate({
      canvas: this.canvas,
      gateType: "AND",
      x: this.x + 200,
      y: this.y + 250,
      qText: ""
    });
    this.and1.draw();

    this.and2 = new Gate({
      canvas: this.canvas,
      gateType: "AND",
      x: this.x + 200,
      y: this.y + 350,
      qText: ""
    });
    this.and2.draw();

    this.or1 = new Gate({
      canvas: this.canvas,
      gateType: "OR",
      x: this.x + 380,
      y: this.y + 300,
      qText: "C",
      aText: "",
      bText: ""
    });
    this.or1.draw();
  }
}

(() => {
  let canvas: any = SVG("drawing").size(800, 800);
  //let halfAdder: HalfAdder = new HalfAdder({ canvas: canvas, x: 10, y: 10 });
  let fullAdder: FullAdder = new FullAdder({ canvas: canvas, x: 10, y: 10 });
})();
