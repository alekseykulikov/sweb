# sweb

> High-level abstraction for selenium-webdriver

**Features**:
- Uses [Selenium@3](https://seleniumhq.wordpress.com/2016/10/13/selenium-3-0-out-now/) with [WebDriver](https://www.w3.org/TR/webdriver/)
- Supports DOM API to explore page structure (via jsdom)
- No setup: built in chrome support
- Flexibility: integrates with any test framework

## Install

    $ npm i -D sweb
    $ yarn add -D sweb

## Example

Smoke test for http://example.com
with [mocha](https://mochajs.org/) and [chai](http://chaijs.com/).

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
  })
})
```

## API

### new Browser()

Creates new `Browser` browser.

### browser.open(url)

Load `url` in browser and return `Page` instance.
Page instance has properties:
- `url` - current location origin
- `title` - page title
- `document` - similar to `window.document`, it's a [jsdom](https://github.com/tmpvar/jsdom) instance
  and supports all methods to work with DOM API.
- `driver` - [WebDriver Instance](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_WebDriver.html)

### browser.quit()

Quit browser.

## LICENSE

[MIT](./LICENSE)
