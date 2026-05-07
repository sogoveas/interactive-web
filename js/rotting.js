let imgs = [];
let basePositions = [];
let currentPositions = [];

function preload() {
  imgs[0] = loadImage("images/stage1.png");
  imgs[1] = loadImage("images/stage2.png");
  imgs[2] = loadImage("images/stage3.png");
  imgs[3] = loadImage("images/stage4.png");
  imgs[4] = loadImage("images/stage5.png");
  imgs[5] = loadImage("images/stage6.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  setupGrid();
}

function setupGrid() {
  basePositions = [];
  currentPositions = [];

  let cols = 3;
  let rows = 2;

  let spacingX = width / (cols + 1);
  let spacingY = height / (rows + 1);

  for (let y = 1; y <= rows; y++) {
    for (let x = 1; x <= cols; x++) {
      let pos = createVector(x * spacingX, y * spacingY);
      basePositions.push(pos);
      currentPositions.push(pos.copy());
    }
  }
}

function getSize(img) {
  let maxW = width / 5;
  let maxH = height / 4;

  let ratio = img.width / img.height;
  let w, h;

  if (ratio > 1) {
    w = maxW;
    h = maxW / ratio;
  } else {
    h = maxH;
    w = maxH * ratio;
  }

  return { w, h };
}

function draw() {
  background("#FDF2F2");

  let center = createVector(width / 2, height / 2);

  let dToCenter = dist(mouseX, mouseY, center.x, center.y);
  let influence = map(dToCenter, 0, width / 2, 1, 0, true);

  for (let i = 0; i < imgs.length; i++) {
    let base = basePositions[i];
    let current = currentPositions[i];
    let img = imgs[i];

    let size = getSize(img);

    let targetX = lerp(base.x, center.x, influence);
    let targetY = lerp(base.y, center.y, influence);

    let angle = (i / imgs.length) * TWO_PI;
    let spread = 60 * influence;

    targetX += cos(angle + frameCount * 0.01) * spread;
    targetY += sin(angle + frameCount * 0.01) * spread;

    current.x = lerp(current.x, targetX, 0.08);
    current.y = lerp(current.y, targetY, 0.08);

    push();
    translate(current.x, current.y);
    image(img, 0, 0, size.w, size.h);
    pop();
  }

  push();
  textAlign(CENTER, CENTER);
  textFont("Mynerve");
  textSize(56);
  fill("#3933FA");
  text("watch me rot", width / 2, height / 2);
  pop();
}

function mousePressed() {
  for (let i = 0; i < imgs.length; i++) {
    let size = getSize(imgs[i]);
    let pos = currentPositions[i];

    if (
      mouseX > pos.x - size.w / 2 &&
      mouseX < pos.x + size.w / 2 &&
      mouseY > pos.y - size.h / 2 &&
      mouseY < pos.y + size.h / 2
    ) {
      window.location.href = "jam-spread.html";
      return;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setupGrid();
}