const sizes: { width: number; height: number } = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const buttonData = {
  data: [
    { textLabel: "UP", dy: 1 },
    { textLabel: "DOWN", dy: -1 },
    { textLabel: "LEFT", dx: -1 },
    { textLabel: "RIGHT", dx: 1 },
  ],
  buttonRect: { width: 150, height: 150, borderWidth: 2, dx: 10, dy: 10 },
  buttonStyle: {
    backgroundColor: 0x00ff00,
    borderColor: 0x0000ff,
  },
  textStyle: { fontSize: 36, fill: 0xffffff },
};

const lightAnimationData = [
  { ka: 0.5, kx1: 2, kx2: 0, ky1: 1.5, ky2: 0, kz1: 2, kz2: 0, x: 0, y: 0, z: 0 },
  { ka: -0.32, kx1: 2.5, kx2: 0, ky1: 2, ky2: 2.5, kz1: 2.5, kz2: 0, x: 0, y: 0, z: 1 },
  { ka: -0.18, kx1: 3.5, kx2: 0.32, ky1: 5, ky2: 2, kz1: 3.5, kz2: 0.5, x: 1, y: 1, z: 1 },
];

export { sizes, buttonData, lightAnimationData };
