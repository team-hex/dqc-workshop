## Welcome to the MiniTube coding workshop!

In this project you'll help develop MiniTube, a small but very ambitious competitor in the video streaming market. When starting the app you will find instructions for a number of tasks to solve.

A reference solution can be found at https://minitube.hexlabs.se/.

If there is any problem with the previous link (due to API quotas most likely), there is also a mocked version of the app here: https://mocked.minitube.hexlabs.se/

## Getting started

First things first, download this repository to your local machine and then make sure you invoke `npm install` inside the project folder.

#### API

We use the YouTube Data API v3 for everything video-related. The API is free to use, although an API key tied to a Google Cloud project is needed. There is also a quota per Google Cloud project and day, which unfortunately is pretty strict.

For convenience, this repository comes configured with 7 keys that are being cycled through. Hopefully it will be enough, but otherwise it's always possible to create your own key by following the instructions here:
https://developers.google.com/youtube/v3/getting-started

This key can then be added in the `config.js` file.

Documentation for the YouTube Data API can be found here: https://developers.google.com/youtube/v3/docs

#### Mocked mode

An alternative to using the API directly, the app can also be configured to run with mocked API calls. To do this you need to update the `mockedMode` variable in `config.js`.

This can be a good idea if you want to save your API quota, or if you have already managed to run out.

#### Styling

This app was build using Semantic UI, documentation can be found here: https://react.semantic-ui.com/


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Learn More

This project was created with the Create React App tool. For more info, visit [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
