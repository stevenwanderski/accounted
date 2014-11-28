accounted = angular.module('accounted',[
  'templates',
  'controllers',
  'ngRoute',
  'ngResource'
]);

accounted.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'payments/index.html',
      controller: 'PaymentsController'
    })
    .when('/payments/new', {
      templateUrl: 'payments/new.html',
      controller: 'PaymentsController'
    })
    .when('/payments/:paymentId', {
      templateUrl: 'payments/edit.html',
      controller: 'PaymentsController'
    })
    .when('/clients', {
      templateUrl: 'clients/index.html',
      controller: 'ClientsController'
    })
    .when('/clients/new', {
      templateUrl: 'clients/new.html',
      controller: 'ClientsController'
    })
    .when('/clients/:clientId', {
      templateUrl: 'clients/edit.html',
      controller: 'ClientsController'
    });
}]);

accounted.factory('Payment', ['$resource', function($resource) {
  return $resource('/api/payments/:id', { id: '@id' }, {
    'update': {
      method: 'PUT'
    }
  });
}]);

accounted.factory('Client', ['$resource', function($resource) {
  return $resource('/api/clients/:id', { id: '@id' }, {
    'update': {
      method: 'PUT'
    }
  });
}]);


// CONTROLLERS
controllers = angular.module('controllers',[]);

controllers.controller('PaymentsController', ['$scope', '$routeParams', '$location', 'Payment', 'Client',
  function($scope, $routeParams, $location, Payment, Client){

    $scope.init = function(){
      $scope.clients = Client.query();

      if($routeParams.paymentId){
        $scope.payment = Payment.get({ id: $routeParams.paymentId })
      }else if($location.path() == '/'){
        $scope.payments = Payment.query();
      }
    }

    $scope.save = function(){
      Payment.save($scope.payment, function(){
        $location.path('/');
      });
    }

    $scope.update = function(){
      Payment.update({ id: $scope.payment.id }, $scope.payment, function(){
        $location.path('/');
      });
    }

    $scope.delete = function(payment){
      if(confirm("You sure dude?")){
        payment.$delete(function(){
          $scope.init();
        });
      }
    }

    $scope.init();
}]);

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