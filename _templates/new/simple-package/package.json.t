---
to: packages/<%= packageName %>/package.json
---
{
  "name": "@fire-cms/<%= packageName %>",
  "version": "0.0.2",
  "description": "> TODO: description",
  "author": "YutaUra <yuuta3594@outlook.jp>",
  "homepage": "https://github.com/YutaUra/fire-cms#readme",
  "license": "MIT",
  "main": "dist/cjs/index.js",
  "module": "dist/esm/index.js",
  "browser": "dist/umd/index.js",
  "types": "dist/types/index.d.ts",
  "directories": {},
  "files": [
    "dist"
  ],
  "publishConfig": {
    "access": "public"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/YutaUra/fire-cms.git"
  },
  "scripts": {
    "test": "echo \"Error: run tests from root\" && exit 1"
  },
  "bugs": {
    "url": "https://github.com/YutaUra/fire-cms/issues"
  }
}
