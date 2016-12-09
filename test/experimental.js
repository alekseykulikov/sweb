/* eslint-env mocha */
import { expect } from 'chai'
import { join } from 'path'
import { remove as removeDir, readdir } from 'fs-promise'
import { Browser } from '../src'

describe('sweb/experimental', () => {
  const tmpDir = join(process.cwd(), 'tmp')
  let browser
  after(async () => {
    await browser.quit()
    await removeDir(tmpDir)
  })

  it('waitFor throws a custom error and save screenshot', async () => {
    browser = new Browser({ screenhostOnError: true })
    expect(browser.screenhostOnError).true
    expect(browser.tmpDir).equal(tmpDir)

    const page = await browser.open('example.com')
    try {
      await page.waitFor('.some-selector', 500)
      throw new Error('waitFor should throw an erro')
    } catch (err) {
      expect(err.message).equal('Wait timed out for ".some-selector" after 500ms')
      expect(await readdir(tmpDir)).eql(['screenshot.png'])
    }
  })
})
