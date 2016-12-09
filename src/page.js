import { By, until } from 'selenium-webdriver'
import { jsdom } from 'jsdom'
import { join } from 'path'
import { writeFileSync as writeFile } from 'fs'

export class Page {
  constructor (browser) {
    this.browser = browser
    this.driver = browser.driver
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

  async waitFor (selector, delay = 10000) {
    try {
      await this.driver.wait(until.elementLocated(By.css(selector)), delay)
    } catch (err) {
      throw new Error(`Wait timed out for "${selector}" after ${delay}ms`)
    }
    await this.load()
  }

  async screenshot (name = 'screenshot') {
    const base64Data = await this.driver.takeScreenshot()
    writeFile(join(this.browser.tmpDir, `${name}.png`), base64Data, 'base64')
  }
}
