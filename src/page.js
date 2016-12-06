import { By, until } from 'selenium-webdriver'
import { jsdom } from 'jsdom'

export class Page {
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

  async type (selector, text) {
    const el = await this.driver.findElement(By.css(selector))
    await el.sendKeys(text)
    await this.load()
  }

  async waitFor (selector, delay = 2000) {
    await this.driver.wait(until.elementLocated(By.css(selector)), delay)
    await this.load()
    return true
  }
}
