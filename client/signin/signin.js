angular.module('app.signin', ['app.services'])

.controller('signinController', ['$scope', '$location', 'HttpRequests', 'Auth', function($scope, $location, Auth, Signin){
  $scope.user = {
    talents: []
  };

  $scope.newTalent = {};


  $scope.addTalent = function(){
    if ( $scope.newTalent.talent !== "" && $scope.newTalent.level !== ""){
      $scope.user.talents.push({
        talent: $scope.newTalent.talent,
        level: $scope.newTalent.level
      });
    $scope.newTalent.talent = "";
    $scope.newTalent.level = "";
    }
    else {
      // TODO: add a message that one of the forms is blank
    }
  };

  $scope.login = function(){
    Auth.login($scope.user.email, $scope.user.password)
    .then(function(authData){
      // login successful with user with ID: authData.uid
      $location.path('/user/'+authData.uid); // /user/UID
    }).catch(function(error){
      console.error("Firebase login failed:",error);
      $location.path('/login'); // not sure if this is necessary
    });
  };

  $scope.signup = function() {
    $scope.user.talents = convertTalentsToObject()
    console.log($scope.user);

    Auth.signup($scope.user.email, $scope.user.password)
    .then(function(userData){
      $scope.user.uid = userData.uid; // add Firebase uid to the user obj
      HttpRequests.signupUser($scope.user) // signupUser returns a promise
      .then(function(response){
        console.log('user posted', response);
        $location.path('/'); // TODO: where should this lead to?
      }, function(error) {
        console.log('error posting user', error);
      }); 
    })
    .catch(function(error){
      console.log("Firebase signup failed:",error);
    });
  };

  var convertTalentsToObject = function() {
    var converted = {};
    for (var i = 0; i < $scope.user.talents.length; i++){
      converted[$scope.user.talents.talent] = $scope.user.talents.level; 
    }
    return converted;
  };
}]);