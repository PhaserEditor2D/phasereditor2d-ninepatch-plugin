#!/bin/bash

cd source/plugins/phasereditor2d.ninepatch/data

rm -Rf js js-module ts-module
mkdir js js-module ts-module

# ts

cd ts
npx tsc -t esnext --outDir ../js NinePatch.ts &> /dev/null
npx tsc -t esnext --outDir ../js registerNinePatchFactory.ts &> /dev/null

# ts-module

cp * ../ts-module
cd ../ts-module
sed -i 's/class/import Phaser from "phaser";\n\nexport default class/' NinePatch.ts
sed -i 's/function registerNinePatchFactory/import Phaser from "phaser";\n\nexport default function registerNinePatchFactory/' registerNinePatchFactory.ts

npx tsc -t esnext --outDir ../js-module NinePatch.ts &> /dev/null
npx tsc -t esnext --outDir ../js-module registerNinePatchFactory.ts &> /dev/null

