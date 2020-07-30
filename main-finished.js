// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

// define Shape constructor

function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
}
// new Ball constructor

function Ball(x, y, velX, velY, exists, color, size) {
  Shape.call(this, x, y, velX, velY, exists);
  this.color = color;
  this.size = 30;
}
// evil circle constructor
function EvilCircle(x, y, exists) {
  Shape.call(this, x, y, 20, 20, exists);
  this.color = "red";
  this.size = 30;
  // para.innerHTML("far fa-angry");
}
function EvilCircle2(x, y, exists) {
  Shape.call(this, x, y, 20, 20, exists);
  this.color = "blue";
  this.size = 30;
}
  Ball.prototype = Object.create(Shape.prototype);
  Object.defineProperty(Ball.prototype, 'constructor', {
    value: Ball,
    enumerable: false,
    writable: true
  });

  EvilCircle.prototype = Object.create(Shape.prototype);
  Object.defineProperty(EvilCircle.prototype, 'constructor', {
    value: EvilCircle,
    enumerable: false,
    writable: true
  });

  EvilCircle2.prototype = Object.create(Shape.prototype);
  Object.defineProperty(EvilCircle2.prototype, 'constructor', {
    value: EvilCircle2,
    enumerable: false,
    writable: true
  });
  // set controls

  EvilCircle.prototype.setControls = function () {
    let _this = this;
    window.onkeydown = function (e) {
      if (e.key === 'a') {
        _this.x -= _this.velX;
      } else if (e.key === 'd') {
        _this.x += _this.velX;
      } else if (e.key === 'w') {
        _this.y -= _this.velY;
      } else if (e.key === 's') {
        _this.y += _this.velY;
      }
    }
  }
  EvilCircle2.prototype.setControls = function () {
    let _this = this;
    window.onkeydown = function (e) {
      if (e.key === 'j') {
        _this.x -= _this.velX;
      } else if (e.key === 'l') {
        _this.x += _this.velX;
      } else if (e.key === 'i') {
        _this.y -= _this.velY;
      } else if (e.key === 'k') {
        _this.y += _this.velY;
      }
    }
  }

  // define ball draw method


  Ball.prototype.draw = function () {
    ctx.font = this.size + "px FontAwesome";
    ctx.fillStyle = this.color;
    ctx.fillText("\uf118", this.x, this.y, this.size, 0);
    ctx.fill();
  };
  // define Evil circle draw method
  EvilCircle.prototype.draw = function () {
    ctx.font = this.size + "px FontAwesome";
    ctx.fillStyle = this.color;
    ctx.fillText("\uf556", this.x, this.y, this.size, 0);
    ctx.fill();
  };
  EvilCircle2.prototype.draw = function () {
    ctx.font = this.size + "px FontAwesome";
    ctx.fillStyle = "blue";
    ctx.fillText("\uf556", this.x, this.y, this.size, 0);
    ctx.fill();
  };

  // define ball update method

  Ball.prototype.update = function () {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  };
  // define EvilCircle update method

  EvilCircle.prototype.update = function () {
    if ((this.x + this.size) >= width) {
      this.x -= (width - 10);
    }

    if ((this.x - this.size) <= 0) {
      this.x = 20;
    }

    if ((this.y + this.size) >= height) {
      this.y -= (height - 10);
    }

    if ((this.y - this.size) <= 0) {
      this.y = 20;
    }
  };
  EvilCircle2.prototype.update = function () {
    if ((this.x + this.size) >= width) {
      this.x -= (width - 10);
    }

    if ((this.x - this.size) <= 0) {
      this.x = 20;
    }

    if ((this.y + this.size) >= height) {
      this.y -= (height - 10);
    }

    if ((this.y - this.size) <= 0) {
      this.y = 20;
    }
  };
  let balls = [];

  // define ball collision detection for color

  Ball.prototype.collisionDetect = function () {
    for (let j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
        }
      }
    }
  };
  // new ball collision detection for deleting ball


  EvilCircle.prototype.collisionDetect = function () {
    for (let j = 0; j < balls.length; j++) {
      if (balls[j].exists) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + balls[j].size) {
          balls[j].exists = false;
          ballCount--;

        }
      }
    }
  };
  EvilCircle2.prototype.collisionDetect = function () {
    for (let j = 0; j < balls.length; j++) {
      if (balls[j].exists) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + balls[j].size) {
          balls[j].exists = false;
          ballCount--;

        }
      }
    }
  };

  // define array to store balls and populate it

  while (balls.length < 50) {
    const size = random(10, 20);
    let ball = new Ball(
      // ball position always drawn at least one ball width
      // away from the adge of the canvas, to avoid drawing errors
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-7, 7),
      random(-7, 7),
      true,
      'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
      size
    );
    balls.push(ball);
    // ballCount++;

  };

  let evil = new EvilCircle(35, 35, true);
  let evil2 = new EvilCircle2(75, 75, true);
  // define loop that keeps drawing the scene constantly

  let ballCount = balls.length;

  function loop() {
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0, 0, width, height);

    if (balls.length > 0) {
      for (let i = 0; i < balls.length; i++) {
        if (balls[i].exists) {
          balls[i].draw();
          balls[i].update();
          balls[i].collisionDetect();
        }
      }
    }
    requestAnimationFrame(loop);
    evil.setControls();
    evil.draw();
    evil.update();
    evil.collisionDetect();
    // evil2.setControls();
    // evil2.draw();
    // evil2.update();
    // evil2.collisionDetect();
    document.getElementById("counter").textContent = 'Ball count: ' + ballCount;
  }
  loop();