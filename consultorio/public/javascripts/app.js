angular.module('Consultorio',[]).
    config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
    $routeProvider.
        when('/',{
            templateUrl:'partials/index',
            controller: IndexCtrl
        }).
        when('/addUser',{
            templateUrl:'partials/addUser',
            controller: AddUserCtrl
        }).
        otherwise({
            redirectTo:'/'
        })
    $locationProvider.html5Mode(true);
}]);