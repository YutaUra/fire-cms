---
to: packages/<%= packageName %>/__tests__/index.test.ts
---
import example from '../src'

describe('@fire-cms/<%= packageName %>', () => {
  it('needs tests', () => {
    example()
  })
})
