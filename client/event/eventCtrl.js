angular.module('app.event', [])
.controller('EventController', ['$scope', '$http', 'HttpRequests', function($scope, $http, HttpRequests){
    $scope.search = {};
    $scope.events = [];

    $scope.getEvents = function(){
      HttpRequests.getEvents()
        .then(function(data){
          $scope.events = data.data;
          for (var i = 0; i < $scope.events.length; i++) {
            var date = new Date($scope.events[i].date);
            $scope.events[i].date = date;
            $scope.events[i].formatteddate = (date.getMonth() + 1) + "-" + date.getDay() + "-" + date.getFullYear();
          }
        });
    };
    $scope.getEvents();
}]);

