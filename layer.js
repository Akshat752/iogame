export class Layer {
    constructor(layerID, depth, tileID) {
        this.layerID = layerID;
        this.tileGrid = this.createGrid(depth, tileID);
    }

    createGrid(depth, tileID) {
        return Array.from({ length: depth }, () => 
            Array.from({ length: 50 }, () => tileID)
        );
    }
}