'use strict';

describe('Experience data', function () {
  var experienceUrl = 'https://spreadsheets.google.com/feeds/list/1Shh-V6ypqU7hFQCJxsg9CN5rnWN0d0t6VwviRiHCoe8/3/public/values?alt=json';
  var experienceData;
  var dataFactory;
  var $httpBackend;

  // load the app module
  beforeEach(module('gballgithubioApp'));

  // assign dummy data to variables in google spreadsheet format
  beforeEach(function () {
    experienceData = {
      feed: {
        entry: [{
          gsx$company: {
            $t: 'company 1'
          },
          gsx$location: {
            $t: 'location 1'
          },
          gsx$position: {
            $t: 'position 1'
          },
          gsx$info: {
            $t: 'info 1 fake'
          },
          gsx$date: {
            $t: 'december 19930'
          },
          gsx$imagelink: {
            $t: 'image fake 1'
          }
        }, {
          gsx$company: {
            $t: 'company 2'
          },
          gsx$location: {
            $t: 'location 2'
          },
          gsx$position: {
            $t: 'position 2'
          },
          gsx$info: {
            $t: 'info 2 fake'
          },
          gsx$date: {
            $t: 'december 2030'
          },
          gsx$imagelink: {
            $t: 'image fake 2'
          }
        }, {
          gsx$company: {
            $t: 'company 3'
          },
          gsx$location: {
            $t: 'location 3'
          },
          gsx$position: {
            $t: 'position 3'
          },
          gsx$info: {
            $t: 'info 3 fake'
          },
          gsx$date: {
            $t: 'december 2130'
          },
          gsx$imagelink: {
            $t: 'image fake 3'
          }
        }]
      }
    };
  });

  // initialize the controller and a mock scope
  beforeEach(inject(function (_dataFactory_, _$httpBackend_) {
    dataFactory = _dataFactory_;
    $httpBackend = _$httpBackend_;
  }));

  // run tests
  it('returns defined data factory', function () {
    expect(dataFactory).toBeDefined();
  });
    
  it('returns bad http request with status code 403', function () {
    $httpBackend.expectGET(experienceUrl)
      .respond(403);

    dataFactory.getExperience(function (err, response) {
      expect(response).toBe(undefined);
    });

    $httpBackend.flush();
  });

  it('returns correct information', function () {
    $httpBackend.expectGET(experienceUrl)
      .respond({
        feed: experienceData.feed
      });
    
    dataFactory.getExperience(function (err, response) {
      expect(response.experience.length).toBe(3);
      expect(response.experience[1].company).toEqual('company 2'); 
      expect(response.experience[1].location).toEqual('location 2'); 
      expect(response.experience[1].position).toEqual('position 2'); 
      expect(response.experience[1].info).toEqual('info 2 fake'); 
      expect(response.experience[1].date).toEqual('december 2030');
      expect(response.experience[1].imageLink).toEqual('image fake 2');
    });

    $httpBackend.flush();
  });
});
