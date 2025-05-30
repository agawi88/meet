# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

<h1>"MEET" App </h1>

<h2>is a serverless, progressive web app, with REACT using a test driven development technique. The app uses the Google Calendar API to fetch upcoming events.</h2>

<h3> BUILDING TOOL: VITE </h3>
The app uses Vite for building (npm run build) and can be accessed locally at http://localhost:5173/

<h3>DEPLOYMENT VIA: VERCEL </h3>
The app has been deployed using Vercel and can be accessed via: https://meet-pi-orpin.vercel.app/

<h3>KEY OBJECTIVES in TDD:</h3>

The APP is developed to allow the user the following:
● Filter Events by City.
● Show/HideEventDetails.
● SpecifyNumberofEvents.
● UsetheAppWhenOffline.
● AddanAppShortcuttotheHomeScreen.
● DisplayCharts Visualizing Event Details.

Beneath you can find the user stories as well as objectives in Gherkin syntax used for testing the app:

<ol>
<li>Feature 1: Filter Events by City. 
As a user,
I should be able to filter events by city
So that I can see a list of events taking place in that city.

<b>Gherkin syntax:</b>
Scenario: Display a list of cities to filter events
Given I am on the events page
When I view the city filter options
Then I should see a list of available cities

Scenario: Filter events by selecting a city
Given I am on the events page
And a list of cities is displayed
When I select a city from the list
Then I should see only the events taking place in the selected city

Scenario: Reset the city filter to view all events
Given I have filtered events by a city
When I clear or reset the city filter
Then I should see events from all cities again

</li>
<li><b>Feature 2: Show/Hide Event Details </b>
As a user, I should be able to extend the event preview window to see more details about the event.

As a user, when finished reading all the extended event details, I should be able to minimize the event details’ section to have a better overview of the app/page.
<b>Gherkin syntax:</b>
Given a user is browsing through events, When they find an event’s title interesting, Then they should be able to extend and after reading also minimize the event’s details.

</li>
<li>
<b>Feature 3: Specify Number of Events </b>
As a user, I would like to be able to specify/choose the number of the events I’m interested in, so that I can view more or less events at a time. 
<b>Gherkin syntax:</b>
Given a user is searching for events from one city,                                               
When they do not want to read through all the available events,                                
Then they should be able to specify the number of events they want to see.
</li>
<li>
<b>Feature 4: Use the App When Offline</b>
As a user, I would like to be able to download all the events for a city, so that I can view and search for what I need also when offline. 
<b>Gherkin syntax (by ChatGPT):</b>
  As a user
  I want to use the app without an internet connection
  So that I can still access previously loaded content
  Scenario: Access cached content while offline
    Given I have previously opened the app with an internet connection
    And the content has been cached locally
    When I open the app without an internet connection
    Then I should see the cached content displayed
    And I should be informed that I am offline
  Scenario: Attempt to access new content while offline
    Given I am offline
    When I try to load new content
    Then I should see a message indicating that the content cannot be loaded
</li>
<li>
<b>Feature 5: Add an App Shortcut to the Home Screen</b>
As a user, I would like to have a shortcut to the app in my Home Screen, so that I do not have to search for the app in the long list of apps/programs on my phone/pc. 
<b>Gherkin syntax(by ChatGPT):</b>
  As a user
  I want to add the app to my device’s home screen
  So that I can quickly launch it like a native app
  Scenario: Prompt user to install the app
    Given I am using a supported browser
    And I visit the app's main page
    When the browser detects installability criteria are met
    Then I should see a prompt to add the app to the home screen
  Scenario: Launch app from home screen
    Given I have added the app to my home screen
    When I tap the app icon on my device
    Then the app should launch in standalone mode
</li>
<li>
<b>Feature 6: Display Charts Visualizing Event Details</b>
As a user, I would like to see little summaries of the upcoming events for each of the chosen cities, so that I am always up-to-date with what is happening in each city. 
<b>Gherkin syntax(ChatGPT improved by me):</b>
  Scenario: View event data charts
    Given I am on the event details page
    And the event has associated data
    When I scroll to the charts (summary of the most vital data, like duration, date, location, whether it’s out/indoor etc.) section
    Then I should see visual representations of the data
    And the charts should be labeled and styled clearly
</li>
    </ol>
