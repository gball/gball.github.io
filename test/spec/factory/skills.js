'use strict';

describe('Skills data', function () {
  var skillsUrl = 'https://spreadsheets.google.com/feeds/list/1Shh-V6ypqU7hFQCJxsg9CN5rnWN0d0t6VwviRiHCoe8/4/public/values?alt=json'; 
  var skillsData;
  var dataFactory;
  var $httpBackend;

  // load the app module
  beforeEach(module('gballgithubioApp'));

  // assign dummy data to variables in google spreadsheet format
  beforeEach(function () {
    skillsData = {
      feed: {
        entry: [{
          gsx$name: {
            $t: 'name 1'
          },
          gsx$strength: {
            $t: 11
          }
        }, {
          gsx$name: {
            $t: 'name 2'
          },
          gsx$strength: {
            $t: 22
          }
        }, {
          gsx$name: {
            $t: 'name 3'
          },
          gsx$strength: {
            $t: 33
          }
        }, {
          gsx$name: {
            $t: 'name 4'
          },
          gsx$strength: {
            $t: 44
          }
        }, {
          gsx$name: {
            $t: 'name 5'
          },
          gsx$strength: {
            $t: 55
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
    $httpBackend.expectGET(skillsUrl)
      .respond(403);

    dataFactory.getSkills(function (err, response) {
      expect(response).toBe(undefined);
    });

    $httpBackend.flush();
  });

  it('returns correct information', function () {
    $httpBackend.expectGET(skillsUrl)
      .respond({
        feed: skillsData.feed
      });
    
    dataFactory.getSkills(function (err, response) {
      expect(response.skills.length).toBe(5);
      expect(response.skills[1].name).toEqual('name 2'); 
      expect(response.skills[1].strength).toEqual(22); 
      expect(response.skills[3].name).toEqual('name 4'); 
      expect(response.skills[3].strength).toEqual(44); 
      expect(response.skills[4].name).not.toEqual('name 4'); 
      expect(response.skills[4].strength).not.toEqual(44); 
    });

    $httpBackend.flush();
  });
});
