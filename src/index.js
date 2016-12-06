import 'chromedriver'
import { Builder } from 'selenium-webdriver'
import { jsdom } from 'jsdom'
import normalizeUrl from 'normalize-url'

export class Browser {
  constructor () {
    this.driver = new Builder().forBrowser('chrome').build()
  }

  async open (url) {
    await this.driver.get(normalizeUrl(url))
    const [pageUrl, pageSource] = await Promise.all([
      this.driver.getCurrentUrl(),
      this.driver.getPageSource()
    ])
    const page = new Page(this.driver, pageUrl, pageSource)
    return page
  }

  quit () {
    this.driver.quit()
  }
}

class Page {
  constructor (driver, pageUrl, pageSource) {
    this.driver = driver
    this.document = jsdom(pageSource)
    this.url = pageUrl
    this.title = this.document.title
  }
}
