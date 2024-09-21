const { chromium } = require('playwright');

const info = (startDate, endDate, terms) => {
    return chromium.launch({ headless: false }).then(browser => {
        return browser.newContext().then(context => {
            return context.newPage().then(page => {
                return page.goto('https://www.gob.pe/institucion/mincetur/colecciones/843-certificacion-ambiental-resoluciones-directorales-emitidas?filter%5Bend_date%5D=&amp;filter%5Bstart_date%5D=&amp;filter%5Bterms%5D=&amp;sheet=4')
                    .then(() => page.click('#filter_start_date'))
                    .then(() => page.fill('#filter_start_date', startDate))
                    .then(() => page.waitForTimeout(550))
                    .then(() => page.click('#filter_end_date'))
                    .then(() => page.fill('#filter_end_date', endDate))
                    .then(() => page.waitForTimeout(550))
                    .then(() => page.type('#filter_terms', terms, { delay: 102 }))
                    .then(() => page.waitForTimeout(550))
                    .then(() => page.waitForSelector('.js-official-documents-search-loader', { state: 'hidden' }))
                    .then(() => page.$$eval('a.leading-6.font-bold', links => {
                        return links.map(link => ({
                            text: link.innerText,    
                            href: link.href       
                        }));
                    }))
                    .then(linksArray => {
                        return linksArray;
                    })
                    .finally(() => {
                        return browser.close();
                    });
            });
        });
    }).catch(error => {
        console.error("Error:", error);
    });
}

module.exports = {
    info
};
