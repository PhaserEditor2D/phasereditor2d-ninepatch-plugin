// version: 1.0.3
import Phaser from "phaser";
import NinePatchImage from "./NinePatchImage";
export default function registerNinePatchFactory() {
    Phaser.GameObjects.GameObjectFactory.register("ninePatchImage", function (x, y, width, height, key, frame) {
        return this.displayList.add(new NinePatchImage(this.scene, x, y, width, height, key, frame));
    });
}