import 'chromedriver'
import { Builder } from 'selenium-webdriver'
import normalizeUrl from 'normalize-url'
import { Page } from './page'

export class Browser {
  constructor () {
    this.driver = new Builder().forBrowser('chrome').build()
  }

  async open (url) {
    await this.driver.get(normalizeUrl(url))
    const page = new Page(this.driver)
    await page.load()
    return page
  }

  quit () {
    this.driver.quit()
  }
}
