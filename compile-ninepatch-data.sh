#!/bin/zsh

cd source/plugins/phasereditor2d.ninepatch/data

rm -Rf js js-module ts-module
mkdir js js-module ts-module

# ts

cd ts
npx tsc -t esnext --outDir ../js NinePatch.ts &> /dev/null
npx tsc -t esnext --outDir ../js registerNinePatchFactory.ts &> /dev/null
npx tsc -t esnext --outDir ../js NinePatchImage.ts &> /dev/null
npx tsc -t esnext --outDir ../js registerNinePatchImageFactory.ts &> /dev/null
npx tsc -t esnext --outDir ../js NinePatchContainer.ts &> /dev/null
npx tsc -t esnext --outDir ../js registerNinePatchContainerFactory.ts &> /dev/null

# ts-module

cp * ../ts-module
cd ../ts-module
sed -i '' -e 's/class/import Phaser from "phaser";\n\nexport default class/' NinePatch.ts
sed -i '' -e 's/function registerNinePatchFactory/import Phaser from "phaser";\nimport NinePatch from ".\/NinePatch";\n\nexport default function registerNinePatchFactory/' registerNinePatchFactory.ts
sed -i '' -e 's/class/import Phaser from "phaser";\n\nexport default class/' NinePatchImage.ts
sed -i '' -e 's/function registerNinePatchImageFactory/import Phaser from "phaser";\nimport NinePatchImage from ".\/NinePatchImage";\n\nexport default function registerNinePatchImageFactory/' registerNinePatchImageFactory.ts
sed -i '' -e 's/class/import Phaser from "phaser";\n\nexport default class/' NinePatchContainer.ts
sed -i '' -e 's/function registerNinePatchContainerFactory/import Phaser from "phaser";\nimport NinePatchContainer from ".\/NinePatchContainer";\n\nexport default function registerNinePatchContainerFactory/' registerNinePatchContainerFactory.ts

# js-module

npx tsc -t esnext --outDir ../js-module NinePatch.ts &> /dev/null
npx tsc -t esnext --outDir ../js-module registerNinePatchFactory.ts &> /dev/null
npx tsc -t esnext --outDir ../js-module NinePatchImage.ts &> /dev/null
npx tsc -t esnext --outDir ../js-module registerNinePatchImageFactory.ts &> /dev/null
npx tsc -t esnext --outDir ../js-module NinePatchContainer.ts &> /dev/null
npx tsc -t esnext --outDir ../js-module registerNinePatchContainerFactory.ts &> /dev/null

