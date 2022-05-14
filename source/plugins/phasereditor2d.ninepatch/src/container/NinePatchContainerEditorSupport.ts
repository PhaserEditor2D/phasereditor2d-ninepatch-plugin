
namespace phasereditor2d.ninepatch.container {

    import sceneobjects = scene.ui.sceneobjects;

    export class NinePatchContainerEditorSupport extends sceneobjects.GameObjectEditorSupport<NinePatchContainer> {


        constructor(obj: NinePatchContainer, scene: phasereditor2d.scene.ui.Scene) {
            super(NinePatchContainerExtension.getInstance(), obj, scene);

            this.addComponent(
                new sceneobjects.TextureComponent(obj as unknown as sceneobjects.ITextureLikeObject),
                new sceneobjects.TransformComponent(obj as unknown as sceneobjects.ITransformLikeObject),
                new sceneobjects.VisibleComponent(obj as unknown as sceneobjects.IVisibleLikeObject),
                new sceneobjects.SizeComponent(obj),
                new NinePatchComponent(obj),
                new NinePatchContainerComponent(obj));
        }

        getCellRenderer(): colibri.ui.controls.viewers.ICellRenderer {

            return new sceneobjects.TextureCellRenderer();
        }

        setInteractive() {

            this.getObject().setInteractive(new Phaser.Geom.Rectangle(0, 0, 1, 1), (shape, x, y, obj: NinePatchContainer) => {

                // a Phaser container always has a 0.5 origin,
                // let's move it to 0
                x -= obj.width * 0.5;
                y -= obj.height * 0.5;

                // convert the x,y to the ninepatch origin.
                x += obj.width * obj.ninePatchContainerOriginX;
                y += obj.height * obj.ninePatchContainerOriginY;

                return x >= 0 && x <= obj.width && y >= 0 && y <= obj.height;
            });
        }

        computeOrigin(): { originX: number; originY: number; } {

            return {
                originX: this.getObject().ninePatchContainerOriginX,
                originY: this.getObject().ninePatchContainerOriginY
            };
        }
    }
}