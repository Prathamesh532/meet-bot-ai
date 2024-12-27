import {
  Builder,
  Browser,
  By,
  Key,
  until,
  WebDriver,
} from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";

async function meetBot(driver: WebDriver) {
  try {
    // targeted url -- metting link
    await driver.get("https://meet.google.com/afm-fjzz-vkg");

    // to target the Got it PopUp and click to close
    const gotItButton = await driver.wait(
      until.elementLocated(By.xpath('//span[contains(text(), "Got it")]')),
      10000
    );

    await gotItButton.click();

    // tageting the input for setting up the name
    const nameInput = await driver.wait(
      until.elementLocated(By.xpath('//input[@placeholder="Your name"]')),
      2000
    );
    await nameInput.clear();
    await nameInput.click();
    await nameInput.sendKeys("value", "Meeting bot");

    await driver.sleep(1000);

    // targeting the Join button -- TODO condition for Join Now
    const joinButton = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//span[contains(text(), "Ask to join") or contains(text(), "Join now")]'
        )
      ),
      10000
    );
    await joinButton.click();
  } finally {
    // await driver.quit();
  }
}

const getDriver = async () => {
  const options = new Options({});
  options.addArguments("--disable-blink-features=AutomationControlled"); // prevent to trigger the anti-bot measures / block automated interactions on chromium
  options.addArguments("--use-fake-ui-for-media-stream"); // to bypass the user prompts like use media device (in meetBot case the prompt of microphone and camera)
  // options.addArguments("--disable-web-security");
  // options.addArguments("--use-fake-device-for-media-stream"); // to bypass the user prompts like use media device (in meetBot case the prompt of microphone and camera)
  // instance for the driver with EDGE and options
  // options.addArguments("--disable-features=IsolateOrigins,site-per-process");

  let driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();

  return driver;
};

async function main() {
  const driver = await getDriver();
  await meetBot(driver);
}

main();
