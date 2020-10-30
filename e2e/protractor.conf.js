/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
/* eslint-disable indent */
/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  specs: ['./src/**/*.e2e-spec.ts'],
  capabilities: {
    browserName: 'chrome',
    useAutomationExtension: false,
    args: [
      '--disable-gpu',
      '-disable-dev-shm-usage',
      '--no-sandbox',
      '-disable-popup-blocking',
      '--start-maximized',
      '--disable-web-security',
      '--allow-running-insecure-content',
      '--disable-infobars',
    ],
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print() {},
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json'),
    });
    // @ts-ignore
    // @ts-ignore
    const jasmineReporters = require('jasmine-reporters');
    jasmine.getEnv().addReporter(
      new jasmineReporters.JUnitXmlReporter({
        consolidateAll: true,
        filePrefix: 'report.xml',
        savePath: './protractor-report',
      })
    );
  },
  /** Creo reporte html con protractor */
  onComplete() {
    let browserName;
    let browserVersion;
    // @ts-ignore
    const capsPromise = browser.getCapabilities();
    capsPromise.then(function (caps) {
      browserName = caps.get('browserName');
      browserVersion = caps.get('version');
      // @ts-ignore
      platform = caps.get('platform');
      // @ts-ignore
      const HTMLReport = require('protractor-html-reporter-2');
      /** Configuro la salida */
      const e2eConfig = {
        reportTitle: 'Protractor Test Execution Report',
        outputPath: './protractor-report',
        outputFilename: 'ProtractorTestReport',
        screenshotPath: './protractor-report/screenshots',
        testBrowser: browserName,
        browserVersion,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: true,
        // @ts-ignore
        testPlatform: platform,
      };
      // @ts-ignore
      new HTMLReport().from('./protractor-report/report.xml', e2eConfig);
    });
  },
};
