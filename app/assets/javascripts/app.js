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
    });
}]);

accounted.factory('Payment', function($resource) {
  return $resource('/api/payments/:id', { id: '@id' }, {
    'update': {
      method: 'PUT'
    }
  });
});

accounted.factory('Client', function($resource) {
  return $resource('/api/clients/:id', { id: '@id' }, {
    'update': {
      method: 'PUT'
    }
  });
});


// CONTROLLERS
controllers = angular.module('controllers',[]);

controllers.controller('PaymentsController', ['$scope', '$routeParams', '$location', 'Payment',
  function($scope, $routeParams, $location, Payment){

    $scope.init = function(){
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
      Payment.update({ id: $scope.payment.id }, $scope.payment);
      $location.path('/');
    }

    $scope.delete = function(payment){
      if(confirm("You sure dude?")){
        payment.$delete();
        $window.location.href = '';
      }
    }

    $scope.init();
}]);
