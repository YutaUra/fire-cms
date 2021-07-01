---
to: packages/<%= packageName %>/tsconfig.build.json
---
{
  "extends": "../../tsconfig.build.json",
  "compilerOptions": {
    "rootDir": "src",
    "declarationDir": "dist/types"
  },
  "include": ["src"]
}
