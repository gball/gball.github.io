'use strict';

describe('AppJs: ', function () {
  var $httpBackend;
  var $injector;
  var $route;
  var dataFactory;
  var $rootScope;
  var aboutMeData; 
  var educationData;
  var experienceData;
  var skillsData;
  var passionData;
  var quotesData;
  
  // load the controller's module
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
          }]
        }
      };

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
        }]
      }
    };

    skillsData = {
      feed: {
        entry: [{
          gsx$name: {
            $t: 'name 1'
          },
          gsx$strength: {
            $t: 11
          }
        }]
      }
    };

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
        }]
      }
    };

    quotesData = {
      feed: {
        entry: [{
          gsx$section: {
            $t: 'section 1'
          },
          gsx$quote: {
            $t: 'quote 1'
          }
        }]
      }
    };
  });

  // initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, _$injector_, _$route_, _dataFactory_, _$rootScope_) {
    $httpBackend = _$httpBackend_;
    $injector = _$injector_;
    $route = _$route_;
    dataFactory = _dataFactory_;
    $rootScope = _$rootScope_;
  }));

  // run tests
  it('should have mains route with right template, controller and resolve blocks', function () {
    var mainRoute = $route.routes['/'];
    expect(mainRoute).toBeDefined();
    expect(mainRoute.controller).toEqual('MainCtrl');
    expect(mainRoute.templateUrl).toEqual('views/main.html');
    expect(mainRoute.resolve.aboutMe).toBeDefined();
    expect(mainRoute.resolve.education).toBeDefined();
    expect(mainRoute.resolve.experience).toBeDefined();
    expect(mainRoute.resolve.skills).toBeDefined();
    expect(mainRoute.resolve.passion).toBeDefined();
    expect(mainRoute.resolve.quotes).toBeDefined();
  });

  it('should return data on calling the resolve block', function () {
    var mainRoute = $route.routes['/'];
    
    $injector.invoke(mainRoute.resolve.aboutMe) 
      .then(function (response) {
        expect(response.backgroundInfo).toEqual('i like to test'); 
        expect(response.imageLink).toEqual('image test'); 
        expect(response.location).toEqual('paris'); 
        expect(response.name).toEqual('test 1'); 
      });

    $injector.invoke(mainRoute.resolve.education) 
      .then(function (response) {
        expect(response.length).toBe(1);
      });

    $injector.invoke(mainRoute.resolve.experience) 
      .then(function (response) {
        expect(response.length).toBe(1);
      });

    $injector.invoke(mainRoute.resolve.skills) 
      .then(function (response) {
        expect(response[0].length).toBe(1);
        expect(response[0][0].label).toEqual('name 1'); 
        expect(response[0][0].value).toEqual(11);
        expect(response[0][0].color).toEqual('grey'); 
        expect(response[0][0].colorComplement).toEqual('white');
      });

    $injector.invoke(mainRoute.resolve.passion) 
      .then(function (response) {
        expect(response.length).toBe(1);
      });

    $injector.invoke(mainRoute.resolve.quotes) 
      .then(function (response) {
        expect(response.length).toBe(1);
      });

    $httpBackend.expectGET('views/main.html').respond('<div>This is the homepage!</div>');

    $httpBackend.whenGET('https://spreadsheets.google.com/feeds/list/1Shh-V6ypqU7hFQCJxsg9CN5rnWN0d0t6VwviRiHCoe8/1/public/values?alt=json')
      .respond({ 
        feed: aboutMeData.feed
      });

    $httpBackend.whenGET('https://spreadsheets.google.com/feeds/list/1Shh-V6ypqU7hFQCJxsg9CN5rnWN0d0t6VwviRiHCoe8/2/public/values?alt=json')
      .respond({ 
        feed: educationData.feed
      });
    
    $httpBackend.whenGET('https://spreadsheets.google.com/feeds/list/1Shh-V6ypqU7hFQCJxsg9CN5rnWN0d0t6VwviRiHCoe8/3/public/values?alt=json')
      .respond({ 
        feed: experienceData.feed
      });

    $httpBackend.whenGET('https://spreadsheets.google.com/feeds/list/1Shh-V6ypqU7hFQCJxsg9CN5rnWN0d0t6VwviRiHCoe8/4/public/values?alt=json')
      .respond({ 
        feed: skillsData.feed
      });

    $httpBackend.whenGET('https://spreadsheets.google.com/feeds/list/1Shh-V6ypqU7hFQCJxsg9CN5rnWN0d0t6VwviRiHCoe8/5/public/values?alt=json')
      .respond({ 
        feed: passionData.feed
      });

    $httpBackend.whenGET('https://spreadsheets.google.com/feeds/list/1Shh-V6ypqU7hFQCJxsg9CN5rnWN0d0t6VwviRiHCoe8/6/public/values?alt=json')
      .respond({ 
        feed: quotesData.feed
      });

    $rootScope.$apply();
    $httpBackend.flush();  
  });
});
