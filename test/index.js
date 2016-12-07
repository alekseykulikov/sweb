/* eslint-env mocha */
import { expect } from 'chai'
import { Browser, Key } from '../src'

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

  it('supports url clicks', async () => {
    const page = await browser.open('example.com')
    await page.click('a')
    expect(page.url).equal('http://www.iana.org/domains/reserved')
  })

  it('supports type and wait', async () => {
    const page = await browser.open('https://www.google.com')
    await page.type('[name="q"]', `selenium webdriver npm${Key.ENTER}`)
    await page.waitFor('[href="https://www.npmjs.com/package/selenium-webdriver"]')
  })
})
