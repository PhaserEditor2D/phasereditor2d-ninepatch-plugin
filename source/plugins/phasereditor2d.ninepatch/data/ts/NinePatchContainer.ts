// version: 1.1.0-alpha.1

class NinePatchContainer extends Phaser.GameObjects.Container {

    private static readonly __BASE: string = "__BASE";

    drawCenter = true;
    marginLeft = 20;
    marginTop = 20;
    marginRight = 20;
    marginBottom = 20;
    ninePatchContainerOriginX = 0.5;
    ninePatchContainerOriginY = 0.5;
    textureKey: string;
    textureFrame?: string | number;
    ninePatchContainerTint = 0xffffff;
    ninePatchContainerTintFill = false;
    private _originTexture!: Phaser.Textures.Texture;
    private _originFrame!: Phaser.Textures.Frame;
    private _textureXs!: number[];
    private _textureYs!: number[];

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, key: string, frame?: string | number) {
        super(scene, x, y);

        this.width = width;
        this.height = height;

        this.textureKey = key;
        this.textureFrame = frame;

        this.scene.events.once("update", () => this.redraw());
    }

    redraw() {

        this._originTexture = this.scene.textures.get(this.textureKey);
        this._originFrame = (this._originTexture.frames as any)[this.textureFrame ?? NinePatchContainer.__BASE];
        this._textureXs = [0, this.marginLeft, this._originFrame.width - this.marginRight, this._originFrame.width];
        this._textureYs = [0, this.marginTop, this._originFrame.height - this.marginBottom, this._originFrame.height];

        this.createPatches();

        this.drawPatches();
    }

    private createPatches(): void {

        for (let row: number = 0; row < 3; row++) {

            for (let col: number = 0; col < 3; col++) {

                const name = this.getPatchNameByPosition(row, col);

                this.createPatchFrame(
                    name,
                    this._textureXs[col], // x
                    this._textureYs[row], // y
                    this._textureXs[col + 1] - this._textureXs[col], // width
                    this._textureYs[row + 1] - this._textureYs[row] // height
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
                    finalXs[col] - this.width * this.ninePatchContainerOriginX,
                    finalYs[row] - this.height * this.ninePatchContainerOriginY);

                patchImg.setScale(
                    (finalXs[col + 1] - finalXs[col]) / patch.width,
                    (finalYs[row + 1] - finalYs[row]) / patch.height
                );

                patchImg.visible = this.drawCenter || col !== 1 || row !== 1;

                this.add(patchImg);

                patchImg.tint = this.ninePatchContainerTint;
                patchImg.tintFill = this.ninePatchContainerTintFill;
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

        return `${this._originFrame.name}|${this._textureXs[col]}x${this._textureYs[row]}`;
    }

    setTexture(key: string, frame?: string | number): this {

        this.textureKey = key;
        this.textureFrame = frame;

        return this;
    }

    setNinePatchContainerOrigin(x: number, y: number) {

        this.ninePatchContainerOriginX = x;
        this.ninePatchContainerOriginY = y;
    }

    updateDisplayOrigin() {
        // nothing, a dummy method
    }
}