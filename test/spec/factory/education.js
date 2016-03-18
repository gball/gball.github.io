'use strict';

describe('Education data', function () {
  var educationUrl = 'https://spreadsheets.google.com/feeds/list/1Shh-V6ypqU7hFQCJxsg9CN5rnWN0d0t6VwviRiHCoe8/2/public/values?alt=json';
  var educationData;
  var dataFactory;
  var $httpBackend;

  // load the app module
  beforeEach(module('gballgithubioApp'));

  // assign dummy data to variables in google spreadsheet format
  beforeEach(function () {
    educationData = {
      feed: {
        entry: [{
          gsx$schoolname: {
            $t: 'school 1'
          },
          gsx$location: {
            $t: 'mars'
          },
          gsx$degree: {
            $t: 'teaching'
          },
          gsx$gpa: {
            $t: 4.0
          },
          gsx$date: {
            $t: 'december 2030'
          },
          gsx$imagelink: {
            $t: 'image fake 1'
          }
        }, {
          gsx$schoolname: {
            $t: 'school 2'
          },
          gsx$location: {
            $t: 'venus'
          },
          gsx$degree: {
            $t: 'training'
          },
          gsx$gpa: {
            $t: 2.3
          },
          gsx$date: {
            $t: 'december 2010'
          },
          gsx$imagelink: {
            $t: 'image fake 2'
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
    $httpBackend.expectGET(educationUrl)
      .respond(403);

    dataFactory.getEducation(function (err, response) {
      expect(response).toBe(undefined);
    });

    $httpBackend.flush();
  });

  it('returns correct information', function () {
    $httpBackend.expectGET(educationUrl)
      .respond({
        feed: educationData.feed
      });
    
    dataFactory.getEducation(function (err, response) {
      expect(response.education.length).toBe(2);
      expect(response.education[0].schoolName).toEqual('school 1'); 
      expect(response.education[0].location).toEqual('mars'); 
      expect(response.education[0].degree).toEqual('teaching'); 
      expect(response.education[0].gpa).toEqual(4.0); 
      expect(response.education[0].date).toEqual('december 2030');
      expect(response.education[0].imageLink).toEqual('image fake 1');
      expect(response.education[1].schoolName).toEqual('school 2'); 
      expect(response.education[1].location).toEqual('venus'); 
      expect(response.education[1].degree).toEqual('training'); 
      expect(response.education[1].gpa).not.toEqual(2.9); 
      expect(response.education[1].date).toEqual('december 2010');
      expect(response.education[1].imageLink).toEqual('image fake 2');
    });

    $httpBackend.flush();
  });
});
