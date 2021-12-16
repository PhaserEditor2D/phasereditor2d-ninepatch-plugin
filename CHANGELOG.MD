## v1.0.0-alpha.5

* Adds a RoundedRectangle plugin (`phasereditor2d.extras.ninepatch`).
* User NinePatch: does not redraw each time a property is changed. Redraw is called the first time the object is updated. If you change a property, you should call `obj.redraw()` manually.
* Editor NinePatch: keeps a dirty flag and redraws only when it is needed.
* NinePatch: removes properties `ninePatchWidth` and `ninePatchHeight`. Instead, it now uses the `width` and `height` of the RenderTexture game object. See the release notes for instructions on migrating your code.
* NinePatch: implements width/height migrations.
* NinePatch: improves rendering performance using a tilesprite brush.

## v1.0.0-alpha.4 - Sep 10, 2021

* Adds NinePatch user resource files for JavaScript, JavaScript with ES modules, & TypeScript.

## v1.0.0-alpha.3 - Aug 11, 2021

* Uses the latest Phaser Editor 2D API.

## v1.0.0-alpha.2 - Jul 31, 2021

* Fixes: NinePatch destroys internal `_img` and `_buff` objects.

## v1.0.0-alpha.1 - Jul 30, 2021

### Added

* A demo plugin (`demoplugin`).
* A NinePatch plugin (`phasereditor2d.extras.ninepatch`) with basic features.