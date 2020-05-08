const puppeteer = require("puppeteer");

const LOGIN_URL = "ログインURL";
const EFFORT_MANAGEMENT = "工数入力ページのURL";
const width = 1260,
  height = 800;

const newDate = new Date();
const month =
  10 < newDate.getMonth() + 1
    ? newDate.getMonth() + 1
    : `0${newDate.getMonth() + 1}`;
const day =
  10 < newDate.getDate() ? newDate.getDate() : `0${newDate.getDate()}`;

const today = `${newDate.getFullYear()}-${month}-${day}`;

(async () => {
  // 動作確認しやすいように操作を遅延させる
  const browser = await puppeteer.launch({ headless: false, slowMo: 300 });

  const page = await browser.newPage();
  await page.setViewport({ width, height });

  await page.goto(LOGIN_URL, { waitUntil: "domcontentloaded" });

  await page.type("#id", "id");
  await page.type("#id2", "id2");
  await page.type("#pass", "password");

  await page.click('input[type="submit"]');

  await page.goto(EFFORT_MANAGEMENT, { waitUntil: "domcontentloaded" });

  await page.waitFor(3000); // selecter が登場するまで待機

  await page.click(`a[href="/date=${today}"]`);

  await page.waitFor(3000); // selecter が登場するまで待機

  await page.select("#project", "1234");

  await page.click('button[add-project="[add-project-input]"]');

  await page.select("#task", "5678");

  await page.click('button[add-staff="5678"]');

  await page.type('input[name="project_hour_text"]', "7:45");

  await page.type('input[name="comment"]', "開発作業支援");

  await page.type('input[name="staff_comment"]', "開発作業支援");

  await page.focus('input[disided="決定"]');

  await page.waitFor(3000);

  browser.close();
})().catch((e) => console.log(e));
