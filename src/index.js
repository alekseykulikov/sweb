import 'chromedriver'
import { Key, Builder } from 'selenium-webdriver'
import normalizeUrl from 'normalize-url'
import { join } from 'path'
import { Page } from './page'

export class Browser {
  constructor ({ workDir, screenhostOnError, driver } = {}) {
    this.driver = driver || new Builder().forBrowser('chrome').build()
    this.workDir = workDir || join(process.cwd(), '.sweb')
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

export { Key, Builder }
