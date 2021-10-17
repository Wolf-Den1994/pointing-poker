# Pointing Poker

Implemented an SPA application for conducting sessions assess the complexity of the upcoming work or the relative volume of tasks to be solved in software development.

*The client is located in the **_develop_** branch. Server in the **_server_** branch.*

***Authors:***
 *[Denis Karazan](https://github.com/Wolf-Den1994),*
 *[Maksim Malashkou](https://github.com/KalashnikovTV),*
 *[Artsiom Murashko](https://github.com/Ksarelto)*

***Mentor:***
 *[Diana Garbuzova](https://github.com/lessarea):heart:*

**Watch deploy => https://pointing-poker.netlify.app/**

![pointing-poker](https://user-images.githubusercontent.com/58827564/136676731-a7389967-91b3-4376-92de-e5521efffb7d.png)

## Used technologies:
##### Front-End:
- [React] - A JavaScript library for building user interfaces.
- [Redux] - A Predictable State Container for JS Apps.
- [TypeScript] - A strongly typed programming language which builds on JavaScript giving you better tooling at any scale.
- [Antd] - A React UI library that contains a set of high quality components and demos for building rich, interactive user interfaces.
- [ESLint] - A tool for identifying and reporting on patterns found in JavaScript code, with the goal of making code more consistent and avoiding bugs.
- [Prettier] - A code formatter that removes all original styling and ensures that all outputted code conforms to a consistent style.
- [Axios] - A simple promise based HTTP client for the browser and Node.js, provides a simple to use library in a small package with a very extensible interface.
- [Normalize.css] - A small CSS file that provides better cross-browser compatibility for HTML elements in the default styles
- [Sass/Scss] - A most advanced and stable professional-grade CSS extension.
- [Jest] - A delightful JavaScript Testing Framework with a focus on simplicity.
- [react-testing-library] - A very light-weight solution for testing React components.
- [redux-thunk] - A middleware for Redux extends the store's abilities, and lets you write async logic that interacts with the store
- [redux-devtools-extension] - A Redux DevTools for debugging application's state changes.
- [react-copy-to-clipboard] - A React component for copy to clipboard.
- [react-csv] - A React components to build CSV files on the fly basing on Array/literal object of data.
- [react-csv-reader] - A React component that handles csv file input and its parsing.
- [socket.io-client] - A library that enables real-time, bidirectional and event-based communication between the browser and the server.
- [xlsx] - A parser and writer for various spreadsheet formats.
- [uuid] - Generate RFC-compliant UUIDs/unique identifiers.
- [file-saver] - A HTML5 saveAs() FileSaver implementation.
- [husky] - Automates the process of adding Git Hooks.
- [lint-staged] - A script that will run arbitrary shell tasks with a list of staged files as an argument, filtered by a specified glob pattern.
- [@craco/craco] - A easy and comprehensible configuration layer for create-react-app.

##### Back-End:
- [Node.js] - A JavaScript runtime, is designed to build scalable network applications.
- [TypeScript] - A strongly typed programming language which builds on JavaScript giving you better tooling at any scale.
- [Socket.io] - A library that enables real-time, bidirectional and event-based communication between the browser and the server.
- [Mongoose] - A special ODM library for working with MongoDB, which allows you to map class objects and collection documents from the database.
- [Express] - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- [Cors] - A browser security feature that restricts cross-origin HTTP requests with other servers and specifies which domains access your resources.
- [Nodemon] - A tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.
- [ESLint] - A tool for identifying and reporting on patterns found in JavaScript code, with the goal of making code more consistent and avoiding bugs.
- [Prettier] - A code formatter that removes all original styling and ensures that all outputted code conforms to a consistent style.

## Application functionality:

### Home page:
- Implemented adaptive to 320px of all pages.
- Serves as the login page.
- Implemented support for gaming sessions with multiple users.
- Implemented support for multiple game sessions at the same time.
- Implemented the button "Start a new game". Clicking on this button opens a popup with a form where the user enters his name (required), last name (optional) and position (optional), and can also upload a picture for the profile. After submitting this form, the user goes to the game settings page.
- Implemented the input field (where the session id is entered) and the "Join the game" button. If the user has the id of an already created and active game, then he can join it by specifying the id in the input field and clicking on the button. After clicking on the button, the id is validated (the game with this id exists and is active). If the validation is not successful, the user remains on the welcome page and is shown an error message, otherwise a popup with a form is opened where the user enters his first name (required), last name (optional), position (optional) and role (player/observer) , and can also upload a picture for a profile. After submitting this form, the user is redirected to the page with the lobby or to the page with the game (if the game has already started).
- Implemented adding user data when logging into localStorage, for easy logging into the application again (without an avatar).
- Implemented footer with links to githubs of the authors of the application, year of creation of the application, course logo with a link to the course.

### Lobby page:
*The functionality is different from the role of the participant.*
- Implemented a waiting list, which displays cards of all participants who followed the link, the session name with an exit button.
- Implemented a text chat for everyone present.
- Implemented the ability to exclude a person from the lobby by creating a vote and receiving a majority of votes (50% of the participants + 1 vote). In this case, the dealer can delete anyone, the dealer cannot be deleted. The voting function is not available if there are fewer than 3 people in the lobby, excluding the dealer.
- Implemented a button to copy the link from the game id.
- Implemented a start game button. By clicking on this button, the lobby is closed and all users are redirected to the page with the game.
- Implemented the button to cancel the game. When the game is canceled, the game status changes to the "inactive" state, the dealer sees a message that the game was canceled successfully/unsuccessfully, and all users are removed from the lobby.
- Implemented the ability to set a list of tasks for assessment using input in the form and/or using a file with a list of tasks
- Implemented a list of members who are already in the lobby.
- Implemented the ability to remove members from the lobby.
- Implemented the ability to view chat and participate in the discussion.
- Implemented a checking for the same names, issues and cards.
- Implemented a ban on writing letters to game cards when adding or changing.
- Implemented linking issues in Title (Spring N planning) and Issues. Adding, deleting or changing in one place changes in another.

**Implemented Game settings:**
  - Scram master as player.
  - Flip the cards automatically after the timer ends.
  - Flip the cards automatically after all users voted.
  - Auto admit all new members if the game started (or admit/reject mechanism).
  - Changing card in round end.
  - Is timer needed (if necessary, an additional field will appear to set the timer time).
  - What set of cards will be used (Fibonacci numbers, powers of two, the ability to set your own sequence).

### Game page:
*The functionality is different from the role of the participant.*
- Implemented the opening of the page after the dealer has started the game.
- Implemented the ability to open the game settings in the popup.
- Implemented start/reset round buttons.

**The game field contains the following elements:**
  - List of participants in the form of round icons with initials inside and full name under the icons. Participants with different roles are visually distinguished (with the color of the icon, the progress icon). If a new participant joined during the game, then the dealer is shown a popup, where he is asked to let the participant in or not
  - Task list:
    - The task that is currently being evaluated is visually highlighted.
    - Each item in the list displays a description of the problem and the score that was assigned to it.
    - If the task has not yet been evaluated, a dash is displayed instead of score.
    - The ability to set the total score in the round statistics.
    - Moving between tasks from the list is performed by clicking on an item in the list. Only the dealer can move between tasks. The player or observer can only view the details of the problem.
  - Timer (if not disabled by settings).
  - The average of all the players' ratings. After everyone has voted and the cards have been turned over, the average of all ratings and the total are displayed.
  - Voting cards (visible only to players), which display the values of the sequence that you selected in the settings. The card that the player has chosen is visually highlighted for him.
  - After the cards have been turned over, all participants see how the players have voted.
  - Mechanism for adding tasks to the list during the game.
  - If according to the settings the cards are not turned over automatically when everyone has voted, then the ability to turn them over (Flip cards button).
  - A mechanism for re-voting on the problem (already voted, but the result was unsatisfactory or a large spread in the estimates among the players and after discussions, the dealer decides whether to start a re-vote).
  - Implemented a mechanism for ending the game (Show the game result button). At the end of the game, the user is redirected to the results page.
  - Implemented display of statistics after the end of voting with the ability to edit the total value.

### Result page:
- Implemented the output of the results of the assessment of the game, the percentage of cards used, the total value and it is possible to save the results as a file (.csv, .xlsx).

#### NotFound page:
- Implemented url validation. If the url does not exist, we get to the not found page.

## Easy to use:
+ Download project files (server located in *server*, client in *develop* branch)
+ Go to project root directory
+ Run `npm i`

## Pre-defined npm scripts:

**Front-End:**
+ `npm run build` -> build project to the _build_ folder. Es-lint will be running before build.
+ `npm run start` -> run webpack dev server and open browser.
+ `npm run test` -> launches the test runner in the interactive watch mode.
+ `npm run eject` -> this command will remove the single build dependency from your project.
+ `npm run lint` -> identify errors found in the code, and generate reports about them.
+ `npm run lintfix` -> it detects errors found in the code and tries to fix them.
+ `npm run pre` -> will format the code to the correct standards.

**Back-End:**
+ `npm run start` -> run node.js server.
+ `npm run postinstall` -> transform typescript files in javascript code and build project to the _dist_ folder.
+ `npm run watch` -> run server and auto refresh server after change files.
+ `npm run lint` -> identify errors found in the code, and generate reports about them.
+ `npm run prettier` -> removes all original styling and ensures that all outputted code conforms to a consistent style.

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job)
   [React]: <https://reactjs.org/>
   [Redux]: <https://redux.js.org/>
   [antd]: <https://ant.design/>
   [redux-thunk]: <https://github.com/reduxjs/redux-thunk>
   [redux-devtools-extension]: <https://github.com/zalmoxisus/redux-devtools-extension>
   [react-copy-to-clipboard]: <https://github.com/nkbt/react-copy-to-clipboard>
   [react-csv]: <https://github.com/react-csv/react-csv>
   [react-csv-reader]: <https://github.com/nzambello/react-csv-reader>
   [socket.io-client]: <https://socket.io/docs/v4/client-api/>
   [xlsx]: <https://github.com/SheetJS/sheetjs>
   [uuid]: <https://github.com/uuidjs/uuid>
   [file-saver]: <https://github.com/eligrey/FileSaver.js>
   [axios]: <https://axios-http.com/>
   [Sass/Scss]: <https://sass-scss.ru/>
   [normalize.css]: <https://necolas.github.io/normalize.css/>
   [Jest]: <https://jestjs.io/>
   [react-testing-library]: <https://testing-library.com/>
   [husky]: <https://github.com/typicode/husky>
   [lint-staged]: <https://github.com/okonet/lint-staged>
   [@craco/craco]: <https://github.com/gsoft-inc/craco>
   [Node.js]: <https://nodejs.org/>
   [TypeScript]: <https://www.typescriptlang.org/>
   [Socket.io]: <https://socket.io/>
   [Express]: <https://expressjs.com/>
   [Mongoose]: <https://mongoosejs.com/>
   [Cors]: <https://github.com/expressjs/cors>
   [Nodemon]: <https://nodemon.io/>
   [ESLint]: <https://eslint.org/>
   [Prettier]: <https://prettier.io/>
