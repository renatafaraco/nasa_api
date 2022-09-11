# Test Framework for NASA API

## Getting started

Welcome to the test framework for NASA Mars Rovers Photos API.

Follow these steps to run the test suites:

1. Clone de repo
2. Add the file cypress.env.json in the root folder with the information:

```json
{
    "apiKey": "<your-api-key-here>"
}
```

3. Run:

`npm install`

`npm cy:open`

## Target System

Go to the [Mars Rover Photos API](https://api.nasa.gov/index.html#browseAPI) to get the docs about the system under test and generate your api key.

## Available scripts

* Run the command and use Cypress iteractive IDE:

`npm cy:open`

* Execute the test suites in background:

`npm cy:run`

The report will be generated in cypress/reports/mochareports/report.html
