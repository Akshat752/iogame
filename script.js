const path = 'resources/player.png';
const app = new PIXI.Application();
await app.init({ resizeTo: window });
globalThis.__PIXI_APP__ = app;
document.body.appendChild(app.canvas);

await PIXI.Assets.load("resources/tree.png");
await PIXI.Assets.load(path);
let player = PIXI.Sprite.from(path);
player.anchor.set(0.5);
app.stage.addChild(player);
app.ticker.add(gameLoop);
player.x = window.innerWidth / 2;
player.y = app.screen.height / 2;



let keys = {};
let zoomLevel = 1;
app.stage.scale.set(zoomLevel);

addRandomTrees(9999);

app.stage.position.set((window.innerWidth / 2) - (player.x * zoomLevel), (window.innerHeight / 2) - (player.y * zoomLevel));

window.addEventListener("wheel", (e) => {
    const zoomIntensity = 0.1;
  
    if (e.deltaY > 0) {
      zoomLevel = Math.max(0.09, zoomLevel - zoomIntensity);
    } 
    else {
      zoomLevel+=zoomIntensity
    }
  
    app.stage.scale.set(zoomLevel);
  
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
  

    let shiftX = centerX * (1 - zoomLevel);
    let shiftY = centerY * (1 - zoomLevel);
  
    app.stage.position.set(shiftX, shiftY);
  });
  

function addRandomTrees(numTrees) {
    const zoomOutLevel = 0.09;
  
    // Calculate the top-left corner's coordinates at maximum zoom-out
    const topLeftX = (window.innerWidth / 2) * (1 - 1 / zoomOutLevel);
    const topLeftY = (window.innerHeight / 2) * (1 - 1 / zoomOutLevel);
  
    // Calculate the world width and height based on max zoom out
    const worldWidth = window.innerWidth / zoomOutLevel;
    const worldHeight = window.innerHeight / zoomOutLevel;
  
    // Spawn trees within this extended area
    for (let i = 0; i < numTrees; i++) {
      let tree = PIXI.Sprite.from("resources/tree.png");

      tree.x = topLeftX + Math.random() * worldWidth;  
      tree.y = topLeftY + Math.random() * worldHeight;  
      app.stage.addChild(tree);
    }
  }
  

function gameLoop() {
    const speed = 50;
  if (keys[87]) {
    player.y -= speed;
  }
  if (keys[83]) {
    player.y += speed;
  }
  if (keys[65]) {
    player.x -= speed;
  }
  if (keys[68]) {
    player.x += speed;
  }


}

window.addEventListener("keydown", keysDown);
window.addEventListener("keyup", keysUp);

function keysDown(e) {
  keys[e.keyCode] = true;
}

function keysUp(e) {
  keys[e.keyCode] = false;
}
