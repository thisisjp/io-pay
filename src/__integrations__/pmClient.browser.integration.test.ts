// import { debug } from 'console';
import { Server } from 'http';

import { Browser, launch } from 'puppeteer';
import { createHttpTerminator, HttpTerminator } from 'http-terminator';
import devServer from './devServer';

describe('Data Submission Form', () => {
  const PORT = 5000;
  const HOST = 'localhost';

  // eslint-disable-next-line functional/no-let
  let myDevServer: Server;
  // eslint-disable-next-line functional/no-let
  let devServerTerminator: HttpTerminator;
  // eslint-disable-next-line functional/no-let
  let myBrowser: Browser;

  beforeAll(() => {
    // Start server
    myDevServer = devServer.listen(PORT, HOST);
    devServerTerminator = createHttpTerminator({ server: myDevServer });
  });

  afterAll(async () => {
    await devServerTerminator.terminate();
  });

  beforeEach(async () => {
    myBrowser = await launch({ headless: false });
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
    // Start the browser environment
    const page = await myBrowser.newPage();

    await page.goto(`http://${HOST}:${PORT}/index.html?p=1234`);
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
    await page.click(buttonS);

    await page.close();
  });
});
