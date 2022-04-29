import { buttonData } from "./config";
import Button from "../objects/2d/Button";
import Label from "../objects/2d/Label";

const { buttonRect } = buttonData;

export default function updateObjectsPosition(
  width: number,
  height: number,
  factor: number,
  objects: { [key: string]: any }
): void {
  const { label, controlButtons, jump, lightsOff } = objects;

  for (const [i, button] of controlButtons.entries()) {
    (button as Button).resize(
      buttonRect.width * factor,
      buttonRect.height * factor,
      (buttonRect.dx + (buttonRect.width + 10) * i) * factor,
      height - (buttonRect.height + buttonRect.dy) * factor
    );
  }

  (jump as Button).resize(
    buttonRect.width * factor,
    buttonRect.height * factor,
    width - (buttonRect.width + 10) * factor,
    height - (buttonRect.height + buttonRect.dy) * factor
  );

  (lightsOff as Button).resize(
    buttonRect.width * factor,
    buttonRect.height * factor,
    width - (buttonRect.width + 10) * factor,
    height - (buttonRect.height * 2 + 10 + buttonRect.dy) * factor
  );

  (label as Label).resize((width - label.width) * 0.5, (height - label.height) * 0.5);
}
