// version: 1.0.3

import Phaser from "phaser";
import NinePatchImage from "./NinePatchImage";

export default function registerNinePatchFactory() {

    Phaser.GameObjects.GameObjectFactory.register("ninePatchImage",
        function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, width: number, height: number, key: string, frame?: string | number) {

            return this.displayList.add(new NinePatchImage(this.scene, x, y, width, height, key, frame));
        });
}