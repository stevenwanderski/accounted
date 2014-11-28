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

controllers = angular.module('controllers',[]);