import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');
let AppComponent;
let AppDOM;
let user;
let firstEvent;

defineFeature(feature, test => {

    // Scenario 1
    test('An event element is collapsed by default.', ({ given, when, and, then }) => {
        given('a user is searching for an event,', () => {
        });

        when('the user opens the app,', () => {
            AppComponent = render(<App />);
        });

        and('choses a particular city from the suggestions list,', () => {

        });

        then('the events details should be hidden, showing just the most vital info.', async () => {

            await waitFor(() => {
                const eventDetails = AppComponent.queryByTestId('event-details');
                expect(eventDetails).toBeNull();
            });
        });
    });

    // Scenario 2

    test('User can expand and event to see its details.', ({ given, when, then }) => {
        given('a user has opened the app and found an interesting event,', () => {
            AppComponent = render(<App />);
        });

        when('they click on the "Show details" button,', async () => {
            user = userEvent.setup();
            const button = AppComponent.container.querySelector('.event .details-btn');
            await user.click(button);
        });

        then('the events details will expand.', async () => {

            await waitFor(() => {
                const eventDetails = AppComponent.queryByTestId('.event-details');
                expect(eventDetails).toBeDefined();
            });
        });
    });
    
    // Scenario 3
    test('User can collapse an event to hide details.', ({ given, and, when, then }) => {
        given('a user has opened the app and found an interesting event,', async () => {
            AppComponent = render(<App />);
            user = userEvent.setup();
            const AppDOM = AppComponent.container.firstChild;

            await waitFor(() => {
               const testEvent = AppDOM.querySelector('.event');
                expect(testEvent).toBeInTheDocument();
            });

            const firstEvent = AppDOM.querySelector('.event');
            const button = firstEvent.querySelector('.details-btn');
            await user.click(button);
        });
     
        and('they have finished reading the expanded event details of the chosen event,', async () => {
            await waitFor(() => {
                AppDOM = AppComponent.container.firstChild;
                firstEvent = AppDOM.querySelector('.event');
                const details = firstEvent.querySelector('[data-testid="event-details"]');
                expect(details).toBeInTheDocument();
            });
        });

        when('they click on the "Hide details" button to collapse the details,', async () => {
            user = userEvent.setup();
            const button = firstEvent.querySelector('.details-btn');
            await user.click(button);
        });

        then('the user will see again the list of events with summaries.', async () => {
            const EventListDOM = AppDOM.querySelector('#event-list');
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            expect(EventListItems.length).toBeGreaterThan(0);
        });
    });
});
