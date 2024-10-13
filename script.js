const path = 'resources/player.png'
// Create the application helper and add its render target to the page
const app = new PIXI.Application();
await app.init({ width: window.innerWidth, height: window.innerHeight })
document.body.appendChild(app.canvas);

// Create the sprite and add it to the stage
await PIXI.Assets.load(path);
let player = PIXI.Sprite.from(path);

player.anchor.set(0.5);
app.stage.addChild(player);
player.x = window.innerWidth / 2;
player.y = app.screen.height / 2;
// Add a ticker callback to move the sprite back and forth
let elapsed = 0.0;

document.addEventListener("pointerdown", clickmoment);

app.ticker.add((ticker) => {
  elapsed += ticker.deltaTime;

  player.rotation += 0.1 * ticker.deltaTime;
});

function clickmoment(e){
  console.log('test')
}