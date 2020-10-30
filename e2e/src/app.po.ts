import { browser, by, element } from 'protractor';

export class AppPage {
  // eslint-disable-next-line class-methods-use-this
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  // eslint-disable-next-line class-methods-use-this
  getTitleText() {
    // eslint-disable-next-line max-len
    return element(by.css('app-root .mat-card h1')).getText() as Promise<
      string
    >;
  }
}
