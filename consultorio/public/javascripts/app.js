angular.module('Consultorio',[]).
    config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
    $routeProvider.
        when('/',{
            templateUrl:'partials/index',
            controller: IndexCtrl
        }).
        /*when('/indexUser',{
            templateUrl:'partials/addUser'//,
            //controller: AddUserCtrl
        }).*/
        when('/indexUser',{
            templateUrl:'partials/indexUser',
            controller: IndexCtrl
        }).
        when('/addUser',{
            templateUrl:'partials/addUser',
            controller: AddUserCtrl
        }).
        when('/indexPatient',{
            templateUrl:'partials/indexPatient',
            controller: IndexPatient
        }).
        when('/addPatient',{
            templateUrl:'partials/addPatient',
            controller:AddPatientCtrl
        }).
        /*when('/consultPatient',{
            templateUrl:'partials/patient/consultPatient',
            controller:ConsultPatientCtrl
        }).*/
        otherwise({
            redirectTo:'/'
        })
    $locationProvider.html5Mode(true);
}]);