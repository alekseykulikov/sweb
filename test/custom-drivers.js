/* eslint-env mocha */
import 'geckodriver'
import { expect } from 'chai'
import { Browser, Builder } from '../src'

describe('sweb/custom-drivers', () => {
  let browser
  afterEach(() => {
    if (browser) browser.quit()
  })

  it('opens example.com in Firefox', async () => {
    browser = new Browser({ driver: new Builder().forBrowser('firefox').build() })
    const page = await browser.open('http://example.com')
    expect(page.title).equal('Example Domain')
  })
})
