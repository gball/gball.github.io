'use strict';

describe('Quotes data', function () {
  var quotesUrl = 'https://spreadsheets.google.com/feeds/list/1Shh-V6ypqU7hFQCJxsg9CN5rnWN0d0t6VwviRiHCoe8/6/public/values?alt=json';
  var quotesData;
  var dataFactory;
  var $httpBackend;

  // load the app module
  beforeEach(module('gballgithubioApp'));

  // assign dummy data to variables in google spreadsheet format
  beforeEach(function () {
    quotesData = {
      feed: {
        entry: [{
          gsx$section: {
            $t: 'section 1'
          },
          gsx$quote: {
            $t: 'quote 1'
          }
        }, {
          gsx$section: {
            $t: 'section 2'
          },
          gsx$quote: {
            $t: 'quote 2'
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
    $httpBackend.expectGET(quotesUrl)
      .respond(403);

    dataFactory.getQuotes(function (err, response) {
      expect(response).toBe(undefined);
    });

    $httpBackend.flush();
  });

  it('returns correct information', function () {
    $httpBackend.expectGET(quotesUrl)
      .respond({
        feed: quotesData.feed
      });
    
    dataFactory.getQuotes(function (err, response) {
      expect(response.quotes.length).toBe(2);
      expect(response.quotes[0].section).toEqual('section 1'); 
      expect(response.quotes[0].quote).toEqual('quote 1'); 
      expect(response.quotes[1].section).toEqual('section 2'); 
      expect(response.quotes[1].quote).toEqual('quote 2');  
      expect(response.quotes[1].quote).not.toEqual('quote 1');  
    });

    $httpBackend.flush();
  });
});
