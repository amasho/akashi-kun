/**
 * usagee: yarn start [Company ID] [User ID] [Password]
 */
import { Browser, launch } from 'puppeteer'

export class EngravingAkashi {
  private companyId: string = ''
  private userId: string = ''
  private password: string = ''
  private browser: Browser

  constructor(param: string[]) {
    this.companyId = param[2]
    this.userId = param[3]
    this.password = param[4]

    launch({ headless: true }).then(o => {
      this.browser = o
      return this.main()
    })
  }

  async main() {
    if (!this.companyId || !this.userId || !this.password) {
      console.error('Error: parameter error. usage: yarn start [Company ID] [User ID] [Password]')
      return
    }

    const page = await this.browser.newPage()
    await page.setViewport({ width: 1200, height: 800 })

    await page.goto('https://atnd.ak4.jp/login')

    await page.type('input[id="form_company_id"]', this.companyId)
    await page.type('input[id="form_login_id"]', this.userId)
    await page.type('input[id="form_password"]', this.password)

    await page.click('input[type="submit"]')

    await page.waitForSelector('a[data-punch-type="attendance"]')

    await page.click('a[data-punch-type="attendance"]')

    await page.screenshot({ path: 'screenShotPage.png' })

    await this.browser.close()
  }
}

new EngravingAkashi(process.argv)
