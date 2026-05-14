let img;
let knife;
let strokes = [];
let currentStroke = [];
let font;

function preload() {
  img = loadImage("images/jambo.png");
  knife = loadImage("images/butterknife.png");
  font = loadFont("fonts/Mynerve-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  textFont(font);
  noCursor();
  background('#FDF2F2');
}

function mousePressed() {
  currentStroke = [];
}

function mouseReleased() {
  if (currentStroke.length > 0) {
    strokes.push([...currentStroke]);
    currentStroke = [];
  }
}

function draw() {
  fill(253, 242, 242, 20);
  noStroke();
  rect(0, 0, width, height);

  let scaleFactor = min(width / img.width, height / img.height);
  let w = img.width * scaleFactor;
  let h = img.height * scaleFactor;
  image(img, width / 2, height / 2, w, h);

  if (mouseIsPressed && (mouseX !== pmouseX || mouseY !== pmouseY)) {
    currentStroke.push({
      x: mouseX,
      y: mouseY,
      px: pmouseX,
      py: pmouseY,
      speed: dist(mouseX, mouseY, pmouseX, pmouseY)
    });
  }

  let allStrokes = [...strokes, currentStroke];

  for (let s = 0; s < allStrokes.length; s++) {
    let stroke_ = allStrokes[s];

    for (let i = 0; i < stroke_.length; i++) {
      let p = stroke_[i];

      let baseWeight = map(i, 0, stroke_.length - 1, 22, 6);
      let wobble = sin(i * 0.4) * map(p.speed, 0, 30, 0.5, 2.5);
      let sw = max(2, baseWeight + wobble);

      let r = map(i, 0, stroke_.length - 1, 140, 100);
      let g = map(i, 0, stroke_.length - 1, 10, 5);
      let b = map(i, 0, stroke_.length - 1, 20, 40);
      let a = map(i, 0, stroke_.length - 1, 230, 140);

      strokeCap(ROUND);

      if (i > 1) {
        let hi_a = map(i, 0, stroke_.length - 1, 80, 0);
        stroke(200, 60, 70, hi_a);
        strokeWeight(max(1, sw * 0.25));
        let prev = stroke_[i - 1];
        let offX = -(p.y - prev.y) * 0.18;
        let offY =  (p.x - prev.x) * 0.18;
        line(prev.x + offX, prev.y + offY, p.x + offX, p.y + offY);
      }

      stroke(r, g, b, a);
      strokeWeight(sw);
      if (i > 0) {
        let prev = stroke_[i - 1];
        line(prev.x, prev.y, p.x, p.y);
      }

      if (i % 9 === 0 && i > 0) {
        noStroke();
        fill(80, 15, 10, map(i, 0, stroke_.length - 1, 180, 80));
        let seedOffX = random(-sw * 0.4, sw * 0.4);
        let seedOffY = random(-sw * 0.4, sw * 0.4);
        ellipse(p.x + seedOffX, p.y + seedOffY, random(2, 4), random(3, 5));
      }
    }

    if (stroke_.length > 4) {
      let tip = stroke_[stroke_.length - 1];
      stroke(110, 8, 18, 180);
      strokeWeight(4);
      strokeCap(ROUND);
      let dripLen = map(stroke_.length, 0, 200, 0, 28);
      line(tip.x, tip.y, tip.x + random(-1, 1), tip.y + dripLen);
    }
  }

  noStroke();
  fill('#3933FA');
  textSize(65);
  textAlign(LEFT, TOP);
  text("repurpose me", 20, 20);

  textAlign(RIGHT, BOTTOM);
  text("spread me", width - 20, height - 20);

  image(knife, mouseX, mouseY, 70, 70);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background('#FDF2F2');
}