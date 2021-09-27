# Codesmith Wizard

Google chrome extension that magically knows which Zoom room you are supposed to be in. With a single button click, join your classmates or pair programming partner!


## Ideation

Please see [whiteboard](https://excalidraw.com/#room=cc4452a38e19f8fc55c1,GjVzMaSKfVWgsb7c0NG6Lg).

## MVP
* Zoom room with most recent mention of your name in slack #general
* Single button to redirect to last assigned zoom room

## Stretch Features
* Keep a history with easy way to navigate through it
* Sync with calendar to also tell us zoom room for classes and if we have an upcoming class
    * notification with single click button to join
* Have multiple cohort selection

## TODO
* [x] Render basic page with a single button when you click the extension icon.
    * [x] on first launch ask for name to match for user
    * [x] save user name to chrome extension storage
    * [] if no data is available ask user to open #general for the extension to parse
* [x] Inject page when on slack domain
    * [x] page should check if we are in #general room and parse through any matches of the user's name and associated link
* [x] Have an options page where user can change their name
    * [ ] optionally add list of users to specifically look for mentions, default is to search through all mentions
* [ ] Add dropdown with currently active cohorts for user to choose when registering.
* [ ] Notify user if last URL is older than 2 days, ask them to open Slack again
* [ ] Refactor units of functionality into testable files. Create tests of all features and views. Mock Google chrome storage API.
* [ ] Integrate Google calendar API to fetch Codesmith assigned activities with zoom links.
    * [ ] Add push notification system based on where you need to be next.
* [ ] Use OAuth user authorization, launch a simple backend to collect user statistics.
* [ ] Integrate with Codesmith backend to provide staff with ability to update currently active cohort Slack organization links.

