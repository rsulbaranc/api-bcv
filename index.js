const pupeeteer = require('puppeteer');

(async () => {
    const browser = await pupeeteer.launch({
        headless: false,
        defaultViewport: null,
        slowMo: 0
    });
    const page = await browser.newPage();
    await page.goto('https://www.bcv.org.ve/');

    await page.waitForSelector('.centrado');

    const monedas = await page.evaluate(() => {
        const items = document.querySelectorAll(".centrado");

        const arr = [];

        for (let item of items) {
            let tasa = item.innerText;
            tasa = tasa.replace(',', '.');
            arr.push(Number(tasa));
        }

        return arr;
    });

    const fecha = await page.evaluate(() => {
        const item = document.querySelector(".dinpro");
        return item.innerText;
    });
    //await page.screenshot({ path: 'google.png' });
    let [EUR, CNY,TRY, RUB, USD] = monedas;
    // console.log(`1 EUR = ${EUR} Bs`);
    // console.log(`1 CNY = ${CNY} Bs`);
    // console.log(`1 TRY = ${TRY} Bs`);
    // console.log(`1 RUB = ${RUB} Bs`);
    // console.log(`1 USD = ${USD} Bs`);

    console.log(`La tasa del dia es: ${USD}`);
    console.log(`Tienes que pagar: ${75.9*USD}`)
    console.log(`${fecha}`);

    await browser.close();
})();