// version: 1.0.3
function registerNinePatchImageFactory() {
    Phaser.GameObjects.GameObjectFactory.register("ninePatchImage", function (x, y, width, height, key, frame) {
        return this.displayList.add(new NinePatchImage(this.scene, x, y, width, height, key, frame));
    });
}
