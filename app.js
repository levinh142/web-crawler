const puppeteer = require('puppeteer');

let startingUrl = 'https://batdongsan.com.vn/ban-can-ho-chung-cu-tp-hcm';
let urls = [];
(async() => {
    const browser = await puppeteer.launch({ hedadless: true});
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 926});
    await page.goto(startingUrl);

    //get hotel deals
    let adsData = await page.evaluate(() => {
        //get all the pages
        let page = document.querySelector('div.background-pager-right-controls');
        let pageElms = page.querySelectorAll('a');
        pageElms.foreach((pageElm) => {
            let url = pageElm.getAttribute('href');
            if (url != null)
            {
                urls.push(url);
                console.log("URL: " + url);
            }
        });

        return urls;

        // //loop through url
        // urls.foreach(async(url2) => {
        //     await page.goto(url2);
        //     let ads = [];
        //     //get hotel elements
        //     let adsElms = document.querySelectorAll('div.search-productItem');
        //     //get hotel data
        //     adsElms.forEach((adsElement) => {
        //         let adsJson = {};
        //         try {
        //             adsJson.title = adsElement.querySelector('div.p-title').innerText;
        //             adsJson.price = adsElement.querySelector('strong.product-price').innerText;
        //             adsJson.area = adsElement.querySelector('strong.product-area').innerText;
        //             adsJson.district = adsElement.querySelector('strong.product-city-dist').innerText;
                    
        //             var dateElm = adsElement.querySelector('div.floatright');
        //             adsJson.date = dateElm.querySelector('span').innerText;
        //         }
        //         catch (exception) {
        //             console.log("Error: " + exception.message);
        //         }
        //         ads.push(adsJson);
        //     });
        // });
        
        // return ads;
    });
    // console.dir(adsData);
    console.dir(urls);
})();