namespace phasereditor2d.ninepatch.container {

    import sceneobjects = scene.ui.sceneobjects;

    export class NinePatchContainerExtension extends scene.ui.sceneobjects.BaseImageExtension {

        private static _instance: NinePatchContainerExtension;

        static getInstance() {

            return this._instance ? this._instance : (this._instance = new NinePatchContainerExtension());
        }

        constructor() {
            super({
                phaserTypeName: "NinePatchContainer",
                typeName: "NinePatchContainer",
                category: scene.SCENE_OBJECT_IMAGE_CATEGORY,
                icon: NinePatchPlugin.getInstance().getIconDescriptor(ICON_NINEPATCH_CONTAINER)
            });
        }

        getCodeDOMBuilder(): scene.ui.sceneobjects.GameObjectCodeDOMBuilder {

            return new NinePatchCodeDOMBuilder("ninePatchContainer");
        }

        protected newObject(scene: scene.ui.Scene, x: number, y: number, key?: string, frame?: string): NinePatchContainer {

            const w = 200;
            const h = 100;

            if (key) {

                return new NinePatchContainer(scene, x, y, w, h, key, frame);
            }

            return new NinePatchContainer(scene, x, y, w, h);
        }

        adaptDataAfterTypeConversion(serializer: scene.core.json.Serializer, originalObject: sceneobjects.ISceneGameObject, extraData: any) {

            if ("width" in originalObject && "height" in originalObject) {

                serializer.write("width", originalObject["width"]);
                serializer.write("height", originalObject["height"]);
            }
        }
    }
}