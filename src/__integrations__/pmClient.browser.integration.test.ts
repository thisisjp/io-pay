// import { debug } from 'console';
import { Server } from 'http';

import { Browser, launch } from 'puppeteer';
import { createHttpTerminator, HttpTerminator } from 'http-terminator';
import express from 'express';
import pmBad from './pmBad';

/**
 * This test suite tests the autogenerated client for PM in a browser
 * environment. The browser fetches index.html from the DevServer, which serves
 * from localhost:1235. When the DOM is loaded, a script inside index.html is
 * executed. The script creates a new instance of PM Client, configured with a
 * retryable fetch, to interact with the Bad PM on localhost:9666.
 * The Bad PM replies 429 to start-session POST, so the PM Client should retry
 * start-session many times. That way also the retryable fetch gets tested
 */
describe('PM Client', () => {
  const PORT = 1235;
  const HOST = 'localhost';

  // eslint-disable-next-line functional/no-let
  let myDevServer: Server;
  // eslint-disable-next-line functional/no-let
  let pmBadServer: Server;
  // eslint-disable-next-line functional/no-let
  let devServerTerminator: HttpTerminator;
  // eslint-disable-next-line functional/no-let
  let pmBadTerminator: HttpTerminator;

  // eslint-disable-next-line functional/no-let
  let myBrowser: Browser;

  beforeAll(() => {
    // Start server
    const myServer = express().use('/', express.static('testCases'));
    myDevServer = myServer.listen(PORT, HOST);
    devServerTerminator = createHttpTerminator({ server: myDevServer });

    pmBadServer = pmBad.listen(9666, 'localhost');
    pmBadTerminator = createHttpTerminator({ server: pmBadServer });
  });

  afterAll(async () => {
    await Promise.all([pmBadTerminator.terminate(), devServerTerminator.terminate()]);
  });

  beforeEach(async () => {
    myBrowser = await launch({ headless: true });
  });

  afterEach(async () => {
    await myBrowser.close();
  });

  it('should retry 3 times on start-session', async () => {
    const pmTab = await myBrowser.newPage();

    // eslint-disable-next-line functional/no-let
    let requestCounter = 0;

    // Intercept requests to count calls to start-session
    await pmTab.setRequestInterception(true);
    pmTab.on('request', async request => {
      if (request.method() === 'OPTIONS') {
        requestCounter++;
      }
      await request.continue();
    });

    const serverResponse = await pmTab.goto('http://localhost:1235/index.html');

    await new Promise(resolve => setTimeout(resolve, 4000));

    expect(serverResponse?.status()).toEqual(200);
    expect(requestCounter).toEqual(3);

    await pmTab.close();
  });
});

describe('Data Submission Form', () => {
  const PORT = 1234;
  const HOST = 'localhost';

  // eslint-disable-next-line functional/no-let
  let myDevServer: Server;
  // eslint-disable-next-line functional/no-let
  let devServerTerminator: HttpTerminator;
  // eslint-disable-next-line functional/no-let
  let myBrowser: Browser;

  beforeAll(() => {
    // Start server
    const myServer = express().use('/', express.static('dist'));
    myServer.get('/health-check', function (_, res) {
      res.sendStatus(200);
    });
    myDevServer = myServer.listen(PORT, HOST);
    devServerTerminator = createHttpTerminator({ server: myDevServer });
  });

  afterAll(async () => {
    await devServerTerminator.terminate();
  });

  beforeEach(async () => {
    myBrowser = await launch({ headless: true });
    // Health check
    const page = await myBrowser.newPage();
    const serverResponse = await page.goto(`http://${HOST}:${PORT}/health-check`);
    expect(serverResponse?.status()).toEqual(200);
    await page.close();
  });

  afterEach(async () => {
    await myBrowser.close();
  });

  it('should call start session, when Continua is pressed', async () => {
    // PRECONDITIONS
    const pmTab = await myBrowser.newPage();
    const [pmResponseApiDocs] = await Promise.all([
      pmTab.waitForResponse(response => response.request().method() === 'GET'),
      await pmTab.goto('http://localhost:8080/pp-restapi/v2/api-docs'),
    ]);

    expect(pmResponseApiDocs?.status()).toEqual(200);
    await pmTab.close();

    const page = await myBrowser.newPage();

    await page.goto(`http://${HOST}:${PORT}/index.html?p=6666`);
    await page.setViewport({ width: 1200, height: 907 });

    // Fill the form
    const creditCardHolderFieldS = '#creditcardname';
    await page.waitForSelector(creditCardHolderFieldS);
    await page.focus(creditCardHolderFieldS);
    await page.keyboard.type('Luigi XIV');

    const creditCardPANFieldS = '#creditcardnumber';
    await page.waitForSelector(creditCardPANFieldS);
    await page.focus(creditCardPANFieldS);
    await page.keyboard.type('4024007182788397');

    const creditCardExpDateFieldS = '#creditcardexpirationdate';
    await page.waitForSelector(creditCardExpDateFieldS);
    await page.focus(creditCardExpDateFieldS);
    await page.keyboard.type('01/25');

    const creditCardSecurCodeFieldS = '#creditcardsecurcode';
    await page.waitForSelector(creditCardSecurCodeFieldS);
    await page.focus(creditCardSecurCodeFieldS);
    await page.keyboard.type('666');

    const privacyToggleS = '#creditcardform #privacyToggler';
    await page.waitForSelector(privacyToggleS);
    await page.click(privacyToggleS);

    const buttonS = '#creditcardform > .windowcont__bottom > .container > .windowcont__bottom__wrap > .btn-primary';
    await page.waitForSelector(buttonS);

    const serverResponse = await Promise.all([
      page.waitForResponse(response => response.request().method() === 'OPTIONS'),
      page.waitForResponse(response => response.request().method() === 'POST'),
      page.click(buttonS),
    ]);

    expect(serverResponse[0]?.headers()['access-control-allow-origin']).toEqual(`http://${HOST}:${PORT}`);
    await expect(serverResponse[1]?.json()).resolves.toMatchObject({ data: { user: { email: 'pippo@pluto.com' } } });

    await page.close();
  });
});
