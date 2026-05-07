let img;
let knife;
let trail = [];
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

function draw() {
  fill(253, 242, 242, 20);
  noStroke();
  rect(0, 0, width, height);

  let scaleFactor = min(width / img.width, height / img.height);
  let w = img.width * scaleFactor;
  let h = img.height * scaleFactor;
  image(img, width / 2, height / 2, w, h);

  if (mouseIsPressed) {
    trail.push({ x: mouseX, y: mouseY });
  }

  noFill();
  stroke('#800606');
  strokeWeight(14);
  strokeCap(ROUND);

  beginShape();
  for (let i = 0; i < trail.length; i++) {
    curveVertex(trail[i].x, trail[i].y);
  }
  endShape();

  fill('#3933FA');
  noStroke();
  textSize(65);
  textAlign(LEFT, TOP);
  text("repurpose me", 20, 20);

  textAlign(RIGHT, BOTTOM);
  text("spread me", width - 20, height - 20);

  image(knife, mouseX, mouseY, 70, 70);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}