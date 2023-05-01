const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('http://localhost:5173/');
    await page.goto('http://localhost:5173/viewLocations')
	console.log("Looks good :)")
	await browser.close();
})();
