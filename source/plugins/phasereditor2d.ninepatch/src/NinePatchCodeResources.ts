namespace phasereditor2d.ninepatch {

    import controls = colibri.ui.controls;

    export class NinePatchCodeResources extends scene.core.code.CodeResources {

        private static _instance: NinePatchCodeResources;

        static getInstance() {

            return this._instance ? this._instance : (this._instance = new NinePatchCodeResources());
        }

        private constructor() {
            super(NinePatchPlugin.getInstance());

            for (const spec of ["js", "js-module", "ts", "ts-module"]) {

                const ext = this.getExt(spec);

                this.addResource(spec + "/NinePatch", "data/" + spec + "/NinePatch." + ext);
                this.addResource(spec + "/registerNinePatchFactory", "data/" + spec + "/registerNinePatchFactory." + ext);

                this.addResource(spec + "/NinePatchImage", "data/" + spec + "/NinePatchImage." + ext);
                this.addResource(spec + "/registerNinePatchImageFactory", "data/" + spec + "/registerNinePatchImageFactory." + ext);
            }

            this.addResource("ninepatch.d.ts", "data/ninepatch.d.ts");
        }

        private getExt(spec: string) {

            return spec.slice(0, 2);
        }

        async createFiles(spec: "js" | "js-module" | "ts" | "ts-module") {

            try {

                const filesView = colibri.Platform.getWorkbench().getActiveWindow()
                    .getView(files.ui.views.FilesView.ID) as files.ui.views.FilesView;

                const sel = filesView.getSelection();

                let folder: colibri.core.io.FilePath;

                if (sel.length > 0) {

                    const file = sel[0] as colibri.core.io.FilePath;

                    if (file.isFolder()) {

                        folder = file;

                    } else {

                        folder = file.getParent();
                    }

                } else {

                    alert("Please, select a folder in the Files view.");
                    return;
                }

                const dlg = new controls.dialogs.ProgressDialog();
                dlg.create();
                dlg.setTitle("Create NinePatch API Files");

                const monitor = new controls.dialogs.ProgressDialogMonitor(dlg);
                monitor.addTotal(5);

                const newFiles = [];

                const ext = this.getExt(spec);

                for (const type of ["NinePatch", "NinePatchImage"]) {

                    newFiles.push(await this.createFile(spec + `/${type}`, folder, type + "." + ext));
                    monitor.step();

                    newFiles.push(await this.createFile(spec + `/register${type}Factory`, folder,
                        `register${type}Factory.${ext}`));
                    monitor.step();
                }


                newFiles.push(await this.createFile("ninepatch.d.ts", folder, "ninepatch.d.ts"));
                monitor.step();

                dlg.close();

                const viewer = filesView.getViewer();

                viewer.setExpanded(folder, true);

                await viewer.repaint();

                viewer.setSelection(newFiles);

            } catch (e) {

                alert("Error: " + e.message);
            }
        }
    }
}