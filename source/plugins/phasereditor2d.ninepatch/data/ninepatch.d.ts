// version: 1.1.0-alpha

interface INinePatch {

    marginLeft: number;
    marginTop: number;
    marginRight: number;
    marginBottom: number;
    textureKey: string;
    textureFrame: string | number | undefined;
    drawCenter: boolean;
    setMargin(left: number, top: number, right: number, bottom: number): void;
    setTexture(key: string, frame?: string | number): this;
    redraw(): void;
}

interface NinePatch extends Phaser.GameObjects.RenderTexture, INinePatch {

}

interface NinePatchImage extends Phaser.GameObjects.Image, INinePatch {

}

declare namespace Phaser.GameObjects {

    export interface GameObjectFactory {

        ninePatch(x: number, y: number, width: number, height: number, key?: string, frame?: string | number): NinePatch;
        ninePatchImage(x: number, y: number, width: number, height: number, key?: string, frame?: string | number): NinePatchImage;
    }
}