controllers = angular.module('controllers');

controllers.controller('PaymentsController', ['$scope', '$routeParams', '$location', '$filter', 'Payment', 'Client',
  function($scope, $routeParams, $location, $filter, Payment, Client){

    $scope.init = function(){
      $scope.clients = Client.query();
      $('.date-picker').datepicker({
        autoclose: true,
        todayHighlight: true
      });

      if($routeParams.paymentId){
        $scope.payment = Payment.get({ id: $routeParams.paymentId })
      }else if($location.path() == '/'){
        $scope.payments = Payment.query();
      }else{
        $scope.payment = {};
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
          $scope.payments = Payment.query();
        });
      }
    }

    $scope.showClientNew = function(){
      $('#new-client-form').show();
    }

    $scope.hideClientNew = function(){
      $('#new-client-form').hide();
      $scope.clearClientNew();
    }

    $scope.clearClientNew = function(){
      $('#new-client-form input').val('');
    }

    $scope.saveClient = function(){
      Client.save($scope.client, function(newClient){
        $scope.hideClientNew();
        $scope.clients = Client.query();
        $scope.payment.client_id = newClient.id
      });
    }

    $scope.init();
}]);