describe("game", function() {

  beforeEach(function () {
    app.canvas = {width: 100, height: 200};
    setGame();
  })

  it("should spawn hero", function() {
    expect(app.hero.position.x).toEqual(50);
    expect(app.hero.position.y).toEqual(180);
    expect(app.hero.size.width).toEqual(30);
    expect(app.hero.size.height).toEqual(50);
    expect(app.hero.color).toEqual("#FFFF00");
  });

  it("should detect left keydown", function() {
    myKeyDown({keyCode: 37});
    expect(app.hero.moveLeft).toEqual(true);
  });

  it("should detect right keydown", function() {
    myKeyDown({keyCode: 39});
    expect(app.hero.moveRight).toEqual(true);
  });

  it("should change position when move and leftkey down", function() {
    leftKeyDownHandler();
    app.hero.move();
    expect(app.hero.position.x).toEqual(40);
  });

  it("should change position when move and rightkey down", function() {
    rightKeyDownHandler();
    app.hero.move();
    expect(app.hero.position.x).toEqual(60);
  });

  it("should stop moving left when left keyup", function() {
    leftKeyDownHandler();
    leftKeyUpHandler();
    expect(app.hero.moveLeft).toEqual(false);
  });

  it("should stop moving right when right keyup", function() {
    rightKeyDownHandler();
    rightKeyUpHandler();
    expect(app.hero.moveRight).toEqual(false);
  });

  it("should add a bullet when firekey", function() {
    fireKeyHandler();
    expect(app.bullets.length).toEqual(1);
  });

  it("should add a bullet when firekey in front of hero", function() {
    fireKeyHandler();
    expect(app.bullets[0].position.x).toEqual(50);
    expect(app.bullets[0].position.y).toEqual(155);
    expect(app.bullets[0].size.width).toEqual(10);
    expect(app.bullets[0].size.height).toEqual(10);
    expect(app.bullets[0].color).toEqual("#FF0000");
  });

  it("should add 20 enemies at the start of the game", function() {
    expect(app.enemies.length).toEqual(20);
  });

  it("should spawn an enemy", function() {
    expect(app.enemies[0].position.x).toBeDefined();
    expect(app.enemies[0].position.y).toBeDefined();
    expect(app.enemies[0].size.width).toEqual(20);
    expect(app.enemies[0].size.height).toEqual(20);
    expect(app.enemies[0].color).toEqual("#FFFFFF");
  });
})
