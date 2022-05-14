// version: 1.1.0-alpha.1
import Phaser from "phaser";
import NinePatchContainer from "./NinePatchContainer";
export default function registerNinePatchContainerFactory() {
    Phaser.GameObjects.GameObjectFactory.register("ninePatchContainer", function (x, y, width, height, key, frame) {
        return this.displayList.add(new NinePatchContainer(this.scene, x, y, width, height, key, frame));
    });
}
