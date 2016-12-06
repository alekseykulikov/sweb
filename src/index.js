import 'chromedriver'
import { By, Builder } from 'selenium-webdriver'
import { jsdom } from 'jsdom'
import normalizeUrl from 'normalize-url'

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

class Page {
  constructor (driver) {
    this.driver = driver
  }

  async load () {
    const [pageUrl, pageSource] = await Promise.all([
      this.driver.getCurrentUrl(),
      this.driver.getPageSource()
    ])
    this.document = jsdom(pageSource)
    this.url = pageUrl
    this.source = pageSource
    this.title = this.document.title
  }

  async click (selector) {
    const el = await this.driver.findElement(By.css(selector))
    const { height, width } = await el.getSize()
    if (height === 0 || width === 0) {
      throw new Error(`"${selector}" is not visible: {height:${height}px,width:${width}px}`)
    }
    await this.driver.actions().click(el).perform()
    await this.load()
  }
}
