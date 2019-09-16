declare var SVG: any;

interface LogicalInputSettings {
  canvas: any;
  x: number;
  y: number;
  value: boolean;
  clickable?: boolean;
  change?: LogicalInputOutputChangeEvent;
  name?: string;
  showName?: ShowName;
}

enum ShowName {
  hidden,
  left,
  right,
  top,
  bottom
}

interface LogicalInputOutputChangeEventArgs {
  v: boolean;
  logicalInputOutput: LogicalInputOutput;
}

type LogicalInputOutputChangeEvent = (
  args: LogicalInputOutputChangeEventArgs
) => void;

class LogicalInputOutput {
  private x: number;
  private y: number;
  private canvas: any;
  private value: boolean;
  private box: any;
  private text: any;
  private change: LogicalInputOutputChangeEvent;
  private clickable: boolean;
  private name: string;
  private showName: ShowName;

  constructor(settings: LogicalInputSettings) {
    if (!settings.change) settings.change = () => {};
    if (!settings.clickable) settings.clickable = false;
    if (!settings.name) settings.name = "";
    if (!settings.showName) settings.showName = ShowName.hidden;
    this.x = settings.x;
    this.y = settings.y;
    this.value = settings.value;
    this.change = settings.change;
    this.clickable = settings.clickable;
    this.name = settings.name;
    this.showName = settings.showName;
    this.canvas = settings.canvas;
  }
  draw() {
    this.box = this.canvas
      .rect(20, 20)
      .move(this.x, this.y)
      .stroke({ width: 4 });

    let t = this.value ? "1" : "0";
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

    let self = this;
    if (this.clickable) {
      this.box.on("click", function() {
        self.value = !self.value;
        self.updateText();
        self.change({ v: self.getValue(), logicalInputOutput: self });
      });
    }
  }

  updateText() {
    this.text.text(this.value ? "1" : "0");
    this.box.fill(this.value ? "green" : "red");
    $("text tspan").addClass("svgText");
  }

  getValue() {
    return this.value;
  }

  setValue(value: boolean) {
    this.value = value;
    this.updateText();
  }

  setChange(change: LogicalInputOutputChangeEvent) {
    this.change = change;
  }
}

interface GateSettings {
  canvas: any;
  gateType: string;
  x: number;
  y: number;
  showText?: boolean;
  change?: GateChangeEvent;
  readOnly?: boolean;
  aText?: string;
  bText?: string;
  qText?: string;
  showName?: boolean;
}

interface GateChangeEventArgs {
  a: boolean;
  b: boolean;
  gateType: string;
  gate: Gate;
  q: boolean;
}

type GateChangeEvent = (args: GateChangeEventArgs) => void;

class Gate {
  private image: any;
  private l1: LogicalInputOutput;
  private l2: LogicalInputOutput;
  private l3: LogicalInputOutput;
  private change: GateChangeEvent;
  private self: any;
  private canvas: any;
  private gateType: string;
  private x: number;
  private y: number;
  private showText: boolean;
  private readOnly: boolean;
  private aText: string;
  private bText: string;
  private qText: string;

  setAValue(value: boolean) {
    this.l1.setValue(value);
    this.calc();
  }

  setChange(change: GateChangeEvent) {
    this.change = change;
  }

  setBValue(value: boolean) {
    this.l2.setValue(value);
    this.calc();
  }

  constructor(settings: GateSettings) {
    if (!settings.showText) settings.showText = true;
    if (!settings.change) settings.change = () => {};
    if (!settings.readOnly) settings.readOnly = false;
    if (!settings.aText && settings.aText !== "") settings.aText = "A";
    if (!settings.bText && settings.bText !== "") settings.bText = "B";
    if (!settings.qText && settings.qText !== "") settings.qText = "Q";

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

    let settingsL: LogicalInputSettings = {
      canvas: this.canvas,
      x: this.x - 20,
      y: this.y + 69,
      clickable: !this.readOnly,
      value: false,
      change: () => this.calc(),
      name: this.aText,
      showName: ShowName.left
    };
    this.l1 = new LogicalInputOutput(settingsL);
    if (this.gateType === "NOT") {
      settingsL.y = this.y + 90;
      this.l1 = new LogicalInputOutput(settingsL);
    }
    settingsL = {
      canvas: this.canvas,
      x: this.x - 20,
      y: this.y + 109,
      clickable: !this.readOnly,
      value: false,
      change: () => this.calc(),
      name: this.bText,
      showName: ShowName.left
    };
    this.l2 = new LogicalInputOutput(settingsL);

    settingsL = {
      canvas: this.canvas,
      x: this.x + 200,
      y: this.y + 90,
      clickable: false,
      value: false,
      change: () => this.calc(),
      name: this.qText,
      showName: ShowName.right
    };
    this.l3 = new LogicalInputOutput(settingsL);
    this.self = this;
    this.change = settings.change;
  }

  draw() {
    if (this.gateType === "NOT")
      this.image = this.canvas
        .image("images/1920px-NOT_ANSI.svg.png", 200, 200)
        .move(this.x, this.y);
    if (this.gateType === "XOR")
      this.image = this.canvas
        .image("images/1920px-XOR_ANSI.svg.png", 200, 200)
        .move(this.x, this.y);
    if (this.gateType === "AND")
      this.image = this.canvas
        .image("images/1920px-AND_ANSI.svg.png", 200, 200)
        .move(this.x, this.y);
    if (this.gateType === "OR")
      this.image = this.canvas
        .image("images/1920px-OR_ANSI.svg.png", 200, 200)
        .move(this.x, this.y);
    if (this.gateType === "NAND")
      this.image = this.canvas
        .image("images/1920px-NAND_ANSI.svg.png", 200, 200)
        .move(this.x, this.y);
    if (this.gateType === "NOR")
      this.image = this.canvas
        .image("images/1920px-NOR_ANSI.svg.png", 200, 200)
        .move(this.x, this.y);
    if (this.gateType === "XNOR")
      this.image = this.canvas
        .image("images/1920px-XNOR_ANSI.svg.png", 200, 200)
        .move(this.x, this.y);

    this.l1.draw();
    if (this.gateType !== "NOT") this.l2.draw();
    this.l3.draw();

    if (this.showText) {
      let t = this.gateType;
      this.canvas
        .text(t)
        .font({ size: 14, weight: "bold" })
        .move(this.x + 80, this.y + 90);
    }

    this.calc();
  }

  calc() {
    let v = true;
    if (this.gateType === "XOR")
      v = this.myXOR(this.l1.getValue(), this.l2.getValue());
    if (this.gateType === "XNOR")
      v = !this.myXOR(this.l1.getValue(), this.l2.getValue());
    if (this.gateType === "AND") v = this.l1.getValue() && this.l2.getValue();
    if (this.gateType === "NAND")
      v = !(this.l1.getValue() && this.l2.getValue());
    if (this.gateType === "OR") v = this.l1.getValue() || this.l2.getValue();
    if (this.gateType === "NOR")
      v = !(this.l1.getValue() || this.l2.getValue());
    if (this.gateType === "NOT") v = !this.l1.getValue();
    this.l3.setValue(v);
    this.change({
      gateType: this.gateType,
      a: this.l1.getValue(),
      b: this.l2.getValue(),
      q: v,
      gate: this
    });
  }

  private myXOR(a: boolean, b: boolean) {
    return (a || b) && !(a && b);
  }
}
