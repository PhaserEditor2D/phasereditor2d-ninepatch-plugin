# Phaser Editor 2D v3 - NinePatch plugin

This repository contains NinePatch plugin for Phaser Editor 2D v3.

## Install

The plugin is distributed as an NPM package:

```bash
$ npm i --save-dev phasereditor2d-ninepatch-plugin
```

It is important that you install the package as a development dependency (`--save-dev`), because Phaser Editor 2D only searches for plugins in that section. Also, the `package.json` file should be in the root of the project.

## Development build

Create a "workspace" folder. It is a folder with all the repositories you will need:

```bash
$ mkdir repos
$ cd repos
```

Clone the [PhaserEditor2D-v3](https://github.com/PhaserEditor2D/PhaserEditor2D-v3/) repository and checkout the `develop` branch:

```bash
$ git clone https://github.com/PhaserEditor2D/PhaserEditor2D-v3.git
$ cd PhaserEditor2D-v3
$ git checkout develop
$ cd ..
```

Clone this repository

```bash
$ git clone https://github.com/PhaserEditor2D/phasereditor2d-ninepatch-plugin.git
```
Build the plugins:

```
$ cd phasereditor2d-ninepatch-plugin
$ npm install
$ npm start
```

Run the latest version of the `PhaserEditor2D` server. It should load plugin with the `-plugins` flag:

```bash
$ PhaserEditor2D -plugins "source/plugins"
```

Open the browser in [http://127.0.0.1:1959](http://127.0.0.1:1959).

## Distribution build

The `build.sh` script creates the distribution files, in the `dist/` folder:

```bash
$ ./build.sh
```

The `zip` argument creates the distribution zip files, in the `dist-zip/` folder:

```bash
$ ./build.sh zip
```

The build script requires a Unix-like environment.
