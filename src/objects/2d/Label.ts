import { Text, TextStyle } from "pixi.js";

class Label {
  render: Text;
  readonly text: string;
  readonly style: TextStyle;

  constructor(text: string, textStyle: TextStyle) {
    this.text = text;
    this.style = textStyle;
  }

  resize(x: number, y: number) {
    this.render.position.set(x, y);
  }

  draw(): void {
    this.render = this.render ?? new Text(this.text, this.style);
  }

  get width(): number {
    return this.render.width;
  }

  get height(): number {
    return this.render.height;
  }
}

export default Label;
