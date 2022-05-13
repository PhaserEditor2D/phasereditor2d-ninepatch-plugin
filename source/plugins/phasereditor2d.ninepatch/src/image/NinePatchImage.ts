namespace phasereditor2d.ninepatch.image {

    import sceneobjects = scene.ui.sceneobjects;

    export class NinePatchImage extends Phaser.GameObjects.Image implements INinePatch, sceneobjects.ISceneGameObject {

        private _editorSupport: NinePatchImageEditorSupport;
        private _dirty: boolean;
        private _updateListener: () => void;
        private _settingCacheTexture = false;
        private _drawCenter = true;
        private _marginLeft = 20;
        private _marginTop = 20;
        private _marginRight = 20;
        private _marginBottom = 20;
        private _hashKey: string;
        textureKey: string;
        textureFrame: string | number;

        constructor(scene: scene.ui.Scene, x: number, y: number, width: number, height: number, key?: string, frame?: string | number) {
            super(scene, x, y, key, frame);

            this.width = width;
            this.height = height;

            this.textureKey = key;
            this.textureFrame = frame;

            this._editorSupport = new NinePatchImageEditorSupport(this, scene);

            this._dirty = true;

            this._updateListener = () => {

                if (this._dirty) {

                    this.redraw();
                }
            };

            this.scene.events.on("update", this._updateListener);
        }

        private redraw() {

            const hashKey =  [
                "!NinePatchImage",
                this.width,
                this.height,
                this.marginLeft,
                this.marginRight,
                this.marginTop,
                this.marginBottom,
                this.drawCenter,
                this.textureKey,
                this.textureFrame,
            ].join(",");

            if (this.scene.textures.exists(hashKey)) {
                
                // console.log(`NinePatchImage.getFromCache(${hashKey})`);

            } else {

                // console.log(`NinePatchImage.generateTexture(${hashKey})`);

                const rt = new Phaser.GameObjects.RenderTexture(this.scene, 0, 0, this.width, this.height);
                const brush = new Phaser.GameObjects.TileSprite(this.scene, 0, 0, this.width, this.height, this.textureKey, this.textureFrame);
                brush.setOrigin(0, 0);
                const textureImage = new Phaser.GameObjects.Image(this.scene, 0, 0, this.textureKey, this.textureFrame);

                drawNinePatch({
                    obj: this,
                    rt,
                    brush,
                    textureImage,
                    scene: this.scene
                });

                brush.destroy();
                textureImage.destroy();

                rt.saveTexture(hashKey);
            }

            this._settingCacheTexture = true;
            this._hashKey = hashKey;
            this.setTexture(hashKey);
            this._settingCacheTexture = false;

            this._dirty = false;

            this.collectGarbage();
        }

        private collectGarbage() {
             
            console.log("collecting garbage");

            const scene = this.scene as scene.ui.Scene;
            
            const usedTexture = new Set();

            scene.visitAll(obj => {

                const support = NinePatchImageEditorSupport.getEditorSupport(obj);

                if (support) {

                    const ninePatch = obj as NinePatchImage;
                    usedTexture.add(ninePatch._hashKey);
                }
            });

            for(const key of scene.textures.getTextureKeys()) {

                if (key.startsWith("!NinePatchImage")) {

                    if (!usedTexture.has(key)) {

                        console.log("destroy " + key);

                        scene.textures.remove(key);
                    }
                }
            }
        }

        setTexture(key: string, frame?: string | number): this {

            if (!this._settingCacheTexture) {

                this._dirty = this._dirty || key !== this.textureKey || frame !== this.textureFrame;

                this.textureKey = key;
                this.textureFrame = frame;
            }

            return super.setTexture(key, frame);
        }

        setSize(width: number, height: number): this {

            this._dirty = this.width !== width || this.height !== height;

            super.setSize(width, height);

            return this;
        }

        set drawCenter(drawCenter: boolean) {

            this._dirty = this._dirty || drawCenter !== this._drawCenter;

            this._drawCenter = drawCenter;
        }

        get drawCenter() {

            return this._drawCenter;
        }

        set marginLeft(marginLeft: number) {

            this._dirty = this._dirty || marginLeft !== this._marginLeft;

            this._marginLeft = marginLeft;
        }

        get marginLeft() {

            return this._marginLeft;
        }

        set marginTop(marginTop: number) {

            this._dirty = this._dirty || marginTop !== this._marginTop;

            this._marginTop = marginTop;
        }

        get marginTop() {

            return this._marginTop;
        }

        set marginRight(marginRight: number) {

            this._dirty = this._dirty || marginRight !== this._marginRight;

            this._marginRight = marginRight;
        }

        get marginRight() {

            return this._marginRight;
        }

        set marginBottom(marginBottom: number) {

            this._dirty = this._dirty || marginBottom !== this._marginBottom;

            this._marginBottom = marginBottom;
        }

        get marginBottom() {

            return this._marginBottom;
        }

        destroy() {

            this.scene?.events?.removeListener("update", this._updateListener);

            super.destroy();
        }

        getEditorSupport(): sceneobjects.GameObjectEditorSupport<sceneobjects.ISceneGameObject> {

            return this._editorSupport;
        }
    }
}