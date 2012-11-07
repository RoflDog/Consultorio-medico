angular.module('Consultorio',[]).
    config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
    $routeProvider.
        when('/',{
            templateUrl:'partials/index',
            controller: IndexCtrl
        }).
        when('/indexUser',{
            templateUrl:'partials/addUser',
            //controller: AddUserCtrl
        }).
        when('/indexUser',{
            templateUrl:'partials/indexUser',
            controller: IndexCtrl
        }).
        when('/indexPatient',{
            templateUrl:'partials/indexPatient',
            //controller: AddUserCtrl
        }).
        otherwise({
            redirectTo:'/'
        })
    $locationProvider.html5Mode(true);
}]);