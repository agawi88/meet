Feature: Specify Number of Events
    As a user, I would like to be able to specify/choose the number of the events I’m interested in,
    so that I can view more or less events at a time.

    Scenario: Default number of events displayed
        Given the user has not specified the number of events
        When the user opens the app
        Then the user should see 32 events by default

    Scenario: User specifies the number of events they want to see
        Given a user is searching for events from one city
        When they do not want to read through all the available events
        Then they should be able to specify the number of events they want to see