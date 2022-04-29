import { Container, Graphics, Text, TextStyle } from "pixi.js";

import "@pixi/interaction";

class Button {
  render: Container;
  readonly text: string;
  readonly buttonStyle: { backgroundColor: number; borderColor: number };
  readonly textStyle: TextStyle;
  readonly rect: { width: number; height: number; borderWidth: number };

  constructor(
    text: string,
    buttonStyle: { backgroundColor: number; borderColor: number },
    textStyle: TextStyle,
    rect: { width: number; height: number; borderWidth: number }
  ) {
    this.text = text;
    this.buttonStyle = buttonStyle;
    this.textStyle = textStyle;
    this.rect = rect;
  }

  resize(width: number, height: number, x: number, y: number) {
    this.render.width = width;
    this.render.height = height;
    this.render.position.set(x, y);
  }

  draw(): void {
    const { backgroundColor, borderColor } = this.buttonStyle;
    const { width, height, borderWidth } = this.rect;

    if (this.render) {
      return;
    }

    this.render = new Container();

    const graphics = new Graphics();
    graphics.beginFill(backgroundColor);
    graphics.lineStyle(borderWidth, borderColor);
    graphics.drawRect(0, 0, width - borderWidth, height - borderWidth);
    graphics.endFill();
    this.render.addChild(graphics);

    const text = new Text(this.text, this.textStyle);
    text.position.set((graphics.width - text.width) * 0.5, (graphics.height - text.height) * 0.5);
    this.render.addChild(text);
  }

  get width(): number {
    return this.render.width;
  }

  get height(): number {
    return this.render.height;
  }
}

export default Button;
