const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

async function scrapeAmazonWithPuppeteer(url) {
  // 启动一个无头浏览器
  const browser = await puppeteer.launch();

  // 打开一个新页面
  const page = await browser.newPage();

  await page.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    'Cookie': 'session-id=135-2740894-7597127; i18n-prefs=USD; ubid-main=130-8094137-1673046; lc-main=en_US; skin=noskin; session-id-time=2082787201l; kndctr_7742037254C95E840A4C98A6_AdobeOrg_identity=CiYwNTgzMDk3NzIzNzM3MTI4NjMyNDE2NTEyNTYwNjM1MTUxMDM4NVIRCJyt9tjSMRgBKgRTR1AzMAHwAZyt9tjSMQ==; AMCV_7742037254C95E840A4C98A6%40AdobeOrg=MCMID|05830977237371286324165125606351510385; JSESSIONID=BE4328E0B83A1B1656FACDCF55DE592A; csm-hit=tb:YHB13XZ5TBTSKGNG06P7+s-4SMSTCWET8342QXK4G82|1707113236506&t:1707113236506&adb:adblk_no; session-token=ESIxRUw6l2sUSPYFQm2KvVDcwmImIV98l3zY9LUZgLy/vzmyik+X9otGDi5eJp92GcrFHQG18FxTzb4mbFclfW+bVGJhHCAuqkkh5oULg/ap+4Gy01co60y27fzCGfyeDOer0fSu1n5oc8lXWQuphYNhrhxm6GDv2tRAIKvkUNXs5gv/t0SYP1iKlZrzmCdm1qYxTspsZORdH2meuwERKIKN5UIBjwJcQrL1HXIaAdW3+1Hyz5g5/F8ezMBnVdq67MxSmu3J0en447F9FgMa5ZWQLPR44vAzL48NorBO7pjbWbTqyAPxIN5VyTO4L3RiHyZ3jz/px06bcd/WuBybNVfccoZ/Jw9a',

  });

  // 访问 Amazon 商品列表页
  await page.goto(url);

  // 等待动态加载完成
  await page.waitForSelector('ul.a-spacing-mini li.a-spacing-mini span.a-list-item');

  // 获取页面内容
  const content = await page.content();
  const $ = cheerio.load(content);
  const titles = []
  // const titles = $('ul.a-spacing-mini li.a-spacing-mini span.a-list-item').text();
  $('ul.a-spacing-mini li.a-spacing-mini span.a-list-item').each(function(index, element) {
    titles.push($(element).text());
  });
  // 关闭浏览器
  await browser.close();

  console.log('Amazon Product Titles:', titles)

}

// const getOptions = {
//   'method': 'GET',
//   'authority': 'www.amazon.com',
//   'path': '/dp/B0CQK8W3ZL',
//   'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
//   // 'scheme': 'https',
//   // 'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
//   // 'accept-encoding': 'gzip, deflate, br',
//   // 'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
//   // 'cache-control': 'max-age=0',
//   // 'cookie': 'session-id=135-2740894-7597127; i18n-prefs=USD; ubid-main=130-8094137-1673046; lc-main=en_US; skin=noskin; session-id-time=2082787201l; kndctr_7742037254C95E840A4C98A6_AdobeOrg_identity=CiYwNTgzMDk3NzIzNzM3MTI4NjMyNDE2NTEyNTYwNjM1MTUxMDM4NVIRCJyt9tjSMRgBKgRTR1AzMAHwAZyt9tjSMQ==; AMCV_7742037254C95E840A4C98A6%40AdobeOrg=MCMID|05830977237371286324165125606351510385; JSESSIONID=BE4328E0B83A1B1656FACDCF55DE592A; csm-hit=tb:YHB13XZ5TBTSKGNG06P7+s-4SMSTCWET8342QXK4G82|1707113236506&t:1707113236506&adb:adblk_no; session-token=ESIxRUw6l2sUSPYFQm2KvVDcwmImIV98l3zY9LUZgLy/vzmyik+X9otGDi5eJp92GcrFHQG18FxTzb4mbFclfW+bVGJhHCAuqkkh5oULg/ap+4Gy01co60y27fzCGfyeDOer0fSu1n5oc8lXWQuphYNhrhxm6GDv2tRAIKvkUNXs5gv/t0SYP1iKlZrzmCdm1qYxTspsZORdH2meuwERKIKN5UIBjwJcQrL1HXIaAdW3+1Hyz5g5/F8ezMBnVdq67MxSmu3J0en447F9FgMa5ZWQLPR44vAzL48NorBO7pjbWbTqyAPxIN5VyTO4L3RiHyZ3jz/px06bcd/WuBybNVfccoZ/Jw9a',
  
// }

// 你可以替换为实际的 Amazon 商品列表页 URL
const amazonListingUrl = 'https://www.amazon.com/dp/B0BM4724DR';
scrapeAmazonWithPuppeteer(amazonListingUrl);
