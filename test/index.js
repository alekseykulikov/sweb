/* eslint-env mocha */
import { expect } from 'chai'
import { Browser } from '../src'

describe('sweb', () => {
  let browser
  before(() => { browser = new Browser() })
  after(() => { browser.quit() })

  it('opens example.com', async () => {
    const page = await browser.open('example.com')
    expect(page.url).equal(`http://example.com/`)
    expect(page.title).equal('Example Domain')
    expect(page.document.links).length(1)
    expect(page.document.querySelector('a').href).equal('http://www.iana.org/domains/example')
    expect(page.source).contains('<!DOCTYPE html>')
  })

  it('support url clicks', async () => {
    const page = await browser.open('example.com')
    await page.click('a')
    expect(page.url).equal('http://www.iana.org/domains/reserved')
  })
})
