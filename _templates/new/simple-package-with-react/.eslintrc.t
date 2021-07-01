---
to: packages/<%= packageName %>/.eslintrc
---
{
  "extends": ["../../.eslintrc.react"],
  "parserOptions": {
    "project": "tsconfig.json",
    "tsconfigRootDir": "./"
  }
}
