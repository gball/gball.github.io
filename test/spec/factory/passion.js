'use strict';

describe('Passion data', function () {
  var passionUrl = 'https://spreadsheets.google.com/feeds/list/1Shh-V6ypqU7hFQCJxsg9CN5rnWN0d0t6VwviRiHCoe8/5/public/values?alt=json'; 
  var passionData;
  var dataFactory;
  var $httpBackend;

  // load the app module
  beforeEach(module('gballgithubioApp'));

  // assign dummy data to variables in google spreadsheet format
  beforeEach(function () {
    passionData = {
      feed: {
        entry: [{
          gsx$type: {
            $t: 'type 1'
          },
          gsx$info: {
            $t: 'info blah 1'
          }, 
          gsx$imagelink: {
            $t: 'image 1'
          }
        }, {
          gsx$type: {
            $t: 'type 2'
          },
          gsx$info: {
            $t: 'info blah 2'
          }, 
          gsx$imagelink: {
            $t: 'image 2'
          }
        }, {
          gsx$type: {
            $t: 'type 3'
          },
          gsx$info: {
            $t: 'info blah 3'
          }, 
          gsx$imagelink: {
            $t: 'image 3'
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
    $httpBackend.expectGET(passionUrl)
      .respond(403);

    dataFactory.getPassion(function (err, response) {
      expect(response).toBe(undefined);
    });

    $httpBackend.flush();
  });

  it('returns correct information', function () {
    $httpBackend.expectGET(passionUrl)
      .respond({
        feed: passionData.feed
      });
    
    dataFactory.getPassion(function (err, response) {
      expect(response.passion.length).toBe(3);
      expect(response.passion[2].type).toEqual('type 3'); 
      expect(response.passion[2].info).toEqual('info blah 3'); 
      expect(response.passion[2].imageLink).toEqual('image 3'); 
      expect(response.passion[2].type).not.toEqual('type 2');  
    });

    $httpBackend.flush();
  });
});
