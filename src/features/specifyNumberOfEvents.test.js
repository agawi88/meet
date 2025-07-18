import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';


const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

    // Scenario 1
    
    test('Default number of events displayed', ({ given, when, then }) => {  
        let AppComponent; 
        
        given('the user has not specified the number of events', () => { 
        });

        when('the user opens the app', () => {
            AppComponent = render(<App />);
        });

        then('the user should see 32 events by default', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });

        });
    });  

    test('User specifies the number of events they want to see', ({ given, when, then }) => {
        let AppComponent; 
        let AppDOM;
        let NumberInput;
        
        given('a user is searching for events from one city', async () => {
            AppComponent = render(<App />);
            AppDOM = AppComponent.container.firstChild;

            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });

        when('they do not want to read through all the available events', async () => {
            const user = userEvent.setup();
            const NumberOfEventsDOM = AppDOM.querySelector('#events-number');
            NumberInput = within(NumberOfEventsDOM).getByRole('spinbutton');
            await user.clear(NumberInput);
            await user.type(NumberInput, '5');
        });

        then('they should be able to specify the number of events they want to see', async () => {
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(5);
            });
        });
    });

});