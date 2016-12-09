import 'chromedriver'
import { Builder } from 'selenium-webdriver'
import normalizeUrl from 'normalize-url'
import { join } from 'path'
import { Page } from './page'

export class Browser {
  constructor ({ tmpDir, screenhostOnError } = {}) {
    this.driver = new Builder().forBrowser('chrome').build()
    this.tmpDir = tmpDir || join(process.cwd(), 'tmp')
    this.screenhostOnError = screenhostOnError || false
  }

  async open (url) {
    await this.driver.get(normalizeUrl(url))
    const page = new Page(this)
    await page.load()
    return page
  }

  async quit () {
    await this.driver.quit()
  }
}

export { Key } from 'selenium-webdriver'
