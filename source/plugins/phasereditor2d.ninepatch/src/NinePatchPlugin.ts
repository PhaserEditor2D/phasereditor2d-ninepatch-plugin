namespace phasereditor2d.ninepatch {

    export const ICON_NINEPATCH = "ninepatch";
    export const CAT_NINEPATCH = "phasereditor2d.ninepatch.category";
    export const CMD_CREATE_NINEPATCH_USER_FILES = "phasereditor2d.ninepatch.CreateNinePatchUserFiles";

    export class NinePatchPlugin extends colibri.Plugin {

        private static _instance = new NinePatchPlugin();

        static getInstance() {

            return this._instance;
        }

        constructor() {
            super("phasereditor2d.ninepatch");
        }

        registerExtensions(reg: colibri.ExtensionRegistry) {

            reg.addExtension(colibri.ui.ide.IconLoaderExtension.withPluginFiles(this, [
                ICON_NINEPATCH
            ]));

            reg.addExtension(NinePatchExtension.getInstance());

            reg.addExtension(new scene.ui.editor.properties.SceneEditorPropertySectionExtension(
                page => new NinePatchSection(page),
            ));

            reg.addExtension(new colibri.ui.ide.PluginResourceLoaderExtension(() =>

                NinePatchCodeResources.getInstance().preload()
            ));

            reg.addExtension(new colibri.ui.ide.commands.CommandExtension(manager => {

                manager.addCategory({
                    id: CAT_NINEPATCH,
                    name: "Nine Patch",
                });

                for (const spec of ["js", "js-module", "ts", "ts-module"]) {

                    manager.add({
                        command: {
                            id: CMD_CREATE_NINEPATCH_USER_FILES + "." + spec,
                            category: CAT_NINEPATCH,
                            name: `Create Nine Patch User Files (${spec})`,
                            tooltip: "Create the user files with the NinePatch API."
                        },
                        handler: {
                            executeFunc: args => {

                                NinePatchCodeResources.getInstance().createFiles(spec as any);
                            }
                        }
                    });
                }
            }));


            // migrations

            reg.addExtension(new NinePatchMigrations());
        }
    }

    colibri.Platform.addPlugin(NinePatchPlugin.getInstance());
}