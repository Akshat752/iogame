const app = new PIXI.Application();
await app.init({ resizeTo: window });
globalThis.__PIXI_APP__ = app;
document.body.appendChild(app.canvas);

// Load assets

await PIXI.Assets.load(["resources/dirttile.jpeg", 'resources/player.png']);

// Total Map dimensions
const MAP_WIDTH = 3000; 
const MAP_HEIGHT = 3000; 

// Tile grid size
const gridSize = 60;

// Create the container for the dirt tiles
const dirtContainer = new PIXI.Container();
app.stage.addChild(dirtContainer);

// Add the player sprite (fixed starting point at center)
const player = PIXI.Sprite.from('resources/player.png');
player.anchor.set(0.5);
player.scale.set(0.5);
player.x = app.screen.width / 2;
player.y = app.screen.height / 2;
app.stage.addChild(player);

let keys = {};

// Create text to display coordinates
const coordinatesText = new PIXI.Text("(x, y)", {
    fontSize: 24,
    fill: "#ffffff",
    fontFamily: "Arial",
});
coordinatesText.x = 10; // Fixed position on the screen
coordinatesText.y = 10;
app.stage.addChild(coordinatesText);

// Function to create a grid of dirt tiles
function addGridDirt() {
    const cols = Math.ceil(MAP_WIDTH / gridSize);
    const rows = Math.ceil(MAP_HEIGHT / gridSize);

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let dirtTile = PIXI.Sprite.from("resources/dirttile.jpeg");
            dirtTile.x = col * gridSize;
            dirtTile.y = row * gridSize;
            dirtContainer.addChild(dirtTile);
        }
    }
}

// Initialize the grid with tiles
addGridDirt();

// Center the dirt container so the player starts in the middle of the map
dirtContainer.x = -(MAP_WIDTH / 2 - app.screen.width / 2);
dirtContainer.y = -(MAP_HEIGHT / 2 - app.screen.height / 2);

// Game loop for movement with extended player bounds
function gameLoop(delta) {
    const speed = 5;

    const maxOffsetX = MAP_WIDTH - app.screen.width;
    const maxOffsetY = MAP_HEIGHT - app.screen.height;

    if (keys['a'] || keys['ArrowLeft']) {
        if (dirtContainer.x + speed > 0) {
            if(player.x - speed - player.width/2 > 0)
                player.x -= speed; 
        } else {
            if(player.x > app.screen.width/2)
                player.x -= speed;
            else
                dirtContainer.x += speed;
        }
    }
    if (keys['d'] || keys['ArrowRight']) {
        if (dirtContainer.x - speed < -maxOffsetX) {
            if(player.x + speed + player.width/2 < app.screen.width)
                player.x += speed;
        } else {
            if(player.x < app.screen.width/2)
                player.x += speed;
            else
                dirtContainer.x -= speed;
        }
    }

    if (keys['w'] || keys['ArrowUp']) {
        if (dirtContainer.y + speed > 0) {
            if(player.y - speed -player.height/2 > 0)
                player.y -= speed;
        } else {
            if(player.y > app.screen.height / 2)
                player.y -= speed;
            else
                dirtContainer.y += speed;
        }
    }
    if (keys['s'] || keys['ArrowDown']) {
        if (dirtContainer.y - speed < -maxOffsetY) {
            if(player.y + speed + player.height/2 < app.screen.height)
                player.y += speed;
        } else {
            if(player.y < app.screen.height / 2)
                player.y += speed;
            else
                dirtContainer.y -= speed;
        }
    }

    // Update player coordinates relative to the map
    const playerMapX = Math.abs(dirtContainer.x) + player.x;
    const playerMapY = Math.abs(dirtContainer.y) + player.y;

    console.log(`(${player.y}`);

    // Update the text
    coordinatesText.text = `(${Math.floor(playerMapX)}, ${Math.floor(playerMapY)})`;
}

// Add the game loop to the ticker
app.ticker.add(gameLoop);

// Event listeners for key presses
window.addEventListener("keydown", (e) => keys[e.key.toLowerCase()] = true);
window.addEventListener("keyup", (e) => keys[e.key.toLowerCase()] = false);
