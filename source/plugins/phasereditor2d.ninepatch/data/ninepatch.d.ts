
interface NinePatch extends Phaser.GameObjects.RenderTexture {

    marginLeft: number;
    marginTop: number;
    marginRight: number;
    marginBottom: number;
    textureKey: string;
    textureFrame: string | number | undefined;
    drawCenter: boolean;
    setMargin(left: number, top: number, right: number, bottom: number): void;
    setTexture(key?: string, frame?: string | number): void;
    redraw(): void;
}

declare namespace Phaser.GameObjects {

    export interface GameObjectFactory {

        ninePatch(x: number, y: number, width: number, height: number, key?: string, frame?: string | number): NinePatch;
    }
}