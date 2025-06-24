import React from 'react';
import Event from '../components/Event';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';

/* let allEvents;
beforeAll(async () => {
    allEvents = await getEvents();
}); */

let firstEvent;

beforeEach(async () => {
  const events = await getEvents();
  firstEvent = events[0];
});

describe('<Event /> component', () => {

    test('debug: log first event', () => {
        console.log(JSON.stringify(firstEvent, null, 2));
        expect(firstEvent).toBeDefined(); // optional sanity check
      });

    test('renders event title', () => {
        const { summary } = firstEvent;
        const { queryByText } = render(<Event event={firstEvent} />);
        expect(queryByText(summary)).toBeInTheDocument();
    });

    test('renders event location', () => {
        const { location } = firstEvent;
        const { queryByText } = render(<Event event={firstEvent} />);
        expect(queryByText(location)).toBeInTheDocument();
    });

    test('renders event start time', () => {
        const { created } = firstEvent;
        const { queryByText } = render(<Event event={firstEvent} />);
        expect(queryByText(new Date(created).toString())).toBeInTheDocument();
    })

    test('renders "show details" button', () => {
        const { queryByText } = render(<Event event={firstEvent} />);
        expect(queryByText(/Show details/i)).toBeInTheDocument();
    });

    test('toggles event details when show/hide details button is clicked', async () => {
        const user = userEvent.setup();
        const { queryByTestId, getByRole } = render(<Event event={firstEvent} />);

        //details hidden by default

        expect(queryByTestId('event-details')).not.toBeInTheDocument();

        // Show more details of an event by clicking on the button "Show details"
        const button = getByRole('button', { name: /show details/i });
        await user.click(button);

        //details visible after click
        expect(queryByTestId('event-details')).toBeInTheDocument();
        expect(button).toHaveTextContent(/hide details/i);
    
        await user.click(button);
    
        // details hidden again
        expect(queryByTestId('event-details')).not.toBeInTheDocument();
        expect(button).toHaveTextContent(/show details/i);
    });
});