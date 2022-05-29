// v1.1.0-beta.5
function registerNinePatchContainerFactory() {
    Phaser.GameObjects.GameObjectFactory.register("ninePatchContainer", function (x, y, width, height, key, frame) {
        return this.displayList.add(new NinePatchContainer(this.scene, x, y, width, height, key, frame));
    });
}
