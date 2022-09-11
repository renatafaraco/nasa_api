describe('Verify mars-photos API - data driven example', () => {
  // This test suite validates the scenarios listed in the /fixtures/marsPhotoAPI.json file
  // To add a new test case, go to the file and add a new object
  /*
  {
    "testCaseName": "",
    "method": "",
    "apiKey": "{{valid}}",
    "rover": "",
    "parameterType": "",
    "parameterValue": "",
    "page": "",
    "perPage": 0,
    "expectedStatusCode": 200,
    "success": true
  }
  */

  const testCaseList = require('../fixtures/marsPhotoAPI.json');
  const endPoint = 'mars-photos/api/v1/rovers/{{rover}}/photos?';

  testCaseList.forEach((testCase) => {
    it(testCase.testCaseName, () => {
      // Request parameters:
      let parametersPayload =
        testCase.parameterType +
        '=' +
        testCase.parameterValue +
        '&page=' +
        testCase.page +
        '&per_page=' +
        testCase.perPage;

      //Action: Send the request
      cy.sendRequest(
        testCase.method,
        testCase.apiKey.replaceAll('{{valid}}', Cypress.env('apiKey')),
        endPoint.replaceAll('{{rover}}', testCase.rover),
        parametersPayload
      ).then((response) => {
        //Validations 1: status code
        expect(response.status).to.equal(testCase.expectedStatusCode);

        // Success test cases:
        if (testCase.success) {
          // Validation 2: Response lenght
          expect(response.body['photos']).to.have.lengthOf(testCase.perPage);
          // Validation3: Elements have the img_src element
          response.body['photos'].forEach((jsonElement) => {
            expect(jsonElement).to.have.property('img_src');
          });
        }
      });
    });
  });
});
