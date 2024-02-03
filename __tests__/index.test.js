/**
 * Unit tests for the action's entrypoint, src/index.ts
 */

const { setup } = require('../src/main')

// Mock the action's entrypoint
jest.mock('../src/main', () => ({
  setup: jest.fn()
}))

describe('index', () => {
  it('calls run when imported', async () => {
    require('../src/index')

    expect(setup).toHaveBeenCalled()
  })
})
