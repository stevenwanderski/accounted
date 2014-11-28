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