declare namespace phasereditor2d.ninepatch {
    class NinePatch extends Phaser.GameObjects.RenderTexture implements scene.ui.sceneobjects.ISceneGameObject {
        private _editorSupport;
        private _key;
        private _frame;
        private _drawCenter;
        private _marginLeft;
        private _marginTop;
        private _marginRight;
        private _marginBottom;
        private _brush;
        private _dirty;
        private _updateListener;
        private _textureImage;
        constructor(scene: scene.ui.Scene, x: number, y: number, width: number, height: number, key?: string, frame?: string | number);
        destroy(): void;
        getEditorSupport(): scene.ui.sceneobjects.GameObjectEditorSupport<scene.ui.sceneobjects.ISceneGameObject>;
        private redraw;
        setSize(width: number, height: number): this;
        set drawCenter(drawCenter: boolean);
        get drawCenter(): boolean;
        set marginLeft(marginLeft: number);
        get marginLeft(): number;
        set marginTop(marginTop: number);
        get marginTop(): number;
        set marginRight(marginRight: number);
        get marginRight(): number;
        set marginBottom(marginBottom: number);
        get marginBottom(): number;
        setTexture(key: string, frame?: string | number): void;
        get textureKey(): string;
        get textureFrame(): string | number;
    }
}
declare namespace phasereditor2d.ninepatch {
    import code = scene.core.code;
    import sceneobjects = scene.ui.sceneobjects;
    class NinePatchCodeDOMBuilder extends sceneobjects.BaseImageCodeDOMBuilder {
        constructor();
        buildCreatePrefabInstanceCodeDOM(args: sceneobjects.IBuildPrefabConstructorCodeDOMArgs): void;
        buildPrefabConstructorDeclarationCodeDOM(args: sceneobjects.IBuildPrefabConstructorDeclarationCodeDOM): void;
        buildPrefabConstructorDeclarationSupperCallCodeDOM(args: sceneobjects.IBuildPrefabConstructorDeclarationSupperCallCodeDOMArgs): void;
        buildCreateObjectWithFactoryCodeDOM(args: sceneobjects.IBuildObjectFactoryCodeDOMArgs): code.MethodCallCodeDOM;
    }
}
declare namespace phasereditor2d.ninepatch {
    class NinePatchCodeResources extends scene.core.code.CodeResources {
        private static _instance;
        static getInstance(): NinePatchCodeResources;
        private constructor();
        private getExt;
        createFiles(spec: "js" | "js-module" | "ts" | "ts-module"): Promise<void>;
    }
}
declare namespace phasereditor2d.ninepatch {
    import sceneobjects = scene.ui.sceneobjects;
    class NinePatchComponent extends sceneobjects.Component<NinePatch> {
        static marginLeft: sceneobjects.IProperty<any>;
        static marginRight: sceneobjects.IProperty<any>;
        static marginTop: sceneobjects.IProperty<any>;
        static marginBottom: sceneobjects.IProperty<any>;
        static marginHorizontal: sceneobjects.IPropertyXY;
        static marginVertical: sceneobjects.IPropertyXY;
        static drawCenter: sceneobjects.IProperty<any>;
        constructor(obj: NinePatch);
        buildSetObjectPropertiesCodeDOM(args: scene.ui.sceneobjects.ISetObjectPropertiesCodeDOMArgs): void;
    }
}
declare namespace phasereditor2d.ninepatch {
    import sceneobjects = scene.ui.sceneobjects;
    class NinePatchEditorSupport extends sceneobjects.BaseImageEditorSupport<NinePatch> {
        constructor(obj: NinePatch, scene: phasereditor2d.scene.ui.Scene);
        setInteractive(): void;
    }
}
declare namespace phasereditor2d.ninepatch {
    import sceneobjects = scene.ui.sceneobjects;
    class NinePatchExtension extends scene.ui.sceneobjects.BaseImageExtension {
        private static _instance;
        static getInstance(): NinePatchExtension;
        constructor();
        getCodeDOMBuilder(): scene.ui.sceneobjects.GameObjectCodeDOMBuilder;
        protected newObject(scene: scene.ui.Scene, x: number, y: number, key?: string, frame?: string): NinePatch;
        adaptDataAfterTypeConversion(serializer: scene.core.json.Serializer, originalObject: sceneobjects.ISceneGameObject, extraData: any): void;
    }
}
declare namespace phasereditor2d.ninepatch {
    class NinePatchMigrations extends scene.ui.SceneDataMigrationExtension {
        migrate(data: scene.core.json.ISceneData): Promise<void>;
        private migrateObjects;
    }
}
declare namespace phasereditor2d.ninepatch {
    const ICON_NINEPATCH = "ninepatch";
    const CAT_NINEPATCH = "phasereditor2d.ninepatch.category";
    const CMD_CREATE_NINEPATCH_USER_FILES = "phasereditor2d.ninepatch.CreateNinePatchUserFiles";
    class NinePatchPlugin extends colibri.Plugin {
        private static _instance;
        static getInstance(): NinePatchPlugin;
        constructor();
        registerExtensions(reg: colibri.ExtensionRegistry): void;
    }
}
declare namespace phasereditor2d.ninepatch {
    import controls = colibri.ui.controls;
    class NinePatchSection extends scene.ui.sceneobjects.SceneGameObjectSection<NinePatch> {
        static SECTION_ID: string;
        constructor(page: controls.properties.PropertyPage);
        createForm(parent: HTMLDivElement): void;
        canEdit(obj: any, n: number): boolean;
        canEditNumber(n: number): boolean;
        getSectionHelpPath(): string;
        createMenu(menu: controls.Menu): void;
    }
}
//# sourceMappingURL=phasereditor2d.ninepatch.d.ts.map