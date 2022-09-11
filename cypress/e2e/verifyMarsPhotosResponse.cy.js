describe('Verify mars-photos API Responses', () => {
  it('should retrieve and compare the first 10 Mars photos made by "Curiosity" on 1000 sol and on Earth date equal to 1000 Martian sol.', () => {
    // Parameters
    const rover = 'curiosity';
    const page = 1;
    const perPage = 10;
    const parameters = '&page=' + page + '&per_page=' + perPage;
    const earthDate = '2015-05-30';
    const sol = 1000;
    const endpoint = 'mars-photos/api/v1/rovers/' + rover + '/photos?';

    // Action 1: Send the request using earth date
    cy.sendRequest(
      'GET',
      Cypress.env('apiKey'),
      endpoint,
      'earth_date=' + earthDate + parameters
    ).as('earthDateResponse');

    // Action 2: Send the request using sol
    cy.sendRequest(
      'GET',
      Cypress.env('apiKey'),
      endpoint,
      'sol=' + sol + parameters
    ).then((solResponse) => {
      //Validation:
      cy.get('@earthDateResponse').then((earthResponse) => {
        // Compare both responses to be deeply equal
        expect(earthResponse.body).to.eql(solResponse.body);
      });
    });
  });

  it('should have the amounts of pictures that each Curiosity camera took on 1000 Mars sol is not greater than 10 times the amount taken by other cameras on the same date.', () => {
    // Parameters
    const rover = 'curiosity';
    const sol = 1000;
    const endpoint = 'mars-photos/api/v1/rovers/' + rover + '/photos?';
    const manifestEndpoint = 'mars-photos/api/v1/manifests/' + rover + '?';

    // Action 1: Get manifest to retrieve total photos number and cams
    cy.sendRequest('GET', Cypress.env('apiKey'), manifestEndpoint, '').then(
      (response) => {
        cy.wrap(response.body.photo_manifest.photos)
          // Action 2: Get total photos and cams for sol = 1000
          .getElementByKey('sol', sol)
          .then((element) => {
            let totalPhotos = element.total_photos;
            let camList = element.cameras;

            //Action 3: For each cam, get the number of photos taken in sol = 1000
            camList.forEach((cam) => {
              cy.log('Camera: ' + cam)
                .sendRequest(
                  'GET',
                  Cypress.env('apiKey'),
                  endpoint,
                  'sol=' +
                    sol +
                    '&camera=' +
                    cam +
                    '&page=1' +
                    '&per_page=' +
                    totalPhotos
                )
                .then((response) => {
                  // Validation: Number of photos cam X <= All other cam photos x 10
                  let numberOfPhotosThisCam = response.body.photos.length;
                  let numberOfPhotosOthersCam =
                    totalPhotos - numberOfPhotosThisCam;
                  expect(numberOfPhotosThisCam).not.greaterThan(
                    10 * numberOfPhotosOthersCam
                  );
                });
            });
          });
      }
    );
  });
});
