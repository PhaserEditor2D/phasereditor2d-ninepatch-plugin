
namespace phasereditor2d.ninepatch {

    import sceneobjects = scene.ui.sceneobjects;

    export class NinePatchEditorSupport extends sceneobjects.BaseImageEditorSupport<NinePatch> {

        constructor(obj: NinePatch, scene: phasereditor2d.scene.ui.Scene) {
            super(NinePatchExtension.getInstance(), obj, scene);

            this.addComponent(
                new sceneobjects.SizeComponent(obj),
                new NinePatchComponent(obj));

        }

        setInteractive() {

            this.getObject().setInteractive();
        }
    }
}