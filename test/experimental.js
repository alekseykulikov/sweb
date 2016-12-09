/* eslint-env mocha */
import { expect } from 'chai'
import { Browser } from '../src'

describe('sweb/experimental', () => {
  let browser
  before(() => { browser = new Browser() })
  after(() => browser.quit())

  it('waitFor throws a custom error', async () => {
    const page = await browser.open('example.com')
    try {
      await page.waitFor('.some-selector', 500)
      throw new Error('waitFor should throw an error')
    } catch (err) {
      expect(err.message).equal('Wait timed out for ".some-selector" after 500ms')
    }
  })
})
