
namespace phasereditor2d.ninepatch {

    import sceneobjects = scene.ui.sceneobjects;

    export class NinePatchEditorSupport extends sceneobjects.BaseImageEditorSupport<NinePatch> {

        constructor(obj: NinePatch, scene: phasereditor2d.scene.ui.Scene) {
            super(NinePatchExtension.getInstance(), obj, scene);

            this.addComponent(
                new sceneobjects.SizeComponent(obj),
                new NinePatchComponent(obj));
        }

        getPropertyDefaultValue(prop: sceneobjects.IProperty<any>) {

            if (prop === sceneobjects.OriginComponent.originX || prop === sceneobjects.OriginComponent.originY) {

                return 0;
            }

            return super.getPropertyDefaultValue(prop);
        }

        setInteractive() {

            this.getObject().setInteractive();
        }
    }
}