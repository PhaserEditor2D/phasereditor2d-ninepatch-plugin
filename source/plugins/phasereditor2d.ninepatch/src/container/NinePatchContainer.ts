namespace phasereditor2d.ninepatch.container {

    import sceneobjects = scene.ui.sceneobjects;

    export class NinePatchContainer extends Phaser.GameObjects.Container implements INinePatch, sceneobjects.ISceneGameObject {

        private static readonly __BASE: string = "__BASE";

        private _editorSupport: NinePatchContainerEditorSupport;
        private _dirty: boolean;
        private _updateListener: () => void;
        private _drawCenter = true;
        private _marginLeft = 20;
        private _marginTop = 20;
        private _marginRight = 20;
        private _marginBottom = 20;
        private _ninePatchContainerOriginX = 0.5;
        private _ninePatchContainerOriginY = 0.5;
        textureKey: string;
        textureFrame: string | number;
        private _ninePatchContainerTint = 0xffffff;
        private _ninePatchContainerTintFill = false;
        private _originTexture: Phaser.Textures.Texture;
        private _originFrame: Phaser.Textures.Frame;
        private textureXs: number[];
        private textureYs: number[];

        constructor(scene: scene.ui.Scene, x: number, y: number, width: number, height: number, key?: string, frame?: string | number) {
            super(scene, x, y);

            this.width = width;
            this.height = height;

            this.textureKey = key;
            this.textureFrame = frame;

            this._editorSupport = new NinePatchContainerEditorSupport(this, scene);

            this._dirty = true;

            this._updateListener = () => {

                if (this._dirty) {

                    this.redraw();
                }
            };

            this.scene.events.on("update", this._updateListener);
        }

        private redraw() {

            this._originTexture = this.scene.textures.get(this.textureKey);
            this._originFrame = (this._originTexture.frames as any)[this.textureFrame] || (this._originTexture.frames as any)[NinePatchContainer.__BASE];
            this.textureXs = [0, this.marginLeft, this._originFrame.width - this.marginRight, this._originFrame.width];
            this.textureYs = [0, this.marginTop, this._originFrame.height - this.marginBottom, this._originFrame.height];

            this.createPatches();

            this.drawPatches();

            this._dirty = false;
        }

        private createPatches(): void {

            for (let row: number = 0; row < 3; row++) {

                for (let col: number = 0; col < 3; col++) {

                    const name = this.getPatchNameByPosition(row, col);

                    this.createPatchFrame(
                        name,
                        this.textureXs[col], // x
                        this.textureYs[row], // y
                        this.textureXs[col + 1] - this.textureXs[col], // width
                        this.textureYs[row + 1] - this.textureYs[row] // height
                    );
                }
            }
        }

        private drawPatches(): void {

            this.removeAll(true);

            // the positions we want from the object's size
            const finalXs = [0, this.marginLeft, this.width - this.marginRight, this.width];
            const finalYs = [0, this.marginTop, this.height - this.marginBottom, this.height];

            for (let row: number = 0; row < 3; row++) {

                for (let col: number = 0; col < 3; col++) {

                    // @ts-ignore
                    const patch: Phaser.Textures.Frame = this._originTexture.frames[
                        this.getPatchNameByPosition(row, col)];

                    const patchImg = new Phaser.GameObjects.Image(this.scene, 0, 0, patch.texture.key, patch.name);

                    patchImg.setOrigin(0, 0);

                    patchImg.setPosition(
                        finalXs[col] - this.width * this._ninePatchContainerOriginX,
                        finalYs[row] - this.height * this._ninePatchContainerOriginY);

                    patchImg.setScale(
                        (finalXs[col + 1] - finalXs[col]) / patch.width,
                        (finalYs[row + 1] - finalYs[row]) / patch.height
                    );

                    patchImg.visible = this.drawCenter || col !== 1 || row !== 1;

                    this.add(patchImg);

                    patchImg.tint = this._ninePatchContainerTint;
                    patchImg.tintFill = this._ninePatchContainerTintFill;
                }
            }
        }

        private createPatchFrame(patch: string, x: number, y: number, width: number, height: number): void {

            if (this._originTexture.frames.hasOwnProperty(patch)) {

                // console.log("NinePatchContainer.createPatchFrame: get from cache " + patch);

                return;
            }

            // console.log("NinePatchContainer.createPatchFrame: generate frame " + patch);

            this._originTexture.add(patch,
                this._originFrame.sourceIndex,
                this._originFrame.cutX + x, this._originFrame.cutY + y,
                width, height);
        }

        private getPatchNameByPosition(row: number, col: number): string {

            return `${this._originFrame.name}|${this.textureXs[col]}x${this.textureYs[row]}`;
        }

        setTexture(key: string, frame?: string | number): this {

            this._dirty = this._dirty || key !== this.textureKey || frame !== this.textureFrame;

            this.textureKey = key;
            this.textureFrame = frame;

            return this;
        }

        setSize(width: number, height: number): this {

            this._dirty = this.width !== width || this.height !== height;

            super.setSize(width, height);

            return this;
        }

        setContainerOrigin(x: number, y: number) {

            this._ninePatchContainerOriginX = x;
            this._ninePatchContainerOriginY = y;
        }

        updateDisplayOrigin() {

        }

        set ninePatchContainerTintFill(fill: boolean) {

            this._dirty = this._dirty || fill !== this._ninePatchContainerTintFill;

            this._ninePatchContainerTintFill = fill;
        }

        get ninePatchContainerTintFill() {

            return this._ninePatchContainerTintFill;
        }

        set ninePatchContainerTint(tint: number) {

            this._dirty = this._dirty || tint !== this._ninePatchContainerTint;

            this._ninePatchContainerTint = tint;
        }

        get ninePatchContainerTint() {

            return this._ninePatchContainerTint;
        }

        set ninePatchContainerOriginX(originX: number) {

            this._dirty = this._dirty || originX !== this._ninePatchContainerOriginX;

            this._ninePatchContainerOriginX = originX;
        }

        get ninePatchContainerOriginX() {

            return this._ninePatchContainerOriginX;
        }

        set ninePatchContainerOriginY(originY: number) {

            this._dirty = this._dirty || originY !== this._ninePatchContainerOriginY;

            this._ninePatchContainerOriginY = originY;
        }

        get ninePatchContainerOriginY() {

            return this._ninePatchContainerOriginY;
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

        getEditorSupport() {

            return this._editorSupport;
        }
    }
}