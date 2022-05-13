namespace phasereditor2d.ninepatch.renderTexture {

    import sceneobjects = scene.ui.sceneobjects;

    export class NinePatchRenderTextureExtension extends scene.ui.sceneobjects.BaseImageExtension {

        private static _instance: NinePatchRenderTextureExtension;

        static getInstance() {

            return this._instance ? this._instance : (this._instance = new NinePatchRenderTextureExtension());
        }

        constructor() {
            super({
                phaserTypeName: "NinePatch",
                typeName: "NinePatch",
                category: scene.SCENE_OBJECT_IMAGE_CATEGORY,
                icon: NinePatchPlugin.getInstance().getIconDescriptor(ICON_NINEPATCH)
            });
        }

        getCodeDOMBuilder(): scene.ui.sceneobjects.GameObjectCodeDOMBuilder {

            return new NinePatchCodeDOMBuilder("ninePatch");
        }

        protected newObject(scene: scene.ui.Scene, x: number, y: number, key?: string, frame?: string): NinePatchRenderTexture {

            const w = 200;
            const h = 100;

            if (key) {

                return new NinePatchRenderTexture(scene, x, y, w, h, key, frame);
            }

            return new NinePatchRenderTexture(scene, x, y, w, h);
        }

        adaptDataAfterTypeConversion(serializer: scene.core.json.Serializer, originalObject: sceneobjects.ISceneGameObject, extraData: any) {

            if ("width" in originalObject && "height" in originalObject) {

                serializer.write("width", originalObject["width"]);
                serializer.write("height", originalObject["height"]);
            }
        }
    }
}