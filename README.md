# sweb

[![](https://circleci.com/gh/alekseykulikov/sweb.svg?style=svg)](https://circleci.com/gh/alekseykulikov/sweb)
[![](https://img.shields.io/npm/v/sweb.svg)](https://npmjs.org/package/sweb)
[![](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

> High-level abstraction for selenium-webdriver

**Features**:
- Built with [Selenium v3](https://seleniumhq.wordpress.com/2016/10/13/selenium-3-0-out-now/) and [W3C WebDriver](https://www.w3.org/TR/webdriver/)
- Supports DOM API to explore page structure (via [jsdom](https://github.com/tmpvar/jsdom))
- No setup: built in Chrome support (via [chromedriver](https://github.com/giggio/node-chromedriver))
- Flexibility: integrates with any test framework or node script.

## Example

Smoke test for http://example.com
using [mocha](https://mochajs.org/) and [chai](http://chaijs.com/).

```js
import { expect } from 'chai'
import { Browser } from 'sweb'

describe('smoke-tests', () => {
  let browser
  before(() => { browser = new Browser() })
  after(() => { browser.quit() })

  it('opens example.com', async () => {
    const page = await browser.open('example.com')
    expect(page.url).equal('http://example.com/')
    expect(page.title).equal('Example Domain')
    expect(page.document.links).length(1)
    expect(page.document.querySelector('a').href).equal('http://www.iana.org/domains/example')
    await page.click('a')
    expect(page.url).equal('http://www.iana.org/domains/reserved')
  })
})
```

## Installation

Requires node >= 6.9 (because of [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver#projected-support-schedule))

    $ yarn add -D sweb
    $ npm i -D sweb

## API

### new Browser()

Creates new `Browser` browser.

### await browser.open(url)

Load `url` in browser and return `Page` instance.

`Page` instance has useful properties:
- `url` - page url
- `document` - similar to `window.document`, it's a [jsdom](https://github.com/tmpvar/jsdom) instance with support of all DOM API methods.
- `title` - page title
- `source` - page html source
- `driver` - [WebDriver instance](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_WebDriver.html)

### await page.click(selector)

Perform click event to `selector`.

### await page.type(selector, text)

Send user type input (combination of keydown, keypress, keyup for each character) to `selector` with `text`.
To emulate special keys like ENTER or F12 use [`Key`](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_Key.html).

```js
import { Browser, Key } from 'sweb'

const browser = new Browser()
const page = await browser.open('https://www.google.com')
await page.type('[name="q"]', `selenium webdriver npm${Key.ENTER}`)
```

### await page.waitFor(selector, delay = 2000)

Wait for `selector` appears in html.

### await page.screenshot(name)

Make screenshot of the page and store to `${cwd}/tmp/${name}.png`.

### browser.quit()

Quit real browser.

## LICENSE

[MIT](./LICENSE)
