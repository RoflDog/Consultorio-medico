var app=angular.module('Consultorio',['Consultorio.directives']).
    config(['$routeProvider','$locationProvider',function($routes,$location){
    //$location.hashPrefix('#');
    $routes.
        /*when('/',{
            templateUrl:'/login'
        }).*/
        when('/',{
            templateUrl:'/partials/index',
            controller: IndexCtrl
        }).
        when('/indexUser',{
            templateUrl:'/partials/indexUser',
            controller: IndexUserCtrl
        }).
        when('/addUser',{
            templateUrl:'/partials/addUser',
            controller: AddUserCtrl
        }).
        when('/indexPatient',{
            templateUrl:'/partials/indexPatient',
            controller: IndexPatient
        }).
        when('/addPatient',{
            templateUrl:'/partials/addPatient',
            controller:AddPatientCtrl
        }).
        when('/modifyPatient/:_id',{
            templateUrl:'/partials/modifyPatient',
            controller:ModifyPatientCtrl
        }).
        when('/modifyUser/:_id',{
            templateUrl:'/partials/modifyUser',
            controller:ModifyUserCtrl
        }).
        when('/indexPayment',{
            templateUrl:'/partials/indexPayment',
            controller:IndexPaymentCrtl
        }).
        when('/addDebt',{
            templateUrl:'/partials/addDebt',
            controller:AddDebtCrtl
        }).
        when('/addPayment',{
            templateUrl:'/partials/addPayment',
            controller:AddPaymentCrtl
        }).
        when('/detailAccount/:_id',{
            templateUrl:'/partials/detailAccount',
            controller:DetailAccountCrtl
        }).
//        when('/detailPayment/:_id',{
//            templateUrl:'/partials/detailPayment/:_id',
//            controller:DetailPaymentCrtl
//        }).
        /*when('/pruebaCalendario',{
            templateUrl:'/partials/indexAppoint',
            controller:IndexAppointment
        }).*/
        otherwise({
            redirectTo:'/'
        });

    //$locationProvider.html5Mode(false).hashPrefix('#');
    }])
    .run(['$route',function($route){
        $route.reload();
    }])
    .directive('uiValidateEquals', function() {

        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {

                function validateEqual(myValue, otherValue) {
                    if (myValue === otherValue) {
                        ctrl.$setValidity('equal', true);
                        return myValue;
                    } else {
                        ctrl.$setValidity('equal', false);
                        return undefined;
                    }
                }

                scope.$watch(attrs.uiValidateEquals, function(otherModelValue) {
                    validateEqual(ctrl.$viewValue, otherModelValue);
                });

                ctrl.$parsers.unshift(function(viewValue) {
                    return validateEqual(viewValue, scope.$eval(attrs.uiValidateEquals));
                });

                ctrl.$formatters.unshift(function(modelValue) {
                    return validateEqual(modelValue, scope.$eval(attrs.uiValidateEquals));
                });
            }
        };
    });

//function UserLoggedCtrl($scope,$http){
//    $scope.login = "algo!";
//    $http.get('/api/session').
//        success(function(data,status,headers,config){
//            $scope.login=data.username;
//        })
//        .fail(function(){
//            $scope.login = "No jalo";
//        });
//}
//UserLoggedCtrl.$inject = ['$scope'];