---
to: packages/<%= packageName %>/jest.config.js
---
const pkg = require('./package.json')

module.exports = {
  displayName: pkg.name,
  name: pkg.name,
  preset: 'ts-jest',
}
