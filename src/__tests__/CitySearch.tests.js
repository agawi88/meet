// src/__tests__/CitySearch.test.js
import React from 'react';
import { render, within, waitFor } from '@testing-library/react';
import CitySearch from '../components/CitySearch';
import userEvent from '@testing-library/user-event';
import { extractLocations, getEvents } from '../api';
import App from '../App';

describe('<CitySearch /> component', () => {

    let CitySearchComponent;
    beforeEach(() => {
        CitySearchComponent = render(<CitySearch
            allLocations={[]}
            setCurrentCity={() => { }}
            setInfoAlert={() => { }}
        />);
    });
    test('renders text input', () => {
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass('city');
    });

    test('suggestions list is hidden by default', () => {
        const suggestionList = CitySearchComponent.queryByRole('list');
        expect(suggestionList).not.toBeInTheDocument();
    });

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
        CitySearchComponent.rerender(<CitySearch
            allLocations={allLocations}
             setCurrentCity={() => {}}
            setInfoAlert={() => {}} 
        />);
       
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
        CitySearchComponent.rerender(<CitySearch
            allLocations={allLocations}
            setCurrentCity={() => { }}
            setInfoAlert={() => {}}
        />);

        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.type(cityTextBox, "Berlin");

        // the suggestion's textContent look like this: "Berlin, Germany"
        const BerlinGermanySuggestion = CitySearchComponent.queryAllByRole('listitem')[0];

        await user.click(BerlinGermanySuggestion);

        expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
    });
    test('updates list of suggestions correctly to "See all cities", when user types in a city textbox a city that is not included in the suggestions', async () => { 
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);
        CitySearchComponent.rerender(<CitySearch
            allLocations={allLocations}
            setCurrentCity={() => { }}
            setInfoAlert={() => {}}
        />);
       
        // user types i.e. "Paris" in the city textbox
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.type(cityTextBox, "Paris, France");

        const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');

        // Expect only one item in the suggestion list
        expect(suggestionListItems).toHaveLength(1);
        expect(suggestionListItems[0]).toHaveTextContent("See all cities");
    });
});

describe('<CitySearch /> integration', () => {
    test('renders suggestions list when the app is rendered.', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;

        const CitySearchDOM = AppDOM.querySelector('#city-search');
        const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
        await user.click(cityTextBox);

        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);

        await waitFor(() => {
            const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
            expect(suggestionListItems.length).toBe(allLocations.length + 1);
        });
    });
});