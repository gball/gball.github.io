'use strict';

describe('About me data', function () {
  var aboutMeUrl = 'https://spreadsheets.google.com/feeds/list/1Shh-V6ypqU7hFQCJxsg9CN5rnWN0d0t6VwviRiHCoe8/1/public/values?alt=json';
  var aboutMeData;
  var dataFactory;
  var $httpBackend;

  // load the app module
  beforeEach(module('gballgithubioApp'));

  // assign dummy data to variables in google spreadsheet format
  beforeEach(function () {
    aboutMeData = {
      feed: {
        entry: [{
          gsx$backgroundinfo: {
            $t: 'i like to test'
          },
          gsx$imagelink: {
            $t: 'image test'
          },
          gsx$location: {
            $t: 'paris'
          },
          gsx$name: {
            $t: 'test 1'
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
    $httpBackend.expectGET(aboutMeUrl)
      .respond(403);

    dataFactory.getAboutMe(function (err, response) {
      expect(response).toBe(undefined);
    });

    $httpBackend.flush();
  });

  it('returns correct information', function () {
    $httpBackend.expectGET(aboutMeUrl)
      .respond({ 
        feed: aboutMeData.feed
      });
    
    dataFactory.getAboutMe(function (err, response) {
      expect(response.aboutMe.backgroundInfo).toEqual('i like to test'); 
      expect(response.aboutMe.imageLink).toEqual('image test'); 
      expect(response.aboutMe.location).toEqual('paris'); 
      expect(response.aboutMe.name).toEqual('test 1'); 
    });

    $httpBackend.flush();
  });
});
