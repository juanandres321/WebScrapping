const { chromium } = require('playwright');

chromium.launch({ headless: false }).then(browser => {
    return browser.newContext().then(context => {
        return context.newPage().then(page => {
            return page.goto('https://www.gob.pe/institucion/mincetur/colecciones/843-certificacion-ambiental-resoluciones-directorales-emitidas?filter%5Bend_date%5D=&amp;filter%5Bstart_date%5D=&amp;filter%5Bterms%5D=&amp;sheet=4')
                .then(() => page.waitForTimeout(500))
                .then(() => page.click('#filter_start_date'))
                .then(() => page.fill('#filter_start_date', '2019-09-20'))
                .then(() => page.waitForTimeout(550))
                .then(() => page.click('#filter_end_date'))
                .then(() => page.fill('#filter_end_date', '2024-09-20'))
                .then(() => page.waitForTimeout(550))
                .then(() => page.type('#filter_terms', 'A', { delay: 102 }))
                .then(() => page.waitForTimeout(540))
                .then(() => page.waitForSelector('a.leading-6.font-bold'))
                .then(() => page.$$eval('a.leading-6.font-bold', links => {
                    return links.map(link => ({
                        text: link.innerText,    
                        href: link.href       
                    }));
                }))
                .then(linksArray => {
                    console.log('Enlaces encontrados:', linksArray);
                });
        });
    });
}).catch(error => {
    console.error("Error:", error);
});
