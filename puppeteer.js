const puppeteer = require('puppeteer');
const fs = require('fs');

function delay(time) {
	return new Promise(function (resolve) {
		setTimeout(resolve, time);
	});
}

(async () => {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	await page.coverage.startJSCoverage();
	await page.goto('http://127.0.0.1:5500/index.html');

	await delay(3000);
	const jsCoverage = await page.coverage.stopJSCoverage();
	fs.writeFileSync('puppeteer-module.json', JSON.stringify(jsCoverage));
	await browser.close();
})();
