import puppeteer from 'puppeteer';
// Feature 1

describe('Filter Events by City', () => {

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

    test('When user hasn’t searched for a city, show upcoming events from all cities.', async () => {
        const events = await page.$$('.event');
        expect(events.length).toBe(32);
    });

    test('User should see a list of suggestions when they search for a city.', async () => {
        await page.type('#city-search input', 'Berlin');
        await page.waitForSelector('.suggestions li');

        const suggestions = await page.$$eval('.suggestions li', nodes =>
            nodes.map(n => n.textContent)
        );

        expect(suggestions.length).toBeGreaterThan(0);
        /* expect(suggestions[0].toMatch(/Berlin/i)); */
    });

    test('User can select a city from the suggested list.', async () => {
        await page.type('#city-search input', 'Berlin');
    
        await page.waitForSelector('.suggestions li');
    
        const berlinSuggestion = await page.$('.suggestions li');
        await berlinSuggestion.click();
    
        await page.waitForSelector('.event');
    
        const filteredEvents = await page.$$eval('.event .event-location', nodes =>
          nodes.map(node => node.textContent)
        );
            filteredEvents.forEach(location => {
          expect(location).toMatch(/Berlin/i);
        });    
    });
});

// Feature 2

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

    test('Default number of events displayed', async () => {
        const events = await page.$$('.event');
        expect(events.length).toBe(32);
    });

    test('User specifies the number of events they want to see', async () => {
        await page.click('#events-number input');
        await page.keyboard.press('Backspace');  
        await page.type('input[type="number"]', '5');
        await page.keyboard.press('Enter');

        await page.waitForFunction(() => {
            return document.querySelectorAll('.event').length === 5;
        }, { timeout: 90000 });

        const updatedEvents = await page.$$('.event');

        expect(updatedEvents.length).toBe(5);
    });
});