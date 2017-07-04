var app = {};

function startApp() {
  app.canvas = document.getElementById('canvas');
  app.context = canvas.getContext('2d');

  setGame();

  window.addEventListener('keydown', myKeyDown);
  window.addEventListener('keyup', myKeyUp);
  app.lastTime = window.performance.now();
  window.requestAnimationFrame(frameUpdate);
}

function setGame() {
  app.bullets = [];
  app.enemies = [];

  spawnHero();
  spawnEnemies();
}

function spawnHero() {
  app.hero = {
    position: {
      x: app.canvas.width / 2,
      y: app.canvas.height - 20
    },
    size: {
      height: 50,
      width: 30
    },
    color: "#FFFF00",
    drawMe: function(context) {
      drawObject(context, this);
    },
    move: function () {
      if(this.moveLeft) {
        this.position.x -= 10;
      }
      if(this.moveRight) {
        this.position.x += 10;
      }
    }
  }
}

function frameUpdate(timeStamp) {
    window.requestAnimationFrame(frameUpdate);
    var dt = (timeStamp - app.lastTime) / 1000;
    app.lastTime = timeStamp;
    app.hero.move();
    app.bullets.forEach(function (bullet) {
      bullet.move(dt);
    })
    app.enemies.forEach(function (enemy) {
      enemy.move(dt);
    })
    drawScene();
}

function drawScene() {
  app.context.fillStyle = '#000020';
  app.context.fillRect(0, 0, app.canvas.width, app.canvas.height);
  app.hero.drawMe(app.context);
  app.bullets.forEach(function (bullet) {
    bullet.drawMe(app.context);
  })
  app.enemies.forEach(function (enemy) {
    enemy.drawMe(app.context);
  })
}

function myKeyDown(e) {
  switch(e.keyCode) {
    case 37:
    case 65:
      leftKeyDownHandler();
      break;
    case 39:
    case 68:
      rightKeyDownHandler()
      break;
    case 38:
    case 87:
      fireKeyHandler();
      break;
  }
}

function leftKeyDownHandler() {
  app.hero.moveLeft = true;
}

function rightKeyDownHandler() {
  app.hero.moveRight = true;
}

function fireKeyHandler() {
  app.bullets.push(new bullet());
}

function bullet() {
  this.position = {
    x: app.hero.position.x,
    y: app.hero.position.y - (app.hero.size.height/2)
  };
  this.speed = 400;
  this.size = {height: 10, width: 10};
  this.color = "#FF0000";
  this.drawMe = function(context) {
    drawObject(context, this);
  };
  this.move = function(dt) {
    this.position.y -= this.speed * dt;
  }
}

function myKeyUp(e) {
  switch(e.keyCode) {
    case 37:
    case 65:
      leftKeyUpHandler();
      break;
    case 39:
    case 68:
      rightKeyUpHandler();
      break;
  }
}

function leftKeyUpHandler() {
  app.hero.moveLeft = false;
}

function rightKeyUpHandler() {
  app.hero.moveRight = false;
}

function spawnEnemies() {
  for(var i =0; i<20; i++) {
    spawnEnemy();
  }
}

function spawnEnemy() {
  app.enemies.push(new enemy());
}

function enemy() {
  this.position = {
    x: Math.random() * app.canvas.width,
    y: Math.random() * -app.canvas.height * 25
  };
  this.size = {height: 20, width: 20};
  this.color = "#FFFFFF";
  this.speed = 20 * 2.5 * .05;
  this.move = function (dt) {
    this.position.y+=this.speed * dt;
  }
  this.drawMe = function (context) {
    drawObject(context, this);
  }
}
