controllers = angular.module('controllers',[]);

controllers.controller('ClientsController', ['$scope', '$routeParams', '$location', 'Client',
  function($scope, $routeParams, $location, Client){

    $scope.init = function(){
      if($routeParams.clientId){
        $scope.client = Client.get({ id: $routeParams.clientId })
      }else if($location.path() == '/clients'){
        $scope.clients = Client.query();
      }
    }

    $scope.save = function(){
      Client.save($scope.client, function(){
        $location.path('/clients');
      });
    }

    $scope.update = function(){
      Client.update({ id: $scope.client.id }, $scope.client, function(){
        $location.path('/clients');
      });
    }

    $scope.delete = function(client){
      if(confirm("You sure dude?")){
        client.$delete(function(){
          $scope.init();
        });
      }
    }

    $scope.init();
}]);