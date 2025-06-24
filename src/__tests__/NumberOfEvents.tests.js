// src/__tests__/CitySearch.test.js
import React from 'react';
import { render } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';
import userEvent from '@testing-library/user-event';
import { extractLocations, getEvents } from '../api';

describe('<NumberOfEvents /> component', () => {

    let NumberOfEventsComponent;
    beforeEach(() => {
        NumberOfEventsComponent = render(<NumberOfEvents />);
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
    

/*     

test('renders a list of suggestions when city textbox gains focus', async () => {
        const user = userEvent.setup();
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.click(cityTextBox);
        const suggestionList = CitySearchComponent.queryByRole('list');
        expect(suggestionList).toBeInTheDocument();
        expect(suggestionList).toHaveClass('suggestions');
    });
    test('updates list of suggestions correctly when user types in a city textbox', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);
        CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);
       
        // user types i.e. "Berlin" in the city textbox
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.type(cityTextBox, "Berlin");

        //filter allLocations to locations matching
        const suggestions = allLocations ? allLocations.filter((location) => {
            return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
        }) : [];

        //get all <li> elements inside the suggestion list
        const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');
        expect(suggestionListItems).toHaveLength(suggestions.length + 1);
        for (let i = 0; i < suggestions.length; i += 1) {
            expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
        }
    });
    test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);
        CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.type(cityTextBox, "Berlin");

        // the suggestion's textContent look like this: "Berlin, Germany"
        const BerlinGermanySuggestion = CitySearchComponent.queryAllByRole('listitem')[0];

        await user.click(BerlinGermanySuggestion);

        expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
    }); */
});