const path = 'resources/player.png';
const app = new PIXI.Application();
await app.init({ resizeTo: window });
document.body.appendChild(app.canvas);

await PIXI.Assets.load("resources/tree.png");
await PIXI.Assets.load(path);
let player = PIXI.Sprite.from(path);
player.anchor.set(0.5);
app.stage.addChild(player);
app.ticker.add(gameLoop);
player.x = window.innerWidth / 2;
player.y = app.screen.height / 2;

addRandomTrees(999);

let keys = {};
let zoomLevel = 1;
app.stage.scale.set(zoomLevel);

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
  const worldWidth = 4000;
  const worldHeight = 4000;

  for (let i = 0; i < numTrees; i++) {
    let tree = PIXI.Sprite.from("resources/tree.png");
    tree.anchor.set(0.5);
    tree.x = Math.random() * (worldWidth + 1000) - 999;
    tree.y = Math.random() * (worldHeight + 1000) - 1000;
    app.stage.addChild(tree);
    console.log(`Tree ${i}: X=${tree.x}, Y=${tree.y}`);
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


//   console.log(player.y);
}

window.addEventListener("keydown", keysDown);
window.addEventListener("keyup", keysUp);

function keysDown(e) {
  keys[e.keyCode] = true;
}

function keysUp(e) {
  keys[e.keyCode] = false;
}
