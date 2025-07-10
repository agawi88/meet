import puppeteer from 'puppeteer';


describe('show/hide event details', () => {

    let browser;
    let page;
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250, // slow down by 250ms,
            timeout: 0 // removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
        });
        page = await browser.newPage();
        await page.goto('http://localhost:5173/');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    }); 

// Scenario 1: An event element is collapsed by default.

    test('An event element is collapsed by default', async () => {
        const eventDetails = await page.$('.event-details');
        expect(eventDetails).toBeNull;
    });

    // Scenario 2:  the user clicks on the “Details” button, they should be shown extra details about the event.
    
    test('User can expand and event to see its details', async () => {
        await page.click('.event .details-btn');
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeDefined();
    });

    // Scenario 3: the user can hide the event details when clicking on the “Details” button again

    test('User can collapse an event to hide details', async () => {
        await page.click('.event .details-btn');
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
    });
});

describe('specify number of events', () => { 

});