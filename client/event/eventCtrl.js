angular.module('app.event', [])
.controller('EventController', ['$scope', '$http', 'HttpRequests', 
  function($scope, $http, HttpRequests){
    $scope.search = {};

    $scope.events = [
      { name: 'Gruz Trio', description: 'latin jazz', location: '201 Franklin St San Francisco, CA 94102', organizer: 'SGruz', hashtag: '#jazz#tango'}, // add band
      { name: 'Herrera Quartet', description: 'jazz', location: '510 Embarcadero West Oakland, CA 94607', organizer: 'Herrera', hashtag: '#jazz#fusion'}
    ];
}]);

