// version: 1.1.0-alpha.1
function registerNinePatchContainerFactory() {
    Phaser.GameObjects.GameObjectFactory.register("ninePatchContainer", function (x, y, width, height, key, frame) {
        return this.displayList.add(new NinePatchContainer(this.scene, x, y, width, height, key, frame));
    });
}
