var flg_auto_camera = true;
var timer;
var pos = {
  x: 0,
  y: 0,
  z: 1000,
  target: {
    x: 0,
    y: 0,
    z: 1000,
  },
  is_moving: false,
};
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  ortho(-width / 2, width / 2, height / 2, -height / 2, -10000, 10000);
  camera = createCamera();
  //   createEasyCam();
  camera.setPosition(pos.x, pos.y, pos.z);

  timer = setInterval(function () {
    if (parseInt(random(5)) == 0) {
      pos.is_moving = true;
      pos.target.x = 0;
      pos.target.y = 0;
      pos.target.z = 1000;
    } else {
      pos.is_moving = true;
      pos.target.x = random(-1000, 1000);
      pos.target.y = random(-1000, 1000);
      pos.target.z = random(500, 1000);
    }
  }, 3000);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ortho(-width / 2, width / 2, height / 2, -height / 2, -10000, 10000);
}

function keyPressed() {
  if (key == " ") {
    flg_auto_camera = !flg_auto_camera;
    if (!flg_auto_camera) {
      clearInterval(timer);
      pos.is_moving = true;
      pos.target.x = 0;
      pos.target.y = 0;
      pos.target.z = 1000;
    }
    else {
      timer = setInterval(function () {
        if (parseInt(random(5)) == 0) {
          pos.is_moving = true;
          pos.target.x = 0;
          pos.target.y = 0;
          pos.target.z = 1000;
        } else {
          pos.is_moving = true;
          pos.target.x = random(-1000, 1000);
          pos.target.y = random(-1000, 1000);
          pos.target.z = random(500, 1000);
        }
      }, 3000);
    }
  }

}
function draw() {


  if (pos.is_moving) {
    camera.setPosition(pos.x, pos.y, pos.z);
    pos.x = pos.x + (pos.target.x - pos.x) / 100;
    pos.y = pos.y + (pos.target.y - pos.y) / 100;
    pos.z = pos.z + (pos.target.z - pos.z) / 100;
    if (
      pos.target.x == pos.x &&
      pos.target.y == pos.y &&
      pos.target.z == pos.z
    ) {
      pos.is_moving = false;
    }
  }


  background(0);



  //  orbitControl();
  camera.lookAt(0, 0, 0);


  let dirX = (mouseX / width - 0.5) * 2;
  let dirY = (mouseY / height - 0.5) * 2;
  ambientLight(120); // white light
  directionalLight(255, 255, 255, 0.9, -0.9, -1);

  push();
  translate(0, 0, 0);

  noStroke();
  sphere(80);
  pop();

  push();
  translate(-140, 140, -140);
  noStroke();
  sphere(100 / 2);
  pop();

  push();
  translate(-140, 0, 100);
  noStroke();
  box(110, 160, 100);
  pop();

  push();
  translate(100, 0, -140);
  noStroke();
  box(110, 160, 100);
  pop();

}
