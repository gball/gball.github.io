'use strict';

describe('MainCtrl:', function () {
  var aboutMe;
  var education;
  var experience;
  var passion;
  var quotes;
  var scope;
  var skills;
  var mainCtrl;

  // load the controller's module
  beforeEach(module('gballgithubioApp'));

  // assign dummy data to variables
  beforeEach(function () {
    aboutMe = {
      name: 'Bobby',
      location: 'France',
      backgroundInfo: 'I like to hoop.',
      imageLink: 'images/me.jpg'
    };

    education = [{
      schoolName: 'UCM',
      location: 'Merced',
      degree: 'BS Math',
      gpa: 3.1,
      date: 'December 2012',
      imageLink: 'image/test1.png'
    }];

    experience = [{
      company: 'Techshed',
      location: 'Foster City',
      position: 'Data Analyst',
      info: 'Anaylzed data',
      date: 'December 2015',
      imageLink: 'images/code.svg'
    }];

    passion = [{
      type: 'sports',
      info: 'its fun',
      imageLink: 'images/basketball.svg'
    }];

    quotes = [{
      section: 'education',
      quote: 'learn!'
    }, {
      section: 'excercise',
      quote: 'its important!'
    }];

    skills = [{
        name: 'jump roping',
        strength: 99
      }, {
        name: 'running',
        strength: 9
      }, {
        name: 'eating',
        strength: 14
    }];
  });
  
  // initialize the controller and a mock scope prior to each test
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    mainCtrl = $controller('MainCtrl', {
      $scope: scope,
      aboutMe: aboutMe,
      education: education,
      experience: experience,
      skills: skills,
      passion: passion,
      quotes: quotes
    });
  }));

  // run tests
  it('should be defined', function () {
    expect(mainCtrl).toBeDefined();
  });

  it('returns dependency injected variables with correct info', function () {
    expect(aboutMe).toBeDefined();
    expect(education).toBeDefined();
    expect(experience).toBeDefined();
    expect(skills).toBeDefined();
    expect(passion).toBeDefined();
    expect(quotes).toBeDefined();
    expect(aboutMe.name).toBe('Bobby');
    expect(education.length).toBe(1);
    expect(experience.length).toBe(1);
    expect(skills.length).toBe(3);
    expect(passion.length).toBe(1);
    expect(quotes.length).toBe(2);
  });

  it('returns correct age (d.o.b 01/23/93) in the age function', function () {
    expect(scope.getAge()).toBe(23);
    expect(scope.getAge()).not.toBe(21);
    expect(scope.getAge()).not.toBe(26);
  });
});
