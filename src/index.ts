/**
 * usagee: yarn start [Company ID] [User ID] [Password]
 */
import { Browser, Page, launch } from 'puppeteer'

export class EngravingAkashi {
  private companyId: string = ''
  private userId: string = ''
  private password: string = ''
  private browser: Browser
  private page: Page

  constructor(param: string[]) {
    this.companyId = param[2]
    this.userId = param[3]
    this.password = param[4]
  }

  async main() {
    this.browser = await launch()
    this.page = await this.browser.newPage()

    await this.page.goto('https://atnd.ak4.jp/login')

    await this.page.type('input[id="form_company_id"]', this.companyId)
    await this.page.type('input[id="form_login_id"]', this.userId)
    await this.page.type('input[id="form_password"]', this.password)

    this.page.click('input[type="submit"]')

    await this.page.waitForNavigation()

    await this.page.screenshot({ path: 'screenShotPage.png' })

    await this.browser.close()
  }
}

if (!process.argv[2] || !process.argv[3] || !process.argv[4]) {
  console.error('Error: parameter error. usage: yarn start [Company ID] [User ID] [Password]')
} else {
  const akashi = new EngravingAkashi(process.argv)
  akashi.main()
}
