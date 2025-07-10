Feature: Show/Hide Event Details
    Scenario: An event element is collapsed by default.
        Given a user is searching for an event,
        When  the user opens the app,
        And choses a particular city from the suggestions list,
        Then the events details should be hidden, showing just the most vital info.

    Scenario: User can expand and event to see its details.
        Given a user has opened the app and found an interesting event,
        When they click on the "Show details" button,
        Then the events details will expand.


    Scenario: User can collapse an event to hide details.
        Given a user has opened the app and found an interesting event,
        And they have finished reading the expanded event details of the chosen event,
        When they click on the "Hide details" button to collapse the details,
        Then the user will see again the list of events with summaries.