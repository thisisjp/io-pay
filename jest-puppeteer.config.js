module.exports = {
  launch: {
    dumpio: true,
    headless: process.env.HEADLESS !== 'false',
    args: ['--disable-gpu'],
  },
  browser: 'chromium',
  browserContext: 'default',
};
