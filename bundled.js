angular.module('armoryApp', ['ui.router'])
    .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home',{
              url:'/',
              templateUrl:'../app/views/home.html'
            })
            .state('pvp',{
                url:'/pvp',
                templateUrl: "../app/views/pvp.html",
                controller:'pvpCtrl'
            })
            .state('characters', {
              url:'/characterlookup',
              templateUrl:'../app/views/characters.html',
              controller:'charactersCtrl'
            });

            $urlRouterProvider.otherwise('/')
}])

angular.module('armoryApp').controller('charactersCtrl', ["mainSrv", "$scope", function(mainSrv, $scope) {
var cls = 0;
var race = 0;
  $scope.getCharacters = function(name, realm) {
    mainSrv.getCharacters(name, realm)
      .then(function(response) {
          $scope.character = response.data;
          cls = $scope.character.class;
          race = $scope.character.race;
          console.log(race);
          getClasses();
          getRaces()
          if ($scope.character.gender === 0){
            $scope.character.gender = 'Male'
          }else {
            $scope.character.gender = 'Female'
          }
      });
  }
var getClasses = function() {
  mainSrv.getClasses().then(function(response) {
    $scope.classes = response.data.classes;
    console.log($scope.classes);
    getClassId();
  })
}


function getClassId() {
  for (var i = 0; i < $scope.classes.length; i++) {
  if  ($scope.classes[i].id === cls) {
  $scope.class = $scope.classes[i].name
  }
  }
  console.log(cls, "HEY");
}


  var getRaces = function() {
    mainSrv.getRaces().then(function(response) {
      $scope.races = response.data.races;
      console.log($scope.races);
      getRaceId()
    })
  };

function getRaceId() {
  for (var i = 0; i < $scope.races.length; i++) {
    if ($scope.races[i].id === race) {
      $scope.race = $scope.races[i].name;
    }
  }
  console.log(race, 'HELLO!')
}

}])

angular.module('armoryApp').controller('mainCtrl', ["$scope", function($scope) {

}])

angular.module('armoryApp').controller('pvpCtrl', ["$scope", "mainSrv", function($scope, mainSrv) {
  $scope.getLeaderboard = function(bracket) {
    mainSrv.getLeaderboard(bracket)
      .then(function(response) {
        $scope.bracketInfo = response.data.rows
        console.log($scope.bracketInfo)
      })
  }

}])


angular.module('armoryApp').service('mainSrv', ["$http", function($http) {


  this.getCharacters = function(name, realm) {
    return $http({
      method: 'GET',
      url:`https://us.api.battle.net/wow/character/${realm}/${name}?locale=en_US&apikey=r8je9ubkzd5px4a49qqsfjj92aw99r25`,
    })
  }

  this.getLeaderboard = function(bracket) {
    return $http({
      method: 'GET',
      url:`https://us.api.battle.net/wow/leaderboard/${bracket}?locale=en_US&apikey=r8je9ubkzd5px4a49qqsfjj92aw99r25`,
    })
  }
  this.getClasses = function(classes) {
    return $http({
      method: 'GET',
      url:'https://us.api.battle.net/wow/data/character/classes?locale=en_US&apikey=r8je9ubkzd5px4a49qqsfjj92aw99r25'
    })
  }
  this.getRaces = function(races) {
    return $http({
      method: 'GET',
      url:'https://us.api.battle.net/wow/data/character/races?locale=en_US&apikey=r8je9ubkzd5px4a49qqsfjj92aw99r25'
    })
  }
}])
