namespace phasereditor2d.ninepatch.image {

    import sceneobjects = scene.ui.sceneobjects;

    export class NinePatchImageExtension extends scene.ui.sceneobjects.BaseImageExtension {

        private static _instance: NinePatchImageExtension;

        static getInstance() {

            return this._instance ? this._instance : (this._instance = new NinePatchImageExtension());
        }

        constructor() {
            super({
                phaserTypeName: "NinePatchImage",
                typeName: "NinePatchImage",
                category: scene.SCENE_OBJECT_IMAGE_CATEGORY,
                icon: NinePatchPlugin.getInstance().getIconDescriptor(ICON_NINEPATCH)
            });
        }

        getCodeDOMBuilder(): scene.ui.sceneobjects.GameObjectCodeDOMBuilder {

            return new NinePatchCodeDOMBuilder("ninePatchImage");
        }

        protected newObject(scene: scene.ui.Scene, x: number, y: number, key?: string, frame?: string): NinePatchImage {

            const w = 200;
            const h = 100;

            if (key) {

                return new NinePatchImage(scene, x, y, w, h, key, frame);
            }

            return new NinePatchImage(scene, x, y, w, h);
        }

        adaptDataAfterTypeConversion(serializer: scene.core.json.Serializer, originalObject: sceneobjects.ISceneGameObject, extraData: any) {

            if ("width" in originalObject && "height" in originalObject) {

                serializer.write("width", originalObject["width"]);
                serializer.write("height", originalObject["height"]);
            }
        }
    }
}