namespace phasereditor2d.ninepatch {

    export class NinePatch extends Phaser.GameObjects.RenderTexture implements scene.ui.sceneobjects.ISceneGameObject {

        private _editorSupport: NinePatchEditorSupport;

        private _key: string;
        private _frame: string | number | undefined;
        private _drawCenter = true;
        private _marginLeft = 20;
        private _marginTop = 20;
        private _marginRight = 20;
        private _marginBottom = 20;
        private _brush: Phaser.GameObjects.TileSprite;
        private _dirty: boolean;
        private _updateListener: () => void;
        private _textureImage: Phaser.GameObjects.Image;

        constructor(scene: scene.ui.Scene, x: number, y: number, width: number, height: number, key?: string, frame?: string | number) {
            super(scene, x, y, width, height);

            this._editorSupport = new NinePatchEditorSupport(this, scene);

            this._key = key;
            this._frame = frame;

            this._brush = new Phaser.GameObjects.TileSprite(scene, 0, 0, 1, 1, key, frame);
            this._brush.setOrigin(0, 0);
            this._textureImage = new Phaser.GameObjects.Image(scene, 0, 0, key, frame);

            this._updateListener = () => {

                if (this._dirty) {

                    this.redraw();
                }
            };

            this.scene.events.on("update", this._updateListener);
        }

        destroy() {

            this.scene?.events?.removeListener("update", this._updateListener);

            this._brush.destroy();
            this._textureImage.destroy();

            super.destroy();
        }

        getEditorSupport(): scene.ui.sceneobjects.GameObjectEditorSupport<scene.ui.sceneobjects.ISceneGameObject> {

            return this._editorSupport;
        }

        private redraw() {

            this._dirty = false;

            this.clear();

            if (!this._brush || this._brush.texture.key === "__DEFAULT" || this._brush.texture.key === "__MISSING") {

                const gr = new Phaser.GameObjects.Graphics(this.scene);

                gr.fillStyle(0);
                gr.fillRect(0, 0, this.width, this.height);
                gr.lineStyle(2, 0x00ff00);
                gr.strokeRect(0, 0, this.width, this.height);
                gr.strokeLineShape(new Phaser.Geom.Line(0, 0, this.width, this.height));

                this.draw(gr);

                return;
            }

            this.beginDraw();

            const texWidth = this._textureImage.width;
            const texHeight = this._textureImage.height;

            const ml = this.marginLeft;
            const mt = this.marginTop;
            const mr = this.marginRight;
            const mb = this.marginBottom;

            // center
            if (this.drawCenter) {

                this._brush.setSize(texWidth - ml - mr, texHeight - mt - mb);
                this._brush.setTilePosition(ml, mt);
                this._brush.setDisplaySize(this.width - ml - mr, this.height - mt - mb);
                this.batchDraw(this._brush, ml, mt);
            }

            // top
            this._brush.setSize(texWidth - ml - mr, mt);
            this._brush.setTilePosition(ml, 0);
            this._brush.setDisplaySize(this.width - ml - mr, mt);
            this.batchDraw(this._brush, ml, 0);

            // right
            this._brush.setSize(mr, texHeight - mt - mb);
            this._brush.setTilePosition(texWidth - mr, mt);
            this._brush.setDisplaySize(mr, this.height - mt - mb);
            this.batchDraw(this._brush, this.width - mr, mt);

            // bottom
            this._brush.setSize(texWidth - ml - mr, mb);
            this._brush.setTilePosition(ml, texHeight - mb);
            this._brush.setDisplaySize(this.width - ml - mr, mb);
            this.batchDraw(this._brush, ml, this.height - mb);

            // left
            this._brush.setSize(ml, texHeight - mt - mb);
            this._brush.setTilePosition(0, mt);
            this._brush.setDisplaySize(ml, this.height - mt - mb);
            this.batchDraw(this._brush, 0, mt);

            this._brush.setScale(1, 1);

            // left/top
            this._brush.setSize(ml, mt);
            this._brush.setTilePosition(0, 0);
            this.batchDraw(this._brush);

            // right/top
            this._brush.setSize(mr, mt);
            this._brush.setTilePosition(texWidth - mr, 0);
            this.batchDraw(this._brush, this.width - mr, 0);

            // right/bottom
            this._brush.setSize(mr, mb);
            this._brush.setTilePosition(texWidth - mr, texHeight - mb);
            this.batchDraw(this._brush, this.width - mr, this.height - mb);

            // left/bottom
            this._brush.setSize(ml, mb);
            this._brush.setTilePosition(0, texHeight - mb);
            this.batchDraw(this._brush, 0, this.height - mb);

            this.endDraw();
        }

        setSize(width: number, height: number): this {

            super.setSize(width, height);

            this.redraw();

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

        setTexture(key: string, frame?: string | number) {

            this._dirty = this._dirty || key !== this._key || frame !== this._frame;

            this._key = key;
            this._frame = frame;

            this._brush.setTexture(this._key, this._frame);
            this._textureImage.setTexture(this._key, this._frame);
        }

        get textureKey() {

            return this._key;
        }

        get textureFrame() {

            return this._frame;
        }
    }
}