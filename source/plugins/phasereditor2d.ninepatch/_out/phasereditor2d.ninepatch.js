var phasereditor2d;
(function (phasereditor2d) {
    var ninepatch;
    (function (ninepatch) {
        class NinePatch extends Phaser.GameObjects.RenderTexture {
            constructor(scene, x, y, width, height, key, frame) {
                super(scene, x, y, width, height);
                this._drawCenter = true;
                this._marginLeft = 20;
                this._marginTop = 20;
                this._marginRight = 20;
                this._marginBottom = 20;
                this._editorSupport = new ninepatch.NinePatchEditorSupport(this, scene);
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
            getEditorSupport() {
                return this._editorSupport;
            }
            redraw() {
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
            setSize(width, height) {
                super.setSize(width, height);
                this.redraw();
                return this;
            }
            set drawCenter(drawCenter) {
                this._dirty = this._dirty || drawCenter !== this._drawCenter;
                this._drawCenter = drawCenter;
            }
            get drawCenter() {
                return this._drawCenter;
            }
            set marginLeft(marginLeft) {
                this._dirty = this._dirty || marginLeft !== this._marginLeft;
                this._marginLeft = marginLeft;
            }
            get marginLeft() {
                return this._marginLeft;
            }
            set marginTop(marginTop) {
                this._dirty = this._dirty || marginTop !== this._marginTop;
                this._marginTop = marginTop;
            }
            get marginTop() {
                return this._marginTop;
            }
            set marginRight(marginRight) {
                this._dirty = this._dirty || marginRight !== this._marginRight;
                this._marginRight = marginRight;
            }
            get marginRight() {
                return this._marginRight;
            }
            set marginBottom(marginBottom) {
                this._dirty = this._dirty || marginBottom !== this._marginBottom;
                this._marginBottom = marginBottom;
            }
            get marginBottom() {
                return this._marginBottom;
            }
            setTexture(key, frame) {
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
        ninepatch.NinePatch = NinePatch;
    })(ninepatch = phasereditor2d.ninepatch || (phasereditor2d.ninepatch = {}));
})(phasereditor2d || (phasereditor2d = {}));
var phasereditor2d;
(function (phasereditor2d) {
    var ninepatch;
    (function (ninepatch) {
        var code = phasereditor2d.scene.core.code;
        var sceneobjects = phasereditor2d.scene.ui.sceneobjects;
        class NinePatchCodeDOMBuilder extends sceneobjects.BaseImageCodeDOMBuilder {
            constructor() {
                super("ninePatch");
            }
            buildCreatePrefabInstanceCodeDOM(args) {
                const obj = args.obj;
                const support = obj.getEditorSupport();
                const call = args.methodCallDOM;
                call.arg(args.sceneExpr);
                this.buildCreatePrefabInstanceCodeDOM_XY_Arguments(args);
                this.buildCreatePrefabInstanceCodeDOM_Size_Arguments(args);
                if (support.isUnlockedProperty(sceneobjects.TextureComponent.texture)) {
                    this.addTextureFrameArgsToObjectFactoryMethodCallDOM(args.methodCallDOM, obj);
                }
            }
            buildPrefabConstructorDeclarationCodeDOM(args) {
                const ctr = args.ctrDeclCodeDOM;
                ctr.arg("x", "number", true);
                ctr.arg("y", "number", true);
                ctr.arg("width", "number", true);
                ctr.arg("height", "number", true);
                ctr.arg("texture", "string", true);
                ctr.arg("frame", "number | string", true);
            }
            buildPrefabConstructorDeclarationSupperCallCodeDOM(args) {
                const call = args.superMethodCallCodeDOM;
                this.buildPrefabConstructorDeclarationSupperCallCodeDOM_XYParameters(args);
                this.buildPrefabConstructorDeclarationSupperCallCodeDOM_SizeParameters(args);
                this.buildPrefabConstructorDeclarationSupperCallCodeDOM_TextureParameters(args, call);
            }
            buildCreateObjectWithFactoryCodeDOM(args) {
                const obj = args.obj;
                const call = new code.MethodCallCodeDOM("ninePatch", args.gameObjectFactoryExpr);
                call.argFloat(obj.x);
                call.argFloat(obj.y);
                call.argFloat(obj.width);
                call.argFloat(obj.height);
                this.addTextureFrameArgsToObjectFactoryMethodCallDOM(call, obj);
                return call;
            }
        }
        ninepatch.NinePatchCodeDOMBuilder = NinePatchCodeDOMBuilder;
    })(ninepatch = phasereditor2d.ninepatch || (phasereditor2d.ninepatch = {}));
})(phasereditor2d || (phasereditor2d = {}));
var phasereditor2d;
(function (phasereditor2d) {
    var ninepatch;
    (function (ninepatch) {
        var controls = colibri.ui.controls;
        class NinePatchCodeResources extends phasereditor2d.scene.core.code.CodeResources {
            constructor() {
                super(ninepatch.NinePatchPlugin.getInstance());
                for (const spec of ["js", "js-module", "ts", "ts-module"]) {
                    const ext = this.getExt(spec);
                    this.addResource(spec + "/NinePatch", "data/" + spec + "/NinePatch." + ext);
                    this.addResource(spec + "/registerNinePatchFactory", "data/" + spec + "/registerNinePatchFactory." + ext);
                }
                this.addResource("ninepatch.d.ts", "data/ninepatch.d.ts");
            }
            static getInstance() {
                return this._instance ? this._instance : (this._instance = new NinePatchCodeResources());
            }
            getExt(spec) {
                return spec.slice(0, 2);
            }
            async createFiles(spec) {
                try {
                    const filesView = colibri.Platform.getWorkbench().getActiveWindow()
                        .getView(phasereditor2d.files.ui.views.FilesView.ID);
                    const sel = filesView.getSelection();
                    let folder;
                    if (sel.length > 0) {
                        const file = sel[0];
                        if (file.isFolder()) {
                            folder = file;
                        }
                        else {
                            folder = file.getParent();
                        }
                    }
                    else {
                        alert("Please, select a folder in the Files view.");
                        return;
                    }
                    const dlg = new controls.dialogs.ProgressDialog();
                    dlg.create();
                    dlg.setTitle("Create NinePatch API Files");
                    const monitor = new controls.dialogs.ProgressDialogMonitor(dlg);
                    monitor.addTotal(3);
                    const newFiles = [];
                    const ext = this.getExt(spec);
                    newFiles.push(await this.createFile(spec + "/NinePatch", folder, "NinePatch." + ext));
                    monitor.step();
                    newFiles.push(await this.createFile(spec + "/registerNinePatchFactory", folder, "registerNinePatchFactory." + ext));
                    monitor.step();
                    newFiles.push(await this.createFile("ninepatch.d.ts", folder, "ninepatch.d.ts"));
                    monitor.step();
                    dlg.close();
                    const viewer = filesView.getViewer();
                    viewer.setExpanded(folder, true);
                    await viewer.repaint();
                    viewer.setSelection(newFiles);
                }
                catch (e) {
                    alert("Error: " + e.message);
                }
            }
        }
        ninepatch.NinePatchCodeResources = NinePatchCodeResources;
    })(ninepatch = phasereditor2d.ninepatch || (phasereditor2d.ninepatch = {}));
})(phasereditor2d || (phasereditor2d = {}));
var phasereditor2d;
(function (phasereditor2d) {
    var ninepatch;
    (function (ninepatch) {
        var sceneobjects = phasereditor2d.scene.ui.sceneobjects;
        class NinePatchComponent extends sceneobjects.Component {
            constructor(obj) {
                super(obj, [
                    NinePatchComponent.marginLeft,
                    NinePatchComponent.marginRight,
                    NinePatchComponent.marginTop,
                    NinePatchComponent.marginBottom,
                    NinePatchComponent.drawCenter
                ]);
            }
            buildSetObjectPropertiesCodeDOM(args) {
                this.buildSetObjectPropertyCodeDOM_FloatProperty(args, NinePatchComponent.marginLeft, NinePatchComponent.marginTop, NinePatchComponent.marginRight, NinePatchComponent.marginBottom);
                this.buildSetObjectPropertyCodeDOM_BooleanProperty(args, NinePatchComponent.drawCenter);
            }
        }
        NinePatchComponent.marginLeft = sceneobjects.SimpleProperty("marginLeft", 20, "Left", "Margin left.", false);
        NinePatchComponent.marginRight = sceneobjects.SimpleProperty("marginRight", 20, "Right", "Margin right.", false);
        NinePatchComponent.marginTop = sceneobjects.SimpleProperty("marginTop", 20, "Top", "Margin top.", false);
        NinePatchComponent.marginBottom = sceneobjects.SimpleProperty("marginBottom", 20, "Bottom", "Margin bottom.", false);
        NinePatchComponent.marginHorizontal = {
            label: "Margin",
            x: NinePatchComponent.marginLeft,
            y: NinePatchComponent.marginRight
        };
        NinePatchComponent.marginVertical = {
            label: "Margin",
            x: NinePatchComponent.marginTop,
            y: NinePatchComponent.marginBottom
        };
        NinePatchComponent.drawCenter = sceneobjects.SimpleProperty("drawCenter", true, "Draw Center", "Draw center.", false);
        ninepatch.NinePatchComponent = NinePatchComponent;
    })(ninepatch = phasereditor2d.ninepatch || (phasereditor2d.ninepatch = {}));
})(phasereditor2d || (phasereditor2d = {}));
var phasereditor2d;
(function (phasereditor2d) {
    var ninepatch;
    (function (ninepatch) {
        var sceneobjects = phasereditor2d.scene.ui.sceneobjects;
        class NinePatchEditorSupport extends sceneobjects.BaseImageEditorSupport {
            constructor(obj, scene) {
                super(ninepatch.NinePatchExtension.getInstance(), obj, scene);
                this.addComponent(new sceneobjects.SizeComponent(obj), new ninepatch.NinePatchComponent(obj));
            }
            setInteractive() {
                this.getObject().setInteractive();
            }
        }
        ninepatch.NinePatchEditorSupport = NinePatchEditorSupport;
    })(ninepatch = phasereditor2d.ninepatch || (phasereditor2d.ninepatch = {}));
})(phasereditor2d || (phasereditor2d = {}));
var phasereditor2d;
(function (phasereditor2d) {
    var ninepatch;
    (function (ninepatch) {
        class NinePatchExtension extends phasereditor2d.scene.ui.sceneobjects.BaseImageExtension {
            constructor() {
                super({
                    phaserTypeName: "NinePatch",
                    typeName: "NinePatch",
                    category: phasereditor2d.scene.SCENE_OBJECT_IMAGE_CATEGORY,
                    icon: ninepatch.NinePatchPlugin.getInstance().getIconDescriptor(ninepatch.ICON_NINEPATCH)
                });
            }
            static getInstance() {
                return this._instance ? this._instance : (this._instance = new NinePatchExtension());
            }
            getCodeDOMBuilder() {
                return new ninepatch.NinePatchCodeDOMBuilder();
            }
            newObject(scene, x, y, key, frame) {
                const w = 200;
                const h = 100;
                if (key) {
                    return new ninepatch.NinePatch(scene, x, y, w, h, key, frame);
                }
                return new ninepatch.NinePatch(scene, x, y, w, h);
            }
            adaptDataAfterTypeConversion(serializer, originalObject, extraData) {
                if ("width" in originalObject && "height" in originalObject) {
                    serializer.write("width", originalObject["width"], 100);
                    serializer.write("height", originalObject["height"], 200);
                }
            }
        }
        ninepatch.NinePatchExtension = NinePatchExtension;
    })(ninepatch = phasereditor2d.ninepatch || (phasereditor2d.ninepatch = {}));
})(phasereditor2d || (phasereditor2d = {}));
var phasereditor2d;
(function (phasereditor2d) {
    var ninepatch;
    (function (ninepatch) {
        class NinePatchMigrations extends phasereditor2d.scene.ui.SceneDataMigrationExtension {
            async migrate(data) {
                this.migrateObjects(data.displayList);
            }
            migrateObjects(list) {
                for (const obj of list) {
                    if ("ninePatchWidth" in obj) {
                        obj["width"] = obj["ninePatchWidth"];
                        delete obj["ninePatchWidth"];
                        console.log(`NinePatchMigrations.ninePatchWidth: [${obj.id}]`);
                    }
                    if ("ninePatchHeight" in obj) {
                        obj["height"] = obj["ninePatchHeight"];
                        delete obj["ninePatchHeight"];
                        console.log(`NinePatchMigrations.ninePatchHeight: [${obj.id}]`);
                    }
                    if (obj.list) {
                        this.migrateObjects(obj.list);
                    }
                }
            }
        }
        ninepatch.NinePatchMigrations = NinePatchMigrations;
    })(ninepatch = phasereditor2d.ninepatch || (phasereditor2d.ninepatch = {}));
})(phasereditor2d || (phasereditor2d = {}));
var phasereditor2d;
(function (phasereditor2d) {
    var ninepatch;
    (function (ninepatch) {
        ninepatch.ICON_NINEPATCH = "ninepatch";
        ninepatch.CAT_NINEPATCH = "phasereditor2d.ninepatch.category";
        ninepatch.CMD_CREATE_NINEPATCH_USER_FILES = "phasereditor2d.ninepatch.CreateNinePatchUserFiles";
        class NinePatchPlugin extends colibri.Plugin {
            constructor() {
                super("phasereditor2d.ninepatch");
            }
            static getInstance() {
                return this._instance;
            }
            registerExtensions(reg) {
                const VER = "1.0.6";
                console.log(`%c %c phasereditor2d-ninepatch-plugin %c v${VER} %c %c https://github.com/PhaserEditor2D/phasereditor2d-ninepatch-plugin `, "background-color:brown", "background-color:#3f3f3f;color:whitesmoke", "background-color:orange;color:black", "background-color:brown", "background-color:silver");
                reg.addExtension(colibri.ui.ide.IconLoaderExtension.withPluginFiles(this, [
                    ninepatch.ICON_NINEPATCH
                ]));
                reg.addExtension(ninepatch.NinePatchExtension.getInstance());
                reg.addExtension(new phasereditor2d.scene.ui.editor.properties.SceneEditorPropertySectionExtension(page => new ninepatch.NinePatchSection(page)));
                reg.addExtension(new colibri.ui.ide.PluginResourceLoaderExtension(() => ninepatch.NinePatchCodeResources.getInstance().preload()));
                reg.addExtension(new colibri.ui.ide.commands.CommandExtension(manager => {
                    manager.addCategory({
                        id: ninepatch.CAT_NINEPATCH,
                        name: "Nine Patch",
                    });
                    for (const spec of ["js", "js-module", "ts", "ts-module"]) {
                        manager.add({
                            command: {
                                id: ninepatch.CMD_CREATE_NINEPATCH_USER_FILES + "." + spec,
                                category: ninepatch.CAT_NINEPATCH,
                                name: `Create Nine Patch User Files (${spec})`,
                                tooltip: "Create the user files with the NinePatch API."
                            },
                            handler: {
                                executeFunc: args => {
                                    ninepatch.NinePatchCodeResources.getInstance().createFiles(spec);
                                }
                            }
                        });
                    }
                }));
                // migrations
                reg.addExtension(new ninepatch.NinePatchMigrations());
            }
        }
        NinePatchPlugin._instance = new NinePatchPlugin();
        ninepatch.NinePatchPlugin = NinePatchPlugin;
        colibri.Platform.addPlugin(NinePatchPlugin.getInstance());
    })(ninepatch = phasereditor2d.ninepatch || (phasereditor2d.ninepatch = {}));
})(phasereditor2d || (phasereditor2d = {}));
var phasereditor2d;
(function (phasereditor2d) {
    var ninepatch;
    (function (ninepatch) {
        var sceneobjects = phasereditor2d.scene.ui.sceneobjects;
        class NinePatchSection extends phasereditor2d.scene.ui.sceneobjects.SceneGameObjectSection {
            constructor(page) {
                super(page, NinePatchSection.SECTION_ID, "Nine Patch", false, false);
            }
            createForm(parent) {
                const comp = this.createGridElementWithPropertiesXY(parent);
                this.createPropertyXYRow(comp, ninepatch.NinePatchComponent.marginHorizontal);
                this.createPropertyXYRow(comp, ninepatch.NinePatchComponent.marginVertical);
                const field = this.createPropertyBoolean(comp, ninepatch.NinePatchComponent.drawCenter);
                field.labelElement.style.gridColumn = "2 / span 2";
            }
            canEdit(obj, n) {
                return obj instanceof ninepatch.NinePatch;
            }
            canEditNumber(n) {
                return n > 0;
            }
            getSectionHelpPath() {
                // return "scene-editor/tile-sprite-object.html#tile-sprite-properties";
                // TODO
                return "";
            }
            createMenu(menu) {
                this.createToolMenuItem(menu, sceneobjects.SizeTool.ID);
                menu.addSeparator();
                super.createMenu(menu);
            }
        }
        NinePatchSection.SECTION_ID = "phasereditor2d.ninepatch.NinePatchSection";
        ninepatch.NinePatchSection = NinePatchSection;
    })(ninepatch = phasereditor2d.ninepatch || (phasereditor2d.ninepatch = {}));
})(phasereditor2d || (phasereditor2d = {}));
