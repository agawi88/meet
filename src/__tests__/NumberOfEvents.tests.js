// src/__tests__/CitySearch.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { extractLocations, getEvents } from '../api';

describe('<NumberOfEvents /> component', () => {

    let NumberOfEventsComponent;
    beforeEach(() => {
        NumberOfEventsComponent = render(<NumberOfEvents
        setCurrentNOE={() => { }}
            setErrorAlert={() => { }}
        />);
    });

    // ensures that the NumberOfEvents component contains an element with the role of the textbox.
    test('renders number input', () => {
        const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
        expect(numberInput).toBeInTheDocument();
        expect(numberInput).toHaveClass('number');
    });

    // ensures that the default value of the input field is 32.

    test('the value of the input field is 32 by default', () => {
        const inputField = NumberOfEventsComponent.queryByRole('spinbutton');
        expect(inputField).toBeInTheDocument();
        expect(inputField).toHaveValue(32);

    });

    //  ensure that the value of the NumberOfEvents component’s spinbutton has a value that changes accordingly when a user .type()s in it.
    test('the value changes when the user types in the input field', async () => {
        const user = userEvent.setup();
        const input = NumberOfEventsComponent.getByRole('spinbutton');

        await user.type(input, '{backspace}{backspace}10');

        expect(input).toHaveValue(10);
    });
});

describe('<NumberOfEvents /> integration', () => {
    test('renders the correct number of events matching user input', async () => {
        const user = userEvent.setup();
        render(<App />);

        // waiting for initial events to load (by default 32)
        await waitFor(() => {
            expect(screen.getAllByRole('listitem').length).toBe(32);
        });

        const input = screen.getByRole('spinbutton');
        await user.type(input, '{backspace}{backspace}10');

        await waitFor(() => {
            const updatedEvents = screen.getAllByRole('listitem');
            expect(updatedEvents.length).toBe(10);
        });
    });
});